#!/bin/bash
# 刷卡神器 — 用戶卡片請求即時處理（GitHub Actions 雲端版）
# 由 .github/workflows/card-requests.yml 觸發，每 30 分鐘檢查 Google Sheet 的 pending 請求。
set -uo pipefail

SHEET_CSV="https://docs.google.com/spreadsheets/d/111kABplayPNCKXQ2yJNNVA8oppjd93HNcgTq8-TsNBo/export?format=csv"
APPS_SCRIPT="https://script.google.com/macros/s/AKfycbx7ai4Cb8kHMl2l-MPNyu1wK7_jtE34y2WIEHYz6_twsKnVGGt9pA_JqrEp2rUtu8Py/exec"
TODAY=$(date '+%Y-%m-%d')

PENDING_COUNT=$(curl -sL "$SHEET_CSV" | awk -F',' '$5~/pending/ {count++} END {print count+0}')
echo "待處理請求數：$PENDING_COUNT"
if [ "$PENDING_COUNT" -eq 0 ]; then
  echo "無待處理請求，結束"
  exit 0
fi

curl -sL "$SHEET_CSV" | awk -F',' '$5~/pending/ {print NR","$2","$3}' | while IFS=',' read -r ROW BANK CARDNAME; do
  echo "處理第 $ROW 行：$BANK $CARDNAME"

  claude -p "你是信用卡資料研究員兼工程師。今天日期：$TODAY。

任務：用戶請求新增一張卡片至「刷卡神器」。

卡片資訊：
- 銀行：$BANK
- 卡名：$CARDNAME

步驟：
1. 上網搜尋這張卡的官方回饋率、海外手續費、登錄條件
2. 若找到足夠資訊，將新卡加入 index.html 的 CARD_DB 陣列（格式完全比照現有卡片）
3. 若 CARD_DB 已有此卡，不重複新增
4. 若找不到足夠資訊，跳過

最後一行輸出固定格式：RESULT: 已新增 / RESULT: 已存在 / RESULT: 找不到資料" \
    --allowedTools "Read,Edit,Write,Bash,WebSearch,WebFetch" \
    --model claude-sonnet-4-6 \
    --dangerously-skip-permissions

  # 標記此行為 done（透過 Google Apps Script）
  python3 - <<PYEOF
import urllib.request, urllib.error, json
url = '$APPS_SCRIPT'
body = json.dumps({"action": "markDone", "row": $ROW}).encode()

class NoRedir(urllib.request.HTTPRedirectHandler):
    def http_error_302(self, req, fp, code, msg, headers):
        raise urllib.error.HTTPError(req.full_url, code, msg, headers, fp)
    http_error_301 = http_error_302

opener = urllib.request.build_opener(NoRedir)
req = urllib.request.Request(url, data=body, headers={'Content-Type': 'application/json'})
try:
    opener.open(req)
except urllib.error.HTTPError as e:
    loc = e.headers.get('Location')
    if loc:
        urllib.request.urlopen(loc)
PYEOF

  echo "第 $ROW 行標記完畢"
done

echo "所有請求處理完成"
