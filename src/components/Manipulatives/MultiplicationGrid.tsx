import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { soundFx } from '../../services/audio';

interface MultiplicationGridProps {
  initialFactor1?: number; // 被乘數 (每盤幾個)
  initialFactor2?: number; // 乘數 (有幾盤)
  interactive?: boolean;
}

export const MultiplicationGrid: React.FC<MultiplicationGridProps> = ({
  initialFactor1 = 4,
  initialFactor2 = 3,
  interactive = true
}) => {
  const [factor1, setFactor1] = useState(initialFactor1); // 每排有幾個
  const [factor2, setFactor2] = useState(initialFactor2); // 共有幾排
  const [itemEmoji, setItemEmoji] = useState('🍎');

  const total = factor1 * factor2;

  const handleF1 = (val: number) => {
    soundFx.playPop();
    setFactor1(val);
  };

  const handleF2 = (val: number) => {
    soundFx.playPop();
    setFactor2(val);
  };

  // 生成連加算式字串
  const additionString = Array.from({ length: factor2 })
    .map(() => factor1.toString())
    .join(' + ');

  return (
    <div className="flex flex-col items-center bg-violet-50/70 p-4 sm:p-6 rounded-3xl border-2 border-violet-200 max-w-xl mx-auto">
      {/* 乘法算式與連加意涵標題 */}
      <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl border-2 border-violet-300 shadow-sm w-full">
        <div className="flex items-center gap-3 text-2xl sm:text-3xl font-black text-violet-900 font-mono">
          <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-xl">{factor1}</span>
          <span className="text-violet-500">×</span>
          <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-xl">{factor2}</span>
          <span className="text-violet-500">=</span>
          <span className="text-rose-600 font-black text-3xl sm:text-4xl">{total}</span>
        </div>

        {/* 幾個幾與連加解讀 */}
        <div className="text-xs sm:text-sm font-bold text-slate-600 flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-violet-100 w-full">
          <span>
            有 <strong className="text-violet-700">{factor2}</strong> 排，每排有 <strong className="text-violet-700">{factor1}</strong> 個
          </span>
          <span className="text-slate-400">|</span>
          <span>
            連加：{additionString} = <strong className="text-rose-600">{total}</strong>
          </span>
        </div>
      </div>

      {/* 矩陣點陣圖視覺化 */}
      <div className="my-4 p-4 bg-white rounded-2xl border-2 border-violet-200 shadow-inner flex flex-col gap-2 items-center min-h-[160px] justify-center overflow-x-auto w-full">
        {Array.from({ length: factor2 }).map((_, rIdx) => (
          <div key={rIdx} className="flex items-center gap-2 bg-violet-50/60 p-2 rounded-xl border border-violet-100">
            <span className="text-[10px] font-bold text-violet-400 w-8 text-right">第{rIdx + 1}排:</span>
            <div className="flex gap-2">
              {Array.from({ length: factor1 }).map((_, cIdx) => (
                <div
                  key={cIdx}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl shadow-sm border border-violet-200 flex items-center justify-center text-lg sm:text-xl transition transform hover:scale-110"
                >
                  {itemEmoji}
                </div>
              ))}
            </div>
            <span className="text-xs font-bold text-violet-700 ml-1">({factor1}個)</span>
          </div>
        ))}
      </div>

      {/* 互動調整控制項 */}
      {interactive && (
        <div className="w-full flex flex-col gap-3 bg-white p-3.5 rounded-2xl border border-violet-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-700">選擇被乘數（每排個數）：</span>
            <div className="flex gap-1">
              {[2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleF1(num)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                    factor1 === num
                      ? 'bg-violet-600 text-white shadow'
                      : 'bg-violet-100 text-violet-900 hover:bg-violet-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-700">選擇乘數（排數）：</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  onClick={() => handleF2(num)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                    factor2 === num
                      ? 'bg-violet-600 text-white shadow'
                      : 'bg-violet-100 text-violet-900 hover:bg-violet-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-500">更換可愛圖案：</span>
            <div className="flex gap-2">
              {['🍎', '⭐', '🎈', '🍬', '🚗', '🐱'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => setItemEmoji(emoji)}
                  className={`text-lg p-1 rounded-lg ${itemEmoji === emoji ? 'bg-amber-200 ring-2 ring-amber-400' : 'hover:bg-slate-100'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
