import CategoryModal from '@/components/accounting/CategoryModal';
import SortableCategoryItems from '@/components/accounting/SortableCategoryItems';
import { useConfirm } from '@/components/ui/dialog/DialogContext';
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useEditCategory,
  useEditCategoryOrder,
} from '@/hooks';
import type {
  CategoryItem,
  CreateCategoryItem,
  RecordType,
  UpdateCategoryItem,
} from '@/type';
import { useState } from 'react';
import { Link } from 'react-router';

export default function AccountingCategoryManagementPage() {
  const confirm = useConfirm();

  const { data: categories } = useCategories();
  const [type, setType] = useState<RecordType>('expense');
  const filteredCategories = categories?.filter(
    ({ type: categoryType }) => categoryType === type,
  );
  const [draftCategories, setDraftCategories] = useState<CategoryItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryItem | undefined
  >(undefined);

  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  const { mutate: editCategory } = useEditCategory();
  const { mutate: addCategory } = useCreateCategory();
  const { mutate: editCategoryOrder, isPending: isSavingOrder } =
    useEditCategoryOrder();
  const openCategoryModal = (category: CategoryItem | undefined) => {
    setSelectedCategory(category);
    setShowModal(true);
  };
  const onDelete = async (category: CategoryItem) => {
    if (isDeleting) return;
    const ok = await confirm({ title: '確定要刪除嗎？' });
    if (ok) {
      deleteCategory(category.id, {
        onSuccess: () => {
          setDraftCategories((prev) =>
            prev.filter(({ id }) => id !== category.id),
          );
        },
      });
    }
  };
  const onClose = () => {
    setShowModal(false);
    setSelectedCategory(undefined);
  };

  const onSortChange = (initialIndex: number, newIndex: number) => {
    setDraftCategories((prev) => {
      const items = [...prev];
      const [removed] = items.splice(initialIndex, 1);
      items.splice(newIndex, 0, removed);
      return items;
    });
  };

  const onOrderSave = () => {
    if (isSavingOrder) return;
    const filteredCategoryIds = filteredCategories?.map(({ id }) => id);
    const newCategoryIds = draftCategories.map(({ id }) => id);
    if (
      JSON.stringify(filteredCategoryIds) === JSON.stringify(newCategoryIds)
    ) {
      setIsEditing(false);
      return;
    }
    editCategoryOrder(
      { type, categoryIds: newCategoryIds },
      {
        onSuccess: () => {
          setIsEditing(false);
          setDraftCategories([]);
        },
      },
    );
  };

  const createCategory = (category: CreateCategoryItem) => {
    addCategory(category, {
      onSuccess: () => {
        setShowModal(false);
      },
    });
  };
  const editCategoryHandler = (category: Partial<UpdateCategoryItem>) => {
    if (selectedCategory) {
      editCategory(
        {
          id: selectedCategory?.id,
          ...category,
        },
        {
          onSuccess: () => {
            setShowModal(false);
          },
        },
      );
    }
  };
  return (
    <>
      <div className="mb-6.5 flex items-center justify-between">
        <Link
          aria-label="返回"
          to="/accounting/settings"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-lg text-ink-soft transition hover:bg-line/60 active:scale-90"
        >
          ‹
        </Link>
        <h1 className="text-[20px] font-bold">記帳分類</h1>
        <div className="flex gap-2">
          {isEditing && (
            <button
              onClick={() => {
                onOrderSave();
              }}
              type="button"
              disabled={isSavingOrder}
              className="flex h-9 items-center justify-center rounded-full border border-accent-body px-4 text-[13px] font-bold transition active:scale-95 text-white hover:bg-accent-body/60 bg-accent-body disabled:opacity-50"
            >
              儲存
            </button>
          )}

          <button
            onClick={() => {
              if (filteredCategories) {
                setDraftCategories(isEditing ? [] : filteredCategories);
              }
              setIsEditing((prev) => !prev);
            }}
            type="button"
            disabled={isSavingOrder}
            className={`flex h-9 items-center justify-center rounded-full border px-4 text-[13px] font-bold transition active:scale-95 disabled:opacity-50 ${isEditing ? 'bg-danger hover:bg-danger/60 text-white border-danger' : 'hover:bg-line/60 text-ink-soft border-line'}`}
          >
            {isEditing ? '取消' : '刪除/排序'}
          </button>
          {!isEditing && (
            <button
              onClick={() => {
                openCategoryModal(undefined);
              }}
              type="button"
              aria-label="新增分類"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-lg text-ink-soft transition hover:bg-line/60 active:scale-90"
            >
              ＋
            </button>
          )}
        </div>
      </div>

      <div className="rounded-[20px] bg-panel p-5.5 shadow-out">
        <div className="mb-5 flex gap-1 rounded-full bg-bg p-1 shadow-in">
          <button
            disabled={isEditing}
            onClick={() => setType('expense')}
            type="button"
            className={`flex-1 rounded-full  py-2 text-[13px] font-extrabold ${type === 'expense' ? 'text-white shadow-out bg-ink' : 'text-ink-soft'}`}
          >
            支出
          </button>
          <button
            disabled={isEditing}
            onClick={() => setType('income')}
            type="button"
            className={`flex-1 rounded-full  py-2 text-[13px] font-extrabold ${type === 'income' ? 'text-white shadow-out bg-ink' : 'text-ink-soft'}`}
          >
            收入
          </button>
        </div>

        {filteredCategories && (
          <SortableCategoryItems
            onDelete={onDelete}
            setItems={onSortChange}
            items={isEditing ? draftCategories : filteredCategories}
            isEditing={isEditing}
            openCategoryModal={openCategoryModal}
          />
        )}
      </div>

      {showModal && (
        <CategoryModal
          onCreate={createCategory}
          onEdit={editCategoryHandler}
          initialData={selectedCategory}
          onClose={onClose}
          defaultType={type}
        />
      )}
    </>
  );
}
