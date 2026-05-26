---
name: project-shenqi
description: 刷卡神器 — 台灣信用卡回饋比較工具，單一 HTML 檔，Mark 的副業產品
metadata: 
  node_type: memory
  type: project
  originSessionId: b8cd6489-e70c-43ec-8c1c-3d9f0361e8a7
---

## 基本資訊
- **檔案路徑**：`/Users/markhsieh/Downloads/Mark/Mark agent_Claude co/刷卡神器.html`
- **性質**：單一 HTML 檔（無框架、無伺服器），所有邏輯在 JS 裡
- **用途**：在英國的台灣人比較哪張信用卡在哪個情境回饋最高

## 核心架構
- **localStorage keys**：`shenqi4`（卡片資料）、`shenqi4_st`（地區/情境/金額狀態）、`shenqi4_seen`（是否看過說明）
- **CARD_DB**：完整信用卡資料庫（選卡用），約 20+ 張卡
- **DC**：用戶預設持有的卡（owned:true），subset of CARD_DB
- **SC**：情境分類（UK/TW/JP/KR/EU/NA/SEA/CNH），每個情境有 `rk`（rate key）
- **RKEYS**：rate key 清單（overseas_physical / overseas_online / tw_default 等）

## Rate Key 系統
- 每個情境有一個 `rk`，calcCard() 用 rk 查 `card.overrides[rk]`
- fee 邏輯：`rk.startsWith('overseas_') ? card.fee : 0`（台灣情境不收海外手續費）
- Fallback：`overseas_default` 或 `tw_default`

## Cap 邏輯
- `capBonusOnly: true`（eco 系列）：加碼部分有上限，基本回饋不受限
- `capBonusOnly: false`：總回饋有上限
- `capKey`：限定哪個 rk 才觸發 cap（null 表示全部 rk 都算）

## 月消費 Tracker
- 每張有上限的卡有 `card.tracker = {resetDay, spent, lastResetYM}`
- 自動重置：每次 load 時 `autoResetCheck(c)`
- `saveTracker()` 儲存前先更新 `lastResetYM` 到當前帳期，防止 autoReset 覆蓋用戶輸入（重要 bug 已修）

## 支付標籤（pms）
- Winner Card 的支付方式標籤依 rateKey 動態判斷（不再固定「實體刷卡」）
- overseas_online → 🖥️ 線上刷卡；overseas_subscription → 📱 訂閱付款；tw_cvs → 🏪 超商消費 等

## 重要已知限制
- J 卡 `overseas_physical` rate 設為 1%（因英/歐/北美只有 1%）；JP/KR tab 顯示也是 1%（架構限制，6% 僅限日韓泰）
- 幣倍卡 capAmt = 300（L1，一般用戶）；L2（月均資產 NT$10 萬）為 800
- Unicard UP 選有效至 2026/06，注意屆時需確認是否延期

## 視覺設計
- 極簡白底：`--bg:#F5F5F5`、`--text:#0D0D0D`、`--accent:#D4380D`
- Winner Card：純綠底 `rgba(22,163,74,0.85)`，64px 大字，無裝飾圓圈
- Header 白底黑字，底線分隔

**Why:** Mark 要一個可以直接從瀏覽器使用、不需伺服器的工具，方便手機和電腦都能用。
**How to apply:** 修改時保持單一 HTML 原則，不引入外部 framework，所有資料直接寫在 JS 裡。
