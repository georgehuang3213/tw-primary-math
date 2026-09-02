import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Volume2, Sparkles, Droplets } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface CapacityLabProps {
  bopomofoEnabled?: boolean;
}

export const CapacityLab: React.FC<CapacityLabProps> = ({ bopomofoEnabled = true }) => {
  const [potACups, setPotACups] = useState<number>(6); // 甲茶壺可倒 6 杯
  const [potBCups, setPotBCups] = useState<number>(4); // 乙茶壺可倒 4 杯
  const [activeTab, setActiveTab] = useState<'compare' | 'liter'>('compare');
  const [mlValue, setMlValue] = useState<number>(600);

  const handleSpeakCompare = () => {
    soundFx.playCorrect();
    let text = '';
    if (potACups === potBCups) {
      text = `甲壺可倒滿 ${potACups} 杯水，乙壺也可倒滿 ${potBCups} 杯水，兩壺容量一樣大！`;
    } else if (potACups > potBCups) {
      text = `甲壺可倒滿 ${potACups} 杯水，比乙壺的 ${potBCups} 杯多 ${potACups - potBCups} 杯，所以甲壺容量比較大！`;
    } else {
      text = `乙壺可倒滿 ${potBCups} 杯水，比甲壺的 ${potACups} 杯多 ${potBCups - potACups} 杯，所以乙壺容量比較大！`;
    }
    speechService.speak(text);
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-blue-50 to-sky-50 rounded-3xl border-4 border-blue-300 shadow-lg">
      {/* 頂部切換列 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2.5 rounded-2xl border-2 border-blue-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('compare');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-black transition flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-blue-500 text-white shadow-md scale-105'
                : 'text-slate-700 hover:bg-blue-100'
            }`}
          >
            <span>🫖</span>
            <BopomofoText text="茶壺倒水杯數比容量" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('liter');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-black transition flex items-center gap-1.5 ${
              activeTab === 'liter'
                ? 'bg-sky-500 text-white shadow-md scale-105'
                : 'text-slate-700 hover:bg-sky-100'
            }`}
          >
            <span>🥛</span>
            <BopomofoText text="公升與毫升量杯" showBpmf={bopomofoEnabled} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeakCompare}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-xl text-xs font-black border border-blue-300 transition"
          >
            <Volume2 size={16} />
            <BopomofoText text="語音報讀" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setPotACups(6);
              setPotBCups(4);
              setMlValue(600);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
            title="重設"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* ================= 模式一：茶壺倒水杯數比較 ================= */}
      {activeTab === 'compare' && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 甲壺 */}
            <div className="bg-white rounded-3xl p-5 border-3 border-blue-300 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-black text-blue-950 flex items-center gap-2">
                  <span className="text-3xl">🫖</span>
                  <BopomofoText text="甲茶壺（藍色）" showBpmf={bopomofoEnabled} />
                </span>
                <div className="flex items-center gap-1 bg-blue-50 p-1 rounded-xl border border-blue-200">
                  <button
                    onClick={() => {
                      if (potACups > 1) {
                        soundFx.playPop();
                        setPotACups(prev => prev - 1);
                      }
                    }}
                    className="w-7 h-7 bg-white text-blue-600 rounded font-black shadow-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-black text-blue-950">{potACups} 杯</span>
                  <button
                    onClick={() => {
                      if (potACups < 10) {
                        soundFx.playPop();
                        setPotACups(prev => prev + 1);
                      }
                    }}
                    className="w-7 h-7 bg-white text-blue-600 rounded font-black shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-xs font-black text-slate-500 mb-2">可倒滿的水杯數量：</div>
              <div className="flex items-center gap-2 flex-wrap min-h-[60px] p-3 bg-blue-50/60 rounded-2xl border-2 border-blue-200 border-dashed">
                {Array.from({ length: potACups }).map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-white border-2 border-blue-400 shadow-sm flex items-center justify-center text-xl animate-bounce-short">
                    🥛
                  </div>
                ))}
              </div>
            </div>

            {/* 乙壺 */}
            <div className="bg-white rounded-3xl p-5 border-3 border-sky-300 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-black text-sky-950 flex items-center gap-2">
                  <span className="text-3xl">🍶</span>
                  <BopomofoText text="乙茶壺（白色）" showBpmf={bopomofoEnabled} />
                </span>
                <div className="flex items-center gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
                  <button
                    onClick={() => {
                      if (potBCups > 1) {
                        soundFx.playPop();
                        setPotBCups(prev => prev - 1);
                      }
                    }}
                    className="w-7 h-7 bg-white text-sky-600 rounded font-black shadow-sm"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-black text-sky-950">{potBCups} 杯</span>
                  <button
                    onClick={() => {
                      if (potBCups < 10) {
                        soundFx.playPop();
                        setPotBCups(prev => prev + 1);
                      }
                    }}
                    className="w-7 h-7 bg-white text-sky-600 rounded font-black shadow-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-xs font-black text-slate-500 mb-2">可倒滿的水杯數量：</div>
              <div className="flex items-center gap-2 flex-wrap min-h-[60px] p-3 bg-sky-50/60 rounded-2xl border-2 border-sky-200 border-dashed">
                {Array.from({ length: potBCups }).map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-white border-2 border-sky-400 shadow-sm flex items-center justify-center text-xl animate-bounce-short">
                    🥛
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 比較結論 */}
          <div className="bg-white rounded-2xl p-4 border-2 border-blue-300 text-center shadow-sm">
            <div className="text-base sm:text-lg font-black text-blue-950">
              <BopomofoText
                text={
                  potACups === potBCups
                    ? `甲壺（${potACups} 杯）與 乙壺（${potBCups} 杯）容量剛好一樣大！`
                    : potACups > potBCups
                    ? `甲壺能裝 ${potACups} 杯，比乙壺的 ${potBCups} 杯多 ${potACups - potBCups} 杯，所以【甲茶壺】容量比較大！`
                    : `乙壺能裝 ${potBCups} 杯，比甲壺的 ${potACups} 杯多 ${potBCups - potACups} 杯，所以【乙茶壺】容量比較大！`
                }
                showBpmf={bopomofoEnabled}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= 模式二：量杯刻度 ================= */}
      {activeTab === 'liter' && (
        <div className="bg-white rounded-3xl p-6 border-3 border-sky-300 shadow-sm flex flex-col items-center gap-4">
          <div className="text-lg font-black text-sky-950">
            <BopomofoText text={`當前量杯水量：${mlValue} 毫升 (ml)`} showBpmf={bopomofoEnabled} />
          </div>

          {/* 刻度量筒視覺 */}
          <div className="w-32 h-64 border-4 border-slate-600 rounded-b-3xl relative bg-slate-50 overflow-hidden flex flex-col justify-end">
            {/* 水位 */}
            <div
              className="bg-gradient-to-t from-blue-500 to-sky-400 transition-all duration-300 w-full"
              style={{ height: `${(mlValue / 1000) * 100}%` }}
            ></div>

            {/* 刻度線 */}
            <div className="absolute inset-0 flex flex-col justify-between p-2 pointer-events-none text-[10px] font-mono font-bold text-slate-700">
              <div className="border-b border-slate-400 text-right pr-1">1000ml (1L)</div>
              <div className="border-b border-slate-300 text-right pr-1">800ml</div>
              <div className="border-b border-slate-300 text-right pr-1">600ml</div>
              <div className="border-b border-slate-300 text-right pr-1">400ml</div>
              <div className="border-b border-slate-300 text-right pr-1">200ml</div>
            </div>
          </div>

          {/* 調整按鈕 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (mlValue > 100) {
                  soundFx.playPop();
                  setMlValue(prev => prev - 100);
                }
              }}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-xl font-black text-sm"
            >
              - 100 ml
            </button>
            <button
              onClick={() => {
                if (mlValue < 1000) {
                  soundFx.playPop();
                  setMlValue(prev => prev + 100);
                }
              }}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-black text-sm shadow"
            >
              + 100 ml
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
