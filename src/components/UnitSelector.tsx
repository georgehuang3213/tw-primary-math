import React, { useState } from 'react';
import { Star, PlayCircle, Dumbbell, ChevronLeft, ChevronRight, LayoutGrid, Maximize2, CheckCircle2 } from 'lucide-react';
import { Unit, Grade, Semester, UserProgress } from '../types';
import { BopomofoText } from './BopomofoText';
import { soundFx } from '../services/audio';

interface UnitSelectorProps {
  units: Unit[];
  currentGrade: Grade;
  userProgress: UserProgress;
  bopomofoEnabled: boolean;
  onSelectUnit: (unit: Unit, mode: 'lesson' | 'practice') => void;
}

export const UnitSelector: React.FC<UnitSelectorProps> = ({
  units,
  currentGrade,
  userProgress,
  bopomofoEnabled,
  onSelectUnit
}) => {
  const [selectedSemester, setSelectedSemester] = useState<Semester | 'all'>('all');
  const [activeUnitIndex, setActiveUnitIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'stage' | 'grid'>('stage');

  const filteredUnits = units.filter(u => {
    if (u.grade !== currentGrade) return false;
    if (selectedSemester !== 'all' && u.semester !== selectedSemester) return false;
    return true;
  });

  const safeIndex = Math.min(activeUnitIndex, Math.max(0, filteredUnits.length - 1));
  const currentUnit = filteredUnits[safeIndex] || filteredUnits[0];

  const handlePrev = () => {
    soundFx.playPop();
    setActiveUnitIndex(prev => (prev > 0 ? prev - 1 : filteredUnits.length - 1));
  };

  const handleNext = () => {
    soundFx.playPop();
    setActiveUnitIndex(prev => (prev < filteredUnits.length - 1 ? prev + 1 : 0));
  };

  if (!currentUnit) {
    return <div className="p-8 text-center text-xl font-black text-amber-900">載入單元中...</div>;
  }

  const currentUnitProgress = userProgress.unitProgress[currentUnit.id] || { stars: 0, attempts: 0 };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col gap-5 min-h-[85vh] justify-between">
      {/* 頂部學期切換與視圖切換 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3.5 rounded-3xl border-4 border-amber-300 shadow-md">
        {/* 學期選擇按鈕 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playPop();
              setSelectedSemester('all');
              setActiveUnitIndex(0);
            }}
            className={`px-4 py-2 rounded-2xl text-base font-black transition ${
              selectedSemester === 'all'
                ? 'bg-amber-500 text-amber-950 shadow-md scale-105'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            <BopomofoText text="全部" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setSelectedSemester(1);
              setActiveUnitIndex(0);
            }}
            className={`px-4 py-2 rounded-2xl text-base font-black transition ${
              selectedSemester === 1
                ? 'bg-amber-500 text-amber-950 shadow-md scale-105'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            <BopomofoText text="上學期" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setSelectedSemester(2);
              setActiveUnitIndex(0);
            }}
            className={`px-4 py-2 rounded-2xl text-base font-black transition ${
              selectedSemester === 2
                ? 'bg-amber-500 text-amber-950 shadow-md scale-105'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            <BopomofoText text="下學期" showBpmf={bopomofoEnabled} />
          </button>
        </div>

        {/* 舞台全畫面 / 網格總覽 切換 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playPop();
              setViewMode(viewMode === 'stage' ? 'grid' : 'stage');
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-2xl text-sm font-black border-2 border-amber-300 transition"
          >
            {viewMode === 'stage' ? <LayoutGrid size={18} /> : <Maximize2 size={18} />}
            <span>
              <BopomofoText text={viewMode === 'stage' ? '全覽模式' : '大畫面探索'} showBpmf={bopomofoEnabled} />
            </span>
          </button>
        </div>
      </div>

      {/* ================= 模式一：滿版大畫面探索模式 ================= */}
      {viewMode === 'stage' && (
        <div className="flex-1 flex flex-col justify-between">
          {/* 滿版單元巨幅卡片（純淨白底，無泛黃光暈） */}
          <div className="bg-white rounded-3xl sm:rounded-[36px] border-4 sm:border-8 border-amber-300 shadow-[0_16px_0_0_#fcd34d] p-6 sm:p-10 relative flex flex-col justify-between transition-all">
            {/* 卡片頂部資訊 */}
            <div>
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-sky-600 text-white shadow-sm border border-sky-700">
                    <BopomofoText text="翰林版課本同步" showBpmf={bopomofoEnabled} />
                  </span>
                  <span className="text-sm sm:text-base font-black px-4 py-1.5 rounded-full bg-amber-400 text-amber-950 shadow-sm border border-amber-500">
                    <BopomofoText
                      text={`第 ${currentUnit.order} 單元 · ${currentGrade === 1 ? '一年級' : '二年級'}${currentUnit.semester === 1 ? '上學期' : '下學期'}`}
                      showBpmf={bopomofoEnabled}
                    />
                  </span>
                </div>

                {/* 掌握度徽章（乾淨明亮、高對比清晰設計） */}
                <div className="flex items-center gap-2 bg-amber-100/90 px-4 py-2 rounded-2xl border-2 border-amber-400 shadow-sm">
                  <span className="text-sm font-black text-amber-950 mr-1">
                    <BopomofoText text="掌握度" showBpmf={bopomofoEnabled} />:
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map(s => (
                      <Star
                        key={s}
                        size={22}
                        className={
                          s <= currentUnitProgress.stars
                            ? 'text-amber-500 fill-amber-400'
                            : 'text-amber-300 fill-white stroke-amber-400 stroke-2'
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* 巨幅標題與大圖示 */}
              <div className="flex items-center gap-4 sm:gap-6 my-4">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-amber-100 flex items-center justify-center text-5xl sm:text-7xl shadow-md border-4 border-amber-300 shrink-0 transform hover:scale-105 transition">
                  {currentUnit.icon}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-2">
                    <BopomofoText
                      text={currentUnit.title}
                      bpmfText={currentUnit.titleBpmf}
                      showBpmf={bopomofoEnabled}
                    />
                  </h2>
                  <p className="text-base sm:text-2xl font-black text-amber-800">
                    <BopomofoText text={currentUnit.subtitle} showBpmf={bopomofoEnabled} />
                  </p>
                </div>
              </div>

              {/* 單元生動故事說明 */}
              <div className="bg-amber-50 p-5 sm:p-6 rounded-3xl border-2 border-amber-200 my-4 text-slate-800 text-base sm:text-xl font-bold leading-relaxed shadow-sm">
                <BopomofoText text={currentUnit.description} showBpmf={bopomofoEnabled} />
              </div>

              {/* 三大學習重點大方塊 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                {currentUnit.learningGoals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-300 shadow-sm flex items-start gap-2.5"
                  >
                    <CheckCircle2 size={24} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      <BopomofoText text={goal} showBpmf={bopomofoEnabled} />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 底部雙巨型按鈕 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t-4 border-amber-100">
              <button
                onClick={() => {
                  soundFx.playPop();
                  onSelectUnit(currentUnit, 'lesson');
                }}
                className="py-4 sm:py-5 px-6 bg-white hover:bg-sky-50 text-sky-700 font-black text-xl sm:text-2xl rounded-3xl border-4 border-sky-300 shadow-[0_8px_0_0_#bae6fd] hover:shadow-[0_12px_0_0_#7dd3fc] btn-fun flex items-center justify-center gap-3"
              >
                <PlayCircle size={32} className="text-sky-600" />
                <BopomofoText text="進入概念教學" showBpmf={bopomofoEnabled} />
              </button>

              <button
                onClick={() => {
                  soundFx.playFanfare();
                  onSelectUnit(currentUnit, 'practice');
                }}
                className="py-4 sm:py-5 px-6 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xl sm:text-2xl rounded-3xl border-4 border-amber-600 shadow-[0_8px_0_0_#d97706] hover:shadow-[0_12px_0_0_#b45309] btn-fun flex items-center justify-center gap-3"
              >
                <Dumbbell size={32} />
                <BopomofoText text="開始闖關練習" showBpmf={bopomofoEnabled} />
              </button>
            </div>
          </div>

          {/* 左右切換按鈕與底端單元縮圖條 */}
          <div className="flex items-center justify-between gap-3 mt-6">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-amber-100 text-amber-950 font-black text-base sm:text-lg rounded-2xl border-3 border-amber-300 shadow-md btn-fun"
            >
              <ChevronLeft size={24} />
              <BopomofoText text="上一個單元" showBpmf={bopomofoEnabled} />
            </button>

            {/* 單元進度圓點與計數 */}
            <div className="flex items-center gap-2 overflow-x-auto py-2 px-3 bg-white rounded-2xl border-2 border-amber-300 shadow-sm">
              {filteredUnits.map((u, i) => (
                <button
                  key={u.id}
                  onClick={() => {
                    soundFx.playPop();
                    setActiveUnitIndex(i);
                  }}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl font-black text-sm sm:text-base flex items-center justify-center transition-all ${
                    i === safeIndex
                      ? 'bg-amber-600 text-white scale-110 shadow-md ring-3 ring-amber-300'
                      : 'bg-amber-50 text-slate-800 hover:bg-amber-200 border border-amber-200'
                  }`}
                  title={u.title}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-amber-100 text-amber-950 font-black text-base sm:text-lg rounded-2xl border-3 border-amber-300 shadow-md btn-fun"
            >
              <BopomofoText text="下一個單元" showBpmf={bopomofoEnabled} />
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}

      {/* ================= 模式二：網格總覽模式 ================= */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredUnits.map((unit, idx) => {
            const progress = userProgress.unitProgress[unit.id] || { stars: 0, attempts: 0 };

            return (
              <div
                key={unit.id}
                className="bg-white rounded-3xl border-4 border-amber-300 shadow-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl">{unit.icon}</span>
                    <div className="flex gap-1 bg-amber-100 p-1.5 rounded-xl border border-amber-300">
                      {[1, 2, 3].map(s => (
                        <Star
                          key={s}
                          size={18}
                          className={
                            s <= progress.stars
                              ? 'text-amber-500 fill-amber-400'
                              : 'text-amber-300 fill-white stroke-amber-400 stroke-2'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-2">
                    <BopomofoText text={unit.title} bpmfText={unit.titleBpmf} showBpmf={bopomofoEnabled} />
                  </h3>
                  <p className="text-base font-bold text-slate-700 mb-4">
                    <BopomofoText text={unit.description} showBpmf={bopomofoEnabled} />
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-amber-100">
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      onSelectUnit(unit, 'lesson');
                    }}
                    className="py-2.5 bg-sky-100 hover:bg-sky-200 text-sky-900 rounded-xl font-black text-sm text-center"
                  >
                    <BopomofoText text="概念教學" showBpmf={bopomofoEnabled} />
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playPop();
                      onSelectUnit(unit, 'practice');
                    }}
                    className="py-2.5 bg-amber-500 hover:bg-amber-600 text-amber-950 rounded-xl font-black text-sm text-center shadow"
                  >
                    <BopomofoText text="闖關練習" showBpmf={bopomofoEnabled} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
