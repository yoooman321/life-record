# 技術棧提醒

## 前端
React 19 + Vite 8 + TypeScript，版本較新，API 或慣例可能跟訓練資料中的舊版本不同。寫程式前如果不確定某個 API 是否還是目前寫法，先查 `node_modules/react` / `node_modules/vite` 底下的型別定義或官方文件，不要單憑記憶假設。

## 後端與部署（已定案）
- 後端語言：**Python**（使用者想順便練習 Python，非效能考量）
- 後端框架：**FastAPI**
- 後端容器化：**Docker**
- 後端部署：**Google Cloud Run**
- 前端部署：**Vercel**
- 資料庫：**Neon**（Serverless Postgres，已註冊帳號）

這些是使用者主動選定的方向，之後涉及後端／部署的討論或程式碼都以這個組合為準，不要擅自換成其他框架或平台。
