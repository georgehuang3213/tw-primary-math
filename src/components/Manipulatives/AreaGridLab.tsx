import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, CheckCircle2, Grid } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface AreaGridLabProps {
  bopomofoEnabled?: boolean;
}

export const AreaGridLab: React.FC<AreaGridLabProps> = ({ bopomofoEnabled = true }) => {
  // 4x4 方格盤，0: 沒鋪, 1: 紅色圖形, 2: 藍色圖形
  const [gridState, setGridState] = useState<number[]>(() => {
    // 預設紅圖 6 格、藍圖 8 格
    const initial = Array(16).fill(0);
    [0, 1, 4, 5, 8, 9].forEach(i => (initial[i] = 1));
    [2, 3, 6, 7, 10, 11, 14, 15].forEach(i => (initial[i] = 2));
    return initial;
  });

  const redCount = gridState.filter(s => s === 1).length;
  const blueCount = gridState.filter(s => s === 2).length;

  const handleCellClick = (index: number) => {
    soundFx.playPop();
    setGridState(prev => {
      const next = [...prev];
      next[index] = (next[index] + 1) % 3; // 0 -> 1(紅) -> 2(藍) -> 0
      return next;
    });
  };

  const handleSpeak = () => {
    soundFx.playCorrect();
    let text = '';
    if (redCount === blueCount) {
      text = `紅色圖形佔了 ${redCount} 個方格，藍色圖形也佔了 ${blueCount} 個方格，兩者面的大小一樣大！`;
    } else if (redCount > blueCount) {
      text = `紅色圖形佔了 ${redCount} 個方格，比藍色圖形的 ${blueCount} 個方格多 ${redCount - blueCount} 格，所以紅色圖形的面比較大！`;
    } else {
      text = `藍色圖形佔了 ${blueCount} 個方格，比紅色圖形的 ${redCount} 個方格多 ${blueCount - redCount} 格，所以藍色圖形的面比較大！`;
    }
    speechService.speak(text);
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-emerald-50 to-green-50 rounded-3xl border-4 border-emerald-300 shadow-lg">
      {/* 頂部功能列 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-2xl border-2 border-emerald-200 shadow-sm">
        <div className="flex items-center gap-2 text-emerald-950 font-black text-base">
          <Grid size={22} className="text-emerald-600" />
          <BopomofoText text="面的大小與方格鋪排實驗室" showBpmf={bopomofoEnabled} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-black border border-emerald-300 transition"
          >
            <Volume2 size={16} />
            <BopomofoText text="語音比較面積" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setGridState(Array(16).fill(0));
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
            title="清空"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* 統計大看板 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-500 shadow-sm"></div>
            <span className="text-sm font-black text-rose-950">
              <BopomofoText text="紅色圖形面積" showBpmf={bopomofoEnabled} />
            </span>
          </div>
          <span className="text-2xl font-black text-rose-600 font-mono">{redCount} 格</span>
        </div>

        <div className="bg-sky-50 border-2 border-sky-300 p-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-sky-500 shadow-sm"></div>
            <span className="text-sm font-black text-sky-950">
              <BopomofoText text="藍色圖形面積" showBpmf={bopomofoEnabled} />
            </span>
          </div>
          <span className="text-2xl font-black text-sky-600 font-mono">{blueCount} 格</span>
        </div>
      </div>

      {/* 4x4 方格操作區 */}
      <div className="bg-white rounded-3xl p-6 border-3 border-emerald-300 shadow-sm flex flex-col items-center">
        <div className="text-xs font-black text-slate-500 mb-3">
          💡 點擊方格切換顏色（空白 ➔ 🟥 紅色 ➔ 🟦 藍色 ➔ 清除）
        </div>

        <div className="grid grid-cols-4 gap-2.5 p-3 bg-slate-100 rounded-2xl border-2 border-slate-300 shadow-inner">
          {gridState.map((state, idx) => (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 font-mono font-black text-sm flex items-center justify-center transition-all ${
                state === 1
                  ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-105'
                  : state === 2
                  ? 'bg-sky-500 text-white border-sky-600 shadow-md scale-105'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              {state === 1 ? '紅' : state === 2 ? '藍' : idx + 1}
            </button>
          ))}
        </div>

        {/* 結論標籤 */}
        <div className="mt-5 px-6 py-2.5 bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-100 border-2 border-emerald-300 rounded-full text-base font-black text-emerald-950">
          <BopomofoText
            text={
              redCount === blueCount
                ? `紅圖與藍圖面積剛好一樣大（都是 ${redCount} 個方格）！`
                : redCount > blueCount
                ? `紅圖（${redCount}格）比藍圖（${blueCount}格）多 ${redCount - blueCount} 格，紅色面的面積比較大！`
                : `藍圖（${blueCount}格）比紅圖（${redCount}格）多 ${blueCount - redCount} 格，藍色面的面積比較大！`
            }
            showBpmf={bopomofoEnabled}
          />
        </div>
      </div>
    </div>
  );
};
