import React, { useState } from 'react';
import { Sparkles, Grid3X3, ArrowRight, Wand2, Check, HelpCircle } from 'lucide-react';
import { soundFx } from '../../services/audio';
import { BopomofoText } from '../BopomofoText';

interface MultiplicationGridProps {
  initialFactor1?: number; // 被乘數
  initialFactor2?: number; // 乘數
  interactive?: boolean;
  bopomofoEnabled?: boolean;
  unitId?: string;
}

type MultTab = 'table99' | 'extrapolate' | 'dotArray';

export const MultiplicationGrid: React.FC<MultiplicationGridProps> = ({
  initialFactor1 = 9,
  initialFactor2 = 7,
  interactive = true,
  bopomofoEnabled,
  unitId
}) => {
  // 若為 g2-u9 (乘法二：3、6、9倍數與前後項)，預設直接進入 'table99' 九九乘法矩陣！
  const defaultTab: MultTab =
    unitId === 'g2-u9-mult-part2' || unitId === 'g2-s2-u3-multiply-applications'
      ? 'table99'
      : 'dotArray';

  const [activeTab, setActiveTab] = useState<MultTab>(defaultTab);

  // ==========================================
  // 分頁 1：九九乘法矩陣表（3、6、9 倍數矩陣高亮）
  // ==========================================
  const [highlightMultiplier, setHighlightMultiplier] = useState<number>(
    unitId === 'g2-u9-mult-part2' ? 9 : 3
  );
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number }>({
    r: unitId === 'g2-u9-mult-part2' ? 9 : 3,
    c: unitId === 'g2-u9-mult-part2' ? 7 : 4
  });

  const handleCellClick = (r: number, c: number) => {
    soundFx.playPop();
    setSelectedCell({ r, c });
  };

  const handleSetHighlight = (m: number) => {
    soundFx.playPop();
    setHighlightMultiplier(m);
    setSelectedCell({ r: m, c: 5 });
  };

  // 前後項推算數據
  const cellR = selectedCell.r; // 被乘數
  const cellC = selectedCell.c; // 乘數
  const currentProduct = cellR * cellC;
  const prevProduct = cellC > 1 ? cellR * (cellC - 1) : null;
  const nextProduct = cellC < 9 ? cellR * (cellC + 1) : null;

  // ==========================================
  // 分頁 2：🧙‍♂️ 魔法前後項推算挑戰
  // ==========================================
  const extrapolateQuestions = [
    {
      id: 'q1',
      title: '魔法陣能量提升：9 的前後項推算',
      story: '小學徒點亮了 7 排魔法陣，共有 9 × 7 ＝ 63 點能量。如果再追加 1 排（變成 8 排），能量會比 63 多幾點？一共是多少點能量？',
      givenExpr: '9 × 7 ＝ 63',
      base: 9,
      targetExpr: '9 × 8',
      diffVal: 9,
      ansVal: 72,
      explanation: '9 × 8 比 9 × 7 多 1 個 9！所以是 63 ＋ 9 ＝ 72 點能量！'
    },
    {
      id: 'q2',
      title: '魔法藥草分組：6 的前後項推算',
      story: '桌上有 6 × 5 ＝ 30 顆魔法種子。如果不小心拿走了 1 排（變成 4 排），會比 30 少幾顆？剩下幾顆？',
      givenExpr: '6 × 5 ＝ 30',
      base: 6,
      targetExpr: '6 × 4',
      diffVal: 6,
      ansVal: 24,
      explanation: '6 × 4 比 6 × 5 少 1 個 6！所以是 30 － 6 ＝ 24 顆！'
    },
    {
      id: 'q3',
      title: '彩色水晶塔：3 的前後項推算',
      story: '水晶塔有 3 × 6 ＝ 18 顆水晶。再往上多疊 1 層（變成 7 層 3 × 7），一共會有幾顆水晶？',
      givenExpr: '3 × 6 ＝ 18',
      base: 3,
      targetExpr: '3 × 7',
      diffVal: 3,
      ansVal: 21,
      explanation: '3 × 7 比 3 × 6 多 1 個 3！18 ＋ 3 ＝ 21 顆水晶！'
    }
  ];

  const [extraQIdx, setExtraQIdx] = useState<number>(0);
  const [extraDiffInput, setExtraDiffInput] = useState<string>('');
  const [extraAnsInput, setExtraAnsInput] = useState<string>('');
  const [extraFeedback, setExtraFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentExtraQ = extrapolateQuestions[extraQIdx];

  const handleCheckExtra = () => {
    const diff = parseInt(extraDiffInput, 10);
    const ans = parseInt(extraAnsInput, 10);

    if (diff === currentExtraQ.diffVal && ans === currentExtraQ.ansVal) {
      soundFx.playCorrect();
      setExtraFeedback({
        isCorrect: true,
        text: `🎉 太厲害了！前後項推算完全正確！${currentExtraQ.explanation}`
      });
    } else {
      soundFx.playWrong();
      setExtraFeedback({
        isCorrect: false,
        text: `💡 再想一想：乘數每多 1，積就增加 1 個「${currentExtraQ.base}」喔！`
      });
    }
  };

  const handleNextExtra = () => {
    soundFx.playPop();
    setExtraQIdx((prev) => (prev + 1) % extrapolateQuestions.length);
    setExtraDiffInput('');
    setExtraAnsInput('');
    setExtraFeedback(null);
  };

  // ==========================================
  // 分頁 3：可愛圖案點陣排列（乘法一的基礎）
  // ==========================================
  const [factor1, setFactor1] = useState(initialFactor1);
  const [factor2, setFactor2] = useState(initialFactor2);
  const [itemEmoji, setItemEmoji] = useState('🍎');

  const total = factor1 * factor2;
  const additionString = Array.from({ length: factor2 })
    .map(() => factor1.toString())
    .join(' + ');

  return (
    <div className="flex flex-col items-center bg-violet-50/70 p-4 sm:p-6 rounded-3xl border-2 border-violet-200 max-w-2xl mx-auto w-full">
      {/* 頂部三合一模式切換按鈕 */}
      <div className="flex items-center justify-between w-full bg-white p-1.5 rounded-2xl border-2 border-violet-200 shadow-sm mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('table99');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              activeTab === 'table99'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-violet-950 hover:bg-violet-50'
            }`}
          >
            <span>🔢</span>
            <BopomofoText text="九九乘法矩陣表" showBpmf={bopomofoEnabled ?? false} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('extrapolate');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              activeTab === 'extrapolate'
                ? 'bg-fuchsia-600 text-white shadow-md'
                : 'text-fuchsia-950 hover:bg-fuchsia-50'
            }`}
          >
            <span>🧙‍♂️</span>
            <BopomofoText text="前後項推算大挑戰" showBpmf={bopomofoEnabled ?? false} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('dotArray');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              activeTab === 'dotArray'
                ? 'bg-amber-500 text-amber-950 shadow-md'
                : 'text-slate-600 hover:bg-amber-100'
            }`}
          >
            <span>🍎</span>
            <BopomofoText text="圖案點陣與連加" showBpmf={bopomofoEnabled ?? false} />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 模式 1：九九乘法矩陣表（3、6、9 倍數陣列與前後項放大鏡） */}
      {/* ========================================================================= */}
      {activeTab === 'table99' && (
        <div className="w-full flex flex-col items-center gap-4">
          {/* 3、6、9 倍數篩選快速按鈕 */}
          <div className="w-full bg-white p-3 rounded-2xl border-2 border-violet-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-black text-violet-950 flex items-center gap-1">
              <Wand2 size={15} className="text-violet-600" />
              <BopomofoText text="快速點選倍數陣列：" showBpmf={bopomofoEnabled ?? false} />
            </span>
            <div className="flex gap-1.5">
              {[3, 6, 9].map((m) => (
                <button
                  key={m}
                  onClick={() => handleSetHighlight(m)}
                  className={`px-3 py-1 text-xs font-black rounded-xl transition flex items-center gap-1 ${
                    highlightMultiplier === m
                      ? 'bg-violet-600 text-white shadow-md scale-105'
                      : 'bg-violet-100 text-violet-900 hover:bg-violet-200'
                  }`}
                >
                  <span>✨</span>
                  <span>{m}</span>
                  <BopomofoText text="的倍數" showBpmf={bopomofoEnabled ?? false} />
                </button>
              ))}
            </div>
          </div>

          {/* 9 × 9 互動乘法矩陣表格 */}
          <div className="w-full bg-white p-3 sm:p-4 rounded-2xl border-2 border-violet-300 shadow-inner overflow-x-auto">
            <div className="min-w-[340px] flex flex-col items-center">
              {/* 表頭橫欄 (乘數 1 ~ 9) */}
              <div className="grid grid-cols-10 gap-1 w-full text-center text-xs font-black mb-1">
                <div className="text-slate-400 font-mono">×</div>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="text-slate-600 font-mono py-0.5">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* 表身 (被乘數 1 ~ 9) */}
              {Array.from({ length: 9 }).map((_, rIdx) => {
                const r = rIdx + 1;
                const isHighlightRow = r === highlightMultiplier;
                return (
                  <div key={r} className="grid grid-cols-10 gap-1 w-full text-center text-xs my-0.5">
                    {/* 左側被乘數頭 */}
                    <div className={`font-mono font-black py-1 rounded flex items-center justify-center ${
                      isHighlightRow ? 'bg-violet-600 text-white shadow-sm' : 'text-slate-600'
                    }`}>
                      {r}
                    </div>

                    {/* 9 個乘積格子 */}
                    {Array.from({ length: 9 }).map((_, cIdx) => {
                      const c = cIdx + 1;
                      const prod = r * c;
                      const isSelected = selectedCell.r === r && selectedCell.c === c;
                      const isTargetRow = r === highlightMultiplier;

                      return (
                        <button
                          key={c}
                          onClick={() => handleCellClick(r, c)}
                          className={`font-mono font-bold py-1.5 rounded-lg transition-all text-xs sm:text-sm ${
                            isSelected
                              ? 'bg-rose-500 text-white shadow-md font-black ring-2 ring-rose-300 scale-105 z-10'
                              : isTargetRow
                              ? 'bg-violet-100 text-violet-950 font-black hover:bg-violet-200'
                              : 'bg-slate-50 text-slate-700 hover:bg-violet-50'
                          }`}
                        >
                          {prod}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 🌟 魔法前後項推算放大鏡卡片 */}
          <div className="w-full bg-gradient-to-r from-violet-100 via-fuchsia-50 to-pink-100 border-2 border-violet-300 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-violet-950 flex items-center gap-1">
                <span>🔍</span>
                <BopomofoText text="前後項推算放大鏡：" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs font-mono font-black text-violet-800 bg-white/80 px-2 py-0.5 rounded-md">
                {cellR} × {cellC} ＝ {currentProduct}
              </span>
            </div>

            {/* 前項、當前項、後項 視覺長條對比 */}
            <div className="grid grid-cols-3 gap-2 text-center my-2">
              {/* 前一項 */}
              <div className="bg-white/80 border border-slate-200 rounded-xl p-2.5 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-500 mb-0.5">
                  <BopomofoText text="前一項" showBpmf={bopomofoEnabled ?? false} />
                </span>
                {prevProduct !== null ? (
                  <>
                    <span className="font-mono font-black text-sm text-slate-700">
                      {cellR} × {cellC - 1} ＝ {prevProduct}
                    </span>
                    <span className="text-[10px] font-bold text-rose-600 mt-1">
                      （少 1 個 {cellR}）
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 my-auto">
                    <BopomofoText text="無前項" showBpmf={bopomofoEnabled ?? false} />
                  </span>
                )}
              </div>

              {/* 當前選中項 */}
              <div className="bg-rose-500 text-white rounded-xl p-2.5 flex flex-col items-center shadow-md scale-102">
                <span className="text-[11px] font-black text-rose-100 mb-0.5">
                  <BopomofoText text="點選目標" showBpmf={bopomofoEnabled ?? false} />
                </span>
                <span className="font-mono font-black text-base sm:text-lg">
                  {cellR} × {cellC} ＝ {currentProduct}
                </span>
                <span className="text-[10px] font-black text-amber-200 mt-1">
                  ★ {cellC} 個 {cellR}
                </span>
              </div>

              {/* 後一項 */}
              <div className="bg-white/80 border border-slate-200 rounded-xl p-2.5 flex flex-col items-center">
                <span className="text-[11px] font-bold text-slate-500 mb-0.5">
                  <BopomofoText text="後一項" showBpmf={bopomofoEnabled ?? false} />
                </span>
                {nextProduct !== null ? (
                  <>
                    <span className="font-mono font-black text-sm text-slate-700">
                      {cellR} × {cellC + 1} ＝ {nextProduct}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 mt-1">
                      （多 1 個 {cellR}）
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-slate-400 my-auto">
                    <BopomofoText text="無後項" showBpmf={bopomofoEnabled ?? false} />
                  </span>
                )}
              </div>
            </div>

            {/* 口訣秘訣 */}
            <div className="bg-white/90 p-2.5 rounded-xl border border-violet-200 text-xs text-violet-950 font-bold text-center mt-1">
              <span>💡 </span>
              <BopomofoText text={`前後項推算規律：乘數多 1，積就增加 1 個「${cellR}」！乘數少 1，積就減少 1 個「${cellR}」！`} showBpmf={bopomofoEnabled ?? false} />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 2：🧙‍♂️ 魔法前後項推算挑戰 */}
      {/* ========================================================================= */}
      {activeTab === 'extrapolate' && (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full bg-fuchsia-50 border-2 border-fuchsia-200 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black px-2.5 py-0.5 bg-fuchsia-600 text-white rounded-full">
                <BopomofoText text={`第 ${extraQIdx + 1} 題 / 共 ${extrapolateQuestions.length} 題`} showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs font-bold text-fuchsia-800 flex items-center gap-1">
                <Wand2 size={14} />
                <BopomofoText text="魔法學徒試煉" showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-fuchsia-950 mb-1">
              <BopomofoText text={currentExtraQ.title} showBpmf={bopomofoEnabled ?? false} />
            </h4>
            <p className="text-xs sm:text-sm font-bold text-slate-700 leading-relaxed">
              <BopomofoText text={currentExtraQ.story} showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          <div className="w-full bg-white p-5 rounded-2xl border-2 border-fuchsia-200 shadow-sm flex flex-col items-center gap-4">
            {/* 已知算式提示 */}
            <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
              <BopomofoText text="已知：" showBpmf={bopomofoEnabled ?? false} />
              <span className="font-mono font-black text-xl text-fuchsia-900 bg-fuchsia-50 px-3 py-1 rounded-xl border border-fuchsia-200">
                {currentExtraQ.givenExpr}
              </span>
            </div>

            {/* 填答區 1：差了幾個被乘數 */}
            <div className="flex items-center gap-2 font-mono text-lg font-black text-slate-800 flex-wrap justify-center">
              <span>{currentExtraQ.targetExpr}</span>
              <span className="text-xs font-sans font-bold text-slate-600">
                <BopomofoText text="比它多或少了" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <input
                type="text"
                maxLength={2}
                value={extraDiffInput}
                onChange={(e) => setExtraDiffInput(e.target.value)}
                placeholder="幾"
                className="w-14 h-11 text-center text-xl font-black bg-fuchsia-50 text-fuchsia-950 rounded-xl border-2 border-fuchsia-400 focus:outline-none focus:ring-4 ring-fuchsia-300/50"
              />
            </div>

            {/* 填答區 2：算出的最終答案 */}
            <div className="flex items-center gap-2 font-mono text-xl sm:text-2xl font-black text-slate-800 flex-wrap justify-center">
              <span>{currentExtraQ.targetExpr}</span>
              <span>＝</span>
              <input
                type="text"
                maxLength={3}
                value={extraAnsInput}
                onChange={(e) => setExtraAnsInput(e.target.value)}
                placeholder="?"
                className="w-16 h-12 text-center text-2xl font-black bg-fuchsia-50 text-fuchsia-950 rounded-xl border-2 border-fuchsia-400 focus:outline-none focus:ring-4 ring-fuchsia-300/50"
              />
            </div>

            <button
              onClick={handleCheckExtra}
              disabled={!extraDiffInput || !extraAnsInput}
              className="w-full py-2.5 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-black rounded-xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              <Check size={16} />
              <BopomofoText text="檢查前後項推算" showBpmf={bopomofoEnabled ?? false} />
            </button>

            {extraFeedback && (
              <div className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-black text-center ${
                extraFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                <BopomofoText text={extraFeedback.text} showBpmf={bopomofoEnabled ?? false} />
              </div>
            )}

            {extraFeedback?.isCorrect && (
              <button
                onClick={handleNextExtra}
                className="w-full py-2 bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-black rounded-xl shadow-md btn-fun flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <BopomofoText text="挑戰下一道魔法試煉" showBpmf={bopomofoEnabled ?? false} /> <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 3：圖案點陣與連加展開 */}
      {/* ========================================================================= */}
      {activeTab === 'dotArray' && (
        <div className="w-full flex flex-col items-center">
          {/* 乘法算式與連加意涵標題 */}
          <div className="flex flex-col items-center gap-2 bg-white p-4 rounded-2xl border-2 border-violet-300 shadow-sm w-full">
            <div className="flex items-center gap-3 text-2xl sm:text-3xl font-black text-violet-900 font-mono">
              <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-xl">{factor1}</span>
              <span className="text-violet-500">×</span>
              <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-xl">{factor2}</span>
              <span className="text-violet-500">=</span>
              <span className="text-rose-600 font-black text-3xl sm:text-4xl">{total}</span>
            </div>

            <div className="text-xs sm:text-sm font-bold text-slate-600 flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-violet-100 w-full">
              <span>
                <BopomofoText text="有 " showBpmf={bopomofoEnabled ?? false} /><strong className="text-violet-700">{factor2}</strong><BopomofoText text=" 排，每排有 " showBpmf={bopomofoEnabled ?? false} /><strong className="text-violet-700">{factor1}</strong><BopomofoText text=" 個" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-slate-400">|</span>
              <span>
                <BopomofoText text="連加：" showBpmf={bopomofoEnabled ?? false} />{additionString} = <strong className="text-rose-600">{total}</strong>
              </span>
            </div>
          </div>

          {/* 矩陣點陣圖視覺化 */}
          <div className="my-4 p-4 bg-white rounded-2xl border-2 border-violet-200 shadow-inner flex flex-col gap-2 items-center min-h-[160px] justify-center overflow-x-auto w-full">
            {Array.from({ length: factor2 }).map((_, rIdx) => (
              <div key={rIdx} className="flex items-center gap-2 bg-violet-50/60 p-2 rounded-xl border border-violet-100">
                <span className="text-[10px] font-bold text-violet-400 w-8 text-right"><BopomofoText text="第" showBpmf={bopomofoEnabled ?? false} />{rIdx + 1}<BopomofoText text="排:" showBpmf={bopomofoEnabled ?? false} /></span>
                <div className="flex gap-2">
                  {Array.from({ length: factor1 }).map((_, cIdx) => (
                    <div
                      key={cIdx}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl shadow-sm border border-violet-200 flex items-center justify-center text-lg sm:text-xl transition transform hover:scale-110"
                    >
                      {itemEmoji}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-bold text-violet-700 ml-1">({factor1}<BopomofoText text="個" showBpmf={bopomofoEnabled ?? false} />)</span>
              </div>
            ))}
          </div>

          {/* 調整控制項 */}
          {interactive && (
            <div className="w-full flex flex-col gap-3 bg-white p-3.5 rounded-2xl border border-violet-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700"><BopomofoText text="選擇被乘數（每排個數）：" showBpmf={bopomofoEnabled ?? false} /></span>
                <div className="flex gap-1">
                  {[2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                      key={num}
                      onClick={() => {
                        soundFx.playPop();
                        setFactor1(num);
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                        factor1 === num
                          ? 'bg-violet-600 text-white shadow'
                          : 'bg-violet-100 text-violet-900 hover:bg-violet-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-700"><BopomofoText text="選擇乘數（排數）：" showBpmf={bopomofoEnabled ?? false} /></span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                      key={num}
                      onClick={() => {
                        soundFx.playPop();
                        setFactor2(num);
                      }}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                        factor2 === num
                          ? 'bg-violet-600 text-white shadow'
                          : 'bg-violet-100 text-violet-900 hover:bg-violet-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500"><BopomofoText text="更換可愛圖案：" showBpmf={bopomofoEnabled ?? false} /></span>
                <div className="flex gap-2">
                  {['🍎', '⭐', '🎈', '🍬', '🚗', '🐱'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => setItemEmoji(emoji)}
                      className={`text-lg p-1 rounded-lg ${itemEmoji === emoji ? 'bg-amber-200 ring-2 ring-amber-400' : 'hover:bg-slate-100'}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
