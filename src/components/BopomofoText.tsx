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

        // 台灣標準國小教科書黃金比例：國字特大醒目主體（大字體）、注音微縮精緻側標
        const { symbols, tone } = parseBpmfTone(item.bpmf);

        // 依據注音符號個數（1~3個）動態設定注音字級，小巧依附於大國字右側
        const symCount = symbols.length || 1;
        const symFontSize = symCount === 1 ? 'text-[0.36em]' : symCount === 2 ? 'text-[0.29em]' : 'text-[0.24em]';

        return (
          <span
            key={idx}
            className="inline-flex items-center leading-none mx-[1px] my-[1px] select-none align-middle"
          >
            {/* 國字本體（顯著大於注音，大字體、字正腔圓、清晰好認） */}
            <span className="text-[1.22em] leading-none textbook-char tracking-normal font-extrabold">
              {item.char}
            </span>

            {/* 國字右側垂直直排注音欄（微縮精緻、緊貼右側、不喧賓奪主） */}
            <span className="bpmf-col inline-flex flex-row items-center ml-[1.5px] mr-[1px] select-none justify-center">
              {/* 輕聲置於注音符號正上方（精巧圓點） */}
              <span className={`flex flex-col items-center justify-center ${symFontSize} leading-[0.92] text-slate-700 bpmf-symbol tracking-tighter`}>
                {tone === '˙' && (
                  <span className="text-[0.8em] font-bold -mb-[1px] leading-none text-slate-700 font-mono">˙</span>
                )}
                {symbols.map((sym, sIdx) => (
                  <span key={sIdx} className="leading-none bpmf-symbol">{sym}</span>
                ))}
              </span>

              {/* 二聲、三聲、四聲標記於注音符號右側（細緻清晰標記） */}
              {tone && tone !== '˙' && (
                <span className="text-[0.45em] leading-none text-slate-700 bpmf-symbol ml-[0.5px] self-center select-none">
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
