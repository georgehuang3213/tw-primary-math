import React, { useState } from 'react';
import { Sparkles, Layers, RotateCcw, Volume2, CheckCircle2 } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface ShapeLabProps {
  bopomofoEnabled?: boolean;
}

interface ShapeItem {
  id: string;
  name: string;
  category: '2D' | '3D';
  icon: string;
  desc: string;
  sides: string;
  corners: string;
  stampResult: string;
  canRoll: boolean;
  canStack: boolean;
  speechText: string;
}

const SHAPES: ShapeItem[] = [
  {
    id: 'triangle',
    name: '三角形',
    category: '2D',
    icon: '🔺',
    desc: '有 3 條直直的邊和 3 個尖尖的角。',
    sides: '3 條邊',
    corners: '3 個角',
    stampResult: '平面形狀',
    canRoll: false,
    canStack: false,
    speechText: '三角形！有三條邊和三個尖尖的角！'
  },
  {
    id: 'square',
    name: '正方形',
    category: '2D',
    icon: '🟦',
    desc: '有 4 條一樣長的邊和 4 個直直的角（直角）。',
    sides: '4 條等長邊',
    corners: '4 個直角',
    stampResult: '平面形狀',
    canRoll: false,
    canStack: false,
    speechText: '正方形！四條邊一樣長，四個角都是直角！'
  },
  {
    id: 'rectangle',
    name: '長方形',
    category: '2D',
    icon: '🚪',
    desc: '上下邊一樣長、左右邊一樣長，有 4 個直角。',
    sides: '4 條邊（對邊等長）',
    corners: '4 個直角',
    stampResult: '平面形狀',
    canRoll: false,
    canStack: false,
    speechText: '長方形！上下對邊一樣長，四個角也是直角！'
  },
  {
    id: 'circle',
    name: '圓形',
    category: '2D',
    icon: '🟡',
    desc: '由圓圓平滑的曲線圍成，沒有任何尖尖的角。',
    sides: '1 條圓曲線',
    corners: '0 個角',
    stampResult: '平面形狀',
    canRoll: true,
    canStack: false,
    speechText: '圓形！圓圓滑滑的沒有任何角！'
  },
  {
    id: 'cube',
    name: '正方體積木',
    category: '3D',
    icon: '🎲',
    desc: '有 6 個一模一樣大的正方形平平的面，可以穩穩堆高。',
    sides: '12 條邊 / 6 個面',
    corners: '8 個頂點',
    stampResult: '印出【正方形】',
    canRoll: false,
    canStack: true,
    speechText: '正方體積木！六個面都是正方形，拿去蓋印章會印出正方形，可以穩穩堆高！'
  },
  {
    id: 'cylinder',
    name: '圓柱體罐頭',
    category: '3D',
    icon: '🥫',
    desc: '上下有 2 個圓圓平平的面，橫放可以滾動，直立可以堆高！',
    sides: '2 個圓形底面',
    corners: '0 個角',
    stampResult: '印出【圓形】',
    canRoll: true,
    canStack: true,
    speechText: '圓柱體罐頭！上下是平平的圓形底面，橫放可以滾，直立可以堆高！'
  },
  {
    id: 'sphere',
    name: '球體皮球',
    category: '3D',
    icon: '⚽',
    desc: '全身都是圓滾滾的曲面，放在斜坡上滾得最快，不能堆高！',
    sides: '1 個光滑球面',
    corners: '0 個角',
    stampResult: '無法蓋印章',
    canRoll: true,
    canStack: false,
    speechText: '球體皮球！全身圓滾滾，放在斜坡上滾得最快，但沒辦法堆高！'
  }
];

export const ShapeLab: React.FC<ShapeLabProps> = ({ bopomofoEnabled = true }) => {
  const [selectedShape, setSelectedShape] = useState<ShapeItem>(SHAPES[0]);
  const [activeMode, setActiveMode] = useState<'explore' | 'physics'>('explore');
  const [stampedShape, setStampedShape] = useState<string | null>(null);

  const handleSelectShape = (shape: ShapeItem) => {
    soundFx.playPop();
    setSelectedShape(shape);
    setStampedShape(null);
    speechService.speak(shape.speechText);
  };

  const handleStamp = () => {
    soundFx.playCorrect();
    setStampedShape(selectedShape.stampResult);
    speechService.speak(`把${selectedShape.name}放在紙上蓋印章，得到：${selectedShape.stampResult}！`);
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 rounded-3xl border-4 border-indigo-300 shadow-lg">
      {/* 頂部切換模式按鈕 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2.5 rounded-2xl border-2 border-indigo-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveMode('explore');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-black transition flex items-center gap-1.5 ${
              activeMode === 'explore'
                ? 'bg-indigo-500 text-white shadow-md scale-105'
                : 'text-slate-700 hover:bg-indigo-100'
            }`}
          >
            <span>🔺</span>
            <BopomofoText text="形狀與拓印探索" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveMode('physics');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-black transition flex items-center gap-1.5 ${
              activeMode === 'physics'
                ? 'bg-purple-500 text-white shadow-md scale-105'
                : 'text-slate-700 hover:bg-purple-100'
            }`}
          >
            <span>⚽</span>
            <BopomofoText text="滾動與堆疊實驗" showBpmf={bopomofoEnabled} />
          </button>
        </div>

        <button
          onClick={() => {
            soundFx.playPop();
            setSelectedShape(SHAPES[0]);
            setStampedShape(null);
          }}
          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
          title="重設"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* 形狀選擇卡片清單 */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {SHAPES.map(shape => {
          const isSelected = selectedShape.id === shape.id;
          return (
            <button
              key={shape.id}
              onClick={() => handleSelectShape(shape)}
              className={`p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                isSelected
                  ? 'bg-indigo-500 text-white border-indigo-600 shadow-lg scale-105 ring-4 ring-indigo-200 font-black'
                  : 'bg-white hover:bg-indigo-50 text-slate-800 border-indigo-100 shadow-sm'
              }`}
            >
              <span className="text-3xl">{shape.icon}</span>
              <span className="text-xs font-bold truncate max-w-full">
                <BopomofoText text={shape.name} showBpmf={false} />
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= 模式一：形狀與面拓印探索 ================= */}
      {activeMode === 'explore' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 左側：形狀特徵大看板 */}
          <div className="bg-white rounded-3xl p-6 border-3 border-indigo-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-5xl">{selectedShape.icon}</span>
                  <div>
                    <h3 className="text-2xl font-black text-indigo-950">
                      <BopomofoText text={selectedShape.name} showBpmf={bopomofoEnabled} />
                    </h3>
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                      {selectedShape.category === '2D' ? '平面圖形 (2D)' : '立體形體 (3D)'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => speechService.speak(selectedShape.speechText)}
                  className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl border border-indigo-200 transition"
                >
                  <Volume2 size={20} />
                </button>
              </div>

              <p className="text-slate-700 text-base sm:text-lg font-bold mb-5 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <BopomofoText text={selectedShape.desc} showBpmf={bopomofoEnabled} />
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm font-bold">
                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-amber-950">
                  <span className="text-xs text-amber-700 block">邊與面：</span>
                  <BopomofoText text={selectedShape.sides} showBpmf={false} />
                </div>
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-emerald-950">
                  <span className="text-xs text-emerald-700 block">頂點與角：</span>
                  <BopomofoText text={selectedShape.corners} showBpmf={false} />
                </div>
              </div>
            </div>

            {selectedShape.category === '3D' && (
              <button
                onClick={handleStamp}
                className="mt-5 w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-black text-lg rounded-2xl shadow-md transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>🎨 </span>
                <BopomofoText text="用這個積木的面蓋印章！" showBpmf={bopomofoEnabled} />
              </button>
            )}
          </div>

          {/* 右側：拓印紙畫布 */}
          <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 border-3 border-amber-300 shadow-sm flex flex-col items-center justify-center min-h-[220px] text-center relative overflow-hidden">
            <div className="text-xs font-black text-amber-800 mb-2">
              📜 <BopomofoText text="白紙拓印區（用立體積木的面在紙上印圖形）：" showBpmf={bopomofoEnabled} />
            </div>

            {stampedShape ? (
              <div className="flex flex-col items-center gap-2 animate-bounce-short">
                <div className="w-24 h-24 rounded-2xl bg-white border-4 border-rose-400 shadow-lg flex items-center justify-center text-5xl">
                  {selectedShape.id === 'cube' ? '🟦' : selectedShape.id === 'cylinder' ? '🟡' : '❓'}
                </div>
                <div className="text-base font-black text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200">
                  <BopomofoText text={`成功印出：${stampedShape}！`} showBpmf={bopomofoEnabled} />
                </div>
              </div>
            ) : (
              <div className="text-slate-400 font-bold text-sm flex flex-col items-center gap-2">
                <Layers size={36} className="text-slate-300" />
                <span>點擊「蓋印章」按鈕，看看積木的面會印出什麼形狀！</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= 模式二：滾動與堆疊實驗 ================= */}
      {activeMode === 'physics' && (
        <div className="bg-white rounded-3xl p-6 border-3 border-purple-200 shadow-sm flex flex-col gap-4">
          <h4 className="text-lg font-black text-purple-950 flex items-center gap-2">
            <span>🔬</span>
            <BopomofoText text={`【${selectedShape.name}】的滾動與堆疊特性分析：`} showBpmf={bopomofoEnabled} />
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 滾動測試卡 */}
            <div
              className={`p-5 rounded-2xl border-2 flex items-center gap-4 ${
                selectedShape.canRoll
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-slate-50 border-slate-300 text-slate-500'
              }`}
            >
              <span className="text-4xl">{selectedShape.canRoll ? '🎢' : '🛑'}</span>
              <div>
                <span className="text-base font-black block">
                  {selectedShape.canRoll ? '✅ 可以順暢滾動！' : '❌ 不能滾動（會滑動）'}
                </span>
                <span className="text-xs">
                  {selectedShape.canRoll
                    ? '因為它有圓圓光滑的曲面（如球體、圓柱橫倒）。'
                    : '因為它的面是平平的，只會滑動不會滾動。'}
                </span>
              </div>
            </div>

            {/* 堆疊測試卡 */}
            <div
              className={`p-5 rounded-2xl border-2 flex items-center gap-4 ${
                selectedShape.canStack
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-slate-50 border-slate-300 text-slate-500'
              }`}
            >
              <span className="text-4xl">{selectedShape.canStack ? '🧱' : '⚠️'}</span>
              <div>
                <span className="text-base font-black block">
                  {selectedShape.canStack ? '✅ 可以穩穩堆高！' : '❌ 無法穩固堆高'}
                </span>
                <span className="text-xs">
                  {selectedShape.canStack
                    ? '因為有平平的面可以互相疊在一起（如正方體、圓柱直立）。'
                    : '因為表面是圓形或尖角，堆上去會滾落掉下來。'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
