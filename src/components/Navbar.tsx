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
    <header className="sticky top-0 z-50 bg-amber-400/95 backdrop-blur-md border-b-4 border-amber-500 shadow-md py-2 px-3 sm:px-5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* 左側：系統 LOGO 與主標題 */}
        <div
          onClick={onGoHome}
          className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm border-2 border-amber-500 group-hover:scale-105 transition">
            🦁
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-amber-950 leading-none">
              小勇士學習樂園
            </h1>
          </div>
        </div>

        {/* 中間：四大直覺學習專區（一年級、二年級、九九乘法、國語天地） */}
        <div className="flex items-center gap-1 sm:gap-2 bg-amber-500/50 p-1 rounded-2xl border border-amber-600/30 shrink-0">
          <button
            onClick={() => {
              soundFx.playPop();
              if (currentSubject !== 'math') onSubjectChange?.('math');
              onGradeChange(1);
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-1 shrink-0 ${
              currentGrade === 1 && currentSubject === 'math' && currentMode !== 'multiplication'
                ? 'bg-white text-amber-950 shadow scale-105'
                : 'text-amber-950 hover:bg-white/40'
            }`}
          >
            <span>🌱</span>
            <span>一年級</span>
          </button>
          
          <button
            onClick={() => {
              soundFx.playPop();
              if (currentSubject !== 'math') onSubjectChange?.('math');
              onGradeChange(2);
            }}
            className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-1 shrink-0 ${
              currentGrade === 2 && currentSubject === 'math' && currentMode !== 'multiplication'
                ? 'bg-white text-amber-950 shadow scale-105'
                : 'text-amber-950 hover:bg-white/40'
            }`}
          >
            <span>🚀</span>
            <span>二年級</span>
          </button>

          {/* ⚡ 九九乘法專區按鈕 */}
          {onOpenMultiplication && (
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenMultiplication();
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-1 shrink-0 ${
                currentMode === 'multiplication'
                  ? 'bg-violet-600 text-white shadow scale-105'
                  : 'text-amber-950 hover:bg-white/40'
              }`}
            >
              <span>⚡</span>
              <span>九九乘法</span>
            </button>
          )}

          {/* 📖 國語天地按鈕 */}
          {onSubjectChange && (
            <button
              onClick={() => {
                soundFx.playCorrect();
                onSubjectChange('chinese');
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all whitespace-nowrap flex items-center gap-1 shrink-0 ${
                currentSubject === 'chinese'
                  ? 'bg-emerald-600 text-white shadow scale-105'
                  : 'text-amber-950 hover:bg-white/40'
              }`}
            >
              <span>📖</span>
              <span>國語天地</span>
            </button>
          )}
        </div>

        {/* 右側：星星進度與輔助按鈕 */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* 星星進度徽章 */}
          <div className="flex items-center gap-1 bg-white/95 px-2.5 py-1 rounded-xl border border-amber-500 shadow-sm">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span className="font-black text-xs text-amber-950 font-mono">{totalStars}</span>
          </div>

          {/* 錯題本入口 */}
          <button
            onClick={() => {
              soundFx.playPop();
              onOpenMistakeNotebook();
            }}
            title="錯題本"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-black shadow-sm transition"
          >
            <span>📓</span>
            <span className="hidden sm:inline">錯題本</span>
            {mistakeCount > 0 && (
              <span className="px-1.5 py-0.2 bg-white text-rose-600 text-[10px] font-black rounded-full font-mono">
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
            title={bopomofoEnabled ? '點擊關閉注音' : '點擊開啟注音'}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition border shadow-sm ${
              bopomofoEnabled
                ? 'bg-sky-500 text-white border-sky-600 ring-2 ring-sky-300'
                : 'bg-white/90 text-slate-700 border-amber-300 hover:bg-white'
            }`}
          >
            ㄅㄆㄇ
          </button>

          {/* 重新學習 RESET 按鈕 */}
          {onOpenReset && (
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenReset();
              }}
              title="重設進度"
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-xl text-xs font-black border border-amber-400 transition flex items-center gap-1"
            >
              <span>🔄</span>
              <span className="hidden md:inline">重置</span>
            </button>
          )}

          {/* 音效開關 */}
          <button
            onClick={() => {
              onToggleSound();
              soundFx.playPop();
            }}
            title="音效開關"
            className="p-1.5 sm:p-2 rounded-xl bg-white/90 hover:bg-white text-amber-900 border border-amber-300 shadow-sm"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-slate-400" />}
          </button>

          {/* 登出 */}
          <button
            onClick={() => {
              soundFx.playPop();
              onLogout();
            }}
            title={`登出目前帳號 (${accountName})`}
            className="p-1.5 sm:p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm border border-amber-800 transition"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
