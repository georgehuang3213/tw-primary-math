import React, { useState, useEffect } from 'react';
import { RotateCcw, Check, HelpCircle } from 'lucide-react';
import { soundFx } from '../../services/audio';

interface VerticalArithmeticProps {
  operation: 'add' | 'sub';
  num1?: number; // 被加數 / 被減數
  num2?: number; // 加數 / 減數
  interactive?: boolean;
  onComplete?: (isCorrect: boolean) => void;
}

export const VerticalArithmetic: React.FC<VerticalArithmeticProps> = ({
  operation = 'add',
  num1 = operation === 'add' ? 38 : 52,
  num2 = operation === 'add' ? 27 : 18,
  interactive = true,
  onComplete
}) => {
  // 拆解位值
  const n1Tens = Math.floor(num1 / 10);
  const n1Ones = num1 % 10;
  const n2Tens = Math.floor(num2 / 10);
  const n2Ones = num2 % 10;

  const isAddition = operation === 'add';
  const requiresRegroup = isAddition
    ? n1Ones + n2Ones >= 10
    : n1Ones < n2Ones;

  // 使用者輸入狀態
  const [carry, setCarry] = useState<string>(''); // 進位 1
  const [borrowTens, setBorrowTens] = useState<string>(''); // 十位被借位後的值 (如 5 變 4)
  const [borrowOnes, setBorrowOnes] = useState<string>(''); // 個位拿到的 10
  const [ansOnes, setAnsOnes] = useState<string>('');
  const [ansTens, setAnsTens] = useState<string>('');
  const [step, setStep] = useState<number>(0); // 0: 算個位, 1: 進退位標記, 2: 算十位, 3: 完成
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    handleReset();
  }, [num1, num2, operation]);

  const handleReset = () => {
    setCarry('');
    setBorrowTens('');
    setBorrowOnes('');
    setAnsOnes('');
    setAnsTens('');
    setStep(0);
    setFeedback(null);
  };

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

  return (
    <div className="flex flex-col items-center bg-white p-5 sm:p-7 rounded-3xl border-4 border-amber-300 shadow-md max-w-sm mx-auto">
      {/* 標題與說明 */}
      <div className="flex items-center justify-between w-full border-b-2 border-amber-100 pb-2 mb-4">
        <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
          {isAddition ? '➕ 直式進位加法' : '➖ 直式借位退位減法'}
        </span>
        <button
          onClick={handleReset}
          className="text-xs text-slate-500 hover:text-amber-700 flex items-center gap-1 font-bold"
        >
          <RotateCcw size={13} /> 重新計算
        </button>
      </div>

      {/* 台灣國小直式算則黑板 */}
      <div className="relative bg-slate-900 text-white font-mono p-6 rounded-2xl shadow-inner w-56 flex flex-col items-center">
        {/* 位值標題：十位、個位 */}
        <div className="grid grid-cols-2 w-36 text-center text-xs font-bold text-amber-400 border-b border-slate-700 pb-1 mb-2">
          <span>十位</span>
          <span>個位</span>
        </div>

        {/* 頂端標記區（進位 1 或借位 10 與劃掉標記） */}
        <div className="grid grid-cols-2 w-36 text-center h-7 items-center mb-1 text-sm">
          {/* 十位頂端標記 */}
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

          {/* 個位頂端借位 10 標記 */}
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

        {/* 第一行：被加數 / 被減數 */}
        <div className="relative flex justify-end w-36 text-3xl font-black tracking-widest text-slate-100 py-1">
          <span className={`w-16 text-center ${!isAddition && borrowTens ? 'line-through text-slate-500' : ''}`}>
            {n1Tens}
          </span>
          <span className="w-16 text-center">{n1Ones}</span>
        </div>

        {/* 第二行：運算符號 + 加數 / 減數 */}
        <div className="relative flex items-center justify-between w-44 text-3xl font-black tracking-widest text-slate-100 py-1">
          <span className="text-amber-400 font-sans text-2xl font-black">{isAddition ? '＋' : '－'}</span>
          <div className="flex w-36 justify-end">
            <span className="w-16 text-center">{n2Tens}</span>
            <span className="w-16 text-center">{n2Ones}</span>
          </div>
        </div>

        {/* 直式橫線 */}
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

      {/* 提示解說與步驟引導 */}
      <div className="mt-4 w-full text-xs bg-amber-50 p-3 rounded-xl border border-amber-200 text-slate-700">
        {isAddition ? (
          <div>
            <p className="font-bold text-amber-900 mb-1">💡 計算小撇步：</p>
            <p>1. 先算個位：{n1Ones} + {n2Ones} = {n1Ones + n2Ones}</p>
            {requiresRegroup ? (
              <p className="text-rose-600 font-bold">👉 滿十了！個位填 {(n1Ones + n2Ones) % 10}，十位頭上寫小小的 1！</p>
            ) : (
              <p className="text-emerald-700 font-bold">👉 沒滿十，個位直接填 {n1Ones + n2Ones}。</p>
            )}
            <p>2. 再算十位：{n1Tens} + {n2Tens} {requiresRegroup ? '+ 1(進位)' : ''} = {actualAnsTens}</p>
          </div>
        ) : (
          <div>
            <p className="font-bold text-amber-900 mb-1">💡 計算小撇步：</p>
            <p>1. 先看個位：{n1Ones} 減 {n2Ones}</p>
            {requiresRegroup ? (
              <p className="text-rose-600 font-bold">👉 不夠減！把十位 {n1Tens} 劃掉借1變 {n1Tens - 1}，個位拿到 10，10 - {n2Ones} + {n1Ones} = {actualAnsOnes}！</p>
            ) : (
              <p className="text-emerald-700 font-bold">👉 夠減，個位填 {n1Ones - n2Ones}。</p>
            )}
            <p>2. 再算十位：{requiresRegroup ? n1Tens - 1 : n1Tens} - {n2Tens} = {actualAnsTens}</p>
          </div>
        )}
      </div>

      {/* 檢查按鈕 */}
      {interactive && (
        <button
          onClick={checkAnswer}
          disabled={!ansOnes || !ansTens}
          className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-2xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          <Check size={18} /> 檢查直式算式
        </button>
      )}

      {/* 回饋訊息 */}
      {feedback && (
        <div className="mt-3 text-center text-sm font-black text-amber-900 animate-bounce-short">
          {feedback}
        </div>
      )}
    </div>
  );
};
