import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { soundFx } from '../../services/audio';

interface TenSplitBoardProps {
  totalCount?: number;
  interactive?: boolean;
}

export const TenSplitBoard: React.FC<TenSplitBoardProps> = ({
  totalCount = 10,
  interactive = true
}) => {
  // 每個花片的顏色：true 為紅色，false 為黃色
  const [chips, setChips] = useState<boolean[]>(
    Array.from({ length: totalCount }, (_, i) => i < 6) // 預設 6 紅 4 黃
  );

  const toggleChip = (index: number) => {
    soundFx.playPop();
    setChips(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const redCount = chips.filter(Boolean).length;
  const yellowCount = chips.length - redCount;

  const setSplit = (r: number) => {
    soundFx.playPop();
    setChips(Array.from({ length: totalCount }, (_, i) => i < r));
  };

  return (
    <div className="flex flex-col items-center bg-rose-50/70 p-4 sm:p-6 rounded-3xl border-2 border-rose-200 max-w-lg mx-auto">
      {/* 分與合數字樹圖解 */}
      <div className="flex flex-col items-center bg-white p-4 rounded-2xl border-2 border-rose-200 shadow-sm w-full mb-4">
        <div className="flex items-center gap-6 text-center">
          {/* 總數 */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-400 font-bold mb-1">合起來是</span>
            <span className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 font-black text-2xl flex items-center justify-center shadow-md">
              {totalCount}
            </span>
          </div>

          <div className="text-2xl text-slate-300 font-bold">➔</div>

          {/* 分成兩部分 */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <span className="text-xs text-rose-500 font-bold mb-1">紅色花片</span>
              <span className="w-14 h-14 rounded-2xl bg-rose-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
                {redCount}
              </span>
            </div>
            <span className="text-xl font-black text-slate-400">和</span>
            <div className="flex flex-col items-center">
              <span className="text-xs text-amber-500 font-bold mb-1">黃色花片</span>
              <span className="w-14 h-14 rounded-2xl bg-amber-300 text-amber-950 font-black text-2xl flex items-center justify-center shadow-md">
                {yellowCount}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-3 text-sm font-black text-slate-700 pt-2 border-t border-rose-100 w-full text-center">
          💡 {totalCount} 可以分成 <span className="text-rose-600">{redCount}</span> 和 <span className="text-amber-600">{yellowCount}</span> （{redCount} + {yellowCount} = {totalCount}）
        </div>
      </div>

      {/* 十格陣雙色花片操作盤 */}
      <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-inner grid grid-cols-5 gap-3 max-w-sm">
        {chips.map((isRed, idx) => (
          <button
            key={idx}
            onClick={() => interactive && toggleChip(idx)}
            className={`w-12 h-12 rounded-full font-black text-xs shadow-md border-2 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center select-none ${
              isRed
                ? 'bg-rose-500 border-rose-600 text-white'
                : 'bg-amber-300 border-amber-400 text-amber-950'
            }`}
            title="點擊翻面換顏色"
          >
            {isRed ? '紅' : '黃'}
          </button>
        ))}
      </div>

      {/* 快捷拆分按鈕 */}
      {interactive && (
        <div className="mt-4 flex flex-wrap justify-center gap-1.5 w-full">
          <span className="w-full text-center text-xs font-bold text-slate-500 mb-1">
            點擊花片翻面，或點選快捷拆數：
          </span>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
            <button
              key={n}
              onClick={() => setSplit(n)}
              className={`px-2 py-1 rounded-lg text-xs font-bold ${
                redCount === n
                  ? 'bg-rose-600 text-white'
                  : 'bg-white hover:bg-rose-100 text-rose-900 border border-rose-200'
              }`}
            >
              {n}紅{totalCount - n}黃
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
