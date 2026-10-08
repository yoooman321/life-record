// TODO：目前是靜態骨架，照選定的 C 版（src/assets/design/login-c.html）刻的正式頁面。
// 留給你練習的部分：
// - 登入／註冊模式切換的 state：現在永遠顯示登入模式，下面兩顆 tab 按鈕沒有 onClick
// - 依模式切換要顯示的內容：註冊模式要多顯示「暱稱」「確認密碼」兩個欄位（下面用註解標了要插入的位置）、
//   「忘記密碼？」連結只有登入模式才顯示、送出按鈕文字跟底部切換文字也要跟著換
// - 表單欄位的 controlled state（email、密碼、暱稱、確認密碼）
// - 送出邏輯：後端 auth 功能還沒做，先讓表單狀態、驗證動起來就好，之後才接真的 API
// - 分類 chip 的進場動畫（示意圖是逐一彈出），這裡先是靜態、直接顯示最終狀態，animation 留給你加

import { Link, useLocation } from 'react-router';
import RegisterForm from '@/components/login/RegisterForm';
import LoginForm from '@/components/login/LoginForm';

type PageMode = 'login' | 'register';
type ButtonSetting = {
  buttonText: string;
  description: string;
  emphasizeText: string;
  link: string;
};
const tabSetting: Record<PageMode, ButtonSetting> = {
  login: {
    buttonText: '登入',
    description: '還沒有帳號？',
    emphasizeText: '立即註冊',
    link: '/register',
  },
  register: {
    buttonText: '建立帳號',
    description: '已經有帳號了？',
    emphasizeText: '直接登入',
    link: '/login',
  },
};

export default function LoginPage() {
  const location = useLocation();
  const mode: PageMode = location.pathname === '/login' ? 'login' : 'register';
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-6">
      <div className="flex w-full max-w-95 flex-col items-center">
        {/* 分類 chip TODO: 改 for map */}
        <div className="mb-5.5 flex gap-2.5">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-[14px] bg-accent-money/15 text-xl shadow-out">
            💰
          </div>
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-[14px] bg-accent-food/15 text-xl shadow-out">
            🍽️
          </div>
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-[14px] bg-accent-exercise/15 text-xl shadow-out">
            🏃
          </div>
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-[14px] bg-accent-body/15 text-xl shadow-out">
            💪
          </div>
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-[14px] bg-accent-diary/15 text-xl shadow-out">
            📔
          </div>
        </div>

        <h1 className="mb-0.5 text-center text-[17px] font-extrabold">
          生活大小事，都靠我記事
        </h1>
        <p className="mb-5.5 text-center text-xs text-ink-soft">
          記帳・飲食・運動・身體紀錄・日記
        </p>

        <div className="w-full rounded-[26px] bg-panel p-7.5 shadow-out">
          <div className="mb-5.5 flex gap-1 rounded-full bg-bg p-1 shadow-in">
            <Link
              to="/login"
              className={`text-center flex-1 rounded-full py-2.5 text-[13px] font-extrabold  ${mode === 'login' ? 'bg-ink text-white shadow-out' : 'text-ink-soft'}`}
            >
              登入
            </Link>
            <Link
              to="/register"
              className={`text-center flex-1 rounded-full py-2.5 text-[13px] font-extrabold  ${mode === 'register' ? 'bg-ink text-white shadow-out' : 'text-ink-soft'}`}
            >
              註冊
            </Link>
          </div>
          {mode === 'login' ? <LoginForm /> : <RegisterForm />}

          <div className="mt-4.5 text-center text-xs text-ink-soft">
            {tabSetting[mode].description}
            <Link
              to={tabSetting[mode].link}
              className="cursor-pointer font-bold text-ink"
            >
              {tabSetting[mode].emphasizeText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
