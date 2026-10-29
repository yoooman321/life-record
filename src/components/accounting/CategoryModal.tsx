// TODO：目前是靜態畫面，永遠渲染在畫面上。實際使用時要自己包一層開關 state（是否顯示 modal）、
// 類別名稱 controlled input、icon 選取、送出邏輯，這些留給你練習。
// 2026-10-15 更新：收入分類開放自訂了（之前是寫死的收入/投資，不開放），但對應能力值固定是
// 鈔能力，不給選——所以收入 tab 底下不顯示能力值選擇器，直接固定帶 cash；支出 tab 的能力值
// 選項維持排除鈔能力（鈔能力用金額累積，跟這裡其他用筆數累積的邏輯不同）。

import { iconMapping } from '@/config/icons';
import { slimeStatNameMapping } from '@/const/slime';
import { useIcons, useSlimeStat } from '@/hooks';
import type {
  CreateCategoryItem,
  RecordType,
  UpdateCategoryItem,
} from '@/type';
import { useState } from 'react';

type CategoryModalProps = {
  onClose: () => void;
  onCreate: (data: CreateCategoryItem) => void;
  onEdit: (data: Partial<UpdateCategoryItem>) => void;
  initialData?: UpdateCategoryItem;
  defaultType?: RecordType;
};

export default function CategoryModal({
  onClose,
  onCreate,
  onEdit,
  initialData,
  defaultType = 'expense',
}: CategoryModalProps) {
  const isEditMode = !!initialData;
  const { data: iconList } = useIcons();
  const { data: abilities } = useSlimeStat();
  const [type, setType] = useState<RecordType>(defaultType);
  const [selectedAbilityId, setSelectedAbilityId] = useState<number>();

  const cashAbility = abilities?.find((ability) => ability.name === 'cash');
  const expenseAbilities = abilities?.filter(
    (ability) => ability.name !== 'cash',
  );
  const selectedAbility =
    type === 'income'
      ? cashAbility?.id
      : (selectedAbilityId ??
        initialData?.addStatsId ??
        expenseAbilities?.[0]?.id);

  const [selectedIconId, setSelectedIconId] = useState<number>();
  const selectedIcon =
    selectedIconId ?? initialData?.iconId ?? iconList?.[0].id;

  const [name, setName] = useState(initialData?.name || '');

  const submitHandler = () => {
    if (initialData) {
      const data: Partial<UpdateCategoryItem> = {};
      if (initialData.addStatsId !== selectedAbility) {
        data.addStatsId = selectedAbility;
      }
      if (initialData.iconId !== selectedIcon) {
        data.iconId = selectedIcon;
      }
      if (initialData.name !== name) {
        data.name = name;
      }
      onEdit(data);
      return;
    }

    if (selectedAbility === undefined || selectedIcon === undefined || !name) {
      return;
    }
    onCreate({
      addStatsId: selectedAbility,
      iconId: selectedIcon,
      name,
      type,
    });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-100 rounded-[20px] border border-line bg-panel p-6 shadow-sm">
        <button
          onClick={onClose}
          type="button"
          aria-label="關閉"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
        >
          ✕
        </button>

        <div className="mb-5 text-center text-base font-bold">
          {isEditMode ? '編輯' : '新增'}類別
        </div>

        <div className="mb-4 flex gap-1 rounded-full bg-bg p-1 shadow-in">
          <button
            onClick={() => setType('expense')}
            type="button"
            className={`flex-1 rounded-full py-2 text-[13px] font-extrabold ${type === 'expense' ? 'bg-ink text-white shadow-out' : 'text-ink-soft'}`}
          >
            支出
          </button>
          <button
            onClick={() => setType('income')}
            type="button"
            className={`flex-1 rounded-full py-2 text-[13px] font-extrabold ${type === 'income' ? 'bg-ink text-white shadow-out' : 'text-ink-soft'}`}
          >
            收入
          </button>
        </div>

        <div className="mb-4 flex flex-col gap-1.5">
          <label className="text-[13px] font-bold text-ink-soft">
            類別名稱
          </label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="輸入類別名稱"
            className="rounded-[11px] px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft shadow-in outline-none"
          />
        </div>

        <div className="mb-4">
          <div className="mb-2 text-[13px] font-bold text-ink-soft">
            對應能力值
          </div>
          {type === 'income' ? (
            <div className="inline-flex rounded-full bg-accent-money px-3.5 py-2 text-xs font-bold text-white shadow-out">
              {cashAbility ? slimeStatNameMapping[cashAbility.name] : ''}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {expenseAbilities &&
                expenseAbilities.map((ability) => (
                  <button
                    key={`ability-${ability.id}`}
                    type="button"
                    onClick={() => setSelectedAbilityId(ability.id)}
                    className={`rounded-full px-3.5 py-2 text-xs font-bold ${
                      selectedAbility === ability.id
                        ? 'bg-accent-money text-white shadow-out'
                        : 'text-ink-soft shadow-in'
                    }`}
                  >
                    {slimeStatNameMapping[ability.name]}
                  </button>
                ))}
            </div>
          )}
        </div>

        <div className="mb-5">
          <div className="mb-2 text-[13px] font-bold text-ink-soft">圖示</div>
          <div className="grid max-h-52 grid-cols-5 gap-3 overflow-y-auto justify-item-center p-1">
            {iconList &&
              iconList.map((icon) => (
                <button
                  onClick={() => {
                    setSelectedIconId(icon.id);
                  }}
                  key={`icon-${icon.id}`}
                  type="button"
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-lg ${
                    selectedIcon === icon.id
                      ? 'bg-accent-money/15 shadow-out ring-2 ring-accent-money'
                      : 'shadow-in'
                  }`}
                >
                  {iconMapping[icon.id]}
                </button>
              ))}
          </div>
        </div>

        <button
          onClick={submitHandler}
          type="submit"
          className="w-full rounded-[14px] bg-linear-to-r from-accent-money to-[#e0aa6f] py-3 text-sm font-bold text-white shadow-out"
        >
          {isEditMode ? '編輯' : '新增'}類別
        </button>
      </div>
    </div>
  );
}
