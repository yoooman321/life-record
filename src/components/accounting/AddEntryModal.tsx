import { useCreateRecord } from '@/hooks';
import EntryForm, { type EntryFormData } from './EntryForm';

type AddEntryModalProps = {
  onClose: () => void;
};

export default function AddEntryModal({ onClose }: AddEntryModalProps) {
  const { mutate, isPending } = useCreateRecord();
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
      options,
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex overflow-y-auto bg-black/40 p-4">
      <div className="relative m-auto w-full max-w-[440px] rounded-[20px] border border-line bg-panel p-6 shadow-sm">
        {/* 關閉：右上角 */}
        <button
          type="button"
          aria-label="關閉"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
          onClick={onClose}
        >
          ✕
        </button>

        <EntryForm
          onSubmit={submitHandler}
          isPending={isPending}
          onSave={onClose}
        />
      </div>
    </div>
  );
}
