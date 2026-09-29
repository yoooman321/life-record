// TODO：目前是靜態畫面。實際使用時要接：
// - 次導覽（史萊姆/戰鬥/商店/統計/設定）目前是純 UI，沒有用 NavLink 導頁，因為你 `/accounting` 底下
//   的巢狀路由結構還沒規劃好，等你決定好路由結構後再換成跟 RootLayout 一樣的 NavLink 寫法
// - 領取寶藏按鈕目前是常駐顯示，實際上要接「自動戰鬥結束後才出現」的條件邏輯
// - 「新增記帳」按鈕目前沒有 onClick，實際上要接開關 state 去顯示 <AddEntryModal />
// - growing 狀態下，手機版點擊要開「能力值 modal」（見下面 md:hidden 那顆按鈕的 onClick），
//   modal 本身還沒做，先留空；桌面版能力值本來就常駐顯示在側邊 <SlimeSummary />，不需要可點擊
// - 提早結束養成按鈕還沒做（後端端點已存在：PUT /accounting/period/current/end）

import BriefSummary from '@/components/accounting/BriefSummary';
import SlimeSetupModal from '@/components/accounting/SlimeSetupModal';
import SlimeSummary from '@/components/accounting/SlimeSummary';
import { usePeriodRecord } from '@/hooks';
import { getFormattedDate } from '@/utils/date';
import { useState } from 'react';

export default function AccountingHomePage() {
  const [showSlimeModal, setShowSlimeModal] = useState(false);
  const { data: slimeSummary } = usePeriodRecord();

  const growingContent = slimeSummary && (
    <>
      {/* TODO：史萊姆畫面本體，這裡先留空 */}
      <div className="flex h-60 w-60 items-center justify-center rounded-full border-[3px] border-dashed border-line text-center text-[13px] text-ink-soft">
        史萊姆畫面
        <br />
        （開發中，先留空）
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-body/12 px-2.5 py-1.5 text-xs font-bold text-accent-body">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-body" />
        培育中
      </div>
      <div className="mt-1.5 text-center text-[11px] text-ink-soft">
        {getFormattedDate({
          date: new Date(slimeSummary.startedAt),
          separate: '/',
        })}
        {' － '}
        {getFormattedDate({
          date: new Date(slimeSummary.endedAt),
          separate: '/',
        })}
      </div>
    </>
  );

  return (
    <div className="flex-1">
      <BriefSummary />

      <div className="grid grid-cols-[1fr_340px] gap-6">
        {slimeSummary ? (
          <>
            {/* growing・手機版：點擊要開能力值 modal（TODO，還沒做） */}
            <button
              type="button"
              className="flex min-h-115 flex-col items-center justify-center rounded-[24px] bg-panel p-8 shadow-out md:hidden"
            >
              {growingContent}
            </button>

            {/* growing・桌面版：能力值常駐顯示在側邊面板，這裡不用可點擊 */}
            <div className="hidden min-h-115 flex-col items-center justify-center rounded-[24px] bg-panel p-8 shadow-out md:flex">
              {growingContent}
            </div>
          </>
        ) : (
          // empty 狀態，點擊開 SlimeSetupModal，手機/桌面行為一樣
          <button
            onClick={() => setShowSlimeModal(true)}
            type="button"
            className="flex min-h-115 flex-col items-center justify-center rounded-[24px] bg-panel p-8 shadow-out"
          >
            <div className="flex h-60 w-60 flex-col items-center justify-center rounded-full border-[3px] border-dashed border-line text-center text-[13px] leading-relaxed text-ink-soft">
              史萊姆畫面
              <br />
              （開發中，先留空）
            </div>
            <div className="mt-5 text-center text-[13px] text-ink-soft">
              點擊開始培育史萊姆
            </div>
          </button>
        )}

        {/* 側邊面板 */}
        <SlimeSummary slimeSummary={slimeSummary} />
      </div>
      {showSlimeModal && (
        <SlimeSetupModal
          onClose={() => {
            setShowSlimeModal(false);
          }}
        />
      )}
    </div>
  );
}
