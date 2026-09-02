import React from 'react';
import { Star, Volume2, VolumeX, BookOpen, Users, AlertCircle, Cloud } from 'lucide-react';
import { Grade, StudentProfile } from '../types';
import { BopomofoText } from './BopomofoText';
import { soundFx } from '../services/audio';

interface NavbarProps {
  currentGrade: Grade;
  onGradeChange: (grade: Grade) => void;
  bopomofoEnabled: boolean;
  onToggleBopomofo: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  activeStudent: StudentProfile;
  onOpenStudentSwitcher: () => void;
  onOpenMistakeNotebook: () => void;
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
  activeStudent,
  onOpenStudentSwitcher,
  onOpenMistakeNotebook,
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

        {/* 右側輔助控制與學生檔案 */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* 當前學生個人檔案徽章（點擊切換學生） */}
          <button
            onClick={() => {
              soundFx.playPop();
              onOpenStudentSwitcher();
            }}
            title="點擊切換學生或管理班級檔案"
            className="flex items-center gap-2 bg-white/95 hover:bg-white px-3 py-1.5 rounded-2xl border-2 border-amber-600 shadow-sm transition transform active:scale-95 group"
          >
            <span className="text-xl group-hover:scale-110 transition">{activeStudent.avatar}</span>
            <div className="text-left hidden sm:block">
              <div className="font-black text-xs text-amber-950 flex items-center gap-1">
                <span>{activeStudent.name}</span>
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-black">
                  {activeStudent.grade}年級
                </span>
              </div>
              <div className="text-[10px] font-bold text-amber-800 flex items-center gap-0.5 font-mono">
                <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                <span>{activeStudent.totalStars} 顆星</span>
              </div>
            </div>
            <Users size={14} className="text-amber-700 ml-0.5" />
          </button>

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
            {activeStudent.mistakes.length > 0 && (
              <span className="px-1.5 py-0.2 bg-white text-rose-600 text-[10px] font-black rounded-full font-mono shadow-sm">
                {activeStudent.mistakes.length}
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
        </div>
      </div>
    </header>
  );
};
