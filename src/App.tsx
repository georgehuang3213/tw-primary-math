import React, { useState, useEffect } from 'react';
import { Grade, Unit, UserProgress, UserAccount } from './types';
import { CURRICULUM_UNITS } from './data/curriculum';
import { QUESTIONS } from './data/questions';
import { Navbar } from './components/Navbar';
import { UnitSelector } from './components/UnitSelector';
import { LessonMode } from './components/LessonMode';
import { PracticeMode } from './components/PracticeMode';
import { ReviewModal } from './components/ReviewModal';
import { MistakeNotebookModal } from './components/MistakeNotebookModal';
import { LoginScreen } from './components/LoginScreen';
import { storageService } from './services/storage';
import { r2StorageService } from './services/r2Storage';
import { speechService } from './services/speech';
import { soundFx } from './services/audio';

export const App: React.FC = () => {
  const [currentAccountName, setCurrentAccountName] = useState<string | null>(() => storageService.getCurrentAccountName());
  const [userAccount, setUserAccount] = useState<UserAccount>(() => storageService.getUserAccount());
  const [currentGrade, setCurrentGrade] = useState<Grade>(1);
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const [currentMode, setCurrentMode] = useState<'home' | 'lesson' | 'practice'>('home');
  
  // Modals
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isMistakeNotebookOpen, setIsMistakeNotebookOpen] = useState(false);

  // 注音開關
  const [bopomofoEnabled, setBopomofoEnabled] = useState<boolean>(true);

  // 音效開關
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleLogin = (accountName: string) => {
    const acc = storageService.loginAccount(accountName);
    setCurrentAccountName(accountName);
    setUserAccount(acc);
    if (acc.lastGrade) {
      setCurrentGrade(acc.lastGrade);
    }
    setCurrentMode('home');
    setActiveUnit(null);

    // 登入後貼心語音播報上次進度（親切溫柔老師風格）
    if (acc.lastUnitTitle) {
      setTimeout(() => {
        speechService.speak(`歡迎回來，${accountName}。上次我們學到${acc.lastUnitTitle}，點一下按鈕就可以繼續學習囉。`);
      }, 500);
    }
  };

  const handleLogout = () => {
    soundFx.playPop();
    storageService.logoutAccount();
    setCurrentAccountName(null);
    setActiveUnit(null);
    setCurrentMode('home');
  };

  // 多人同時上線：自動背景定時心跳同步（支援多台平板/電腦同時作答即時合併）
  useEffect(() => {
    if (!currentAccountName) return;

    const performBackgroundSync = async () => {
      try {
        const remoteResult = await r2StorageService.fetchFromR2(currentAccountName);
        if (remoteResult.success && remoteResult.data) {
          const currentLocal = storageService.getUserAccount();
          const merged = storageService.mergeUserAccount(currentLocal, remoteResult.data);
          storageService.saveUserAccount(merged);
          setUserAccount(merged);
        }
      } catch (err) {
        console.error('Heartbeat sync error', err);
      }
    };

    // 每 15 秒背景檢查一次遠端平板進度
    const interval = setInterval(performBackgroundSync, 15000);

    // 當切回此分頁時立即觸發一次同步
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        performBackgroundSync();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [currentAccountName]);

  const handleToggleBopomofo = () => {
    setBopomofoEnabled(prev => !prev);
  };

  const handleToggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      soundFx.enabled = next;
      speechService.enabled = next;
      return next;
    });
  };

  const handleSelectUnit = (unit: Unit, mode: 'lesson' | 'practice') => {
    const updated = storageService.recordLastVisitedUnit(unit, mode);
    setUserAccount(updated);
    setActiveUnit(unit);
    setCurrentMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResumeLastUnit = (unitId: string, mode: 'lesson' | 'practice' = 'lesson') => {
    const found = CURRICULUM_UNITS.find(u => u.id === unitId);
    if (found) {
      setCurrentGrade(found.grade);
      handleSelectUnit(found, mode);
    }
  };

  const handleFinishQuiz = (earnedStars: number, newMistakes: { questionId: string; unitId: string }[]) => {
    if (!activeUnit) return;

    // 將成績與錯題寫入當前帳號的雲端/本地儲存庫
    const updated = storageService.recordQuizCompletion(activeUnit.id, earnedStars, newMistakes);
    setUserAccount(updated);
  };

  const handleResetProgress = () => {
    const resetAcc: UserAccount = {
      ...userAccount,
      totalStars: 0,
      completedUnits: [],
      unitStars: {},
      mistakes: []
    };
    storageService.saveUserAccount(resetAcc);
    setUserAccount(resetAcc);
    setIsReviewOpen(false);
  };

  // 將當前帳號的資料轉為 UnitSelector 所需的 UserProgress 結構
  const userProgress: UserProgress = {
    totalStars: userAccount.totalStars,
    unitProgress: Object.entries(userAccount.unitStars).reduce((acc, [uid, stars]) => {
      acc[uid] = { stars, attempts: 1 };
      return acc;
    }, {} as UserProgress['unitProgress']),
    mistakeHistory: userAccount.mistakes.map(m => ({
      questionId: m.questionId,
      unitId: m.unitId,
      wrongCount: 1,
      lastWrongTime: new Date(m.timestamp).toISOString()
    })),
    preferences: {
      bopomofo: bopomofoEnabled,
      speechAudio: soundEnabled,
      soundFx: soundEnabled
    }
  };

  const activeQuestions = activeUnit
    ? QUESTIONS.filter(q => q.unitId === activeUnit.id)
    : [];

  const currentUnitIdx = activeUnit ? CURRICULUM_UNITS.findIndex(u => u.id === activeUnit.id) : -1;
  const nextUnit = (currentUnitIdx >= 0 && currentUnitIdx + 1 < CURRICULUM_UNITS.length)
    ? CURRICULUM_UNITS[currentUnitIdx + 1]
    : undefined;

  if (!currentAccountName) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        bopomofoEnabled={bopomofoEnabled}
      />
    );
  }

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
        accountName={currentAccountName}
        totalStars={userAccount.totalStars}
        mistakeCount={userAccount.mistakes.length}
        onOpenMistakeNotebook={() => setIsMistakeNotebookOpen(true)}
        onOpenReview={() => setIsReviewOpen(true)}
        onLogout={handleLogout}
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
            accountName={currentAccountName}
            lastUnitId={userAccount.lastUnitId}
            lastUnitTitle={userAccount.lastUnitTitle}
            lastGrade={userAccount.lastGrade}
            lastMode={userAccount.lastMode}
            onSelectUnit={handleSelectUnit}
            onResumeLastUnit={handleResumeLastUnit}
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
            nextUnit={nextUnit}
            questions={
              activeQuestions.length > 0
                ? activeQuestions
                : QUESTIONS.slice(0, 3)
            }
            bopomofoEnabled={bopomofoEnabled}
            onBack={() => {
              setCurrentMode('home');
              setActiveUnit(null);
            }}
            onGoToNextUnit={(unit) => {
              setCurrentGrade(unit.grade);
              handleSelectUnit(unit, 'lesson');
            }}
            onFinishQuiz={handleFinishQuiz}
          />
        )}
      </main>

      {/* 專屬錯題本與針對性弱點複習視窗 */}
      <MistakeNotebookModal
        isOpen={isMistakeNotebookOpen}
        onClose={() => setIsMistakeNotebookOpen(false)}
        bopomofoEnabled={bopomofoEnabled}
        userAccount={userAccount}
        onMistakeResolved={() => {
          setUserAccount(storageService.getUserAccount());
        }}
      />

      {/* 學習報告視窗 */}
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
