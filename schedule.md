# Schedule

記錄每天實際做了哪些事情，方便回顧進度。

## 2026-09-17

- 前端環境：裝好 Tailwind CSS、TanStack Query、React Router、ESLint stylistic → 改用 Prettier、path alias（`@/`）
- 首頁：完成 `RootLayout`（側邊導覽）+ `Home`（總覽儀表板），套用 home-b（Soft Minimal）設計系統
- 記帳史萊姆（bookkeeping-slime）：
  - 完成 P1 資料模型概念設計（Category/Entry/Period/Slime、能力值筆數 vs 金額的規則）
  - 完成多個記帳相關靜態畫面：新增記帳 popup、新增類別 popup、分類明細 popup、統計（分類報告 + 趨勢）、設定（主選單 + 固定收支 + 預算設定 + 類別管理 + 匯出記帳資料 + 標籤管理）
  - 討論「多寵物架構」取代「能力值融合」的未來構想
- 後端方向定案：Python + FastAPI + Docker + Google Cloud Run（後端）/ Vercel（前端）/ Neon（資料庫），開始在 `life-record-api` 練習 FastAPI + Docker
