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

        // 台灣標準國小教科書黃金比例：國字特大醒目、注音大而清晰（極致好讀，剛好與國字齊平不超出）
        const { symbols, tone } = parseBpmfTone(item.bpmf);

        // 依據注音符號個數（1~3個）動態設定注音字級，再加大一點點、清晰粗體、剛好與國字等高
        const symCount = symbols.length || 1;
        const symFontSize = symCount === 1 ? 'text-[0.55em]' : symCount === 2 ? 'text-[0.44em]' : 'text-[0.36em]';

        return (
          <span
            key={idx}
            className="inline-flex items-center leading-none mx-[1px] my-[1px] select-none align-middle"
          >
            {/* 國字本體（特大號、標楷體、字正腔圓） */}
            <span className="text-[1.28em] leading-none textbook-char tracking-normal font-black">
              {item.char}
            </span>

            {/* 國字右側垂直直排注音欄（清晰粗體、再大一點點、高度與國字齊平） */}
            <span className="bpmf-col inline-flex flex-row items-center ml-[1.5px] mr-[1px] select-none justify-center h-[1.25em]">
              {/* 輕聲（˙）標記於第一個注音符號正上方緊貼，二/三/四聲標記於右側 */}
              <span className={`relative flex flex-col items-center justify-center ${symFontSize} leading-[0.88] text-slate-950 bpmf-symbol tracking-tighter ${tone === '˙' ? 'pt-[0.25em]' : ''}`}>
                {tone === '˙' && (
                  <span className="absolute -top-[0.18em] left-1/2 -translate-x-1/2 text-[1.1em] font-black leading-none text-slate-950 pointer-events-none select-none font-mono">
                    ˙
                  </span>
                )}
                {symbols.map((sym, sIdx) => (
                  <span key={sIdx} className="leading-none bpmf-symbol font-black">{sym}</span>
                ))}
              </span>

              {/* 二聲、三聲、四聲標記於注音符號右側（粗體深墨色） */}
              {tone && tone !== '˙' && (
                <span className="text-[0.68em] leading-none text-slate-950 bpmf-symbol font-black ml-[0.5px] self-center select-none">
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
