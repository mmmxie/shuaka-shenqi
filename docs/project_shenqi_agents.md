---
name: project-shenqi-agents
description: 刷卡神器開發時使用的 Agent 分工角色與觸發情境
metadata: 
  node_type: memory
  type: project
  originSessionId: b8cd6489-e70c-43ec-8c1c-3d9f0361e8a7
---

## Agent 角色分工

### 研究員 Agent（Card Researcher）
- **用途**：上網查詢信用卡最新回饋、活動截止日期、登錄資訊
- **工具**：WebSearch、WebFetch、Read
- **觸發**：活動有效期確認、新卡研究、回饋率疑問

### 程序員 Agent（Programmer）
- **用途**：直接修改 `刷卡神器.html`，處理 JS/CSS/HTML 修改
- **工具**：Read、Edit、Write、Bash
- **觸發**：確認資料後需寫入 HTML、bug 修復、視覺調整

### 程式碼檢查員（Code Checker）
- **用途**：全文掃描 HTML，列出 bug、邏輯錯誤、data inconsistency
- **工具**：Read
- **觸發**：大改動後驗證、懷疑有隱藏 bug 時

### 卡片資料研究員（Card Data Researcher）
- **用途**：比對 CARD_DB 內各卡資料與官網公告是否一致
- **工具**：WebSearch、WebFetch、Read
- **觸發**：定期資料審核、特定卡資料有疑問

## 每日自動更新流程
- 每天 00:00（英國時間）macOS crontab 觸發 `/Users/markhsieh/daily_card_update.sh`
- 腳本以研究員角色呼叫 `claude` CLI，搜尋七張重點卡的最新公告
- 若有變動，直接修改 HTML 並輸出報告到 log 檔
- 詳見 [[project-shenqi-crontab]]

**Why:** 信用卡活動有截止日和條件變動，需要不勞而獲地自動追蹤。
**How to apply:** 遇到卡片資料問題，根據是「查資料」還是「改 code」決定要用哪個 Agent。
