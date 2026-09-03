import React, { useState } from 'react';
import { Calendar as CalendarIcon, RotateCcw, Volume2, Sparkles, ChevronLeft, ChevronRight, ArrowRight, Cake, Clock, Check } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface CalendarLabProps {
  bopomofoEnabled?: boolean;
  unitId?: string;
}

type CalendarTab = 'interval' | 'calendar';

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

export const CalendarLab: React.FC<CalendarLabProps> = ({
  bopomofoEnabled = true,
  unitId
}) => {
  // 模式：若為 g2-s2-u5 (年月日與時間間隔)，預設直接進入「時間間隔與生日倒數」！
  const defaultTab: CalendarTab =
    unitId === 'g2-s2-u5-calendar' || unitId?.includes('calendar')
      ? 'interval'
      : 'calendar';

  const [activeTab, setActiveTab] = useState<CalendarTab>(defaultTab);

  // =========================================================================
  // 🌟 模式 1：時間間隔與生日倒數計時器（契合課堂任務）
  // =========================================================================
  const intervalQuestions = [
    {
      id: 'birthday',
      icon: '🎂',
      title: '小明的生日倒數',
      story: '今天是 3 月 18 日，小明的生日是 4 月 6 日。再等幾天就到生日了？',
      startMonth: 3,
      startDay: 18,
      endMonth: 4,
      endDay: 6,
      step1Desc: '3 月是大月有 31 天，從 3 月 18 日到 31 日：31 － 18 ＝ 13 天',
      step1Days: 13,
      step2Desc: '4 月從 1 日數到 6 日：有 6 天',
      step2Days: 6,
      totalDays: 19,
      formula: '13 ＋ 6 ＝ 19 天',
      tip: '💡 跨月份算間隔：先算當月剩下的天數，再加上次月過的天數！'
    },
    {
      id: 'camp',
      icon: '⛺',
      title: '森林夏令營（同月份間隔）',
      story: '夏令營從 7 月 10 日開始，一直到 7 月 25 日結束。一共經過了幾天？',
      startMonth: 7,
      startDay: 10,
      endMonth: 7,
      endDay: 25,
      step1Desc: '同一月份內算天數：終點 25 日 － 起點 10 日 ＝ 15 天',
      step1Days: 15,
      step2Desc: '同月份不需要跨月累加！',
      step2Days: 0,
      totalDays: 15,
      formula: '25 － 10 ＝ 15 天',
      tip: '💡 同月份算間隔：直接用「後面的日期 － 前面的日期」就可以囉！'
    },
    {
      id: 'sports',
      icon: '🎪',
      title: '學校校慶園遊會',
      story: '今天是 5 月 20 日，校慶園遊會是 6 月 3 日。距離園遊會還有幾天？',
      startMonth: 5,
      startDay: 20,
      endMonth: 6,
      endDay: 3,
      step1Desc: '5 月有 31 天，從 5 月 20 日到 31 日：31 － 20 ＝ 11 天',
      step1Days: 11,
      step2Desc: '6 月從 1 日數到 3 日：有 3 天',
      step2Days: 3,
      totalDays: 14,
      formula: '11 ＋ 3 ＝ 14 天',
      tip: '💡 5 月是 31 天，11 ＋ 3 ＝ 14 天！'
    }
  ];

  const [intervalQIdx, setIntervalQIdx] = useState<number>(0);
  const currentIntervalQ = intervalQuestions[intervalQIdx];

  // 學生互動填空狀態
  const [userStep1Input, setUserStep1Input] = useState<string>('');
  const [userTotalInput, setUserTotalInput] = useState<string>('');
  const [intervalFeedback, setIntervalFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isCountingAnim, setIsCountingAnim] = useState<boolean>(false);

  const handleCheckInterval = () => {
    const total = parseInt(userTotalInput, 10);
    if (total === currentIntervalQ.totalDays) {
      soundFx.playCorrect();
      setIsCountingAnim(true);
      setIntervalFeedback({
        isCorrect: true,
        text: `🎉 太厲害了！計算完全正確！${currentIntervalQ.formula}，相隔了 ${currentIntervalQ.totalDays} 天！`
      });
    } else {
      soundFx.playWrong();
      setIntervalFeedback({
        isCorrect: false,
        text: `💡 再動手算算看喔！${currentIntervalQ.tip}`
      });
    }
  };

  const handleSwitchIntervalQ = (idx: number) => {
    soundFx.playPop();
    setIntervalQIdx(idx);
    setUserStep1Input('');
    setUserTotalInput('');
    setIntervalFeedback(null);
    setIsCountingAnim(false);
  };

  // =========================================================================
  // 模式 2：全年度月曆與大小月探索
  // =========================================================================
  const [month, setMonth] = useState<number>(3); // 預設 3 月
  const [selectedDay, setSelectedDay] = useState<number>(18);

  const daysInMonth = MONTH_DAYS[month - 1];
  const isBigMonth = daysInMonth === 31;

  // 取得該月第 1 天的星期幾（簡化模型）
  const getMonthStartWeekday = (m: number) => {
    // 1月:5(五), 2月:1(一), 3月:1(一), 4月:4(四), 5月:6(六), 6月:2(二), 7月:4(四), 8月:0(日), 9月:3(三), 10月:5(五), 11月:1(一), 12月:3(三)
    const offsets = [5, 1, 1, 4, 6, 2, 4, 0, 3, 5, 1, 3];
    return offsets[m - 1] % 7;
  };

  const getWeekday = (m: number, d: number) => {
    const startWk = getMonthStartWeekday(m);
    const idx = (startWk + d - 1) % 7;
    return WEEK_DAYS[idx];
  };

  const currentWeekday = getWeekday(month, selectedDay);

  const handleDayClick = (d: number) => {
    soundFx.playPop();
    setSelectedDay(d);
  };

  const handleSpeakRhyme = () => {
    soundFx.playCorrect();
    const text = '一三五七八十臘，三十一天永不差；四六九冬三十整，平年二月二十八，閏年二月把一加！';
    speechService.speak(text);
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-purple-50 to-pink-50 rounded-3xl border-4 border-purple-300 shadow-lg max-w-2xl mx-auto w-full">
      {/* 頂部切換分頁列 */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-white p-2 rounded-2xl border-2 border-purple-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('interval');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
              activeTab === 'interval'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-purple-950 hover:bg-purple-50'
            }`}
          >
            <span>⏳</span>
            <BopomofoText text="生日倒數與時間間隔" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('calendar');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
              activeTab === 'calendar'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-rose-950 hover:bg-rose-50'
            }`}
          >
            <span>📅</span>
            <BopomofoText text="月曆探索與大小月" showBpmf={bopomofoEnabled} />
          </button>
        </div>

        <button
          onClick={handleSpeakRhyme}
          className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-black border border-amber-300 transition"
        >
          <Volume2 size={15} />
          <BopomofoText text="大小月口訣歌" showBpmf={bopomofoEnabled} />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 模式 1：時間間隔與生日倒數計時器 */}
      {/* ========================================================================= */}
      {activeTab === 'interval' && (
        <div className="w-full flex flex-col gap-4">
          {/* 題目切換膠囊按鈕 */}
          <div className="w-full bg-white p-3 rounded-2xl border-2 border-purple-200 shadow-sm">
            <p className="text-xs font-black text-purple-950 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Sparkles size={14} className="text-amber-500" />
                <BopomofoText text="選擇生活時間間隔題目：" showBpmf={bopomofoEnabled} />
              </span>
              <span className="text-[11px] font-bold text-purple-700">
                {intervalQIdx + 1} / {intervalQuestions.length}
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {intervalQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => handleSwitchIntervalQ(idx)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    intervalQIdx === idx
                      ? 'bg-purple-600 text-white shadow-md font-black scale-102'
                      : 'bg-purple-50 text-purple-950 hover:bg-purple-100 border border-purple-200'
                  }`}
                >
                  <span>{q.icon}</span>
                  <span className="truncate">{q.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 情境故事卡 */}
          <div className="w-full bg-white border-2 border-purple-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black px-2.5 py-0.5 bg-purple-600 text-white rounded-full flex items-center gap-1">
                <span>{currentIntervalQ.icon}</span>
                <BopomofoText text={currentIntervalQ.title} showBpmf={bopomofoEnabled} />
              </span>
              <span className="text-xs font-mono font-black text-purple-900 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                {currentIntervalQ.startMonth}月{currentIntervalQ.startDay}日 ➔ {currentIntervalQ.endMonth}月{currentIntervalQ.endDay}日
              </span>
            </div>
            <p className="text-sm sm:text-base font-black text-slate-800 leading-relaxed mt-1">
              <BopomofoText text={currentIntervalQ.story} showBpmf={bopomofoEnabled} />
            </p>
          </div>

          {/* 🌟 具象化時間間隔月曆視覺長條 */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-amber-100 p-4 sm:p-5 rounded-3xl border-3 border-purple-300 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-black text-purple-950">
              <span className="flex items-center gap-1">
                <Clock size={16} className="text-purple-600" />
                <BopomofoText text="日曆天數分段圖解：" showBpmf={bopomofoEnabled} />
              </span>
              <span className="text-[11px] text-purple-800 font-bold">
                {currentIntervalQ.tip}
              </span>
            </div>

            {/* 跨月天數彩色對比長條 */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 my-1">
              {/* 第一段天數 */}
              <div className="flex-1 w-full bg-white p-3 rounded-2xl border-2 border-purple-300 shadow-sm text-center">
                <span className="text-[11px] font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                  <BopomofoText text={`第一階段（${currentIntervalQ.startMonth}月份）`} showBpmf={bopomofoEnabled} />
                </span>
                <p className="text-xs font-bold text-slate-600 mt-1">
                  {currentIntervalQ.step1Desc}
                </p>
                <div className="text-xl sm:text-2xl font-black font-mono text-purple-900 mt-1">
                  {currentIntervalQ.step1Days} <span className="text-xs font-normal font-sans text-slate-600"><BopomofoText text="天" showBpmf={bopomofoEnabled} /></span>
                </div>
              </div>

              {currentIntervalQ.step2Days > 0 && (
                <>
                  <span className="text-xl font-black text-purple-600 font-mono">＋</span>

                  {/* 第二段天數 */}
                  <div className="flex-1 w-full bg-white p-3 rounded-2xl border-2 border-pink-300 shadow-sm text-center">
                    <span className="text-[11px] font-black text-pink-700 bg-pink-100 px-2 py-0.5 rounded-md">
                      <BopomofoText text={`第二階段（${currentIntervalQ.endMonth}月份）`} showBpmf={bopomofoEnabled} />
                    </span>
                    <p className="text-xs font-bold text-slate-600 mt-1">
                      {currentIntervalQ.step2Desc}
                    </p>
                    <div className="text-xl sm:text-2xl font-black font-mono text-pink-600 mt-1">
                      {currentIntervalQ.step2Days} <span className="text-xs font-normal font-sans text-slate-600"><BopomofoText text="天" showBpmf={bopomofoEnabled} /></span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 總計成果 */}
            <div className="w-full bg-white/90 p-3 rounded-2xl border-2 border-purple-200 text-center">
              <span className="text-xs font-bold text-slate-600">
                <BopomofoText text="總共間隔天數：" showBpmf={bopomofoEnabled} />
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-purple-900 mt-0.5">
                {currentIntervalQ.formula}
              </div>
            </div>
          </div>

          {/* 🌟 學生動手填答驗算區 */}
          <div className="w-full bg-white p-4 sm:p-5 rounded-2xl border-2 border-purple-300 shadow-sm flex flex-col items-center gap-3">
            <p className="text-xs sm:text-sm font-black text-purple-950 text-center">
              <BopomofoText text="動手算出兩日期間隔了多少天？" showBpmf={bopomofoEnabled} />
            </p>

            <div className="flex items-center justify-center gap-2 font-mono text-xl sm:text-2xl font-black text-slate-800 flex-wrap">
              <span>{currentIntervalQ.startMonth}月{currentIntervalQ.startDay}日</span>
              <span className="text-xs font-sans text-slate-500 font-bold"><BopomofoText text="到" showBpmf={bopomofoEnabled} /></span>
              <span>{currentIntervalQ.endMonth}月{currentIntervalQ.endDay}日</span>
              <span>＝</span>
              <span className="text-xs font-sans text-slate-600 font-bold"><BopomofoText text="相隔" showBpmf={bopomofoEnabled} /></span>
              <input
                type="text"
                maxLength={3}
                value={userTotalInput}
                onChange={e => setUserTotalInput(e.target.value)}
                placeholder="?"
                className="w-16 h-12 text-center text-2xl font-black bg-purple-50 text-purple-950 rounded-xl border-2 border-purple-400 focus:outline-none focus:ring-4 ring-purple-300/50"
              />
              <span className="text-base font-sans font-black text-slate-700">
                <BopomofoText text="天" showBpmf={bopomofoEnabled} />
              </span>
            </div>

            <button
              onClick={handleCheckInterval}
              disabled={!userTotalInput}
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              <Check size={16} />
              <BopomofoText text="檢查間隔天數" showBpmf={bopomofoEnabled} />
            </button>

            {intervalFeedback && (
              <div className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-black text-center ${
                intervalFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                <BopomofoText text={intervalFeedback.text} showBpmf={bopomofoEnabled} />
              </div>
            )}

            {intervalFeedback?.isCorrect && (
              <button
                onClick={() => handleSwitchIntervalQ((intervalQIdx + 1) % intervalQuestions.length)}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-xl shadow-md btn-fun flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <BopomofoText text="挑戰下一道時間間隔題" showBpmf={bopomofoEnabled} /> <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 2：月曆探索與大小月表格 */}
      {/* ========================================================================= */}
      {activeTab === 'calendar' && (
        <div className="w-full flex flex-col gap-4">
          {/* 月份切換列 */}
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-purple-200 shadow-sm">
            <button
              onClick={() => {
                soundFx.playPop();
                setMonth(prev => (prev > 1 ? prev - 1 : 12));
                setSelectedDay(1);
              }}
              className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl font-black"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="text-xl sm:text-2xl font-black text-purple-950 flex items-center gap-2">
              <span>📅</span>
              <span>{month} <BopomofoText text="月" showBpmf={bopomofoEnabled} /></span>
              <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                {isBigMonth ? (
                  <BopomofoText text="大月 (31天)" showBpmf={bopomofoEnabled} />
                ) : month === 2 ? (
                  <BopomofoText text="2月 (28天/平年)" showBpmf={bopomofoEnabled} />
                ) : (
                  <BopomofoText text="小月 (30天)" showBpmf={bopomofoEnabled} />
                )}
              </span>
            </div>

            <button
              onClick={() => {
                soundFx.playPop();
                setMonth(prev => (prev < 12 ? prev + 1 : 1));
                setSelectedDay(1);
              }}
              className="p-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl font-black"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* 月曆表格 */}
          <div className="bg-white rounded-3xl p-5 border-3 border-purple-300 shadow-sm flex flex-col items-center">
            <div className="grid grid-cols-7 gap-1.5 w-full max-w-md text-center mb-2">
              {WEEK_DAYS.map((w, idx) => (
                <div
                  key={idx}
                  className={`font-black text-xs sm:text-sm py-1 rounded-xl ${
                    idx === 0 || idx === 6 ? 'text-rose-600 bg-rose-50' : 'text-slate-700 bg-slate-100'
                  }`}
                >
                  <BopomofoText text={`週${w}`} showBpmf={bopomofoEnabled} />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5 w-full max-w-md">
              {Array.from({ length: getMonthStartWeekday(month) }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10 sm:h-11 rounded-xl bg-slate-50 opacity-40"></div>
              ))}

              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDay === day;
                const wk = getWeekday(month, day);
                const isWeekend = wk === '日' || wk === '六';

                return (
                  <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`h-10 sm:h-11 rounded-xl font-mono font-black text-sm sm:text-base flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-lg scale-110 ring-4 ring-purple-200'
                        : isWeekend
                        ? 'bg-rose-50/80 hover:bg-rose-100 text-rose-700 border border-rose-200'
                        : 'bg-white hover:bg-purple-50 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <span>{day}</span>
                  </button>
                );
              })}
            </div>

            {/* 點選日期詳情說明牌 */}
            <div className="mt-5 w-full max-w-md p-3.5 bg-gradient-to-r from-purple-100 via-pink-100 to-purple-100 rounded-2xl border-2 border-purple-300 text-center">
              <div className="text-sm sm:text-base font-black text-purple-950">
                <BopomofoText
                  text={`今天是【${month} 月 ${selectedDay} 日 星期${currentWeekday}】`}
                  showBpmf={bopomofoEnabled}
                />
              </div>
              <div className="text-xs font-bold text-purple-800 mt-1 flex justify-around">
                <span>
                  <BopomofoText text="昨天：" showBpmf={bopomofoEnabled} />
                  {selectedDay > 1 ? `${month}月${selectedDay - 1}日` : '上個月底'}
                </span>
                <span>
                  <BopomofoText text="明天：" showBpmf={bopomofoEnabled} />
                  {selectedDay < daysInMonth ? `${month}月${selectedDay + 1}日` : `${month === 12 ? 1 : month + 1}月1日`}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
