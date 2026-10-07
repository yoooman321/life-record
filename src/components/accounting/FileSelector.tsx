import type { ImageItem } from '@/type';
import { useEffect, useMemo, useRef } from 'react';

type FileSelectorProps = {
  imageConfig: ImageItem;
  onFileChange: (file: File | null) => void;
};

const getFileName = (imageConfig: ImageItem) => {
  return imageConfig.type === 'new' ? imageConfig.file?.name : imageConfig.name;
};

export default function FileSelector({
  imageConfig,
  onFileChange,
}: FileSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imagePreview = useMemo(() => {
    if (imageConfig.type === 'old') {
      return imageConfig.url;
    }
    if (!imageConfig.file) return '';
    return URL.createObjectURL(imageConfig.file);
  }, [imageConfig]);
  const fileName = getFileName(imageConfig);

  useEffect(() => {
    return () => {
      if (imageConfig.type === 'new') {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imageConfig, imagePreview]);

  return (
    <>
      <input
        className="hidden"
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onFileChange(e.target.files[0]);
          }
        }}
      />

      {imagePreview ? (
        // 已選照片：縮圖／檔名（點擊＝重新選檔案，換照片）跟移除按鈕，是兩個各自獨立的可點擊元素，
        // 不能包在同一個 <button> 裡（HTML 不允許 button 巢狀）
        <div className="flex items-center justify-between px-4 py-3.5">
          <button
            onClick={() => {
              inputRef.current?.click();
            }}
            type="button"
            className="flex min-w-0 flex-1 items-center gap-3"
          >
            <img
              src={imagePreview}
              alt={fileName}
              className="h-11 w-11 shrink-0 rounded-[11px] object-cover shadow-in"
            />
            <span className="truncate text-sm font-semibold text-ink">
              {fileName}
            </span>
          </button>
          <button
            onClick={() => {
              onFileChange(null);
            }}
            type="button"
            aria-label="移除照片"
            className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg text-ink-soft shadow-in"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            inputRef.current?.click();
          }}
          type="button"
          className="flex w-full items-center justify-between px-4 py-3.5"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">📷</span>
            <span className="text-sm font-semibold">照片（最多 1 張）</span>
          </div>
          <span className="text-ink-soft">›</span>
        </button>
      )}
    </>
  );
}
