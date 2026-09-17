// import AddCategoryModal from '@/components/accounting/AddCategoryModal';
// import AddEntryModal from '@/components/accounting/AddEntryModal';

export default function HomePage() {
  return (
    <>
      {/* <AddCategoryModal /> */}
      {/* TODO(練習動畫)：原本這裡有進場動畫（opacity 0 -> 1 + 位移，animation: fadeUp） */}
      <div className="mb-6.5 flex items-end justify-between">
        <div>
          <h1 className="mb-1 text-[26px]">早安，Fei</h1>
          <p className="text-sm text-ink-soft">這是你今天的生活紀錄總覽</p>
        </div>
        <div className="rounded-full bg-panel px-4 py-2 text-[13px] text-ink-soft shadow-out">
          2026年9月17日・星期四
        </div>
      </div>

      <section className="grid grid-cols-3 gap-4.5">
        {/* TODO(練習動畫)：原本每張卡片有進場動畫（opacity 0 -> 1 + 位移 + scale，animation: cardIn），
            而且每張卡片的 animation-delay 依序增加，做出交錯出現的效果 */}
        <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[13px] font-bold text-ink-soft">本月記帳</div>
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] text-base shadow-in">
              💰
            </div>
          </div>
          <div className="mb-3 text-2xl font-extrabold">
            $18,420{' '}
            <small className="text-xs font-semibold text-ink-soft">
              / $25,000
            </small>
          </div>
          <div className="h-2.5 overflow-hidden rounded-lg shadow-in">
            {/* TODO(練習動畫)：原本寬度是從 0 用 transition: width 1.3s 動畫長到目前的值 */}
            <div
              className="h-full rounded-lg bg-linear-to-r from-accent-money to-[#e0aa6f]"
              style={{ width: '74%' }}
            />
          </div>
        </div>

        <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[13px] font-bold text-ink-soft">今日飲食</div>
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] text-base shadow-in">
              🍱
            </div>
          </div>
          <div className="mb-3 text-2xl font-extrabold">
            1,340{' '}
            <small className="text-xs font-semibold text-ink-soft">
              kcal / 2,000
            </small>
          </div>
          <div className="h-2.5 overflow-hidden rounded-lg shadow-in">
            <div
              className="h-full rounded-lg bg-linear-to-r from-accent-food to-[#f0a284]"
              style={{ width: '67%' }}
            />
          </div>
        </div>

        <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[13px] font-bold text-ink-soft">今日運動</div>
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] text-base shadow-in">
              🏃
            </div>
          </div>
          <div className="mb-3 text-2xl font-extrabold">
            6,240{' '}
            <small className="text-xs font-semibold text-ink-soft">
              步 / 8,000
            </small>
          </div>
          <div className="h-2.5 overflow-hidden rounded-lg shadow-in">
            <div
              className="h-full rounded-lg bg-linear-to-r from-accent-exercise to-[#8fb0e0]"
              style={{ width: '78%' }}
            />
          </div>
        </div>

        <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[13px] font-bold text-ink-soft">消耗熱量</div>
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] text-base shadow-in">
              🔥
            </div>
          </div>
          <div className="mb-3 text-2xl font-extrabold">
            320{' '}
            <small className="text-xs font-semibold text-ink-soft">
              kcal / 500
            </small>
          </div>
          <div className="h-2.5 overflow-hidden rounded-lg shadow-in">
            {/* TODO(練習動畫)：原本寬度是從 0 用 transition: width 1.3s 動畫長到目前的值 */}
            <div
              className="h-full rounded-lg bg-linear-to-r from-accent-body to-[#8ecbb4]"
              style={{ width: '64%' }}
            />
          </div>
        </div>

        <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[13px] font-bold text-ink-soft">今日喝水</div>
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] text-base shadow-in">
              💧
            </div>
          </div>
          <div className="mb-3 text-2xl font-extrabold">
            1,300{' '}
            <small className="text-xs font-semibold text-ink-soft">
              ml / 2,000
            </small>
          </div>
          <div className="h-2.5 overflow-hidden rounded-lg shadow-in">
            {/* TODO(練習動畫)：原本寬度是從 0 用 transition: width 1.3s 動畫長到目前的值 */}
            <div
              className="h-full rounded-lg bg-linear-to-r from-accent-exercise to-[#8fb0e0]"
              style={{ width: '65%' }}
            />
          </div>
        </div>

        <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[13px] font-bold text-ink-soft">日記</div>
            <div className="flex h-9 w-9 items-center justify-center rounded-[11px] text-base shadow-in">
              📔
            </div>
          </div>
          <div className="mt-1.5 mb-3 flex gap-1.5">
            <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full text-[13px] opacity-45 shadow-in">
              😔
            </span>
            <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full text-[13px] opacity-45 shadow-in">
              😐
            </span>
            <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full bg-white text-[13px] opacity-100 shadow-in ring-2 ring-accent-diary">
              😊
            </span>
            <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full text-[13px] opacity-45 shadow-in">
              😄
            </span>
            <span className="flex h-6.5 w-6.5 items-center justify-center rounded-full text-[13px] opacity-45 shadow-in">
              🤩
            </span>
          </div>
          <div className="text-[13px] leading-[1.7] text-ink-soft italic">
            「下班後去河堤跑了 3 公里，感覺身體慢慢找回節奏……」
          </div>
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-ink-soft">
            {/* TODO(練習動畫)：原本這裡火焰有無限循環的縮放動畫（@keyframes flick, animation: flick 1.6s infinite） */}
            <span className="inline-block">🔥</span>連續紀錄 12 天
          </div>
        </div>
      </section>
    </>
  );
}
