import { iconMapping } from '@/config/icons';
import type { CategoryItem } from '@/type';
import React, { useEffect, useRef, useState } from 'react';

const AMOUNT_PER_ROW = 4;

const getLastPage = ({
  scrollWidth,
  clientWidth,
}: {
  clientWidth: number;
  scrollWidth: number;
}) => {
  return Math.ceil(scrollWidth / clientWidth);
};

type CategoryListProps = {
  categories: CategoryItem[];
  selectedCategory: number;
  onCategoryChange: (id: number) => void;
};

export default function CategoryList({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, clientWidth, scrollWidth } = e.currentTarget;
    const difference = Math.abs(scrollWidth - (scrollLeft + clientWidth));
    if (difference <= 1) {
      const lastPage = getLastPage({ scrollWidth, clientWidth });
      setCurrentPage(lastPage - 1);
      return;
    }

    setCurrentPage(Math.round(scrollLeft / clientWidth));
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    const lastPage = getLastPage({ scrollWidth, clientWidth });

    setTotalPages(lastPage);
    setCurrentPage(0);
  }, [categories.length]);

  const rowsClass =
    categories.length > AMOUNT_PER_ROW ? 'grid-rows-2' : 'grid-rows-1';

  return (
    <>
      <div className="mb-2 text-[13px] font-bold text-ink-soft">類別</div>
      <div
        ref={scrollRef}
        onScroll={scrollHandler}
        className={`overscroll-x-contain grid auto-cols-min grid-flow-col ${rowsClass} gap-x-4 gap-y-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1 snap-x snap-mandatory`}
      >
        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            className={`flex w-16 flex-col items-center gap-1.5 rounded-[14px] py-2 snap-start ${
              category.id === selectedCategory ? 'bg-bg' : ''
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-lg p-2"
              style={{
                color: category.color,
                backgroundColor: `color-mix(in srgb, ${category.color} 20%, transparent)`,
              }}
            >
              {iconMapping[category.iconId]}
            </span>
            <span className="text-xs font-semibold text-ink-soft">
              {category.name}
            </span>
          </button>
        ))}

        <button
          type="button"
          className="flex w-16 flex-col items-center gap-1.5 rounded-[14px] py-2"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-ink-soft shadow-in">
            ＋
          </span>
          <span className="text-xs font-semibold text-ink-soft">新增</span>
        </button>
      </div>
      {/* 示意可以左右滑動看更多類別的分頁小圓點，實際頁數要看之後類別數量再接邏輯 */}
      <div className="mt-1 flex justify-center gap-1">
        {Array(totalPages)
          .fill(null)
          .map((_, i) => {
            return (
              <span
                key={`pagination-${i}`}
                className={`h-1.5 w-1.5 rounded-full ${currentPage === i ? 'bg-ink-soft/70' : 'bg-ink-soft/25'}`}
              />
            );
          })}
      </div>
    </>
  );
}
