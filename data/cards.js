/* ============================================================
   刷卡神器 — 卡片資料
   ============================================================

   這個檔案只放「資料」，不放邏輯。程式碼在 index.html。

   為什麼要拆開（2026-08-24）：
   1. 每日核查的 AI 原本得讀整份 120KB 的 index.html 才能改幾個數字，
      每天燒掉大量 token，而且它有機會誤傷程式碼。現在它只讀這個檔。
   2. diff 乾淨。資料改動一眼看得出來，不會混在 UI 改動裡。
   3. 可以用 node --check 做語法把關，改壞就不推上去。

   用 .js 而不是 .json，是為了保住「單一頁面、不需伺服器」的原則 ——
   <script src> 在 file:// 直接開也能載入，fetch() 會被 CORS 擋掉。

   載入方式：index.html 在主 <script> 之前先載這個檔。
   最上層的 const 會進入共用的 global lexical scope，所以後面的 script 讀得到。

   ── boosts：條件式加碼（2026-08-24 新增）──
   有些回饋不是「刷了就有」，而是要滿足條件才算：限定星期、每月要搶登錄、
   必須從特定連結進入……這些條件以前全塞在 note 的自由文字裡，人看得懂、
   程式讀不懂，所以工具會顯示一個你其實拿不到的樂觀數字。

   boosts 把條件變成結構。放在 overrides 的某個情境底下：

   overseas_physical:{ rate:1.0, note:'...',
     boosts:[{
       id:      '全域唯一 id，登錄狀態用它記錄',
       label:   'UI 顯示的短標籤',
       rate:    5.0,          // 條件達成後，這個情境的總回饋率
       baseRate:1.0,          // 條件沒達成時的回饋率（引擎實際會用的保守值）
       when:{ dow:[2], dom:[1] },   // 選填。dow 1=週一…7=週日；dom=每月幾號
       channel: '必須從 XX 專屬網頁進入',  // 選填，通路條件的文字說明
       reg:{ period:'month'|'quarter'|'once', opensDom:1, url:'登錄頁', note:'怎麼登錄', quota:'限量說明' },
       cap:{ amt:600, per:'month', unit:'好多金' },
       valid:{ from:'2026-01-01', to:'2026-12-31' },
       source:'官網 URL', checkedAt:'YYYY-MM-DD'
     }]}

   ⚠️ when 與 reg.opensDom 是兩件不同的事，別搞混：
      when       = 【回饋】什麼時候生效（例：只有週二訂房才加碼）
      reg.opensDom = 【登錄】每月幾號開放搶（登錄成功後整期都算數）
      富邦 Costco 是後者：每月 1 日搶登錄，搶到之後整個月刷都有 5%。
      若寫成 when:{dom:[1]}，工具會變成告訴你「只有 1 號刷才有 5%」，那是錯的。

   引擎判定的四種狀態：
     expired  今天不在 valid 區間 → 整筆忽略，等於沒這個活動
     notToday 有 when 但今天不符 → 用 baseRate，並算出下次生效日
     needReg  要登錄但還沒登錄   → 用 baseRate，UI 給一鍵登錄連結
     active   條件都滿足         → 用 rate

   ⚠️ 排序一律用「今天實際拿得到的」淨回饋，不是 rate。
      把一張你沒登錄的卡排第一名，那個數字是騙自己的。

   ── 兩個陣列的關係 ──
   CARD_DB：完整資料庫（28 張），搜尋與比較都以它為準。
   DC：使用者預設持有的卡，是 CARD_DB 的子集。
   ⚠️ 同一張卡兩邊都有時，改了一邊一定要同步改另一邊，
      否則會出現「搜尋看到 800、加入後變 600」這種不一致。
   ============================================================ */

/* ============================
   CARD DATABASE (verified 2026/07)
   新增卡片時從此選取，資料自動帶入
   ============================ */
const CARD_DB = [
  // ─── 台新銀行 ───
  {id:'richart',bank:'台新銀行',name:'Richart 卡',
   color:'#E8001D',fee:1.5,rewardType:'points',rewardLabel:'台新Point（可折抵帳單）',
   officialUrl:'https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/cg047/card001/',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:3.3,note:'切換「玩旅刷」3.3%（L1/L2 皆適用，無需設自扣即可享回饋；⚠️ 只有「Pay著刷」方案才有 L1/L2 差異）（活動至 2027/03）'},
     overseas_online:{rate:3.3,note:'切換「玩旅刷」或「數趣刷」3.3%（L1/L2 皆適用）（活動至 2027/03）'},
     overseas_subscription:{rate:3.3,note:'切換「數趣刷」方案（L1/L2 皆適用）（活動至 2027/03）'},
     overseas_apple:{rate:3.3,note:'切換「數趣刷」方案（L1/L2 皆適用）（活動至 2027/03）'},
     overseas_insurance:{rate:1.3,note:'保費 1.3%，無上限（免切換方案，L1/L2 皆可）'},
     overseas_flight:{rate:3.3,note:'切換「玩旅刷」方案（L1/L2 皆適用）（活動至 2027/03）'},
     overseas_hotel:{rate:3.3,note:'切換「玩旅刷」方案（L1/L2 皆適用）（活動至 2027/03）',
       boosts:[{
         id:'taishin-richart-agoda-portal',
         label:'Agoda 專屬網頁',
         // 3.3% 卡回饋 ＋ Agoda 端最高 8% 現折。官網寫「最高」，實際依房型與房價而定，
         // 所以 UI 一律標示成「最高」，不可當成保證值。
         rate:11.3, baseRate:3.3,
         channel:'必須從「Agoda x Richart 卡專屬網頁」進入訂房。直接開 Agoda App 或官網訂，只有卡本身的 3.3%，拿不到現折。',
         url:'https://mkpcard.taishinbank.com.tw/tscccms/promotion/detail/WM_20251226092735504',
         maxOnly:true,
         valid:{from:'2026-01-01',to:'2026-12-31'},
         source:'https://mkpcard.taishinbank.com.tw/tscccms/promotion/detail/WM_20251226092735504',
         checkedAt:'2026-08-24'}]},
     overseas_default:{rate:3.3,note:'切換「玩旅刷」方案（L1/L2 皆適用）（活動至 2027/03）'},
     tw_cvs:{rate:3.8,note:'切換「Pay著刷」，使用台新 Pay（四大超商適用，無單筆金額限制）；LINE Pay 最高 2.3%（L2）（活動至 2027/03）'},
     tw_dining:{rate:3.3,note:'切換「好饗刷」方案'},
     tw_digital:{rate:3.3,note:'切換「數趣刷」方案'},
     tw_shopee:{rate:3.3,note:'切換「數趣刷」方案'},
     tw_costco:{rate:3.3,note:'切換「天天刷」方案'},
     tw_insurance:{rate:1.3,note:'保費 1.3%，無上限'},
     tw_default:{rate:3.3,note:'依類型切換對應方案'},
   }},
  // ─── 國泰世華 ───
  {id:'cube',bank:'國泰世華',name:'CUBE 卡 Level 2',
   color:'#003087',fee:1.5,rewardType:'points',rewardLabel:'小樹點（可折抵帳單）',
   officialUrl:'https://www.cathaybk.com.tw/cathaybk/personal/product/creditcard/cards/cube/',
   defaultRate:0.5,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:3.0,reg:true,regNote:'每次消費前在 CUBE App 切換「趣旅行」（App 首頁 > CUBE 卡權益方案 > 趣旅行），每日限切一次；未切換無旅遊加碼'},
     overseas_flight:{rate:3.0,reg:true,regNote:'CUBE App 切換「趣旅行」，航空公司 3%（含廉航），每日限切一次'},
     overseas_flight_budget:{rate:3.0,reg:true,regNote:'CUBE App 切換「趣旅行」，廉航 3%，每日限切一次'},
     overseas_hotel:{rate:3.0,reg:true,regNote:'CUBE App 切換「趣旅行」，Agoda/Booking.com/Hotels.com 3%，每日限切一次'},
     overseas_online:{rate:1.0,note:'線上購物不適用趣旅行'},
     overseas_default:{rate:1.0},
     tw_costco:{rate:3.0,reg:true,regNote:'CUBE App 設定「好市多」類別，3% 無上限'},
     tw_shopee:{rate:3.0,reg:true,regNote:'CUBE App 設定「蝦皮購物」類別，3% 無上限'},
     tw_dining:{rate:3.0,reg:true,regNote:'CUBE App 設定「樂饗購」類別（餐廳），3% 無上限'},
     tw_digital:{rate:3.0,reg:true,regNote:'CUBE App 設定「玩數位」類別（Apple、Klook、KKday 等），3% 無上限'},
     tw_default:{rate:0.5},
   }},
  {id:'shopee',bank:'國泰世華',name:'蝦皮購物聯名卡',
   color:'#EE4D2D',fee:0,rewardType:'restricted',rewardLabel:'蝦幣（限蝦皮平台使用）',
   officialUrl:'https://www.cathaybk.com.tw/cathaybk/personal/product/creditcard/cards/shopee/',
   defaultRate:0.5,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     tw_shopee:{rate:2.0,note:'蝦皮購物 2% 蝦幣'},
     overseas_default:{rate:0.5,note:'海外手續費 0%（免收），回饋僅 0.5% 蝦幣'},
     tw_default:{rate:0.5},
   }},
  // ─── 星展銀行 ───
  {id:'eco',bank:'星展銀行',name:'eco 永續卡',
   color:'#DA1710',fee:1.5,rewardType:'cash',rewardLabel:'現金積點',
   officialUrl:'https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html',
   defaultRate:1.0,capKey:'overseas_physical',capAmt:600,capBonusOnly:true,capBonusPct:4,capBaseRate:1.0,
   source:'https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html',checkedAt:'2026-08-24',
   overrides:{
     overseas_physical:{rate:5.0,note:'實體消費 5%，回饋上限 NT$600/期，超過後僅 1%'},
     overseas_online:{rate:1.0,note:'線上購物不適用 5%，僅基本 1%'},
     overseas_subscription:{rate:1.0},
     overseas_apple:{rate:1.0},
     overseas_insurance:{rate:1.0},
     overseas_flight:{rate:1.0,note:'線上訂票不適用 5%'},
     overseas_hotel:{rate:1.0,note:'線上訂房不適用 5%（⭐ 季度旅遊加碼活動：Agoda/Booking.com 訂房達門檻可+3%，需在 Card+ App 登錄，2026/5–8/31）'},
     tw_default:{rate:1.0},
   }},
  // ─── 富邦銀行 ───
  {id:'costco',bank:'富邦銀行',name:'Costco 聯名卡',
   color:'#005DAA',fee:1.5,rewardType:'restricted',rewardLabel:'好多金（限 Costco 使用）',
   officialUrl:'https://www.fubon.com/banking/personal/credit-card/costco/',
   defaultRate:1.0,capKey:'overseas_physical',capAmt:600,capBonusOnly:true,capBonusPct:4,capBaseRate:1.0,
   overrides:{
     tw_costco:{rate:2.0,note:'Costco 消費 2% 好多金'},
     overseas_physical:{rate:5.0,note:'海外實體 5%（⚠️ 每月 1 日 00:00 搶登錄，限量 50,000 名；搶不到僅 1%；好多金只能折抵 Costco），回饋上限 NT$600/期（活動至 2026/12/31）',
       boosts:[{
         id:'fubon-costco-oversea-monthly',
         label:'每月 1 日搶登錄',
         rate:5.0, baseRate:1.0,
         // 注意 when 與 reg.opensDom 是兩件事：
         // 這個活動沒有 when（登錄成功後整個月刷都算 5%），
         // 但登錄本身只在每月 1 日開放搶，所以用 reg.opensDom 表達。
         reg:{period:'month', opensDom:1,
              url:'https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000270',
              note:'每月1日00:00開放登錄，可透過網銀、行銀或撥打登錄專線辦理',
              quota:'每月限量 5 萬名，額滿提前終止，恕無法補登'},
         cap:{amt:600,per:'month',unit:'好多金'},
         valid:{from:'2026-01-01',to:'2026-12-31'},
         source:'https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000270',
         checkedAt:'2026-08-24'}]},
     tw_default:{rate:1.0},
   }},
  // ─── 將來銀行 ───
  {id:'jiangjiang',bank:'將來銀行',name:'將將卡',
   color:'#00C1B2',fee:1.5,rewardType:'points',rewardLabel:'N點（可折抵帳單）',
   officialUrl:'https://www.nextbank.com.tw/product/point',
   defaultRate:1.5,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     tw_default:{rate:1.5,note:'一般消費 1.5%，以官網最新公告為準'},
     overseas_default:{rate:1.5},
   }},
  // ─── Mercedes ───
  {id:'mercedes',bank:'台新銀行',name:'Mercedes-Benz 御璽卡',
   color:'#1a1a2e',fee:1.5,rewardType:'points',rewardLabel:'台新Point',
   officialUrl:'https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/cg006/card002/',
   defaultRate:0.3,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:0.6,note:'海外 2x 積點 = 0.6%，扣費後淨回饋 -0.9%'},
     tw_default:{rate:0.3,note:'基本 1x 積點 = 0.3%'},
   }},
  // ─── Revolut ───
  {id:'revolut',bank:'Revolut',name:'英鎊帳戶（簽帳金融卡）',
   color:'#191C1F',fee:0,rewardType:'cash',rewardLabel:'無回饋（0% 手續費）',
   officialUrl:'https://www.revolut.com/en-GB/',isRevolut:true,
   defaultRate:0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{}},
  // ─── 永豐銀行 ───
  {id:'sinopac_dual',bank:'永豐銀行',name:'幣倍卡',
   color:'#00AEEF',fee:1.5,rewardType:'cash',rewardLabel:'現金回饋（直接折抵）',
   officialUrl:'https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html',
   defaultRate:2.0,capKey:'overseas_physical',capAmt:800,capBonusOnly:true,capBonusPct:4,capBaseRate:2.0,
   overrides:{
     overseas_physical:{rate:6.0,note:'精選通路 2%+4%=6%（實體：一般海外實體商店；⚠️ 回饋上限 NT$800/期；需設永豐台外幣帳戶自扣+電子帳單，且往來資產月均≥NT$10萬或大戶/大戶Plus等級；2026/07 起僅剩單一等級）（活動至 2026/12/31）'},
     overseas_online:{rate:6.0,note:'精選網購通路 6%：Amazon、Rakuten、Mercari、eBay、iHerb、Selfridge、Gmarket、Olive Young、淘寶、SUICA/PASMO/ICOCA 儲值、大國藥妝、Sugi藥妝、Klook、KKDAY、Booking.com、Agoda、Airbnb、Expedia、Trip.com、Trivago 等；回饋上限 NT$800/期；需往來資產月均≥NT$10萬或大戶等級（活動至 2026/12/31）'},
     overseas_flight:{rate:6.0,note:'航空公司購票 6%（回饋上限 NT$800/期；需往來資產月均≥NT$10萬或大戶等級）（活動至 2026/12/31）'},
     overseas_flight_budget:{rate:6.0,note:'廉航購票 6%（回饋上限 NT$800/期；需往來資產月均≥NT$10萬或大戶等級）（活動至 2026/12/31）'},
     overseas_hotel:{rate:6.0,note:'Booking.com/Agoda/Airbnb 等 6%（回饋上限 NT$800/期；需往來資產月均≥NT$10萬或大戶等級）（活動至 2026/12/31）'},
     overseas_default:{rate:2.0,note:'非精選通路海外消費 2%，無上限'},
     tw_default:{rate:1.0,note:'國內一般消費 1%'},
   }},
  // ─── 中信 ───────
  {id:'ctbc_linepay',bank:'中國信託',name:'LINE Pay 卡',
   color:'#06C755',fee:1.5,rewardType:'points',rewardLabel:'LINE POINTS',
   officialUrl:'https://www.ctbcbank.com/content/twrbo/zh_tw/cc_index/cc_product/cc_introduction_index/C_LINEPay.html',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:2.8,note:'海外實體 2.8%（含基本 1%+加碼 1.8%，⚠️ 限面對面刷卡，Apple Pay/Google Pay 於實體店適用）'},
     overseas_online:{rate:1.0,note:'線上購物僅基本 1%，2.8% 加碼不適用線上消費'},
     overseas_default:{rate:1.0,note:'非面對面消費僅基本 1%'},
     tw_default:{rate:1.0},
   }},
  {id:'ctbc_cashback',bank:'中國信託',name:'現金回饋御璽卡',
   color:'#CC0000',fee:1.5,rewardType:'cash',rewardLabel:'現金回饋',
   officialUrl:'https://www.ctbcbank.com/content/twrbo/zh_tw/cc_index/cc_product/cc_introduction_index/B_Cashback_Signature.html',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:2.5,note:'⚠️ 海外 2.5% 需當月國內消費 NT$10 萬以上；NT$4-10 萬為 1.5%；NT$2-4 萬為 1%；NT$2 萬以下僅 0.5%'},
     tw_default:{rate:1.0},
   }},
  // ─── 滙豐銀行 ───
  {id:'hsbc_cashback',bank:'滙豐銀行',name:'現金回饋御璽卡',
   color:'#DB0011',fee:1.5,rewardType:'cash',rewardLabel:'現金回饋',
   officialUrl:'https://www.hsbc.com.tw/en-tw/credit-cards/products/cashback-signature/',
   defaultRate:1.22,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:2.22,note:'海外實體 2.22%（⚠️ 不含歐盟/英國實體通路）'},
     overseas_online:{rate:2.22,note:'海外線上 2.22%'},
     overseas_default:{rate:2.22},
     tw_default:{rate:1.22},
   }},
  // ─── 玉山銀行 ───
  {id:'esun_pi',bank:'玉山銀行',name:'Pi 拍錢包信用卡',
   color:'#7B2D8B',fee:1.5,rewardType:'restricted',rewardLabel:'P幣（限 Pi 錢包使用）',
   officialUrl:'https://www.esunbank.com/en/personal/credit-card/intro/co-branded-card/pi-card',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:1.0,note:'2025/3/1 起一般海外降為 1% P幣，扣費後淨 -0.5%'},
     tw_default:{rate:1.0,note:'基本 1% P幣（需設定電子帳單）'},
   }},
  {id:'esun_ubear',bank:'玉山銀行',name:'U Bear 信用卡',
   color:'#005DA0',fee:1.5,rewardType:'cash',rewardLabel:'現金回饋',
   officialUrl:'https://www.esunbank.com/en/personal/credit-card/intro/bank-card/u-bear',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_subscription:{rate:10.0,note:'指定數位訂閱（Netflix、ChatGPT、Gemini、Steam、Nintendo、PlayStation、Google One、Google Services）最高 10%，每期回饋上限 NT$100（⚠️ Spotify 不在清單；此加碼無需設電子帳單/自扣即可享回饋）（活動至 2026/08/31）'},
     overseas_online:{rate:3.0,note:'指定海外網購通路 3%（基本 1%+加碼 2%），加碼每期上限 NT$150（⚠️ 需同時設電子帳單+玉山帳戶自扣並成功扣繳才有基本 1%；僅設一項則基本 0.5%）（活動至 2026/08/31）'},
     overseas_default:{rate:1.0,note:'一般海外 1%（⚠️ 需同時設電子帳單+玉山帳戶自扣並成功扣繳；僅設一項則 0.5%；未設則 0%）'},
     tw_default:{rate:1.0,note:'基本 1%（⚠️ 需同時設電子帳單+玉山帳戶自扣並成功扣繳；僅設一項則 0.5%；未設則 0%）'},
   }},
  {id:'esun_unicard',bank:'玉山銀行',name:'Unicard（UP 選）',
   color:'#B8860B',fee:1.5,rewardType:'points',rewardLabel:'玉山 e point（1 點 = NT$1 可折抵帳單）',
   officialUrl:'https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:3.5,reg:true,regNote:'UP 選加碼 3.5%（⚠️ 英/歐洲 28 國實體消費無基礎 1%，整體僅 3.5%；非百大特店門市無任何回饋）；月上限 5,000 點；需訂閱 UP 選（149 e point/月，或達免費任務）（活動至 2026/12/31）'},
     overseas_online:{rate:4.5,reg:true,regNote:'基礎 1%+UP 選 3.5%=4.5%（線上消費不受歐洲除外限制，含 Amazon、eBay 等百大特店）；月上限 5,000 點'},
     overseas_subscription:{rate:4.5,reg:true,regNote:'基礎 1%+UP 選 3.5%=4.5%；月上限 5,000 點'},
     overseas_hotel:{rate:4.5,reg:true,regNote:'基礎 1%+UP 選 3.5%=4.5%（Booking.com、Agoda、Airbnb 等百大特店）；月上限 5,000 點'},
     overseas_flight:{rate:4.5,reg:true,regNote:'基礎 1%+UP 選 3.5%=4.5%（航空公司百大特店）；月上限 5,000 點'},
     overseas_flight_budget:{rate:4.5,reg:true,regNote:'基礎 1%+UP 選 3.5%=4.5%；月上限 5,000 點'},
     overseas_default:{rate:1.0,note:'非百大特店一般海外 1%（⚠️ 英/歐洲實體消費基礎回饋為 0%，此類消費建議改用其他卡）'},
     tw_default:{rate:1.0,note:'台灣一般消費 1%'},
   }},
  // ─── 聯邦銀行 ───
  {id:'ubot_laidian',bank:'聯邦銀行',name:'賴點卡',
   color:'#1FAD4E',fee:1.5,rewardType:'points',rewardLabel:'LINE POINTS',
   officialUrl:'https://creditcards.com.tw/creditcard/ubot-line-points-credit-card/',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:3.0,note:'海外消費 3% LINE POINTS（無上限）'},
     tw_default:{rate:1.0},
   }},
  // ─── 美國運通 ───
  {id:'amex_gold_credit',bank:'美國運通',name:'信用金卡',
   color:'#C9A227',fee:1.5,rewardType:'points',rewardLabel:'會員酬賓積分（可換哩程或刷卡金）',
   officialUrl:'https://www.americanexpress.com/zh-tw/credit-cards/all-cards/',
   defaultRate:1.2,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:1.5,note:'每 NT$25=1積分，積分可換哩程/刷卡金，等值約 1.5%'},
     tw_default:{rate:1.2,note:'每 NT$30=1積分，等值約 1.2%'},
   }},
  {id:'amex_plat_credit',bank:'美國運通',name:'信用白金卡',
   color:'#9B9B9B',fee:1.5,rewardType:'points',rewardLabel:'會員酬賓積分（可換哩程或刷卡金）',
   officialUrl:'https://www.americanexpress.com/zh-tw/credit-cards/grcc-plat/',
   defaultRate:1.2,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:2.0,note:'登錄後海外額外 1 積分（NT$15=1積分），等值約 2%'},
     tw_dining:{rate:2.5,note:'指定 5 星餐廳買一送一或最高 5% 回饋'},
     tw_default:{rate:1.2,note:'NT$30=1積分，等值約 1.2%'},
   }},
  {id:'amex_plat_charge',bank:'美國運通',name:'簽帳白金卡',
   color:'#A8A9AD',fee:1.5,rewardType:'points',rewardLabel:'會員酬賓積分（可換哩程或刷卡金）',
   officialUrl:'https://www.americanexpress.com/zh-tw/charge-cards/plat/',
   defaultRate:1.2,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:2.0,note:'登錄後海外額外積分（NT$15=1積分），等值約 2%'},
     overseas_hotel:{rate:2.5,note:'精選飯店額外禮遇 + 積分加碼'},
     tw_default:{rate:1.2},
   }},
  {id:'amex_eva_gold',bank:'美國運通',name:'長榮航空簽帳金卡',
   color:'#006747',fee:1.5,rewardType:'points',rewardLabel:'長榮無限哩程（1哩≈NT$0.5）',
   officialUrl:'https://www.americanexpress.com/zh-tw/charge-cards/grcc-eva-gold/',
   defaultRate:1.2,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:1.5,note:'海外消費 NT$20=1哩，等值約 1.5%'},
     overseas_flight:{rate:1.5,note:'一般航空 NT$20=1哩（非長榮）'},
     overseas_flight_eva:{rate:2.0,note:'長榮航空購票 NT$15=1哩，等值約 2%'},
     tw_default:{rate:1.2,note:'NT$30=1哩，等值約 1.2%'},
     tw_flight:{rate:1.2,note:'台灣購票（非長榮）NT$30=1哩'},
     tw_flight_eva:{rate:2.0,note:'台灣購買長榮機票 NT$15=1哩，等值約 2%（無海外手續費）'},
   }},
  {id:'amex_green_charge',bank:'美國運通',name:'簽帳綠卡',
   color:'#2D8A4E',fee:1.5,rewardType:'points',rewardLabel:'會員酬賓積分（可換哩程或刷卡金）',
   officialUrl:'https://www.americanexpress.com/zh-tw/charge-cards/green/',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:1.2,note:'NT$30=1積分，海外略高於國內'},
     tw_default:{rate:1.0},
   }},
  // ─── 永豐銀行（DAWHO）───
  {id:'sinopac_dawho',bank:'永豐銀行',name:'DAWHO 大戶卡',
   color:'#0055A5',fee:1.5,rewardType:'cash',rewardLabel:'現金回饋（直接折抵）',
   officialUrl:'https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/DAWHO.html',
   defaultRate:2.0,capKey:'overseas_default',capAmt:1000,capBonusOnly:true,capBonusPct:4,capBaseRate:2.0,
   overrides:{
     overseas_default:{rate:6.0,note:'⚠️ 需大戶Plus等級：2%+4%=6%（月加碼上限 NT$1,000）；一般大戶：2%+2.5%=4.5%（月上限 NT$400）'},
     tw_default:{rate:5.0,note:'大戶Plus 國內最高 5%（含加碼，月上限 NT$1,000）'},
   }},
  // ─── 台北富邦 ───
  {id:'fubon_j',bank:'台北富邦',name:'J 卡',
   color:'#E60012',fee:1.5,rewardType:'cash',rewardLabel:'刷卡金（現金回饋）',
   officialUrl:'https://creditcards.com.tw/creditcard/fubon-j-japan-korea-midnight-credit-card-cashback/',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:1.0,reg:true,note:'⚠️ 6% 僅限日本/韓國/泰國等指定亞洲國家，英/歐/北美實體僅基本 1%',regNote:'⚠️ 每月 20 日 16:00 開放搶登錄（每月限量 20,000 名，搶完即止）；登錄成功後本季（Q2: 4–6 月、Q3: 7–9 月）皆有效，不需每月重複登錄（每季總額 60,000 名）；登錄頁：cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000307 或 Fubon+ App；日韓泰實體 6%，單筆滿 NT$1,000，每季加碼上限 NT$1,000；⚠️ 需設富邦銀行自動扣繳或申請電子帳單才可享回饋（活動至 2026/09/30）'},
     overseas_flight:{rate:3.0,note:'日韓航空購票 3%（含廉航 Peach/Jetstar/Jeju Air 等）'},
     overseas_flight_budget:{rate:3.0,note:'日韓廉航購票 3%（Peach、Jetstar Japan、濟州航空等）'},
     overseas_hotel:{rate:1.0},
     overseas_default:{rate:1.0,note:'非日韓泰地區海外 1%'},
     tw_default:{rate:1.0},
   }},
  // ─── 元大銀行 ───
  {id:'yuanta_diamond',bank:'元大銀行',name:'鑽金卡',
   color:'#B8860B',fee:1.5,rewardType:'cash',rewardLabel:'鑽金紅利（6 個月到期，可折抵帳款）',
   officialUrl:'https://www.yuantabank.com.tw/bank/creditCard/creditCard/in.do?id=275bac7b2e000004dddb',
   defaultRate:1.2,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:2.2,note:'海外消費 2.2%（⚠️ 紅利 6 個月到期，需定期折抵）'},
     tw_default:{rate:1.2},
   }},
  // ─── 滙豐銀行（Live+）───
  {id:'hsbc_live',bank:'滙豐銀行',name:'Live+ 現金回饋卡',
   color:'#C8102E',fee:1.5,rewardType:'cash',rewardLabel:'現金回饋',
   officialUrl:'https://www.hsbc.com.tw/en-tw/credit-cards/products/liveplus/',
   defaultRate:0.88,capKey:'tw_dining',capAmt:888,capBonusOnly:true,capBonusPct:3,capBaseRate:0.88,
   overrides:{
     tw_dining:{rate:3.88,note:'百貨/餐飲/娛樂加碼 3%，月上限 NT$888'},
     tw_default:{rate:0.88},
     overseas_default:{rate:0.88,note:'海外消費僅基本 0.88%，不含加碼'},
   }},
  // ─── 渣打銀行 ───
  {id:'sc_linebank',bank:'渣打銀行',name:'LINE Bank 聯名卡',
   color:'#007B5E',fee:1.5,rewardType:'cash',rewardLabel:'現金回饋',
   officialUrl:'https://www.sc.com/tw/credit-cards/linebank-coband-card/',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_default:{rate:1.0,note:'2025/8 起海外降為 1%（原 3%），扣手續費後淨 -0.5%，建議改用 Revolut'},
     tw_default:{rate:1.0},
   }},
  // ─── 第一銀行 ───
  {id:'fcb_wonderful',bank:'第一銀行',name:'Wonderful 星璨卡',
   color:'#004B87',fee:1.5,rewardType:'cash',rewardLabel:'現金回饋',
   officialUrl:'https://card.firstbank.com.tw/',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:3.5,note:'海外實體/日韓 3.5%（需設電子帳單+自動扣繳），無上限'},
     overseas_default:{rate:1.0},
     tw_default:{rate:1.5,note:'指定通路 1.5%'},
   }},
  // ─── Wise ───
  {id:'wise_card',bank:'Wise',name:'多幣帳戶金融卡',
   color:'#00B9FF',fee:0,rewardType:'cash',rewardLabel:'無回饋（銀行間匯率，0% 附加費）',
   officialUrl:'https://wise.com/tw/',isRevolut:true,
   defaultRate:0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{},
   note:'Wise 使用中間市場匯率，海外消費幾乎無附加費。台灣目前無法直接申辦卡片，需海外地址。'},
];

/* ============================
   DEFAULT CARDS (verified 2026/07)
   ============================ */
const DC = [
  // ── eco 永續卡 ──────────────────────
  {id:'eco',bank:'星展銀行',name:'eco 永續卡',color:'#DA1710',
   fee:1.5,owned:true,rewardType:'cash',rewardLabel:'現金積點',
   officialUrl:'https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html',
   defaultRate:1.0,
   capKey:'overseas_physical', capAmt:600, capBonusOnly:true, capBonusPct:4, capBaseRate:1.0,
   source:'https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html', checkedAt:'2026-08-24',
   overrides:{
     overseas_physical:{rate:5.0,note:'英/歐/日/韓/新/泰/美洲 實體消費，回饋上限 NT$600/期（4%加碼），超過後僅 1%'},
     overseas_online:{rate:1.0,note:'線上購物不適用 5%，僅基本 1%'},
     overseas_subscription:{rate:1.0,note:'訂閱不適用 5%'},
     overseas_apple:{rate:1.0,note:'Apple 線上不適用 5%'},
     overseas_insurance:{rate:1.0},
     overseas_flight:{rate:1.0,note:'線上訂票不適用 5%（如為機場實體購票則適用）'},
     overseas_hotel:{rate:1.0,note:'線上訂房不適用 5%（⭐ 季度旅遊加碼活動：Agoda/Booking.com 訂房達門檻可+3%，需在 Card+ App 登錄，2026/5–8/31）'},
     tw_default:{rate:1.0},
   }},
  // ── Richart ─────────────────────────
  {id:'richart',bank:'台新銀行',name:'Richart 卡',color:'#E8001D',
   fee:1.5,owned:true,rewardType:'points',rewardLabel:'台新Point（可折抵帳單）',
   officialUrl:'https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/cg047/card001/',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:3.3,note:'切換「玩旅刷」3.3%（L1/L2 皆適用，無需設自扣即可享回饋；⚠️ 只有「Pay著刷」方案才有 L1/L2 差異）（活動至 2027/03）'},
     overseas_online:{rate:3.3,note:'切換「玩旅刷」或「數趣刷」3.3%（L1/L2 皆適用）（活動至 2027/03）'},
     overseas_subscription:{rate:3.3,note:'切換「數趣刷」（L1/L2 皆適用）（活動至 2027/03）'},
     overseas_apple:{rate:3.3,note:'切換「數趣刷」（L1/L2 皆適用）（活動至 2027/03）'},
     overseas_insurance:{rate:1.3,note:'保費 1.3%，無上限（免切換方案，L1/L2 皆可）'},
     overseas_flight:{rate:3.3,note:'切換「玩旅刷」（L1/L2 皆適用）（活動至 2027/03）'},
     overseas_hotel:{rate:3.3,note:'切換「玩旅刷」（L1/L2 皆適用）（活動至 2027/03）；⭐ 可疊加台新訂房折扣：Agoda（agoda.com/zh-tw/taishinpromo，8% off）、Hotels.com（碼 TSBH）、Expedia（碼 RICHART10，10%）、Booking.com（需從台新官方活動頁進入）—均需從台新官方活動頁進入才有效'},
     overseas_default:{rate:3.3,note:'切換「玩旅刷」（L1/L2 皆適用）（活動至 2027/03）'},
     tw_cvs:{rate:3.8,note:'切換「Pay著刷」，使用台新Pay（四大超商適用）；LINE Pay 最高 2.3%（L2）（活動至 2027/03）'},
     tw_dining:{rate:3.3,note:'切換「好饗刷」'},
     tw_digital:{rate:3.3,note:'切換「數趣刷」；Klook 需從台新專屬頁進入才有額外折扣：klook.com/zh-TW/tetris/promo/taishinbank/'},
     tw_shopee:{rate:3.3,note:'切換「數趣刷」'},
     tw_costco:{rate:3.3,note:'切換「天天刷」或「大筆刷」'},
     tw_insurance:{rate:1.3,note:'保費 1.3%，無需切換'},
     tw_default:{rate:3.3,note:'依類型切換對應方案'},
   }},
  // ── CUBE L2 ─────────────────────────
  {id:'cube',bank:'國泰世華',name:'CUBE 卡 Level 2',color:'#003087',
   fee:1.5,owned:true,rewardType:'points',rewardLabel:'小樹點（可折抵帳單）',
   officialUrl:'https://www.money101.com.tw/blog/%E5%9C%8B%E6%B3%B0%E4%B8%96%E8%8F%AFcube%E5%8D%A1',
   defaultRate:0.5,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:3.0,reg:true,regNote:'每次消費前在 CUBE App 切換「趣旅行」（App 首頁 > CUBE 卡權益方案 > 趣旅行），每日限切一次；未切換無旅遊加碼'},
     overseas_flight:{rate:3.0,reg:true,regNote:'CUBE App 切換「趣旅行」，航空公司 3%（含廉航），每日限切一次'},
     overseas_flight_budget:{rate:3.0,reg:true,regNote:'CUBE App 切換「趣旅行」，廉航 3%，每日限切一次'},
     overseas_hotel:{rate:3.0,reg:true,regNote:'CUBE App 切換「趣旅行」，Agoda/Booking.com/Hotels.com 3%，每日限切一次'},
     overseas_online:{rate:1.0,note:'線上購物趣旅行不適用，回 1%'},
     overseas_subscription:{rate:1.0},
     overseas_apple:{rate:1.0,note:'Apple 線上不適用趣旅行'},
     overseas_insurance:{rate:1.0},
     overseas_default:{rate:1.0},
     tw_costco:{rate:3.0,reg:true,regNote:'CUBE App 設定「好市多」類別，3% 無上限'},
     tw_shopee:{rate:3.0,reg:true,regNote:'CUBE App 設定「蝦皮購物」類別，3% 無上限'},
     tw_dining:{rate:3.0,reg:true,regNote:'CUBE App 設定「樂饗購」類別（餐廳），3% 無上限'},
     tw_digital:{rate:3.0,reg:true,regNote:'CUBE App 設定「玩數位」類別（Apple、Klook、KKday 等），3% 無上限'},
     tw_cvs:{rate:3.0,reg:true,regNote:'CUBE App 設定對應類別，最多選 3 類'},
     tw_default:{rate:0.5},
   }},
  // ── 蝦皮聯名卡 ──────────────────────
  {id:'shopee',bank:'國泰世華',name:'蝦皮購物聯名卡',color:'#EE4D2D',
   fee:0,owned:true,rewardType:'restricted',rewardLabel:'蝦幣（限蝦皮使用）',
   officialUrl:'https://help.shopee.tw/portal/4/article/80312',
   defaultRate:0.5,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     tw_shopee:{rate:2.0,note:'蝦皮站內消費最高 2% 蝦幣'},
     tw_cvs:{rate:2.0},
     overseas_physical:{rate:0.5,note:'0.5% 蝦幣 + 免手續費（蝦幣僅能用於蝦皮）'},
     overseas_online:{rate:0.5,note:'蝦幣 + 免手續費'},
     overseas_default:{rate:0.5},
     tw_default:{rate:0.5},
   }},
  // ── Costco 富邦 ──────────────────────
  {id:'costco',bank:'富邦銀行',name:'Costco 聯名卡',color:'#005DAA',
   fee:1.5,owned:true,rewardType:'restricted',rewardLabel:'好多金（限 Costco 折抵）',
   officialUrl:'https://creditcards.com.tw/creditcard/fubon-costco-credit-card/',
   defaultRate:1.0,
   capKey:'overseas_physical',capAmt:600,capBonusOnly:true,capBonusPct:4,capBaseRate:1.0,
   overrides:{
     tw_costco:{rate:2.0,note:'Costco 賣場 2%（線上 3%）好多金，只能折抵 Costco 消費'},
     overseas_physical:{rate:5.0,note:'海外實體 5%（⚠️ 每月 1 日 00:00 搶登錄，限量 50,000 名；登錄頁：cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000270 或 Fubon+ App；搶不到僅 1%；好多金只能折抵 Costco），回饋上限 NT$600/期（活動至 2026/12/31）'},
     tw_default:{rate:1.0},
     overseas_default:{rate:1.0},
   }},
  // ── 將將卡 ──────────────────────────
  {id:'jiangjiang',bank:'將來銀行',name:'將將卡',color:'#00C1B2',
   fee:1.5,owned:true,rewardType:'points',rewardLabel:'N點（可折抵帳單）',
   officialUrl:'https://www.nextbank.com.tw/product/point',
   defaultRate:1.5,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     tw_default:{rate:1.5,note:'一般消費 1.5%，以官網最新公告為準'},
     overseas_physical:{rate:1.5,note:'海外可能有促銷加碼，請至官網確認'},
     overseas_default:{rate:1.5},
   }},
  // ── Mercedes 御璽卡 ──────────────────
  {id:'mercedes',bank:'台新銀行',name:'Mercedes-Benz 御璽卡',color:'#1a1a2e',
   fee:1.5,owned:true,rewardType:'points',rewardLabel:'台新Point（Mercedes 積點）',
   officialUrl:'https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/cg006/card002/',
   defaultRate:0.3,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:0.6,note:'海外 2倍點 = 0.6%，扣手續費後淨 -0.9%，⚠️ 不建議海外使用'},
     overseas_default:{rate:0.6},
     tw_default:{rate:0.3,note:'一般消費 1倍點 = 0.3%'},
   }},
  // ── Revolut ─────────────────────────
  {id:'revolut',bank:'Revolut',name:'Revolut 簽帳卡',color:'#0075EB',
   fee:0,owned:true,rewardType:'cash',rewardLabel:'直接英鎊消費',
   officialUrl:'https://www.revolut.com/en-GB/',
   defaultRate:0,isRevolut:true,
   capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{}},
];
