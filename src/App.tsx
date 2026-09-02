import React, { useState, useEffect } from 'react';
import { Grade, Unit, UserProgress, StudentProfile } from './types';
import { CURRICULUM_UNITS } from './data/curriculum';
import { QUESTIONS } from './data/questions';
import { Navbar } from './components/Navbar';
import { UnitSelector } from './components/UnitSelector';
import { LessonMode } from './components/LessonMode';
import { PracticeMode } from './components/PracticeMode';
import { ReviewModal } from './components/ReviewModal';
import { StudentSwitcherModal } from './components/StudentSwitcherModal';
import { MistakeNotebookModal } from './components/MistakeNotebookModal';
import { LoginScreen } from './components/LoginScreen';
import { storageService } from './services/storage';
import { speechService } from './services/speech';
import { soundFx } from './services/audio';

export const App: React.FC = () => {
  const [currentAccountName, setCurrentAccountName] = useState<string | null>(() => storageService.getCurrentAccountName());
  const [activeStudent, setActiveStudent] = useState<StudentProfile>(() => storageService.getActiveStudent());
  const [currentGrade, setCurrentGrade] = useState<Grade>(activeStudent.grade || 1);
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const [currentMode, setCurrentMode] = useState<'home' | 'lesson' | 'practice'>('home');
  
  // Modals
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isStudentSwitcherOpen, setIsStudentSwitcherOpen] = useState(false);
  const [isMistakeNotebookOpen, setIsMistakeNotebookOpen] = useState(false);

  // 注音開關
  const [bopomofoEnabled, setBopomofoEnabled] = useState<boolean>(true);

  // 音效開關
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const handleLogin = (accountName: string) => {
    storageService.loginAccount(accountName);
    const updatedStudent = storageService.getActiveStudent();
    setCurrentAccountName(accountName);
    setActiveStudent(updatedStudent);
    setCurrentGrade(updatedStudent.grade || 1);
    setCurrentMode('home');
    setActiveUnit(null);
  };

  const handleLogout = () => {
    soundFx.playPop();
    storageService.logoutAccount();
    setCurrentAccountName(null);
    setActiveUnit(null);
    setCurrentMode('home');
  };

  // 當學生改變時重新載入資料與年級
  const handleStudentChanged = () => {
    const updated = storageService.getActiveStudent();
    setActiveStudent(updated);
    setCurrentGrade(updated.grade);
    setCurrentMode('home');
    setActiveUnit(null);
  };

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
    setActiveUnit(unit);
    setCurrentMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishQuiz = (earnedStars: number, newMistakes: { questionId: string; unitId: string }[]) => {
    if (!activeUnit) return;

    // 將成績與錯題寫入當前學生的專屬雲端/本地儲存庫
    storageService.recordQuizCompletion(activeStudent.id, activeUnit.id, earnedStars, newMistakes);
    setActiveStudent(storageService.getActiveStudent());
  };

  const handleResetProgress = () => {
    storageService.updateStudent(activeStudent.id, {
      totalStars: 0,
      completedUnits: [],
      unitStars: {},
      mistakes: []
    });
    setActiveStudent(storageService.getActiveStudent());
    setIsReviewOpen(false);
  };

  // 將當前學生的資料轉為 UnitSelector 所需的 UserProgress 結構
  const userProgress: UserProgress = {
    totalStars: activeStudent.totalStars,
    unitProgress: Object.entries(activeStudent.unitStars).reduce((acc, [uid, stars]) => {
      acc[uid] = { stars, attempts: 1 };
      return acc;
    }, {} as UserProgress['unitProgress']),
    mistakeHistory: activeStudent.mistakes.map(m => ({
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
      {/* 頂部導覽列（包含多學生頭像、切換與錯題本入口） */}
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
        activeStudent={activeStudent}
        accountName={currentAccountName}
        onOpenStudentSwitcher={() => setIsStudentSwitcherOpen(true)}
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
                : QUESTIONS.slice(0, 3)
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

      {/* 學生切換大廳與班級管理視窗 */}
      <StudentSwitcherModal
        isOpen={isStudentSwitcherOpen}
        onClose={() => setIsStudentSwitcherOpen(false)}
        bopomofoEnabled={bopomofoEnabled}
        onStudentChanged={handleStudentChanged}
      />

      {/* 專屬錯題本與針對性弱點複習視窗 */}
      <MistakeNotebookModal
        isOpen={isMistakeNotebookOpen}
        onClose={() => setIsMistakeNotebookOpen(false)}
        bopomofoEnabled={bopomofoEnabled}
        student={activeStudent}
        onMistakeResolved={() => {
          setActiveStudent(storageService.getActiveStudent());
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
