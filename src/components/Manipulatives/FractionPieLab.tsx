import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, PieChart, AlertCircle } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface FractionPieLabProps {
  bopomofoEnabled?: boolean;
}

export const FractionPieLab: React.FC<FractionPieLabProps> = ({ bopomofoEnabled = true }) => {
  const [slicesCount, setSlicesCount] = useState<number>(2); // 平分成 2, 3, 4, 8 份 (預設 2)
  const [eatenCount, setEatenCount] = useState<number>(1); // 吃掉 1 份
  const [isEqualSplit, setIsEqualSplit] = useState<boolean>(true); // 平分 vs 沒平分辨析

  const handleSliceClick = (index: number) => {
    soundFx.playPop();
    if (index < eatenCount) {
      setEatenCount(prev => Math.max(0, prev - 1));
    } else {
      setEatenCount(prev => Math.min(slicesCount, prev + 1));
    }
  };

  const handleSpeak = () => {
    soundFx.playCorrect();
    if (!isEqualSplit) {
      speechService.speak('切得一大一小沒有平分，每一塊大小不一樣，所以不能叫做分數喔！');
      return;
    }
    const chineseNumbers = ['', '一', '二', '三', '四', '五', '六', '七', '八'];
    const totalName = chineseNumbers[slicesCount];
    const eatenName = chineseNumbers[eatenCount];
    const remainName = chineseNumbers[slicesCount - eatenCount];

    let text = `一個披薩平分成 ${slicesCount} 等份，每一份是全部的${totalName}分之一（1/${slicesCount}）。`;
    if (eatenCount > 0) {
      text += `吃了 ${eatenCount} 塊，吃了全部的${totalName}分之${eatenName}（${eatenCount}/${slicesCount}），還剩下${totalName}分之${remainName}（${slicesCount - eatenCount}/${slicesCount}）！`;
    }
    speechService.speak(text);
  };

  // SVG 計算輔助
  const cx = 120;
  const cy = 120;
  const r = 96;

  // 生成扇形路徑
  const getWedgePath = (startDeg: number, endDeg: number) => {
    const rad1 = (startDeg * Math.PI) / 180;
    const rad2 = (endDeg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(rad1);
    const y1 = cy + r * Math.sin(rad1);
    const x2 = cx + r * Math.cos(rad2);
    const y2 = cy + r * Math.sin(rad2);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const sliceColors = [
    '#f59e0b',
    '#fbbf24',
    '#f59e0b',
    '#fbbf24',
    '#f59e0b',
    '#fbbf24',
    '#f59e0b',
    '#fbbf24'
  ];

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl border-4 border-amber-300 shadow-lg max-w-2xl mx-auto w-full">
      {/* 頂部功能列 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-2xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-2 text-amber-950 font-black text-base">
          <PieChart size={22} className="text-amber-600" />
          <BopomofoText text="認識分數：披薩平分切塊實驗室" showBpmf={bopomofoEnabled} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-black border border-amber-300 transition"
          >
            <Volume2 size={16} />
            <BopomofoText text="語音讀分數" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setSlicesCount(2);
              setEatenCount(1);
              setIsEqualSplit(true);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* 份數切換選擇按鈕 */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-white p-3 rounded-2xl border border-amber-200 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-black text-amber-900">
            <BopomofoText text="平分成幾份：" showBpmf={bopomofoEnabled ?? false} />
          </span>
          {[2, 3, 4, 8].map(count => (
            <button
              key={count}
              onClick={() => {
                soundFx.playPop();
                setSlicesCount(count);
                setEatenCount(1);
                setIsEqualSplit(true);
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition flex items-center gap-1 ${
                slicesCount === count && isEqualSplit
                  ? 'bg-amber-500 text-white shadow-md scale-105'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200'
              }`}
            >
              <span>平分 {count} 份</span>
              <span className="text-xs opacity-85">({`1/${count}`})</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            soundFx.playPop();
            setIsEqualSplit(!isEqualSplit);
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-black border transition ${
            !isEqualSplit
              ? 'bg-rose-500 text-white border-rose-600 shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
          }`}
        >
          {!isEqualSplit ? (
            <BopomofoText text="⚠️ 觀察沒平分（一大一小）" showBpmf={bopomofoEnabled ?? false} />
          ) : (
            <BopomofoText text="切成一大一小比較" showBpmf={bopomofoEnabled ?? false} />
          )}
        </button>
      </div>

      {/* 披薩圓形切塊視覺區 */}
      <div className="bg-white rounded-3xl p-6 border-3 border-amber-300 shadow-sm flex flex-col md:flex-row items-center justify-around gap-6">
        {/* 披薩圓盤（SVG 真實扇形切割渲染） */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-60 h-60 flex items-center justify-center select-none">
            <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-lg">
              {/* 盤子底座 */}
              <circle cx={cx} cy={cy} r={108} fill="#fef3c7" stroke="#d97706" strokeWidth={6} />
              <circle cx={cx} cy={cy} r={100} fill="#fef9c3" stroke="#fde68a" strokeWidth={2} />

              {isEqualSplit ? (
                // 平分扇區切割
                Array.from({ length: slicesCount }).map((_, i) => {
                  const angleStep = 360 / slicesCount;
                  const startDeg = -90 + i * angleStep;
                  const endDeg = -90 + (i + 1) * angleStep;
                  const midRad = (((startDeg + endDeg) / 2) * Math.PI) / 180;
                  const isEaten = i < eatenCount;

                  const textX = cx + r * 0.62 * Math.cos(midRad);
                  const textY = cy + r * 0.62 * Math.sin(midRad);

                  // 臘腸配料座標
                  const topX = cx + r * 0.4 * Math.cos(midRad);
                  const topY = cy + r * 0.4 * Math.sin(midRad);

                  return (
                    <g
                      key={i}
                      onClick={() => handleSliceClick(i)}
                      className="cursor-pointer transition-all duration-200 hover:opacity-90"
                    >
                      {/* 扇形披薩塊 */}
                      <path
                        d={getWedgePath(startDeg, endDeg)}
                        fill={isEaten ? '#fef3c7' : sliceColors[i % sliceColors.length]}
                        stroke={isEaten ? '#cbd5e1' : '#78350f'}
                        strokeWidth={isEaten ? 1.5 : 3}
                        strokeDasharray={isEaten ? '4 4' : undefined}
                      />

                      {/* 披薩烤焦邊緣外環弧線 */}
                      {!isEaten && (
                        <path
                          d={getWedgePath(startDeg, endDeg)}
                          fill="none"
                          stroke="#92400e"
                          strokeWidth={6}
                          strokeLinecap="round"
                          opacity={0.3}
                        />
                      )}

                      {/* 配料小圓點（未吃掉時顯示） */}
                      {!isEaten && (
                        <circle cx={topX} cy={topY} r={slicesCount === 8 ? 4 : 6} fill="#dc2626" opacity={0.85} />
                      )}

                      {/* 扇區上的分數標籤 */}
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isEaten ? '#94a3b8' : '#78350f'}
                        fontSize={slicesCount === 8 ? 12 : 15}
                        fontWeight="900"
                        fontFamily="monospace"
                      >
                        {isEaten ? '已吃' : `1/${slicesCount}`}
                      </text>
                    </g>
                  );
                })
              ) : (
                // 沒平分的對比展示（一大一小）
                <g>
                  {/* 大塊 (270度) */}
                  <path
                    d={getWedgePath(-90, 180)}
                    fill="#f59e0b"
                    stroke="#78350f"
                    strokeWidth={3}
                  />
                  <text
                    x={cx - 30}
                    y={cy - 20}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#78350f"
                    fontSize={15}
                    fontWeight="900"
                  >
                    很大塊 (3/4)
                  </text>

                  {/* 小塊 (90度) */}
                  <path
                    d={getWedgePath(180, 270)}
                    fill="#fbbf24"
                    stroke="#78350f"
                    strokeWidth={3}
                  />
                  <text
                    x={cx + 35}
                    y={cy + 35}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#78350f"
                    fontSize={13}
                    fontWeight="900"
                  >
                    很小塊 (1/4)
                  </text>
                </g>
              )}

              {/* 披薩中心焦點 */}
              <circle cx={cx} cy={cy} r={8} fill="#78350f" stroke="#fff" strokeWidth={2} />
            </svg>
          </div>

          <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <span>💡 </span>
            <BopomofoText text="點擊披薩切片，可以「吃掉」或「放回」披薩塊喔！" showBpmf={bopomofoEnabled ?? false} />
          </p>
        </div>

        {/* 右側分數看板 */}
        <div className="flex flex-col gap-3 max-w-xs w-full">
          {isEqualSplit ? (
            <>
              <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 text-center shadow-sm">
                <span className="text-xs font-black text-amber-800 block mb-1">
                  <BopomofoText text="每一份披薩的大小" showBpmf={bopomofoEnabled} />
                </span>
                <div className="text-4xl font-black text-amber-950 font-mono my-1">
                  1 / {slicesCount}
                </div>
                <span className="text-sm font-bold text-amber-900">
                  <BopomofoText
                    text={`讀作：${
                      slicesCount === 2
                        ? '二分之一'
                        : slicesCount === 3
                        ? '三分之一'
                        : slicesCount === 4
                        ? '四分之一'
                        : '八分之一'
                    }`}
                    showBpmf={bopomofoEnabled}
                  />
                </span>
              </div>

              {/* 吃了幾塊統計卡 */}
              <div className="bg-white p-3 rounded-2xl border-2 border-orange-200 text-center">
                <span className="text-xs font-bold text-slate-500 block mb-0.5">
                  <BopomofoText text="吃掉的披薩總量：" showBpmf={bopomofoEnabled ?? false} />
                </span>
                <div className="text-2xl font-black font-mono text-orange-600">
                  {eatenCount} / {slicesCount}
                  <span className="text-xs font-sans text-slate-700 ml-1">
                    <BopomofoText text="個披薩" showBpmf={bopomofoEnabled ?? false} />
                  </span>
                </div>
                <span className="text-xs text-slate-600 font-bold">
                  （吃了 {eatenCount} 塊，還剩下 {slicesCount - eatenCount} 塊）
                </span>
              </div>

              <div className="bg-orange-50 p-3.5 rounded-2xl border border-orange-200 text-xs sm:text-sm font-bold text-orange-950">
                <div className="flex items-center gap-1.5 font-black text-orange-900 mb-1">
                  <Sparkles size={16} />
                  <span><BopomofoText text="分數的小秘密：" showBpmf={bopomofoEnabled ?? false} /></span>
                </div>
                <div>
                  • <BopomofoText text="橫線下面寫 " showBpmf={bopomofoEnabled ?? false} />
                  <span className="text-orange-700 font-black"><BopomofoText text="【分母】" showBpmf={bopomofoEnabled ?? false} /></span>
                  <BopomofoText text="：平分成幾份（" showBpmf={bopomofoEnabled ?? false} />{slicesCount}<BopomofoText text=" 份）" showBpmf={bopomofoEnabled ?? false} />
                </div>
                <div>
                  • <BopomofoText text="橫線上面寫 " showBpmf={bopomofoEnabled ?? false} />
                  <span className="text-orange-700 font-black"><BopomofoText text="【分子】" showBpmf={bopomofoEnabled ?? false} /></span>
                  <BopomofoText text="：吃了幾份（" showBpmf={bopomofoEnabled ?? false} />{eatenCount}<BopomofoText text=" 份）" showBpmf={bopomofoEnabled ?? false} />
                </div>
              </div>
            </>
          ) : (
            <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-300 text-rose-950 text-xs sm:text-sm font-bold">
              <div className="font-black text-rose-800 text-base mb-2 flex items-center gap-1.5">
                <AlertCircle size={20} className="text-rose-600" />
                <BopomofoText text="翰林課本特別強調：" showBpmf={bopomofoEnabled ?? false} />
              </div>
              <p className="leading-relaxed">
                <BopomofoText text="只有在「每一份大小一模一樣（平分）」時，才能用二分之一（1/2）、四分之一（1/4）表示！" showBpmf={bopomofoEnabled ?? false} />
              </p>
              <div className="mt-3 p-2 bg-white rounded-xl border border-rose-200 text-rose-900 text-xs">
                👉 <BopomofoText text="現在切成一大一小，兩邊不一樣大，所以不能叫做 1/2 喔！" showBpmf={bopomofoEnabled ?? false} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
