# 刷卡神器 — 官網查核報告（富邦系 + 其他 7 家）

- 查核日期：2026-08-24（英國時間 BST）
- 查核人：資料查核員（AI）
- 資料檔：`/Users/m.hsieh/Downloads/Mark-Agent/shuaka-repo/data/cards.js`
- 查核範圍：`costco` / `fubon_j` / `jiangjiang` / `ubot_laidian` / `yuanta_diamond` / `sc_linebank` / `fcb_wonderful` / `revolut` / `wise_card`
- 判定標準：**只採官方網域明文**。部落格、卡優、Money101、Dcard、PTT、社群一律不作結論依據。
- 統計：**22 個情境 → ✅吻合 13｜❌不符 7｜⚠️查不到 2**

---

## 0. 行名確認（Mark 指定事項 1）

`costco` 的 `bank` 寫「富邦銀行」、`fubon_j` 寫「台北富邦」，實為同一家。

**正式名稱：台北富邦商業銀行股份有限公司**

原文（頁尾）：

> © 台北富邦商業銀行股份有限公司

來源：<https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000270>、<https://www.fubon.com/banking/Personal/credit_card/all_card/Costco/costco.htm>

建議兩張卡的 `bank` 統一為「台北富邦」。

---

## 1. `costco` 富邦 Costco 聯名卡（3 情境）

官方頁：<https://www.fubon.com/banking/Personal/credit_card/all_card/Costco/costco.htm>
活動頁：<https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000270>

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `tw_costco` | rate 2.0，note「Costco 消費 2% 好多金」 | 賣場/店內 2%、**線上 3%** | ✅吻合 | [fubon.com Costco](https://www.fubon.com/banking/Personal/credit_card/all_card/Costco/costco.htm) | 「賣場/店內消費：2%好多金回饋無上限」「線上購物：3%好多金回饋無上限」 |
| `overseas_physical` | rate 5.0 + boost：每月 1 日 00:00 登錄、限量 5 萬、上限 600 元、2026/1/1–12/31 | 完全一致 | ✅吻合 | [C000270](https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000270) | 「活動期間：2026/1/1~2026/12/31」「國外實體商店 5% 消費地於國外實體門市之刷卡交易」「※最高回饋率：原權益1%回饋無上限+最高4%加碼回饋，正附卡合併計算，每月每戶加碼回饋合計上限600元好多金。」「※每月1日00:00開放登錄，每月登錄名額共5萬名，限登錄正卡人資料。」「登錄名額限量，額滿將提前終止活動…恕無法補登享回饋資格」 |
| `tw_default` | rate 1.0 | 店外一般消費 1% | ✅吻合 | [fubon.com Costco](https://www.fubon.com/banking/Personal/credit_card/all_card/Costco/costco.htm) | 「店外一般消費1%好多金回饋無上限」 |

### 複查結論（Mark 指定事項 2）
`overseas_physical` 的 4 條官網原文**今日複查全部仍正確**，逐條對上：

- 「每月1日00:00開放登錄」→ ✅ 原文一字不差
- 「每月登錄名額共5萬名」→ ✅ 原文一字不差
- 「每月每戶加碼回饋合計上限600元好多金」→ ✅ 原文一字不差
- 「活動期間 2026/1/1~2026/12/31」→ ✅ 原文為「活動期間：2026/1/1~2026/12/31」

### 補充（不影響判定，但建議調整）

**(a) 登錄視窗不只 1 號。** 官網附有逐月登錄期間表，8 月為整月開放：

> 登錄期間 2026/8/1 00:00~8/31 23:59　活動代碼 0802

`reg.opensDom:1` 語意正確（每月 1 日「開放」），但 UI 標籤「每月 1 日搶登錄」會讓人誤以為只有 1 號能登錄。實際是 **1 日開放、整月可登錄、額滿為止**。建議改標籤為「每月 1 日開放登錄（額滿為止）」。

**(b) 登錄管道原文：**

> 每月登錄期間可透過本行網銀/行銀或登錄專線02-8751-1313 >請說【語音登錄】進行登錄流程

**(c) 好多金有期限（資料未收錄）：**

> 於每年3月31日，持卡人其前一年2月1日起至當年度1月31日止所累積而未使用之好多金將會歸零

**(d) 第三方支付不適用：**

> 5.使用第三方支付之交易不適用。
> (4)使用LINE PAY等第三方支付之交易不適用

**(e) `fee:1.5` 無法完全佐證。** 官方費率表只寫富邦自收 0.5%，國際組織手續費未載明百分比：

> 貨幣非為新臺幣或於國外以新臺幣交易時，則授權本行依各信用卡國際組織依約所…織給付之手續費，及發卡機構以交易金額百分之 0.5 計算之國外交易服務費後結付

來源：<https://www.fubon.com/banking/document/public_info/TW/cardpublic_info_feeinfo.pdf>

---

## 2. `fubon_j` 台北富邦 J 卡（6 情境）

官方產品頁（權益與注意事項全文所在）：<https://www.fubon.com/banking/Personal/credit_card/all_card/omiyage/omiyage.htm>
加碼活動頁：<https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000307>

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_physical` | rate 1.0；「6% 僅限日韓泰…**英/歐/北美實體僅基本 1%**」 | 日韓泰 6% 正確；但**歐洲經濟區（含英國）實體商店被排除在「一般消費」外 → 0%**，北美才是 1% | ❌不符 | [omiyage.htm](https://www.fubon.com/banking/Personal/credit_card/all_card/omiyage/omiyage.htm) | 「一般消費定義：不包含指定網路平台交易(註1)、**歐洲經濟區實體商店交易(註2)**、保費…」「(註2)歐洲經濟區實體商店交易：係指營業場所、商業登記地址或營業執照於之國別為歐洲經濟區之國家，目前包含奧地利…西班牙、瑞典、**英國**、冰島、列支敦斯登和挪威等；惟歐盟地區網站消費回饋維持不變。」 |
| `overseas_flight` | rate 3.0；「日韓航空購票 3%（含廉航 Peach/Jetstar/Jeju Air 等）」 | 官網無「航空購票」類別，也未列任何航空公司名單；3% 只能由「日韓泰地區一般消費」規則推導 | ⚠️查不到 | [omiyage.htm](https://www.fubon.com/banking/Personal/credit_card/all_card/omiyage/omiyage.htm) | 「日本/ 韓國/ 泰國地區一般消費享最高3%」「日本地區消費定義係消費幣別為日圓或消費國別為日本始回饋，韓國地區消費定義係消費幣別為韓圜或消費國別為韓國始回饋，泰國地區消費定義係消費幣別為泰銖或消費國別為泰國始回饋。」 |
| `overseas_flight_budget` | rate 3.0；「日韓廉航購票 3%（Peach、Jetstar Japan、濟州航空等）」 | 同上，官網無廉航名單 | ⚠️查不到 | 同上 | 同上 |
| `overseas_hotel` | rate 1.0（無 note） | 無飯店專屬類別；歸「國內及其他海外地區一般消費 1%」 | ✅吻合 | [omiyage.htm](https://www.fubon.com/banking/Personal/credit_card/all_card/omiyage/omiyage.htm) | 「國內及其他海外地區一般消費享最高1%」 |
| `overseas_default` | rate 1.0；「非日韓泰地區海外 1%」 | 一致 | ✅吻合 | [omiyage.htm](https://www.fubon.com/banking/Personal/credit_card/all_card/omiyage/omiyage.htm) | 「國內及其他海外地區一般消費享最高1%」「其他海外地區消費定義：凡消費之交易，經系統辨識收取海外手續費之交易，即視為國外其他地區消費。」 |
| `tw_default` | rate 1.0 | 一致 | ✅吻合 | [omiyage.htm](https://www.fubon.com/banking/Personal/credit_card/all_card/omiyage/omiyage.htm) | 「國內一般消費 最高1%回饋無上限」 |

### 季度登錄查證（Mark 指定事項 3）

**資料宣稱全部正確**，逐條對上官網原文：

| 資料宣稱 | 官網原文 | 判定 |
|---|---|---|
| 活動至 2026/09/30 | 「2026/04/01~2026/09/30」 | ✅ |
| 每月 20 日 16:00 開放搶登錄 | 「◆8月：2026/8/20 16:00起至2026/8/31 23:59(限量20,000名)」 | ✅ |
| 每月限量 20,000 名 | 「(限量20,000名)」 | ✅ |
| 每季總額 60,000 名 | 「※活動需登錄，每季上限60,000名。」 | ✅ |
| 登錄成功後本季皆有效，不需每月重複登錄 | 「※日韓泰加碼活動僅需登錄一次即符合當季活動資格，不需每月重覆登錄(ex.1月登錄成功，1月~3月之日韓泰實體消費皆符合活動資格)」 | ✅ |
| 單筆滿 NT$1,000 | 「活動期間Ｊ卡單筆滿新台幣1,000元，日韓泰實體消費加碼3%，享最高６％回饋。」 | ✅ |
| 每季加碼上限 NT$1,000 | 「(回饋上限每季1,000元/戶)」 | ✅ |
| 登錄頁 `?sn=C000307` | 該頁即為活動頁，內含「立即登錄」 | ✅ |

登錄管道原文：

> ◆網路登錄：下載【 Fubon+台北富邦行動銀行 】，註冊/登錄會員後，點選【優惠】>>【活動登錄】。
> ◆語音登錄：撥打(02)8751-1313按777，進入行銷活動登錄系統後按1，並依語音指示輸入活動代碼：各月輸入活動代碼如下(1)4月「0409」 (2)5月「0507」 (3)6月「0607」(4)7月「0703」 (5)8月「0803」 (6)9月「0903」。

**注意語意差異**：這是**登錄開放時間**（每月 20 日 16:00 開搶），不是回饋生效日。登錄成功後**整季**的日韓泰實體消費都算數。資料目前用 `reg:true` + `regNote` 純文字描述，**尚未結構化成 `boosts`**（Costco 已結構化，J 卡還沒）。

### 日韓泰 6% 的組成與 baseRate

> ※6%回饋=日韓泰原權益最高3%無上限+本活動加碼3%(回饋上限每季1,000元/戶)

也就是說日韓泰實體的 **baseRate 是 3%（無上限）**，不是 1%。資料把 `overseas_physical` 壓成單一 1.0，會讓日韓泰情境嚴重低估、英國情境嚴重高估。

### 電子帳單／自動扣繳是**全卡條件**，且未達成是降到 0.5%（不是 0%）

> 本行帳戶自動扣繳富邦信用卡費設定或電子帳單(且取消實體帳單)申請需於當期帳單結帳日(含)前完成並生效，該期帳單才符合加碼回饋（請留意設定本行帳戶自動扣繳富邦信用卡費，提出申請至生效約需5個工作日）；**尚未生效或無持續符合資格，則享0.5%回饋。**

> A客戶…則2026/5月帳單所涵蓋計算期間為2026/4/15至2026/5/14，該期間入帳之消費將符合加碼回饋資格，**始享日本/韓國/泰國地區一般消費3%、國外其他地區一般消費1%、國內一般消費1%。**

資料把這條只掛在 `overseas_physical` 的 `regNote` 裡，實際上它同時 gate 了 `tw_default`、`overseas_default`、`overseas_hotel`。

### 官網存在、但資料完全沒有的兩個加碼（建議補）

**(a) 日本三大交通卡最高 10%**

> 活動內容：以Apple Pay綁定J卡並刷付日本Suica、PASMO或ICOCA卡儲值金，單筆滿新台幣2,000元，享最高 10% 回饋。
> ※10%回饋=基本權益最高3%+本活動加碼7%(加碼上限200元/戶)
> ※此活動每季僅需登錄一次即符合當季活動資格，不需每月重覆登錄
> 本活動須以正卡持卡人資料登錄且消費達指定門檻後始符合回饋活動資格，每戶加碼上限200元，每季限量30,000名，額滿為止

**(b) J卡亞洲精選最高 6%**（中、港、澳、新、馬、越）

> 活動內容：當月持富邦J卡至指定亞洲精選國家實體消費 累積滿NT$6,000贈NT$300即享券乙張 。
> ※最高享6%=指定亞洲精選國家實體消費滿NT$6,000享NT$300即享券(5%)+基本權益最高1%，共計6%。
> ※ 每月19日16:00開放登錄，每月登錄名額限量10,000名，每戶每月限回饋乙張。

來源：<https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000306>（活動期間 2026/04/01~2026/09/30）

### 其他

- `officialUrl` 目前是 `creditcards.com.tw`（比價網站，非官方）→ 應改為 omiyage.htm。
- 特約商店分期不回饋：「※特約商店分期付款交易：自 2024/4/1 起不再提供回饋。」
- 現金回饋有效期：「現金回饋使用期限為18個月」。
- 選 J Points 版本必須綁 LINE Pay：「選擇LINE POINTS回饋者，所有消費回饋皆須綁定LINE Pay後生效」。

---

## 3. `jiangjiang` 將來銀行 將將卡（2 情境）

官方活動頁：<https://www.nextbank.com.tw/announcement/45c1e31fa40000000285cadc56793797/event1186>（【將將卡】把日常，過成理想生活，最高5%N點回饋!）

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `tw_default` | rate 1.5「一般消費 1.5%」 | **基本回饋 0.5%** | ❌不符 | [event1186](https://www.nextbank.com.tw/announcement/45c1e31fa40000000285cadc56793797/event1186) | 「Part 1-基本回饋 0.5%」「本活動期間，持卡人使用將將卡簽帳之消費， 每筆消費金額享 0.5% N點基本回饋，回饋無上限 。」 |
| `overseas_default` | rate 1.5 | **基本 0.5%**；單筆滿 NT$1,000 且當月登錄才加碼（每筆 45 N點，月上限 225 N點） | ❌不符 | [event1186](https://www.nextbank.com.tw/announcement/45c1e31fa40000000285cadc56793797/event1186) | 「Part 2-理想生活指定通路加碼4.5%」「持卡人於活動期間，當月於「理想生活」指定通路 單筆消費滿新台幣1,000元(含) 以上 ， 並於當月完成 活動登錄 ， 始符合該月加碼回饋資格 。符合資格之單筆交易可享 45 N點 加碼回饋，每人每月回饋 上限225 N點 。」「※指定通路認列：(1) 國外消費：消費國別非台灣或消費幣別非台幣。」 |

### 為什麼會錯：1.5% 是「大將卡」的數字，不是「將將卡」

將來銀行有兩張卡，官網活動頁分開公告：

- **將將卡**（一般簽帳金融卡）＝ 基本 0.5% ＋ 指定通路加碼（要登錄、要單筆滿千）
- **大將卡**（簽帳金融商務御璽卡）＝ 基本 0.5% ＋ 國內加碼 1%（＝1.5%）＋ 海外加碼 2%（＝2.5%），且要通過資產門檻

大將卡原文（<https://www.nextbank.com.tw/announcement/45c1e31fa40000000285cadc56793797/Event937>，標題即「【大將卡】自在出遊 享國內1.5%、海外2.5%回饋無上限！」）：

> 三、指定任務　符合以下三項中的任一項，即符合(Part2、Part3)之活動資格：
> 1. 前月新臺幣活存存款餘額平均NT$300,000
> 2. 前月美元活存主帳戶餘額平均USD$ 5,000
> 3. 前月投資帳戶月平均資產（存款+交易部位）NT$100,000及完成投資屬性測驗

> Part 2-國內刷卡加碼1%無上限(次月回饋)　前月須完成三、指定任務中之任一項
> Part 3-海外刷卡加碼2%無上限(次月回饋)　前月須完成三、指定任務中之任一項

資料裡的 1.5% 幾乎確定是誤植大將卡國內數字。

### 登錄規則（當月登錄／當月有效，不可補登）

> 三、理想生活指定通路加碼回饋登錄時間
> 7月登錄：2026年07月01日至2026年07月31日。
> 8月登錄：2026年08月01日至2026年08月31日。
> 9月登錄：2026年09月01日至2026年09月30日。

> 本活動採當月登錄，當月消費始得回饋；如持卡人未於當月登入將來銀行APP完成活動登錄，該月之消費將 不列入回饋計算 ， 亦不得補登錄或補發回饋 。

活動期間：「二、活動時間：2026年07月01日至2026年09月30日。」→ 今日 2026/08/24 **在期間內**。

### `fee:1.5` ✅ 有官方明文

> 【簽帳金融卡相關】國外交易手續費　每筆交易金額(即折算新台幣之金額)x 1.5%國外交易手續費(含給付國際卡組織1%及本公司收取0.5%)以新台幣計收

來源：<https://static.nextbank.com.tw/static/ofw/nextbank/disclosure/20220328190919467186.pdf>（將來銀行‧簽帳金融卡產品說明書）

### 補充

- N 點效期 730 天：「客戶所累積之回饋點數有效期限為 730天，有效期限起算日為獲得N點入帳當天起算」（<https://www.nextbank.com.tw/faq/4b2c512af800000063ae092602df82df>）
- 「加碼 4.5%」其實是**定額 45 N點/筆**（單筆滿 1,000 元給 45 點）。只有剛好刷 1,000 元才是 4.5%；刷越多、實際百分比越低。月上限 225 點＝最多 5 筆。

---

## 4. `ubot_laidian` 聯邦銀行 賴點卡（2 情境）

官方活動頁：<https://activity.ubot.com.tw/2026LaiDianCard/index.htm>

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_default` | rate 3.0「海外消費 3% LINE POINTS（無上限）」 | 一致（但有前置條件，見下） | ✅吻合 | [2026LaiDianCard](https://activity.ubot.com.tw/2026LaiDianCard/index.htm) | 「凡信用卡帳單「消費地金額及幣別」以外幣請款之一般消費享基本回饋3%無上限」 |
| `tw_default` | rate 1.0 | 一致 | ✅吻合 | [2026LaiDianCard](https://activity.ubot.com.tw/2026LaiDianCard/index.htm) | 「國內一般消費享基本回饋1%無上限」 |

### 對 Mark（倫敦）最關鍵的一段：英國實體店是「期間限定」才有 3%

> 歐洲指定國家實體商店享期間限定回饋3%無上限，正附卡消費合併計算，當月1日至當月月底消費需於次月13日前入帳，將於次月月底前回饋予正卡持卡人綁定之LINE Pay會員帳戶中。

> *歐洲指定國家：奧地利、比利時、保加利亞、克羅埃西亞、賽普勒斯、捷克、丹麥、愛沙尼亞、芬蘭、法國、德國、希臘、匈牙利、愛爾蘭、義大利、拉脫維亞、立陶宛、盧森堡、馬爾他、荷蘭、波蘭、葡萄牙、羅馬尼亞、斯洛伐克、斯洛維尼亞、西班牙、瑞典、**英國**、冰島、列支敦斯登及挪威等。

而**常態規則是排除的**：

> 一般消費定義 、相關注意事項及限制條件 (自113/2/1起，特約商店分期付款之交易、**部分歐洲地區國家實體商店交易不列入計算**) ，請詳見聯邦銀行信用卡網站說明。

該頁「國內外消費回饋」區塊標示的活動期間為：

> 活動期間：115/7/1-115/12/31
> 需申辦電子化帳單並成功綁定於LINE Pay即享LINE POINTS回饋

（民國 115 年＝2026 年，即 2026/7/1–2026/12/31，今日在期間內。）

⚠️ 官網在此區塊只寫「期間限定」，**未單獨標示歐洲加碼的起訖日**。保守處理：以該區塊活動期間 2026/7/1–2026/12/31 為準，並在 UI 註明「英國實體店為期間限定回饋，期滿後依常態規則排除」。

### 資格門檻（資料完全沒有）

> 若未成功申辦電子化帳單及綁定聯邦賴點卡於LINE Pay(僅限綁定台灣LINE帳號)，則將無法享有LINE POINTS點數回饋，並視同放棄無法取得LINE POINTS點數回饋資格

> (1)使用者無法在海外使用LINE Pay綁定聯邦賴點卡付款，可轉為刷實體卡完成交易。

（來源：<https://activity.ubot.com.tw/2026LaiDianCard/faq.htm>）

### 其他

- `officialUrl` 目前是 `creditcards.com.tw`（比價網站，非官方）→ 必須換掉。
- `fee:1.5` **查不到**：官方 FAQ 直接把費率導向客服，未公布百分比 →「(4)海外交易手續費率與相關問題請洽聯邦銀行信用卡客服中心：(02)2545-5168、(07)226-9393。」
- LINE POINTS 效期 180 天：「使用聯邦賴點卡付款累積的LINE POINTS點數有效期限為最後一次獲得點數當日起算180日止」

---

## 5. `yuanta_diamond` 元大銀行 鑽金卡（2 情境）

官方頁：<https://www.yuantabank.com.tw/bank/creditCard/creditCard/in.do?id=275bac7b2e000004dddb>

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_default` | rate 2.2「海外消費 2.2%（⚠️ 紅利 6 個月到期）」 | 一致 | ✅吻合 | [鑽金卡](https://www.yuantabank.com.tw/bank/creditCard/creditCard/in.do?id=275bac7b2e000004dddb) | 「【刷卡回饋】最高2.2%現金回饋　無消費門檻，回饋無上限」「海外消費　2.2%」「鑽金紅利1點=現金回饋1元。」 |
| `tw_default` | rate 1.2 | 一致 | ✅吻合 | [鑽金卡](https://www.yuantabank.com.tw/bank/creditCard/creditCard/in.do?id=275bac7b2e000004dddb) | 「國內消費　1.2%」 |

### rewardLabel「鑽金紅利（6 個月到期）」✅ 有官方明文

> 9.鑽金紅利有效期限為6 個月，到期將自動歸零。鑽金紅利不得與本行其他優惠活動合併計算，即若持卡人符合參與本行其他優惠活動資格，鑽金紅利以百分比最高者為限，不得重複計算。

來源：<https://www.yuantabank.com.tw/bank/creditCard/creditCard/notice.do?id=473dc64ada0000073780&creditCard_id=2756c6f0c700000309a9>

### 補充

- 活動有效期（資料未收錄）：「活動期限115/1/1至115/12/31止」＝ 2026/1/1–2026/12/31。
- 額度限制：「鑽金紅利回饋計算以持卡人當期結帳日永久信用額度內之一般消費金額為限…（海外消費仍適用本活動回饋）」＝ **海外消費不受永久額度上限限制**。
- `fee:1.5` ⚠️查不到（所讀官方頁面未載明國外交易服務費百分比）。

---

## 6. `sc_linebank` 渣打銀行 LINE Bank 聯名卡（2 情境）

官方頁：<https://www.sc.com/tw/credit-cards/linebank-coband-card/>

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_default` | rate 1.0「2025/8 起海外降為 1%（原 3%）」 | 現行 1% 無上限，一致 | ✅吻合 | [LINE Bank 聯名卡](https://www.sc.com/tw/credit-cards/linebank-coband-card/) | 「國內1% / 國外1% 現金回饋無上限」「持卡人每月可享有國內保費1%、國內消費1%、國外消費1%之現金回饋」「國外交易係以外幣計價之消費。」 |
| `tw_default` | rate 1.0 | 一致 | ✅吻合 | [LINE Bank 聯名卡](https://www.sc.com/tw/credit-cards/linebank-coband-card/) | 「一般刷卡無腦消費，筆筆皆享超優惠現金回饋，國內1%(不含學費)、國外1%無上限」 |

### 需要修的地方

- note 的「**2025/8 起**海外降為 1%（原 3%）」屬歷史沿革，官網現行頁面**查不到**這句。數字本身沒錯，但這個時間點無官方依據，建議刪掉或改寫成不帶日期的敘述。
- 官網明文排除學費：「國內1%(不含學費)」。
- 現金回饋有效期：「現金點數有效期限：二年（自回饋入帳當天起起算）。」
- `fee:1.5` ⚠️查不到（該頁只列循環利率、預借現金手續費，未列國外交易服務費百分比）。

### 新發現的條件式加碼（資料沒有）

> 扣款禮（活動期間：2026/8/1~2027/7/31）：LINE Bank聯名卡每次自動扣款成功，即享5%現金加碼回饋(每次回饋上限為新臺幣200元，活動期間限回饋三次，回饋上限總計最高新臺幣600元)。

> 僅限首次申辦LINE Bank聯名信用卡之正卡持卡人…於活動期間內核卡，且自核卡日起算180天內透過LINE Bank主帳戶自動扣繳信用卡款成功者

這是**繳卡費**的回饋，不是消費回饋，別混進消費情境。

---

## 7. `fcb_wonderful` 第一銀行 Wonderful 星璨卡（3 情境）

官方卡頁：<https://card.firstbank.com.tw/sites/Satellite?c=CreditCard&cid=1565690686302&d=Touch&pagename=FirstBankCard%2FCreditCard%2Fzh%2FCreditCardDetailView>
海外活動頁：<https://card.firstbank.com.tw/sites/card/zh_TW/1565709749406>
指定通路活動頁：<https://card.firstbank.com.tw/sites/Satellite?c=CreditCard&cid=1565705350045&d=Touch&pagename=FirstBankCard%2FCreditCard%2Fzh%2FCardActivityDetailView>

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_physical` | rate 3.5「海外實體/**日韓** 3.5%（需設電子帳單+自動扣繳），**無上限**」 | 3.5% 需登錄（限量 2 萬名）、**每戶每月上限 300 元**、電帳**或**自扣（擇一）、**排除歐洲含英國**；「日韓 3.5%」是別張卡 | ❌不符 | [2026精選通路加碼3%](https://card.firstbank.com.tw/sites/card/zh_TW/1565709749406) | 「最高享3.5%現金回饋(含原卡片權益0.5%)。加碼3%」「每戶每月回饋上限300元」「活動登錄名額限量2萬名」「完成申請電子帳單或帳戶扣繳信用卡款」「排除部分歐洲地區國家實體商店消費，包含奧地利…西班牙、瑞典、冰島、列支敦斯登、挪威及**英國**等國家。」 |
| `overseas_default` | rate 1.0 | 無海外專屬類別，歸一般消費 **0.5%** | ❌不符 | [星璨卡](https://card.firstbank.com.tw/sites/Satellite?c=CreditCard&cid=1565690686302&d=Touch&pagename=FirstBankCard%2FCreditCard%2Fzh%2FCreditCardDetailView) | 「一般消費0.5%現金回饋」 |
| `tw_default` | rate 1.5「指定通路 1.5%」 | 一致（但缺上限） | ✅吻合 | [2026指定通路刷卡1.5%](https://card.firstbank.com.tw/sites/Satellite?c=CreditCard&cid=1565705350045&d=Touch&pagename=FirstBankCard%2FCreditCard%2Fzh%2FCardActivityDetailView) | 「一般消費回饋0.5%」＋「指定通路再加碼1%現金回饋，合計最高1.5%回饋」「每戶(含正附卡)每期帳單加碼回饋上限500元」 |

### 「日韓 3.5%」掛錯卡

資料 note 寫「海外實體/日韓 3.5%」。官網確實有一個「日韓海外實體消費享3.5%現金回饋無上限」活動，但**適用卡別是「一卡通聯名卡」，不是星璨卡**：

> 於日本、韓國海外實體店家消費(限當地幣別)，享3.5%現金回饋(含原權益1%)，回饋無上限。

來源：<https://card.firstbank.com.tw/sites/Satellite?c=CreditCard&cid=1565698547009&d=Touch&pagename=FirstBankCard/CreditCard/zh/CardActivityDetailView>（活動期間 2026.1.1~2026.12.31，適用卡別「一卡通聯名卡」）

星璨卡自己的海外活動是「2026精選通路加碼3%現金回饋」，活動期間 **2026.7.1~2026.12.31**，登錄期間 **2026.6.23~2026.12.31**，登錄網址 <https://ccard.firstbank.com.tw/caweb/act/activity_one_login?ActNo=2346>。

### 已排除的其他卡別活動（確認不適用星璨卡，避免誤植）

- 「外幣及指定通路享2％現金回饋」→ 適用 **iLEO 信用卡**
- 「海外外幣實體店家最高3.3%回饋無上限」→ 適用 **個人鈦金商旅卡、雙幣卡**

### 其他

- `defaultRate:1.0` → 官網一般消費是 **0.5%**，應改。
- `officialUrl` 目前是 `https://card.firstbank.com.tw/`（官方網域但只是首頁）→ 建議改成星璨卡頁。
- `fee:1.5` ⚠️查不到（所讀頁面未載明國外交易服務費百分比）。
- 年費：「主卡年費1,200元」「首年免年費」「第2年起正卡申請電子帳單成功，或不限金額任消費1筆，即免次年年費」

---

## 8. `revolut` Revolut 英鎊帳戶（簽帳金融卡）

資料現況：`fee:0`、`defaultRate:0`、`rewardLabel:'無回饋（0% 手續費）'`

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| 換匯費率（`fee`） | 0，標示「0% 手續費」 | **有條件才是 0%**：Standard 每月 £1,000 額度內免費，超過收 1%；另有週末加價 | ❌不符 | [Revolut 官方 Personal Fees (Standard)](https://cdn.revolut.com/terms_and_conditions/pdf/personal_fees_standard_80e14d41_2.6.3_1718717500_en.pdf) | 「Standard: Exchange limit of £1,000 per month. Fair usage fee of 1% applies to any additional exchange. Plus: Exchange limit of £3,000 per month. Fair usage fee of 0.5% applies to any additional exchange. Premium, Metal and Ultra: No exchange limit. No fair usage fee.」 |

### 免費額度（英國，GBP 計價）— ✅ 兩份官方文件互相佐證

上述 £1,000 / 1% 的表格，在**兩份不同的 Revolut 官方 UK 文件**中字句一致：

1. Personal Fees (Standard)：<https://cdn.revolut.com/terms_and_conditions/pdf/personal_fees_standard_80e14d41_2.6.3_1718717500_en.pdf>
2. Personal fees (Ultra)：<https://cdn.revolut.com/terms_and_conditions/pdf/personal_fees_ultra_9d25badd_1.6.0_1765469946_en.pdf>（2025/12 版，全文以 £ 計價，同一張限額表）

額度是**跨資產累計**的：

> This exchange limit applies cumulatively across all types of exchange (money currencies, cryptocurrencies and precious metals). For example, if you're on the standard plan, and have exchanged £500 of currency, £300 of crypto and £200 of precious metals within the month, you have reached your £1000 limit and any further exchange would incur the additional 1% fair usage fee.

### 週末加價 — ⚠️ 有爭議，數字先不要寫進結論

官方原文（Revolut Bank UAB／EEA 版 Personal Fees (Standard)）：

> No fees apply if you make a money currency exchange on weekdays (between 6pm New York time on Sunday and 5pm New York time on Friday) and you are within your plan's exchange limit. If you make an exchange on weekends (between 5pm New York time on Friday and 6pm New York time on Sunday) **a 1% fee applies. This fee is applied regardless of your plan.**

來源：<https://cdn.revolut.com/terms_and_conditions/pdf/personal_fees_standard_e81c1163_1.2.0_1724847118_en.pdf>

**爭議點**：
- 這份是 **Revolut Bank UAB（歐盟主體）** 的文件，以 € 計價，不是 Mark 用的英國主體。
- 我取得的**兩份英國主體 PDF 都沒有週末條款**（只有限額表）。
- revolut.com / help.revolut.com 的英國頁面全部被 bot 防護擋住（HTTP 403 + JS challenge），curl 與抓取工具皆無法讀取正文，因此**無法引用英國版的週末條款原文**。
- 搜尋引擎摘出的英國 help 頁內容另稱「Premium/Metal/Ultra 週末不收費、Plus 收 0.5%」，與 EEA 版「regardless of your plan」**互相矛盾**。

**結論**：確定「週末換匯會加價、Standard 為 1%、時間窗是紐約時間週五 17:00 至週日 18:00」這個**結構**成立；但「是否所有方案一律 1%」在官方文件之間對不上，且英國主體現行條款無法直接取得 → **標為有爭議，勿寫死**。

### ATM 提款（英國主體，資料未收錄）

> ATM Withdrawals　Free withdrawals up to 5 ATM withdrawals or £200 per rolling month (whichever comes first), then a fee applies. That fee is 2% of the withdrawal, subject to a minimum fee of £1 per withdrawal.

### ⚠️ 版本時效提醒

我能取得的英國主體 PDF 最新為 **2025/12**（Ultra 版），Standard 版為 2024/06。今日為 2026/08，**不排除已有更新版本**。官網 HTML 頁面因防爬無法核對。建議在資料裡標註 `checkedAt` 並註明「官網頁面防爬，依官方 PDF 條款」。

---

## 9. `wise_card` Wise 多幣帳戶金融卡

資料現況：`fee:0`、`rewardLabel:'無回饋（銀行間匯率，0% 附加費）'`

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| 換匯費率（`fee`） | 0，標示「0% 附加費」 | **匯率本身確實 0 加價**，但需要換匯時另收換匯費，英國區「from 0.24%」；只有「帳上已持有該幣別」才真的免費 | ❌不符 | [Wise UK 定價](https://wise.com/gb/pricing/) | 「We only use the mid-market rate — the one you can check on Google」「Converting money　Fee varies by currency　From 0.24%」「Pay with the Wise card　Spend funds in your account in the same currency online, in-store and abroad safely　Free」 |

### 拆開講：Wise 的「零手續費」到底零在哪

**✅ 匯率沒有加價（這部分資料是對的）**

> Spend at the mid-market rate
> No markups or margins, so spending costs less

> Forget foreign transaction fees
> No charges just for using your card abroad, with low conversion fees

來源：<https://wise.com/gb/pricing/card-fees>

**❌ 但換匯本身要收費**

> Converting money　Fee varies by currency　From 0.24%

「from 0.24%」是**下限**，實際費率依幣別而定，官網沒有給完整幣別對照表（頁面是即時計算器）。所以 `fee:0` 只在「刷的當下帳戶已有該幣別餘額」時才成立。

**Wise 官方也把這件事講得很直白**（Help Centre）：

> If you don't have the currency you're spending in your account, there's a conversion fee — check the latest pricing for your region

來源：<https://wise.com/help/articles/2934551/what-are-the-wise-card-fees>

### ATM 提款免費額度（資料未收錄）

> You have free withdrawals each month up to a total of 250 GBP. If you withdraw more than this, a fee of 2.69% applies only to the amount in excess of that 250 GBP allowance. Fees per account, per month.

### 其他官方費用

- 實體卡工本費：「Ordering your card　No subscription fees　7 GBP」
- 補發卡：「Replacing your card　2.50 GBP」；到期換卡免費
- 電子錢包儲值 2%：「Topping up external e-wallets…2%」

### 未能查證

- 資料 note 稱「台灣目前無法直接申辦卡片，需海外地址」→ 我**沒有**在 wise.com 找到這句的官方明文，**標為待查**，不要當定論寫進 UI。

---

# 建議修改清單

依「錯得最傷」排序。每條都附官網依據。

## P0 — 會直接誤導倫敦刷卡決策

**1. `fubon_j.overrides.overseas_physical.note`：英國/歐洲不是 1%，是 0%**

- 現值：`'⚠️ 6% 僅限日本/韓國/泰國等指定亞洲國家，英/歐/北美實體僅基本 1%'`
- 建議：`'⚠️ 6% 僅限日韓泰（原權益3%+登錄加碼3%）；⚠️ 英國及歐洲經濟區實體商店不列入一般消費，回饋 0%；北美等其他海外實體 1%'`
- 依據：「一般消費定義：不包含…歐洲經濟區實體商店交易(註2)…」「(註2)…目前包含奧地利…瑞典、英國、冰島、列支敦斯登和挪威等」— <https://www.fubon.com/banking/Personal/credit_card/all_card/omiyage/omiyage.htm>

**2. `fcb_wonderful.overrides.overseas_physical`：3.5% 有上限、要登錄、且排除英國**

- 現值：`{rate:3.5, note:'海外實體/日韓 3.5%（需設電子帳單+自動扣繳），無上限'}`
- 建議：`rate:3.5` / `baseRate:0.5`，note 改為 `'海外實體最高3.5%（原權益0.5%+加碼3%）；⚠️ 需登錄（限量2萬名）；⚠️ 每戶每月上限300元；需申請電子帳單「或」帳戶扣繳卡費；⚠️ 排除歐洲含英國實體商店（活動 2026/7/1~2026/12/31）'`
- 依據：「最高享3.5%現金回饋(含原卡片權益0.5%)。加碼3%」「每戶每月回饋上限300元」「活動登錄名額限量2萬名」「排除部分歐洲地區國家實體商店消費，包含…及英國等國家。」— <https://card.firstbank.com.tw/sites/card/zh_TW/1565709749406>

**3. `jiangjiang` 兩個情境都要從 1.5 降到 0.5**

- `tw_default.rate`：1.5 → **0.5**
- `overseas_default.rate`：1.5 → **0.5**
- 依據：「Part 1-基本回饋 0.5%」「每筆消費金額享 0.5% N點基本回饋，回饋無上限」— <https://www.nextbank.com.tw/announcement/45c1e31fa40000000285cadc56793797/event1186>
- 附註：1.5% 是**大將卡**國內數字（0.5%+加碼1%，且要前月台幣活存日均 30 萬等門檻），不是將將卡。

**4. `revolut.fee`：0 → 條件式**

- 現值：`fee:0`、`rewardLabel:'無回饋（0% 手續費）'`
- 建議：`fee:0`（保留為額度內費率）＋加 note：`'每月換匯免費額度 £1,000（Standard），超過部分收 1% fair usage fee；週末換匯另有加價（時間窗：紐約時間週五17:00–週日18:00）；ATM 每滾動月 5 筆或 £200 內免費，超過 2%（最低 £1）'`
- 依據：「Standard: Exchange limit of £1,000 per month. Fair usage fee of 1% applies to any additional exchange.」— <https://cdn.revolut.com/terms_and_conditions/pdf/personal_fees_standard_80e14d41_2.6.3_1718717500_en.pdf>
- ⚠️ 週末加價的**百分比先不要寫死**（見第 8 節爭議說明）。

**5. `wise_card.fee`：0 → 條件式**

- 現值：`fee:0`、`rewardLabel:'無回饋（銀行間匯率，0% 附加費）'`
- 建議：rewardLabel 改 `'無回饋（中間市場匯率，匯率零加價）'`；加 note：`'匯率採 mid-market 無加價；但需要換匯時另收換匯費，英國區 from 0.24%（依幣別而異）。帳上已有該幣別餘額才是真正 0 費用。ATM 每月 £250 內免費，超過部分收 2.69%'`
- 依據：「We only use the mid-market rate」「Converting money　Fee varies by currency　From 0.24%」— <https://wise.com/gb/pricing/>；「If you don't have the currency you're spending in your account, there's a conversion fee」— <https://wise.com/help/articles/2934551/what-are-the-wise-card-fees>

## P1 — 數值或欄位錯誤

**6. `fcb_wonderful.overrides.overseas_default.rate`：1.0 → 0.5**
依據：「一般消費0.5%現金回饋」— 星璨卡官方卡頁

**7. `fcb_wonderful.defaultRate`：1.0 → 0.5**
依據：同上

**8. `fcb_wonderful.overrides.tw_default`：補上限**
note 加「每期帳單加碼回饋上限 500 元」。依據：「每戶(含正附卡)每期帳單加碼回饋上限500元」

**9. `costco.bank`：'富邦銀行' → '台北富邦'**（與 `fubon_j` 統一）
依據：「© 台北富邦商業銀行股份有限公司」

**10. `costco.overrides.tw_costco.note`：補線上 3%**
現值只寫 2%；官網為「賣場/店內消費：2%好多金回饋無上限」「線上購物：3%好多金回饋無上限」。DC 陣列的版本已有寫「（線上 3%）」，**CARD_DB 與 DC 兩邊不一致，要同步**。

**11. `sc_linebank.overrides.overseas_default.note`：刪掉「2025/8 起」**
官網現行頁面查不到此沿革敘述。建議改為 `'國外消費 1% 無上限（以外幣計價之消費）；扣手續費後淨值為負，海外建議改用 Revolut/Wise'`

## P2 — officialUrl 應改為官方網域

| 卡 | 現值 | 建議 |
|---|---|---|
| `fubon_j` | `creditcards.com.tw/...` ❌ | `https://www.fubon.com/banking/Personal/credit_card/all_card/omiyage/omiyage.htm` |
| `ubot_laidian` | `creditcards.com.tw/...` ❌ | `https://activity.ubot.com.tw/2026LaiDianCard/index.htm` |
| `costco`（DC 陣列） | `creditcards.com.tw/...` ❌ | `https://www.fubon.com/banking/Personal/credit_card/all_card/Costco/costco.htm` |
| `fcb_wonderful` | `card.firstbank.com.tw/`（首頁） | 星璨卡卡頁 cid=1565690686302 |
| `jiangjiang` | `nextbank.com.tw/product/point` | 建議改活動頁 `event1186` |

## P3 — 待查（不要寫進結論）

| 項目 | 狀態 |
|---|---|
| `costco.fee` / `fubon_j.fee` = 1.5 | 官方只載明富邦自收 0.5%，國際組織手續費未列百分比 → 1.5 總額**查不到** |
| `ubot_laidian.fee` = 1.5 | 官方 FAQ 導向客服，未公布 → **查不到** |
| `yuanta_diamond.fee` = 1.5 | 所讀官方頁未載明 → **查不到** |
| `sc_linebank.fee` = 1.5 | 所讀官方頁未載明 → **查不到** |
| `fcb_wonderful.fee` = 1.5 | 所讀官方頁未載明 → **查不到** |
| `jiangjiang.fee` = 1.5 | ✅ **已查到**（產品說明書明文 1.5%，含國際組織 1% + 本行 0.5%） |
| `wise_card.note` 台灣無法申辦 | wise.com 查無明文 → **待查** |
| Revolut 週末加價是否所有方案一律 1% | 官方文件互相矛盾 → **有爭議** |

---

# 條件式回饋清單

依「條件類型」分組。⚠️ 每條都標明是**回饋生效條件**還是**登錄開放時間**。

## A. 需登錄型

### A-1　富邦 Costco 聯名卡 — 海外實體 5%（資料已結構化 ✅）

| 欄位 | 內容 |
|---|---|
| 條件類型 | **登錄**（登錄成功後整月有效，非限定刷卡日） |
| 登錄週期 | 每月 |
| 登錄開放日 | **每月 1 日 00:00**（8 月視窗：2026/8/1 00:00~8/31 23:59，代碼 0802） |
| 名額 | 每月 5 萬名，額滿提前終止，恕無法補登 |
| 登錄管道 | 網銀／行銀／登錄專線 02-8751-1313（說「語音登錄」） |
| 登錄頁 | <https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000270> |
| 回饋 | 國外實體商店 5%（原權益 1% 無上限 + 加碼 4%） |
| 上限 | 每月每戶加碼合計 600 元好多金 |
| 期間 | 2026/1/1 ~ 2026/12/31 |
| 其他限制 | 第三方支付不適用；分期不給原權益 1% |

### A-2　富邦 J 卡 — 日韓泰實體 6%（資料尚未結構化 ❌ 建議補 boosts）

| 欄位 | 內容 |
|---|---|
| 條件類型 | **登錄**（登錄一次即涵蓋整季，非限定刷卡日）＋ **單筆金額門檻** |
| 登錄週期 | 每月開放，但**一季只需登錄一次** |
| 登錄開放日 | **每月 20 日 16:00** 起至月底（8 月：2026/8/20 16:00~8/31 23:59） |
| 名額 | 每月 20,000 名；每季合計 60,000 名 |
| 語音代碼 | 7月0703、8月0803、9月0903 |
| 登錄管道 | Fubon+ App【優惠】>【活動登錄】；或 (02)8751-1313 按 777 再按 1 |
| 登錄頁 | <https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000307> |
| 門檻 | **單筆滿 NT$1,000** 且為日/韓/泰當地**面對面**實體交易（儲值不計） |
| 回饋 | 6% = 原權益 3%（無上限）+ 加碼 3% |
| 上限 | 加碼每季每戶 NT$1,000 |
| 期間 | 2026/4/1 ~ 2026/9/30（**約 5 週後到期**） |

### A-3　富邦 J 卡 — 日本三大交通卡 10%（資料完全沒有）

| 欄位 | 內容 |
|---|---|
| 條件類型 | **登錄**（每季一次）＋ **通路**（Apple Pay）＋ **單筆門檻** |
| 通路條件 | 須以 **Apple Pay 綁定 J 卡**刷 Suica／PASMO／ICOCA 儲值 |
| 門檻 | 單筆滿 NT$2,000 |
| 回饋 | 10% = 基本權益 3% + 加碼 7% |
| 上限 | 加碼 200 元/戶 |
| 名額 | 每季限量 30,000 名 |
| 來源 | <https://www.fubon.com/banking/Personal/credit_card/all_card/omiyage/omiyage.htm> |

### A-4　富邦 J 卡 — 亞洲精選 6%（資料完全沒有）

| 欄位 | 內容 |
|---|---|
| 條件類型 | **登錄**（每月）＋ **通路/國別**＋ **當月累積門檻** |
| 登錄開放日 | **每月 19 日 16:00** 起至月底 |
| 名額 | 每月 10,000 名 |
| 國別 | 中國大陸、香港、澳門、新加坡、馬來西亞、越南（實體、面對面、當地幣別） |
| 門檻 | 當月累積滿 NT$6,000 |
| 回饋 | NT$300 即享券（≈5%）+ 基本權益 1% = 6% |
| 上限 | 每戶每月限 1 張券 |
| 期間 | 2026/4/1 ~ 2026/9/30 |
| 來源 | <https://cardpromote.taipeifubon.com.tw/promotion/Detail?sn=C000306> |

### A-5　將來 將將卡 — 理想生活指定通路加碼（資料完全沒有）

| 欄位 | 內容 |
|---|---|
| 條件類型 | **登錄**（當月登錄／當月有效，**不可補登**）＋ **單筆金額門檻**＋ **通路** |
| 登錄週期 | 每月，且**必須每月重登** |
| 登錄視窗 | 整月（8 月：2026/8/1 ~ 8/31） |
| 登錄管道 | 登入將來銀行 APP |
| 門檻 | **單筆滿 NT$1,000（含）以上** |
| 通路 | (1) 國外消費（消費國別非台灣或幣別非台幣）(2) 旅遊交通：易遊網／KKday／台灣大車隊／高鐵 (3) 國內行動支付：LINE Pay／街口／icash Pay (4) 國內日常民生：餐飲／Uber Eats／foodpanda (5) 娛樂數位：Apple 媒體服務／Google Play |
| 回饋 | 符合的**每筆**給 45 N點（≈單筆 1,000 元時的 4.5%） |
| 上限 | 每人每月 225 N點（＝最多 5 筆） |
| 期間 | 2026/7/1 ~ 2026/9/30 |
| 來源 | <https://www.nextbank.com.tw/announcement/45c1e31fa40000000285cadc56793797/event1186> |

### A-6　第一銀行 星璨卡 — 海外實體 3.5%（資料完全沒有登錄欄位）

| 欄位 | 內容 |
|---|---|
| 條件類型 | **登錄**＋ **帳務設定**＋ **地區排除** |
| 登錄期間 | 2026/6/23 ~ 2026/12/31 |
| 名額 | 限量 20,000 名 |
| 登錄頁 | <https://ccard.firstbank.com.tw/caweb/act/activity_one_login?ActNo=2346> |
| 帳務條件 | 完成申請電子帳單 **或** 帳戶扣繳信用卡款（擇一即可，非兩者都要） |
| 回饋 | 最高 3.5%（原卡片權益 0.5% + 加碼 3%） |
| 上限 | **每戶每月 300 元** |
| 期間 | 2026/7/1 ~ 2026/12/31 |
| ⚠️ 排除 | **歐洲含英國實體商店不適用** |

## B. 限定星期／日期型

### B-1　聯邦 賴點卡 — 偶數日 LINE Pay 指定通路 5%

| 欄位 | 內容 |
|---|---|
| 條件類型 | **回饋生效日**（限定日期，非登錄） |
| 生效日 | 每月 2、4、6、8、10… 等**偶數日** |
| 支付方式 | **僅限** LINE Pay 綁定賴點卡（實體卡與其他支付不適用） |
| 門檻 | 單筆滿 100 元 |
| 上限 | 每 LINE Pay 帳號每月 150 點；每月活動總量 100 萬點，達標提前結束 |
| 原文 | 「活動期間內之偶數日係指每月2日、4日、6日、8日、10日...以此類推，全項通路合併計算，每LINE Pay帳號每月上限150點」 |
| 備註 | 國內通路，對 Mark 用處低，但屬條件式回饋應收錄 |

## C. 限定通路／地區型

### C-1　聯邦 賴點卡 — 歐洲（含英國）實體店期間限定 3%　★ 對 Mark 最重要

| 欄位 | 內容 |
|---|---|
| 條件類型 | **通路／地區**（期間限定活動，非登錄） |
| 常態規則 | 自 113/2/1（2024/2/1）起，**部分歐洲地區國家實體商店交易不列入計算** |
| 期間限定 | 「歐洲指定國家實體商店享期間限定回饋 3% 無上限」 |
| 指定國家 | 含**英國**（另有奧地利、比利時…挪威等 30 國） |
| 前置條件 | 須申辦電子化帳單 **且** 綁定台灣 LINE Pay 帳號，否則整張卡沒有 LINE POINTS 回饋 |
| 期間 | 頁面該區塊標示 115/7/1–115/12/31（2026/7/1–2026/12/31）；⚠️ 官網未單獨標示歐洲加碼起訖日 |
| 來源 | <https://activity.ubot.com.tw/2026LaiDianCard/index.htm> |

### C-2　富邦 J 卡 — 歐洲經濟區實體商店**完全排除**　★ 對 Mark 最重要

| 欄位 | 內容 |
|---|---|
| 條件類型 | **地區排除**（不是降率，是不算一般消費 → 0%） |
| 排除範圍 | 歐洲經濟區實體商店，**含英國**、冰島、列支敦斯登、挪威 + 27 個歐盟國 |
| 不受影響 | 「惟歐盟地區網站消費回饋維持不變」→ **線上**消費仍有回饋 |
| 來源 | <https://www.fubon.com/banking/Personal/credit_card/all_card/omiyage/omiyage.htm> |

### C-3　第一銀行 星璨卡 — 歐洲（含英國）實體商店排除

同 A-6，排除清單明文含英國。

## D. 門檻／帳戶設定型

### D-1　富邦 J 卡 — 自動扣繳或電子帳單（**全卡 gate**，不只海外）

| 欄位 | 內容 |
|---|---|
| 條件類型 | **帳務設定門檻** |
| 條件 | 本行帳戶自動扣繳卡費設定 **或** 電子帳單（且取消實體帳單），須於當期結帳日前完成並**生效** |
| 未達成 | **全部一般消費降為 0.5%**（不是 0%） |
| 達成後 | 日/韓/泰 3%、國外其他 1%、國內 1% |
| 生效時滯 | 自動扣繳申請到生效約需 5 個工作日 |
| 原文 | 「尚未生效或無持續符合資格，則享0.5%回饋。」 |

### D-2　聯邦 賴點卡 — 電子化帳單 + LINE Pay 綁定（**全卡 gate**）

> 若未成功申辦電子化帳單及綁定聯邦賴點卡於LINE Pay(僅限綁定台灣LINE帳號)，則將無法享有LINE POINTS點數回饋，並視同放棄無法取得LINE POINTS點數回饋資格

另注意：**海外無法用 LINE Pay 付款**，須刷實體卡。

### D-3　將來 大將卡（非將將卡）— 資產門檻

前月需符合三選一，才有次月的國內 +1% / 海外 +2%：
台幣活存日均 NT$300,000 ／ 美元活存日均 USD$5,000 ／ 投資帳戶月均 NT$100,000 且完成投資屬性測驗。

### D-4　渣打 LINE Bank 聯名卡 — 自動扣繳 5%（繳卡費回饋，非消費回饋）

| 欄位 | 內容 |
|---|---|
| 條件 | 首次申辦 LINE Bank 聯名卡、活動期間核卡、核卡起 180 天內用 LINE Bank 主帳戶自動扣繳成功 |
| 回饋 | 每次扣繳成功金額的 5% |
| 上限 | 每次 200 元、限 3 次、總計最高 600 元 |
| 期間 | 2026/8/1 ~ 2027/7/31 |

## E. Revolut / Wise（等同條件式費率）

### E-1　Revolut — 免費換匯額度與週末加價

| 欄位 | 內容 |
|---|---|
| 條件類型 | **免費額度**（每滾動月重置）＋ **時間窗加價** |
| Standard 免費額度 | 每月 £1,000；超過部分收 **1% fair usage fee** |
| Plus | 每月 £3,000；超過收 0.5% |
| Premium / Metal / Ultra | 無額度限制、無 fair usage fee |
| 額度計算 | **跨資產累計**（法幣 + 加密貨幣 + 貴金屬合併算） |
| 週末加價 | 紐約時間**週五 17:00 ~ 週日 18:00** 換匯要加費；Standard 為 1% |
| ⚠️ 爭議 | EEA 版條款寫「regardless of your plan」；英國 help 頁（搜尋摘要）稱 Premium 以上免、Plus 0.5%。英國官網被 bot 防護擋住無法取得原文 → **百分比先不要寫死** |
| ATM | 每滾動月 5 筆或 £200 內免費；超過收 2%，最低 £1 |
| 來源 | <https://cdn.revolut.com/terms_and_conditions/pdf/personal_fees_standard_80e14d41_2.6.3_1718717500_en.pdf> ／ <https://cdn.revolut.com/terms_and_conditions/pdf/personal_fees_ultra_9d25badd_1.6.0_1765469946_en.pdf> ／ <https://cdn.revolut.com/terms_and_conditions/pdf/personal_fees_standard_e81c1163_1.2.0_1724847118_en.pdf>（EEA 版，週末條款出處） |

### E-2　Wise — 換匯費與免費提款額度

| 欄位 | 內容 |
|---|---|
| 條件類型 | **是否需要換匯**（決定 0% 或收費）＋ **免費提款額度** |
| 匯率 | 中間市場匯率，**無加價**（"No markups or margins"） |
| 帳上已有該幣別 | **免費**（"Spend funds in your account in the same currency… Free"） |
| 需要換匯時 | 收換匯費，英國區 **from 0.24%**，依幣別而異（官網為即時計算器，無完整對照表） |
| ATM | 每月 £250 內免費；超過部分收 **2.69%**（只對超額部分收） |
| 電子錢包儲值 | 2% |
| 實體卡工本費 | £7；補發 £2.50；到期換卡免費 |
| 來源 | <https://wise.com/gb/pricing/> ／ <https://wise.com/gb/pricing/card-fees> ／ <https://wise.com/help/articles/2934551/what-are-the-wise-card-fees> |

---

# 附錄：查核方法與限制

**成功以官方網域取得原文的來源**
fubon.com、cardpromote.taipeifubon.com.tw、nextbank.com.tw（含 static.nextbank.com.tw 產品說明書 PDF）、activity.ubot.com.tw、yuantabank.com.tw、sc.com/tw、card.firstbank.com.tw、wise.com、cdn.revolut.com（官方條款 PDF）

**遭遇的技術限制**
- `revolut.com` / `help.revolut.com` 全站 bot 防護（HTTP 403 + JS challenge），curl 與抓取工具皆無法取得正文。改以 `cdn.revolut.com` 官方條款 PDF 為依據。
- `card.firstbank.com.tw` 阻擋 curl（Akamai Access Denied），改用網頁抓取工具成功。
- `nextbank.com.tw` 為 JS 渲染，改從頁面內嵌的 `__NEXT_DATA__` JSON 取出活動全文。

**未採信的來源**
creditcards.com.tw、Money101、卡優新聞網、各家部落格與社群內容一律未作為判定依據；搜尋引擎摘要僅用於定位官方頁面，凡未能回到官網讀到明文者，一律標為「查不到」或「有爭議」。
