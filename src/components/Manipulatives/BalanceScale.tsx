import React, { useState } from 'react';
import { Scale, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface BalanceScaleProps {
  bopomofoEnabled?: boolean;
}

interface WeightItem {
  id: string;
  name: string;
  icon: string;
  grams: number;
}

const ITEMS: WeightItem[] = [
  { id: 'apple', name: '紅蘋果', icon: '🍎', grams: 200 },
  { id: 'watermelon', name: '大西瓜', icon: '🍉', grams: 1000 },
  { id: 'pencil', name: '鉛筆盒', icon: '✏️', grams: 100 },
  { id: 'book', name: '厚字典', icon: '📖', grams: 600 },
  { id: 'weight100', name: '100g 砝碼', icon: '🪙', grams: 100 },
  { id: 'weight500', name: '500g 砝碼', icon: '⚖️', grams: 500 },
  { id: 'weight1000', name: '1kg (1000g) 砝碼', icon: '🧱', grams: 1000 },
];

export const BalanceScale: React.FC<BalanceScaleProps> = ({ bopomofoEnabled = true }) => {
  const [leftItems, setLeftItems] = useState<WeightItem[]>([ITEMS[0]]); // 1 蘋果 = 200g
  const [rightItems, setRightItems] = useState<WeightItem[]>([ITEMS[4], ITEMS[4]]); // 2 個 100g 砝碼 = 200g

  const leftWeight = leftItems.reduce((sum, item) => sum + item.grams, 0);
  const rightWeight = rightItems.reduce((sum, item) => sum + item.grams, 0);

  const handleAddLeft = (item: WeightItem) => {
    soundFx.playPop();
    setLeftItems(prev => [...prev, item]);
  };

  const handleAddRight = (item: WeightItem) => {
    soundFx.playPop();
    setRightItems(prev => [...prev, item]);
  };

  const handleClear = () => {
    soundFx.playPop();
    setLeftItems([]);
    setRightItems([]);
  };

  const handleSpeak = () => {
    soundFx.playCorrect();
    let text = '';
    if (leftWeight === rightWeight) {
      text = `左盤重 ${leftWeight} 公克，右盤重 ${rightWeight} 公克，天平兩邊剛好一樣重，保持平衡！`;
    } else if (leftWeight > rightWeight) {
      text = `左盤重 ${leftWeight} 公克，比右盤重，左邊沉下去！`;
    } else {
      text = `右盤重 ${rightWeight} 公克，比左盤重，右邊沉下去！`;
    }
    speechService.speak(text);
  };

  // 天平旋轉角度計算
  let tiltDeg = 0;
  if (leftWeight > rightWeight) tiltDeg = -10;
  else if (rightWeight > leftWeight) tiltDeg = 10;

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-teal-50 to-cyan-50 rounded-3xl border-4 border-teal-300 shadow-lg">
      {/* 頂部控制列 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-2xl border-2 border-teal-200 shadow-sm">
        <div className="flex items-center gap-2 text-teal-950 font-black text-base">
          <Scale size={22} className="text-teal-600" />
          <BopomofoText text="天平秤重與公斤公克實驗室" showBpmf={bopomofoEnabled} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-100 hover:bg-teal-200 text-teal-900 rounded-xl text-xs font-black border border-teal-300 transition"
          >
            <Volume2 size={16} />
            <BopomofoText text="朗讀重量比較" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* 物品放置按鈕庫 */}
      <div className="bg-white p-4 rounded-2xl border-2 border-teal-200">
        <div className="text-xs font-black text-teal-800 mb-2">
          📦 <BopomofoText text="點擊按鈕，將物品或砝碼放到天平左盤或右盤：" showBpmf={bopomofoEnabled} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ITEMS.map(item => (
            <div key={item.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold flex items-center gap-1">
                <span>{item.icon}</span>
                <span><BopomofoText text={item.name} showBpmf={bopomofoEnabled ?? false} /> ({item.grams >= 1000 ? `${item.grams/1000}kg` : `${item.grams}g`})</span>
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => handleAddLeft(item)}
                  className="px-2 py-0.5 bg-teal-500 hover:bg-teal-600 text-white rounded text-[11px] font-black"
                >
                  <BopomofoText text="左" showBpmf={bopomofoEnabled ?? false} />
                </button>
                <button
                  onClick={() => handleAddRight(item)}
                  className="px-2 py-0.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded text-[11px] font-black"
                >
                  <BopomofoText text="右" showBpmf={bopomofoEnabled ?? false} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 天平視覺區 */}
      <div className="bg-white rounded-3xl p-6 border-3 border-teal-300 shadow-sm flex flex-col items-center">
        {/* 重量指示結論 */}
        <div className="mb-6 px-6 py-2.5 rounded-full text-base sm:text-lg font-black bg-gradient-to-r from-teal-100 via-cyan-100 to-teal-100 border-2 border-teal-300 text-teal-950">
          <BopomofoText
            text={
              leftWeight === rightWeight
                ? `兩邊剛好一樣重（都是 ${leftWeight} 公克），天平保持水平！`
                : leftWeight > rightWeight
                ? `左盤重 ${leftWeight}g ＞ 右盤重 ${rightWeight}g，左邊沉下去！`
                : `右盤重 ${rightWeight}g ＞ 左盤重 ${leftWeight}g，右邊沉下去！`
            }
            showBpmf={bopomofoEnabled}
          />
        </div>

        {/* 互動天平繪製 */}
        <div className="w-full max-w-md flex flex-col items-center relative py-8">
          {/* 天平橫桿（隨重量傾斜） */}
          <div
            className="w-full h-3 bg-amber-700 rounded-full transition-transform duration-500 relative flex items-center justify-between"
            style={{ transform: `rotate(${tiltDeg}deg)` }}
          >
            {/* 左托盤 */}
            <div className="absolute -left-4 top-2 flex flex-col items-center">
              <div className="w-0.5 h-12 bg-slate-400"></div>
              <div className="w-28 sm:w-32 min-h-[50px] p-2 bg-teal-50 border-2 border-teal-400 rounded-2xl shadow-md flex items-center justify-center flex-wrap gap-1">
                {leftItems.length === 0 ? (
                  <span className="text-[10px] text-slate-400 font-bold"><BopomofoText text="空左盤" showBpmf={bopomofoEnabled ?? false} /></span>
                ) : (
                  leftItems.map((item, idx) => (
                    <span key={idx} className="text-xl">
                      {item.icon}
                    </span>
                  ))
                )}
              </div>
              <span className="text-xs font-black text-teal-900 mt-1 font-mono">{leftWeight} g</span>
            </div>

            {/* 支點中心 */}
            <div className="w-6 h-6 rounded-full bg-amber-900 mx-auto -mt-1 shadow-md"></div>

            {/* 右托盤 */}
            <div className="absolute -right-4 top-2 flex flex-col items-center">
              <div className="w-0.5 h-12 bg-slate-400"></div>
              <div className="w-28 sm:w-32 min-h-[50px] p-2 bg-cyan-50 border-2 border-cyan-400 rounded-2xl shadow-md flex items-center justify-center flex-wrap gap-1">
                {rightItems.length === 0 ? (
                  <span className="text-[10px] text-slate-400 font-bold"><BopomofoText text="空右盤" showBpmf={bopomofoEnabled ?? false} /></span>
                ) : (
                  rightItems.map((item, idx) => (
                    <span key={idx} className="text-xl">
                      {item.icon}
                    </span>
                  ))
                )}
              </div>
              <span className="text-xs font-black text-cyan-900 mt-1 font-mono">{rightWeight} g</span>
            </div>
          </div>

          {/* 天平底座支架 */}
          <div className="w-4 h-24 bg-gradient-to-b from-slate-400 to-slate-600 rounded-t mt-1"></div>
          <div className="w-36 h-4 bg-slate-700 rounded-full shadow-md"></div>
        </div>

        {/* 換算小提示 */}
        <div className="mt-4 bg-teal-50 p-3 rounded-2xl border border-teal-200 text-xs sm:text-sm font-bold text-teal-950 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
          <BopomofoText text="口訣記牢：1 公斤 (kg) ＝ 1000 公克 (g)，重的一端一定會沉下去！" showBpmf={bopomofoEnabled} />
        </div>
      </div>
    </div>
  );
};
