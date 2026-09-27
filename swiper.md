# Swiper 功能實作筆記

目標：`src/components/accounting/AddEntryModal.tsx` 裡類別選擇區塊的「可左右滑動」，用原生 CSS scroll-snap + JS 自己刻，不用套件。目前分頁小圓點是寫死的裝飾，要接成真實反映頁數/目前位置。

## CSS 部分（Tailwind 內建 class，直接可用）

- **捲動容器**（`grid ... overflow-x-auto` 那個 div）加：
  - `snap-x`：水平方向做 scroll-snap
  - `snap-mandatory`：放開捲動後一定吸附到最近的 snap 點（想要吸附感較弱可以用 `snap-proximity`）
- **每個類別 `<button>`** 加：
  - `snap-start`：吸附時對齊到容器開頭

因為 grid 是 `grid-flow-col grid-rows-2`（每欄 2 個），同一欄兩個項目水平位置相同，每個 `<button>` 都加 `snap-start` 就會自然「一欄一欄吸附」，不用額外包 wrapper。

## JS 部分（自己實作，這邊記重點提示）

1. **目前捲到第幾頁**：在捲動容器上綁 `onScroll`，用 `event.currentTarget` 的 `scrollLeft`（已捲動距離）、`scrollWidth`（內容總寬）、`clientWidth`（容器可視寬）算出目前大概第幾頁。用 `useState` 存目前 active 頁碼，捲動時更新。

2. **總共幾頁**：類別數量之後會變動（使用者自訂類別），不能寫死頁數。要用 `scrollWidth`/`clientWidth` 的比例，或自訂「每頁幾欄」的邏輯去算總頁數。

3. **分頁點要用陣列 `map` 動態產生**，不是寫死兩個 `<span>`，這樣頁數變動時會自動跟著變；目前 active 的那個點套用不同樣式（比較 index 跟目前頁碼 state）。

## 待辦

- [ ] 加 CSS scroll-snap class（`snap-x snap-mandatory` on 容器、`snap-start` on 每個 button）
- [ ] 用 `onScroll` + `useState` 算出目前頁碼
- [ ] 算出總頁數（隨類別數量動態變化）
- [ ] 分頁點改成用 `map` 動態渲染，反映真實頁數與 active 狀態
