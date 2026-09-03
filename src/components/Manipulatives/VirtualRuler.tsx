import React, { useState } from 'react';
import { Ruler, MoveHorizontal, Check, ArrowRight, Sparkles, Scissors, PlusCircle } from 'lucide-react';
import { soundFx } from '../../services/audio';
import { BopomofoText } from '../BopomofoText';

interface VirtualRulerProps {
  interactive?: boolean;
  bopomofoEnabled?: boolean;
}

type RulerTab = 'alignZero' | 'brokenRuler' | 'addSubtract';

export const VirtualRuler: React.FC<VirtualRulerProps> = ({ interactive = true, bopomofoEnabled }) => {
  const [activeTab, setActiveTab] = useState<RulerTab>('alignZero');

  // ==========================================
  // 分頁 1：刻度 0 對齊實測
  // ==========================================
  const [rulerOffset, setRulerOffset] = useState<number>(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  const alignZeroItems = [
    { icon: '✏️', name: '削好的鉛筆', lengthCm: 12, startCm: 0, color: 'bg-amber-400' },
    { icon: '🧼', name: '藍色橡皮擦', lengthCm: 5, startCm: 2, color: 'bg-sky-400' },
    { icon: '🖍️', name: '彩色蠟筆', lengthCm: 8, startCm: 4, color: 'bg-rose-400' }
  ];

  const currentItem = alignZeroItems[selectedItemIndex];
  const cmToPx = 24; // 1 公分等於 24 像素

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRulerOffset(parseInt(e.target.value, 10));
  };

  const handleAlignZero = () => {
    soundFx.playPop();
    setRulerOffset(currentItem.startCm * cmToPx);
  };

  const isZeroAligned = Math.abs(rulerOffset - currentItem.startCm * cmToPx) < 4;

  // ==========================================
  // 分頁 2：斷尺計算（終點－起點）
  // ==========================================
  const brokenQuestions = [
    {
      icon: '✏️',
      name: '柯南的鉛筆',
      startCm: 3,
      endCm: 11,
      color: 'bg-amber-500',
      description: '鉛筆左端對齊刻度 3，右端指在刻度 11，這支鉛筆長幾公分？'
    },
    {
      icon: '✂️',
      name: '小美的美工刀',
      startCm: 5,
      endCm: 14,
      color: 'bg-sky-500',
      description: '美工刀左端對齊刻度 5，右端指在刻度 14，美工刀長幾公分？'
    },
    {
      icon: '🖍️',
      name: '旋轉蠟筆',
      startCm: 2,
      endCm: 9,
      color: 'bg-rose-500',
      description: '蠟筆左端對齊刻度 2，右端指在刻度 9，蠟筆長幾公分？'
    }
  ];

  const [brokenIdx, setBrokenIdx] = useState<number>(0);
  const [brokenAnswer, setBrokenAnswer] = useState<string>('');
  const [brokenFeedback, setBrokenFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentBroken = brokenQuestions[brokenIdx];
  const brokenExpected = currentBroken.endCm - currentBroken.startCm;

  const handleCheckBroken = () => {
    const val = parseInt(brokenAnswer, 10);
    if (val === brokenExpected) {
      soundFx.playCorrect();
      setBrokenFeedback({
        isCorrect: true,
        text: `🎉 太棒了！右端終點 ${currentBroken.endCm} － 左端起點 ${currentBroken.startCm} ＝ ${brokenExpected} 公分！`
      });
    } else {
      soundFx.playWrong();
      setBrokenFeedback({
        isCorrect: false,
        text: `💡 再算算看喔！用右端刻度 ${currentBroken.endCm} 減去左端刻度 ${currentBroken.startCm}！`
      });
    }
  };

  const handleNextBroken = () => {
    soundFx.playPop();
    setBrokenIdx((prev) => (prev + 1) % brokenQuestions.length);
    setBrokenAnswer('');
    setBrokenFeedback(null);
  };

  // ==========================================
  // 分頁 3：長度加減大考驗
  // ==========================================
  const mathQuestions = [
    {
      title: '長度合成（加法）',
      story: '紅鉛筆長 12 公分，藍鉛筆長 8 公分，把兩支鉛筆頭尾相接排成一長排，一共長幾公分？',
      expr: '12 ＋ 8',
      ans: 20,
      unit: '公分'
    },
    {
      title: '長度分解（減法剪短）',
      story: '一條彩帶長 25 公分，包禮物剪掉了 9 公分，這條彩帶還剩下幾公分？',
      expr: '25 － 9',
      ans: 16,
      unit: '公分'
    },
    {
      title: '長度相差（比較減法）',
      story: '書桌長 85 公分，小圓凳長 30 公分，書桌比小圓凳長幾公分？',
      expr: '85 － 30',
      ans: 55,
      unit: '公分'
    }
  ];

  const [mathIdx, setMathIdx] = useState<number>(0);
  const [mathAnswer, setMathAnswer] = useState<string>('');
  const [mathFeedback, setMathFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentMath = mathQuestions[mathIdx];

  const handleCheckMath = () => {
    const val = parseInt(mathAnswer, 10);
    if (val === currentMath.ans) {
      soundFx.playCorrect();
      setMathFeedback({
        isCorrect: true,
        text: `🎉 完全正確！算式：${currentMath.expr} ＝ ${currentMath.ans} 公分！`
      });
    } else {
      soundFx.playWrong();
      setMathFeedback({
        isCorrect: false,
        text: `💡 算算看：${currentMath.expr} ＝ 多少呢？加油！`
      });
    }
  };

  const handleNextMath = () => {
    soundFx.playPop();
    setMathIdx((prev) => (prev + 1) % mathQuestions.length);
    setMathAnswer('');
    setMathFeedback(null);
  };

  return (
    <div className="flex flex-col items-center bg-emerald-50/70 p-4 sm:p-6 rounded-3xl border-2 border-emerald-200 max-w-2xl mx-auto w-full">
      {/* 頂部三合一模式切換按鈕列 */}
      <div className="flex items-center justify-between w-full bg-white p-1.5 rounded-2xl border-2 border-emerald-200 shadow-sm mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('alignZero');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              activeTab === 'alignZero'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-emerald-50'
            }`}
          >
            <span>📏</span>
            <BopomofoText text="刻度0對齊實測" showBpmf={bopomofoEnabled ?? false} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('brokenRuler');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              activeTab === 'brokenRuler'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-amber-50'
            }`}
          >
            <span>✂️</span>
            <BopomofoText text="斷尺計算（終點－起點）" showBpmf={bopomofoEnabled ?? false} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('addSubtract');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              activeTab === 'addSubtract'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-indigo-50'
            }`}
          >
            <span>➕</span>
            <BopomofoText text="長度加減大考驗" showBpmf={bopomofoEnabled ?? false} />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 模式 1：刻度 0 對齊實測 */}
      {/* ========================================================================= */}
      {activeTab === 'alignZero' && (
        <div className="w-full flex flex-col items-center">
          {/* 測量物品選擇 */}
          <div className="flex flex-wrap items-center justify-between w-full bg-white p-3 rounded-2xl border border-emerald-200 shadow-sm mb-3">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
              <Ruler size={16} className="text-emerald-600" />
              <BopomofoText text="選擇要量測的物品：" showBpmf={bopomofoEnabled ?? false} />
            </span>
            <div className="flex gap-1.5">
              {alignZeroItems.map((it, idx) => (
                <button
                  key={it.name}
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedItemIndex(idx);
                  }}
                  className={`px-3 py-1 text-xs font-bold rounded-xl transition flex items-center gap-1 ${
                    selectedItemIndex === idx
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                  }`}
                >
                  <span>{it.icon}</span>
                  <BopomofoText text={it.name} showBpmf={bopomofoEnabled ?? false} />
                </button>
              ))}
            </div>
          </div>

          {/* 測量操作台 */}
          <div className="relative w-full bg-white p-6 rounded-2xl border-2 border-slate-300 shadow-inner overflow-x-auto min-h-[200px]">
            {/* 物品放置軌道 */}
            <div className="relative h-14 w-[500px] mb-4 flex items-center">
              <div
                className={`absolute h-8 rounded-lg shadow-md flex items-center justify-center font-bold text-xs text-white transition-all ${currentItem.color}`}
                style={{
                  left: `${currentItem.startCm * cmToPx + 20}px`,
                  width: `${currentItem.lengthCm * cmToPx}px`
                }}
              >
                <span className="mr-1">{currentItem.icon}</span>
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
                      <div className="w-[1.5px] h-6 bg-slate-800"></div>
                      <span className="text-[10px] font-black text-slate-800 -mt-0.5">{cm}</span>
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
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MoveHorizontal size={14} />
                  <BopomofoText text="左右拖曳移動直尺：" showBpmf={bopomofoEnabled ?? false} />
                </span>
                <button
                  onClick={handleAlignZero}
                  className="text-xs font-black text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1"
                >
                  <span>🎯</span>
                  <BopomofoText text="對齊物品起點 (0刻度)" showBpmf={bopomofoEnabled ?? false} />
                </button>
              </div>
              <input
                type="range"
                min="-50"
                max="120"
                value={rulerOffset}
                onChange={handleDrag}
                className="w-full accent-emerald-600 cursor-pointer"
              />

              {isZeroAligned ? (
                <div className="p-2 bg-emerald-100 text-emerald-950 rounded-xl text-xs font-black text-center animate-bounce-short">
                  <span>🎉 </span>
                  <BopomofoText text={`成功對齊刻度 0！右邊停在刻度 ${currentItem.lengthCm}，長度就是 ${currentItem.lengthCm} 公分！`} showBpmf={bopomofoEnabled ?? false} />
                </div>
              ) : (
                <div className="text-xs text-slate-500 text-center font-medium flex items-center justify-center gap-1">
                  <span>💡</span>
                  <BopomofoText text="小撇步：把直尺的「0刻度」對準物品最左邊，右邊對應到的數字就是物品長度喔！" showBpmf={bopomofoEnabled ?? false} />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 2：斷尺計算（終點－起點） */}
      {/* ========================================================================= */}
      {activeTab === 'brokenRuler' && (
        <div className="w-full flex flex-col items-center gap-4">
          {/* 題目與柯南任務提示卡 */}
          <div className="w-full bg-amber-50 border-2 border-amber-300 rounded-2xl p-3 sm:p-4 text-center">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black px-2.5 py-0.5 bg-amber-600 text-white rounded-full">
                <BopomofoText text={`第 ${brokenIdx + 1} 題 / 共 ${brokenQuestions.length} 題`} showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                <span>🔍</span>
                <BopomofoText text="柯南斷尺解密" showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>
            <p className="text-sm font-black text-amber-950 flex items-center justify-center gap-1">
              <span>{currentBroken.icon}</span>
              <BopomofoText text={currentBroken.description} showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          {/* 斷尺測量展示區 */}
          <div className="relative w-full bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-inner overflow-x-auto min-h-[180px]">
            {/* 被測量的物品 */}
            <div className="relative h-12 w-[500px] mb-2 flex items-center">
              <div
                className={`absolute h-8 rounded-lg shadow-md flex items-center justify-center font-bold text-xs text-white ${currentBroken.color}`}
                style={{
                  left: `${currentBroken.startCm * cmToPx + 20}px`,
                  width: `${(currentBroken.endCm - currentBroken.startCm) * cmToPx}px`
                }}
              >
                <span>{currentBroken.icon}</span>
                <BopomofoText text={currentBroken.name} showBpmf={bopomofoEnabled ?? false} />
              </div>
            </div>

            {/* 起點與終點標註指示箭頭 */}
            <div className="relative w-[500px] h-6">
              <div
                className="absolute text-[11px] font-black text-rose-600 -top-1"
                style={{ left: `${currentBroken.startCm * cmToPx + 10}px` }}
              >
                ▼ 起點 {currentBroken.startCm}
              </div>
              <div
                className="absolute text-[11px] font-black text-blue-600 -top-1"
                style={{ left: `${currentBroken.endCm * cmToPx + 10}px` }}
              >
                ▼ 終點 {currentBroken.endCm}
              </div>
            </div>

            {/* 斷尺繪製（前端刻意鋸齒破碎） */}
            <div className="relative w-[500px]">
              <div className="h-16 bg-amber-100/95 border-2 border-amber-500 rounded-r-lg shadow-md relative select-none border-l-4 border-l-dashed border-l-rose-500">
                {Array.from({ length: 19 }).map((_, cm) => {
                  const leftPos = 20 + cm * cmToPx;
                  const isHighlighted = cm === currentBroken.startCm || cm === currentBroken.endCm;
                  return (
                    <div key={cm} className="absolute top-0 flex flex-col items-center" style={{ left: `${leftPos}px` }}>
                      <div className={`w-[2px] h-6 ${isHighlighted ? 'bg-rose-600 w-[2.5px]' : 'bg-slate-800'}`}></div>
                      <span className={`text-[10px] font-black -mt-0.5 ${isHighlighted ? 'text-rose-600 font-extrabold text-xs' : 'text-slate-800'}`}>
                        {cm}
                      </span>
                    </div>
                  );
                })}
                <div className="absolute right-3 bottom-1 text-[10px] font-bold text-amber-800">
                  <BopomofoText text="公分 (cm)" showBpmf={bopomofoEnabled ?? false} />
                </div>
              </div>
            </div>
          </div>

          {/* 斷尺算式輸入區 */}
          <div className="w-full bg-white p-4 rounded-2xl border-2 border-amber-200 shadow-sm flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 flex-wrap justify-center font-mono text-xl sm:text-2xl font-black text-slate-800">
              <span className="text-blue-600">{currentBroken.endCm}</span>
              <span>－</span>
              <span className="text-rose-600">{currentBroken.startCm}</span>
              <span>＝</span>
              <input
                type="text"
                maxLength={2}
                value={brokenAnswer}
                onChange={(e) => setBrokenAnswer(e.target.value)}
                placeholder="?"
                className="w-14 h-12 text-center text-2xl font-black bg-amber-50 text-amber-950 rounded-xl border-2 border-amber-400 focus:outline-none focus:ring-4 ring-amber-300/50"
              />
              <span className="text-base font-sans font-black text-slate-700">
                <BopomofoText text="公分" showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>

            <button
              onClick={handleCheckBroken}
              disabled={!brokenAnswer}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              <Check size={16} />
              <BopomofoText text="檢查答案" showBpmf={bopomofoEnabled ?? false} />
            </button>

            {/* 口訣提示卡 */}
            <div className="w-full bg-amber-50 p-2.5 rounded-xl text-xs text-amber-950 font-bold text-center">
              <span>💡 </span>
              <BopomofoText text="斷尺計算口訣：長度 ＝ 右端刻度（終點） － 左端刻度（起點）！" showBpmf={bopomofoEnabled ?? false} />
            </div>

            {brokenFeedback && (
              <div className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-black text-center ${
                brokenFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                <BopomofoText text={brokenFeedback.text} showBpmf={bopomofoEnabled ?? false} />
              </div>
            )}

            {brokenFeedback?.isCorrect && (
              <button
                onClick={handleNextBroken}
                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-black rounded-xl shadow-md btn-fun flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <BopomofoText text="挑戰下一題" showBpmf={bopomofoEnabled ?? false} /> <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 3：長度加減大考驗 */}
      {/* ========================================================================= */}
      {activeTab === 'addSubtract' && (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black px-2.5 py-0.5 bg-indigo-600 text-white rounded-full">
                <BopomofoText text={`第 ${mathIdx + 1} 題 / 共 ${mathQuestions.length} 題`} showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs font-bold text-indigo-800 flex items-center gap-1">
                <span>➕</span>
                <BopomofoText text={currentMath.title} showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>
            <p className="text-sm font-black text-indigo-950 mt-1">
              <BopomofoText text={currentMath.story} showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          <div className="w-full bg-white p-5 rounded-2xl border-2 border-indigo-200 shadow-sm flex flex-col items-center gap-3">
            <div className="flex items-center gap-2 flex-wrap justify-center font-mono text-2xl font-black text-slate-800">
              <span className="text-indigo-700">{currentMath.expr}</span>
              <span>＝</span>
              <input
                type="text"
                maxLength={3}
                value={mathAnswer}
                onChange={(e) => setMathAnswer(e.target.value)}
                placeholder="?"
                className="w-16 h-12 text-center text-2xl font-black bg-indigo-50 text-indigo-950 rounded-xl border-2 border-indigo-400 focus:outline-none focus:ring-4 ring-indigo-300/50"
              />
              <span className="text-base font-sans font-black text-slate-700">
                <BopomofoText text={currentMath.unit} showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>

            <button
              onClick={handleCheckMath}
              disabled={!mathAnswer}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              <Check size={16} />
              <BopomofoText text="檢查算式答案" showBpmf={bopomofoEnabled ?? false} />
            </button>

            {mathFeedback && (
              <div className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-black text-center ${
                mathFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                <BopomofoText text={mathFeedback.text} showBpmf={bopomofoEnabled ?? false} />
              </div>
            )}

            {mathFeedback?.isCorrect && (
              <button
                onClick={handleNextMath}
                className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-black rounded-xl shadow-md btn-fun flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <BopomofoText text="挑戰下一題" showBpmf={bopomofoEnabled ?? false} /> <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
