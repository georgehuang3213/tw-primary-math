import React from 'react';
import { parseToBopomofoChars, parseBpmfTone } from '../data/bopomofo';

interface BopomofoTextProps {
  text: string;
  bpmfText?: string;
  className?: string;
  showBpmf?: boolean;
  nowrap?: boolean;
  compact?: boolean;
}

export const BopomofoText: React.FC<BopomofoTextProps> = ({
  text,
  bpmfText,
  className = '',
  showBpmf = true,
  nowrap = false,
  compact = false
}) => {
  const contentToParse = bpmfText || text;
  const charList = parseToBopomofoChars(contentToParse);

  const wrapClass = nowrap ? 'flex-nowrap whitespace-nowrap' : 'flex-wrap';
  const gapClass = compact ? 'gap-x-0.5 gap-y-0.5' : 'gap-x-1 gap-y-1.5';

  return (
    <span className={`inline-flex ${wrapClass} items-center align-middle ${gapClass} ${className}`}>
      {charList.map((item, idx) => {
        // 非中文字（如數字、運算符號、標點、英文字母）直接輸出
        if (!item.isChinese || !showBpmf || !item.bpmf) {
          return (
            <span key={idx} className="text-inherit inline-block tracking-normal font-semibold textbook-char">
              {item.char}
            </span>
          );
        }

        // 台灣標準國小教科書黃金比例：國字大主體、注音粗體清晰（大於原先但嚴格不高於國字）
        const { symbols, tone } = parseBpmfTone(item.bpmf);

        // 依據注音符號個數（1~3個）動態設定注音字級，粗體醒目且高度絕不超過大國字（1.25em）
        const symCount = symbols.length || 1;
        const symFontSize = symCount === 1 ? 'text-[0.48em]' : symCount === 2 ? 'text-[0.38em]' : 'text-[0.31em]';

        return (
          <span
            key={idx}
            className="inline-flex items-center leading-none mx-[1px] my-[1px] select-none align-middle"
          >
            {/* 國字本體（特大號、標楷體、字正腔圓） */}
            <span className="text-[1.25em] leading-none textbook-char tracking-normal font-black">
              {item.char}
            </span>

            {/* 國字右側垂直直排注音欄（顯著加粗、字體適度放大、頂底不超過國字） */}
            <span className="bpmf-col inline-flex flex-row items-center ml-[1.5px] mr-[1px] select-none justify-center h-[1.2em]">
              {/* 輕聲置於注音符號正上方（加粗醒目圓點） */}
              <span className={`flex flex-col items-center justify-center ${symFontSize} leading-[0.9] text-slate-950 bpmf-symbol tracking-tighter`}>
                {tone === '˙' && (
                  <span className="text-[1.1em] font-black -mb-[1px] leading-none text-slate-950 font-mono">˙</span>
                )}
                {symbols.map((sym, sIdx) => (
                  <span key={sIdx} className="leading-none bpmf-symbol font-black">{sym}</span>
                ))}
              </span>

              {/* 二聲、三聲、四聲標記於注音符號右側（粗體深墨色） */}
              {tone && tone !== '˙' && (
                <span className="text-[0.62em] leading-none text-slate-950 bpmf-symbol font-black ml-[0.5px] self-center select-none">
                  {tone}
                </span>
              )}
            </span>
          </span>
        );
      })}
    </span>
  );
};
