import EntryForm, { type EntryFormData } from './EntryForm';
import { useState } from 'react';
import type { RecordItemRead } from '@/type';

type EntryModalProps = {
  initialRecord?: RecordItemRead;
  onSubmit: (data: EntryFormData, options: { onSuccess: () => void }) => void;
  isSubmitting: boolean;
  onClose: () => void;
  onSuccess?: (id: number) => void;
};

export default function EntryModal({
  onClose,
  initialRecord,
  isSubmitting,
  onSubmit,
  onSuccess: onSuccessFromProps,
}: EntryModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [pendingCategoryId, setPendingCategoryId] = useState<number | null>(
    null,
  );
  const submitHandler = (
    data: EntryFormData,
    options: { onSuccess: () => void },
  ) => {
    onSubmit(data, {
      onSuccess: () => {
        setPendingCategoryId(data.categoryId);
        options.onSuccess();
      },
    });
  };

  const handleTransitionEnd = () => {
    if (!isClosing) return;
    onClose();
    if (pendingCategoryId) {
      onSuccessFromProps?.(pendingCategoryId);
    }
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
          initialRecord={initialRecord}
          onSubmit={submitHandler}
          isPending={isSubmitting}
          onSave={() => {
            setIsClosing(true);
          }}
        />
      </div>
    </div>
  );
}
