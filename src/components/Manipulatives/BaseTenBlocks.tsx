import React, { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { soundFx } from '../../services/audio';

interface BaseTenBlocksProps {
  initialHundreds?: number;
  initialTens?: number;
  initialOnes?: number;
  onValueChange?: (total: number) => void;
  interactive?: boolean;
}

export const BaseTenBlocks: React.FC<BaseTenBlocksProps> = ({
  initialHundreds = 0,
  initialTens = 3,
  initialOnes = 5,
  onValueChange,
  interactive = true
}) => {
  const [hundreds, setHundreds] = useState(initialHundreds);
  const [tens, setTens] = useState(initialTens);
  const [ones, setOnes] = useState(initialOnes);

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
    updateBlocks(0, 0, 0);
  };

  return (
    <div className="flex flex-col gap-4 bg-amber-50/80 p-4 sm:p-6 rounded-3xl border-2 border-amber-200 max-w-xl mx-auto">
      {/* 總數值與位值定位板標題 */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border-2 border-amber-300 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">🧱</span>
          <span className="text-sm font-black text-slate-700">十進位積木定位板</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono">
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
      </div>

      {/* 定位板三欄：百位、十位、個位 */}
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
    </div>
  );
};
