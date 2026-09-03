import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, X, Check, Trash2, Sparkles, BookOpen } from 'lucide-react';
import { BopomofoText } from './BopomofoText';
import { soundFx } from '../services/audio';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountName: string;
  onConfirmReset: (type: 'all' | 'stars' | 'mistakes') => void;
  bopomofoEnabled: boolean;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  accountName,
  onConfirmReset,
  bopomofoEnabled
}) => {
  const [resetType, setResetType] = useState<'all' | 'stars' | 'mistakes'>('all');
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    soundFx.playCorrect();
    onConfirmReset(resetType);
    setIsConfirming(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl sm:rounded-[36px] border-4 sm:border-8 border-rose-300 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative flex flex-col gap-5 animate-scale-up">
        {/* 關閉按鈕 */}
        <button
          onClick={() => {
            soundFx.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
        >
          <X size={20} />
        </button>

        {/* 標題圖示區 */}
        <div className="flex items-center gap-3 border-b-2 border-rose-100 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl shadow-inner shrink-0">
            <RotateCcw size={26} className="animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-1.5">
              <BopomofoText text="重新開始學習 (RESET)" showBpmf={bopomofoEnabled} />
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-500 mt-0.5">
              當前帳號：<span className="text-rose-600 font-black">{accountName}</span>
            </p>
          </div>
        </div>

        {/* 說明與提示 */}
        {!isConfirming ? (
          <>
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 text-slate-700 text-sm font-bold flex items-start gap-2.5">
              <Sparkles size={20} className="text-amber-500 shrink-0 mt-0.5" />
              <span>
                <BopomofoText
                  text="孩子想從頭複習或重新挑戰拿滿星嗎？請選擇你想重設的學習進度："
                  showBpmf={bopomofoEnabled}
                />
              </span>
            </div>

            {/* 3 種重設選項 */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  soundFx.playPop();
                  setResetType('all');
                }}
                className={`p-4 rounded-2xl border-3 text-left transition flex items-center justify-between ${
                  resetType === 'all'
                    ? 'bg-rose-50 border-rose-500 ring-4 ring-rose-200'
                    : 'bg-white border-slate-200 hover:border-rose-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔄</span>
                  <div>
                    <div className="font-black text-base text-slate-900">
                      <BopomofoText text="完全歸零重學（推薦）" showBpmf={bopomofoEnabled} />
                    </div>
                    <div className="text-xs text-slate-500 font-bold">
                      清空累積星星、過關進度、錯題本，像全新勇士一樣重新探險！
                    </div>
                  </div>
                </div>
                {resetType === 'all' && <Check size={22} className="text-rose-600 font-black shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playPop();
                  setResetType('stars');
                }}
                className={`p-4 rounded-2xl border-3 text-left transition flex items-center justify-between ${
                  resetType === 'stars'
                    ? 'bg-amber-50 border-amber-500 ring-4 ring-amber-200'
                    : 'bg-white border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="font-black text-base text-slate-900">
                      <BopomofoText text="只重置星星與通關記錄" showBpmf={bopomofoEnabled} />
                    </div>
                    <div className="text-xs text-slate-500 font-bold">
                      星星全部歸零可重新挑戰 3 星，保留過去累積的錯題本紀錄。
                    </div>
                  </div>
                </div>
                {resetType === 'stars' && <Check size={22} className="text-amber-600 font-black shrink-0" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playPop();
                  setResetType('mistakes');
                }}
                className={`p-4 rounded-2xl border-3 text-left transition flex items-center justify-between ${
                  resetType === 'mistakes'
                    ? 'bg-purple-50 border-purple-500 ring-4 ring-purple-200'
                    : 'bg-white border-slate-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <div className="font-black text-base text-slate-900">
                      <BopomofoText text="只清空錯題本記錄" showBpmf={bopomofoEnabled} />
                    </div>
                    <div className="text-xs text-slate-500 font-bold">
                      清空所有錯題紅字，保留已獲得的星星與關卡解鎖進度。
                    </div>
                  </div>
                </div>
                {resetType === 'mistakes' && <Check size={22} className="text-purple-600 font-black shrink-0" />}
              </button>
            </div>

            {/* 動作按鈕 */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundFx.playPop();
                  onClose();
                }}
                className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm transition"
              >
                <BopomofoText text="取消" showBpmf={bopomofoEnabled} />
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFx.playPop();
                  setIsConfirming(true);
                }}
                className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm shadow-md transition flex items-center gap-2 btn-fun"
              >
                <RotateCcw size={16} />
                <BopomofoText text="下一步確認" showBpmf={bopomofoEnabled} />
              </button>
            </div>
          </>
        ) : (
          /* 二次防誤觸確認畫面（適合孩童與家長保護） */
          <div className="flex flex-col gap-4 py-2">
            <div className="p-5 bg-rose-50 rounded-2xl border-2 border-rose-300 flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center text-2xl shadow">
                ⚠️
              </div>
              <h3 className="text-lg sm:text-xl font-black text-rose-950">
                <BopomofoText text="確定要重設進度嗎？" showBpmf={bopomofoEnabled} />
              </h3>
              <p className="text-xs sm:text-sm font-bold text-rose-800 leading-relaxed">
                {resetType === 'all' && '此動作將會把「星星、通關記錄、錯題本」全部重置，讓小朋友從頭重新學習。此操作無法復原喔！'}
                {resetType === 'stars' && '此動作將會把所有單元的星星歸零，小朋友可以再次體驗解題破關的成就感！'}
                {resetType === 'mistakes' && '此動作將會清空所有錯題本的紀錄，錯題本將重新恢復為乾淨狀態！'}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                className="flex-1 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm transition"
              >
                <BopomofoText text="返回重選" showBpmf={bopomofoEnabled} />
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-lg transition flex items-center justify-center gap-2 btn-fun"
              >
                <Trash2 size={18} />
                <BopomofoText text="確定立即重置" showBpmf={bopomofoEnabled} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
