import React, { useState } from 'react';
import { Ruler, MoveHorizontal } from 'lucide-react';
import { soundFx } from '../../services/audio';
import { BopomofoText } from '../BopomofoText';

interface VirtualRulerProps {
  interactive?: boolean;
  bopomofoEnabled?: boolean;
}

export const VirtualRuler: React.FC<VirtualRulerProps> = ({ interactive = true, bopomofoEnabled }) => {
  const [rulerOffset, setRulerOffset] = useState<number>(0); // 尺的平移像素
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  const items = [
    { name: '✏️ 削好的鉛筆', lengthCm: 12, startCm: 0, color: 'bg-amber-400' },
    { name: '🧼 藍色橡皮擦', lengthCm: 5, startCm: 2, color: 'bg-sky-400' },
    { name: '🖍️ 彩色蠟筆', lengthCm: 8, startCm: 4, color: 'bg-rose-400' }
  ];

  const currentItem = items[selectedItemIndex];

  // 1 公分等於 24 像素 (在畫面上的比例)
  const cmToPx = 24;

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRulerOffset(parseInt(e.target.value, 10));
  };

  const handleAlignZero = () => {
    soundFx.playPop();
    setRulerOffset(currentItem.startCm * cmToPx);
  };

  return (
    <div className="flex flex-col items-center bg-emerald-50/70 p-4 sm:p-6 rounded-3xl border-2 border-emerald-200 max-w-xl mx-auto">
      {/* 測量物品選擇 */}
      <div className="flex flex-wrap items-center justify-between w-full bg-white p-3 rounded-2xl border-2 border-emerald-200 shadow-sm mb-4">
        <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
          <Ruler size={16} className="text-emerald-600" /> <BopomofoText text="選擇要量測的物品：" showBpmf={bopomofoEnabled ?? false} />
        </span>
        <div className="flex gap-1.5">
          {items.map((it, idx) => (
            <button
              key={it.name}
              onClick={() => {
                soundFx.playPop();
                setSelectedItemIndex(idx);
              }}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition ${
                selectedItemIndex === idx
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
              }`}
            >
              <BopomofoText text={it.name} showBpmf={bopomofoEnabled ?? false} />
            </button>
          ))}
        </div>
      </div>

      {/* 測量操作台 */}
      <div className="relative w-full bg-white p-6 rounded-2xl border-2 border-slate-300 shadow-inner overflow-x-auto min-h-[220px]">
        {/* 物品放置軌道 */}
        <div className="relative h-14 w-[500px] mb-4 flex items-center">
          <div
            className={`absolute h-8 rounded-lg shadow-md flex items-center justify-center font-bold text-xs text-white transition-all ${currentItem.color}`}
            style={{
              left: `${currentItem.startCm * cmToPx + 20}px`,
              width: `${currentItem.lengthCm * cmToPx}px`
            }}
          >
            <BopomofoText text={currentItem.name} showBpmf={bopomofoEnabled ?? false} />
          </div>
        </div>

        {/* 虛擬直尺 (公分刻度 0 ~ 18) */}
        <div
          className="relative w-[500px] transition-transform"
          style={{ transform: `translateX(${rulerOffset}px)` }}
        >
          <div className="h-16 bg-amber-100/90 backdrop-blur-sm border-2 border-amber-400 rounded-lg shadow-lg relative select-none">
            {/* 刻度繪製 */}
            {Array.from({ length: 19 }).map((_, cm) => {
              const leftPos = 20 + cm * cmToPx;
              return (
                <div key={cm} className="absolute top-0 flex flex-col items-center" style={{ left: `${leftPos}px` }}>
                  {/* 公分長刻度線 */}
                  <div className="w-[1.5px] h-6 bg-slate-800"></div>
                  <span className="text-[10px] font-black text-slate-800 -mt-0.5">{cm}</span>

                  {/* 半公分刻度 */}
                  {cm < 18 && (
                    <div
                      className="absolute top-0 w-[1px] h-3.5 bg-slate-500"
                      style={{ left: `${cmToPx / 2}px` }}
                    ></div>
                  )}
                </div>
              );
            })}
            <div className="absolute right-3 bottom-1 text-[10px] font-bold text-amber-800">
              <BopomofoText text="公分 (cm)" showBpmf={bopomofoEnabled ?? false} />
            </div>
          </div>
        </div>
      </div>

      {/* 直尺移動控制器 */}
      {interactive && (
        <div className="w-full mt-4 bg-white p-3.5 rounded-2xl border border-emerald-200 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <MoveHorizontal size={14} /> <BopomofoText text="左右拖曳移動直尺：" showBpmf={bopomofoEnabled ?? false} />
            </span>
            <button
              onClick={handleAlignZero}
              className="text-xs font-black text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg"
            >
              <BopomofoText text="🎯 對齊物品起點 (0刻度)" showBpmf={bopomofoEnabled ?? false} />
            </button>
          </div>
          <input
            type="range"
            min="-100"
            max="150"
            value={rulerOffset}
            onChange={handleDrag}
            className="w-full accent-emerald-600 cursor-pointer"
          />
          <div className="text-xs text-slate-500 text-center font-medium">
            <BopomofoText text="💡 小撇步：把直尺的「0刻度」對準物品最左邊，右邊對應到的數字就是物品長度喔！" showBpmf={bopomofoEnabled ?? false} />
          </div>
        </div>
      )}
    </div>
  );
};
