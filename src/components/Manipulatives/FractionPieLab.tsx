import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, PieChart, CheckCircle2, AlertCircle } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface FractionPieLabProps {
  bopomofoEnabled?: boolean;
}

export const FractionPieLab: React.FC<FractionPieLabProps> = ({ bopomofoEnabled = true }) => {
  const [slicesCount, setSlicesCount] = useState<number>(4); // 平分成 2, 3, 4, 8 份
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

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-amber-50 to-orange-50 rounded-3xl border-4 border-amber-300 shadow-lg">
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
              setSlicesCount(4);
              setEatenCount(1);
              setIsEqualSplit(true);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
            title="重設"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* 份數切換選擇按鈕 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-2xl border border-amber-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-amber-900"><BopomofoText text="平分成幾份：" showBpmf={bopomofoEnabled ?? false} /></span>
          {[2, 3, 4, 8].map(count => (
            <button
              key={count}
              onClick={() => {
                soundFx.playPop();
                setSlicesCount(count);
                setEatenCount(1);
                setIsEqualSplit(true);
              }}
              className={`px-3.5 py-1.5 rounded-xl font-black text-sm transition ${
                slicesCount === count && isEqualSplit
                  ? 'bg-amber-500 text-white shadow scale-105'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200'
              }`}
            >
              <BopomofoText text="平分 " showBpmf={bopomofoEnabled ?? false} />{count}<BopomofoText text=" 份" showBpmf={bopomofoEnabled ?? false} /> ({`1/${count}`})
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
              ? 'bg-rose-500 text-white border-rose-600 shadow'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
          }`}
        >
          {!isEqualSplit ? <BopomofoText text="⚠️ 觀察沒平分（一大一小）" showBpmf={bopomofoEnabled ?? false} /> : <BopomofoText text="切成一大一小比較" showBpmf={bopomofoEnabled ?? false} />}
        </button>
      </div>

      {/* 披薩圓形切塊視覺區 */}
      <div className="bg-white rounded-3xl p-6 border-3 border-amber-300 shadow-sm flex flex-col md:flex-row items-center justify-around gap-6">
        {/* 披薩圓盤 */}
        <div className="relative w-56 h-56 rounded-full border-8 border-amber-600 bg-amber-100 shadow-xl overflow-hidden flex items-center justify-center p-2">
          {/* 披薩配料花紋 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 opacity-90"></div>

          {/* 切割扇區渲染 */}
          {isEqualSplit ? (
            Array.from({ length: slicesCount }).map((_, i) => {
              const isEaten = i < eatenCount;
              const angle = (360 / slicesCount) * i;
              return (
                <div
                  key={i}
                  onClick={() => handleSliceClick(i)}
                  className={`absolute w-full h-full cursor-pointer flex items-center justify-center transition-all duration-300 ${
                    isEaten ? 'opacity-20 scale-90' : 'hover:scale-105'
                  }`}
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((2 * Math.PI * i) / slicesCount)}% ${
                      50 + 50 * Math.sin((2 * Math.PI * i) / slicesCount)
                    }%, ${50 + 50 * Math.cos((2 * Math.PI * (i + 1)) / slicesCount)}% ${
                      50 + 50 * Math.sin((2 * Math.PI * (i + 1)) / slicesCount)
                    }%)`
                  }}
                >
                  <span className="text-xs font-black text-amber-950 bg-white/80 px-1.5 py-0.5 rounded shadow z-10 font-mono">
                    {`1/${slicesCount}`}
                  </span>
                </div>
              );
            })
          ) : (
            // 沒平分的對比展示
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10 bg-rose-50/80">
              <AlertCircle size={36} className="text-rose-600 mb-1" />
              <span className="text-sm font-black text-rose-950"><BopomofoText text="一大一小沒有平分！" showBpmf={bopomofoEnabled ?? false} /></span>
              <span className="text-xs text-slate-600 font-bold mt-1">
                <BopomofoText text="每一份大小不一樣，小塊的【不能】叫做二分之一！" showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>
          )}

          {/* 披薩中心點 */}
          <div className="w-6 h-6 rounded-full bg-amber-800 z-20 shadow-md"></div>
        </div>

        {/* 右側分數看板 */}
        <div className="flex flex-col gap-3 max-w-xs w-full">
          {isEqualSplit ? (
            <>
              <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 text-center">
                <span className="text-xs font-black text-amber-800 block mb-1">
                  <BopomofoText text="每一份披薩的大小" showBpmf={bopomofoEnabled} />
                </span>
                <div className="text-4xl font-black text-amber-950 font-mono my-1">
                  1 / {slicesCount}
                </div>
                <span className="text-sm font-bold text-amber-900">
                  <BopomofoText
                    text={`讀作：${
                      slicesCount === 2 ? '二分之一' : slicesCount === 3 ? '三分之一' : slicesCount === 4 ? '四分之一' : '八分之一'
                    }`}
                    showBpmf={bopomofoEnabled}
                  />
                </span>
              </div>

              <div className="bg-orange-50 p-3.5 rounded-2xl border border-orange-200 text-xs sm:text-sm font-bold text-orange-950">
                <div className="flex items-center gap-1.5 font-black text-orange-900 mb-1">
                  <Sparkles size={16} />
                  <span><BopomofoText text="分數的小秘密：" showBpmf={bopomofoEnabled ?? false} /></span>
                </div>
                <div>• <BopomofoText text="橫線下面寫 " showBpmf={bopomofoEnabled ?? false} /><span className="text-orange-700 font-black"><BopomofoText text="【分母】" showBpmf={bopomofoEnabled ?? false} /></span><BopomofoText text="：平分成幾份（" showBpmf={bopomofoEnabled ?? false} />{slicesCount}<BopomofoText text=" 份）" showBpmf={bopomofoEnabled ?? false} /></div>
                <div>• <BopomofoText text="橫線上面寫 " showBpmf={bopomofoEnabled ?? false} /><span className="text-orange-700 font-black"><BopomofoText text="【分子】" showBpmf={bopomofoEnabled ?? false} /></span><BopomofoText text="：拿了幾份（" showBpmf={bopomofoEnabled ?? false} />{eatenCount}<BopomofoText text=" 份）" showBpmf={bopomofoEnabled ?? false} /></div>
              </div>
            </>
          ) : (
            <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-300 text-rose-950 text-xs sm:text-sm font-bold">
              <div className="font-black text-rose-800 text-base mb-2"><BopomofoText text="⚠️ 翰林課本特別強調：" showBpmf={bopomofoEnabled ?? false} /></div>
              <p className="leading-relaxed">
                <BopomofoText text="只有在「每一份大小一模一樣（平分）」時，才能用二分之一（1/2）、四分之一（1/4）表示！" showBpmf={bopomofoEnabled ?? false} />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
