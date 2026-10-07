---
name: todo-check
description: Check progress on the life-record frontend TODO list against what's actually in the codebase. Use this whenever the user asks to check or review their TODO / 待辦事項 progress — phrasings like "幫我檢查 TODO"、"TODO 進度如何"、"check my todo"、"哪些做完了" — or when they invoke /todo-check directly. The list lives in the shared life-record-docs project (front-TODO.md), not this repo's own TODO.md. This skill only reads and reports; it never edits front-TODO.md or checks boxes itself, since the user wants to review the findings and check items off by hand.
---

# TODO Check

檢查 `front-TODO.md` 裡還沒打勾的項目，實際去程式碼裡驗證是不是真的做完了，回報給使用者看，讓他自己決定要不要打勾。

## 為什麼是「回報」而不是「直接打勾」

使用者明確要求自己動手打勾，不要 Claude 自動編輯這份清單。這份清單之後會被 life-record-docs 那邊整理成跨專案的總 TODO，如果 Claude 自動改動內容，使用者沒辦法在自己檢視完之後才決定是否採納，也會讓「這行是誰打的勾」變得不可靠。所以這個 skill 全程只讀不寫，`front-TODO.md` 這個檔案本身完全不要用 Edit/Write 動它。

## 步驟

1. **讀取清單**：`../life-record-docs/front-TODO.md`（相對於這個 repo 的根目錄）。如果沒有直接檔案存取權限，用 `@../life-record-docs/front-TODO.md` 讀取，或請使用者確認路徑。已經打勾（`- [x]`）的項目略過，不用重新驗證。

2. **逐項驗證未勾選的項目**：每個 `- [ ]` 項目（含底下的子項目）通常會提到具體的檔名、元件、hook 名稱，或描述一個功能行為。針對每一項：
   - 找出它指向的檔案（用 Grep／Glob 找相關檔名，或直接照項目裡寫的路徑去讀）。
   - 讀程式碼，判斷描述的行為是不是真的已經實作（不是只看檔案存不存在，要看邏輯有沒有寫、state 有沒有接、TODO 註解本身有沒有被拿掉）。
   - 項目裡常常包含好幾個子點，同一個項目可能是「部分完成」——這種要照實回報哪些子點做了、哪些沒做，不要整項二選一地判斷。
   - 不確定的情況（例如要看後端才能確認、或牽涉到你不熟悉的跨專案決定）誠實標成「不確定」，附上為什麼不確定，不要用猜的。

3. **整理成兩組回報給使用者**：
   - **看起來已完成**：附上簡短證據（檔案路徑 + 是怎麼確認的，例如「`SwipeableRow.tsx` 已接上 `onPointerMove` 拖曳邏輯」），讓使用者可以快速對照、自己決定要不要打勾。
   - **還沒做／部分完成**：如果一整項底下有些子點做了、有些沒做，列出還缺哪幾個子點，不要整項含糊帶過。
   - 不確定的項目，另外列一小段說明卡在哪裡。

4. **絕對不要**：
   - 不要用 Edit/Write 修改 `front-TODO.md`（包含幫忙打勾、加註解、調整措辭）。
   - 不要順手把回報內容寫進其他檔案，除非使用者另外要求。

## 輸出格式範例

```
## TODO 檢查結果

### ✅ 看起來已完成
- 「AddEntryModal 送出前驗證...」→ `<fieldset disabled={isPending}>` 已在 EntryForm.tsx 套用，整組欄位鎖定；但金額 min="0" 驗證還沒看到，這項算部分完成
- ...

### ⏳ 還沒做／部分完成
- 「ByDateRecords 補上 loading 狀態」→ 還是看不到 isLoading 分支，維持原狀

### ❓ 不確定
- 「growing 狀態顯示卡在後端」→ 需要跟 life-record-api 那邊確認端點有沒有補上
```

檢查完直接把整理好的清單講給使用者聽即可，不用另外產生檔案。
