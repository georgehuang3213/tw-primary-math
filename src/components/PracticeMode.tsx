import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Check, Star, Lightbulb, ChevronRight, Volume2 } from 'lucide-react';
import { Unit, Question } from '../types';
import { BopomofoText } from './BopomofoText';
import { VoiceButton } from './VoiceButton';
import { soundFx } from '../services/audio';
import { speechService } from '../services/speech';

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

interface PracticeModeProps {
  unit: Unit;
  nextUnit?: Unit;
  questions: Question[];
  bopomofoEnabled: boolean;
  onBack: () => void;
  onGoToNextUnit?: (nextUnit: Unit) => void;
  onFinishQuiz: (earnedStars: number, mistakes: { questionId: string; unitId: string }[]) => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  unit,
  nextUnit,
  questions,
  bopomofoEnabled,
  onBack,
  onGoToNextUnit,
  onFinishQuiz
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showRescueTool, setShowRescueTool] = useState(false);
  
  const [correctCount, setCorrectCount] = useState(0);
  const [recordedMistakes, setRecordedMistakes] = useState<{ questionId: string; unitId: string }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  // 切換題目或離開測驗時，立即停止任何進行中的題目語音朗讀
  React.useEffect(() => {
    speechService.stop();
    return () => {
      speechService.stop();
    };
  }, [currentIndex]);

  const handleSelectOption = (optionId: string) => {
    if (isAnswerChecked) return;
    soundFx.playPop();
    setSelectedOptionId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || isAnswerChecked) return;

    const chosenOption = currentQ.options?.find(o => o.id === selectedOptionId);
    const correct = !!chosenOption?.isCorrect;

    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      soundFx.playCorrect();
      setCorrectCount(prev => prev + 1);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      soundFx.playWrong();
      setRecordedMistakes(prev => [
        ...prev,
        { questionId: currentQ.id, unitId: unit.id }
      ]);
    }
  };

  const handleNextQuestion = () => {
    soundFx.playPop();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setShowHint(false);
      setShowRescueTool(false);
    } else {
      setIsCompleted(true);
      soundFx.playFanfare();
      confetti({
        particleCount: 140,
        spread: 100,
        origin: { y: 0.5 }
      });

      const totalQ = questions.length || 1;
      const accuracy = (correctCount + (isCorrect ? 1 : 0)) / totalQ;
      let stars = 1;
      if (accuracy >= 0.9) stars = 3;
      else if (accuracy >= 0.6) stars = 2;

      onFinishQuiz(stars, recordedMistakes);
    }
  };

  const renderRescueTool = () => {
    switch (unit.manipulativeType) {
      case 'fraction_pie':
        return <FractionPieLab bopomofoEnabled={bopomofoEnabled} />;
      case 'calendar_lab':
        return <CalendarLab bopomofoEnabled={bopomofoEnabled} unitId={unit.id} />;
      case 'unit_length':
        return <UnitLengthLab bopomofoEnabled={bopomofoEnabled} unitId={unit.id} />;
      case 'shape_lab':
        return <ShapeLab bopomofoEnabled={bopomofoEnabled} unitId={unit.id} />;
      case 'balance_scale':
        return <BalanceScale bopomofoEnabled={bopomofoEnabled} />;
      case 'capacity_lab':
        return <CapacityLab bopomofoEnabled={bopomofoEnabled} />;
      case 'area_grid':
        return <AreaGridLab bopomofoEnabled={bopomofoEnabled} />;
      case 'data_graph':
        return <BarChartLab bopomofoEnabled={bopomofoEnabled} unitId={unit.id} />;
      case 'animal_counter':
        return <AnimalCounter bopomofoEnabled={bopomofoEnabled} />;
      case 'clock':
        return <ClockSimulator initialHours={8} initialMinutes={unit.id === 'g1-u7-time-clock' ? 0 : 25} bopomofoEnabled={bopomofoEnabled} />;
      case 'coins':
        return <TaiwanCoins unitId={unit.id} bopomofoEnabled={bopomofoEnabled} />;
      case 'vertical_arithmetic':
        return (
          <VerticalArithmetic
            operation={unit.id === 'g2-u2-add-sub-vertical' ? 'add' : 'sub'}
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
        return <VirtualRuler bopomofoEnabled={bopomofoEnabled} unitId={unit.id} />;
      case 'ten_split':
        return <TenSplitBoard totalCount={10} unitId={unit.id} bopomofoEnabled={bopomofoEnabled} />;
      default:
        return <AnimalCounter bopomofoEnabled={bopomofoEnabled} />;
    }
  };

  if (isCompleted) {
    const finalCorrect = correctCount;
    const totalQ = questions.length;
    const finalStars = finalCorrect === totalQ ? 3 : finalCorrect >= Math.ceil(totalQ * 0.6) ? 2 : 1;

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-white rounded-[36px] border-8 border-amber-300 shadow-2xl p-8 sm:p-12">
          <div className="text-8xl mb-4 animate-bounce-short">🏆</div>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-800 mb-3">
            <BopomofoText text="闖關大成功！" showBpmf={bopomofoEnabled} />
          </h2>
          <p className="text-xl sm:text-2xl text-amber-800 font-black mb-8">
            <BopomofoText
              text={`你完成了「${unit.title}」的數學挑戰！`}
              showBpmf={bopomofoEnabled}
            />
          </p>

          <div className="flex justify-center gap-4 my-8">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`transform transition duration-500 ${
                  s <= finalStars ? 'scale-125 text-amber-500' : 'text-slate-200'
                }`}
              >
                <Star size={56} className={s <= finalStars ? 'fill-amber-400' : 'fill-slate-200'} />
              </div>
            ))}
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border-3 border-amber-200 font-black text-slate-800 text-2xl mb-8">
            <BopomofoText text="答對題數：" showBpmf={bopomofoEnabled} />
            <span className="text-emerald-600 text-4xl font-mono mx-2">{finalCorrect}</span>
            / {totalQ} <BopomofoText text="題" showBpmf={bopomofoEnabled} />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {nextUnit && onGoToNextUnit && (
              <button
                onClick={() => {
                  soundFx.playCorrect();
                  onGoToNextUnit(nextUnit);
                }}
                className="flex-1 py-4 sm:py-5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xl sm:text-2xl rounded-3xl shadow-xl border-4 border-emerald-600 btn-fun flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95"
              >
                <span>🚀</span>
                <BopomofoText text={`前往下一單元：${nextUnit.title} ➔`} showBpmf={bopomofoEnabled} />
              </button>
            )}

            <button
              onClick={() => {
                soundFx.playPop();
                onBack();
              }}
              className={`py-4 sm:py-5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xl sm:text-2xl rounded-3xl shadow-lg border-4 border-amber-600 btn-fun ${
                nextUnit ? 'sm:w-1/3' : 'w-full'
              }`}
            >
              <BopomofoText text="返回單元大廳" showBpmf={bopomofoEnabled} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
      {/* 頂部導航與進度 */}
      <div className="flex items-center justify-between gap-4 mb-6 bg-white/90 p-3 rounded-2xl border-2 border-amber-300 shadow-sm">
        <button
          onClick={() => {
            soundFx.playPop();
            onBack();
          }}
          className="flex items-center gap-1.5 text-base font-black text-amber-950 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-xl border border-amber-300 shadow-sm"
        >
          <ArrowLeft size={18} />
          <BopomofoText text="返回" showBpmf={bopomofoEnabled} />
        </button>

        {/* 進度條 */}
        <div className="flex-1 max-w-sm bg-slate-100 p-1 rounded-full border-2 border-amber-300 shadow-inner flex items-center">
          <div
            className="h-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <span className="text-base font-black text-amber-950 bg-amber-200 px-3.5 py-1.5 rounded-full">
          <BopomofoText
            text={`第 ${currentIndex + 1} / ${questions.length} 題`}
            showBpmf={bopomofoEnabled}
          />
        </span>
      </div>

      {/* 題目主卡片（特大字體、高對比） */}
      <div className="bg-white rounded-3xl sm:rounded-[36px] border-4 sm:border-8 border-amber-300 shadow-xl p-6 sm:p-10 mb-6">
        {/* 情境故事小標 */}
        {currentQ.storyContext && (
          <div className="inline-block text-sm sm:text-base font-black text-amber-900 bg-amber-100 px-4 py-1.5 rounded-full mb-4 border border-amber-200">
            <BopomofoText text={currentQ.storyContext} showBpmf={bopomofoEnabled} />
          </div>
        )}

        {/* 題目內文與朗讀按鈕 */}
        <div className="flex items-start justify-between gap-4 mb-8">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-snug">
            <BopomofoText
              text={currentQ.title}
              bpmfText={currentQ.titleBpmf}
              showBpmf={bopomofoEnabled}
            />
          </h2>
          <VoiceButton textToSpeak={currentQ.promptAudioText} size="lg" />
        </div>

        {/* 大選項按鈕區 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
          {currentQ.options?.map(opt => {
            const isSelected = selectedOptionId === opt.id;
            let optStyle = 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-slate-800';

            if (isSelected) {
              optStyle = 'bg-amber-200 border-amber-500 ring-4 sm:ring-8 ring-amber-300 text-amber-950 font-black scale-102';
            }

            if (isAnswerChecked) {
              if (opt.isCorrect) {
                optStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-4 sm:ring-8 ring-emerald-300';
              } else if (isSelected && !opt.isCorrect) {
                optStyle = 'bg-rose-100 border-rose-400 text-rose-950 ring-4 ring-rose-200 opacity-80';
              }
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswerChecked}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-5 sm:p-7 rounded-3xl border-4 text-left font-black text-xl sm:text-3xl transition-all flex items-center justify-between btn-fun shadow-md ${optStyle}`}
              >
                <span>
                  <BopomofoText
                    text={opt.text}
                    bpmfText={opt.textBpmf}
                    showBpmf={bopomofoEnabled}
                  />
                </span>

                {isAnswerChecked && opt.isCorrect && (
                  <span className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow">
                    <Check size={26} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 答題動作按鈕區 */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t-4 border-amber-100">
          <div className="flex gap-3">
            <button
              onClick={() => {
                soundFx.playPop();
                setShowHint(!showHint);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-2xl text-sm sm:text-base font-black transition border border-amber-300"
            >
              <Lightbulb size={20} className="text-amber-600" />
              <BopomofoText text={showHint ? '隱藏提示' : '看小提示'} showBpmf={bopomofoEnabled} />
            </button>

            <button
              onClick={() => {
                soundFx.playPop();
                setShowRescueTool(!showRescueTool);
              }}
              className="flex items-center gap-2 px-4 py-3 bg-sky-100 hover:bg-sky-200 text-sky-950 rounded-2xl text-sm sm:text-base font-black transition border border-sky-300"
            >
              <span>🛠️ </span>
              <BopomofoText text={showRescueTool ? '收起教具' : '拿出教具動手算'} showBpmf={bopomofoEnabled} />
            </button>
          </div>

          {!isAnswerChecked ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOptionId}
              className={`px-8 py-4 font-black text-xl sm:text-2xl rounded-3xl transition-all duration-200 flex items-center gap-2 ${
                selectedOptionId
                  ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 border-4 border-amber-600 shadow-xl scale-105 btn-fun cursor-pointer animate-pulse'
                  : 'bg-slate-200 text-slate-600 border-2 border-slate-300 shadow-none cursor-not-allowed'
              }`}
            >
              <BopomofoText text={selectedOptionId ? "確認送出答案 ➔" : "請先點選答案 ➔"} showBpmf={bopomofoEnabled} />
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xl sm:text-2xl rounded-3xl shadow-lg border-4 border-emerald-700 btn-fun flex items-center gap-2"
            >
              <BopomofoText
                text={currentIndex + 1 < questions.length ? '下一題' : '查看成績'}
                showBpmf={bopomofoEnabled}
              />
              <ChevronRight size={26} />
            </button>
          )}
        </div>

        {/* 提示區塊 */}
        {showHint && (
          <div className="mt-6 p-5 sm:p-6 bg-amber-50 rounded-3xl border-3 border-amber-300 text-amber-950 text-base sm:text-xl font-bold animate-fadeIn">
            <div className="flex items-center gap-2 font-black text-amber-950 mb-2">
              <Lightbulb size={22} className="text-amber-500" />
              <BopomofoText text="小精靈提示：" showBpmf={bopomofoEnabled} />
            </div>
            <BopomofoText text={currentQ.hint} bpmfText={currentQ.hintBpmf} showBpmf={bopomofoEnabled} />
          </div>
        )}

        {/* 即時解答解析 */}
        {isAnswerChecked && (
          <div
            className={`mt-6 p-5 sm:p-6 rounded-3xl border-3 text-base sm:text-xl font-bold ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                : 'bg-rose-50 border-rose-400 text-rose-950'
            }`}
          >
            <p className="font-black text-xl sm:text-2xl mb-2">
              <BopomofoText
                text={isCorrect ? '🎉 太棒了！答對了！' : '💪 別氣餒，再想一想：'}
                showBpmf={bopomofoEnabled}
              />
            </p>
            <p>
              <BopomofoText text={currentQ.explanation} showBpmf={bopomofoEnabled} />
            </p>
          </div>
        )}

        {/* 召喚教具操作抽屜 */}
        {showRescueTool && (
          <div className="mt-8 pt-6 border-t-4 border-dashed border-sky-300">
            <div className="text-center text-base sm:text-lg font-black text-sky-900 mb-4">
              ✨ <BopomofoText text="試著操作教具找出答案吧！" showBpmf={bopomofoEnabled} />
            </div>
            {renderRescueTool()}
          </div>
        )}
      </div>
    </div>
  );
};
