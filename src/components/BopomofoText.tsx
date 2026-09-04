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
            <span key={idx} className="text-inherit inline-block tracking-normal font-black">
              {item.char}
            </span>
          );
        }

        // 台灣標準國小教育部審定本課本排版：國字與右側直排注音等高協調
        const { symbols, tone } = parseBpmfTone(item.bpmf);

        // 依據注音符號個數（1~3個）動態調整每個注音符號的字級，使注音欄總高度與國字高度保持一致
        const symCount = symbols.length || 1;
        const symFontSize = symCount === 1 ? 'text-[0.62em]' : symCount === 2 ? 'text-[0.52em]' : 'text-[0.45em]';

        return (
          <span
            key={idx}
            className="inline-flex items-center leading-none mx-[1.5px] my-[1px] select-none align-middle"
          >
            {/* 國字本體（國小標準標楷體，字正腔圓、筆畫分明） */}
            <span className="text-inherit leading-none textbook-char tracking-normal font-semibold">
              {item.char}
            </span>

            {/* 國字右側垂直直排注音欄（與國字本體同高、完美比例） */}
            <span className="bpmf-col inline-flex flex-row items-center ml-[2px] mr-[1px] select-none h-[1em] justify-center">
              {/* 輕聲置於注音符號正上方（置中美觀圓點） */}
              <span className={`flex flex-col items-center justify-center ${symFontSize} leading-[0.92] text-slate-900 bpmf-symbol tracking-tighter`}>
                {tone === '˙' && (
                  <span className="text-[1.1em] font-black -mb-[2px] leading-none text-slate-800 font-mono">˙</span>
                )}
                {symbols.map((sym, sIdx) => (
                  <span key={sIdx} className="leading-none bpmf-symbol">{sym}</span>
                ))}
              </span>

              {/* 二聲、三聲、四聲標記於注音符號右側（國小課本標準聲調位置） */}
              {tone && tone !== '˙' && (
                <span className="text-[0.68em] leading-none text-slate-800 bpmf-symbol ml-[0.5px] self-center select-none">
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
