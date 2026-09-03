import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, ArrowRight, Trophy, Sparkles, Coins, RefreshCw } from 'lucide-react';
import { soundFx } from '../../services/audio';
import { BopomofoText } from '../BopomofoText';

interface VerticalArithmeticProps {
  operation?: 'add' | 'sub';
  num1?: number; // 被加數 / 被減數
  num2?: number; // 加數 / 減數
  interactive?: boolean;
  onComplete?: (isCorrect: boolean) => void;
  unitId?: string;
  bopomofoEnabled?: boolean;
}

type TabMode = 'add' | 'sub' | 'compare' | 'inverse';

export const VerticalArithmetic: React.FC<VerticalArithmeticProps> = ({
  operation: initialOp = 'add',
  num1: propNum1,
  num2: propNum2,
  interactive = true,
  onComplete,
  unitId,
  bopomofoEnabled
}) => {
  // 自動判定初始模式：若為 g2-u4 (加減應用互逆) 或 g2-u6 (加減兩步驟)，預設直接進入 'inverse' 互逆模式！
  const defaultMode: TabMode =
    unitId === 'g2-u4-app-add-sub' || unitId === 'g2-u6-two-steps-add-sub'
      ? 'inverse'
      : initialOp;

  const [tabMode, setTabMode] = useState<TabMode>(defaultMode);
  const isAddition = tabMode === 'add';

  // 根據加法/減法與單元自適應預設數值：
  const defaultNum1 = isAddition
    ? (unitId === 'g1-u17-two-digit-add-sub' ? 24 : 38)
    : (unitId === 'g1-u17-two-digit-add-sub' ? 48 : 52);
  const defaultNum2 = isAddition
    ? (unitId === 'g1-u17-two-digit-add-sub' ? 13 : 25)
    : (unitId === 'g1-u17-two-digit-add-sub' ? 25 : 27);

  const [num1, setNum1] = useState<number>(propNum1 || defaultNum1);
  const [num2, setNum2] = useState<number>(propNum2 || defaultNum2);

  const handleSwitchTab = (newMode: TabMode) => {
    soundFx.playPop();
    setTabMode(newMode);
    if (newMode === 'add') {
      setNum1(unitId === 'g1-u17-two-digit-add-sub' ? 24 : 38);
      setNum2(unitId === 'g1-u17-two-digit-add-sub' ? 13 : 25);
    } else if (newMode === 'sub') {
      setNum1(unitId === 'g1-u17-two-digit-add-sub' ? 48 : 52);
      setNum2(unitId === 'g1-u17-two-digit-add-sub' ? 25 : 27);
    }
  };

  // 拆解位值
  const n1Tens = Math.floor(num1 / 10);
  const n1Ones = num1 % 10;
  const n2Tens = Math.floor(num2 / 10);
  const n2Ones = num2 % 10;

  const requiresRegroup = isAddition
    ? n1Ones + n2Ones >= 10
    : n1Ones < n2Ones;

  // 使用者輸入狀態（直式黑板）
  const [carry, setCarry] = useState<string>('');
  const [borrowTens, setBorrowTens] = useState<string>('');
  const [borrowOnes, setBorrowOnes] = useState<string>('');
  const [ansOnes, setAnsOnes] = useState<string>('');
  const [ansTens, setAnsTens] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);

  // -------------------------------------------------------------
  // ＜、＝、＞ 符號填空挑戰狀態 (g2-u2)
  // -------------------------------------------------------------
  const compareQuestions = [
    {
      title: '🦁 森林運動會 PK：紅隊 38+25 (63分) vs 藍隊 100-36 (64分)',
      leftExpr: '38 + 25',
      leftVal: 63,
      rightExpr: '100 - 36',
      rightVal: 64,
      correctOp: '<',
      explanation: '紅隊 63 分 ＜ 藍隊 64 分！尖尖指向比較小的 63，開口朝向比較大的 64，填入「＜」！藍隊領先！'
    },
    {
      title: '運動會記分挑戰：藍隊得分 100 - 36 與 60 分比較',
      leftExpr: '100 - 36',
      leftVal: 64,
      rightExpr: '60',
      rightVal: 60,
      correctOp: '>',
      explanation: '100 - 36 = 64！64 大於 60，開口朝向大數 64，填入「＞」！'
    },
    {
      title: '運動會記分挑戰：紅隊得分 38 + 25 與 70 分比較',
      leftExpr: '38 + 25',
      leftVal: 63,
      rightExpr: '70',
      rightVal: 70,
      correctOp: '<',
      explanation: '38 + 25 = 63！63 小於 70，尖尖指向小數 63，填入「＜」！'
    },
    {
      title: '直式退位減法挑戰：52 - 27 與 25 比較',
      leftExpr: '52 - 27',
      leftVal: 25,
      rightExpr: '25',
      rightVal: 25,
      correctOp: '=',
      explanation: '52 - 27 = 25！兩邊數量剛好一模一樣大，填入「＝」！'
    }
  ];

  const [compareIdx, setCompareIdx] = useState<number>(0);
  const [selectedOp, setSelectedOp] = useState<string | null>(null);
  const [compareFeedback, setCompareFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const handleSelectOp = (op: string) => {
    setSelectedOp(op);
    const q = compareQuestions[compareIdx];
    if (op === q.correctOp) {
      soundFx.playCorrect();
      setCompareFeedback({ isCorrect: true, text: '🎉 答對了！' + q.explanation });
    } else {
      soundFx.playWrong();
      setCompareFeedback({ isCorrect: false, text: '💡 再想想看喔！開口朝向比較大的數，尖尖指向比較小的數！' });
    }
  };

  const handleNextCompare = () => {
    soundFx.playPop();
    setCompareIdx((prev) => (prev + 1) % compareQuestions.length);
    setSelectedOp(null);
    setCompareFeedback(null);
  };

  // -------------------------------------------------------------
  // 互動加減互逆小偵探題庫與操作狀態 (g2-u4 / g2-u6)
  // -------------------------------------------------------------
  const inverseQuestions = [
    {
      id: 'piggy',
      icon: '👛',
      tag: '求被減數（原來有多少）',
      title: '小明的零用錢存錢筒',
      story: '小明買了 35 元的鉛筆盒後，存錢筒裡還剩下 48 元。原來存錢筒裡有多少元？',
      step1: '□ － 35 ＝ 48',
      step2Rule: '加減互逆：差 ＋ 減數 ＝ 被減數（原來有的錢）',
      calcExpr: '48 ＋ 35',
      partA: 48,
      partALabel: '剩下的錢',
      partB: 35,
      partBLabel: '買鉛筆盒用去',
      totalLabel: '原來存錢筒的錢',
      expectedAns: 83,
      unit: '元',
      verifyFormula: '83 － 35 ＝ 48'
    },
    {
      id: 'paint',
      icon: '🎨',
      tag: '求減數（用去了多少）',
      title: '小華的美術材料費',
      story: '小華原本有 80 元，買了一盒水彩顏料後，錢包裡剩下 28 元。水彩顏料是多少元？',
      step1: '80 － □ ＝ 28',
      step2Rule: '加減互逆：被減數 － 差 ＝ 減數（用去的錢）',
      calcExpr: '80 － 28',
      partA: 80,
      partALabel: '原來的錢',
      partB: 28,
      partBLabel: '剩下的錢',
      totalLabel: '買水彩用去的錢',
      expectedAns: 52,
      unit: '元',
      verifyFormula: '52 ＋ 28 ＝ 80'
    },
    {
      id: 'shoes',
      icon: '👟',
      tag: '求加數（還要存多少）',
      title: '小美的買鞋儲蓄計畫',
      story: '小美已經存了 45 元，想買一雙 92 元的運動鞋，還要再存多少元才夠？',
      step1: '45 ＋ □ ＝ 92',
      step2Rule: '加減互逆：和 － 加數 ＝ 另一個加數（還要存的錢）',
      calcExpr: '92 － 45',
      partA: 92,
      partALabel: '鞋子總價',
      partB: 45,
      partBLabel: '已經存的錢',
      totalLabel: '還要再存的錢',
      expectedAns: 47,
      unit: '元',
      verifyFormula: '45 ＋ 47 ＝ 92'
    },
    {
      id: 'library',
      icon: '📚',
      tag: '加法驗算（檢查算得對不對）',
      title: '森林圖書館圖書驗算',
      story: '圖書館有 64 本童話書，借出 26 本後剩下 38 本。請利用加法進行驗算！',
      step1: '64 － 26 ＝ 38',
      step2Rule: '利用加法驗算：差 ＋ 減數 ＝ 被減數（原本的總書量）',
      calcExpr: '38 ＋ 26',
      partA: 38,
      partALabel: '架上剩下的書',
      partB: 26,
      partBLabel: '借出去的書',
      totalLabel: '原本全部的書',
      expectedAns: 64,
      unit: '本',
      verifyFormula: '64 － 26 ＝ 38'
    }
  ];

  const [inverseQIdx, setInverseQIdx] = useState<number>(0);
  const [isCoinsCombined, setIsCoinsCombined] = useState<boolean>(false);
  const [inverseUserAns, setInverseUserAns] = useState<string>('');
  const [inverseFeedback, setInverseFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentInverseQ = inverseQuestions[inverseQIdx];

  const handleCheckInverse = () => {
    const val = parseInt(inverseUserAns, 10);
    if (val === currentInverseQ.expectedAns) {
      soundFx.playCorrect();
      setIsCoinsCombined(true);
      setInverseFeedback({
        isCorrect: true,
        text: `🎉 太棒了！算式 ${currentInverseQ.calcExpr} ＝ ${currentInverseQ.expectedAns} ${currentInverseQ.unit}！用 ${currentInverseQ.verifyFormula} 驗算完全正確！`
      });
    } else {
      soundFx.playWrong();
      setInverseFeedback({
        isCorrect: false,
        text: `💡 再動手算算看：${currentInverseQ.calcExpr} ＝ 多少呢？加油！`
      });
    }
  };

  const handleSwitchInverseQ = (idx: number) => {
    soundFx.playPop();
    setInverseQIdx(idx);
    setIsCoinsCombined(false);
    setInverseUserAns('');
    setInverseFeedback(null);
  };

  // -------------------------------------------------------------
  // 重設直式加減黑板
  // -------------------------------------------------------------
  const handleReset = () => {
    setCarry('');
    setBorrowTens('');
    setBorrowOnes('');
    setAnsOnes('');
    setAnsTens('');
    setFeedback(null);
  };

  useEffect(() => {
    handleReset();
  }, [num1, num2, tabMode]);

  const actualAns = isAddition ? num1 + num2 : num1 - num2;
  const actualAnsTens = Math.floor(actualAns / 10);
  const actualAnsOnes = actualAns % 10;

  const checkAnswer = () => {
    const userTens = parseInt(ansTens, 10);
    const userOnes = parseInt(ansOnes, 10);

    if (userTens === actualAnsTens && userOnes === actualAnsOnes) {
      soundFx.playCorrect();
      setFeedback('🎉 太棒了！直式計算完全正確！');
      if (onComplete) onComplete(true);
    } else {
      soundFx.playWrong();
      setFeedback('💡 再檢查看看個位或十位有沒有算錯喔！');
    }
  };

  const showCompareTab = unitId === 'g2-u2-add-sub-vertical' || unitId?.includes('compare');
  const showInverseTab = unitId === 'g2-u4-app-add-sub' || unitId === 'g2-u6-two-steps-add-sub' || true;

  return (
    <div className="flex flex-col items-center bg-white p-4 sm:p-6 rounded-3xl border-4 border-amber-300 shadow-md max-w-xl mx-auto w-full">
      {/* 頂部切換標籤列 */}
      <div className="flex items-center justify-between w-full border-b-2 border-amber-100 pb-3 mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 bg-amber-50 p-1 rounded-2xl border border-amber-200 flex-wrap">
          <button
            onClick={() => handleSwitchTab('add')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              tabMode === 'add'
                ? 'bg-amber-500 text-amber-950 shadow-sm'
                : 'text-slate-600 hover:bg-amber-100'
            }`}
          >
            <span>➕</span>
            <BopomofoText text="兩位數加法" showBpmf={bopomofoEnabled ?? false} />
          </button>
          <button
            onClick={() => handleSwitchTab('sub')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              tabMode === 'sub'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-rose-50'
            }`}
          >
            <span>➖</span>
            <BopomofoText text="兩位數減法" showBpmf={bopomofoEnabled ?? false} />
          </button>

          {/* g2-u2 專屬：＜、＝、＞ 符號比大小挑戰分頁 */}
          {showCompareTab && (
            <button
              onClick={() => handleSwitchTab('compare')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
                tabMode === 'compare'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <span>⚖️</span>
              <BopomofoText text="＜＝＞ 符號挑戰" showBpmf={bopomofoEnabled ?? false} />
            </button>
          )}

          {/* g2-u4 / g2-u6 專屬：加減互逆驗算分頁 */}
          {showInverseTab && (
            <button
              onClick={() => handleSwitchTab('inverse')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
                tabMode === 'inverse'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <span>🔄</span>
              <BopomofoText text="加減互逆驗算" showBpmf={bopomofoEnabled ?? false} />
            </button>
          )}
        </div>

        {(tabMode === 'add' || tabMode === 'sub') && (
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-amber-700 flex items-center gap-1 font-bold p-1 rounded-lg"
          >
            <RotateCcw size={14} /> <BopomofoText text="重新計算" showBpmf={bopomofoEnabled ?? false} />
          </button>
        )}
      </div>

      {/* ======================= 分頁 1 & 2：標準直式加法/減法黑板 ======================= */}
      {(tabMode === 'add' || tabMode === 'sub') && (
        <>
          <div className="relative bg-slate-900 text-white font-mono p-6 rounded-2xl shadow-inner w-56 flex flex-col items-center">
            {/* 位值標題：十位、個位 */}
            <div className="grid grid-cols-2 w-36 text-center text-xs font-bold text-amber-400 border-b border-slate-700 pb-1 mb-2">
              <span><BopomofoText text="十位" showBpmf={bopomofoEnabled ?? false} /></span>
              <span><BopomofoText text="個位" showBpmf={bopomofoEnabled ?? false} /></span>
            </div>

            {/* 頂端標記區 */}
            <div className="grid grid-cols-2 w-36 text-center h-7 items-center mb-1 text-sm">
              <div>
                {isAddition ? (
                  requiresRegroup && (
                    <input
                      type="text"
                      maxLength={1}
                      value={carry}
                      onChange={e => setCarry(e.target.value)}
                      placeholder="進1"
                      className="w-7 h-6 text-center text-xs font-bold bg-amber-400 text-slate-950 rounded-full border border-white focus:outline-none focus:ring-2 ring-amber-300"
                    />
                  )
                ) : (
                  requiresRegroup && (
                    <input
                      type="text"
                      maxLength={1}
                      value={borrowTens}
                      onChange={e => setBorrowTens(e.target.value)}
                      placeholder="變幾"
                      className="w-7 h-6 text-center text-xs font-bold bg-rose-400 text-white rounded-full border border-white focus:outline-none focus:ring-2 ring-rose-300"
                    />
                  )
                )}
              </div>

              <div>
                {!isAddition && requiresRegroup && (
                  <input
                    type="text"
                    maxLength={2}
                    value={borrowOnes}
                    onChange={e => setBorrowOnes(e.target.value)}
                    placeholder="10"
                    className="w-7 h-6 text-center text-xs font-bold bg-sky-400 text-slate-950 rounded-full border border-white focus:outline-none focus:ring-2 ring-sky-300"
                  />
                )}
              </div>
            </div>

            {/* 第一行 */}
            <div className="relative flex justify-end w-36 text-3xl font-black tracking-widest text-slate-100 py-1">
              <span className={`w-16 text-center ${!isAddition && borrowTens ? 'line-through text-slate-500' : ''}`}>
                {n1Tens}
              </span>
              <span className="w-16 text-center">{n1Ones}</span>
            </div>

            {/* 第二行 */}
            <div className="relative flex items-center justify-between w-44 text-3xl font-black tracking-widest text-slate-100 py-1">
              <span className="text-amber-400 font-sans text-2xl font-black">{isAddition ? '＋' : '－'}</span>
              <div className="flex w-36 justify-end">
                <span className="w-16 text-center">{n2Tens}</span>
                <span className="w-16 text-center">{n2Ones}</span>
              </div>
            </div>

            <div className="w-44 border-b-4 border-amber-400 my-2"></div>

            {/* 答案填寫格 */}
            <div className="flex justify-end w-36 gap-1 pt-1">
              <input
                type="text"
                maxLength={1}
                value={ansTens}
                onChange={e => setAnsTens(e.target.value)}
                placeholder="?"
                className="w-14 h-12 text-center text-2xl font-black bg-slate-800 text-amber-300 rounded-xl border-2 border-amber-400 focus:outline-none focus:ring-4 ring-amber-300/50"
              />
              <input
                type="text"
                maxLength={1}
                value={ansOnes}
                onChange={e => setAnsOnes(e.target.value)}
                placeholder="?"
                className="w-14 h-12 text-center text-2xl font-black bg-slate-800 text-amber-300 rounded-xl border-2 border-amber-400 focus:outline-none focus:ring-4 ring-amber-300/50"
              />
            </div>
          </div>

          <div className="mt-4 w-full text-xs bg-amber-50 p-3 rounded-xl border border-amber-200 text-slate-700">
            {isAddition ? (
              <div>
                <p className="font-bold text-amber-900 mb-1">💡 <BopomofoText text="計算小撇步：" showBpmf={bopomofoEnabled ?? false} /></p>
                <p><BopomofoText text={`1. 先算個位：${n1Ones} + ${n2Ones} = ${n1Ones + n2Ones}`} showBpmf={bopomofoEnabled ?? false} /></p>
                {requiresRegroup ? (
                  <p className="text-rose-600 font-bold">👉 <BopomofoText text={`滿十了！個位填 ${(n1Ones + n2Ones) % 10}，十位頭上寫小小的 1！`} showBpmf={bopomofoEnabled ?? false} /></p>
                ) : (
                  <p className="text-emerald-700 font-bold">👉 <BopomofoText text={`沒滿十，個位直接填 ${n1Ones + n2Ones}。`} showBpmf={bopomofoEnabled ?? false} /></p>
                )}
                <p><BopomofoText text={`2. 再算十位：${n1Tens} + ${n2Tens} ${requiresRegroup ? '+ 1(進位)' : ''} = ${actualAnsTens}`} showBpmf={bopomofoEnabled ?? false} /></p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-amber-900 mb-1">💡 <BopomofoText text="計算小撇步：" showBpmf={bopomofoEnabled ?? false} /></p>
                <p><BopomofoText text={`1. 先看個位：${n1Ones} 減 ${n2Ones}`} showBpmf={bopomofoEnabled ?? false} /></p>
                {requiresRegroup ? (
                  <p className="text-rose-600 font-bold">👉 <BopomofoText text={`不夠減！把十位 ${n1Tens} 劃掉借1變 ${n1Tens - 1}，個位拿到 10，10 - ${n2Ones} + ${n1Ones} = ${actualAnsOnes}！`} showBpmf={bopomofoEnabled ?? false} /></p>
                ) : (
                  <p className="text-emerald-700 font-bold">👉 <BopomofoText text={`夠減，個位填 ${n1Ones - n2Ones}。`} showBpmf={bopomofoEnabled ?? false} /></p>
                )}
                <p><BopomofoText text={`2. 再算十位：${requiresRegroup ? n1Tens - 1 : n1Tens} - ${n2Tens} = ${actualAnsTens}`} showBpmf={bopomofoEnabled ?? false} /></p>
              </div>
            )}
          </div>

          {interactive && (
            <button
              onClick={checkAnswer}
              disabled={!ansOnes || !ansTens}
              className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-2xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              <Check size={18} /> <BopomofoText text="檢查直式算式" showBpmf={bopomofoEnabled ?? false} />
            </button>
          )}

          {feedback && (
            <div className="mt-3 text-center text-sm font-black text-amber-900 animate-bounce-short flex flex-col items-center gap-2">
              <BopomofoText text={feedback} showBpmf={bopomofoEnabled ?? false} />
              {feedback.startsWith('🎉') && showCompareTab && (
                <button
                  onClick={() => handleSwitchTab('compare')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 transition"
                >
                  <BopomofoText text="👉 前往 ＜、＝、＞ 符號填空挑戰！" showBpmf={bopomofoEnabled ?? false} />
                </button>
              )}
            </div>
          )}
        </>
      )}

      {/* ======================= 分頁 3：＜、＝、＞ 符號填空挑戰 ======================= */}
      {tabMode === 'compare' && (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full bg-indigo-50 border border-indigo-200 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black px-2.5 py-1 bg-indigo-600 text-white rounded-full">
                <BopomofoText text={`第 ${compareIdx + 1} 題 / 共 ${compareQuestions.length} 題`} showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs text-indigo-700 font-bold flex items-center gap-1">
                <Trophy size={14} /> <BopomofoText text="運動會PK賽" showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>
            <p className="text-xs sm:text-sm font-black text-indigo-950 mt-1">
              <BopomofoText text={compareQuestions[compareIdx].title} showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-5 my-2 w-full">
            <div className="flex flex-col items-center p-3 sm:p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl min-w-[100px] text-center shadow-sm">
              <span className="text-xl sm:text-2xl font-black text-amber-950 font-mono">
                {compareQuestions[compareIdx].leftExpr}
              </span>
              <span className="text-xs font-bold text-amber-700 mt-1">
                （＝ {compareQuestions[compareIdx].leftVal}）
              </span>
            </div>

            <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 flex items-center justify-center text-2xl sm:text-3xl font-black shadow-inner transition ${
              selectedOp
                ? (selectedOp === compareQuestions[compareIdx].correctOp
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-800'
                    : 'border-rose-400 bg-rose-50 text-rose-700')
                : 'border-dashed border-indigo-400 bg-indigo-50 text-indigo-400'
            }`}>
              {selectedOp || '？'}
            </div>

            <div className="flex flex-col items-center p-3 sm:p-4 bg-sky-50 border-2 border-sky-300 rounded-2xl min-w-[100px] text-center shadow-sm">
              <span className="text-xl sm:text-2xl font-black text-sky-950 font-mono">
                {compareQuestions[compareIdx].rightExpr}
              </span>
              <span className="text-xs font-bold text-sky-700 mt-1">
                （＝ {compareQuestions[compareIdx].rightVal}）
              </span>
            </div>
          </div>

          <div className="w-full">
            <p className="text-xs text-center font-bold text-slate-600 mb-2">
              <BopomofoText text="點擊選擇合適的大小關係符號：" showBpmf={bopomofoEnabled ?? false} />
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleSelectOp('<')}
                className={`py-3 px-2 rounded-2xl border-3 font-black text-lg sm:text-xl transition flex flex-col items-center justify-center gap-0.5 shadow-sm ${
                  selectedOp === '<'
                    ? 'bg-indigo-600 border-indigo-700 text-white scale-105 shadow-md'
                    : 'bg-white border-indigo-200 text-indigo-950 hover:bg-indigo-50'
                }`}
              >
                <span className="text-2xl font-mono">＜</span>
                <span className="text-xs"><BopomofoText text="小於" showBpmf={bopomofoEnabled ?? false} /></span>
              </button>

              <button
                onClick={() => handleSelectOp('=')}
                className={`py-3 px-2 rounded-2xl border-3 font-black text-lg sm:text-xl transition flex flex-col items-center justify-center gap-0.5 shadow-sm ${
                  selectedOp === '='
                    ? 'bg-indigo-600 border-indigo-700 text-white scale-105 shadow-md'
                    : 'bg-white border-indigo-200 text-indigo-950 hover:bg-indigo-50'
                }`}
              >
                <span className="text-2xl font-mono">＝</span>
                <span className="text-xs"><BopomofoText text="等於" showBpmf={bopomofoEnabled ?? false} /></span>
              </button>

              <button
                onClick={() => handleSelectOp('>')}
                className={`py-3 px-2 rounded-2xl border-3 font-black text-lg sm:text-xl transition flex flex-col items-center justify-center gap-0.5 shadow-sm ${
                  selectedOp === '>'
                    ? 'bg-indigo-600 border-indigo-700 text-white scale-105 shadow-md'
                    : 'bg-white border-indigo-200 text-indigo-950 hover:bg-indigo-50'
                }`}
              >
                <span className="text-2xl font-mono">＞</span>
                <span className="text-xs"><BopomofoText text="大於" showBpmf={bopomofoEnabled ?? false} /></span>
              </button>
            </div>
          </div>

          <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950">
            <p className="font-bold flex items-center gap-1 mb-0.5">
              <span>💡</span>
              <BopomofoText text="比大小記憶口訣：" showBpmf={bopomofoEnabled ?? false} />
            </p>
            <p className="text-slate-700">
              <BopomofoText text="「開口大是大，尖尖指向小！兩邊一樣多，劃上等於號！」" showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          {compareFeedback && (
            <div className={`w-full p-3 rounded-2xl text-xs sm:text-sm font-black text-center ${
              compareFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}>
              <BopomofoText text={compareFeedback.text} showBpmf={bopomofoEnabled ?? false} />
            </div>
          )}

          {compareFeedback?.isCorrect && (
            <button
              onClick={handleNextCompare}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl shadow-md btn-fun flex items-center justify-center gap-1 text-sm"
            >
              <BopomofoText text="挑戰下一題" showBpmf={bopomofoEnabled ?? false} /> <ArrowRight size={16} />
            </button>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 分頁 4：🌟 加減互逆動態偵探實驗室（豐富變化性與互動操作） */}
      {/* ========================================================================= */}
      {tabMode === 'inverse' && (
        <div className="w-full flex flex-col items-center gap-4">
          {/* 4 大情境題切換膠囊按鈕（多樣化題型） */}
          <div className="w-full bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-2.5 shadow-sm">
            <p className="text-xs font-black text-emerald-900 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles size={14} className="text-amber-500" />
                <BopomofoText text="選擇加減互逆偵探情境題：" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-[11px] font-bold text-emerald-700">
                {inverseQIdx + 1} / {inverseQuestions.length}
              </span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {inverseQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleSwitchInverseQ(idx)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                    inverseQIdx === idx
                      ? 'bg-emerald-600 text-white shadow-md font-black scale-102'
                      : 'bg-white text-emerald-950 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  <span>{q.icon}</span>
                  <span className="truncate">{q.title.replace('小明的', '').replace('小華的', '').replace('小美的', '')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 題目故事卡 */}
          <div className="w-full bg-white border-2 border-emerald-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black px-2.5 py-0.5 bg-emerald-600 text-white rounded-full flex items-center gap-1">
                <span>{currentInverseQ.icon}</span>
                <BopomofoText text={currentInverseQ.tag} showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {currentInverseQ.step1}
              </span>
            </div>
            <p className="text-sm sm:text-base font-black text-slate-800 leading-relaxed mt-1">
              <BopomofoText text={currentInverseQ.story} showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          {/* 🌟 具象化線段圖與動手放回操作板 */}
          <div className="w-full bg-amber-50/80 border-2 border-amber-300 rounded-2xl p-4 shadow-sm flex flex-col items-center gap-3">
            <div className="w-full flex items-center justify-between text-xs font-black text-amber-950">
              <span className="flex items-center gap-1">
                <Coins size={15} className="text-amber-600" />
                <BopomofoText text="線段關係與動態圖解：" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-[11px] text-amber-800 font-normal">
                {currentInverseQ.step2Rule}
              </span>
            </div>

            {/* 視覺動態條：部分 A ＋ 部分 B ＝ 全部 */}
            <div className="w-full flex flex-col gap-1.5 my-1">
              <div className="w-full h-10 bg-white border-2 border-slate-300 rounded-xl overflow-hidden flex shadow-inner relative">
                {/* 部分 A */}
                <div
                  className="h-full bg-sky-400 flex items-center justify-center text-xs font-black text-white px-2 transition-all duration-500"
                  style={{ width: `${(currentInverseQ.partA / (currentInverseQ.partA + currentInverseQ.partB)) * 100}%` }}
                >
                  <span className="truncate">{currentInverseQ.partALabel} ({currentInverseQ.partA})</span>
                </div>

                {/* 部分 B（動態結合） */}
                <div
                  className={`h-full flex items-center justify-center text-xs font-black text-white px-2 transition-all duration-500 ${
                    isCoinsCombined ? 'bg-amber-500 ring-2 ring-amber-300' : 'bg-rose-400'
                  }`}
                  style={{ width: `${(currentInverseQ.partB / (currentInverseQ.partA + currentInverseQ.partB)) * 100}%` }}
                >
                  <span className="truncate">{currentInverseQ.partBLabel} ({currentInverseQ.partB})</span>
                </div>
              </div>

              {/* 線段下方總計標記 */}
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-600 px-1">
                <span className="text-sky-700">▲ {currentInverseQ.partA} {currentInverseQ.unit}</span>
                <span className="text-amber-800 font-black">
                  {isCoinsCombined ? `✨ 合起來共 ${currentInverseQ.expectedAns} ${currentInverseQ.unit}` : '▲ 兩部分互逆合在一起'}
                </span>
                <span className="text-rose-700">▲ {currentInverseQ.partB} {currentInverseQ.unit}</span>
              </div>
            </div>

            {/* 互動按鈕：模擬把錢放回/動手合併 */}
            <button
              onClick={() => {
                soundFx.playPop();
                setIsCoinsCombined(!isCoinsCombined);
              }}
              className="px-4 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition border border-amber-300 shadow-sm"
            >
              <span>{isCoinsCombined ? '↩️ 重新分開' : '🪙 點我把兩部分合併倒推總數！'}</span>
            </button>
          </div>

          {/* 🌟 學生動手直式算則填答區 */}
          <div className="w-full bg-white border-2 border-emerald-300 rounded-2xl p-4 shadow-sm flex flex-col items-center gap-3">
            <p className="text-xs font-black text-emerald-950 text-center">
              <BopomofoText text={`動手填入互逆算式求解答：`} showBpmf={bopomofoEnabled ?? false} />
            </p>

            <div className="flex items-center justify-center gap-2 font-mono text-2xl font-black text-slate-800 flex-wrap">
              <span className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-emerald-900">
                {currentInverseQ.calcExpr}
              </span>
              <span>＝</span>
              <input
                type="text"
                maxLength={3}
                value={inverseUserAns}
                onChange={e => setInverseUserAns(e.target.value)}
                placeholder="?"
                className="w-16 h-12 text-center text-2xl font-black bg-emerald-50 text-emerald-950 rounded-xl border-2 border-emerald-400 focus:outline-none focus:ring-4 ring-emerald-300/50"
              />
              <span className="text-base font-sans font-black text-slate-700">
                <BopomofoText text={currentInverseQ.unit} showBpmf={bopomofoEnabled ?? false} />
              </span>
            </div>

            <button
              onClick={handleCheckInverse}
              disabled={!inverseUserAns}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              <Check size={16} />
              <BopomofoText text="檢查答案並進行驗算" showBpmf={bopomofoEnabled ?? false} />
            </button>

            {/* 回饋訊息 */}
            {inverseFeedback && (
              <div className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-black text-center ${
                inverseFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                <BopomofoText text={inverseFeedback.text} showBpmf={bopomofoEnabled ?? false} />
              </div>
            )}

            {/* 下一題按鈕 */}
            {inverseFeedback?.isCorrect && (
              <button
                onClick={() => handleSwitchInverseQ((inverseQIdx + 1) % inverseQuestions.length)}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-xl shadow-md btn-fun flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <BopomofoText text="挑戰下一道互逆偵探題" showBpmf={bopomofoEnabled ?? false} /> <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
