import React from 'react';
import { Star, Volume2, VolumeX, BookOpen } from 'lucide-react';
import { Grade } from '../types';
import { BopomofoText } from './BopomofoText';
import { soundFx } from '../services/audio';

interface NavbarProps {
  currentGrade: Grade;
  onGradeChange: (grade: Grade) => void;
  bopomofoEnabled: boolean;
  onToggleBopomofo: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  totalStars: number;
  onOpenReview: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentGrade,
  onGradeChange,
  bopomofoEnabled,
  onToggleBopomofo,
  soundEnabled,
  onToggleSound,
  totalStars,
  onOpenReview,
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

        {/* 年級切換按鈕 */}
        <div className="flex items-center bg-amber-500/60 p-1 rounded-2xl border border-amber-600/40">
          <button
            onClick={() => {
              soundFx.playPop();
              onGradeChange(1);
            }}
            className={`px-3 sm:px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
              currentGrade === 1
                ? 'bg-white text-amber-950 shadow-md scale-105'
                : 'text-amber-900 hover:text-white'
            }`}
          >
            🌱 <BopomofoText text="一年級" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              onGradeChange(2);
            }}
            className={`px-3 sm:px-4 py-1.5 rounded-xl font-black text-xs sm:text-sm transition-all ${
              currentGrade === 2
                ? 'bg-white text-amber-950 shadow-md scale-105'
                : 'text-amber-900 hover:text-white'
            }`}
          >
            🚀 <BopomofoText text="二年級" showBpmf={bopomofoEnabled} />
          </button>
        </div>

        {/* 右側輔助控制 */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* 星星計數器 */}
          <div className="flex items-center gap-1 bg-white/90 px-2.5 py-1 rounded-xl border-2 border-amber-300 shadow-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
            <span className="font-black text-xs sm:text-sm text-amber-950 font-mono">
              {totalStars}
            </span>
          </div>

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
            <span className="ml-1 hidden md:inline">{bopomofoEnabled ? '開' : '關'}</span>
          </button>

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

          {/* 學習紀錄 / 錯題本 */}
          <button
            onClick={() => {
              soundFx.playPop();
              onOpenReview();
            }}
            title="查看學習成果與錯題本"
            className="flex items-center gap-1 px-2.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black shadow-md border border-purple-800"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">
              <BopomofoText text="學習報告" showBpmf={bopomofoEnabled} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
