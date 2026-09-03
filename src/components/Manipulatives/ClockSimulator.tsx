import React, { useState, useRef } from 'react';
import { RotateCcw, Eye, EyeOff } from 'lucide-react';
import { soundFx } from '../../services/audio';
import { BopomofoText } from '../BopomofoText';

interface ClockSimulatorProps {
  initialHours?: number;
  initialMinutes?: number;
  interactive?: boolean;
  onTimeChange?: (hours: number, minutes: number) => void;
  targetHours?: number;
  targetMinutes?: number;
  bopomofoEnabled?: boolean;
}

export const ClockSimulator: React.FC<ClockSimulatorProps> = ({
  initialHours = 8,
  initialMinutes = 0,
  interactive = true,
  onTimeChange,
  targetHours,
  targetMinutes,
  bopomofoEnabled
}) => {
  const [hours, setHours] = useState(initialHours);
  const [minutes, setMinutes] = useState(initialMinutes);
  const [showDigital, setShowDigital] = useState(true);
  const clockRef = useRef<SVGSVGElement>(null);

  // 計算指針角度
  // 分針：每分鐘 6 度 (360 / 60)
  const minuteAngle = minutes * 6;
  // 時針：每小時 30 度 (360 / 12)，加上分針帶動的微調 (30 * minutes / 60)
  const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30;

  const handleSetTime = (newH: number, newM: number) => {
    let normalizedH = ((newH - 1) % 12 + 12) % 12 + 1;
    let normalizedM = ((newM % 60) + 60) % 60;
    setHours(normalizedH);
    setMinutes(normalizedM);
    soundFx.playPop();
    if (onTimeChange) {
      onTimeChange(normalizedH, normalizedM);
    }
  };

  const addMinutes = (amount: number) => {
    let totalM = hours * 60 + minutes + amount;
    let newH = Math.floor(totalM / 60);
    let newM = totalM % 60;
    handleSetTime(newH, newM);
  };

  return (
    <div className="flex flex-col items-center bg-amber-50/70 p-4 sm:p-6 rounded-3xl border-2 border-amber-200 shadow-inner max-w-md mx-auto">
      {/* 指針圖例說明（置於時鐘上方橫排，絕不遮擋鐘面數字） */}
      <div className="flex items-center justify-center gap-4 text-xs font-bold bg-white/95 px-4 py-1.5 rounded-full border border-amber-200 shadow-sm mb-3">
        <span className="flex items-center text-red-600">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block mr-1"></span>
          <BopomofoText text="時針（短）" showBpmf={bopomofoEnabled ?? false} />
        </span>
        <span className="flex items-center text-sky-600">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block mr-1"></span>
          <BopomofoText text="分針（長）" showBpmf={bopomofoEnabled ?? false} />
        </span>
      </div>

      {/* 鐘面 SVG */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72">
        <svg
          ref={clockRef}
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-xl select-none"
        >
          {/* 外框 */}
          <circle cx="100" cy="100" r="94" fill="#ffffff" stroke="#f59e0b" strokeWidth="8" />
          <circle cx="100" cy="100" r="88" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />

          {/* 60 分鐘刻度與 12 個小時刻度 */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i * 6 * Math.PI) / 180;
            const isHourMark = i % 5 === 0;
            const r1 = isHourMark ? 84 : 86;
            const r2 = 88;
            const x1 = 100 + r1 * Math.sin(angle);
            const y1 = 100 - r1 * Math.cos(angle);
            const x2 = 100 + r2 * Math.sin(angle);
            const y2 = 100 - r2 * Math.cos(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHourMark ? '#b45309' : '#cbd5e1'}
                strokeWidth={isHourMark ? 3 : 1.5}
                strokeLinecap="round"
              />
            );
          })}

          {/* 1 ~ 12 數字 */}
          {Array.from({ length: 12 }).map((_, i) => {
            const num = i + 1;
            const angle = (num * 30 * Math.PI) / 180;
            const radius = 72;
            const x = 100 + radius * Math.sin(angle);
            const y = 100 - radius * Math.cos(angle) + 5;
            return (
              <text
                key={num}
                x={x}
                y={y}
                textAnchor="middle"
                className="font-extrabold text-amber-950 text-[14px] fill-amber-900 select-none"
              >
                {num}
              </text>
            );
          })}

          {/* 5, 10, 15... 分鐘提示外圈小字 */}
          {Array.from({ length: 12 }).map((_, i) => {
            const minVal = (i + 1) * 5;
            const angle = ((i + 1) * 30 * Math.PI) / 180;
            const radius = 57;
            const x = 100 + radius * Math.sin(angle);
            const y = 100 - radius * Math.cos(angle) + 3;
            return (
              <text
                key={`min-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                className="font-semibold text-slate-400 text-[8px] fill-slate-400 select-none"
              >
                {minVal === 60 ? '00' : minVal}
              </text>
            );
          })}

          {/* 時針（短粗紅色） */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="54"
            stroke="#ef4444"
            strokeWidth="6"
            strokeLinecap="round"
            transform={`rotate(${hourAngle} 100 100)`}
            className="transition-transform duration-200"
          />

          {/* 分針（長細藍色） */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="#0284c7"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${minuteAngle} 100 100)`}
            className="transition-transform duration-100"
          />

          {/* 中心軸金屬扣 */}
          <circle cx="100" cy="100" r="6" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
        </svg>

      </div>

      {/* 數位時間顯示 */}
      <div className="mt-4 flex items-center gap-3">
        <div className="bg-slate-900 text-amber-300 font-mono font-black text-2xl sm:text-3xl px-6 py-2 rounded-2xl shadow-md border-2 border-slate-700 tracking-wider">
          {showDigital ? (
            `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}`
          ) : (
            `?? : ??`
          )}
        </div>
        <button
          onClick={() => setShowDigital(!showDigital)}
          className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 transition"
          aria-label={showDigital ? '隱藏電子鐘' : '顯示電子鐘'}
        >
          {showDigital ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* 互動按鈕：整點、半點與加減分鐘 */}
      {interactive && (
        <div className="mt-4 w-full flex flex-col gap-2">
          <div className="flex flex-wrap justify-center gap-1.5">
            <button
              onClick={() => addMinutes(-30)}
              className="px-2.5 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl font-bold text-xs btn-fun border border-sky-300"
            >
              <BopomofoText text="- 30分" showBpmf={bopomofoEnabled ?? false} />
            </button>
            <button
              onClick={() => addMinutes(-5)}
              className="px-2.5 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl font-bold text-xs btn-fun border border-sky-300"
            >
              <BopomofoText text="- 5分" showBpmf={bopomofoEnabled ?? false} />
            </button>
            <button
              onClick={() => addMinutes(5)}
              className="px-2.5 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl font-bold text-xs btn-fun border border-sky-300"
            >
              <BopomofoText text="+ 5分" showBpmf={bopomofoEnabled ?? false} />
            </button>
            <button
              onClick={() => addMinutes(30)}
              className="px-2.5 py-1.5 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl font-bold text-xs btn-fun border border-sky-300"
            >
              <BopomofoText text="+ 30分" showBpmf={bopomofoEnabled ?? false} />
            </button>
          </div>

          <div className="flex justify-center gap-2 pt-1 border-t border-amber-200">
            <button
              onClick={() => handleSetTime(hours, 0)}
              className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl font-bold text-xs btn-fun shadow-sm"
            >
              <BopomofoText text="設為整點 (00分)" showBpmf={bopomofoEnabled ?? false} />
            </button>
            <button
              onClick={() => handleSetTime(hours, 30)}
              className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-xl font-bold text-xs btn-fun shadow-sm"
            >
              <BopomofoText text="設為半點 (30分)" showBpmf={bopomofoEnabled ?? false} />
            </button>
            <button
              onClick={() => handleSetTime(12, 0)}
              className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-bold text-xs"
              aria-label="重設為 12:00"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
