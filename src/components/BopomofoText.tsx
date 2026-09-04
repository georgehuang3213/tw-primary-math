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

        // 台灣標準國小教育部審定本課本排版：標楷體國字＋右側緊湊直排注音
        const { symbols, tone } = parseBpmfTone(item.bpmf);

        return (
          <span
            key={idx}
            className="inline-flex items-center leading-none mx-[2px] my-[1.5px] select-none align-middle"
          >
            {/* 國字本體（國小標準標楷體，字正腔圓、筆畫分明） */}
            <span className="text-inherit leading-none textbook-char tracking-normal font-semibold">
              {item.char}
            </span>

            {/* 國字右側垂直直排注音欄（緊湊對齊、高清晰度） */}
            <span className="bpmf-col inline-flex flex-row items-center ml-[2px] mr-[1.5px] select-none">
              {/* 輕聲置於注音符號正上方（置中美觀圓點） */}
              <span className="flex flex-col items-center justify-center text-[0.58em] leading-[0.88] text-slate-900 bpmf-symbol tracking-tighter">
                {tone === '˙' && (
                  <span className="text-[1.3em] font-black -mb-[2px] leading-none text-slate-800 font-mono">˙</span>
                )}
                {symbols.map((sym, sIdx) => (
                  <span key={sIdx} className="leading-none bpmf-symbol">{sym}</span>
                ))}
              </span>

              {/* 二聲、三聲、四聲標記於注音符號右側（國小課本標準聲調位置） */}
              {tone && tone !== '˙' && (
                <span className="text-[0.75em] leading-none text-slate-800 bpmf-symbol ml-[1px] self-center select-none">
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
