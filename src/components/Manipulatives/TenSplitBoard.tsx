import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Sparkles } from 'lucide-react';
import { soundFx } from '../../services/audio';

interface TenSplitBoardProps {
  totalCount?: number;
  interactive?: boolean;
  mode?: 'split' | 'add' | 'sub' | 'make10' | 'break10';
  unitId?: string;
}

export const TenSplitBoard: React.FC<TenSplitBoardProps> = ({
  totalCount = 10,
  interactive = true,
  mode: propMode,
  unitId
}) => {
  // 自動判定模式：
  // 若是 一下第三單元 (g1-u12-sub20)，任務是「打開一整盒10顆花片，練習破十扣減與加法驗算」，直接預設 'break10'！
  // 若是 一下第一單元 (g1-u10-add20)，任務是「搬移花片湊成10，驗證加法交換律與湊十法」，直接預設 'make10'！
  // 若是一上第四單元加法 (u4) 則預設 'add'
  // 若是一上第六單元減法 (u6) 則預設 'sub'
  // 若是分與合 (u9) 則預設 'split'
  const initialMode = propMode || (
    unitId === 'g1-u12-sub20' ? 'break10' :
    unitId === 'g1-u10-add20' ? 'make10' :
    unitId?.includes('add') ? 'add' :
    unitId?.includes('sub') ? 'sub' :
    'split'
  );

  const [mode, setMode] = useState<'split' | 'add' | 'sub' | 'make10' | 'break10'>(initialMode);

  // 破十法模式 (例如 13 - 5 = 8)：
  // 被減數 13 = 10 (一盒) + 3 (散裝)
  // 減數 5：散裝 3 顆不夠減 5，所以打開整盒 10 顆來扣！
  // 10 - 5 = 5，剩下的 5 加回散裝 3 = 8
  const [breakTotal, setBreakTotal] = useState<number>(13); // 十幾 (11~18)
  const [breakMinus, setBreakMinus] = useState<number>(5);  // 減數 (2~9)
  const [isBoxOpened, setIsBoxOpened] = useState<boolean>(false); // 是否打開一整盒10顆扣減
  const [showCheckAdd, setShowCheckAdd] = useState<boolean>(false); // 是否顯示加法驗算 (8 + 5 = 13)

  const breakOnes = breakTotal - 10; // 散裝個位數 (如 13 的 3)
  const breakRemainFromTen = Math.max(0, 10 - breakMinus); // 10 扣掉減數剩下的 (如 10 - 5 = 5)
  const breakFinalAnswer = breakTotal - breakMinus; // 最終答案 (如 8)

  // 湊十法與加法交換律模式 (8 + 5 = 13)
  const [numA, setNumA] = useState<number>(8);
  const [numB, setNumB] = useState<number>(5);
  const [isMovedToTen, setIsMovedToTen] = useState<boolean>(false); // 是否已搬移花片湊成10

  // 8 需要 2 顆湊成 10
  const needToTen = Math.max(0, 10 - numA);
  const actualMoved = Math.min(numB, needToTen);
  const remainingB = numB - actualMoved;

  // 加法模式的兩組數量 (add1 + add2)
  const [add1, setAdd1] = useState<number>(4);
  const [add2, setAdd2] = useState<number>(3);
  const [addType, setAddType] = useState<'merge' | 'append'>('merge'); // 併合型 或 添加型

  // 減法模式 (subTotal - subMinus)
  const [subTotal, setSubTotal] = useState<number>(7);
  const [subMinus, setSubMinus] = useState<number>(3);

  // 分與合模式
  const [chips, setChips] = useState<boolean[]>(
    Array.from({ length: totalCount }, (_, i) => i < 6) // 預設 6 紅 4 黃
  );

  const toggleChip = (index: number) => {
    soundFx.playPop();
    setChips(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const redCount = chips.filter(Boolean).length;
  const yellowCount = chips.length - redCount;

  const setSplit = (r: number) => {
    soundFx.playPop();
    setChips(Array.from({ length: totalCount }, (_, i) => i < r));
  };

  return (
    <div className="flex flex-col items-center bg-rose-50/70 p-4 sm:p-6 rounded-3xl border-2 border-rose-200 max-w-xl mx-auto w-full">
      {/* 頂部切換模式標籤 */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center bg-white/90 p-1.5 rounded-2xl border-2 border-rose-200 shadow-sm mb-4">
        <button
          onClick={() => {
            soundFx.playPop();
            setMode('break10');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
            mode === 'break10'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-rose-50'
          }`}
        >
          <span>🍓</span>
          <span>打開整盒破十與驗算</span>
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            setMode('make10');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
            mode === 'make10'
              ? 'bg-amber-500 text-amber-950 shadow-md'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          <span>🐿️</span>
          <span>搬移湊十與交換律</span>
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            setMode('add');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
            mode === 'add'
              ? 'bg-emerald-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-emerald-50'
          }`}
        >
          <Plus size={15} />
          <span>加法（併合/添加）</span>
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            setMode('sub');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
            mode === 'sub'
              ? 'bg-pink-500 text-white shadow-md'
              : 'text-slate-600 hover:bg-pink-50'
          }`}
        >
          <Minus size={15} />
          <span>減法（10以內拿走）</span>
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            setMode('split');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
            mode === 'split'
              ? 'bg-amber-500 text-amber-950 shadow-md'
              : 'text-slate-600 hover:bg-amber-50'
          }`}
        >
          <span>🟡</span>
          <span>10的分與合</span>
        </button>
      </div>

      {/* ================= 模式 0：一下第三單元專屬「打開一整盒破十與加法驗算」 ================= */}
      {mode === 'break10' && (
        <div className="w-full flex flex-col items-center animate-fade-in gap-4">
          {/* 破十情境卡片與算式 */}
          <div className="bg-white p-4 rounded-2xl border-2 border-rose-300 shadow-sm w-full text-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-rose-900 bg-rose-100 px-3 py-1 rounded-full">
                🍓 猴子分草莓：{breakTotal} 顆要分給小兔 {breakMinus} 顆
              </span>
              <button
                onClick={() => {
                  soundFx.playPop();
                  setShowCheckAdd(!showCheckAdd);
                }}
                className={`px-3 py-1 font-black text-xs rounded-xl shadow-sm transition flex items-center gap-1 ${
                  showCheckAdd
                    ? 'bg-emerald-500 text-white'
                    : 'bg-emerald-100 text-emerald-950 hover:bg-emerald-200'
                }`}
              >
                <span>🔍 加法驗算：{breakFinalAnswer} + {breakMinus} = {breakTotal}</span>
              </button>
            </div>

            {/* 算式方塊 */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-indigo-500 mb-1">
                  原本有（一盒10+散裝{breakOnes}）
                </span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {breakTotal}
                </span>
              </div>

              <span className="text-3xl font-black text-rose-500">－</span>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-rose-500 mb-1">分給小兔</span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {breakMinus}
                </span>
              </div>

              <span className="text-3xl font-black text-slate-400">＝</span>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-amber-600 mb-1">剩下</span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 text-amber-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {breakFinalAnswer}
                </span>
              </div>
            </div>

            {/* 破十口訣動態解析 */}
            <div className="mt-3 text-xs sm:text-sm font-black text-slate-700 pt-2 border-t border-rose-100 leading-relaxed">
              {!isBoxOpened ? (
                <span>
                  💡 散裝只有 <span className="text-sky-600">{breakOnes}</span> 顆，不夠分 <span className="text-rose-600">{breakMinus}</span> 顆！請點擊下方按鈕【打開整盒 10 顆】來扣！
                </span>
              ) : (
                <span>
                  🎉 破十成功！打開整盒 10 顆：<span className="text-purple-700 font-extrabold">10 － {breakMinus} ＝ {breakRemainFromTen}</span> 顆，再把 {breakRemainFromTen} 顆加回散裝的 {breakOnes} 顆，剛好剩下 <span className="text-amber-600 font-extrabold">{breakFinalAnswer}</span> 顆！
                </span>
              )}
            </div>
          </div>

          {/* 兩盒花片視覺：整盒(10顆破開) 與 散裝(breakOnes顆) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            {/* 一整盒（10 顆） */}
            <div className="bg-white p-3.5 rounded-2xl border-2 border-purple-200 shadow-sm flex-1 flex flex-col items-center">
              <span className="text-xs font-black text-purple-700 mb-2">
                📦 一整盒（10 顆草莓花片）{isBoxOpened ? '：已打開扣掉 ' + breakMinus + ' 顆！' : '：密封中'}
              </span>
              <div className="grid grid-cols-5 gap-2 w-full max-w-[200px]">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const isDeducted = isBoxOpened && idx < breakMinus;
                  return (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-full font-black text-xs shadow border flex items-center justify-center transition-all ${
                        !isBoxOpened
                          ? 'bg-purple-600 border-purple-700 text-white'
                          : isDeducted
                          ? 'bg-rose-100 border-2 border-dashed border-rose-400 text-rose-500 line-through opacity-60'
                          : 'bg-purple-500 border-purple-600 text-white scale-105'
                      }`}
                    >
                      {isDeducted ? '✖' : idx + 1}
                    </div>
                  );
                })}
              </div>
              <span className="text-[11px] font-bold text-slate-500 mt-2">
                {isBoxOpened ? `整盒剩下 ${breakRemainFromTen} 顆` : '整盒滿滿 10 顆'}
              </span>
            </div>

            {/* 散裝（個位數顆） */}
            <div className="bg-white p-3.5 rounded-2xl border-2 border-sky-200 shadow-sm flex-1 flex flex-col items-center">
              <span className="text-xs font-black text-sky-700 mb-2">
                🍓 散裝草莓（個位數：{breakOnes} 顆）
              </span>
              <div className="grid grid-cols-5 gap-2 w-full max-w-[200px]">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const isPresent = idx < breakOnes;
                  return (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-full font-black text-xs shadow border flex items-center justify-center transition-all ${
                        isPresent
                          ? 'bg-sky-500 border-sky-600 text-white'
                          : 'bg-slate-100 border-dashed border-slate-300 text-slate-300'
                      }`}
                    >
                      {isPresent ? '散' : idx + 1}
                    </div>
                  );
                })}
              </div>
              <span className="text-[11px] font-bold text-slate-500 mt-2">
                散裝 {breakOnes} 顆不夠扣，原封不動留著
              </span>
            </div>
          </div>

          {/* 打開整盒破十按鈕 */}
          <div className="flex gap-3 items-center justify-center w-full">
            <button
              onClick={() => {
                soundFx.playCorrect();
                setIsBoxOpened(!isBoxOpened);
              }}
              className={`px-5 py-2.5 rounded-2xl font-black text-sm shadow-md transition flex items-center gap-2 ${
                !isBoxOpened
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-bounce'
                  : 'bg-slate-600 hover:bg-slate-700 text-white'
              }`}
            >
              <span>{isBoxOpened ? '↩️ 把整盒重新裝回' : '🍓 打開一整盒 10 顆扣減！'}</span>
            </button>
          </div>

          {/* 調整數值控制 */}
          <div className="flex gap-2.5 justify-center flex-wrap text-xs font-bold text-slate-600">
            <span>十幾總數：</span>
            {[11, 12, 13, 14, 15].map(v => (
              <button
                key={v}
                onClick={() => {
                  setBreakTotal(v);
                  setIsBoxOpened(false);
                }}
                className={`px-2 py-0.5 rounded ${breakTotal === v ? 'bg-indigo-600 text-white' : 'bg-white border border-indigo-200'}`}
              >
                {v}
              </button>
            ))}
            <span className="ml-2">扣減數量：</span>
            {[4, 5, 6, 7, 8, 9].map(v => (
              <button
                key={v}
                onClick={() => {
                  setBreakMinus(v);
                  setIsBoxOpened(false);
                }}
                className={`px-2 py-0.5 rounded ${breakMinus === v ? 'bg-rose-600 text-white' : 'bg-white border border-rose-200'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= 模式一：一下第一單元專屬「搬移花片湊成10與交換律」 ================= */}
      {mode === 'make10' && (
        <div className="w-full flex flex-col items-center animate-fade-in gap-4">
          {/* 算式與交換律展示 */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-sm w-full text-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                加法交換律：{numA} ＋ {numB} ＝ {numB} ＋ {numA}
              </span>
              <button
                onClick={() => {
                  soundFx.playPop();
                  const temp = numA;
                  setNumA(numB);
                  setNumB(temp);
                  setIsMovedToTen(false);
                }}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs rounded-xl shadow-sm transition"
              >
                🔄 對調交換位置
              </button>
            </div>

            {/* 算式方塊 */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-rose-500 mb-1">紅蘋果</span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {numA}
                </span>
              </div>

              <span className="text-3xl font-black text-amber-500">＋</span>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-sky-500 mb-1">青蘋果</span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {numB}
                </span>
              </div>

              <span className="text-3xl font-black text-slate-400">＝</span>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-amber-600 mb-1">總數</span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 text-amber-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {numA + numB}
                </span>
              </div>
            </div>

            {/* 湊十口訣動態解析 */}
            <div className="mt-3 text-xs sm:text-sm font-black text-slate-700 pt-2 border-t border-amber-100 leading-relaxed">
              {!isMovedToTen ? (
                <span>
                  💡 湊十法秘訣：<span className="text-rose-600">{numA}</span> 還需要 <span className="text-sky-600">{needToTen}</span> 個才能湊滿 10！點擊下方按鈕把花片搬過去吧！
                </span>
              ) : (
                <span>
                  🎉 成功湊十！從 {numB} 借走 {actualMoved} 個與 {numA} 湊成 <span className="text-amber-600 font-extrabold">10</span>，剩下 <span className="text-sky-600 font-extrabold">{remainingB}</span> 個，合起來是 <span className="text-rose-600 font-extrabold">{numA + numB}</span>！
                </span>
              )}
            </div>
          </div>

          {/* 兩個十格陣對比：第一盒（湊成10）與第二盒（剩餘） */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            {/* 第一盒（目標湊成 10） */}
            <div className="bg-white p-3.5 rounded-2xl border-2 border-rose-200 shadow-sm flex-1 flex flex-col items-center">
              <span className="text-xs font-black text-rose-700 mb-2">
                第一盒（{isMovedToTen ? '湊滿 10 個！' : `有 ${numA} 個，還缺 ${needToTen} 個`}）
              </span>
              <div className="grid grid-cols-5 gap-2 w-full max-w-[200px]">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const isOriginalRed = idx < numA;
                  const isMovedIn = isMovedToTen && idx >= numA && idx < numA + actualMoved;
                  return (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-full font-black text-xs shadow border flex items-center justify-center transition-all ${
                        isOriginalRed
                          ? 'bg-rose-500 border-rose-600 text-white'
                          : isMovedIn
                          ? 'bg-sky-500 border-sky-600 text-white animate-bounce'
                          : 'bg-slate-100 border-dashed border-slate-300 text-slate-300'
                      }`}
                    >
                      {isOriginalRed ? '紅' : isMovedIn ? '借' : idx + 1}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 第二盒（被借走後的剩餘） */}
            <div className="bg-white p-3.5 rounded-2xl border-2 border-sky-200 shadow-sm flex-1 flex flex-col items-center">
              <span className="text-xs font-black text-sky-700 mb-2">
                第二盒（{isMovedToTen ? `借出 ${actualMoved} 個，剩下 ${remainingB} 個` : `原本有 ${numB} 個`}）
              </span>
              <div className="grid grid-cols-5 gap-2 w-full max-w-[200px]">
                {Array.from({ length: 10 }).map((_, idx) => {
                  const isOriginalBlue = idx < numB;
                  const isBorrowed = isMovedToTen && idx < actualMoved;
                  const isRemain = isMovedToTen && idx >= actualMoved && idx < numB;
                  return (
                    <div
                      key={idx}
                      className={`w-8 h-8 rounded-full font-black text-xs shadow border flex items-center justify-center transition-all ${
                        !isOriginalBlue
                          ? 'bg-slate-100 border-dashed border-slate-300 text-slate-300'
                          : isBorrowed
                          ? 'bg-slate-200 border-dashed border-slate-400 text-slate-400 line-through opacity-60'
                          : 'bg-sky-500 border-sky-600 text-white'
                      }`}
                    >
                      {isBorrowed ? '借' : isOriginalBlue ? '青' : idx + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 搬移湊十動作按鈕 */}
          <div className="flex gap-3 items-center justify-center w-full">
            <button
              onClick={() => {
                soundFx.playCorrect();
                setIsMovedToTen(!isMovedToTen);
              }}
              className={`px-5 py-2.5 rounded-2xl font-black text-sm shadow-md transition flex items-center gap-2 ${
                !isMovedToTen
                  ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 animate-pulse'
                  : 'bg-slate-600 hover:bg-slate-700 text-white'
              }`}
            >
              <span>{isMovedToTen ? '↩️ 還原花片位置' : '🐿️ 搬移花片湊成 10！'}</span>
            </button>
          </div>

          {/* 調整數值控制 */}
          <div className="flex gap-3 justify-center text-xs font-bold text-slate-600">
            <span>紅蘋果 (8~9)：</span>
            {[9, 8, 7].map(v => (
              <button
                key={v}
                onClick={() => {
                  setNumA(v);
                  setIsMovedToTen(false);
                }}
                className={`px-2 py-0.5 rounded ${numA === v ? 'bg-rose-600 text-white' : 'bg-white border border-rose-200'}`}
              >
                {v}
              </button>
            ))}
            <span className="ml-2">青蘋果 (3~6)：</span>
            {[3, 4, 5, 6].map(v => (
              <button
                key={v}
                onClick={() => {
                  setNumB(v);
                  setIsMovedToTen(false);
                }}
                className={`px-2 py-0.5 rounded ${numB === v ? 'bg-sky-600 text-white' : 'bg-white border border-sky-200'}`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= 模式一：加法操作（併合型與添加型） ================= */}
      {mode === 'add' && (
        <div className="w-full flex flex-col items-center animate-fade-in">
          <div className="bg-white p-4 rounded-2xl border-2 border-emerald-200 shadow-sm w-full mb-4 text-center">
            {/* 併合型 / 添加型 切換 */}
            <div className="flex justify-center gap-2 mb-3">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setAddType('merge');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black ${
                  addType === 'merge'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                🍎 併合型（兩堆合起來）
              </button>
              <button
                onClick={() => {
                  soundFx.playPop();
                  setAddType('append');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black ${
                  addType === 'append'
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                🐦 添加型（原本有再飛來）
              </button>
            </div>

            {/* 算式卡片 */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-rose-500 mb-1">
                  {addType === 'merge' ? '紅蘋果' : '原本小鳥'}
                </span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {add1}
                </span>
              </div>

              <span className="text-3xl font-black text-emerald-600">＋</span>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-sky-500 mb-1">
                  {addType === 'merge' ? '青蘋果' : '飛來小鳥'}
                </span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {add2}
                </span>
              </div>

              <span className="text-3xl font-black text-slate-400">＝</span>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-amber-600 mb-1">一共有</span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 text-amber-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {add1 + add2}
                </span>
              </div>
            </div>

            <div className="mt-3 text-sm font-black text-slate-700 pt-2 border-t border-emerald-100">
              💡 算式：<span className="text-rose-600">{add1}</span> ＋ <span className="text-sky-600">{add2}</span> ＝ <span className="text-amber-600">{add1 + add2}</span>
              {add1 + add2 === 0 ? '（0 加 0 還是 0！）' : add2 === 0 ? '（加上 0，數量不變！）' : ''}
            </div>
          </div>

          {/* 十格陣視覺呈現（前 add1 顆紅色，接下來 add2 顆藍色，其餘空白） */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-inner grid grid-cols-5 gap-3 max-w-sm w-full">
            {Array.from({ length: 10 }).map((_, idx) => {
              const isFirst = idx < add1;
              const isSecond = idx >= add1 && idx < add1 + add2;
              return (
                <div
                  key={idx}
                  className={`w-12 h-12 rounded-full font-black text-xs shadow-md border-2 flex items-center justify-center transition-all ${
                    isFirst
                      ? 'bg-rose-500 border-rose-600 text-white scale-105'
                      : isSecond
                      ? 'bg-sky-500 border-sky-600 text-white scale-105'
                      : 'bg-slate-100 border-dashed border-slate-300 text-slate-300'
                  }`}
                >
                  {isFirst ? '紅' : isSecond ? '藍' : idx + 1}
                </div>
              );
            })}
          </div>

          {/* 調整加數控制 */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-rose-200 shadow-sm">
              <span className="text-xs font-bold text-rose-600">第一組：</span>
              <button
                onClick={() => setAdd1(p => Math.max(0, p - 1))}
                className="w-7 h-7 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-lg font-black flex items-center justify-center"
              >
                -
              </button>
              <span className="font-black w-6 text-center text-rose-700">{add1}</span>
              <button
                onClick={() => setAdd1(p => (p + add2 < 10 ? p + 1 : p))}
                className="w-7 h-7 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-black flex items-center justify-center"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-sky-200 shadow-sm">
              <span className="text-xs font-bold text-sky-600">第二組：</span>
              <button
                onClick={() => setAdd2(p => Math.max(0, p - 1))}
                className="w-7 h-7 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-lg font-black flex items-center justify-center"
              >
                -
              </button>
              <span className="font-black w-6 text-center text-sky-700">{add2}</span>
              <button
                onClick={() => setAdd2(p => (add1 + p < 10 ? p + 1 : p))}
                className="w-7 h-7 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-black flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 模式二：減法操作（拿走型與劃掉） ================= */}
      {mode === 'sub' && (
        <div className="w-full flex flex-col items-center animate-fade-in">
          <div className="bg-white p-4 rounded-2xl border-2 border-pink-200 shadow-sm w-full mb-4 text-center">
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-500 mb-1">原本有</span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-indigo-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {subTotal}
                </span>
              </div>

              <span className="text-3xl font-black text-pink-600">－</span>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-pink-500 mb-1">拿走/吃掉</span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-pink-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {subMinus}
                </span>
              </div>

              <span className="text-3xl font-black text-slate-400">＝</span>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-amber-600 mb-1">剩下</span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 text-amber-950 font-black text-2xl sm:text-3xl flex items-center justify-center shadow">
                  {subTotal - subMinus}
                </span>
              </div>
            </div>

            <div className="mt-3 text-sm font-black text-slate-700 pt-2 border-t border-pink-100">
              💡 算式：<span className="text-indigo-600">{subTotal}</span> － <span className="text-pink-600">{subMinus}</span> ＝ <span className="text-amber-600">{subTotal - subMinus}</span>
              {subMinus === 0 ? '（減去 0，數量不變！）' : subTotal === subMinus ? '（全部拿走，一個不剩等於 0！）' : ''}
            </div>
          </div>

          {/* 十格陣視覺呈現（原本 subTotal 顆，被拿走的劃叉叉，剩餘的發亮） */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-inner grid grid-cols-5 gap-3 max-w-sm w-full">
            {Array.from({ length: 10 }).map((_, idx) => {
              const isPresent = idx < subTotal;
              const isCrossed = idx >= subTotal - subMinus && idx < subTotal;
              return (
                <div
                  key={idx}
                  className={`w-12 h-12 rounded-full font-black text-xs shadow-md border-2 flex items-center justify-center transition-all ${
                    !isPresent
                      ? 'bg-slate-100 border-dashed border-slate-300 text-slate-300'
                      : isCrossed
                      ? 'bg-rose-100 border-rose-400 text-rose-500 line-through opacity-70'
                      : 'bg-indigo-500 border-indigo-600 text-white scale-105'
                  }`}
                >
                  {isCrossed ? '✖' : isPresent ? '●' : idx + 1}
                </div>
              );
            })}
          </div>

          {/* 調整減法數控制 */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-indigo-200 shadow-sm">
              <span className="text-xs font-bold text-indigo-600">原本總數：</span>
              <button
                onClick={() => {
                  setSubTotal(p => {
                    const next = Math.max(1, p - 1);
                    if (subMinus > next) setSubMinus(next);
                    return next;
                  });
                }}
                className="w-7 h-7 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 rounded-lg font-black flex items-center justify-center"
              >
                -
              </button>
              <span className="font-black w-6 text-center text-indigo-700">{subTotal}</span>
              <button
                onClick={() => setSubTotal(p => Math.min(10, p + 1))}
                className="w-7 h-7 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-black flex items-center justify-center"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-pink-200 shadow-sm">
              <span className="text-xs font-bold text-pink-600">拿走數量：</span>
              <button
                onClick={() => setSubMinus(p => Math.max(0, p - 1))}
                className="w-7 h-7 bg-pink-100 hover:bg-pink-200 text-pink-900 rounded-lg font-black flex items-center justify-center"
              >
                -
              </button>
              <span className="font-black w-6 text-center text-pink-700">{subMinus}</span>
              <button
                onClick={() => setSubMinus(p => Math.min(subTotal, p + 1))}
                className="w-7 h-7 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-black flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 模式三：10 的分與合 ================= */}
      {mode === 'split' && (
        <div className="w-full flex flex-col items-center animate-fade-in">
          {/* 分與合數字樹圖解 */}
          <div className="flex flex-col items-center bg-white p-4 rounded-2xl border-2 border-rose-200 shadow-sm w-full mb-4">
            <div className="flex items-center gap-6 text-center">
              {/* 總數 */}
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-400 font-bold mb-1">合起來是</span>
                <span className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 font-black text-2xl flex items-center justify-center shadow-md">
                  {totalCount}
                </span>
              </div>

              <div className="text-2xl text-slate-300 font-bold">➔</div>

              {/* 分成兩部分 */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-rose-500 font-bold mb-1">紅色花片</span>
                  <span className="w-14 h-14 rounded-2xl bg-rose-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
                    {redCount}
                  </span>
                </div>
                <span className="text-xl font-black text-slate-400">和</span>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-amber-500 font-bold mb-1">黃色花片</span>
                  <span className="w-14 h-14 rounded-2xl bg-amber-300 text-amber-950 font-black text-2xl flex items-center justify-center shadow-md">
                    {yellowCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 text-sm font-black text-slate-700 pt-2 border-t border-rose-100 w-full text-center">
              💡 {totalCount} 可以分成 <span className="text-rose-600">{redCount}</span> 和 <span className="text-amber-600">{yellowCount}</span> （{redCount} + {yellowCount} = {totalCount}）
            </div>
          </div>

          {/* 十格陣雙色花片操作盤 */}
          <div className="bg-white p-4 rounded-2xl border-2 border-slate-200 shadow-inner grid grid-cols-5 gap-3 max-w-sm w-full">
            {chips.map((isRed, idx) => (
              <button
                key={idx}
                onClick={() => interactive && toggleChip(idx)}
                className={`w-12 h-12 rounded-full font-black text-xs shadow-md border-2 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center select-none ${
                  isRed
                    ? 'bg-rose-500 border-rose-600 text-white'
                    : 'bg-amber-300 border-amber-400 text-amber-950'
                }`}
                title="點擊翻面換顏色"
              >
                {isRed ? '紅' : '黃'}
              </button>
            ))}
          </div>

          {/* 快捷拆分按鈕 */}
          {interactive && (
            <div className="mt-4 flex flex-wrap justify-center gap-1.5 w-full">
              <span className="w-full text-center text-xs font-bold text-slate-500 mb-1">
                點擊花片翻面，或點選快捷拆數：
              </span>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <button
                  key={n}
                  onClick={() => setSplit(n)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    redCount === n
                      ? 'bg-rose-600 text-white'
                      : 'bg-white hover:bg-rose-100 text-rose-900 border border-rose-200'
                  }`}
                >
                  {n}紅{totalCount - n}黃
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

