import React, { useState } from 'react';
import { Ruler, MoveHorizontal, Check, ArrowRight, Sparkles, Scissors, PlusCircle, Trees } from 'lucide-react';
import { soundFx } from '../../services/audio';
import { BopomofoText } from '../BopomofoText';

interface VirtualRulerProps {
  interactive?: boolean;
  bopomofoEnabled?: boolean;
  unitId?: string;
}

type RulerTab = 'alignZero' | 'brokenRuler' | 'addSubtract' | 'meterConverter' | 'meterAdd';

export const VirtualRuler: React.FC<VirtualRulerProps> = ({
  interactive = true,
  bopomofoEnabled,
  unitId
}) => {
  // 是否為公尺單元 (g2-u12-meter-cm)
  const isMeterUnit = unitId === 'g2-u12-meter-cm' || unitId?.includes('meter');

  // 預設模式：若為公尺單元，直接預設 'meterConverter'
  const defaultTab: RulerTab = isMeterUnit ? 'meterConverter' : 'alignZero';
  const [activeTab, setActiveTab] = useState<RulerTab>(defaultTab);

  // ==========================================
  // 🌟 模式 A：1 公尺大木尺與公分換算實驗室 (g2-u12-meter-cm 預設)
  // ==========================================
  const meterQuestions = [
    {
      id: 'jump',
      icon: '🦒',
      title: '跳遠沙坑成績換算',
      story: '長頸鹿老師拿著 1 公尺大木尺量跳遠沙坑。小明跳了 1 公尺 30 公分，換算成公分是多少公分？',
      givenM: 1,
      givenCm: 30,
      expectedTotalCm: 130,
      mode: 'mToCm' as const,
      explanation: '1 公尺 ＝ 100 公分，所以 100 ＋ 30 ＝ 130 公分！'
    },
    {
      id: 'board',
      icon: '🏫',
      title: '教室大黑板長度換算',
      story: '教室前面大黑板的長度量出來剛好是 3 公尺。3 公尺換算成公分是多少公分？',
      givenM: 3,
      givenCm: 0,
      expectedTotalCm: 300,
      mode: 'mToCm' as const,
      explanation: '1 公尺 ＝ 100 公分，3 個 100 就是 300 公分！'
    },
    {
      id: 'height',
      icon: '🧒',
      title: '健康檢查身高換算',
      story: '小明健康檢查身高是 125 公分。換算成幾公尺幾公分呢？',
      totalCmInput: 125,
      expectedM: 1,
      expectedCm: 25,
      mode: 'cmToM' as const,
      explanation: '125 公分 ＝ 100 公分 ＋ 25 公分 ＝ 1 公尺 25 公分！'
    },
    {
      id: 'ribbon',
      icon: '🎀',
      title: '運動會大彩帶長度',
      story: '運動會大彩帶長 240 公分。換算成幾公尺幾公分呢？',
      totalCmInput: 240,
      expectedM: 2,
      expectedCm: 40,
      mode: 'cmToM' as const,
      explanation: '240 公分 ＝ 200 公分 ＋ 40 公分 ＝ 2 公尺 40 公分！'
    }
  ];

  const [meterQIdx, setMeterQIdx] = useState<number>(0);
  const [meterUserAns, setMeterUserAns] = useState<string>('');
  const [meterUserM, setMeterUserM] = useState<string>('');
  const [meterUserCm, setMeterUserCm] = useState<string>('');
  const [meterFeedback, setMeterFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentMeterQ = meterQuestions[meterQIdx];

  const handleCheckMeter = () => {
    if (currentMeterQ.mode === 'mToCm') {
      const val = parseInt(meterUserAns, 10);
      if (val === currentMeterQ.expectedTotalCm) {
        soundFx.playCorrect();
        setMeterFeedback({ isCorrect: true, text: `🎉 答對了！${currentMeterQ.explanation}` });
      } else {
        soundFx.playWrong();
        setMeterFeedback({ isCorrect: false, text: `💡 再想一想：1 公尺 ＝ 100 公分喔！` });
      }
    } else {
      const m = parseInt(meterUserM, 10);
      const cm = parseInt(meterUserCm, 10);
      if (m === currentMeterQ.expectedM && cm === currentMeterQ.expectedCm) {
        soundFx.playCorrect();
        setMeterFeedback({ isCorrect: true, text: `🎉 答對了！${currentMeterQ.explanation}` });
      } else {
        soundFx.playWrong();
        setMeterFeedback({ isCorrect: false, text: `💡 滿 100 公分就是 1 公尺喔！` });
      }
    }
  };

  const handleNextMeter = () => {
    soundFx.playPop();
    setMeterQIdx((prev) => (prev + 1) % meterQuestions.length);
    setMeterUserAns('');
    setMeterUserM('');
    setMeterUserCm('');
    setMeterFeedback(null);
  };

  // ==========================================
  // 🌟 模式 B：公尺與公分長度相加計算 (g2-u12-meter-cm 模式 2)
  // ==========================================
  const meterAddQuestions = [
    {
      id: 'jumpTwo',
      icon: '🦒',
      title: '跳遠兩次成績相加',
      story: '小明第一次跳了 1 公尺 20 公分，第二次往前推進了 80 公分。兩次加起來一共是多少公尺？',
      expr: '1公尺 20公分 ＋ 80公分',
      expectedM: 2,
      expectedCm: 0,
      explanation: '20 公分 ＋ 80 公分 ＝ 100 公分（剛好進位成 1 公尺），1 公尺 ＋ 1 公尺 ＝ 2 公尺！'
    },
    {
      id: 'ribbonAdd',
      icon: '🎀',
      title: '彩帶長度接龍相加',
      story: '紅彩帶長 2 公尺 10 公分，藍彩帶長 1 公尺 40 公分。兩條接起來一共長幾公尺幾公分？',
      expr: '2公尺 10公分 ＋ 1公尺 40公分',
      expectedM: 3,
      expectedCm: 50,
      explanation: '公尺加公尺（2＋1＝3），公分加公分（10＋40＝50），合起來是 3 公尺 50 公分！'
    },
    {
      id: 'trackAdd',
      icon: '🏃',
      title: '操場直線跑道相加',
      story: '操場跑道前半段長 50 公尺，後半段長 50 公尺。整條直線跑道合起來是多少公尺？',
      expr: '50公尺 ＋ 50公尺',
      expectedM: 100,
      expectedCm: 0,
      explanation: '50 公尺 ＋ 50 公尺 ＝ 100 公尺！'
    }
  ];

  const [meterAddIdx, setMeterAddIdx] = useState<number>(0);
  const [addAnsM, setAddAnsM] = useState<string>('');
  const [addAnsCm, setAddAnsCm] = useState<string>('');
  const [addFeedback, setAddFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentAddQ = meterAddQuestions[meterAddIdx];

  const handleCheckMeterAdd = () => {
    const m = parseInt(addAnsM, 10);
    const cm = addAnsCm ? parseInt(addAnsCm, 10) : 0;
    if (m === currentAddQ.expectedM && cm === currentAddQ.expectedCm) {
      soundFx.playCorrect();
      setAddFeedback({ isCorrect: true, text: `🎉 太棒了！長度相加完全正確！${currentAddQ.explanation}` });
    } else {
      soundFx.playWrong();
      setAddFeedback({ isCorrect: false, text: `💡 再動手算算看：公尺加公尺、公分加公分，滿 100 公分記得進位成 1 公尺喔！` });
    }
  };

  const handleNextMeterAdd = () => {
    soundFx.playPop();
    setMeterAddIdx((prev) => (prev + 1) % meterAddQuestions.length);
    setAddAnsM('');
    setAddAnsCm('');
    setAddFeedback(null);
  };

  // ==========================================
  // 分頁 1：刻度 0 對齊實測 (18cm 尺)
  // ==========================================
  const [rulerOffset, setRulerOffset] = useState<number>(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);

  const alignZeroItems = [
    { icon: '✏️', name: '削好的鉛筆', lengthCm: 12, startCm: 0, color: 'bg-amber-400' },
    { icon: '🧼', name: '藍色橡皮擦', lengthCm: 5, startCm: 2, color: 'bg-sky-400' },
    { icon: '🖍️', name: '彩色蠟筆', lengthCm: 8, startCm: 4, color: 'bg-rose-400' }
  ];

  const currentItem = alignZeroItems[selectedItemIndex];
  const cmToPx = 24;

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
  // 分頁 3：長度加減大考驗 (公分加減)
  // ==========================================
  const addSubQuestions = [
    {
      type: 'add',
      title: '長度合成（接龍）',
      story: '一根紅鉛筆長 12 公分，一根藍鉛筆長 8 公分，接在一起共有多長？',
      num1: 12,
      num2: 8,
      op: '+',
      expected: 20,
      unit: '公分',
      explanation: '12 ＋ 8 ＝ 20 公分！'
    },
    {
      type: 'sub',
      title: '長度分解（剪短）',
      story: '一條彩帶長 25 公分，剪掉 9 公分綁禮物，還剩下幾公分？',
      num1: 25,
      num2: 9,
      op: '-',
      expected: 16,
      unit: '公分',
      explanation: '25 － 9 ＝ 16 公分！'
    },
    {
      type: 'compare',
      title: '長度比較（相差）',
      story: '書桌長 85 公分，小圓凳高 30 公分，書桌比圓凳長多少公分？',
      num1: 85,
      num2: 30,
      op: '-',
      expected: 55,
      unit: '公分',
      explanation: '85 － 30 ＝ 55 公分！'
    }
  ];

  const [addsubIdx, setAddsubIdx] = useState<number>(0);
  const [addsubAnswer, setAddsubAnswer] = useState<string>('');
  const [addsubFeedback, setAddsubFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentAddsub = addSubQuestions[addsubIdx];

  const handleCheckAddsub = () => {
    const val = parseInt(addsubAnswer, 10);
    if (val === currentAddsub.expected) {
      soundFx.playCorrect();
      setAddsubFeedback({
        isCorrect: true,
        text: `🎉 太棒了！計算正確：${currentAddsub.explanation}`
      });
    } else {
      soundFx.playWrong();
      setAddsubFeedback({
        isCorrect: false,
        text: `💡 再動手算算看：${currentAddsub.num1} ${currentAddsub.op} ${currentAddsub.num2} ＝ 多少呢？`
      });
    }
  };

  const handleNextAddsub = () => {
    soundFx.playPop();
    setAddsubIdx((prev) => (prev + 1) % addSubQuestions.length);
    setAddsubAnswer('');
    setAddsubFeedback(null);
  };

  return (
    <div className="flex flex-col items-center bg-emerald-50/70 p-4 sm:p-6 rounded-3xl border-2 border-emerald-200 max-w-2xl mx-auto w-full">
      {/* 頂部切換標籤列 */}
      <div className="flex items-center justify-between w-full bg-white p-1.5 rounded-2xl border-2 border-emerald-200 shadow-sm mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* 若為公尺單元，最優先突顯「1公尺與公分換算」與「公尺加減」 */}
          {isMeterUnit && (
            <>
              <button
                onClick={() => {
                  soundFx.playPop();
                  setActiveTab('meterConverter');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
                  activeTab === 'meterConverter'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-emerald-950 hover:bg-emerald-50'
                }`}
              >
                <span>🦒</span>
                <BopomofoText text="1公尺與公分換算" showBpmf={bopomofoEnabled ?? false} />
              </button>

              <button
                onClick={() => {
                  soundFx.playPop();
                  setActiveTab('meterAdd');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
                  activeTab === 'meterAdd'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-teal-950 hover:bg-teal-50'
                }`}
              >
                <span>➕</span>
                <BopomofoText text="公尺公分長度相加" showBpmf={bopomofoEnabled ?? false} />
              </button>
            </>
          )}

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('alignZero');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              activeTab === 'alignZero'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-950 hover:bg-emerald-50'
            }`}
          >
            <span>📏</span>
            <BopomofoText text="刻度 0 對齊實測" showBpmf={bopomofoEnabled ?? false} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('brokenRuler');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              activeTab === 'brokenRuler'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-rose-950 hover:bg-rose-50'
            }`}
          >
            <span>✂️</span>
            <BopomofoText text="斷尺計算（終點－起點）" showBpmf={bopomofoEnabled ?? false} />
          </button>

          {!isMeterUnit && (
            <button
              onClick={() => {
                soundFx.playPop();
                setActiveTab('addSubtract');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
                activeTab === 'addSubtract'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-indigo-950 hover:bg-indigo-50'
              }`}
            >
              <span>➕</span>
              <BopomofoText text="長度加減大考驗" showBpmf={bopomofoEnabled ?? false} />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 模式 A：1 公尺大木尺與公分換算實驗室 (g2-u12-meter-cm 預設) */}
      {/* ========================================================================= */}
      {activeTab === 'meterConverter' && (
        <div className="w-full flex flex-col items-center gap-4">
          {/* 題目切換膠囊按鈕 */}
          <div className="w-full bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-2.5 shadow-sm">
            <p className="text-xs font-black text-emerald-950 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles size={14} className="text-amber-500" />
                <BopomofoText text="選擇生活長度換算題：" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-[11px] font-bold text-emerald-700">
                {meterQIdx + 1} / {meterQuestions.length}
              </span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {meterQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    soundFx.playPop();
                    setMeterQIdx(idx);
                    setMeterUserAns('');
                    setMeterUserM('');
                    setMeterUserCm('');
                    setMeterFeedback(null);
                  }}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                    meterQIdx === idx
                      ? 'bg-emerald-600 text-white shadow-md font-black scale-102'
                      : 'bg-white text-emerald-950 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <span>{q.icon}</span>
                  <span className="truncate">{q.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 故事情境卡 */}
          <div className="w-full bg-white border-2 border-emerald-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black px-2.5 py-0.5 bg-emerald-600 text-white rounded-full flex items-center gap-1">
                <span>{currentMeterQ.icon}</span>
                <BopomofoText text={currentMeterQ.title} showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>
            <p className="text-sm sm:text-base font-black text-slate-800 leading-relaxed mt-1">
              <BopomofoText text={currentMeterQ.story} showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          {/* 🌟 1 公尺大木尺視覺展示條 */}
          <div className="w-full bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 p-4 sm:p-5 rounded-3xl border-3 border-amber-400 shadow-md flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-between text-xs font-black text-amber-950">
              <span className="flex items-center gap-1">
                <Ruler size={16} className="text-amber-700" />
                <BopomofoText text="長頸鹿老師的 1 公尺大木尺 (100 公分)：" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs font-mono font-black text-amber-800 bg-white/80 px-2.5 py-0.5 rounded-full border border-amber-300">
                1 m ＝ 100 cm
              </span>
            </div>

            {/* 尺身 SVG */}
            <div className="w-full bg-amber-200 border-4 border-amber-700 rounded-2xl p-2.5 shadow-inner relative flex flex-col justify-between h-20">
              {/* 刻度線 0 ~ 100 cm */}
              <div className="flex justify-between w-full h-8 items-end px-1 border-b-2 border-amber-800/60 pb-1">
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => (
                  <div key={tick} className="flex flex-col items-center">
                    <div className={`bg-amber-900 ${tick % 50 === 0 ? 'w-1 h-5' : 'w-0.5 h-3'}`}></div>
                    <span className="text-[10px] font-mono font-black text-amber-950 mt-0.5">{tick}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-black text-amber-900 px-2 pt-1">
                <span>0 公分</span>
                <span className="text-sm font-black text-rose-700 bg-white/80 px-2 py-0.5 rounded-md border border-amber-400">
                  ✨ 1 公尺 (m)
                </span>
                <span>100 公分 (cm)</span>
              </div>
            </div>

            <p className="text-xs font-bold text-amber-900 text-center">
              💡 <BopomofoText text="伸開雙臂差不多就是 1 公尺長喔！短長度用公分，長距離用公尺！" showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          {/* 🌟 學生動手換算填答板 */}
          <div className="w-full bg-white p-4 sm:p-5 rounded-2xl border-2 border-emerald-300 shadow-sm flex flex-col items-center gap-3">
            <p className="text-xs sm:text-sm font-black text-emerald-950 text-center">
              <BopomofoText text="動手填入長度等值換算：" showBpmf={bopomofoEnabled ?? false} />
            </p>

            {currentMeterQ.mode === 'mToCm' ? (
              <div className="flex items-center justify-center gap-2 font-mono text-xl sm:text-2xl font-black text-slate-800 flex-wrap">
                <span className="bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 text-emerald-950">
                  {currentMeterQ.givenM} 公尺 {currentMeterQ.givenCm > 0 ? `${currentMeterQ.givenCm} 公分` : ''}
                </span>
                <span>＝</span>
                <input
                  type="text"
                  maxLength={4}
                  value={meterUserAns}
                  onChange={(e) => setMeterUserAns(e.target.value)}
                  placeholder="?"
                  className="w-20 h-12 text-center text-2xl font-black bg-emerald-50 text-emerald-950 rounded-xl border-2 border-emerald-400 focus:outline-none focus:ring-4 ring-emerald-300/50"
                />
                <span className="text-base font-sans font-black text-slate-700">
                  <BopomofoText text="公分" showBpmf={bopomofoEnabled ?? false} />
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 font-mono text-xl sm:text-2xl font-black text-slate-800 flex-wrap">
                <span className="bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 text-emerald-950">
                  {currentMeterQ.totalCmInput} 公分
                </span>
                <span>＝</span>
                <input
                  type="text"
                  maxLength={2}
                  value={meterUserM}
                  onChange={(e) => setMeterUserM(e.target.value)}
                  placeholder="?"
                  className="w-14 h-12 text-center text-2xl font-black bg-emerald-50 text-emerald-950 rounded-xl border-2 border-emerald-400 focus:outline-none focus:ring-4 ring-emerald-300/50"
                />
                <span className="text-base font-sans font-black text-slate-700">
                  <BopomofoText text="公尺" showBpmf={bopomofoEnabled ?? false} />
                </span>
                <input
                  type="text"
                  maxLength={3}
                  value={meterUserCm}
                  onChange={(e) => setMeterUserCm(e.target.value)}
                  placeholder="?"
                  className="w-16 h-12 text-center text-2xl font-black bg-emerald-50 text-emerald-950 rounded-xl border-2 border-emerald-400 focus:outline-none focus:ring-4 ring-emerald-300/50"
                />
                <span className="text-base font-sans font-black text-slate-700">
                  <BopomofoText text="公分" showBpmf={bopomofoEnabled ?? false} />
                </span>
              </div>
            )}

            <button
              onClick={handleCheckMeter}
              disabled={
                currentMeterQ.mode === 'mToCm'
                  ? !meterUserAns
                  : !meterUserM || !meterUserCm
              }
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              <Check size={16} />
              <BopomofoText text="檢查換算結果" showBpmf={bopomofoEnabled ?? false} />
            </button>

            {meterFeedback && (
              <div className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-black text-center ${
                meterFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                <BopomofoText text={meterFeedback.text} showBpmf={bopomofoEnabled ?? false} />
              </div>
            )}

            {meterFeedback?.isCorrect && (
              <button
                onClick={handleNextMeter}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-xl shadow-md btn-fun flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <BopomofoText text="挑戰下一道長度換算題" showBpmf={bopomofoEnabled ?? false} /> <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🌟 模式 B：公尺與公分長度相加計算 (g2-u12-meter-cm 模式 2) */}
      {/* ========================================================================= */}
      {activeTab === 'meterAdd' && (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full bg-teal-50 border-2 border-teal-200 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black px-2.5 py-0.5 bg-teal-600 text-white rounded-full">
                <BopomofoText text={`第 ${meterAddIdx + 1} 題 / 共 ${meterAddQuestions.length} 題`} showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs font-bold text-teal-800">
                {currentAddQ.title}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-black text-teal-950 mt-1">
              <BopomofoText text={currentAddQ.story} showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          <div className="w-full bg-white p-5 rounded-2xl border-2 border-teal-200 shadow-sm flex flex-col items-center gap-4">
            <div className="text-xl sm:text-2xl font-mono font-black text-teal-950 bg-teal-50 px-4 py-2 rounded-xl border border-teal-200">
              {currentAddQ.expr}
            </div>

            <div className="flex items-center justify-center gap-2 font-mono text-xl sm:text-2xl font-black text-slate-800 flex-wrap">
              <span>＝</span>
              <input
                type="text"
                maxLength={3}
                value={addAnsM}
                onChange={(e) => setAddAnsM(e.target.value)}
                placeholder="?"
                className="w-16 h-12 text-center text-2xl font-black bg-teal-50 text-teal-950 rounded-xl border-2 border-teal-400 focus:outline-none focus:ring-4 ring-teal-300/50"
              />
              <span className="text-base font-sans font-black text-slate-700">
                <BopomofoText text="公尺" showBpmf={bopomofoEnabled ?? false} />
              </span>

              {currentAddQ.expectedCm > 0 && (
                <>
                  <input
                    type="text"
                    maxLength={2}
                    value={addAnsCm}
                    onChange={(e) => setAddAnsCm(e.target.value)}
                    placeholder="?"
                    className="w-16 h-12 text-center text-2xl font-black bg-teal-50 text-teal-950 rounded-xl border-2 border-teal-400 focus:outline-none focus:ring-4 ring-teal-300/50"
                  />
                  <span className="text-base font-sans font-black text-slate-700">
                    <BopomofoText text="公分" showBpmf={bopomofoEnabled ?? false} />
                  </span>
                </>
              )}
            </div>

            <button
              onClick={handleCheckMeterAdd}
              disabled={!addAnsM}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              <Check size={16} />
              <BopomofoText text="檢查長度相加結果" showBpmf={bopomofoEnabled ?? false} />
            </button>

            {addFeedback && (
              <div className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-black text-center ${
                addFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                <BopomofoText text={addFeedback.text} showBpmf={bopomofoEnabled ?? false} />
              </div>
            )}

            {addFeedback?.isCorrect && (
              <button
                onClick={handleNextMeterAdd}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-xl shadow-md btn-fun flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <BopomofoText text="挑戰下一道長度相加題" showBpmf={bopomofoEnabled ?? false} /> <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 1：刻度 0 對齊實測 (18cm 尺) */}
      {/* ========================================================================= */}
      {activeTab === 'alignZero' && (
        <>
          <div className="w-full flex items-center justify-between bg-white p-3 rounded-2xl border border-emerald-200 shadow-sm">
            <span className="text-xs font-black text-slate-700 flex items-center gap-1">
              <span>📏 </span>
              <BopomofoText text="選擇要量測的物品：" showBpmf={bopomofoEnabled ?? false} />
            </span>
            <div className="flex gap-2">
              {alignZeroItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedItemIndex(idx);
                    setRulerOffset(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    selectedItemIndex === idx
                      ? 'bg-emerald-600 text-white shadow font-black'
                      : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                  }`}
                >
                  <span>{item.icon} </span>
                  <BopomofoText text={item.name} showBpmf={bopomofoEnabled ?? false} />
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full overflow-hidden bg-white p-6 rounded-3xl border-2 border-emerald-200 shadow-inner flex flex-col gap-6 my-2">
            <div className="relative h-14 w-full flex items-center">
              <div
                className={`absolute h-8 rounded-xl shadow-sm flex items-center justify-center text-xs font-black text-white transition-all ${currentItem.color}`}
                style={{
                  left: `${currentItem.startCm * cmToPx}px`,
                  width: `${currentItem.lengthCm * cmToPx}px`
                }}
              >
                <span>{currentItem.icon} </span>
                <BopomofoText text={currentItem.name} showBpmf={bopomofoEnabled ?? false} />
              </div>
            </div>

            <div className="relative h-20 w-full overflow-hidden">
              <div
                className="absolute top-0 h-16 bg-amber-100 border-2 border-amber-400 rounded-xl shadow-md select-none transition-all duration-75"
                style={{
                  left: `${rulerOffset}px`,
                  width: `${19 * cmToPx}px`
                }}
              >
                <div className="flex h-10 w-full">
                  {Array.from({ length: 19 }).map((_, i) => (
                    <div
                      key={i}
                      className="border-r border-slate-700 relative"
                      style={{ width: `${cmToPx}px` }}
                    >
                      <span className="absolute -bottom-5 right-0 text-[10px] font-mono font-bold text-slate-800 transform translate-x-1/2">
                        {i}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-bold text-amber-800 text-right pr-2 pt-2">
                  <BopomofoText text="公分 (cm)" showBpmf={bopomofoEnabled ?? false} />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span className="flex items-center gap-1">
                  <MoveHorizontal size={14} />
                  <BopomofoText text="左右拖曳移動直尺：" showBpmf={bopomofoEnabled ?? false} />
                </span>
                <button
                  onClick={handleAlignZero}
                  className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-lg text-xs font-black flex items-center gap-1 transition"
                >
                  <span>🎯 </span>
                  <BopomofoText text="對齊物品起點 (0刻度)" showBpmf={bopomofoEnabled ?? false} />
                </button>
              </div>

              <input
                type="range"
                min="0"
                max={currentItem.startCm * cmToPx * 2 || 100}
                value={rulerOffset}
                onChange={handleDrag}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="w-full bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-950 font-bold text-center">
            {isZeroAligned ? (
              <span className="text-emerald-700 font-black flex items-center justify-center gap-1 text-sm">
                <Check size={16} />
                <BopomofoText text={`🎉 成功對齊刻度 0！右邊對齊刻度 ${currentItem.lengthCm}，長度就是 ${currentItem.lengthCm} 公分！`} showBpmf={bopomofoEnabled ?? false} />
              </span>
            ) : (
              <span>
                <span>💡 </span>
                <BopomofoText text="小撇步：把直尺的「0刻度」對準物品最左邊，右邊對應到的數字就是物品長度喔！" showBpmf={bopomofoEnabled ?? false} />
              </span>
            )}
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 模式 2：斷尺計算（終點－起點） */}
      {/* ========================================================================= */}
      {activeTab === 'brokenRuler' && (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black px-2.5 py-0.5 bg-rose-500 text-white rounded-full">
                <BopomofoText text={`第 ${brokenIdx + 1} 題 / 共 ${brokenQuestions.length} 題`} showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs font-bold text-rose-800">
                {currentBroken.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-black text-rose-950 mt-1">
              <BopomofoText text={currentBroken.description} showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          <div className="relative w-full bg-white p-6 rounded-3xl border-2 border-rose-200 shadow-inner flex flex-col gap-6 my-1 overflow-x-auto">
            <div className="relative h-12 w-full flex items-center min-w-[360px]">
              <div
                className={`absolute h-8 rounded-xl shadow-md flex items-center justify-center text-xs font-black text-white ${currentBroken.color}`}
                style={{
                  left: `${currentBroken.startCm * cmToPx}px`,
                  width: `${(currentBroken.endCm - currentBroken.startCm) * cmToPx}px`
                }}
              >
                <span>{currentBroken.icon} </span>
                <BopomofoText text={currentBroken.name} showBpmf={bopomofoEnabled ?? false} />
              </div>
            </div>

            <div className="relative h-16 w-full min-w-[360px] overflow-hidden">
              <div
                className="absolute top-0 h-14 bg-amber-100 border-2 border-amber-400 rounded-r-xl shadow select-none"
                style={{
                  left: `${2 * cmToPx}px`,
                  width: `${16 * cmToPx}px`
                }}
              >
                <div className="flex h-8 w-full">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const tickNum = i + 2;
                    return (
                      <div
                        key={tickNum}
                        className="border-r border-slate-700 relative"
                        style={{ width: `${cmToPx}px` }}
                      >
                        <span className={`absolute -bottom-5 right-0 text-[10px] font-mono font-bold transform translate-x-1/2 ${
                          tickNum === currentBroken.startCm || tickNum === currentBroken.endCm
                            ? 'text-rose-600 font-black text-xs'
                            : 'text-slate-800'
                        }`}>
                          {tickNum}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white p-4 rounded-2xl border-2 border-rose-200 shadow-sm flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-2 font-mono text-xl sm:text-2xl font-black text-slate-800 flex-wrap">
              <span className="text-rose-600">{currentBroken.endCm}</span>
              <span>－</span>
              <span className="text-sky-600">{currentBroken.startCm}</span>
              <span>＝</span>
              <input
                type="text"
                maxLength={2}
                value={brokenAnswer}
                onChange={(e) => setBrokenAnswer(e.target.value)}
                placeholder="?"
                className="w-16 h-12 text-center text-2xl font-black bg-rose-50 text-rose-950 rounded-xl border-2 border-rose-400 focus:outline-none focus:ring-4 ring-rose-300/50"
              />
              <span className="text-base font-sans font-black text-slate-700">
                <BopomofoText text="公分" showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>

            <button
              onClick={handleCheckBroken}
              disabled={!brokenAnswer}
              className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              <Check size={16} />
              <BopomofoText text="檢查斷尺計算" showBpmf={bopomofoEnabled ?? false} />
            </button>

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
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-xl shadow-md btn-fun flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <BopomofoText text="挑戰下一道斷尺題" showBpmf={bopomofoEnabled ?? false} /> <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 3：長度加減大考驗 (公分加減) */}
      {/* ========================================================================= */}
      {activeTab === 'addSubtract' && (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black px-2.5 py-0.5 bg-indigo-600 text-white rounded-full">
                <BopomofoText text={`第 ${addsubIdx + 1} 題 / 共 ${addSubQuestions.length} 題`} showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs font-bold text-indigo-800">
                {currentAddsub.title}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-black text-indigo-950 mt-1">
              <BopomofoText text={currentAddsub.story} showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          <div className="w-full bg-white p-5 rounded-2xl border-2 border-indigo-200 shadow-sm flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-3 font-mono text-2xl sm:text-3xl font-black text-slate-800 flex-wrap">
              <span>{currentAddsub.num1}</span>
              <span className="text-indigo-600 font-sans">{currentAddsub.op === '+' ? '＋' : '－'}</span>
              <span>{currentAddsub.num2}</span>
              <span>＝</span>
              <input
                type="text"
                maxLength={3}
                value={addsubAnswer}
                onChange={(e) => setAddsubAnswer(e.target.value)}
                placeholder="?"
                className="w-18 h-12 text-center text-2xl font-black bg-indigo-50 text-indigo-950 rounded-xl border-2 border-indigo-400 focus:outline-none focus:ring-4 ring-indigo-300/50"
              />
              <span className="text-base font-sans font-black text-slate-700">
                <BopomofoText text={currentAddsub.unit} showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>

            <button
              onClick={handleCheckAddsub}
              disabled={!addsubAnswer}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              <Check size={16} />
              <BopomofoText text="檢查答案" showBpmf={bopomofoEnabled ?? false} />
            </button>

            {addsubFeedback && (
              <div className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-black text-center ${
                addsubFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                <BopomofoText text={addsubFeedback.text} showBpmf={bopomofoEnabled ?? false} />
              </div>
            )}

            {addsubFeedback?.isCorrect && (
              <button
                onClick={handleNextAddsub}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-xl shadow-md btn-fun flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <BopomofoText text="挑戰下一道長度題" showBpmf={bopomofoEnabled ?? false} /> <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
