# TODO

- [x] 從三版首頁示意圖（src/assets/design/home-a.html / home-b.html / home-c.html）中挑選喜歡的方向 → 選定 B 版（Soft Minimal）
- [ ] 依 home-b.html 的設計方向，自己動手實作正式的首頁與 tab 導覽（記帳、飲食、身體紀錄、運動、日記）
- [ ] 「固定收支」功能：目前只做了示意圖（`src/pages/AccountingRecurring.tsx`），還沒設計資料模型跟排程機制。想法是每天跑一個排程 script，檢查固定收支的日期，到了就自動新增一筆 Entry 到使用者的記帳紀錄裡。這塊之後要跟 life-record-api-ed 那邊討論：
  - 資料模型：固定收支的範本要存哪些欄位（名稱、金額、類型、排程規則、啟用/停用狀態等）、怎麼避免同一天重複產生兩筆
  - 排程做法：用 **Cron job** 概念（照固定時間自動執行），具體用 **Google Cloud Scheduler** 定時打一個 FastAPI 端點（例如 `/tasks/process-recurring`），端點裡面放檢查固定收支、產生 Entry 的邏輯，不用另外維護一個常駐背景程序，跟 Cloud Run「有請求才運算」的模式比較搭
- [x] 記帳史萊姆（bookkeeping-slime）記帳相關的靜態畫面，Claude 產出 HTML 骨架 + Tailwind 靜態樣式：
  - 新增記帳 popup（`AddEntryModal`）、新增類別 popup（`AddCategoryModal`）、分類明細 popup（`CategoryDetailModal`）
  - 統計：分類報告（圓餅圖 + 分類列表，`AccountingCategoryReport`）、趨勢（柱狀+折線組合圖 + 統計卡片，`AccountingTrend`）、統計頁籤容器（`AccountingStats`）
  - 設定：主選單（`AccountingSettings`）、固定收支（`AccountingRecurring`）、預算設定（`AccountingBudget`）、類別管理（`AccountingCategoryManagement`）、匯出記帳資料（`AccountingExport`）、標籤管理（`AccountingTagManagement`）
- [ ] 上面這些畫面都還沒接 React 互動邏輯（state、表單送出、開關 modal、頁籤切換、checkbox 連動、拖曳排序等），要自己動手實作
- [ ] `route/index.ts` 要把上面新增的頁面都接上路由（目前有幾個是 unused import，還沒真的掛進路由樹）
