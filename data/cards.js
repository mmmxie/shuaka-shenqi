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

/* 台新 Richart 的 LEVEL 2 條件在十幾個情境重複出現，抽成產生器避免貼十幾次。
   關鍵：所有情境共用同一個 boost id，所以「登錄待辦」頁只出現一個勾選項，
   使用者勾一次（代表已設定台新帳戶自動扣繳），全部情境同步從 1.3% 升到 3.3%。 */
function RICHART_L2(label){
  return {
    id:'taishin-richart-l2',
    label:'LEVEL 2（'+label+'）',
    rate:3.3, baseRate:1.3,
    reg:{period:'once',
         url:'https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/cg047/card001/',
         note:'需以台新帳戶設定自動扣繳台新信用卡帳款才具 LEVEL 2 資格。新申辦 60 天內免設定即享 LEVEL 2'},
    valid:{from:'2026-01-01',to:'2027-03-31'},
    source:'https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/cg047/card001/',
    checkedAt:'2026-08-24'
  };
}

/* ============================
   CARD DATABASE (verified 2026/07)
   新增卡片時從此選取，資料自動帶入
   ============================ */
const CARD_DB = [
  // ─── 台新銀行 ───
  {id:'richart',bank:'台新銀行',name:'Richart 卡',
   color:'#E8001D',fee:1.5,rewardType:'points',rewardLabel:'台新Point（可折抵帳單）',
   officialUrl:'https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/cg047/card001/',
   source:'https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/cg047/card001/',checkedAt:'2026-08-24',
   // 2026-08-24 查核大修：原資料把 L1/L2 寫反了。官網權益方案表格中 LEVEL 1 那格
   // 帶 rowspan="4"、值為 1.3%，代表 1.3% 涵蓋全部四個方案；3.3%/3.8%/2.3%/2% 全屬 LEVEL 2。
   // 內文另有明文「未完成設定者，享切換刷加碼通路最高1.3%」。
   // 原本每格寫「L1/L2 皆適用」「無需設自扣」，等於把所有人都當成 L2 計算。
   // 現改用 boosts 表達：沒設自動扣繳 = 1.3%，設了 = 3.3%。同一個 boost id
   // 讓登錄待辦頁只出現一個勾選項，勾一次全部情境同步生效。
   defaultRate:0.3,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:1.3,note:'切換「玩旅刷」。LEVEL 2 為 3.3%，LEVEL 1 僅 1.3%（活動至 2027/03）',
       boosts:[RICHART_L2('玩旅刷 · 海外實體')]},
     overseas_online:{rate:1.3,note:'切換「玩旅刷」或「數趣刷」。LEVEL 2 為 3.3%，LEVEL 1 僅 1.3%（活動至 2027/03）',
       boosts:[RICHART_L2('玩旅刷／數趣刷 · 海外線上')]},
     overseas_subscription:{rate:1.3,note:'切換「數趣刷」。LEVEL 2 為 3.3%，LEVEL 1 僅 1.3%（活動至 2027/03）',
       boosts:[RICHART_L2('數趣刷 · 海外訂閱')]},
     overseas_apple:{rate:1.3,note:'⚠️ Apple 不在「數趣刷」清單內。海外 Apple 消費請走「玩旅刷」海外消費計算。LEVEL 2 為 3.3%，LEVEL 1 僅 1.3%',
       boosts:[RICHART_L2('玩旅刷 · 海外 Apple')]},
     overseas_insurance:{rate:0.3,note:'⚠️ 海外保費不算加碼通路。官網明文「保費認列不含國外保險交易…海外保險、非臺灣保險公司扣繳之保險費」，僅一般消費 0.3%'},
     overseas_flight:{rate:1.3,note:'切換「玩旅刷」。LEVEL 2 為 3.3%，LEVEL 1 僅 1.3%（活動至 2027/03）',
       boosts:[RICHART_L2('玩旅刷 · 機票')]},
     overseas_hotel:{rate:1.3,note:'切換「玩旅刷」。LEVEL 2 為 3.3%，LEVEL 1 僅 1.3%（活動至 2027/03）',
       boosts:[RICHART_L2('玩旅刷 · 訂房'),{
         // 共用 taishin-richart-l2 這個 id，因為 11.3% 的組成裡有 3.3% 卡回饋，
         // 一樣要先有 LEVEL 2。沒設自動扣繳時退回 1.3%，不是 3.3%。
         id:'taishin-richart-l2',
         label:'LEVEL 2 ＋ Agoda 專屬網頁',
         // 3.3% 卡回饋 ＋ Agoda 端最高 8% 現折。官網寫「最高」，實際依房型與房價而定，
         // 所以 UI 一律標示成「最高」，不可當成保證值。
         rate:11.3, baseRate:1.3, maxOnly:true,
         channel:'必須從「Agoda x Richart 卡專屬網頁」進入訂房。直接開 Agoda App 或官網訂，只有卡本身的回饋，拿不到現折。',
         url:'https://mkpcard.taishinbank.com.tw/tscccms/promotion/detail/WM_20251226092735504',
         reg:{period:'once',
              url:'https://www.taishinbank.com.tw/TSB/personal/credit/intro/overview/cg047/card001/',
              note:'需以台新帳戶設定自動扣繳台新信用卡帳款才具 LEVEL 2 資格（新申辦 60 天內免設定即享 LEVEL 2）'},
         valid:{from:'2026-01-01',to:'2026-12-31'},
         source:'https://mkpcard.taishinbank.com.tw/tscccms/promotion/detail/WM_20251226092735504',
         checkedAt:'2026-08-24'}]},
     overseas_default:{rate:1.3,note:'切換「玩旅刷」。LEVEL 2 為 3.3%，LEVEL 1 僅 1.3%（活動至 2027/03）',
       boosts:[RICHART_L2('玩旅刷 · 其他海外')]},
     tw_cvs:{rate:1.3,note:'切換「Pay著刷」，使用台新 Pay。⚠️ 台新Pay 限全家、7-11 兩大超商（非四大）；LINE Pay 最高 2.3% 且不含四大超商。LEVEL 2 為 3.8%，LEVEL 1 僅 1.3%（活動至 2027/03）',
       boosts:[{...RICHART_L2('Pay著刷 · 超商'),rate:3.8}]},
     tw_dining:{rate:1.3,note:'切換「好饗刷」。LEVEL 2 為 3.3%，LEVEL 1 僅 1.3%',boosts:[RICHART_L2('好饗刷 · 餐飲')]},
     tw_digital:{rate:1.3,note:'切換「數趣刷」。LEVEL 2 為 3.3%，LEVEL 1 僅 1.3%',boosts:[RICHART_L2('數趣刷 · 台灣數位')]},
     tw_shopee:{rate:1.3,note:'切換「數趣刷」。LEVEL 2 為 3.3%，LEVEL 1 僅 1.3%',boosts:[RICHART_L2('數趣刷 · 蝦皮')]},
     tw_costco:{rate:0.3,note:'⚠️ 台新官網權益方案全文查無「好市多／Costco」，並無此加碼通路，僅一般消費 0.3%'},
     tw_insurance:{rate:1.3,note:'台灣保費 1.3%。每期帳單加碼回饋的消費金額上限＝永久信用額度＋NT$30 萬'},
     tw_default:{rate:0.3,note:'一般消費 0.3% 台新Point，無上限'},
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
     overseas_physical:{rate:5.0,note:'日本／韓國／泰國／新加坡／美洲／歐洲地區，以實體卡或 Apple Pay／Samsung Pay 於當地實體門市面對面刷卡 5%，回饋上限 NT$600/期，超過後僅 1%',
       boosts:[{
         id:'dbs-eco-oversea-monthly-3pct',
         label:'海外實體月加碼 3%',
         // 這是「超過 NT$15,000 的部分」再加 3%，跟上面的 5% 是兩件事，
         // 所以 rate 寫 8.0 只在達門檻後的增量成立 —— UI 以 maxOnly 標示為上限值。
         rate:8.0, baseRate:5.0, maxOnly:true,
         reg:{period:'month', opensDom:3,
              url:'https://www.dbs.com.tw/personal-zh/cards/offers/ovstravel/index.html',
              note:'每月都要重新登錄一次，到星展 Card+ 信用卡數位服務登錄。8 月場次為 8/3 10:00 起至 8/31 23:59',
              quota:'每月限量 2,000 名，依達 NT$15,001 的交易日排序'},
         threshold:'當月海外實體一般消費須滿 NT$15,001，只有超過 NT$15,000 的部分才回饋 3%',
         cap:{amt:500,per:'month'},
         valid:{from:'2026-05-01',to:'2026-08-31'},
         source:'https://www.dbs.com.tw/personal-zh/cards/offers/ovstravel/index.html',
         checkedAt:'2026-08-24'}]},
     overseas_online:{rate:1.0,note:'線上購物不適用 5%，僅基本 1%'},
     overseas_subscription:{rate:1.0},
     overseas_apple:{rate:1.0},
     overseas_insurance:{rate:1.0},
     overseas_flight:{rate:1.0,note:'線上訂票不適用 5%'},
     // 2026-08-24 查核更正：原本寫「訂房達門檻可+3%」是錯的。
     // 官網的實際內容是「單筆滿額送定額刷卡金」，不是比例回饋。
     overseas_hotel:{rate:1.0,note:'線上訂房不適用 5%，僅基本 1%',
       boosts:[{
         id:'dbs-eco-hotel-cashback',
         label:'訂房單筆滿額送刷卡金',
         rate:1.0, baseRate:1.0,
         isFixedReward:true,
         channel:'限 Agoda、Booking.com、Trip.com、Airbnb、Expedia、Hotels.com',
         threshold:'單筆滿 NT$2 萬送 NT$500 刷卡金（限量 2,500 名）；單筆滿 NT$5 萬送 NT$1,500 刷卡金（限量 1,000 名）。是定額刷卡金，不是比例回饋，所以不影響上面的 % 數',
         reg:{period:'once',
              url:'https://www.dbs.com.tw/personal-zh/cards/offers/ovstravel/index.html',
              note:'整段活動期間只需登錄一次，到星展 Card+ 登錄',
              quota:'NT$2 萬檔限量 2,500 名／NT$5 萬檔限量 1,000 名'},
         valid:{from:'2026-05-04',to:'2026-08-31'},
         source:'https://www.dbs.com.tw/personal-zh/cards/offers/ovstravel/index.html',
         checkedAt:'2026-08-24'}]},
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
   source:'https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html',checkedAt:'2026-08-24',
   defaultRate:2.0,capKey:'overseas_physical',capAmt:800,capBonusOnly:true,capBonusPct:4,capBaseRate:2.0,
   overrides:{
     // 2026-08-24 查核：6% / NT$800 上限 / 雙任務門檻均與官網相符。
     // 但原 note 的「2026/07 起僅剩單一等級」官網查無此句，已改為官網有明文的說法。
     overseas_physical:{rate:6.0,note:'精選通路 2%+4%=6%（一般海外實體商店；回饋上限 NT$800/帳單週期）。⚠️ 兩項任務缺一不可：①綁永豐台外幣帳戶自動扣繳成功＋設電子/行動帳單並取消實體帳單 ②前月往來資產月平均餘額 ≥NT$10 萬，或當月為 DAWHO 大戶／大戶Plus 等級（大戶與大戶Plus 適用同一檔 +4%）（活動至 2026/12/31）'},
     overseas_online:{rate:6.0,note:'精選網購通路 6%：Amazon、Rakuten、Mercari、eBay、iHerb、Selfridges、Gmarket、Olive Young、淘寶、SUICA/PASMO/ICOCA 儲值、大國藥妝、Sugi藥妝、Klook、KKDAY、Booking.com、Agoda、Hotels、Airbnb、Expedia、Trip.com、Trivago、AsiaYo、旅行社 等；回饋上限 NT$800/帳單週期；需完成雙任務（見海外實體說明）（活動至 2026/12/31）'},
     overseas_flight:{rate:6.0,note:'航空公司購票 6%（回饋上限 NT$800/帳單週期；需完成雙任務）（活動至 2026/12/31）'},
     // 2026-08-24 查核：官網只寫「航空公司」，未明文納入或排除廉航，且加碼依收單行業代號判定。
     // 原本寫 6% 沒有官方依據，不能拿沒查到的東西當保證，先退回非精選通路的 2%。
     overseas_flight_budget:{rate:2.0,note:'⚠️ 官網僅寫「航空公司」，未明文說明是否涵蓋 Ryanair、EasyJet 等廉航，且加碼依收單機構行業代號判定。此處保守以非精選通路 2% 計，實際可能較高，請刷卡前向永豐確認'},
     overseas_hotel:{rate:6.0,note:'Booking.com/Agoda/Hotels/Airbnb/Expedia/Trip.com 等 6%（回饋上限 NT$800/帳單週期；需完成雙任務）（活動至 2026/12/31）'},
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
   officialUrl:'https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/pi-card',
   source:'https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/pi-card',checkedAt:'2026-08-24',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     // 2026-08-24 查核新增：玉山公告把 28 個歐洲國家（含英國）的實體商店消費
     // 列為「非一般消費」，明文「使用各種支付方式皆不提供回饋」，且豁免名單裡沒有 Pi 卡。
     // 對住英國的使用者這格等於 0，原本沒有這個 override 會誤導成 1%。
     overseas_physical:{rate:0,note:'⚠️ 英國等 28 個歐洲國家實體商店消費完全不給 P幣（玉山公告列為非一般消費，各種支付方式皆不提供回饋）。此情境請改用其他卡',
       source:'https://event.esunbank.com.tw/credit/notice/index.html',checkedAt:'2026-08-24'},
     overseas_default:{rate:1.0,note:'一般海外 1% P幣，扣 1.5% 手續費後淨 -0.5%（活動至 2026/08/31，官網尚無 9 月後公告）'},
     tw_default:{rate:1.0,note:'基本 1% P幣（需設定電子帳單）（活動至 2026/08/31，官網尚無 9 月後公告）'},
   }},
  {id:'esun_ubear',bank:'玉山銀行',name:'U Bear 信用卡',
   color:'#005DA0',fee:1.5,rewardType:'cash',rewardLabel:'現金回饋',
   officialUrl:'https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/u-bear',
   source:'https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/u-bear',checkedAt:'2026-08-24',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_subscription:{rate:10.0,note:'指定數位訂閱（Netflix、ChatGPT、Gemini、Steam、Nintendo、PlayStation、Google One、Google Services）最高 10%，每期回饋上限 NT$100（⚠️ Spotify 不在清單；官網此段未列任何帳單e化／自扣條件）（活動至 2026/08/31，官網尚無 9 月後公告）'},
     // 2026-08-24 查核更正：原本寫「指定海外網購通路」，官網實際涵蓋範圍更廣；
     // 且加碼 2% 只需帳單e化，不需自動扣繳（原資料把門檻寫反了）。
     overseas_online:{rate:3.0,note:'網路消費 3%（基本 1%+加碼 2%），加碼每期上限 NT$150。涵蓋所有網路消費含國內外線上、行動支付、App 綁卡；加碼 2% 只需綁定帳單e化（Email 電子帳單或簡訊帳單），不需自動扣繳（活動至 2026/08/31，官網尚無 9 月後公告）'},
     // 「兩者皆未設定 = 0%」是先前的推論，官網只寫「其一 0.5%／兩者 1%」，
     // 沒有明文說都沒設就是 0，所以拿掉那句，不替官網補話。
     overseas_default:{rate:1.0,note:'一般海外 1%（⚠️ 需同時設電子帳單＋玉山帳戶自扣並成功扣繳；僅設一項則 0.5%）（連基本回饋都在活動期內，至 2026/08/31，官網尚無 9 月後公告）'},
     tw_default:{rate:1.0,note:'基本 1%（⚠️ 需同時設電子帳單＋玉山帳戶自扣並成功扣繳；僅設一項則 0.5%）（活動至 2026/08/31，官網尚無 9 月後公告）'},
   }},
  {id:'esun_unicard',bank:'玉山銀行',name:'Unicard（UP 選）',
   color:'#B8860B',fee:1.5,rewardType:'points',rewardLabel:'玉山 e point（1 點 = NT$1 可折抵帳單）',
   officialUrl:'https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard',
   defaultRate:1.0,capKey:null,capAmt:0,capBonusOnly:false,capBonusPct:0,capBaseRate:0,
   overrides:{
     overseas_physical:{rate:3.5,reg:true,regNote:'UP 選加碼 3.5%（⚠️ 英/歐洲 28 國實體消費無基礎 1%，整體僅 3.5%；非百大特店門市無任何回饋）；月上限 5,000 點；需訂閱 UP 選（149 e point/月，或達免費任務）（活動至 2026/12/31）'},
     // 2026-08-24 查核更正：原本這四格都寫 4.5% 且宣稱含 Amazon、eBay，官網查無此事。
     // 玉山百大電商平台只有 momo／蝦皮／淘寶／Coupang，且公告明文
     // 「國外實體商店消費係指面對面交易，『網路交易』不列入消費回饋計算」。
     overseas_online:{rate:1.0,note:'一般線上消費 1%。玉山百大的電商平台僅 momo購物網、蝦皮購物、淘寶網、Coupang酷澎 四家，Amazon、eBay 等海外電商不在名單內（活動至 2026/12/31）'},
     overseas_subscription:{rate:1.0,note:'數位訂閱平台不在玉山百大清單內，僅一般 1%'},
     overseas_hotel:{rate:4.5,reg:true,regNote:'基礎 1%+UP 選 3.5%=4.5%（限 Trip.com、Booking.com、Hotels.com、Expedia、Agoda 五家；⚠️ Airbnb 不在名單內；須以 Unicard 線上完成付款，到店付款不列入）；月上限 5,000 點'},
     overseas_flight:{rate:1.0,note:'一般 1%。百大僅認中華航空、長榮航空、日本航空、台灣虎航、樂桃航空、酷航六家，且限該航空公司臨櫃／官網／App 購票',
       boosts:[{
         id:'esun-unicard-airline-6',
         label:'百大指定航空 6 家',
         rate:4.5, baseRate:1.0,
         channel:'限中華航空、長榮航空、日本航空、台灣虎航、樂桃航空、酷航，且須於該航空公司臨櫃、官網或 App 購票；旅行社與線上旅遊平台購票不算',
         cap:{amt:5000,per:'month',unit:'玉山 e point'},
         valid:{from:'2026-01-01',to:'2026-12-31'},
         source:'https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard',
         checkedAt:'2026-08-24'}]},
     overseas_flight_budget:{rate:1.0,note:'一般 1%。Ryanair、EasyJet、Wizz Air、Vueling 等歐洲廉航皆不在玉山百大名單內（百大認的廉航只有台灣虎航、樂桃、酷航）'},
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
