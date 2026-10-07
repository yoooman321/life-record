import { createContext, useContext } from 'react';

export type DialogOptions = {
  title: string;
  message?: string;
};

export type AlertFn = (options: DialogOptions) => Promise<void>;
export type ConfirmFn = (options: DialogOptions) => Promise<boolean>;

export type DialogState = {
  title: string;
  message?: string;
  type: 'alert' | 'confirm';
  resolve: (value: boolean) => void;
};

type DialogContextValue = {
  alert: AlertFn;
  confirm: ConfirmFn;
};

export const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useAlert/useConfirm 必須在 DialogProvider 底下使用');
  }
  return context;
}

export function useAlert() {
  return useDialogContext().alert;
}

export function useConfirm() {
  return useDialogContext().confirm;
}
