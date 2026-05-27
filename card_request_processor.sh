#!/bin/bash
# 刷卡神器 — 用戶卡片請求即時處理腳本
# 每 30 分鐘執行，發現 pending 請求立即研究並標記 done

CLAUDE="/Applications/cmux.app/Contents/Resources/bin/claude"
HTML="/Users/markhsieh/shuaka-shenqi/index.html"
LOG="/Users/markhsieh/shuaka-shenqi/card_requests.log"
SHEET_CSV="https://docs.google.com/spreadsheets/d/111kABplayPNCKXQ2yJNNVA8oppjd93HNcgTq8-TsNBo/export?format=csv"
APPS_SCRIPT="https://script.google.com/macros/s/AKfycbx7ai4Cb8kHMl2l-MPNyu1wK7_jtE34y2WIEHYz6_twsKnVGGt9pA_JqrEp2rUtu8Py/exec"
TODAY=$(date '+%Y-%m-%d %H:%M')

# 讀取 pending 列數
PENDING_COUNT=$(curl -sL "$SHEET_CSV" 2>/dev/null | awk -F',' '$5~/pending/ {count++} END {print count+0}')

if [ "$PENDING_COUNT" -eq 0 ]; then
  exit 0
fi

echo "" >> "$LOG"
echo "========================================" >> "$LOG"
echo "[$TODAY] 發現 $PENDING_COUNT 筆待處理請求" >> "$LOG"
echo "========================================" >> "$LOG"

# 逐行處理
curl -sL "$SHEET_CSV" 2>/dev/null | awk -F',' '$5~/pending/ {print NR","$2","$3}' | while IFS=',' read ROW BANK CARDNAME; do
  echo "[$TODAY] 處理第 $ROW 行：$BANK $CARDNAME" >> "$LOG"

  "$CLAUDE" -p "你是信用卡資料研究員兼工程師。今天日期：$(date '+%Y-%m-%d')。

任務：用戶請求新增一張卡片至「刷卡神器」。

卡片資訊：
- 銀行：$BANK
- 卡名：$CARDNAME

步驟：
1. 上網搜尋這張卡的官方回饋率、海外手續費、登錄條件
2. 若找到足夠資訊，將新卡加入 $HTML 的 CARD_DB 陣列（格式完全比照現有卡片）
3. 若 CARD_DB 已有此卡，不重複新增
4. 若找不到足夠資訊，跳過

最後一行輸出固定格式：RESULT: 已新增 / RESULT: 已存在 / RESULT: 找不到資料" \
    --allowedTools "Read,Edit,Write,Bash,WebSearch,WebFetch" \
    >> "$LOG" 2>&1

  # 標記此行為 done
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

  echo "[$TODAY] 第 $ROW 行標記完畢" >> "$LOG"
done

echo "[$TODAY] 所有請求處理完成" >> "$LOG"
