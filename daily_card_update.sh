#!/bin/bash
# 刷卡神器 — 每日資料核查 + GitHub push
# 每天 00:00 執行（卡片請求由 card_request_processor.sh 即時處理）

CLAUDE="/Applications/cmux.app/Contents/Resources/bin/claude"
HTML="/Users/markhsieh/shuaka-shenqi/index.html"
LOG="/Users/markhsieh/shuaka-shenqi/daily_update.log"
TODAY=$(date '+%Y-%m-%d %H:%M')

echo "" >> "$LOG"
echo "========================================" >> "$LOG"
echo "[$TODAY] 開始每日資料檢查" >> "$LOG"
echo "========================================" >> "$LOG"

"$CLAUDE" -p "你是信用卡資料研究員兼工程師。今天日期：$(date '+%Y-%m-%d')。

任務：檢查並更新「刷卡神器」工具的信用卡回饋資料。
工具路徑：$HTML

步驟 1 — 上網搜尋以下卡片的最新公告（搜尋關鍵字：卡名+$(date '+%Y')+回饋+最新）：
- 台新 Richart 玩旅刷方案有效期與 L2 條件是否異動
- eco 永續卡月加碼上限是否調整（目前 NT\$600）
- 玉山 Unicard UP選方案是否延期（目前至 2026/06）
- 幣倍卡 L1 精選通路名單有無變動
- 富邦 J 卡季度登錄活動有效期（目前至 2026/09）
- Costco 聯名卡月登錄活動是否繼續（目前至 2026/06）
- 玉山 U Bear 卡電子帳單+自扣條件是否有新公告

步驟 2 — 若發現以下情況，直接修改 HTML 檔案的對應欄位（rate / note / regNote / capAmt）：
- 回饋率有變動
- 活動已截止或延長（更新 note 中的日期）
- 重要條件新增或移除

步驟 3 — 輸出報告：
- 列出每張卡的檢查結果（✅ 無變動 / ⚠️ 已修改：說明改了什麼）
- 最後一行固定格式：RESULT: 無變動 或 RESULT: 已修改 N 處" \
  --allowedTools "Read,Edit,Write,Bash,WebSearch,WebFetch" \
  >> "$LOG" 2>&1

echo "[$TODAY] 資料核查完成，開始 push" >> "$LOG"

# Push 所有變更到 GitHub
cd /Users/markhsieh/shuaka-shenqi && \
  git add index.html && \
  git diff --cached --quiet || git commit -m "每日自動更新 $(date '+%Y-%m-%d')" && \
  git push >> "$LOG" 2>&1

echo "[$TODAY] 完成" >> "$LOG"
