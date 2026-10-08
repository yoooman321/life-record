import { useForm } from 'react-hook-form';
import { schema as registerSchema } from '@/schemas/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@/hooks';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import type { RegisterData } from '@/api/user';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [apiErrorMessages, setApiErrorMessages] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const { mutate } = useRegister();
  const onSubmit = (data: RegisterData) => {
    mutate(data, {
      onSuccess: () => {
        navigate('/');
      },
      onError: (error) => {
        setApiErrorMessages(error.message);
      },
    });
  };

  useEffect(() => {
    const subscription = watch(() => {
      setApiErrorMessages('');
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3.5">
        <label className="mb-1.5 block text-[11.5px] font-bold text-ink-soft">
          暱稱
        </label>
        <input
          {...register('name')}
          type="text"
          placeholder="怎麼稱呼你"
          className="w-full rounded-[13px] bg-bg px-3.5 py-3 text-[13.5px] text-ink shadow-in outline-none"
        />
        {errors.name?.message && (
          <p className="mt-1.5 text-[11px] font-bold text-danger">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="mb-3.5">
        <label className="mb-1.5 block text-[11.5px] font-bold text-ink-soft">
          Email
        </label>
        <input
          type="email"
          {...register('email')}
          placeholder="you@example.com"
          className="w-full rounded-[13px] bg-bg px-3.5 py-3 text-[13.5px] text-ink shadow-in outline-none"
        ></input>
        {errors.email?.message && (
          <p className="mt-1.5 text-[11px] font-bold text-danger">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="mb-3.5">
        <label className="mb-1.5 block text-[11.5px] font-bold text-ink-soft">
          密碼
        </label>
        <input
          {...register('password')}
          type="password"
          placeholder="至少 8 碼"
          className="w-full rounded-[13px] bg-bg px-3.5 py-3 text-[13.5px] text-ink shadow-in outline-none"
        ></input>
        {errors.password?.message && (
          <p className="mt-1.5 text-[11px] font-bold text-danger">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="mb-3.5">
        <label className="mb-1.5 block text-[11.5px] font-bold text-ink-soft">
          確認密碼
        </label>
        <input
          type="password"
          {...register('confirmPassword')}
          placeholder="再輸入一次"
          className="w-full rounded-[13px] bg-bg px-3.5 py-3 text-[13.5px] text-ink shadow-in outline-none"
        />
        {errors.confirmPassword?.message && (
          <p className="mt-1.5 text-[11px] font-bold text-danger">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="mb-3.5">
        <label className="mb-1.5 block text-[11.5px] font-bold text-ink-soft">
          生日
        </label>
        <input
          type="date"
          {...register('birthday')}
          className="w-full rounded-[13px] bg-bg px-3.5 py-3 text-[13.5px] text-ink shadow-in outline-none"
        />
        {errors.birthday?.message && (
          <p className="mt-1.5 text-[11px] font-bold text-danger">
            {errors.birthday.message}
          </p>
        )}
      </div>
      {apiErrorMessages && (
        <div className="mb-3.5 rounded-[13px] bg-danger/10 px-3.5 py-2.5 text-center text-[12.5px] font-bold text-danger">
          {apiErrorMessages}
        </div>
      )}

      <button
        disabled={!isValid || isSubmitting}
        type="submit"
        className="w-full rounded-2xl bg-ink py-3.75 text-[15px] font-extrabold text-white shadow-button transition-[transform,box-shadow] duration-120 ease-[cubic-bezier(0.25,0.1,0.25,1)] enabled:active:translate-y-1 enabled:active:shadow-button-active disabled:opacity-50"
      >
        註冊
      </button>
    </form>
  );
}
