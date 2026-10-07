import { useCreateRecord } from '@/hooks';
import EntryForm, { type EntryFormData } from './EntryForm';
import { useState } from 'react';

type AddEntryModalProps = {
  onClose: () => void;
  onSuccess: (id: number) => void;
};

export default function AddEntryModal({
  onClose,
  onSuccess: onSuccessFromProps,
}: AddEntryModalProps) {
  const { mutate, isPending } = useCreateRecord();
  const [isClosing, setIsClosing] = useState(false);
  const [pendingCategoryId, setPendingCategoryId] = useState<number | null>(
    null,
  );
  const submitHandler = (
    data: EntryFormData,
    options: { onSuccess: () => void },
  ) => {
    mutate(
      {
        categoryId: data.categoryId,
        amount: data.amount,
        note: data.note,
        expendedAt: data.expendedAt,
        tags: data.tags,
        image: data.image.type === 'new' ? data.image.file : null,
      },
      {
        onSuccess: () => {
          setPendingCategoryId(data.categoryId);
          options.onSuccess();
        },
      },
    );
  };

  const handleTransitionEnd = () => {
    if (!isClosing) return;
    onClose();
    if (pendingCategoryId) {
      onSuccessFromProps(pendingCategoryId);
    }
    // TODO：送出成功後關閉的情況，這裡要補上呼叫 onSuccessFromProps(pendingCategoryId)
    //   還需要新增 pendingCategoryId 這個 state，並在 submitHandler 送出成功時設定它，
    //   取代現在 submitHandler 裡用 setTimeout 延遲呼叫 onSuccessFromProps 的寫法。
  };

  return (
    <div
      onTransitionEnd={handleTransitionEnd}
      className={`fixed inset-0 z-50 flex overflow-y-auto bg-black/40 p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="relative m-auto w-full max-w-[440px] rounded-[20px] border border-line bg-panel p-6 shadow-sm">
        {/* 關閉：右上角 */}
        <button
          type="button"
          aria-label="關閉"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
          onClick={() => {
            setIsClosing(true);
          }}
        >
          ✕
        </button>

        <EntryForm
          onSubmit={submitHandler}
          isPending={isPending}
          onSave={() => {
            setIsClosing(true);
          }}
        />
      </div>
    </div>
  );
}
