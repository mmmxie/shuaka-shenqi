---
name: project-shenqi-crontab
description: 刷卡神器每日 00:00 自動更新的 macOS crontab 設定與 log 位置
metadata: 
  node_type: memory
  type: project
  originSessionId: b8cd6489-e70c-43ec-8c1c-3d9f0361e8a7
---

## 設定位置
- **Shell 腳本**：`/Users/markhsieh/daily_card_update.sh`
- **Log 檔**：`/Users/markhsieh/Downloads/Mark/Mark agent_Claude co/daily_update.log`
- **Crontab 條目**：`0 0 * * * /Users/markhsieh/daily_card_update.sh`
- **Claude CLI 路徑**：`/Applications/cmux.app/Contents/Resources/bin/claude`

## 檢查指令
```bash
crontab -l              # 確認 cron 條目存在
tail -50 "/Users/markhsieh/Downloads/Mark/Mark agent_Claude co/daily_update.log"  # 看最新 log
```

## 腳本行為
1. 搜尋七張重點卡的最新公告（台新 Richart、eco 永續卡、玉山 Unicard UP 選、幣倍卡、富邦 J 卡、Costco 聯名卡、玉山 U Bear）
2. 若發現回饋率變動、活動截止/延長、條件異動，直接修改 HTML
3. 輸出報告，末行固定格式：`RESULT: 無變動` 或 `RESULT: 已修改 N 處`

## 重點卡追蹤項目
| 卡片 | 追蹤重點 |
|------|---------|
| 台新 Richart 玩旅刷 | 有效期與 L2 條件 |
| eco 永續卡 | 月加碼上限（目前 NT$600） |
| 玉山 Unicard UP 選 | 方案延期（目前至 2026/06） |
| 幣倍卡 | L1 精選通路名單 |
| 富邦 J 卡 | 季度登錄有效期（目前至 2026/09） |
| Costco 聯名卡 | 月登錄活動（目前至 2026/06） |
| 玉山 U Bear | 電子帳單+自扣條件 |

**Why:** CronCreate 在對話結束後失效，改用 macOS 系統 crontab 才能跨 session 持久運行。
**How to apply:** 若需調整更新頻率或追蹤卡片，編輯 `/Users/markhsieh/daily_card_update.sh`；查看更新結果看 log 檔。
