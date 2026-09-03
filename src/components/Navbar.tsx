import React from 'react';
import { Star, Volume2, VolumeX, LogOut, User } from 'lucide-react';
import { Grade, Subject } from '../types';
import { BopomofoText } from './BopomofoText';
import { soundFx } from '../services/audio';

interface NavbarProps {
  currentSubject?: Subject;
  onSubjectChange?: (sub: Subject) => void;
  currentGrade: Grade;
  onGradeChange: (grade: Grade) => void;
  bopomofoEnabled: boolean;
  onToggleBopomofo: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  accountName: string;
  totalStars: number;
  mistakeCount: number;
  onOpenMistakeNotebook: () => void;
  onOpenReview: () => void;
  onOpenReset?: () => void;
  onOpenMultiplication?: () => void;
  currentMode?: 'home' | 'lesson' | 'practice' | 'multiplication' | 'chinese';
  onLogout: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSubject = 'math',
  onSubjectChange,
  currentGrade,
  onGradeChange,
  bopomofoEnabled,
  onToggleBopomofo,
  soundEnabled,
  onToggleSound,
  accountName,
  totalStars,
  mistakeCount,
  onOpenMistakeNotebook,
  onOpenReview,
  onOpenReset,
  onOpenMultiplication,
  currentMode,
  onLogout,
  onGoHome
}) => {
  return (
    <header className="sticky top-0 z-50 bg-amber-400/95 backdrop-blur-md border-b-4 border-amber-500 shadow-md py-2.5 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* 系統 LOGO 與標題 */}
        <div
          onClick={onGoHome}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white flex items-center justify-center text-2xl shadow border-2 border-amber-500 group-hover:scale-105 transition">
            🦁
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-amber-950 leading-tight flex items-center gap-1.5">
              <span><BopomofoText text="翰林版小勇士數學樂園" showBpmf={bopomofoEnabled} /></span>
              <span className="text-[10px] bg-sky-700 text-white font-black px-2 py-0.5 rounded-full shadow-sm">
                翰林版 115審定
              </span>
            </h1>
            <p className="text-[11px] text-amber-900 font-bold hidden sm:block">
              <BopomofoText text="依據翰林版國小數學教科書與108課綱最新編排" showBpmf={bopomofoEnabled} />
            </p>
          </div>
        </div>

        {/* 年級與學科快捷按鈕列 */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-amber-500/60 p-1 sm:p-1.5 rounded-2xl border border-amber-600/40 shrink-0">
          <button
            onClick={() => {
              soundFx.playPop();
              onGradeChange(1);
            }}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-1 shrink-0 ${
              currentGrade === 1 && currentSubject === 'math' && currentMode !== 'multiplication'
                ? 'bg-white text-amber-950 shadow-md scale-105'
                : 'text-amber-900 hover:text-white'
            }`}
          >
            <span>🌱</span>
            <BopomofoText text="一年級" showBpmf={bopomofoEnabled} nowrap={true} compact={true} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              onGradeChange(2);
            }}
            className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-1 shrink-0 ${
              currentGrade === 2 && currentSubject === 'math' && currentMode !== 'multiplication'
                ? 'bg-white text-amber-950 shadow-md scale-105'
                : 'text-amber-900 hover:text-white'
            }`}
          >
            <span>🚀</span>
            <BopomofoText text="二年級" showBpmf={bopomofoEnabled} nowrap={true} compact={true} />
          </button>

          {/* ⚡ 九九乘法表專屬分頁按鈕 */}
          {onOpenMultiplication && (
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenMultiplication();
              }}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-1 shrink-0 ${
                currentMode === 'multiplication'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md scale-105 ring-2 ring-violet-300'
                  : 'bg-violet-100 hover:bg-violet-200 text-violet-950 border border-violet-300'
              }`}
            >
              <span>⚡</span>
              <BopomofoText text="九九乘法" showBpmf={bopomofoEnabled} nowrap={true} compact={true} />
            </button>
          )}

          {/* 📖 國語專區按鈕 */}
          {onSubjectChange && (
            <button
              onClick={() => {
                soundFx.playCorrect();
                onSubjectChange('chinese');
              }}
              className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-1 shrink-0 ${
                currentSubject === 'chinese'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md scale-105 ring-2 ring-emerald-300'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border border-emerald-300'
              }`}
            >
              <span>📖</span>
              <BopomofoText text="國語天地" showBpmf={bopomofoEnabled} nowrap={true} compact={true} />
            </button>
          )}
        </div>

        {/* 右側輔助控制與帳號狀態 */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* 當前登入帳號徽章 */}
          <div className="flex items-center gap-2 bg-white/95 px-3 py-1.5 rounded-2xl border-2 border-amber-600 shadow-sm">
            <User size={16} className="text-amber-700" />
            <div className="text-left">
              <div className="font-black text-xs text-amber-950">
                {accountName}
              </div>
              <div className="text-[10px] font-bold text-amber-800 flex items-center gap-0.5 font-mono">
                <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                <span>{totalStars} 顆星</span>
              </div>
            </div>
          </div>

          {/* 專屬錯題本入口 */}
          <button
            onClick={() => {
              soundFx.playPop();
              onOpenMistakeNotebook();
            }}
            title="開啟專屬錯題本進行弱點複習"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-black shadow transition relative"
          >
            <span>📓</span>
            <span className="hidden md:inline">
              <BopomofoText text="錯題本" showBpmf={false} />
            </span>
            {mistakeCount > 0 && (
              <span className="px-1.5 py-0.2 bg-white text-rose-600 text-[10px] font-black rounded-full font-mono shadow-sm">
                {mistakeCount}
              </span>
            )}
          </button>

          {/* 注音開關切換 */}
          <button
            onClick={() => {
              soundFx.playPop();
              onToggleBopomofo();
            }}
            title="開啟/關閉 全站注音符號標註"
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition border ${
              bopomofoEnabled
                ? 'bg-sky-500 text-white border-sky-600 shadow ring-2 ring-sky-300'
                : 'bg-white/80 text-slate-700 border-amber-300 hover:bg-white'
            }`}
          >
            <span>ㄅㄆㄇ</span>
            <span className="ml-1 hidden lg:inline">{bopomofoEnabled ? '開' : '關'}</span>
          </button>

          {/* 重新學習 RESET 按鈕 */}
          {onOpenReset && (
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenReset();
              }}
              title="重設學習進度與星星記錄（重新開始探險）"
              className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-amber-950 rounded-xl text-xs font-black shadow border border-amber-600 transition btn-fun"
            >
              <span>🔄</span>
              <span className="hidden sm:inline">RESET</span>
            </button>
          )}

          {/* 音效開關 */}
          <button
            onClick={() => {
              onToggleSound();
              soundFx.playPop();
            }}
            title="音效開關"
            className="p-1.5 sm:p-2 rounded-xl bg-white/80 hover:bg-white text-amber-900 border border-amber-300 shadow-sm"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-slate-400" />}
          </button>

          {/* 登出 / 切換帳號 */}
          <button
            onClick={() => {
              soundFx.playPop();
              onLogout();
            }}
            title={`目前帳號：${accountName}（點擊登出切換帳號）`}
            className="p-1.5 sm:p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm border border-amber-800 transition"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
