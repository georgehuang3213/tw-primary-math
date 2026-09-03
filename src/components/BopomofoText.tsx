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

        // 台灣標準國小教科書：注音直排於國字右側（粗體黑體、超清晰對比）
        const { symbols, tone } = parseBpmfTone(item.bpmf);

        return (
          <span
            key={idx}
            className="inline-flex items-center leading-none mx-[1.5px] my-[1px] select-none align-middle"
          >
            {/* 國字本體（超粗黑體 font-black，清晰醒目） */}
            <span className="text-inherit leading-none font-black tracking-normal">
              {item.char}
            </span>

            {/* 國字右側垂直直排注音欄（顯著加粗加黑、比例放大） */}
            <span className="bpmf-col inline-flex flex-row items-center ml-[2.5px] mr-[1.5px] select-none">
              {/* 輕聲置於注音符號正上方（顯著放大醒目圓點） */}
              <span className="flex flex-col items-center justify-center text-[0.62em] leading-[0.9] text-slate-900 font-black tracking-tighter">
                {tone === '˙' && (
                  <span className="text-[1.5em] font-black -mb-[3px] leading-none text-rose-600 font-mono">˙</span>
                )}
                {symbols.map((sym, sIdx) => (
                  <span key={sIdx} className="leading-none font-black">{sym}</span>
                ))}
              </span>

              {/* 二聲、三聲、四聲標記於注音符號右側（特大顯眼粗體聲調：0.95em，清晰分明） */}
              {tone && tone !== '˙' && (
                <span className="text-[0.95em] leading-none text-rose-600 font-black ml-[1.5px] self-center select-none font-sans drop-shadow-[0_1px_0_rgba(225,29,72,0.2)]">
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
