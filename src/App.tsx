import React, { useState, useEffect } from 'react';
import { Grade, Unit, UserProgress } from './types';
import { CURRICULUM_UNITS } from './data/curriculum';
import { QUESTIONS } from './data/questions';
import { Navbar } from './components/Navbar';
import { UnitSelector } from './components/UnitSelector';
import { LessonMode } from './components/LessonMode';
import { PracticeMode } from './components/PracticeMode';
import { ReviewModal } from './components/ReviewModal';
import { speechService } from './services/speech';
import { soundFx } from './services/audio';

const STORAGE_KEY = 'tw_primary_math_v115_progress';

const initialProgress: UserProgress = {
  totalStars: 12,
  unitProgress: {
    'g1-split-ten': { stars: 3, highScore: 100, attempts: 2 },
    'g1-clock-intro': { stars: 2, highScore: 80, attempts: 1 }
  },
  mistakeHistory: [],
  preferences: {
    bopomofo: true,
    speechAudio: true,
    soundFx: true
  }
};

export const App: React.FC = () => {
  const [currentGrade, setCurrentGrade] = useState<Grade>(1);
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const [currentMode, setCurrentMode] = useState<'home' | 'lesson' | 'practice'>('home');
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  // 使用者進度儲存
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return initialProgress;
  });

  // 注音開關
  const [bopomofoEnabled, setBopomofoEnabled] = useState<boolean>(
    userProgress.preferences?.bopomofo ?? true
  );

  // 音效開關
  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    userProgress.preferences?.soundFx ?? true
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
  }, [userProgress]);

  const handleToggleBopomofo = () => {
    setBopomofoEnabled(prev => {
      const next = !prev;
      setUserProgress(up => ({
        ...up,
        preferences: { ...up.preferences, bopomofo: next }
      }));
      return next;
    });
  };

  const handleToggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      soundFx.enabled = next;
      speechService.enabled = next;
      setUserProgress(up => ({
        ...up,
        preferences: { ...up.preferences, soundFx: next, speechAudio: next }
      }));
      return next;
    });
  };

  const handleSelectUnit = (unit: Unit, mode: 'lesson' | 'practice') => {
    setActiveUnit(unit);
    setCurrentMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishQuiz = (earnedStars: number, newMistakes: { questionId: string; unitId: string }[]) => {
    if (!activeUnit) return;

    setUserProgress(prev => {
      const existing = prev.unitProgress[activeUnit.id] || { stars: 0, highScore: 0, attempts: 0 };
      const starDiff = Math.max(0, earnedStars - existing.stars);

      // 更新錯題歷史
      const updatedMistakes = [...prev.mistakeHistory];
      newMistakes.forEach(nm => {
        const idx = updatedMistakes.findIndex(m => m.questionId === nm.questionId);
        if (idx >= 0) {
          updatedMistakes[idx].wrongCount += 1;
          updatedMistakes[idx].lastWrongTime = new Date().toISOString();
        } else {
          updatedMistakes.push({
            questionId: nm.questionId,
            unitId: nm.unitId,
            wrongCount: 1,
            lastWrongTime: new Date().toISOString()
          });
        }
      });

      return {
        ...prev,
        totalStars: prev.totalStars + starDiff,
        unitProgress: {
          ...prev.unitProgress,
          [activeUnit.id]: {
            stars: Math.max(existing.stars, earnedStars),
            highScore: Math.max(existing.highScore ?? 0, Math.round(earnedStars * 33.4)),
            attempts: existing.attempts + 1,
            completedAt: new Date().toISOString()
          }
        },
        mistakeHistory: updatedMistakes
      };
    });
  };

  const handleResetProgress = () => {
    setUserProgress({
      totalStars: 0,
      unitProgress: {},
      mistakeHistory: [],
      preferences: {
        bopomofo: bopomofoEnabled,
        speechAudio: soundEnabled,
        soundFx: soundEnabled
      }
    });
    setIsReviewOpen(false);
  };

  const activeQuestions = activeUnit
    ? QUESTIONS.filter(q => q.unitId === activeUnit.id)
    : [];

  return (
    <div className={`min-h-screen bg-amber-50/50 flex flex-col font-sans ${bopomofoEnabled ? '' : 'bopomofo-off'}`}>
      {/* 頂部導覽列 */}
      <Navbar
        currentGrade={currentGrade}
        onGradeChange={g => {
          setCurrentGrade(g);
          setCurrentMode('home');
          setActiveUnit(null);
        }}
        bopomofoEnabled={bopomofoEnabled}
        onToggleBopomofo={handleToggleBopomofo}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        totalStars={userProgress.totalStars}
        onOpenReview={() => setIsReviewOpen(true)}
        onGoHome={() => {
          setCurrentMode('home');
          setActiveUnit(null);
        }}
      />

      {/* 主體畫面路由切換 */}
      <main className="flex-1 pb-16">
        {currentMode === 'home' && (
          <UnitSelector
            units={CURRICULUM_UNITS}
            currentGrade={currentGrade}
            userProgress={userProgress}
            bopomofoEnabled={bopomofoEnabled}
            onSelectUnit={handleSelectUnit}
          />
        )}

        {currentMode === 'lesson' && activeUnit && (
          <LessonMode
            unit={activeUnit}
            bopomofoEnabled={bopomofoEnabled}
            onBack={() => {
              setCurrentMode('home');
              setActiveUnit(null);
            }}
            onStartPractice={() => {
              setCurrentMode('practice');
            }}
          />
        )}

        {currentMode === 'practice' && activeUnit && (
          <PracticeMode
            unit={activeUnit}
            questions={
              activeQuestions.length > 0
                ? activeQuestions
                : QUESTIONS.slice(0, 3) // 預設備用題
            }
            bopomofoEnabled={bopomofoEnabled}
            onBack={() => {
              setCurrentMode('home');
              setActiveUnit(null);
            }}
            onFinishQuiz={handleFinishQuiz}
          />
        )}
      </main>

      {/* 學習報告與錯題本視窗 */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        userProgress={userProgress}
        onResetProgress={handleResetProgress}
      />

      {/* 頁尾版權與教育部課綱對照標示 */}
      <footer className="bg-amber-100/60 border-t-2 border-amber-200 py-4 px-4 text-center text-xs text-amber-900 font-bold">
        <p>🎈 小勇士數學樂園 · 台灣國小一二年級數學教學與自主練習系統</p>
        <p className="text-[11px] text-amber-800/80 mt-1">
          依據教育部「十二年國民基本教育課程綱要（108課綱／民國115學年度最新修訂審定版）」設計 · 支援全文注音與在地真人語音
        </p>
      </footer>
    </div>
  );
};

export default App;
