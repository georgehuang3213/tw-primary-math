import React from 'react';
import { X, Award, Star, BookOpen, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { UserProgress, Unit } from '../types';
import { CURRICULUM_UNITS } from '../data/curriculum';
import { QUESTIONS } from '../data/questions';
import { soundFx } from '../services/audio';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  onResetProgress: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  onResetProgress
}) => {
  if (!isOpen) return null;

  // 統計已完成的單元與星星
  const totalUnits = CURRICULUM_UNITS.length;
  const completedCount = Object.values(userProgress.unitProgress).filter(p => p.stars > 0).length;
  const threeStarCount = Object.values(userProgress.unitProgress).filter(p => p.stars === 3).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] flex flex-col">
        {/* 關閉按鈕 */}
        <button
          onClick={() => {
            soundFx.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
        >
          <X size={20} />
        </button>

        {/* 標題 */}
        <div className="flex items-center gap-3 border-b-2 border-amber-100 pb-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
            📊
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800">學習成果與成長記錄</h2>
            <p className="text-xs font-bold text-slate-500">
              家長與教師專區 · 民國115年最新國小低年級課綱素養統計
            </p>
          </div>
        </div>

        {/* 統計概況卡片 */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-center">
            <span className="text-[11px] font-bold text-amber-800">總累積星星</span>
            <div className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1 mt-0.5">
              <Star size={20} className="fill-amber-400 text-amber-500" />
              <span>{userProgress.totalStars}</span>
            </div>
          </div>

          <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-center">
            <span className="text-[11px] font-bold text-emerald-800">已挑戰單元</span>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">
              {completedCount} <span className="text-xs text-slate-400">/ {totalUnits}</span>
            </div>
          </div>

          <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 text-center">
            <span className="text-[11px] font-bold text-purple-800">滿星完美過關</span>
            <div className="text-2xl font-black text-purple-600 mt-0.5">
              {threeStarCount} <span className="text-xs text-slate-400">個</span>
            </div>
          </div>
        </div>

        {/* 錯題複習本 */}
        <div className="flex-1 overflow-y-auto pr-1 mb-6">
          <h3 className="text-sm font-black text-slate-800 mb-3 flex items-center gap-1.5">
            <BookOpen size={16} className="text-rose-500" />
            <span>錯題複習寶典（最近需加強練習的題目）</span>
          </h3>

          {userProgress.mistakeHistory.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl p-6 text-center text-slate-500 text-xs font-bold border border-slate-200">
              🎉 太厲害了！目前沒有累積的錯題記錄，觀念非常清晰！
            </div>
          ) : (
            <div className="space-y-2.5">
              {userProgress.mistakeHistory.map((m, idx) => {
                const question = QUESTIONS.find(q => q.id === m.questionId);
                const unit = CURRICULUM_UNITS.find(u => u.id === m.unitId);

                return (
                  <div
                    key={idx}
                    className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-200 flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-rose-800 bg-rose-200/60 px-2 py-0.5 rounded-md">
                        {unit?.title || '數學練習'}
                      </span>
                      <span className="text-[10px] text-slate-400">需要多練習 {m.wrongCount} 次</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 mt-1">
                      {question?.title || '數學情境題目'}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      💡 核心要點：{question?.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 底部重置與關閉按鈕 */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            onClick={() => {
              if (window.confirm('確定要清空所有學習進度與星星記錄嗎？')) {
                onResetProgress();
              }
            }}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
          >
            <RotateCcw size={13} /> 重設學習記錄
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs rounded-xl shadow btn-fun"
          >
            完成檢視
          </button>
        </div>
      </div>
    </div>
  );
};
