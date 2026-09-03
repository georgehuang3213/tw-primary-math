import React, { useState } from 'react';
import { Ruler, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface UnitLengthLabProps {
  bopomofoEnabled?: boolean;
  unitId?: string;
}

export const UnitLengthLab: React.FC<UnitLengthLabProps> = ({ bopomofoEnabled = true, unitId }) => {
  // 4 大模式：'rope'（中介物繩子間接比較）、'combine'（長度合成與分解）、'units'（個別單位實測）、'compare'（起點端對齊）
  // 一上第二單元 (g1-u2-length-compare)：比長短，預設直接進入 'compare' 起點基準線對齊！
  // 一下第二單元 (g1-u11-length)：中介物測量與長度合成分解，預設進入 'rope'！
  const defaultTab = unitId === 'g1-u2-length-compare' ? 'compare' : 'rope';
  const [activeTab, setActiveTab] = useState<'rope' | 'combine' | 'units' | 'compare'>(defaultTab);

  // 中介物繩子模式
  const [ropeLength, setRopeLength] = useState<number>(6); // 繩子長度（格）
  const [tableLength] = useState<number>(8); // 書桌長度 8 格
  const [deskLength] = useState<number>(5);  // 講桌長度 5 格

  // 長度合成與分解模式（彩帶接龍與剪短）
  const [ribbonRed, setRibbonRed] = useState<number>(4);  // 紅彩帶長度（4個積木長）
  const [ribbonBlue, setRibbonBlue] = useState<number>(3); // 藍彩帶長度（3個積木長）
  const [ribbonCut, setRibbonCut] = useState<number>(2);  // 剪掉的長度（2個積木長）
  const [combineMode, setCombineMode] = useState<'add' | 'sub'>('add'); // 合成(加) 或 分解(減)

  // 個別單位測量模式
  const [pencilLength, setPencilLength] = useState<number>(7); // 7 個方格長
  const [crayonLength, setCrayonLength] = useState<number>(4); // 4 個方格長
  const [unitType, setUnitType] = useState<'clip' | 'block' | 'eraser'>('block');

  const unitIcons = {
    clip: { name: '迴紋針', icon: '📎' },
    block: { name: '積木單位', icon: '🟧' },
    eraser: { name: '橡皮擦', icon: '🧼' }
  };

  const handleSpeak = () => {
    soundFx.playCorrect();
    if (activeTab === 'rope') {
      const text = `中介物繩子測量：書桌長度是 8 格，講桌長度是 5 格，因為 8 大於 5，所以書桌比講桌長！`;
      speechService.speak(text);
    } else if (activeTab === 'combine') {
      if (combineMode === 'add') {
        const text = `長度合成：紅彩帶長 ${ribbonRed} 個積木，藍彩帶長 ${ribbonBlue} 個積木，接在一起長 ${ribbonRed + ribbonBlue} 個積木長！算式記作：${ribbonRed} 加 ${ribbonBlue} 等於 ${ribbonRed + ribbonBlue}！`;
        speechService.speak(text);
      } else {
        const totalLen = ribbonRed + ribbonBlue;
        const text = `長度分解：原本彩帶長 ${totalLen} 個積木，剪掉 ${ribbonCut} 個積木，還剩下 ${totalLen - ribbonCut} 個積木長！算式記作：${totalLen} 減 ${ribbonCut} 等於 ${totalLen - ribbonCut}！`;
        speechService.speak(text);
      }
    } else if (activeTab === 'compare') {
      let text = `兩支筆的一端都對齊左邊基準線：紅色鉛筆長 ${pencilLength} 格，黃色蠟筆長 ${crayonLength} 格，`;
      text += pencilLength > crayonLength ? `紅色鉛筆伸得比較長，所以紅色鉛筆比較長！` : `黃色蠟筆比較長！`;
      speechService.speak(text);
    } else {
      const u = unitIcons[unitType];
      const text = `用${u.name}緊密排在一起測量：鉛筆剛好排了 ${pencilLength} 個${u.name}長！`;
      speechService.speak(text);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 p-4 sm:p-6 bg-gradient-to-b from-amber-50 to-teal-50 rounded-3xl border-4 border-teal-300 shadow-lg max-w-3xl mx-auto w-full">
      {/* 頂部切換列（支援任務要求的：中介物繩子、長度合成分解、個別單位實測、端點對齊） */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-white p-2 rounded-2xl border-2 border-teal-200 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('rope');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeTab === 'rope'
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-slate-700 hover:bg-teal-50'
            }`}
          >
            <span>🪢</span>
            <BopomofoText text="中介物繩子間接比較" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('combine');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeTab === 'combine'
                ? 'bg-amber-500 text-amber-950 shadow-md'
                : 'text-slate-700 hover:bg-amber-50'
            }`}
          >
            <span>🧩</span>
            <BopomofoText text="積木長度合成與分解" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('units');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeTab === 'units'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-700 hover:bg-sky-50'
            }`}
          >
            <span>🟧</span>
            <BopomofoText text="個別單位實測" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('compare');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeTab === 'compare'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-700 hover:bg-rose-50'
            }`}
          >
            <span>📏</span>
            <BopomofoText text="起點端對齊" showBpmf={bopomofoEnabled} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-100 hover:bg-teal-200 text-teal-900 rounded-xl text-xs font-black border border-teal-300 transition"
          >
            <Volume2 size={15} />
            <BopomofoText text="朗讀說明" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setRopeLength(6);
              setRibbonRed(4);
              setRibbonBlue(3);
              setRibbonCut(2);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
            title="重設"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* ================= 模式一：中介物繩子間接比較（任務第一核心） ================= */}
      {activeTab === 'rope' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-teal-300 shadow-sm flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-sm font-black text-teal-950 flex items-center gap-1.5">
              <span>🪢</span>
              <span><BopomofoText text="中介物間接測量：黑板或書桌搬不動時，用「繩子標記」來比長短！" showBpmf={bopomofoEnabled ?? false} /></span>
            </span>
          </div>

          {/* 測量對象一：書桌 */}
          <div className="bg-teal-50/70 p-3.5 rounded-2xl border border-teal-200 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1">🪑 <strong><BopomofoText text="書桌長度" showBpmf={bopomofoEnabled ?? false} /></strong>：</span>
              <span className="text-teal-700 font-black">{tableLength} <BopomofoText text="個方格長" showBpmf={bopomofoEnabled ?? false} /></span>
            </div>
            <div className="relative w-full h-8 bg-amber-700/80 rounded-xl flex items-center px-2 text-white text-xs font-bold shadow-inner">
              <BopomofoText text="書桌（搬不動）" showBpmf={bopomofoEnabled ?? false} />
            </div>
            {/* 繩子測量投影 */}
            <div className="flex items-center gap-1 text-xs font-bold text-teal-800 pt-1">
              <span>繩子貼合書桌做記號：</span>
              <div
                className="h-3 bg-teal-500 rounded-full border border-teal-700 shadow flex items-center justify-end pr-1 transition-all"
                style={{ width: `${(tableLength / 10) * 100}%` }}
              >
                <span className="text-[9px] text-white font-black">記號(8)</span>
              </div>
            </div>
          </div>

          {/* 測量對象二：講桌 */}
          <div className="bg-cyan-50/70 p-3.5 rounded-2xl border border-cyan-200 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1">🏫 <strong><BopomofoText text="講桌長度" showBpmf={bopomofoEnabled ?? false} /></strong>：</span>
              <span className="text-cyan-700 font-black">{deskLength} <BopomofoText text="個方格長" showBpmf={bopomofoEnabled ?? false} /></span>
            </div>
            <div
              className="relative h-8 bg-orange-600/80 rounded-xl flex items-center px-2 text-white text-xs font-bold shadow-inner transition-all"
              style={{ width: `${(deskLength / 10) * 100}%` }}
            >
              <BopomofoText text="講桌（搬不動）" showBpmf={bopomofoEnabled ?? false} />
            </div>
            {/* 繩子測量投影 */}
            <div className="flex items-center gap-1 text-xs font-bold text-cyan-800 pt-1">
              <span>拿同一條繩子去比講桌：</span>
              <div
                className="h-3 bg-teal-500 rounded-full border border-teal-700 shadow flex items-center justify-end pr-1 transition-all"
                style={{ width: `${(deskLength / 10) * 100}%` }}
              >
                <span className="text-[9px] text-white font-black">記號(5)</span>
              </div>
            </div>
          </div>

          {/* 結論解析 */}
          <div className="bg-teal-100/70 p-3.5 rounded-2xl border border-teal-300 text-center font-black text-sm text-teal-950">
            💡 <strong>間接比較結論</strong>：繩子量書桌佔了 8 格長，量講桌只有 5 格長。因為 8 比 5 多，所以【書桌】比【講桌】長！
          </div>
        </div>
      )}

      {/* ================= 模式二：積木長度合成與分解（任務第二核心） ================= */}
      {activeTab === 'combine' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-sm flex flex-col gap-4 animate-fade-in">
          {/* 合成/分解切換 */}
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="text-sm font-black text-amber-950 flex items-center gap-1.5">
              <span>🧩</span>
              <span><BopomofoText text="彩帶接龍與長度合成分解：" showBpmf={bopomofoEnabled ?? false} /></span>
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setCombineMode('add');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                  combineMode === 'add'
                    ? 'bg-amber-500 text-amber-950 shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BopomofoText text="➕ 長度合成（兩條接起來）" showBpmf={bopomofoEnabled ?? false} />
              </button>
              <button
                onClick={() => {
                  soundFx.playPop();
                  setCombineMode('sub');
                }}
                className={`px-3 py-1 rounded-xl text-xs font-black transition ${
                  combineMode === 'sub'
                    ? 'bg-rose-500 text-white shadow'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BopomofoText text="✂️ 長度分解（剪掉變短）" showBpmf={bopomofoEnabled ?? false} />
              </button>
            </div>
          </div>

          {/* 模式 A：長度合成 */}
          {combineMode === 'add' && (
            <div className="flex flex-col gap-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span><BopomofoText text="紅彩帶長：" showBpmf={bopomofoEnabled ?? false} /><strong className="text-rose-600 font-mono text-sm">{ribbonRed}</strong> <BopomofoText text="個積木" showBpmf={bopomofoEnabled ?? false} /></span>
                <div className="flex gap-1 items-center">
                  <button
                    onClick={() => setRibbonRed(p => Math.max(1, p - 1))}
                    className="w-6 h-6 bg-white border border-slate-300 rounded font-black text-xs"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setRibbonRed(p => Math.min(6, p + 1))}
                    className="w-6 h-6 bg-rose-500 text-white rounded font-black text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 紅彩帶積木排排看 */}
              <div className="flex items-center gap-1">
                {Array.from({ length: ribbonRed }).map((_, i) => (
                  <div key={i} className="w-9 h-9 rounded-lg bg-rose-500 border border-rose-700 text-white flex items-center justify-center text-xs font-black shadow-sm">
                    {i + 1}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-2 border-t border-amber-200">
                <span><BopomofoText text="藍彩帶長：" showBpmf={bopomofoEnabled ?? false} /><strong className="text-sky-600 font-mono text-sm">{ribbonBlue}</strong> <BopomofoText text="個積木" showBpmf={bopomofoEnabled ?? false} /></span>
                <div className="flex gap-1 items-center">
                  <button
                    onClick={() => setRibbonBlue(p => Math.max(1, p - 1))}
                    className="w-6 h-6 bg-white border border-slate-300 rounded font-black text-xs"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setRibbonBlue(p => Math.min(6, p + 1))}
                    className="w-6 h-6 bg-sky-500 text-white rounded font-black text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 藍彩帶積木排排看 */}
              <div className="flex items-center gap-1">
                {Array.from({ length: ribbonBlue }).map((_, i) => (
                  <div key={i} className="w-9 h-9 rounded-lg bg-sky-500 border border-sky-700 text-white flex items-center justify-center text-xs font-black shadow-sm">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* 兩條接在一起 */}
              <div className="pt-2 border-t border-dashed border-amber-300">
                <span className="text-xs font-black text-amber-950">兩條緊密接龍接在一起：</span>
                <div className="flex items-center gap-1 mt-1 p-2 bg-white rounded-xl border border-amber-300 shadow-inner flex-wrap">
                  {Array.from({ length: ribbonRed }).map((_, i) => (
                    <div key={`r-${i}`} className="w-8 h-8 rounded bg-rose-500 text-white flex items-center justify-center text-xs font-black">
                      紅
                    </div>
                  ))}
                  {Array.from({ length: ribbonBlue }).map((_, i) => (
                    <div key={`b-${i}`} className="w-8 h-8 rounded bg-sky-500 text-white flex items-center justify-center text-xs font-black">
                      藍
                    </div>
                  ))}
                </div>
              </div>

              {/* 算式卡片 */}
              <div className="bg-white p-3 rounded-xl border-2 border-amber-300 text-center font-black text-sm text-slate-800">
                💡 長度合成算式：<span className="text-rose-600 font-mono text-base">{ribbonRed}</span> ＋ <span className="text-sky-600 font-mono text-base">{ribbonBlue}</span> ＝ <span className="text-amber-600 font-mono text-lg">{ribbonRed + ribbonBlue}</span> 個積木長！
              </div>
            </div>
          )}

          {/* 模式 B：長度分解 */}
          {combineMode === 'sub' && (
            <div className="flex flex-col gap-3 bg-rose-50/70 p-4 rounded-2xl border border-rose-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>原本總長度：<strong className="text-purple-700 font-mono text-sm">{ribbonRed + ribbonBlue}</strong> 個積木長</span>
                <span className="text-xs text-slate-500">準備拿剪刀剪短</span>
              </div>

              {/* 剪掉控制 */}
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-rose-200">
                <span className="text-xs font-bold text-rose-800">剪掉多少長度：</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRibbonCut(p => Math.max(1, p - 1))}
                    className="w-6 h-6 bg-slate-100 hover:bg-slate-200 rounded font-black text-xs"
                  >
                    -
                  </button>
                  <span className="font-black text-rose-600 font-mono text-sm w-6 text-center">{ribbonCut}</span>
                  <button
                    onClick={() => setRibbonCut(p => Math.min(ribbonRed + ribbonBlue - 1, p + 1))}
                    className="w-6 h-6 bg-rose-500 text-white rounded font-black text-xs"
                  >
                    +
                  </button>
                  <span className="text-xs font-bold text-slate-500">個積木</span>
                </div>
              </div>

              {/* 剪彩帶視覺呈現 */}
              <div className="flex items-center gap-1 p-2 bg-white rounded-xl border border-rose-300 flex-wrap">
                {Array.from({ length: ribbonRed + ribbonBlue }).map((_, i) => {
                  const isCut = i >= ribbonRed + ribbonBlue - ribbonCut;
                  return (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded flex items-center justify-center text-xs font-black transition-all ${
                        isCut
                          ? 'bg-slate-200 border-2 border-dashed border-rose-400 text-rose-400 line-through'
                          : 'bg-purple-600 text-white shadow-sm'
                      }`}
                    >
                      {isCut ? '✂️' : i + 1}
                    </div>
                  );
                })}
              </div>

              {/* 分解算式卡片 */}
              <div className="bg-white p-3 rounded-xl border-2 border-rose-300 text-center font-black text-sm text-slate-800">
                💡 長度分解算式：<span className="text-purple-600 font-mono text-base">{ribbonRed + ribbonBlue}</span> － <span className="text-rose-600 font-mono text-base">{ribbonCut}</span> ＝ <span className="text-emerald-600 font-mono text-lg">{ribbonRed + ribbonBlue - ribbonCut}</span> 個積木長！
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 模式三：個別單位測量 ================= */}
      {activeTab === 'units' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-yellow-300 shadow-sm flex flex-col gap-4 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-black text-slate-600"><BopomofoText text="選擇測量用的個別單位：" showBpmf={bopomofoEnabled ?? false} /></span>
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
              <BopomofoText text="用【" showBpmf={bopomofoEnabled ?? false} />{unitIcons[unitType].name}<BopomofoText text="】緊密排列測量（不留空隙、不重疊）：" showBpmf={bopomofoEnabled ?? false} />
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

      {/* ================= 模式四：起點端對齊比長短 ================= */}
      {activeTab === 'compare' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-sm flex flex-col gap-5 animate-fade-in">
          <div className="text-xs font-black text-amber-900">
            🚩 <BopomofoText text="比長短第一步：先把左邊起點端對齊紅色基準線！" showBpmf={bopomofoEnabled} />
          </div>

          <div className="relative pl-6 border-l-4 border-rose-500 flex flex-col gap-5 py-2">
            <span className="absolute -left-3 top-0 bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
              <BopomofoText text="起點基準線" showBpmf={bopomofoEnabled ?? false} />
            </span>

            {/* 鉛筆 */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600 w-16"><BopomofoText text="鉛筆(紅)：" showBpmf={bopomofoEnabled ?? false} /></span>
              <div
                className="h-8 bg-rose-500 rounded-r-xl shadow flex items-center justify-end pr-2 text-white font-black text-xs transition-all"
                style={{ width: `${(pencilLength / 10) * 80}%` }}
              >
                {pencilLength} 格長
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
              <span className="text-xs font-bold text-slate-600 w-16"><BopomofoText text="蠟筆(黃)：" showBpmf={bopomofoEnabled ?? false} /></span>
              <div
                className="h-8 bg-amber-400 rounded-r-xl shadow flex items-center justify-end pr-2 text-amber-950 font-black text-xs transition-all"
                style={{ width: `${(crayonLength / 10) * 80}%` }}
              >
                {crayonLength} 格長
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
    </div>
  );
};
