#!/bin/bash
# 刷卡神器 — 每日資料核查（GitHub Actions 雲端版）
# 由 .github/workflows/daily-update.yml 觸發，在 checkout 出來的 repo 根目錄執行。
set -uo pipefail

TODAY=$(date '+%Y-%m-%d')
YEAR=$(date '+%Y')

claude -p "你是信用卡資料研究員兼工程師。今天日期：$TODAY。

任務：檢查並更新「刷卡神器」工具的信用卡回饋資料。
工具路徑：index.html
資料以檔案中的 CARD_DB 陣列為準（前端搜尋比對的就是 CARD_DB）。修改時請更新 CARD_DB 對應卡片；若同一張卡也出現在 DC 陣列，請一併更新保持一致。

步驟 1 — 上網搜尋以下卡片的最新公告（搜尋關鍵字：卡名+$YEAR+回饋+最新）：
- 台新 Richart 玩旅刷方案有效期與 L2 條件是否異動
- eco 永續卡月加碼上限是否調整（目前 NT\$600）
- 玉山 Unicard UP選方案是否延期（目前至 2026/06）
- 幣倍卡 L1 精選通路名單有無變動
- 富邦 J 卡季度登錄活動有效期（目前至 2026/09）
- Costco 聯名卡月登錄活動是否繼續（目前至 2026/06）
- 玉山 U Bear 卡電子帳單+自扣條件是否有新公告

步驟 2 — 若發現回饋率變動、活動截止/延長、條件增減，直接修改 CARD_DB 對應卡片的欄位（rate / note / regNote / capAmt）。
- 若活動截止日早於今天（$TODAY）視為已過期：把該情境回饋改為過期後的常態值，並移除過期的舊日期。

步驟 3 — 標準化標註（重要：前端會自動解析 note 顯示「回饋上限」與「到期日」，格式務必一致）：
- 有截止日的活動 → 在該 note 內標明，格式固定為「（活動至 YYYY/MM/DD）」，無確切日則「至 YYYY/MM」。
- 該情境有回饋上限 → 在 note 內標明「回饋上限 NT\$金額/期」，並同步把純數字（新台幣/月）填入結構化欄位 capAmt。

步驟 4 — 輸出報告：
- 列出每張卡的檢查結果（✅ 無變動 / ⚠️ 已修改：說明改了什麼）
- 最後一行固定格式：RESULT: 無變動 或 RESULT: 已修改 N 處" \
  --allowedTools "Read,Edit,Write,Bash,WebSearch,WebFetch" \
  --model claude-sonnet-4-6 \
  --dangerously-skip-permissions
