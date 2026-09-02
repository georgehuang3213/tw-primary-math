import React from 'react';
import { parseToBopomofoChars, parseBpmfTone } from '../data/bopomofo';

interface BopomofoTextProps {
  text: string;
  bpmfText?: string;
  className?: string;
  showBpmf?: boolean;
}

export const BopomofoText: React.FC<BopomofoTextProps> = ({
  text,
  bpmfText,
  className = '',
  showBpmf = true
}) => {
  const contentToParse = bpmfText || text;
  const charList = parseToBopomofoChars(contentToParse);

  return (
    <span className={`inline-flex flex-wrap items-center align-middle gap-x-1.5 gap-y-2 ${className}`}>
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
            <span className="bpmf-col inline-flex flex-row items-center ml-[2px] mr-[1px] select-none">
              {/* 輕聲置於注音符號正上方（紅棕色加粗小圓點） */}
              <span className="flex flex-col items-center justify-center text-[0.55em] leading-[0.92] text-slate-800 font-black tracking-tighter">
                {tone === '˙' && (
                  <span className="text-[1.1em] font-black -mb-[2px] leading-none text-rose-600">˙</span>
                )}
                {symbols.map((sym, sIdx) => (
                  <span key={sIdx} className="leading-none font-black">{sym}</span>
                ))}
              </span>

              {/* 二聲、三聲、四聲標記於注音符號右側（鮮明紅棕色超粗聲調） */}
              {tone && tone !== '˙' && (
                <span className="text-[0.6em] leading-none text-rose-600 font-black ml-[1px] self-center -mt-[2px]">
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
