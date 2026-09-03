import React, { useState } from 'react';
import { Sparkles, Layers, RotateCcw, Volume2, CheckCircle2 } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface ShapeLabProps {
  bopomofoEnabled?: boolean;
  unitId?: string;
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

export const ShapeLab: React.FC<ShapeLabProps> = ({ bopomofoEnabled = true, unitId }) => {
  // 自動判定預設分頁：
  // 若是 一下第五單元 (g1-u14-shapes)，任務是「動手拖曳圖形板拼排造型，並依照圖示堆疊積木城堡！」，直接預設 'tangram'！
  // 若是一上第五單元 (g1-u5-shapes)，任務是形狀拓印與滾動堆疊，則預設 'explore'
  const initialMode = unitId === 'g1-u14-shapes' ? 'tangram' : 'explore';
  const [activeMode, setActiveMode] = useState<'tangram' | 'build3d' | 'explore' | 'physics'>(initialMode);

  // 圖形板拼排造型狀態 (小船、火箭、大正方形、小房子)
  const [selectedTangramTarget, setSelectedTangramTarget] = useState<'square' | 'rocket' | 'boat' | 'house'>('square');
  const [placedPieces, setPlacedPieces] = useState<string[]>([]); // 已拼上的圖形板 id

  // 3D積木城堡堆疊狀態 (底層3個、中層2個、頂層1個，共6個積木)
  const [blocksLevel1, setBlocksLevel1] = useState<number>(3); // 底層 3 個
  const [blocksLevel2, setBlocksLevel2] = useState<number>(2); // 中層 2 個
  const [blocksLevel3, setBlocksLevel3] = useState<number>(1); // 頂層 1 個

  const totalCastleBlocks = blocksLevel1 + blocksLevel2 + blocksLevel3;

  // 原有模式狀態
  const [selectedShape, setSelectedShape] = useState<ShapeItem>(SHAPES[0]);
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
      <div className="flex items-center justify-between flex-wrap gap-2 bg-white p-2 rounded-2xl border-2 border-indigo-200 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveMode('tangram');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeMode === 'tangram'
                ? 'bg-amber-500 text-amber-950 shadow-md'
                : 'text-slate-700 hover:bg-amber-50'
            }`}
          >
            <span>🧩</span>
            <BopomofoText text="圖形板拼排造型" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveMode('build3d');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeMode === 'build3d'
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-slate-700 hover:bg-blue-50'
            }`}
          >
            <span>🏰</span>
            <BopomofoText text="3D積木城堡堆疊" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveMode('explore');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeMode === 'explore'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-700 hover:bg-indigo-50'
            }`}
          >
            <span>🔺</span>
            <BopomofoText text="形狀與拓印" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveMode('physics');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeMode === 'physics'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-slate-700 hover:bg-purple-50'
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
            setPlacedPieces([]);
            setBlocksLevel1(3);
            setBlocksLevel2(2);
            setBlocksLevel3(1);
          }}
          className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
          title="重設"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* ================= 模式一：圖形板拼排指定造型（一下第五單元核心任務） ================= */}
      {activeMode === 'tangram' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-sm flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-sm font-black text-amber-950 flex items-center gap-1.5">
              <span>🎪</span>
              <span>選擇你想用圖形板拼成的造型：</span>
            </span>

            {/* 目標造型切換 */}
            <div className="flex gap-1.5">
              {[
                { id: 'square', name: '大正方形 (2個三角形)', icon: '🟩' },
                { id: 'rocket', name: '太空火箭', icon: '🚀' },
                { id: 'boat', name: '幾何小船', icon: '⛵' },
                { id: 'house', name: '積木小屋', icon: '🏠' }
              ].map(target => (
                <button
                  key={target.id}
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedTangramTarget(target.id as any);
                    setPlacedPieces([]);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition flex items-center gap-1 ${
                    selectedTangramTarget === target.id
                      ? 'bg-amber-500 text-amber-950 shadow'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  <span>{target.icon}</span>
                  <span>{target.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 拼圖操作展示區 */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 flex flex-col items-center gap-3">
            <div className="text-xs font-bold text-slate-600">
              💡 幾何秘訣：{
                selectedTangramTarget === 'square'
                  ? '用 2 個相同的直角三角形，斜邊貼合在一起，可以神奇拼成 1 個正方形！'
                  : selectedTangramTarget === 'rocket'
                  ? '三角形當火箭頭，長方形當火箭身，正方形當推進器！'
                  : selectedTangramTarget === 'boat'
                  ? '長方形當船身，三角形當風帆，順風航行！'
                  : '三角形當屋頂，正方形當房子主體！'
              }
            </div>

            {/* 拼板畫布 */}
            <div className="w-full max-w-md h-52 bg-white rounded-2xl border-2 border-dashed border-amber-400 flex items-center justify-center p-4 relative shadow-inner">
              {/* 大正方形目標 */}
              {selectedTangramTarget === 'square' && (
                <div className="flex items-center gap-1">
                  <div className={`w-28 h-28 border-2 border-indigo-400 rounded-lg flex items-center justify-center font-black text-xs transition-all ${
                    placedPieces.includes('tri1') && placedPieces.includes('tri2')
                      ? 'bg-gradient-to-tr from-amber-400 to-rose-400 text-white shadow-lg'
                      : 'bg-indigo-50/50 text-indigo-700'
                  }`}>
                    {placedPieces.includes('tri1') && placedPieces.includes('tri2') ? (
                      <span className="text-sm font-black">🎉 成功拼成大正方形！</span>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span>正方形輪廓</span>
                        <span className="text-[10px] text-slate-400">點下方 2 個三角形拼入</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 太空火箭目標 */}
              {selectedTangramTarget === 'rocket' && (
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-14 h-12 border-2 border-rose-400 rounded flex items-center justify-center text-xs font-black ${
                    placedPieces.includes('head') ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-400'
                  }`}>
                    {placedPieces.includes('head') ? '🔺 火箭頭' : '三角形'}
                  </div>
                  <div className={`w-14 h-20 border-2 border-sky-400 rounded flex items-center justify-center text-xs font-black ${
                    placedPieces.includes('body') ? 'bg-sky-500 text-white' : 'bg-sky-50 text-sky-400'
                  }`}>
                    {placedPieces.includes('body') ? '🚪 機身' : '長方形'}
                  </div>
                  <div className={`w-16 h-8 border-2 border-amber-400 rounded flex items-center justify-center text-xs font-black ${
                    placedPieces.includes('tail') ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-400'
                  }`}>
                    {placedPieces.includes('tail') ? '🟦 推進器' : '正方形'}
                  </div>
                </div>
              )}

              {/* 幾何小船目標 */}
              {selectedTangramTarget === 'boat' && (
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-16 h-16 border-2 border-teal-400 rounded flex items-center justify-center text-xs font-black ${
                    placedPieces.includes('sail') ? 'bg-teal-500 text-white' : 'bg-teal-50 text-teal-400'
                  }`}>
                    {placedPieces.includes('sail') ? '🔺 風帆' : '三角形'}
                  </div>
                  <div className={`w-36 h-12 border-2 border-blue-400 rounded-b-xl flex items-center justify-center text-xs font-black ${
                    placedPieces.includes('hull') ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-400'
                  }`}>
                    {placedPieces.includes('hull') ? '⛵ 船身' : '長方形'}
                  </div>
                </div>
              )}

              {/* 積木小屋目標 */}
              {selectedTangramTarget === 'house' && (
                <div className="flex flex-col items-center">
                  <div className={`w-28 h-16 border-2 border-rose-400 rounded-t flex items-center justify-center text-xs font-black ${
                    placedPieces.includes('roof') ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-400'
                  }`}>
                    {placedPieces.includes('roof') ? '🔺 屋頂' : '三角形屋頂'}
                  </div>
                  <div className={`w-24 h-24 border-2 border-amber-400 rounded-b flex items-center justify-center text-xs font-black ${
                    placedPieces.includes('base') ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-400'
                  }`}>
                    {placedPieces.includes('base') ? '🏠 房子主體' : '正方形底座'}
                  </div>
                </div>
              )}
            </div>

            {/* 圖形板零組件庫 */}
            <div className="flex items-center gap-2 flex-wrap justify-center pt-2">
              <span className="text-xs font-bold text-slate-500">點擊零組件放入或取下：</span>
              {selectedTangramTarget === 'square' && (
                <>
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      setPlacedPieces(p => p.includes('tri1') ? p.filter(x => x !== 'tri1') : [...p, 'tri1']);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                      placedPieces.includes('tri1') ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-300'
                    }`}
                  >
                    🔺 第一個直角三角形
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      setPlacedPieces(p => p.includes('tri2') ? p.filter(x => x !== 'tri2') : [...p, 'tri2']);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                      placedPieces.includes('tri2') ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-300'
                    }`}
                  >
                    🔺 第二個直角三角形
                  </button>
                </>
              )}

              {selectedTangramTarget === 'rocket' && (
                <>
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      setPlacedPieces(p => p.includes('head') ? p.filter(x => x !== 'head') : [...p, 'head']);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                      placedPieces.includes('head') ? 'bg-rose-600 text-white' : 'bg-white border border-rose-300'
                    }`}
                  >
                    🔺 三角形（頭部）
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      setPlacedPieces(p => p.includes('body') ? p.filter(x => x !== 'body') : [...p, 'body']);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                      placedPieces.includes('body') ? 'bg-sky-600 text-white' : 'bg-white border border-sky-300'
                    }`}
                  >
                    🚪 長方形（機身）
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      setPlacedPieces(p => p.includes('tail') ? p.filter(x => x !== 'tail') : [...p, 'tail']);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                      placedPieces.includes('tail') ? 'bg-amber-600 text-white' : 'bg-white border border-amber-300'
                    }`}
                  >
                    🟦 正方形（底翼）
                  </button>
                </>
              )}

              {selectedTangramTarget === 'boat' && (
                <>
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      setPlacedPieces(p => p.includes('sail') ? p.filter(x => x !== 'sail') : [...p, 'sail']);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                      placedPieces.includes('sail') ? 'bg-teal-600 text-white' : 'bg-white border border-teal-300'
                    }`}
                  >
                    🔺 三角形風帆
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      setPlacedPieces(p => p.includes('hull') ? p.filter(x => x !== 'hull') : [...p, 'hull']);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                      placedPieces.includes('hull') ? 'bg-blue-600 text-white' : 'bg-white border border-blue-300'
                    }`}
                  >
                    ⛵ 長方形船身
                  </button>
                </>
              )}

              {selectedTangramTarget === 'house' && (
                <>
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      setPlacedPieces(p => p.includes('roof') ? p.filter(x => x !== 'roof') : [...p, 'roof']);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                      placedPieces.includes('roof') ? 'bg-rose-600 text-white' : 'bg-white border border-rose-300'
                    }`}
                  >
                    🔺 三角形屋頂
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      setPlacedPieces(p => p.includes('base') ? p.filter(x => x !== 'base') : [...p, 'base']);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                      placedPieces.includes('base') ? 'bg-amber-600 text-white' : 'bg-white border border-amber-300'
                    }`}
                  >
                    🏠 正方形基座
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= 模式二：3D積木城堡堆疊（一下第五單元第二核心任務） ================= */}
      {activeMode === 'build3d' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-blue-300 shadow-sm flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-sm font-black text-blue-950 flex items-center gap-1.5">
              <span>🏰</span>
              <span>看著圖示藍圖，一層一層用積木堆疊出立體城堡！</span>
            </span>
            <span className="text-xs font-bold text-slate-500">
              目前共使用了：<strong className="text-blue-600 font-mono text-sm">{totalCastleBlocks}</strong> 塊正方體積木
            </span>
          </div>

          {/* 城堡 3D 堆疊立體視覺層 */}
          <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 flex flex-col items-center gap-2">
            {/* 頂層 (第3層) */}
            <div className="flex items-center justify-center gap-1.5 min-h-[44px]">
              {Array.from({ length: blocksLevel3 }).map((_, i) => (
                <div key={i} className="w-11 h-11 bg-rose-500 border-2 border-rose-700 rounded-lg text-white font-black text-xs flex items-center justify-center shadow-md animate-bounce-short">
                  頂層
                </div>
              ))}
              {blocksLevel3 === 0 && <span className="text-xs text-slate-400 font-bold">頂層空</span>}
            </div>

            {/* 中層 (第2層) */}
            <div className="flex items-center justify-center gap-1.5 min-h-[44px]">
              {Array.from({ length: blocksLevel2 }).map((_, i) => (
                <div key={i} className="w-11 h-11 bg-sky-500 border-2 border-sky-700 rounded-lg text-white font-black text-xs flex items-center justify-center shadow-md">
                  中層
                </div>
              ))}
              {blocksLevel2 === 0 && <span className="text-xs text-slate-400 font-bold">中層空</span>}
            </div>

            {/* 底層 (第1層) */}
            <div className="flex items-center justify-center gap-1.5 min-h-[44px]">
              {Array.from({ length: blocksLevel1 }).map((_, i) => (
                <div key={i} className="w-11 h-11 bg-indigo-600 border-2 border-indigo-800 rounded-lg text-white font-black text-xs flex items-center justify-center shadow-md">
                  底層
                </div>
              ))}
            </div>

            <div className="w-48 h-2 bg-slate-300 rounded-full mt-1"></div>
            <span className="text-[10px] text-slate-400 font-bold">地面支撐線</span>
          </div>

          {/* 每層積木增減控制 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-rose-50 p-3 rounded-xl border border-rose-200 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800">頂層積木：</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBlocksLevel3(p => Math.max(0, p - 1))}
                  className="w-6 h-6 bg-white border border-rose-300 rounded text-xs font-black"
                >
                  -
                </button>
                <span className="font-mono font-black text-rose-700 text-sm w-5 text-center">{blocksLevel3}</span>
                <button
                  onClick={() => setBlocksLevel3(p => Math.min(blocksLevel2, p + 1))}
                  className="w-6 h-6 bg-rose-500 text-white rounded text-xs font-black"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-sky-50 p-3 rounded-xl border border-sky-200 flex items-center justify-between">
              <span className="text-xs font-bold text-sky-800">中層積木：</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setBlocksLevel2(p => {
                      const next = Math.max(0, p - 1);
                      if (blocksLevel3 > next) setBlocksLevel3(next);
                      return next;
                    });
                  }}
                  className="w-6 h-6 bg-white border border-sky-300 rounded text-xs font-black"
                >
                  -
                </button>
                <span className="font-mono font-black text-sky-700 text-sm w-5 text-center">{blocksLevel2}</span>
                <button
                  onClick={() => setBlocksLevel2(p => Math.min(blocksLevel1, p + 1))}
                  className="w-6 h-6 bg-sky-500 text-white rounded text-xs font-black"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-800">底層積木：</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setBlocksLevel1(p => {
                      const next = Math.max(1, p - 1);
                      if (blocksLevel2 > next) setBlocksLevel2(next);
                      if (blocksLevel3 > next) setBlocksLevel3(next);
                      return next;
                    });
                  }}
                  className="w-6 h-6 bg-white border border-indigo-300 rounded text-xs font-black"
                >
                  -
                </button>
                <span className="font-mono font-black text-indigo-700 text-sm w-5 text-center">{blocksLevel1}</span>
                <button
                  onClick={() => setBlocksLevel1(p => Math.min(5, p + 1))}
                  className="w-6 h-6 bg-indigo-600 text-white rounded text-xs font-black"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-100/70 p-3 rounded-xl border border-blue-200 text-center text-xs font-black text-blue-950">
            💡 堆疊算式：底層 {blocksLevel1} ＋ 中層 {blocksLevel2} ＋ 頂層 {blocksLevel3} ＝ 一共用了 <span className="text-blue-700 text-sm font-mono">{totalCastleBlocks}</span> 塊正方體積木！
          </div>
        </div>
      )}

      {/* 形狀選擇卡片清單（只在探索或實驗模式呈現） */}
      {(activeMode === 'explore' || activeMode === 'physics') && (
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
      )}

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
