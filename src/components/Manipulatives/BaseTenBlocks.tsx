import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';
import { soundFx } from '../../services/audio';

interface BaseTenBlocksProps {
  initialHundreds?: number;
  initialTens?: number;
  initialOnes?: number;
  onValueChange?: (total: number) => void;
  interactive?: boolean;
  unitId?: string;
  grade?: number;
}

export const BaseTenBlocks: React.FC<BaseTenBlocksProps> = ({
  initialHundreds = 0,
  initialTens = 2,
  initialOnes = 5,
  onValueChange,
  interactive = true,
  unitId,
  grade = 1
}) => {
  // 當前子分頁：'placeValue'（位值積木板）或 'tenPack'（10顆拼成一條十與跳數點數）
  const [activeTab, setActiveTab] = useState<'placeValue' | 'tenPack'>(
    unitId === 'g1-u8-num30' ? 'tenPack' : 'placeValue'
  );

  const [hundreds, setHundreds] = useState(initialHundreds);
  const [tens, setTens] = useState(initialTens);
  const [ones, setOnes] = useState(initialOnes);

  // 跳數模式設定 (2個一數、5個一數、10個一數)
  const [skipStep, setSkipStep] = useState<2 | 5 | 10>(2);
  const [skipCount, setSkipCount] = useState<number>(2);

  const total = hundreds * 100 + tens * 10 + ones;

  const updateBlocks = (h: number, t: number, o: number) => {
    soundFx.playPop();
    setHundreds(h);
    setTens(t);
    setOnes(o);
    if (onValueChange) {
      onValueChange(h * 100 + t * 10 + o);
    }
  };

  const handleReset = () => {
    soundFx.playPop();
    updateBlocks(0, 0, 0);
  };

  // 滿 10 顆個位積木打包組合成 1 條十
  const handlePackTen = () => {
    if (ones >= 10) {
      soundFx.playCorrect();
      updateBlocks(hundreds, tens + 1, ones - 10);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-amber-50/80 p-4 sm:p-6 rounded-3xl border-2 border-amber-200 max-w-xl mx-auto w-full">
      {/* 頂部切換模式按鈕（支援任務要求的：10顆拼成一條十與跳數點數） */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-white/90 p-1.5 rounded-2xl border-2 border-amber-300 shadow-sm">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('tenPack');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeTab === 'tenPack'
                ? 'bg-amber-500 text-amber-950 shadow-md'
                : 'text-slate-600 hover:bg-amber-100'
            }`}
          >
            <span>📦</span>
            <span>滿10顆拼成一條十與跳數</span>
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('placeValue');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeTab === 'placeValue'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-sky-50'
            }`}
          >
            <span>🧱</span>
            <span>十進位積木定位板</span>
          </button>
        </div>

        {activeTab === 'placeValue' && (
          <div className="flex items-center gap-2">
            <div className="text-xl sm:text-2xl font-black text-amber-600 font-mono">
              = {total}
            </div>
            {interactive && (
              <button
                onClick={handleReset}
                className="p-1.5 text-slate-400 hover:text-amber-700 rounded-lg"
                title="清空"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ================= 模式一：滿10顆拼成一條十與跳數（完全對齊任務） ================= */}
      {activeTab === 'tenPack' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          {/* 滿10拼成一條十操作區 */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-amber-950 flex items-center gap-1.5">
                <span>📦</span>
                <span>把 10 顆單獨的小積木，打包拼成 1 條十：</span>
              </span>
              <span className="text-xs font-bold text-slate-500">
                目前：{tens} 條十，{ones} 個一（共 {tens * 10 + ones}）
              </span>
            </div>

            <div className="flex items-center gap-4 bg-amber-50/60 p-3 rounded-xl border border-amber-200 justify-around">
              {/* 十的條數 */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-sky-700 mb-1">十位（條十）</span>
                <div className="flex gap-1 items-end min-h-[70px]">
                  {Array.from({ length: tens }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3.5 h-16 bg-sky-500 border border-sky-700 rounded shadow-sm flex flex-col justify-between py-0.5 px-[1px]"
                      title="1條十"
                    >
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="h-2 bg-sky-300/50 rounded-[1px]"></div>
                      ))}
                    </div>
                  ))}
                  {tens === 0 && <span className="text-xs text-slate-400 font-bold self-center">無</span>}
                </div>
              </div>

              {/* 打包箭頭按鈕 */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={handlePackTen}
                  disabled={ones < 10}
                  className={`px-3 py-2 rounded-xl font-black text-xs shadow transition flex items-center gap-1 ${
                    ones >= 10
                      ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 animate-bounce'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>滿10顆拼成一條十</span>
                  <ArrowRight size={14} />
                </button>
                <span className="text-[10px] text-slate-500 font-bold">
                  {ones >= 10 ? '✨ 滿 10 個了，點我打包！' : `還差 ${10 - ones} 個滿 10`}
                </span>
              </div>

              {/* 一的個數 */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-amber-700 mb-1">個位（單獨小積木）</span>
                <div className="flex flex-wrap gap-1 w-28 min-h-[70px] content-start">
                  {Array.from({ length: ones }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-amber-400 border border-amber-600 rounded-sm shadow-sm"
                      title="1個"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* 個位增減控制 */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold text-slate-600">手動增加或減少單獨積木：</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOnes(p => Math.max(0, p - 1))}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-rose-100 text-slate-700 rounded-lg text-xs font-black"
                >
                  - 1 個
                </button>
                <button
                  onClick={() => setOnes(p => (tens * 10 + p < 30 ? p + 1 : p))}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-black"
                >
                  + 1 個
                </button>
                <button
                  onClick={() => setOnes(p => (tens * 10 + p + 5 <= 30 ? p + 5 : p))}
                  className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-lg text-xs font-black"
                >
                  + 5 個
                </button>
              </div>
            </div>
          </div>

          {/* 2、5、10 跳數點數挑戰區 */}
          <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <span>🏃</span>
                <span>練習 2、5、10 跳數點數：</span>
              </span>

              {/* 切換跳數間隔 */}
              <div className="flex gap-1">
                {([2, 5, 10] as const).map(step => (
                  <button
                    key={step}
                    onClick={() => {
                      soundFx.playPop();
                      setSkipStep(step);
                      setSkipCount(step);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition ${
                      skipStep === step
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                    }`}
                  >
                    {step} 個一數
                  </button>
                ))}
              </div>
            </div>

            {/* 跳數軌道動畫與當前數字 */}
            <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800">當前數到：</span>
                <span className="text-3xl font-black text-emerald-700 font-mono">
                  {skipCount}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  （{skipStep === 2 ? '雙雙對對數' : skipStep === 5 ? '五十五十數' : '滿十快速數'}）
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundFx.playPop();
                    setSkipCount(p => Math.max(skipStep, p - skipStep));
                  }}
                  disabled={skipCount <= skipStep}
                  className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-900 rounded-xl text-xs font-black hover:bg-emerald-100 disabled:opacity-40"
                >
                  倒數 -{skipStep}
                </button>
                <button
                  onClick={() => {
                    soundFx.playCorrect();
                    setSkipCount(p => (p + skipStep <= 30 ? p + skipStep : p));
                  }}
                  disabled={skipCount >= 30}
                  className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-black shadow hover:bg-emerald-700 disabled:opacity-40"
                >
                  跳數 +{skipStep} ➔
                </button>
                <button
                  onClick={() => {
                    soundFx.playPop();
                    setSkipCount(skipStep);
                  }}
                  className="p-1.5 text-slate-400 hover:text-emerald-700 rounded-lg"
                  title="重新從頭數"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* 30 以內跳數軌道標記 */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {Array.from({ length: 30 / skipStep }).map((_, i) => {
                const val = (i + 1) * skipStep;
                const isReached = val <= skipCount;
                const isCurrent = val === skipCount;
                return (
                  <button
                    key={val}
                    onClick={() => {
                      soundFx.playPop();
                      setSkipCount(val);
                    }}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-black flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-emerald-600 text-white scale-110 shadow ring-2 ring-emerald-300'
                        : isReached
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= 模式二：十進位積木定位板 ================= */}
      {activeTab === 'placeValue' && (
        <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-inner min-h-[220px]">
          {/* 百位 (100) */}
          <div className="flex flex-col items-center border-r-2 border-dashed border-slate-200 pr-2">
            <div className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full mb-2">
              百位 ({hundreds})
            </div>
            <div className="flex-1 flex flex-wrap gap-1.5 justify-center items-start content-start overflow-y-auto max-h-44 p-1">
              {Array.from({ length: hundreds }).map((_, i) => (
                <div
                  key={i}
                  className="w-14 h-14 bg-emerald-500 border-2 border-emerald-700 rounded shadow-md grid grid-cols-5 grid-rows-5 gap-0.5 p-0.5"
                  title="100個積木大方板"
                >
                  {Array.from({ length: 25 }).map((_, j) => (
                    <div key={j} className="bg-emerald-300/40 rounded-[1px]"></div>
                  ))}
                </div>
              ))}
            </div>
            {interactive && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 w-full justify-center">
                <button
                  onClick={() => updateBlocks(Math.max(0, hundreds - 1), tens, ones)}
                  disabled={hundreds <= 0}
                  className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-700 disabled:opacity-30"
                >
                  <Minus size={12} />
                </button>
                <span className="font-bold text-xs">{hundreds}</span>
                <button
                  onClick={() => updateBlocks(Math.min(9, hundreds + 1), tens, ones)}
                  disabled={hundreds >= 9}
                  className="p-1 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700 disabled:opacity-30"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>

          {/* 十位 (10) */}
          <div className="flex flex-col items-center border-r-2 border-dashed border-slate-200 pr-2">
            <div className="text-xs font-black text-sky-800 bg-sky-100 px-2.5 py-1 rounded-full mb-2">
              十位 ({tens})
            </div>
            <div className="flex-1 flex flex-wrap gap-1.5 justify-center items-start content-start overflow-y-auto max-h-44 p-1">
              {Array.from({ length: tens }).map((_, i) => (
                <div
                  key={i}
                  className="w-3.5 h-16 bg-sky-500 border border-sky-700 rounded shadow-sm flex flex-col justify-between py-0.5 px-[1px]"
                  title="10個積木長條"
                >
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-2 bg-sky-300/50 rounded-[1px]"></div>
                  ))}
                </div>
              ))}
            </div>
            {interactive && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 w-full justify-center">
                <button
                  onClick={() => updateBlocks(hundreds, Math.max(0, tens - 1), ones)}
                  disabled={tens <= 0}
                  className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-700 disabled:opacity-30"
                >
                  <Minus size={12} />
                </button>
                <span className="font-bold text-xs">{tens}</span>
                <button
                  onClick={() => updateBlocks(hundreds, Math.min(19, tens + 1), ones)}
                  className="p-1 rounded bg-slate-100 hover:bg-sky-100 text-slate-700"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>

          {/* 個位 (1) */}
          <div className="flex flex-col items-center">
            <div className="text-xs font-black text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full mb-2">
              個位 ({ones})
            </div>
            <div className="flex-1 flex flex-wrap gap-1.5 justify-center items-start content-start overflow-y-auto max-h-44 p-1">
              {Array.from({ length: ones }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-amber-400 border border-amber-600 rounded-sm shadow-sm"
                  title="1個小積木"
                ></div>
              ))}
            </div>
            {interactive && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 w-full justify-center">
                <button
                  onClick={() => updateBlocks(hundreds, tens, Math.max(0, ones - 1))}
                  disabled={ones <= 0}
                  className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-700 disabled:opacity-30"
                >
                  <Minus size={12} />
                </button>
                <span className="font-bold text-xs">{ones}</span>
                <button
                  onClick={() => updateBlocks(hundreds, tens, Math.min(29, ones + 1))}
                  className="p-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-700"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

