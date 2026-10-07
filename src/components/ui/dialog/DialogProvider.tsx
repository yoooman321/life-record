import { useState } from 'react';
import {
  DialogContext,
  type DialogOptions,
  type DialogState,
} from './DialogContext';

export function DialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dialogState, setDialogState] = useState<DialogState | null>(null);

  const confirm = (options: DialogOptions) => {
    return new Promise<boolean>((resolve) => {
      setDialogState({ ...options, type: 'confirm', resolve });
    });
  };

  const alert = (options: DialogOptions) => {
    return new Promise<void>((resolve) => {
      setDialogState({
        ...options,
        type: 'alert',
        // 內部還是要符合 DialogState.resolve 的形狀（吃一個 boolean），
        // 但 alert 不在乎這個值，收到就直接呼叫自己的 resolve() 讓 Promise<void> 完成
        resolve: () => resolve(),
      });
    });
  };

  const handleConfirm = () => {
    dialogState?.resolve(true);
    setDialogState(null);
  };

  const handleCancel = () => {
    dialogState?.resolve(false);
    setDialogState(null);
  };

  return (
    <DialogContext.Provider value={{ alert, confirm }}>
      {children}
      {dialogState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xs rounded-[20px] bg-panel p-6 text-center shadow-sm">
            <div className="text-base font-bold text-ink">
              {dialogState.title}
            </div>
            {dialogState.message && (
              <div className="mt-2 text-sm text-ink-soft">
                {dialogState.message}
              </div>
            )}
            <div className="mt-5 flex gap-3">
              {dialogState.type === 'confirm' ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 rounded-[14px] border border-line py-3 text-sm font-bold text-ink-soft"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="flex-1 rounded-[14px] bg-accent-body py-3 text-sm font-bold text-white shadow-out"
                  >
                    確認
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="flex-1 rounded-[14px] bg-accent-body py-3 text-sm font-bold text-white shadow-out"
                >
                  確定
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}
