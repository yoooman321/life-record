import { useState } from 'react';
import AddEntryModal from './AddEntryModal';
import ByDateRecords from './ByDateRecords';

export default function BriefSummary() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="mb-6 flex items-center justify-between rounded-[20px] bg-panel px-6 py-4.5 shadow-out">
        <div className="flex items-center gap-4">
          {/* only mobile need it */}
          {/* <button
          type="button"
          className="rounded-full bg-bg px-3.5 py-2 text-[13px] font-bold text-ink-soft"
        >
          ← 返回總覽
        </button> */}
          <div>
            <ByDateRecords />
            <div className="mt-0.5 text-[15px] font-extrabold">
              $18,420{' '}
              <span className="text-[13px] font-semibold text-ink-soft">
                / 本月預算 $30,000
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-accent-money to-[#e0aa6f] px-4 py-2 text-[13px] font-extrabold text-white shadow-out"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            ＋ 新增記帳
          </button>
          <div className="rounded-full bg-bg px-4 py-2 text-[13px] font-extrabold text-accent-money">
            🪙 1,280
          </div>
          <button
            type="button"
            aria-label="設定"
            className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-bg text-[15px] text-ink-soft shadow-in"
          >
            ⚙️
          </button>
        </div>
      </div>
      {openModal && (
        <AddEntryModal
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </>
  );
}
