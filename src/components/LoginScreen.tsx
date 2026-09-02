import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCheck, KeyRound, Globe, Cloud, Star, BookOpen } from 'lucide-react';
import { BopomofoText } from './BopomofoText';
import { soundFx } from '../services/audio';
import { speechService } from '../services/speech';

interface LoginScreenProps {
  onLogin: (accountName: string) => void;
  bopomofoEnabled: boolean;
}

const RECENT_SUGGESTIONS = [
  { name: '一年一班 勇士隊', desc: '國小一年級', icon: '🦁' },
  { name: '二年甲班 數學家', desc: '國小二年級', icon: '🚀' },
  { name: '小明的家庭教室', desc: '自學進度', icon: '🏡' },
  { name: 'Alex Math Class', desc: '雙語班級', icon: '🌟' }
];

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, bopomofoEnabled }) => {
  const [accountInput, setAccountInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = accountInput.trim();
    if (!trimmed) {
      setErrorMsg('請輸入帳號或班級名稱喔！');
      soundFx.playWrong();
      return;
    }

    soundFx.playCorrect();
    speechService.speak(`歡迎登入 ${trimmed}，開始今天的數學探險！`);
    onLogin(trimmed);
  };

  const handleSelectQuick = (name: string) => {
    soundFx.playPop();
    setAccountInput(name);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-200 via-orange-100 to-amber-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 背景裝飾泡泡 */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-amber-300/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-300/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-3xl border-4 border-amber-400 shadow-2xl p-6 sm:p-8 flex flex-col gap-6 z-10 animate-scale-up">
        {/* LOGO 與歡迎標題 */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-20 h-20 rounded-3xl bg-amber-400 flex items-center justify-center text-5xl shadow-lg border-4 border-amber-500 animate-bounce-short">
            🦁
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">
            <BopomofoText text="翰林版小勇士數學樂園" showBpmf={bopomofoEnabled} />
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 rounded-full text-xs font-black text-amber-900">
            <Sparkles size={14} className="text-amber-600" />
            <span>雲端帳號登入 · 支援中英文名稱</span>
          </div>
        </div>

        {/* 登入表單 */}
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-black text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <UserCheck size={16} className="text-amber-600" />
                <BopomofoText text="輸入帳號或班級名稱：" showBpmf={bopomofoEnabled} />
              </span>
              <span className="text-[11px] text-slate-400 font-bold">中英文皆可</span>
            </label>

            <div className="relative">
              <input
                type="text"
                placeholder="例如: 一年三班、AlexClass、小明家"
                value={accountInput}
                onChange={e => {
                  setAccountInput(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                className="w-full px-4 py-3.5 rounded-2xl border-3 border-amber-300 focus:border-amber-500 text-base sm:text-lg font-black text-slate-900 focus:outline-none focus:ring-4 focus:ring-amber-200 bg-amber-50/50 shadow-inner placeholder:text-slate-400 placeholder:font-normal"
                autoFocus
              />
            </div>

            {errorMsg && (
              <p className="text-xs font-black text-rose-600 mt-0.5 animate-bounce-short">
                ⚠️ {errorMsg}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg sm:text-xl rounded-2xl shadow-lg hover:shadow-xl transition transform active:scale-98 flex items-center justify-center gap-2"
          >
            <span><BopomofoText text="進入學習樂園" showBpmf={bopomofoEnabled} /></span>
            <ArrowRight size={22} />
          </button>
        </form>

        {/* 快捷常用帳號建議 */}
        <div className="flex flex-col gap-2 pt-3 border-t-2 border-slate-100">
          <span className="text-xs font-black text-slate-500">💡 常用示範帳號（點擊直接帶入）：</span>
          <div className="grid grid-cols-2 gap-2">
            {RECENT_SUGGESTIONS.map(item => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleSelectQuick(item.name)}
                className="p-2.5 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-400 rounded-xl text-left transition flex items-center gap-2"
              >
                <span className="text-xl">{item.icon}</span>
                <div className="overflow-hidden">
                  <div className="font-black text-xs text-slate-800 truncate">{item.name}</div>
                  <div className="text-[10px] text-slate-400 font-bold">{item.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 底部說明 */}
        <div className="text-center text-[11px] text-slate-400 font-bold">
          ⚡ 支援 Cloudflare R2 雲端即時存檔 · 換手機平板輸入同帳號即可同步
        </div>
      </div>
    </div>
  );
};
