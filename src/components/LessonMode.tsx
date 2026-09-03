import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, Dumbbell, BookOpen, Wrench, Lightbulb, HelpCircle, Volume2 } from 'lucide-react';
import { Unit } from '../types';
import { BopomofoText } from './BopomofoText';
import { VoiceButton } from './VoiceButton';
import { ClockSimulator } from './Manipulatives/ClockSimulator';
import { TaiwanCoins } from './Manipulatives/TaiwanCoins';
import { VerticalArithmetic } from './Manipulatives/VerticalArithmetic';
import { BaseTenBlocks } from './Manipulatives/BaseTenBlocks';
import { MultiplicationGrid } from './Manipulatives/MultiplicationGrid';
import { VirtualRuler } from './Manipulatives/VirtualRuler';
import { TenSplitBoard } from './Manipulatives/TenSplitBoard';
import { AnimalCounter } from './Manipulatives/AnimalCounter';
import { ShapeLab } from './Manipulatives/ShapeLab';
import { BalanceScale } from './Manipulatives/BalanceScale';
import { CapacityLab } from './Manipulatives/CapacityLab';
import { AreaGridLab } from './Manipulatives/AreaGridLab';
import { BarChartLab } from './Manipulatives/BarChartLab';
import { FractionPieLab } from './Manipulatives/FractionPieLab';
import { CalendarLab } from './Manipulatives/CalendarLab';
import { UnitLengthLab } from './Manipulatives/UnitLengthLab';
import { soundFx } from '../services/audio';

interface LessonModeProps {
  unit: Unit;
  bopomofoEnabled: boolean;
  onBack: () => void;
  onStartPractice: () => void;
}

type LessonTab = 'story' | 'manipulative' | 'steps' | 'warmup';

export const LessonMode: React.FC<LessonModeProps> = ({
  unit,
  bopomofoEnabled,
  onBack,
  onStartPractice
}) => {
  const [activeTab, setActiveTab] = useState<LessonTab>('story');
  const [warmupSelected, setWarmupSelected] = useState<number | null>(null);
  const [warmupAnswered, setWarmupAnswered] = useState<boolean>(false);

  const renderManipulative = () => {
    switch (unit.manipulativeType) {
      case 'fraction_pie':
        return <FractionPieLab bopomofoEnabled={bopomofoEnabled} />;
      case 'calendar_lab':
        return <CalendarLab bopomofoEnabled={bopomofoEnabled} />;
      case 'unit_length':
        return <UnitLengthLab bopomofoEnabled={bopomofoEnabled} />;
      case 'shape_lab':
        return <ShapeLab bopomofoEnabled={bopomofoEnabled} unitId={unit.id} />;
      case 'balance_scale':
        return <BalanceScale bopomofoEnabled={bopomofoEnabled} />;
      case 'capacity_lab':
        return <CapacityLab bopomofoEnabled={bopomofoEnabled} />;
      case 'area_grid':
        return <AreaGridLab bopomofoEnabled={bopomofoEnabled} />;
      case 'data_graph':
        return <BarChartLab bopomofoEnabled={bopomofoEnabled} />;
      case 'animal_counter':
        return <AnimalCounter bopomofoEnabled={bopomofoEnabled} />;
      case 'clock':
        return <ClockSimulator initialHours={8} initialMinutes={unit.id === 'g1-u9-time' ? 0 : 25} bopomofoEnabled={bopomofoEnabled} />;
      case 'coins':
        return (
          <TaiwanCoins
            unitId={unit.id}
            bopomofoEnabled={bopomofoEnabled}
          />
        );
      case 'vertical_arithmetic':
        return (
          <VerticalArithmetic
            operation="add"
            unitId={unit.id}
            bopomofoEnabled={bopomofoEnabled}
          />
        );
      case 'base10':
        return (
          <BaseTenBlocks
            initialHundreds={unit.grade === 2 ? 1 : 0}
            initialTens={unit.grade === 2 ? 4 : 2}
            initialOnes={unit.grade === 2 ? 7 : 5}
            unitId={unit.id}
            grade={unit.grade}
            bopomofoEnabled={bopomofoEnabled}
          />
        );
      case 'mult_grid':
        return (
          <MultiplicationGrid
            initialFactor1={unit.id === 'g2-u9-mult-part2' ? 9 : 6}
            initialFactor2={unit.id === 'g2-u9-mult-part2' ? 7 : 4}
            unitId={unit.id}
            bopomofoEnabled={bopomofoEnabled}
          />
        );
      case 'ruler':
        return <VirtualRuler bopomofoEnabled={bopomofoEnabled} />;
      case 'ten_split':
        return <TenSplitBoard totalCount={10} unitId={unit.id} bopomofoEnabled={bopomofoEnabled} />;
      default:
        return <AnimalCounter bopomofoEnabled={bopomofoEnabled} />;
    }
  };

  const handleWarmupOptionClick = (index: number) => {
    if (warmupAnswered) return;
    setWarmupSelected(index);
    setWarmupAnswered(true);
    if (unit.warmup && index === unit.warmup.answerIndex) {
      soundFx.playCorrect();
    } else {
      soundFx.playWrong();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col gap-5 min-h-[85vh]">
      {/* 頂部導航按鈕列 */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={() => {
            soundFx.playPop();
            onBack();
          }}
          className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-amber-100 text-amber-950 rounded-2xl font-black text-base border-3 border-amber-300 shadow-md btn-fun"
        >
          <ArrowLeft size={20} />
          <BopomofoText text="返回單元選單" showBpmf={bopomofoEnabled} />
        </button>

        <button
          onClick={() => {
            soundFx.playFanfare();
            onStartPractice();
          }}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-lg rounded-2xl shadow-lg border-3 border-amber-600 btn-fun"
        >
          <Dumbbell size={22} />
          <BopomofoText text="進入挑戰闖關 ➔" showBpmf={bopomofoEnabled} />
        </button>
      </div>

      {/* 單元大標題與語音朗讀 */}
      <div className="bg-white rounded-3xl sm:rounded-[32px] border-4 border-amber-300 shadow-lg p-5 sm:p-7">
        <div className="flex items-center justify-between flex-wrap gap-4 border-b-2 border-amber-100 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-100 flex items-center justify-center text-4xl sm:text-5xl shadow-inner border-2 border-amber-300 shrink-0">
              {unit.icon}
            </div>
            <div>
              <span className="text-xs sm:text-sm font-black bg-amber-400 text-amber-950 px-3 py-1 rounded-full border border-amber-500">
                <BopomofoText
                  text={`民國115課綱 · 第 ${unit.order} 單元多元教學`}
                  showBpmf={bopomofoEnabled}
                />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                <BopomofoText text={unit.title} bpmfText={unit.titleBpmf} showBpmf={bopomofoEnabled} />
              </h1>
              <p className="text-sm sm:text-base font-bold text-amber-900 mt-0.5">
                <BopomofoText text={unit.subtitle} showBpmf={bopomofoEnabled} />
              </p>
            </div>
          </div>

          <VoiceButton
            textToSpeak={`${unit.title}。${unit.subtitle}。${unit.description}`}
            size="lg"
          />
        </div>

        {/* 4 大多元教學分頁切換按鈕（大圖示、大字體、童趣配色） */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-5">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('story');
            }}
            className={`flex items-center justify-center gap-2 py-3.5 px-3 rounded-2xl font-black text-base transition-all ${
              activeTab === 'story'
                ? 'bg-rose-500 text-white shadow-md scale-105 border-2 border-rose-600 ring-2 ring-rose-300'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-2 border-rose-200'
            }`}
          >
            <BookOpen size={20} />
            <BopomofoText text="情境小劇場" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('manipulative');
            }}
            className={`flex items-center justify-center gap-2 py-3.5 px-3 rounded-2xl font-black text-base transition-all ${
              activeTab === 'manipulative'
                ? 'bg-sky-500 text-white shadow-md scale-105 border-2 border-sky-600 ring-2 ring-sky-300'
                : 'bg-sky-50 hover:bg-sky-100 text-sky-900 border-2 border-sky-200'
            }`}
          >
            <Wrench size={20} />
            <BopomofoText text="動手教具館" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('steps');
            }}
            className={`flex items-center justify-center gap-2 py-3.5 px-3 rounded-2xl font-black text-base transition-all ${
              activeTab === 'steps'
                ? 'bg-amber-500 text-amber-950 shadow-md scale-105 border-2 border-amber-600 ring-2 ring-amber-300'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-2 border-amber-200'
            }`}
          >
            <Lightbulb size={20} />
            <BopomofoText text="圖解與口訣" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('warmup');
            }}
            className={`flex items-center justify-center gap-2 py-3.5 px-3 rounded-2xl font-black text-base transition-all ${
              activeTab === 'warmup'
                ? 'bg-emerald-500 text-white shadow-md scale-105 border-2 border-emerald-600 ring-2 ring-emerald-300'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-2 border-emerald-200'
            }`}
          >
            <HelpCircle size={20} />
            <BopomofoText text="概念隨堂練" showBpmf={bopomofoEnabled} />
          </button>
        </div>
      </div>

      {/* 4 大分頁內容主展示區 */}
      <div className="bg-white rounded-3xl sm:rounded-[36px] border-4 border-amber-300 shadow-xl p-6 sm:p-10 flex-1">
        {/* ================= 階段一：童趣情境小劇場 ================= */}
        {activeTab === 'story' && unit.story && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* 角色與情境導讀 */}
            <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-3xl p-6 border-3 border-rose-200 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-black text-rose-900 flex items-center gap-2">
                  <BopomofoText text={unit.story.character} showBpmf={bopomofoEnabled} />
                </span>
                <VoiceButton
                  textToSpeak={`${unit.story.scene} ${unit.story.dialogue} ${unit.story.task}`}
                  size="md"
                />
              </div>

              <div className="p-4 bg-white/90 rounded-2xl border-2 border-rose-100 text-lg sm:text-xl font-bold text-slate-800 leading-relaxed">
                <BopomofoText text={unit.story.scene} showBpmf={bopomofoEnabled} />
              </div>

              <div className="p-4 bg-rose-500 text-white rounded-2xl shadow font-black text-lg sm:text-2xl leading-relaxed flex items-start gap-3">
                <span className="text-2xl sm:text-3xl shrink-0">💬</span>
                <BopomofoText text={unit.story.dialogue} showBpmf={bopomofoEnabled} />
              </div>
            </div>

            {/* 探索任務指示卡 */}
            <div className="bg-amber-50 rounded-3xl p-6 border-3 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles size={32} className="text-amber-500 shrink-0" />
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-amber-950">
                    <BopomofoText text="今日探索任務" showBpmf={bopomofoEnabled} />
                  </h4>
                  <p className="text-base sm:text-lg font-bold text-slate-800 mt-1">
                    <BopomofoText text={unit.story.task} showBpmf={bopomofoEnabled} />
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playPop();
                  setActiveTab('manipulative');
                }}
                className="px-6 py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-black text-lg rounded-2xl shadow-md border-2 border-sky-600 btn-fun shrink-0"
              >
                <BopomofoText text="立即打開教具操作 ➔" showBpmf={bopomofoEnabled} />
              </button>
            </div>
          </div>
        )}

        {/* ================= 階段二：動手虛擬教具館 ================= */}
        {activeTab === 'manipulative' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="bg-sky-50 p-4 sm:p-5 rounded-2xl border-2 border-sky-200 flex items-center justify-between">
              <span className="text-base sm:text-lg font-black text-sky-950 flex items-center gap-2">
                <Wrench size={22} className="text-sky-600" />
                <BopomofoText text="動手體驗區：點擊或拖曳教具，觀察數字與圖像的變化！" showBpmf={bopomofoEnabled} />
              </span>
            </div>

            {/* 互動教具容器 */}
            <div className="py-2">{renderManipulative()}</div>
          </div>
        )}

        {/* ================= 階段三：圖解思考與口訣秘笈 ================= */}
        {activeTab === 'steps' && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* 朗朗上口兒歌口訣卡 */}
            {unit.rhyme && (
              <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 p-6 sm:p-8 rounded-3xl border-3 border-amber-400 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-amber-950 flex items-center gap-2">
                    🎵 <BopomofoText text={unit.rhyme.title} showBpmf={bopomofoEnabled} />
                  </h3>
                  <VoiceButton textToSpeak={unit.rhyme.lines.join(' ')} size="md" />
                </div>
                <div className="flex flex-col gap-3">
                  {unit.rhyme.lines.map((line, idx) => (
                    <div
                      key={idx}
                      className="text-lg sm:text-2xl font-black text-amber-900 bg-white/90 p-3.5 rounded-2xl border border-amber-200 shadow-sm"
                    >
                      <BopomofoText text={line} showBpmf={bopomofoEnabled} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 步驟拆解卡片 */}
            {unit.lessonSteps && (
              <div className="flex flex-col gap-4">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Lightbulb size={24} className="text-amber-500" />
                  <BopomofoText text="圖解三步驟解題法" showBpmf={bopomofoEnabled} />
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {unit.lessonSteps.map(step => (
                    <div
                      key={step.stepNum}
                      className="p-5 sm:p-6 rounded-3xl bg-slate-50 border-3 border-slate-200 flex items-start gap-4 shadow-sm"
                    >
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-500 text-amber-950 font-black text-xl sm:text-2xl flex items-center justify-center shrink-0 shadow">
                        {step.stepNum}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                          <BopomofoText text={step.stepTitle} showBpmf={bopomofoEnabled} />
                        </h4>
                        <p className="text-base sm:text-lg font-bold text-slate-700 leading-relaxed">
                          <BopomofoText text={step.stepDesc} showBpmf={bopomofoEnabled} />
                        </p>
                        {step.tip && (
                          <div className="mt-2.5 p-3 rounded-xl bg-amber-100 text-amber-950 text-sm sm:text-base font-black border border-amber-300">
                            💡 <BopomofoText text={step.tip} showBpmf={bopomofoEnabled} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= 階段四：概念隨堂暖身小測驗 ================= */}
        {activeTab === 'warmup' && unit.warmup && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="bg-emerald-50 p-5 rounded-3xl border-3 border-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle size={28} className="text-emerald-600 shrink-0" />
                <span className="text-lg sm:text-xl font-black text-emerald-950">
                  <BopomofoText text="隨堂暖身題：試著回答看看，答對就可以放心去闖關囉！" showBpmf={bopomofoEnabled} />
                </span>
              </div>
              <VoiceButton
                textToSpeak={`${unit.warmup.question} 選項一：${unit.warmup.options[0]}，選項二：${unit.warmup.options[1]}，選項三：${unit.warmup.options[2]}`}
                size="md"
              />
            </div>

            {/* 題目與選項 */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border-3 border-slate-200">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 leading-relaxed">
                <BopomofoText text={unit.warmup.question} showBpmf={bopomofoEnabled} />
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {unit.warmup.options.map((opt, idx) => {
                  const isSelected = warmupSelected === idx;
                  const isCorrect = idx === unit.warmup?.answerIndex;

                  let btnStyle = 'bg-white text-slate-900 border-3 border-slate-300 hover:border-amber-400 hover:bg-amber-50';
                  if (warmupAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500 text-white border-3 border-emerald-600 shadow-md ring-4 ring-emerald-200';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500 text-white border-3 border-rose-600';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleWarmupOptionClick(idx)}
                      disabled={warmupAnswered}
                      className={`p-5 rounded-2xl font-black text-lg sm:text-xl transition-all btn-fun ${btnStyle}`}
                    >
                      <BopomofoText text={opt} showBpmf={bopomofoEnabled} />
                    </button>
                  );
                })}
              </div>

              {/* 回饋解析 */}
              {warmupAnswered && (
                <div className="mt-6 p-5 rounded-2xl bg-white border-3 border-amber-300 shadow-md flex flex-col gap-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-xl font-black">
                    {warmupSelected === unit.warmup.answerIndex ? (
                      <span className="text-emerald-600 flex items-center gap-2">
                        🎉 <BopomofoText text="太棒了！答對囉！" showBpmf={bopomofoEnabled} />
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-2">
                        💪 <BopomofoText text="再想一下下喔！" showBpmf={bopomofoEnabled} />
                      </span>
                    )}
                  </div>
                  <p className="text-base sm:text-lg font-bold text-slate-800">
                    <BopomofoText text={unit.warmup.explanation} showBpmf={bopomofoEnabled} />
                  </p>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => {
                        soundFx.playFanfare();
                        onStartPractice();
                      }}
                      className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-lg rounded-2xl shadow-md border-2 border-amber-600 btn-fun"
                    >
                      <BopomofoText text="出發去闖關 ➔" showBpmf={bopomofoEnabled} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
