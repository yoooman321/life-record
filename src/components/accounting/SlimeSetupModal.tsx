// TODO：目前是靜態骨架（永遠渲染在畫面上、選項寫死一個當範例、自訂天數輸入框沒有接 state）。
// 照選定的 C 版（src/assets/design/slime-setup-c.html）刻的正式元件。留給你練習的部分：
// - 開關 state：由 Home.tsx 那顆「史萊姆本體」卡片點擊觸發，這個檔案本身不用管開關，
//   只要照 AddEntryModal 的慣例收一個 onClose prop 就好
// - 選週期的 state（1 天／一週／一個月／自訂），選到「自訂」才顯示天數輸入框
// - 「培育區間」那行文字要依選到的天數即時算出來（可以參考 by-date-records 或 DateSelector
//   算日期的寫法），現在是寫死的範例文字
// - 送出邏輯：目前沒有 Period 的 API（後端 M1 還沒做這塊），先讓「開始培育」按鈕動起來，
//   之後 Period API 好了再接 useMutation

import { useCreatePeriod } from '@/hooks';
import type { DurationType } from '@/type';
import { getFormattedDate } from '@/utils/date';
import { useState } from 'react';

const durationMapping = {
  oneday: 'oneday',
  week: 'week',
  month: 'month',
  custom: 'custom',
} as const satisfies Record<DurationType, DurationType>;

export default function SlimeSetupModal({ onClose }: { onClose: () => void }) {
  const [durationType, setDurationType] = useState<DurationType>(
    durationMapping.oneday,
  );
  const [customDate, setCustomDate] = useState('14');
  const dayMapping = {
    [durationMapping.oneday]: 1,
    [durationMapping.week]: 7,
    // TODO: 30 要根據月份改變
    [durationMapping.month]: 30,
    [durationMapping.custom]: Number(customDate),
  };
  const today = new Date();
  const todayDisplay = getFormattedDate({ date: today, separate: '/' });
  const endDay = new Date();
  endDay.setDate(today.getDate() + dayMapping[durationType]);
  const endDayDisplay = getFormattedDate({ date: endDay, separate: '/' });
  const { mutate, isPending } = useCreatePeriod();
  const handleSubmit = () => {
    const body =
      durationType === durationMapping.custom
        ? {
            durationType,
            days: Number(customDate),
          }
        : { durationType };
    mutate(body, { onSuccess: onClose });
  };
  return (
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-black/40 p-4">
      <div className="relative m-auto w-full max-w-xl rounded-[24px] border border-line bg-panel p-7 shadow-sm">
        {/* 關閉：右上角 */}
        <button
          type="button"
          aria-label="關閉"
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
          onClick={onClose}
        >
          ✕
        </button>

        <h1 className="mb-1.5 text-center text-lg font-bold">培育新的史萊姆</h1>
        <p className="mb-6 px-5 text-center text-[12.5px] leading-relaxed text-ink-soft">
          選擇這次要培育多久，期間內的記帳都會即時反映在牠的能力值上
        </p>

        {/* 週期選項：2x2 卡片，選中的用 border-accent-money + shadow-out + 打勾徽章 */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              setDurationType(durationMapping.oneday);
            }}
            type="button"
            className={`relative rounded-[18px] border-2 p-4 text-left ${durationType === durationMapping.oneday ? 'border-accent-money bg-panel shadow-out' : 'shadow-in border-transparent bg-bg'}`}
          >
            {durationType === durationMapping.oneday && (
              <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-money text-[11px] text-white">
                ✓
              </span>
            )}
            <span className="mb-2.5 block text-xl">⚡</span>
            <span className="mb-0.5 block text-sm font-bold">1 天</span>
            <span className="text-[11px] leading-relaxed text-ink-soft">
              快速體驗一輪培育
            </span>
          </button>

          {/* 這張卡片先示意「選中」的樣子 */}
          <button
            onClick={() => {
              setDurationType(durationMapping.week);
            }}
            type="button"
            aria-pressed="true"
            className={`relative rounded-[18px] border-2 p-4 text-left ${durationType === durationMapping.week ? 'border-accent-money bg-panel shadow-out' : 'shadow-in border-transparent bg-bg'}`}
          >
            {durationType === durationMapping.week && (
              <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-money text-[11px] text-white">
                ✓
              </span>
            )}
            <span className="mb-2.5 block text-xl">📅</span>
            <span className="mb-0.5 block text-sm font-bold">一週</span>
            <span className="text-[11px] leading-relaxed text-ink-soft">
              標準培育節奏
            </span>
          </button>

          <button
            onClick={() => {
              setDurationType(durationMapping.month);
            }}
            type="button"
            className={`relative rounded-[18px] border-2 p-4 text-left ${durationType === durationMapping.month ? 'border-accent-money bg-panel shadow-out' : 'shadow-in border-transparent bg-bg'}`}
          >
            {durationType === durationMapping.month && (
              <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-money text-[11px] text-white">
                ✓
              </span>
            )}
            <span className="mb-2.5 block text-xl">🗓️</span>
            <span className="mb-0.5 block text-sm font-bold">一個月</span>
            <span className="text-[11px] leading-relaxed text-ink-soft">
              長期挑戰，能力值累積更多
            </span>
          </button>

          <button
            onClick={() => {
              setDurationType(durationMapping.custom);
            }}
            type="button"
            className={`relative rounded-[18px] border-2 p-4 text-left ${durationType === durationMapping.custom ? 'border-accent-money bg-panel shadow-out' : 'shadow-in border-transparent bg-bg'}`}
          >
            {durationType === durationMapping.custom && (
              <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-money text-[11px] text-white">
                ✓
              </span>
            )}
            <span className="mb-2.5 block text-xl">✏️</span>
            <span className="mb-0.5 block text-sm font-bold">自訂天數</span>
            <span className="text-[11px] leading-relaxed text-ink-soft">
              自己決定要培育幾天
            </span>
            {/* 選到「自訂」才顯示這個輸入框，現在先讓你看樣式長怎樣 */}
            <span className="mt-2.5 flex items-center gap-1.5">
              <input
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value);
                }}
                type="number"
                min={1}
                className="w-13 rounded-[9px] px-2 py-1.5 text-center text-xs text-ink shadow-in outline-none"
              />
              <span className="text-[11px] text-ink-soft">天</span>
            </span>
          </button>
        </div>

        {/* 培育區間預覽，現在是寫死的範例文字 */}
        <div className="mb-5 rounded-[14px] bg-bg px-4 py-3 text-center text-xs text-ink-soft">
          培育區間：
          <b className="font-bold text-ink">
            {todayDisplay} － {endDayDisplay}
          </b>
          （{dayMapping[durationType]} 天）
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="w-full rounded-[15px] bg-linear-to-r from-accent-money to-[#e0aa6f] py-3.5 text-sm font-bold text-white shadow-out"
        >
          開始培育
        </button>
      </div>
    </div>
  );
}
