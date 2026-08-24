# 刷卡神器 — 玉山 / 永豐 / 星展 卡片資料查核報告

- 查核日期：2026-08-24（英國時間）
- 查核範圍：`esun_pi`(2)、`esun_ubear`(4)、`esun_unicard`(8)、`sinopac_dual`(7)、`sinopac_dawho`(2)、`eco`(8) 共 **31 個情境**
- 採信來源：僅限 `esunbank.com` / `event.esunbank.com.tw`（玉山官方公告網域，由玉山產品頁直接連出）、`bank.sinopac.com`、`www.dbs.com.tw`
- 結果：**✅吻合 24 / ❌不符 6 / ⚠️查不到 1**

---

## 1. `esun_pi` 玉山 Pi 拍錢包信用卡

官網主頁：https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/pi-card
官方公告（非一般消費項目）：https://event.esunbank.com.tw/credit/notice/index.html

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_default` | rate 1.0，「2025/3/1 起一般海外降為 1% P幣，扣費後淨 -0.5%」 | 基本回饋 1% P幣無上限（需帳單e化）；**但英國等 28 個歐洲國家的實體商店消費被列為「非一般消費」，完全不給回饋**。且官網未出現「2025/3/1 起海外降為 1%」的敘述 | ❌不符 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/pi-card ／ https://event.esunbank.com.tw/credit/notice/index.html | 「基本回饋 1%P幣無上限 (需申請帳單e化，未申辦帳單e化者享0.3% P幣回饋無上限，正附卡分開計算)」；「【基本回饋】限新增一般消費，本活動一般消費不包含特店分期及歐盟實體交易、繳稅費及四大超商、全聯交易及綁定行動支付於本行公告之非一般消費通路消費」；公告：「部分歐洲地區國家實體商店消費：英國、奧地利、比利時、保加利亞、克羅埃西亞、賽普勒斯、捷克、丹麥、愛沙尼亞、芬蘭、法國、德國、希臘、匈牙利、愛爾蘭、義大利、拉脫維亞、立陶宛、盧森堡、馬爾他、荷蘭、波蘭、葡萄牙、羅馬尼亞、斯洛伐克、斯洛維尼亞、西班牙、瑞典。」 |
| `tw_default` | rate 1.0，「基本 1% P幣（需設定電子帳單）」 | 一致。1% 需帳單e化，未申辦僅 0.3% | ✅吻合 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/pi-card | 「基本回饋 1%P幣無上限 (需申請帳單e化，未申辦帳單e化者享0.3% P幣回饋無上限，正附卡分開計算)」 |

**額外發現（資料完全未收錄）**：Pi 卡有一個需登錄的月累積加碼，最高 3%：

> 「加碼回饋 每月國內外一般消費累積滿10,000~29,999元 加碼0.8%P幣，最高1.8% P幣／每月國內外一般消費累積滿30,000元(含)以上 加碼2%P幣，最高3% P幣 (每月每歸戶上限1,000 P幣)」
> 「活動期間僅需登錄1次即可參加每月刷卡活動，自登錄當月始計算當月國內一般消費累積金額，不溯及既往。」

且**整個 Pi 卡回饋方案的活動期間是「活動期間：2026/3/1～2026/8/31」，7 天後到期**，資料完全沒有標示效期。

---

## 2. `esun_ubear` 玉山 U Bear 信用卡

官網主頁：https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/u-bear

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_subscription` | rate 10.0，上限 NT$100/期，Spotify 不在清單，無需設電子帳單/自扣，活動至 2026/08/31 | 全部一致。活動期間 2026/3/1~2026/8/31。清單無 Spotify。該段注意事項未列任何帳單e化/自扣條件（與網購加碼形成對比） | ✅吻合 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/u-bear | 「活動期間：2026/3/1~2026/8/31 指定數位訂閱平台消費最高享 10%現金回饋 每期回饋上限100元，於當期帳單直接折抵」；「指定數位訂閱平台消費最高10%現金回饋採正附卡合併計算，每期回饋金額上限100元，不另累計一般消費、網路消費回饋，若達回饋上限，則不再享任何回饋。」；「指定數位訂閱平台包含Netflix、ChatGPT、Gemini、Steam、Nintendo、PlayStation」；「另 Google One 與 Google Services 皆歸類為指定數位訂閱消費」 |
| `overseas_online` | rate 3.0（1%+2%），加碼每期上限 NT$150，活動至 2026/08/31 | 費率、上限、期限全部一致。**但「指定海外網購通路」描述錯誤** — 官網是全部網路消費（含國內外線上、行動支付、App 綁卡），不是指定通路清單。且加碼 2% 只需帳單e化，**不需自扣** | ✅吻合 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/u-bear | 「活動期間：2026/3/1~2026/8/31 網路消費最高享 3%現金回饋 ... 每期回饋上限150元，於當期帳單直接折抵」；「網路消費加碼2%需綁定帳單e化 (Email電子帳單/簡訊帳單) 才享回饋。」；「網路消費包含行動支付 (例如：全支付(繳費及全聯、大全聯不適用)、LINE Pay、街口支付等) 、國內外線上消費 (例如：momo購物網、蝦皮、淘寶、線上訂房、高鐵線上購票等)與手機APP綁定信用卡付款」 |
| `overseas_default` | rate 1.0，需同時電子帳單+自扣；僅一項 0.5%；未設 0% | 一致。**額外好消息：U Bear 是歐洲排除名單的豁免卡，英國實體消費仍有回饋** | ✅吻合 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/u-bear ／ https://event.esunbank.com.tw/credit/notice/index.html | 「(1)國內外一般消費0.5%現金回饋，需綁定帳單e化(Email電子帳單或簡訊帳單)或申請玉山銀行臺幣帳戶自動扣繳且成功扣繳卡費。(2)國內外一般消費1%現金回饋，需同時申辦帳單e化及玉山銀行臺幣帳戶自動扣繳，且成功扣繳卡費。」；公告：「特定卡片 (玉山世界卡、醫師尊榮無限卡、會計師無限卡、中醫師無限卡、建築師無限卡、牙醫師無限卡、藥師無限卡、ＵBear卡、Only卡、雙幣卡 (不含熊本熊雙幣卡)、商務白金卡、商務御璽卡、雙北市牙醫師公會會員卡及星宇航空聯名卡) 於歐洲地區實體特店刷卡仍享消費回饋」 |
| `tw_default` | rate 1.0，同上條件 | 一致 | ✅吻合 | https://www.esunbank.com/zh-tw/about/faq/content?q=credit_card%2F141 | 「國內外一般消費最高享1%現金回饋，需綁定帳單e化或申辦玉山銀行臺幣帳戶自動扣繳享0.5%現金回饋，申辦上述兩者享1%現金回饋。」「一般消費回饋無上限，不需登錄」 |

**針對「2026/08/31 到期、有無 9 月新方案」的專項查核結果**：
- 到期日 ✅ 確認。**且不只加碼，連「基本回饋 1%」本身的活動期間也是 2026/3/1~2026/8/31**（原文：「熊任務 基本回饋 活動期間：2026/3/1~2026/8/31 國內外一般消費最高享 1%現金回饋」）。資料只在訂閱/網購兩列標了效期，基本回饋兩列沒標。
- **9 月後新方案：⚠️查不到。** 玉山官網 U Bear 產品頁、FAQ、公告頁在 2026-08-24 當下皆無 2026/9 起的新回饋方案公告。官網唯一跨 9 月的敘述是新戶加碼的回饋發放時程（「2026/8/1~2026/8/31申辦且核卡，於次月起3個月( 回饋加碼期間：2026/9/1~2026/11/30)新戶網路消費加碼7%回饋。」），那是新戶專案不是常態方案。**不推測，就是查不到。**

---

## 3. `esun_unicard` 玉山 Unicard（UP 選）

官網主頁：https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_physical` | rate 3.5，英/歐洲 28 國實體無基礎 1%，月上限 5,000 點，需訂閱 UP 選（149 e point 或免費任務），活動至 2026/12/31 | **全部正確，28 國逐字比對數量吻合** | ✅吻合 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard ／ https://event.esunbank.com.tw/credit/notice/index.html | FAQ 11：「一般消費項目不含歐洲地區實體特店交易，玉山Unicard百大指定消費其中的國外實體消費是否有回饋呢？」→「一般消費不包含之特店國家如：英國、法國、德國、義大利，僅適用百大特店加碼回饋(2%~3.5%)。」；「百大指定消費 +3.5% (歸戶月上限5,000點)」；「活動期間：2026/7/1~2026/12/31」；公告 28 國逐字：「英國、奧地利、比利時、保加利亞、克羅埃西亞、賽普勒斯、捷克、丹麥、愛沙尼亞、芬蘭、法國、德國、希臘、匈牙利、愛爾蘭、義大利、拉脫維亞、立陶宛、盧森堡、馬爾他、荷蘭、波蘭、葡萄牙、羅馬尼亞、斯洛伐克、斯洛維尼亞、西班牙、瑞典。」 |
| `overseas_online` | rate 4.5，「含 Amazon、eBay 等百大特店」 | **Amazon、eBay 都不在百大清單。** 電商平台類別只有 momo、蝦皮、淘寶、Coupang。且「國外實體」類別明文排除網路交易。海外網購只有一般消費 1% | ❌不符 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard | 「電商平台：momo購物網、蝦皮購物、淘寶網、Coupang酷澎」；「國外實體商店消費係指面對面交易，「網路交易」不列入消費回饋計算」；FAQ 10：「不包含國外購物網站、國外訂房網店等線上交易。」 |
| `overseas_subscription` | rate 4.5 | **Netflix / Spotify / 任何數位訂閱皆不在百大清單**，僅一般消費 1% | ❌不符 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard | 百大十大類別為「行動支付／電商平台／國內百貨／生活採買／餐飲美食／加油交通／航空旅遊／國外實體／精選商家／ESG消費」，清單內無任何數位訂閱平台 |
| `overseas_hotel` | rate 4.5，「Booking.com、Agoda、Airbnb 等百大特店」 | 費率正確。**但 Airbnb 不在清單**；且必須線上完成付款，到店付款不算 | ✅吻合 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard | 「航空旅遊：中華航空、長榮航空、日本航空、台灣虎航、樂桃航空、酷航、Trip.com、Booking.com、Hotels.com、Expedia、KKday、Klook、雄獅旅遊、可樂旅遊、東南旅遊、Agoda、五福旅遊、加利利旅行社、找到了旅行社、喜鴻假期、鳳凰旅遊」；「旅遊平台 (Trip.com、Booking.com、Hotels.com、Expedia、Agoda) 需使用玉山Unicard線上完成付款方享回饋，若選擇延後付款，則依實際消費日認列於該月份，若為到店付款將不列入回饋計算。」 |
| `overseas_flight` | rate 4.5，「航空公司百大特店」 | **百大只認列 6 家航空公司**，且限該航空官網/App/臨櫃。BA、Lufthansa、法航等歐洲籍航空皆不在內，只有 1% | ❌不符 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard | 「航空公司(中華航空、長榮航空、日本航空、台灣虎航、樂桃航空、酷航) 限於該航空公司臨櫃、官網及APP購票，以及包含機上免稅商品、機場商店或貴賓室等非購買機票之消費，但不含旅行社、線上旅遊平台購票。」 |
| `overseas_flight_budget` | rate 4.5 | 百大內的廉航只有台灣虎航、樂桃、酷航。工具此情境的範例（Ryanair、EasyJet、Wizz Air、Vueling）**全部不在清單**，只有 1% | ❌不符 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard | 同上：「航空公司(中華航空、長榮航空、日本航空、台灣虎航、樂桃航空、酷航)」 |
| `overseas_default` | rate 1.0，「英/歐洲實體消費基礎回饋為 0%」 | 一致 | ✅吻合 | https://event.esunbank.com.tw/credit/notice/index.html | 「部分歐洲地區國家實體商店消費（使用各種支付方式皆不提供回饋）」＋28 國名單 |
| `tw_default` | rate 1.0，「台灣一般消費 1%」 | 費率一致，**但漏掉條件**：1% 必須同時申請帳單e化＋玉山臺幣帳戶自動扣繳 | ✅吻合 | https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard | 「一般消費 最高 1% 無上限 (需同時申請帳單e化 及 玉山銀行臺幣帳戶自動扣繳卡費)」 |

**「活動至 2026/12/31」專項確認**：✅ 正確。原文「活動期間：2026/7/1~2026/12/31」，百大清單也標明「2026/7/1~2026/12/31適用百大指定消費列表如下」。

---

## 4. `sinopac_dual` 永豐 幣倍卡

官網主頁：https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html
官網活動頁（第二來源）：https://bank.sinopac.com/sinopacBT/webevents/2003_dualcc/index.html

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_physical` | rate 6.0（2%+4%），上限 NT$800/期，需自扣+電子帳單，且資產月均≥10萬或大戶/大戶Plus | 費率、上限、兩項任務全部一致 | ✅吻合 | https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html | 「完成以下指定任務者，於活動期間內享精選通路加碼4%現金回饋（上限800元/帳單週期）」；「國外實體：交易地區非臺灣，且非新臺幣之實體商店一般消費」 |
| `overseas_online` | rate 6.0，精選網購通路清單 | 費率一致。清單有小錯：官網是「Selfridges」非「Selfridge」；資料漏列 Hotels、AsiaYo、旅行社、歐特儀松山機場停車 | ✅吻合 | https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html | 「網購消費：日本三大交通卡(SUICA、PASMO、ICOCA)儲值、大國藥妝、Sugi藥妝、Rakuten、Mercari、Amazon、iHerb、Selfridges、eBay、淘寶、Gmarket、Olive Young」 |
| `overseas_flight` | rate 6.0 | 一致，「航空公司」明列於旅遊通路 | ✅吻合 | https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html | 「旅遊通路：航空公司、旅行社、 Booking.com、Agoda、Hotels、Expedia、Trip.com、Airbnb、Klook、KKDAY、Trivago、AsiaYo、歐特儀松山機場停車消費」 |
| `overseas_flight_budget` | rate 6.0 | 官網僅寫「航空公司」，**未明文說明廉航是否納入或排除**，且加碼依收單機構行業代號判定 | ⚠️查不到 | https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html | 「旅遊通路：航空公司、旅行社…」；「加碼回饋係依據收單機構登記之行業代號及實體交易註記進行判斷。」 |
| `overseas_hotel` | rate 6.0，Booking.com/Agoda/Airbnb | 一致，三者皆在旅遊通路清單 | ✅吻合 | https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html | 同上旅遊通路原文 |
| `overseas_default` | rate 2.0，非精選通路海外 2% 無上限 | 一致 | ✅吻合 | https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html | 「國內1%、國外2%回饋無上限」；「※國外消費係指註冊地在國外之特店、消費地於國外或有國外交易手續費之一般消費…刷卡交易範圍包含國外實體商店或國外購物網站(如agoda、淘寶網…等)。」 |
| `tw_default` | rate 1.0 | 一致 | ✅吻合 | https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html | 「國內1%、國外2%回饋無上限」 |

**「回饋上限 NT$800/期」專項確認**：✅ 兩個獨立官方頁面皆載明。
> 產品頁：「完成以下指定任務者，於活動期間內享精選通路加碼4%現金回饋（上限800元/帳單週期）」
> 注意事項第五條：「回饋上限為新臺幣800元回饋金，將於次期帳單發放」

**「需往來資產月均≥NT$10萬或大戶等級」專項確認**：✅ 正確，且是**兩項任務都要達成**。
> 「一、符合以下兩項任務條件，當月消費方可享「精選通路」加碼4%現金回饋：（兩項條件需同時達成始符合資格，若僅完成其中一項則不符資格）
> (一) 任務一：完成綁定永豐銀行新臺幣及外幣帳戶（含數位帳戶）為信用卡自動扣繳帳戶並成功扣款，且完成電子或行動帳單設定並取消實體帳單寄送。
> (二) 任務二：正卡持卡人前月於永豐銀行之往來資產月平均餘額達新臺幣十萬元（含）以上 或 當月永豐銀行DAWHO專屬分級制度中之大戶／大戶Plus等級」

**「2026/07 起僅剩單一等級」專項確認**：⚠️ **官網無此明文**，不要照抄。
- 官網唯一與 7 月權益轉換有關的句子只有：「＊因應權益優惠轉換，精選通路將於2026年7月帳單回饋時，採取擇優回饋方式計算。」
- 實質上可佐證的是：現行（2026/7/1~12/31）方案的精選通路加碼**只有一檔 +4%（上限 800）**，且大戶與大戶Plus 享同一檔，沒有分級差異。對照永豐 2025/09/24 新聞稿的舊制，當時是「+1%（無上限）」與「+4%（上限300元）」兩檔並存。
- 結論：**「單一等級」的實質敘述成立，但「2026/07 起僅剩單一等級」這句話在官網找不到出處，建議改寫成官網有明文的說法。**

---

## 5. `sinopac_dawho` 永豐 DAWHO 大戶卡

官網主頁：https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/DAWHO.html
官方新聞稿（第二來源）：https://bank.sinopac.com/sinopacBT/about/news-center/news/content/2025122301.html

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_default` | rate 6.0（大戶Plus 2%+4%，月加碼上限 NT$1,000）；一般大戶 2%+2.5%=4.5%（月上限 NT$400） | 兩個獨立官方來源完全一致 | ✅吻合 | https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/DAWHO.html | 「活動期間：2026/7/1-2026/12/31 活動內容：國內消費最高5%、國外消費最高6%現金回饋！【一般消費】國內 1% 、國外 2% 現金回饋無上限！【完成指定任務】大戶Plus等級加碼4%，回饋上限NT$1,000/月帳單週期、大戶等級加碼2.5%，回饋上限NT$400/月帳單週期、大大等級無加碼優惠(不含保費代繳金額且僅限一般消費)。」 |
| `tw_default` | rate 5.0（大戶Plus 國內最高 5%，月上限 NT$1,000） | 一致（1% + 4% = 5%） | ✅吻合 | https://bank.sinopac.com/sinopacBT/about/news-center/news/content/2025122301.html | 新聞稿分級表：「DAWHO信用卡 基本回饋 國內一般消費：1%無上限 國外一般消費：2%無上限」／「DAWHO信用卡 指定任務回饋 大大：無｜大戶：一般消費：國內+2.5%；國外+2.5%（每月帳單上限新臺幣400元）｜大戶Plus：一般消費：國內+4%；國外+4%（每月帳單上限新臺幣1,000元）」 |

**兩個要注意的建模問題（資料目前沒表達）**：
1. **NT$1,000 上限是國內+國外共用一個池**，不是海外專用。現行 `capKey:'overseas_default'` 會低估國內消費對上限的消耗。原文「一般消費：國內+4%；國外+4%（每月帳單上限新臺幣1,000元）」是一組數字涵蓋兩者。
2. 資料完全沒寫**指定任務**條件，但官網明文兩項缺一不可：
> 「指定任務完成認定：①綁定【DAWHO數位存款新臺幣帳戶自動扣繳信用卡帳款】設定完成且扣款成功。②使用【電子或行動帳單】完成設定且寄送成功並取消實體帳單。前述兩項任務須同時達成，始可獲指定任務加碼回饋，若僅達成其中一項任務，恕無法提供加碼回饋。」

---

## 6. `eco` 星展 eco 永續卡

官網主頁：https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html
海外旅遊活動頁：https://www.dbs.com.tw/personal-zh/cards/offers/ovstravel/index.html

| 情境 | 現有資料宣稱 | 官網實際 | 判定 | 官網URL | 原文引用 |
|---|---|---|---|---|---|
| `overseas_physical` | rate 5.0，`capAmt` 600，超過後僅 1% | **完全正確。capAmt 600 複查通過。** 適用區含英國（GBR 在名單內） | ✅吻合 | https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html | 「加碼回饋依每期帳單計算，國外指定地區4%加碼回饋每期帳單回饋上限為600點。【舉例】持卡人於美國消費USD41.49…則回饋計算為NT$1,316*（一般國外消費1%無上限+加碼回饋4%當期帳單上限600點）=可獲得13點+ 53點，共66點。」；「持卡人於日本、韓國、泰國、新加坡、美洲地區、歐洲地區，以實體卡片或Apple Pay／Samsung Pay於當地實體門市等進行面對面刷卡消費…即可符合額外加碼活動。」；名單含「GBR英國」 |
| `overseas_online` | rate 1.0，線上不適用 5% | 一致 | ✅吻合 | https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html | 「以實體卡片或Apple Pay／Samsung Pay於當地實體門市等進行面對面刷卡消費…即可符合額外加碼活動」（線上不符） |
| `overseas_subscription` | rate 1.0 | 一致 | ✅吻合 | https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html | 「國內／國外一般消費…享現金積點 1% 回饋無上限」 |
| `overseas_apple` | rate 1.0 | 一致 | ✅吻合 | https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html | 同上 |
| `overseas_insurance` | rate 1.0 | 一致，保費明列於 1% 適用範圍 | ✅吻合 | https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html | 「國內／國外一般消費 保險費代扣繳 超商街口支付 享現金積點 1% 回饋無上限」 |
| `overseas_flight` | rate 1.0，線上訂票不適用 5% | 一致 | ✅吻合 | https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html | 同 `overseas_physical` 的面對面刷卡條款 |
| `overseas_hotel` | rate 1.0；註記「季度旅遊加碼活動：Agoda/Booking.com 訂房達門檻可+3%，需在 Card+ App 登錄，2026/5–8/31」 | 費率 1.0 正確，**但註記實質錯誤**：官網的訂房任務不是「+3% 比例回饋」，而是**單筆消費滿額送固定刷卡金、且限量**；「3%」只是 1,500/50,000 換算出來的行銷「最高」值 | ❌不符 | https://www.dbs.com.tw/personal-zh/cards/offers/ovstravel/index.html | 「海外訂房 最高 3 % 回饋 登錄期間：2026/5/4 10:00-2026/8/31 23:59 活動期間指定訂房平台刷星展卡 消費滿額並完成登錄：單筆消費滿2萬享 NT$500刷卡金（限量2,500名）單筆消費滿5萬享 NT$1,500刷卡金（限量1,000名）」；「指定訂房平台：Agoda、Booking.com、Trip.com、Airbnb、Expedia、Hotels.com」 |
| `tw_default` | rate 1.0 | 一致 | ✅吻合 | https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html | 「國內／國外 1% 回饋無上限 活動期間：2026/01/01～2026/12/31」 |

**`capAmt: 600` 交叉驗證（兩個獨立官方頁面）**：
1. 產品頁注意事項原文（上表已引）— 直接明文 600 點。
2. 旅遊活動頁獨立佐證：加碼在 NT$15,000 消費處用盡（15,000 × 4% = 600），該頁把 NT$15,000 當成分界點 —「「加碼3%回饋」每月海外實體商店一般消費刷卡達NT$15,001且於當月登錄名單內，超過NT$15,000之部分回饋3%刷卡金」。

**資料庫內部不一致**：`CARD_DB` 的 eco `overseas_physical` 註記寫「實體消費 5%」沒寫適用地區，`DC` 寫「英/歐/日/韓/新/泰/美洲 實體消費」。以官網為準應統一為「日本／韓國／泰國／新加坡／美洲地區／歐洲地區」。

---

# 建議修改清單

## A. 必改（會讓使用者拿到錯誤數字）

| # | 卡片 / 欄位 | 現值 | 建議改成 | 官網依據 |
|---|---|---|---|---|
| A1 | `esun_unicard.overrides.overseas_online.rate` | 4.5 | **1.0**（並移除 Amazon、eBay 字樣，改為 boost：僅 momo/蝦皮/淘寶/Coupang 且限實體卡付款才有 +3.5%） | 百大電商平台清單只有「momo購物網、蝦皮購物、淘寶網、Coupang酷澎」；「國外實體商店消費係指面對面交易，「網路交易」不列入消費回饋計算」 |
| A2 | `esun_unicard.overrides.overseas_subscription.rate` | 4.5 | **1.0** | 百大十大類別無任何數位訂閱平台 |
| A3 | `esun_unicard.overrides.overseas_flight.rate` | 4.5 | **1.0**，並加 boost：限中華航空、長榮航空、日本航空、台灣虎航、樂桃航空、酷航 6 家、且限官網/App/臨櫃購票時 4.5% | 「航空公司(中華航空、長榮航空、日本航空、台灣虎航、樂桃航空、酷航) 限於該航空公司臨櫃、官網及APP購票…但不含旅行社、線上旅遊平台購票。」 |
| A4 | `esun_unicard.overrides.overseas_flight_budget.rate` | 4.5 | **1.0**（工具的廉航範例 Ryanair/EasyJet/Wizz Air/Vueling 皆不在百大） | 同 A3 |
| A5 | `esun_pi.overrides` | 無 `overseas_physical` | **新增 `overseas_physical:{rate:0}`**（英國等 28 國實體消費不給任何 P 幣） | 「部分歐洲地區國家實體商店消費（使用各種支付方式皆不提供回饋）」＋28 國名單；Pi 卡不在豁免名單 |
| A6 | `eco.overrides.overseas_hotel.note` | 「訂房達門檻可+3%」 | 改為「單筆滿 NT$2 萬送 NT$500 刷卡金（限量 2,500 名）／單筆滿 NT$5 萬送 NT$1,500 刷卡金（限量 1,000 名），須於 Card+ 登錄，2026/5/4~8/31」 | ovstravel 活動頁原文（已引） |
| A7 | `esun_unicard.overrides.overseas_hotel.note` | 含「Airbnb」 | 移除 Airbnb（不在百大清單），並補「須線上完成付款，到店付款不列入」 | 「旅遊平台 (Trip.com、Booking.com、Hotels.com、Expedia、Agoda) 需使用玉山Unicard線上完成付款方享回饋…若為到店付款將不列入回饋計算。」 |

## B. 該補（效期與條件缺漏）

| # | 卡片 / 欄位 | 建議 | 官網依據 |
|---|---|---|---|
| B1 | `esun_ubear.overseas_default` / `tw_default` | 補上「活動至 2026/08/31」— 連基本 1% 都在活動期內 | 「熊任務 基本回饋 活動期間：2026/3/1~2026/8/31」 |
| B2 | `esun_pi` 兩個情境 | 補上「活動至 2026/08/31」 | 「消費最高享 3% P幣 活動期間：2026/3/1～2026/8/31」 |
| B3 | `esun_ubear.overseas_online.note` | 「指定海外網購通路」→ 改為「所有網路消費（含國內外線上、行動支付、App 綁卡）」；並註明加碼 2% 只需帳單e化、不需自扣 | 「網路消費加碼2%需綁定帳單e化 (Email電子帳單/簡訊帳單) 才享回饋。」 |
| B4 | `esun_unicard.tw_default.note` | 補「1% 需同時申請帳單e化＋玉山臺幣帳戶自動扣繳」 | 「一般消費 最高 1% 無上限 (需同時申請帳單e化 及 玉山銀行臺幣帳戶自動扣繳卡費)」 |
| B5 | `sinopac_dawho` 兩個情境 | 補指定任務條件（自動扣繳＋電子/行動帳單，缺一不可） | DAWHO 注意事項二（已引） |
| B6 | `sinopac_dawho.capKey` | NT$1,000 是國內＋國外共用池，不是海外專用 | 「一般消費：國內+4%；國外+4%（每月帳單上限新臺幣1,000元）」 |
| B7 | `sinopac_dual.*.note` | 「2026/07 起僅剩單一等級」官網無明文，建議改為官網有出處的「大戶與大戶Plus 適用同一檔 +4%（上限 800 元/帳單週期）」 | 「任務二：…達新臺幣十萬元（含）以上 或 當月永豐銀行DAWHO專屬分級制度中之大戶／大戶Plus等級」 |
| B8 | `sinopac_dual.overseas_online.note` | 「Selfridge」→「Selfridges」；補 Hotels、AsiaYo、旅行社 | 「…iHerb、Selfridges、eBay、淘寶、Gmarket、Olive Young」 |
| B9 | `eco` CARD_DB 與 DC 的 `overseas_physical.note` | 統一為「日本／韓國／泰國／新加坡／美洲地區／歐洲地區」實體門市面對面刷卡 | 「持卡人於日本、韓國、泰國、新加坡、美洲地區、歐洲地區，以實體卡片或Apple Pay／Samsung Pay於當地實體門市等進行面對面刷卡消費」 |

## C. 不要改（複查後確認正確）

- `eco.capAmt = 600` — **維持 600**，官網明文＋活動頁 NT$15,000 分界點雙重佐證。
- `sinopac_dual.capAmt = 800` — 維持，兩個官方頁面明文。
- `sinopac_dawho` 6.0 / 5.0 / 上限 1,000 / 400 — 維持，產品頁＋新聞稿雙重佐證。
- `esun_unicard.overseas_physical = 3.5` 與「28 國」— 維持，公告名單逐字數過剛好 28 國。
- `esun_ubear` 10% / 3% / 上限 100 / 150 — 維持。

---

# 條件式回饋清單（boosts 結構化用）

> ⚠️ 每條都標明是「**回饋生效條件**」還是「**登錄開放時間**」，兩者不可混用。

## C-1 星展 eco：海外實體商店月加碼 3%（資料目前完全沒有）
- 類型：**需登錄**（每月分別登錄）＋消費門檻
- 內容：當月海外實體一般消費超過 NT$15,000 的部分回饋 3% 刷卡金，每月上限 NT$500
- 名額：**每月限量 2,000 名**（依達 NT$15,001 的交易日排序）
- 登錄週期：**每月都要重登**，`reg.period:'month'`
- **登錄開放時間（不是回饋生效時間）**：5月 2026/5/4 10:00–5/31 23:59；6月 6/1 10:00–6/30 23:59；7月 7/1 10:00–7/31 23:59；8月 **2026/8/3 10:00–8/31 23:59**
- 有效期間：2026/5/1–2026/8/31（**7 天後結束**）
- 登錄處：星展 Card+ 信用卡數位服務
- URL：https://www.dbs.com.tw/personal-zh/cards/offers/ovstravel/index.html
- 原文：「本活動須於指定期間按照每月登錄時間至「星展Card+ 信用卡數位服務」進行登錄，共有4次登錄，登錄名額無上限。」／「「加碼3%回饋」每月海外實體商店一般消費刷卡達NT$15,001且於當月登錄名單內，超過NT$15,000之部分回饋3%刷卡金，每月回饋上限NT$500，每月回饋名額共2,000名。」

## C-2 星展 eco：海外訂房滿額送刷卡金
- 類型：**需登錄（一次性）**＋**單筆**消費門檻＋限量
- 內容：單筆滿 NT$2 萬 → NT$500 刷卡金（限量 2,500 名）；單筆滿 NT$5 萬 → NT$1,500 刷卡金（限量 1,000 名）。**不是比例回饋**
- **登錄開放時間**：2026/5/4 10:00 – 2026/8/31 23:59（整段期間開放，**只需登錄一次**，`reg.period:'once'`）
- 指定平台：Agoda、Booking.com、Trip.com、Airbnb、Expedia、Hotels.com
- URL：https://www.dbs.com.tw/personal-zh/cards/offers/ovstravel/index.html

## C-3 星展 eco：指定行動支付最高 15%（資料完全沒有）
- 類型：**需登錄（每月）**＋當月一般消費門檻＋限量
- 內容：當月一般消費達 NT$10萬/5萬/2萬/1萬 → 當月指定行動支付消費享 15%/10%/5%/3%，每月最高 NT$1,500
- 名額：15% 每月前 2,000 名、10% 前 4,000 名、5% 前 6,000 名、3% 前 15,000 名
- **登錄開放時間**：5月 5/4 15:00–5/31；6月 6/1 15:00–6/30；7月 7/1 15:00–7/31；8月 **8/3 15:00–8/31 23:59**
- 有效期間：2026/5/1–2026/8/31
- 適用支付：Apple Pay（含 Apple Pay 綁定儲值的 SUICA/ICOCA/Tmoney）、Samsung Pay、LINE Pay、街口支付等
- URL：https://www.dbs.com.tw/personal-zh/cards/offers/2026q2atl/index.html
- 原文：「指定行動支付僅限以下：Apple Pay（包含以 Apple Pay 綁定儲值之交通卡，例如SUICA、ICOCA、Tmoney等）、Samsung Pay、LINE Pay、街口支付、悠遊付、中油Pay、台灣中油－錢包支付、大利Pay（全國加油站）、POYA Pay、ICASHPAY 。」

## C-4 玉山 Unicard：UP 選訂閱（分級/門檻）
- 類型：**方案訂閱**（不是登錄），`reg.period:'month'`（效期至當月月底，預設次月續訂）
- 免費條件：**兩個任務要同時符合** — 任務一「上月玉山Unicard刷卡金額>=3萬元」；任務二「上月玉山平均資產金額>=30萬元」
- 否則：扣 149 點玉山 e point
- 通路條件：**必須透過玉山 Wallet App 操作**，不能在網銀或臨櫃做
- 鎖定效果：「升級訂閱為【UP選】後，該月即不可再切換為簡單選或任意選方案。」
- **回饋生效判定基準（重要）**：「百大指定消費加碼以每月(日曆月)最後一日最終之方案計算該月份加碼回饋，統一於次月17日起回饋。」→ 決定回饋的是**月底那天的方案**，不是刷卡當下的方案
- 上限：歸戶月上限 5,000 點
- URL：https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard

## C-5 玉山 Unicard：通路限制（不是登錄，是支付方式限制）
- 除「行動支付」類別外，**其餘百大通路都必須用 Unicard 實體卡或 Apple/Google/Samsung Pay 付款**；用 LINE Pay、街口、悠遊付、全支付、Pi 拍錢包等第三方/電子支付會被歸到「行動支付」類別，不算原通路
- 原文：「除百大指定消費指定行動支付類別之通路外，其餘通路限使用玉山Unicard實體卡 (含綁定Apple Pay、Google Pay、Samsung Pay)支付，透過第三方支付及電子支付錢包(如：Pi拍錢包、微信支付、PayPal等) 將不認列為該特店之交易。」

## C-6 玉山 Pi 卡：月累積加碼最高 3%（資料完全沒有）
- 類型：**需登錄（一次性）**＋每月消費累積門檻
- 內容：每月國內外一般消費累積滿 10,000–29,999 元 → +0.8%（最高 1.8%）；滿 30,000 元以上 → +2%（最高 3%）。每月每歸戶上限 1,000 P 幣
- **登錄性質**：`reg.period:'once'` —「活動期間僅需登錄1次即可參加每月刷卡活動，自登錄當月始計算當月國內一般消費累積金額，不溯及既往。」（登錄當月才開始算，**不補算之前的**）
- 有效期間：2026/3/1–2026/8/31
- URL：https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/pi-card

## C-7 玉山 U Bear：帳單e化／自動扣繳分級（門檻，非登錄）
- 一般消費 1%：需**同時**帳單e化＋玉山臺幣帳戶自動扣繳且成功扣繳
- 只做一項：0.5%
- 網路消費加碼 2%：**只需帳單e化**（門檻比基本回饋低，這點資料寫錯方向）
- 數位訂閱 10%：官網該段注意事項**未列任何帳單e化/自扣條件**
- 明確不需登錄：「一般消費回饋無上限，不需登錄」（FAQ 141）
- URL：https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/u-bear

## C-8 永豐 幣倍卡：精選通路 +4%（雙任務門檻）
- 類型：**分級/門檻**（非登錄、非限星期）
- 任務一：綁定永豐臺幣＋外幣帳戶自動扣繳並成功扣款，且設定電子/行動帳單並取消實體帳單
- 任務二：**前月**往來資產月平均餘額 ≥ NT$10 萬，**或**當月為 DAWHO 大戶／大戶Plus 等級
- **缺一不可**：「兩項條件需同時達成始符合資格，若僅完成其中一項則不符資格」
- 時間差陷阱：資產門檻看的是**前月**平均餘額，大戶等級看的是**當月**
- 上限：NT$800／帳單週期
- 有效期間：2026/7/1–2026/12/31
- URL：https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html

## C-9 永豐 DAWHO：指定任務 + 三級制
- 類型：**分級/門檻**
- 指定任務（缺一不可）：①DAWHO 數位存款臺幣帳戶自動扣繳且扣款成功 ②電子或行動帳單設定成功並取消實體帳單
- 分級加碼：大大 = 0；大戶 = +2.5%（月上限 NT$400）；大戶Plus = +4%（月上限 NT$1,000）
- 大戶Plus 升等條件（當月**同時**符合）：平均財富達 NT$1,000,000 以上，且單筆換匯 NT$5,000 以上或以 DAWHO 帳戶綁永豐金證券交割戶完成一筆台股現貨成交
- 大戶升等條件（當月符合**任一**）：平均財富達 NT$100,000 以上／設定為信貸授權扣款帳號／單筆換匯 NT$5,000 以上／綁證券交割戶完成台股現貨交易
- URL：https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/DAWHO.html ／ https://bank.sinopac.com/sinopacBT/about/news-center/news/content/2025122301.html

## C-10 沒有找到的條件類型
- **限定星期／限定日期的加碼**：這 6 張卡在官網上都**沒有**找到「限週幾」或「限每月幾號消費」才有回饋的條款。（星展另有「每周三 LINE Pay」餐飲活動，但屬於星展卡通用活動、不是 eco 卡本身權益，且不在本次 8 個情境內，不建議寫進 eco 的 boosts。）
- **每月搶登錄名額**：只有星展 eco 的兩個活動有（C-1 每月 2,000 名、C-3 每月分級名額）。玉山、永豐這 5 張卡的核心回饋都不需搶名額。

---

# 查不到 / 待查（不要寫進產品資料）

1. **玉山 U Bear 2026/9 起的新方案** — 官網產品頁、FAQ、公告頁在 2026-08-24 均無公告。現有活動 8/31 到期後如何，官網沒說。
2. **玉山 Pi 卡 2026/9 起的新方案** — 同上，官網無公告。
3. **永豐幣倍卡「航空公司」是否涵蓋廉航** — 官網僅寫「航空公司」，未明文納入或排除，且加碼依收單機構行業代號判定。`overseas_flight_budget` 的 6.0 目前無官方依據支撐。
4. **玉山 U Bear「未設電子帳單也未設自扣 = 0%」** — 官網只寫「0.5% 需其一」「1% 需兩者」，沒有明文說兩者都沒有就是 0%。資料的 0% 是推論，非官網明文。
5. **永豐幣倍卡「2026/07 起僅剩單一等級」** — 官網無此句。官網唯一相關句是「＊因應權益優惠轉換，精選通路將於2026年7月帳單回饋時，採取擇優回饋方式計算。」

---

## 附：本次採用的官方來源清單

- https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/pi-card
- https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/u-bear
- https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard
- https://www.esunbank.com/zh-tw/about/faq/content?q=credit_card%2F141
- https://www.esunbank.com/zh-tw/about/faq/content?q=credit_card%2F142
- https://www.esunbank.com/zh-tw/about/faq/content?q=credit_card%2F143
- https://event.esunbank.com.tw/credit/notice/index.html （玉山信用卡一般消費不包含項目公告，公告日期：2025年12月1日）
- https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/dual-currency-card.html
- https://bank.sinopac.com/sinopacBT/webevents/2003_dualcc/index.html
- https://bank.sinopac.com/sinopacBT/personal/credit-card/introduction/bankcard/DAWHO.html
- https://bank.sinopac.com/sinopacBT/about/news-center/news/content/2025122301.html
- https://www.dbs.com.tw/personal-zh/cards/dbs_eco/index.html
- https://www.dbs.com.tw/personal-zh/cards/offers/ovstravel/index.html
- https://www.dbs.com.tw/personal-zh/cards/offers/2026q2atl/index.html
- https://www.dbs.com.tw/personal-zh/cards/offers/cardguide/index.html
