import React, { useState } from 'react';
import { Ruler, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface UnitLengthLabProps {
  bopomofoEnabled?: boolean;
}

export const UnitLengthLab: React.FC<UnitLengthLabProps> = ({ bopomofoEnabled = true }) => {
  const [activeTab, setActiveTab] = useState<'compare' | 'units'>('compare');
  const [pencilLength, setPencilLength] = useState<number>(7); // 7 個方格長
  const [crayonLength, setCrayonLength] = useState<number>(4); // 4 個方格長
  const [unitType, setUnitType] = useState<'clip' | 'block' | 'eraser'>('clip');

  const unitIcons = {
    clip: { name: '迴紋針', icon: '📎' },
    block: { name: '小方格', icon: '🟧' },
    eraser: { name: '橡皮擦', icon: '🧼' }
  };

  const handleSpeak = () => {
    soundFx.playCorrect();
    if (activeTab === 'compare') {
      let text = `兩支筆的一端都對齊左邊基準線：紅色鉛筆長 ${pencilLength} 格，黃色蠟筆長 ${crayonLength} 格，`;
      text += pencilLength > crayonLength ? `紅色鉛筆伸得比較長，所以紅色鉛筆比較長！` : `黃色蠟筆比較長！`;
      speechService.speak(text);
    } else {
      const u = unitIcons[unitType];
      const text = `用${u.name}緊密排在一起測量：紅色鉛筆剛好排了 ${pencilLength} 個${u.name}長！`;
      speechService.speak(text);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-amber-50 to-yellow-50 rounded-3xl border-4 border-amber-300 shadow-lg">
      {/* 頂部切換列 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2.5 rounded-2xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('compare');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-black transition flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-amber-500 text-white shadow-md scale-105'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            <span>📏</span>
            <BopomofoText text="起點端對齊比長短" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('units');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-black transition flex items-center gap-1.5 ${
              activeTab === 'units'
                ? 'bg-yellow-500 text-yellow-950 shadow-md scale-105'
                : 'text-slate-700 hover:bg-yellow-100'
            }`}
          >
            <span>📎</span>
            <BopomofoText text="個別單位（迴紋針/方格）量長度" showBpmf={bopomofoEnabled} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-black border border-amber-300 transition"
          >
            <Volume2 size={16} />
            <BopomofoText text="朗讀測量結果" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setPencilLength(7);
              setCrayonLength(4);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
            title="重設"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* ================= 模式一：起點對齊比長短 ================= */}
      {activeTab === 'compare' && (
        <div className="bg-white rounded-3xl p-6 border-3 border-amber-300 shadow-sm flex flex-col gap-6">
          <div className="text-xs font-black text-amber-900">
            🚩 <BopomofoText text="比長短第一步：先把左邊起點端對齊紅色基準線！" showBpmf={bopomofoEnabled} />
          </div>

          <div className="relative pl-6 border-l-4 border-rose-500 flex flex-col gap-5 py-2">
            {/* 基準線標籤 */}
            <div className="absolute -left-3 -top-3 px-2 py-0.5 bg-rose-500 text-white rounded-full text-[10px] font-black">
              起點基準線
            </div>

            {/* 鉛筆 */}
            <div className="flex items-center gap-3">
              <span className="w-20 text-xs font-black text-slate-700">鉛筆 (紅)：</span>
              <div
                className="h-10 bg-gradient-to-r from-rose-500 to-rose-400 rounded-r-2xl border-2 border-rose-600 shadow-md flex items-center justify-end pr-2 transition-all duration-300"
                style={{ width: `${pencilLength * 36}px` }}
              >
                <span className="text-white text-xs font-mono font-black">{pencilLength} 格長</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    if (pencilLength > 2) {
                      soundFx.playPop();
                      setPencilLength(prev => prev - 1);
                    }
                  }}
                  className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded font-black text-xs"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    if (pencilLength < 10) {
                      soundFx.playPop();
                      setPencilLength(prev => prev + 1);
                    }
                  }}
                  className="w-7 h-7 bg-rose-500 hover:bg-rose-600 text-white rounded font-black text-xs shadow"
                >
                  +
                </button>
              </div>
            </div>

            {/* 蠟筆 */}
            <div className="flex items-center gap-3">
              <span className="w-20 text-xs font-black text-slate-700">蠟筆 (黃)：</span>
              <div
                className="h-10 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-r-2xl border-2 border-amber-500 shadow-md flex items-center justify-end pr-2 transition-all duration-300"
                style={{ width: `${crayonLength * 36}px` }}
              >
                <span className="text-amber-950 text-xs font-mono font-black">{crayonLength} 格長</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => {
                    if (crayonLength > 2) {
                      soundFx.playPop();
                      setCrayonLength(prev => prev - 1);
                    }
                  }}
                  className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded font-black text-xs"
                >
                  -
                </button>
                <button
                  onClick={() => {
                    if (crayonLength < 10) {
                      soundFx.playPop();
                      setCrayonLength(prev => prev + 1);
                    }
                  }}
                  className="w-7 h-7 bg-amber-500 hover:bg-amber-600 text-white rounded font-black text-xs shadow"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 結論標籤 */}
          <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-center font-black text-base text-amber-950">
            <BopomofoText
              text={
                pencilLength === crayonLength
                  ? `兩支筆都長 ${pencilLength} 格，剛好一樣長！`
                  : pencilLength > crayonLength
                  ? `鉛筆伸出 ${pencilLength} 格，比蠟筆的 ${crayonLength} 格多 ${pencilLength - crayonLength} 格，所以【鉛筆】比較長！`
                  : `蠟筆伸出 ${crayonLength} 格，比鉛筆的 ${pencilLength} 格多 ${crayonLength - pencilLength} 格，所以【蠟筆】比較長！`
              }
              showBpmf={bopomofoEnabled}
            />
          </div>
        </div>
      )}

      {/* ================= 模式二：個別單位測量 ================= */}
      {activeTab === 'units' && (
        <div className="bg-white rounded-3xl p-6 border-3 border-yellow-300 shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-black text-slate-600">選擇測量用的個別單位：</span>
            <div className="flex gap-2">
              {(['clip', 'block', 'eraser'] as const).map(k => (
                <button
                  key={k}
                  onClick={() => {
                    soundFx.playPop();
                    setUnitType(k);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                    unitType === k
                      ? 'bg-amber-500 text-white shadow'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {unitIcons[k].icon} {unitIcons[k].name}
                </button>
              ))}
            </div>
          </div>

          {/* 物件長度與單位排排看 */}
          <div className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 flex flex-col gap-3">
            <div className="text-xs font-black text-slate-700">彩色鉛筆：</div>
            <div className="w-full h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-sm"></div>

            <div className="text-xs font-black text-amber-900 mt-2">
              用【{unitIcons[unitType].name}】緊密排列測量（不留空隙、不重疊）：
            </div>
            <div className="flex items-center gap-1.5 flex-wrap min-h-[40px] p-2 bg-amber-50 rounded-xl border border-amber-200 border-dashed">
              {Array.from({ length: pencilLength }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-lg bg-white border border-amber-300 shadow-sm flex items-center justify-center text-xl animate-bounce-short"
                >
                  {unitIcons[unitType].icon}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 p-3 rounded-2xl border border-yellow-200 text-center font-black text-base text-yellow-950">
            <BopomofoText
              text={`這支鉛筆的長度剛好是 【 ${pencilLength} 個${unitIcons[unitType].name}長 】！`}
              showBpmf={bopomofoEnabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};
