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

        // 台灣標準國小教科書排版：國字大而清晰主體，注音小而細緻輔助
        const { symbols, tone } = parseBpmfTone(item.bpmf);

        // 依據注音符號個數（1~3個）動態設定注音字級，保持精巧秀氣、高度不超出国字
        const symCount = symbols.length || 1;
        const symFontSize = symCount === 1 ? 'text-[0.45em]' : symCount === 2 ? 'text-[0.38em]' : 'text-[0.32em]';

        return (
          <span
            key={idx}
            className="inline-flex items-center leading-none mx-[1px] my-[1px] select-none align-middle"
          >
            {/* 國字本體（主體醒目、標楷體書法、字體明顯大於注音） */}
            <span className="text-inherit leading-none textbook-char tracking-normal font-bold">
              {item.char}
            </span>

            {/* 國字右側垂直直排注音欄（精巧細緻、緊貼右側） */}
            <span className="bpmf-col inline-flex flex-row items-center ml-[1px] mr-[1px] select-none justify-center">
              {/* 輕聲置於注音符號正上方（秀氣小圓點） */}
              <span className={`flex flex-col items-center justify-center ${symFontSize} leading-[0.95] text-slate-700 bpmf-symbol tracking-tighter`}>
                {tone === '˙' && (
                  <span className="text-[0.9em] font-bold -mb-[1px] leading-none text-slate-700 font-mono">˙</span>
                )}
                {symbols.map((sym, sIdx) => (
                  <span key={sIdx} className="leading-none bpmf-symbol">{sym}</span>
                ))}
              </span>

              {/* 二聲、三聲、四聲標記於注音符號右側（秀氣標記） */}
              {tone && tone !== '˙' && (
                <span className="text-[0.55em] leading-none text-slate-700 bpmf-symbol ml-[0.5px] self-center select-none">
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
