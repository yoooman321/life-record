// TODO：
// - 次導覽（史萊姆/戰鬥/商店/統計/設定）NavLink、領取寶藏按鈕的條件邏輯：這兩項其實是
//   `src/layout/AccountingLayout.tsx` 的事，不是這個檔案，還沒做完，要改去那邊找
// - growing 狀態下，手機版點擊要開「能力值 modal」（見下面 md:hidden 那顆 div），
//   modal 本身還沒做，先留空；桌面版能力值本來就常駐顯示在側邊 <SlimeSummary />，不需要可點擊
//   （手機版這塊先放著，等桌面版都穩定了再回來處理）

import AddEntryModal from '@/components/accounting/AddEntryModal';
import BriefSummary from '@/components/accounting/BriefSummary';
import SlimeSetupModal from '@/components/accounting/SlimeSetupModal';
import SlimeStage, {
  type SlimeStageHandle,
} from '@/components/accounting/SlimeStage';
import SlimeSummary from '@/components/accounting/SlimeSummary';
import { useConfirm } from '@/components/ui/dialog/DialogContext';
import { MIN_EARLY_END_AMOUNT } from '@/const/slime';
import {
  usePeriodRecord,
  useCategoryAbility,
  useCreateSlime,
  useEditSlime,
} from '@/hooks';
import { useRef, useState } from 'react';

export default function AccountingHomePage() {
  const [showSlimeModal, setShowSlimeModal] = useState(false);

  const { data: slimeSummary } = usePeriodRecord();
  // mutate -> 呼叫後不回傳 Promise
  const { mutateAsync } = useCreateSlime();
  const { getStatName } = useCategoryAbility();
  const [isNaming, setIsNaming] = useState(false);
  const [slimeName, setSlimeName] = useState('');
  const [slimeId, setSlimeId] = useState<number | undefined>(undefined);
  const slimeStageRef = useRef<SlimeStageHandle>(null);
  const recordSuccessHandler = (categoryId: number) => {
    const ability = getStatName(categoryId);
    if (ability) {
      slimeStageRef.current?.feedFood(ability);
    }
  };
  const [openAddModal, setOpenAddModal] = useState(false);
  const confirm = useConfirm();
  const { mutateAsync: editSlimeAsync, isPending } = useEditSlime();
  const totalStats = Object.entries(slimeSummary?.stats || []).reduce(
    (acc, [key, value]) => {
      if (key !== 'cash') {
        return acc + value;
      }
      return acc;
    },
    0,
  );
  // 提早結束至少要有三筆紀錄才可以
  const canEndEarly = totalStats >= MIN_EARLY_END_AMOUNT;
  const handleEndEarly = async () => {
    const ok = await confirm({ title: '確定要提早結束養成嗎？' });
    if (ok) {
      const response = await slimeStageRef.current?.growSlime(mutateAsync());
      setSlimeName(response?.name || '');
      setSlimeId(response?.id);
      setIsNaming(true);
    }
    return;
  };

  const handleSave = async () => {
    if (!slimeId || !slimeName) return;
    if (isPending) return;

    await editSlimeAsync({
      id: slimeId,
      name: slimeName,
    });

    setIsNaming(false); // 取名完成，收起取名區塊

    const growNext = await confirm({ title: '要培育下一個史萊姆嗎？' });
    if (growNext) {
      setShowSlimeModal(true); // 開啟選擇週期畫面
    }
  };

  const growingContent = slimeSummary && (
    <>
      <SlimeStage ref={slimeStageRef} />
      {isNaming ? (
        <div className="mt-3 flex flex-col items-center gap-2">
          <div className="text-xs font-bold text-ink-soft">為她取名字吧</div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              defaultValue={slimeName}
              onChange={(e) => {
                setSlimeName(e.target.value);
              }}
              className="w-32 rounded-[14px] px-3 py-2 text-center text-sm text-ink shadow-in outline-none"
            />
            <button
              onClick={handleSave}
              type="button"
              className="rounded-[14px] bg-accent-body px-4 py-2 text-sm font-bold text-white shadow-out"
            >
              儲存
            </button>
          </div>
        </div>
      ) : canEndEarly ? (
        <button
          onClick={handleEndEarly}
          type="button"
          className="mt-3 rounded-full border-2 border-accent-body px-4 py-2 text-xs font-bold text-accent-body hover:bg-accent-body/10 active:bg-accent-body active:text-white"
        >
          提早結束養成
        </button>
      ) : (
        <div className="mt-3 text-[11px] text-ink-soft">
          再記 {MIN_EARLY_END_AMOUNT - totalStats} 筆就能提早結束養成
        </div>
      )}
    </>
  );

  return (
    <div className="flex-1">
      <BriefSummary
        onOpen={() => {
          setOpenAddModal(true);
        }}
      />

      <div className="grid grid-cols-[1fr_340px] gap-6">
        {slimeSummary ? (
          <>
            {/* growing・手機版：點擊要開能力值 modal（TODO，還沒做——之後接的話，
                只能讓「史萊姆本體」那塊可點擊，不能整個外層再包成 <button>，
                不然裡面「提早結束養成」這顆真的按鈕又會變成巢狀 <button> */}
            <div className="flex min-h-115 flex-col items-center justify-center rounded-[24px] bg-panel p-8 shadow-out md:hidden">
              {growingContent}
            </div>

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
            {/* 蛋的呼吸動畫（輕微縮放/透明度變化）留給你自己練習，這裡先是靜態的 */}
            <div className="flex h-60 w-60 items-center justify-center text-[120px]">
              🥚
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
      {openAddModal && (
        <AddEntryModal
          onSuccess={recordSuccessHandler}
          onClose={() => {
            setOpenAddModal(false);
          }}
        />
      )}
    </div>
  );
}
