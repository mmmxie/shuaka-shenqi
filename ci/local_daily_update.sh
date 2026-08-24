#!/bin/bash
# 刷卡神器 — 每日資料核查（本機 launchd 版）
#
# 為什麼跑本機而不是 GitHub Actions：
#   雲端版靠 CLAUDE_CODE_OAUTH_TOKEN，那把 token 從 2026-07-05 起被
#   「organization has disabled Claude subscription access」擋掉，連續失敗 45 天。
#   本機用已登入的 session 跑 headless 沒有這個問題，一樣走訂閱額度、零額外費用。
#   等哪天那條路修好了，把 .github/workflows/daily-update.yml 的 schedule 取消註解即可。
#
# 由 ~/Library/LaunchAgents/com.mark.shuaka-daily.plist 每天觸發。

set -uo pipefail

REPO="/Users/m.hsieh/Downloads/Mark-Agent/shuaka-repo"
DATA_FILE="data/cards.js"   # 只有資料，不含程式碼。AI 每天只讀改這個檔。
LOG_DIR="$REPO/ci/logs"
STATUS="$REPO/ci/LAST-RUN.md"

cd "$REPO" || exit 1
mkdir -p "$LOG_DIR"

TODAY=$(date '+%Y-%m-%d')
NOW=$(date '+%Y-%m-%d %H:%M %Z')
YEAR=$(date '+%Y')
LOG="$LOG_DIR/$TODAY.log"

# 失敗時彈 macOS 通知。這支排程上次靜靜壞了兩個月都沒人發現，
# 所以每一種失敗都必須發出聲音。
notify() {
  osascript -e "display notification \"$1\" with title \"刷卡神器每日核查\" sound name \"Basso\"" 2>/dev/null
}

# 不管成功失敗都要留下紀錄，這樣「上次成功是什麼時候」永遠查得到
write_status() {
  cat > "$STATUS" <<EOF
# 每日核查狀態

- **上次執行**：$NOW
- **結果**：$1
- **細節**：$2
- **log**：\`ci/logs/$TODAY.log\`

（此檔由 \`ci/local_daily_update.sh\` 自動覆寫）
EOF
}

exec > >(tee -a "$LOG") 2>&1
echo "===== $NOW 開始 ====="

# 先同步遠端，避免本機跟雲端各改各的造成分岔（2026-08-24 就撞過一次）
if ! git pull --rebase --autostash origin main; then
  echo "git pull 失敗"
  notify "git pull 失敗，沒有執行核查"
  write_status "❌ 失敗" "git pull 失敗，可能有衝突待處理"
  exit 1
fi

# 注意：prompt 裡的變數一律用大括號形式。
# 中文 prompt 裡 $VAR 後面常接全形標點（。）等），bash 會把多位元組字元的
# 第一個 byte 當成變數名的一部分，配上 set -u 就會 unbound variable 直接中止。
claude -p "你是信用卡資料研究員兼工程師。今天日期：${TODAY}。

任務：檢查並更新「刷卡神器」工具的信用卡回饋資料。
資料檔：${DATA_FILE}
資料以 CARD_DB 陣列為準（前端搜尋比對的就是 CARD_DB）。修改時請更新 CARD_DB 對應卡片；若同一張卡也出現在 DC 陣列，請一併更新保持一致。

★★★ 來源規則（最重要，違反就是資料汙染）★★★
只有【發卡銀行的官方網域】算數。例如：
  台新 taishinbank.com.tw ／ 國泰 cathaybk.com.tw ／ 星展 dbs.com.tw
  玉山 esunbank.com ／ 富邦 taipeifubon.com.tw、fubon.com ／ 永豐 sinopac.com

以下來源【一律不得作為修改依據】：
  部落格、懶人包、卡優新聞網、內容農場、Facebook／Threads／Dcard／PTT 貼文、
  比價網站、YouTube、任何二手整理的文章。
這些東西最多只能當「線索」——看到它說某張卡有變動，你要去該銀行官網找到明文才算數。

因此每一筆修改都必須：
1. 實際 WebFetch 該銀行官網頁面，讀到明文寫著的數字或條件
2. 在該卡片物件加上／更新 source（官網 URL）與 checkedAt（${TODAY}）兩個欄位
3. 在報告裡引用官網原文

【查不到就不要改】。官網找不到明文、或官網說法與現有資料衝突但你不確定，
一律維持原值，並在報告裡標成「⚠️ 待人工確認」說明疑點。
寧可資料舊，也不要寫進一個查不到出處的數字。

（2026-08-24 的實例：AI 依部落格把星展 eco 卡上限從 600 改成 800，
 但星展官網明文寫「4%加碼回饋每期帳單回饋上限為600點」，改動是錯的、已還原。）

步驟 1 — 先搜尋找線索，再去官網查證（搜尋關鍵字：卡名+${YEAR}+回饋+最新）：
- 台新 Richart 玩旅刷方案有效期與 L2 條件是否異動
- eco 永續卡月加碼上限是否調整（目前 NT\$600）
- 玉山 Unicard UP選方案是否延期（目前至 2026/06）
- 幣倍卡 L1 精選通路名單有無變動
- 富邦 J 卡季度登錄活動有效期（目前至 2026/09）
- Costco 聯名卡月登錄活動是否繼續（目前至 2026/06）
- 玉山 U Bear 卡電子帳單+自扣條件是否有新公告

步驟 2 — 只有在官網明文佐證下，才修改 CARD_DB 對應卡片的欄位（rate / note / regNote / capAmt），並同步寫入 source / checkedAt。
- 若活動截止日早於今天（${TODAY}）視為已過期：把該情境回饋改為過期後的常態值，並移除過期的舊日期。

步驟 3 — 標準化標註（重要：前端會自動解析 note 顯示「回饋上限」與「到期日」，格式務必一致）：
- 有截止日的活動 → 在該 note 內標明，格式固定為「（活動至 YYYY/MM/DD）」，無確切日則「至 YYYY/MM」。
- 該情境有回饋上限 → 在 note 內標明「回饋上限 NT\$金額/期」，並同步把純數字（新台幣/月）填入結構化欄位 capAmt。

步驟 3.5 — 維護 boosts（條件式加碼）：
資料裡有些情境帶 boosts[] 陣列，用來表達「要滿足條件才拿得到」的回饋。
格式與各欄位意義見 ${DATA_FILE} 開頭的說明區塊，動手前務必先讀那段。

- 若官網公告某個條件式活動有變（率、上限、登錄方式、檔期），更新對應 boost 的欄位，
  並更新該 boost 的 source 與 checkedAt。
- 若 boost 的 valid.to 已早於今天，不要刪掉整筆，改成在報告裡標示「已過期，建議移除」，
  由人決定。自動刪資料風險太高。
- 若你在官網發現**新的**條件式活動（需登錄／限定星期／限定通路／限量名額），
  可以新增一筆 boost，但同樣必須有官網明文佐證，並填齊 source 與 checkedAt。
- ⚠️ 最容易搞錯的一點：when 是「回饋什麼時候生效」，reg.opensDom 是「登錄什麼時候開放」。
  例：富邦 Costco 每月 1 日開放搶登錄，但登錄成功後【整個月】刷都算 5%。
  這種情況要用 reg.opensDom:1，**不可以**寫成 when:{dom:[1]} ——
  那會變成告訴使用者「只有 1 號刷才有 5%」，是錯的。

步驟 4 — 輸出報告：
- 列出每張卡的檢查結果（✅ 無變動 / ⚠️ 已修改：說明改了什麼 / ⚠️ 待人工確認：說明疑點）
- 每一筆「已修改」必須附上官網 URL 與你讀到的原文片段，沒有官網佐證的修改不准出現
- 最後一行固定格式：RESULT: 無變動 或 RESULT: 已修改 N 處" \
  --allowedTools "Read,Edit,WebSearch,WebFetch" \
  --model claude-sonnet-4-6 \
  --dangerously-skip-permissions

CLAUDE_EXIT=$?

if [ $CLAUDE_EXIT -ne 0 ]; then
  echo "claude 執行失敗，exit code $CLAUDE_EXIT"
  notify "Claude 執行失敗（exit ${CLAUDE_EXIT}），資料未更新"
  write_status "❌ 失敗" "claude 以 exit code $CLAUDE_EXIT 結束"
  exit 1
fi

# 語法檢查：資料改壞就不要推上去。node 有裝就用，沒裝就跳過。
if command -v node >/dev/null 2>&1 && [ "${DATA_FILE##*.}" = "js" ]; then
  if ! node --check "$DATA_FILE"; then
    echo "$DATA_FILE 語法錯誤，還原並中止"
    git checkout -- "$DATA_FILE"
    notify "改壞了：$DATA_FILE 語法錯誤，已還原"
    write_status "❌ 失敗" "$DATA_FILE 語法檢查沒過，已 git checkout 還原"
    exit 1
  fi
fi

if git diff --quiet -- "$DATA_FILE"; then
  echo "無變更"
  write_status "✅ 成功（無變動）" "資料已是最新，沒有需要修改的地方"
else
  git add "$DATA_FILE"
  git commit -q -m "每日自動更新 $TODAY"
  if git push origin main; then
    echo "已更新並推送"
    write_status "✅ 成功（已更新）" "$(git show --stat --oneline HEAD | tail -n +2 | head -3)"
  else
    echo "push 失敗"
    notify "資料已更新但 push 失敗，commit 留在本機"
    write_status "⚠️ 部分失敗" "已 commit 但 push 失敗，需手動處理"
    exit 1
  fi
fi

# log 只留 30 天
find "$LOG_DIR" -name '*.log' -mtime +30 -delete 2>/dev/null

echo "===== 完成 ====="
