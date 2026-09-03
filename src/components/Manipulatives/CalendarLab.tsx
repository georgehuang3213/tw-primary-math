import React, { useState } from 'react';
import { Calendar as CalendarIcon, RotateCcw, Volume2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface CalendarLabProps {
  bopomofoEnabled?: boolean;
}

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

export const CalendarLab: React.FC<CalendarLabProps> = ({ bopomofoEnabled = true }) => {
  const [month, setMonth] = useState<number>(5); // 5月 (31天)
  const [selectedDay, setSelectedDay] = useState<number>(15);

  const daysInMonth = MONTH_DAYS[month - 1];
  const isBigMonth = daysInMonth === 31;

  // 計算星期幾（簡化模型：5月1日設為星期四）
  const getWeekday = (day: number) => {
    const startWeekday = 4; // 星期四
    const idx = (startWeekday + day - 1) % 7;
    return WEEK_DAYS[idx];
  };

  const currentWeekday = getWeekday(selectedDay);

  const handleDayClick = (day: number) => {
    soundFx.playPop();
    setSelectedDay(day);
    const wk = getWeekday(day);
    const text = `${month} 月 ${day} 日，是星期${wk}！昨天是 ${month} 月 ${day - 1} 日，明天是 ${month} 月 ${
      day < daysInMonth ? day + 1 : 1
    } 日！`;
    speechService.speak(text);
  };

  const handleSpeak = () => {
    soundFx.playCorrect();
    const text = `${month} 月一共有 ${daysInMonth} 天，是${isBigMonth ? '31天的大月' : month === 2 ? '特別的2月' : '30天的小月'}！`;
    speechService.speak(text);
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-violet-50 to-purple-50 rounded-3xl border-4 border-violet-300 shadow-lg">
      {/* 頂部功能列 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-2xl border-2 border-violet-200 shadow-sm">
        <div className="flex items-center gap-2 text-violet-950 font-black text-base">
          <CalendarIcon size={22} className="text-violet-600" />
          <BopomofoText text="幾月幾日星期幾：互動月曆實驗室" showBpmf={bopomofoEnabled} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-100 hover:bg-violet-200 text-violet-900 rounded-xl text-xs font-black border border-violet-300 transition"
          >
            <Volume2 size={16} />
            <BopomofoText text="朗讀月曆規律" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setMonth(5);
              setSelectedDay(15);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* 月份切換列 */}
      <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-violet-200 shadow-sm">
        <button
          onClick={() => {
            soundFx.playPop();
            setMonth(prev => (prev > 1 ? prev - 1 : 12));
            setSelectedDay(1);
          }}
          className="p-2 bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-xl font-black"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="text-xl sm:text-2xl font-black text-violet-950 flex items-center gap-2">
          <span>📅</span>
          <span>{month} <BopomofoText text="月" showBpmf={bopomofoEnabled ?? false} /></span>
          <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800">
            {isBigMonth ? <BopomofoText text="大月 (31天)" showBpmf={bopomofoEnabled ?? false} /> : month === 2 ? <span>2<BopomofoText text="月 (28天)" showBpmf={bopomofoEnabled ?? false} /></span> : <BopomofoText text="小月 (30天)" showBpmf={bopomofoEnabled ?? false} />}
          </span>
        </div>

        <button
          onClick={() => {
            soundFx.playPop();
            setMonth(prev => (prev < 12 ? prev + 1 : 1));
            setSelectedDay(1);
          }}
          className="p-2 bg-violet-50 hover:bg-violet-100 text-violet-700 rounded-xl font-black"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* 月曆表格 */}
      <div className="bg-white rounded-3xl p-6 border-3 border-violet-300 shadow-sm flex flex-col items-center">
        {/* 星期標頭 */}
        <div className="grid grid-cols-7 gap-2 w-full max-w-md text-center mb-2">
          {WEEK_DAYS.map((w, idx) => (
            <div
              key={idx}
              className={`font-black text-sm py-1 rounded-xl ${
                idx === 0 || idx === 6 ? 'text-rose-600 bg-rose-50' : 'text-slate-700 bg-slate-100'
              }`}
            >
              <BopomofoText text={`週${w}`} showBpmf={bopomofoEnabled ?? false} />
            </div>
          ))}
        </div>

        {/* 日期方格 */}
        <div className="grid grid-cols-7 gap-2 w-full max-w-md">
          {/* 前置空格（5月1日設在週四，前面空 4 格） */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10 sm:h-12 rounded-xl bg-slate-50 opacity-40"></div>
          ))}

          {/* 1 ~ N 日 */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isSelected = selectedDay === day;
            const wk = getWeekday(day);
            const isWeekend = wk === '日' || wk === '六';

            return (
              <button
                key={day}
                onClick={() => handleDayClick(day)}
                className={`h-10 sm:h-12 rounded-xl font-mono font-black text-base sm:text-lg flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-lg scale-110 ring-4 ring-violet-200'
                    : isWeekend
                    ? 'bg-rose-50/80 hover:bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-white hover:bg-violet-50 text-slate-800 border border-slate-200'
                }`}
              >
                <span>{day}</span>
              </button>
            );
          })}
        </div>

        {/* 點選日期詳情說明牌 */}
        <div className="mt-6 w-full max-w-md p-4 bg-gradient-to-r from-violet-100 via-purple-100 to-violet-100 rounded-2xl border-2 border-violet-300 text-center">
          <div className="text-base sm:text-lg font-black text-violet-950">
            <BopomofoText
              text={`今天是【${month} 月 ${selectedDay} 日 星期${currentWeekday}】`}
              showBpmf={bopomofoEnabled}
            />
          </div>
          <div className="text-xs sm:text-sm font-bold text-violet-800 mt-1 flex justify-around">
            <span>
              <BopomofoText text="昨天：" showBpmf={bopomofoEnabled ?? false} />
              {selectedDay > 1 ? (
                <span>{month}<BopomofoText text="月" showBpmf={bopomofoEnabled ?? false} />{selectedDay - 1}<BopomofoText text="日" showBpmf={bopomofoEnabled ?? false} /></span>
              ) : (
                <BopomofoText text="上個月底" showBpmf={bopomofoEnabled ?? false} />
              )}
            </span>
            <span>
              <BopomofoText text="明天：" showBpmf={bopomofoEnabled ?? false} />
              {selectedDay < daysInMonth ? (
                <span>{month}<BopomofoText text="月" showBpmf={bopomofoEnabled ?? false} />{selectedDay + 1}<BopomofoText text="日" showBpmf={bopomofoEnabled ?? false} /></span>
              ) : (
                <span>{month + 1}<BopomofoText text="月1日" showBpmf={bopomofoEnabled ?? false} /></span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
