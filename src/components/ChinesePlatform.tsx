import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Volume2, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Feather,
  CheckCircle,
  HelpCircle,
  Play
} from 'lucide-react';
import { ChineseLesson, ChineseVocabulary, ChineseQuizQuestion, Grade } from '../types';
import { KANG_HSUAN_G1_CHINESE } from '../data/chineseCurriculum';
import { KANG_HSUAN_G1_S2_CHINESE } from '../data/chineseCurriculumS2';
import { HANLIN_G2_S1_CHINESE } from '../data/hanlinG2S1Chinese';
import { HANLIN_G2_S2_CHINESE } from '../data/hanlinG2S2Chinese';
import { BopomofoText } from './BopomofoText';
import { soundFx } from '../services/audio';
import { speechService } from '../services/speech';

interface ChinesePlatformProps {
  bopomofoEnabled: boolean;
  onBackToMath: () => void;
}

export const ChinesePlatform: React.FC<ChinesePlatformProps> = ({
  bopomofoEnabled,
  onBackToMath
}) => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(2); // 預設二年級
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(2); // 預設二下

  // 依據 年級 與 學期 取得對應課文清單
  const currentLessons = 
    selectedGrade === 2 
      ? (selectedSemester === 1 ? HANLIN_G2_S1_CHINESE : HANLIN_G2_S2_CHINESE)
      : (selectedSemester === 1 ? KANG_HSUAN_G1_CHINESE : KANG_HSUAN_G1_S2_CHINESE);

  const [selectedLessonId, setSelectedLessonId] = useState<string>(HANLIN_G2_S2_CHINESE[0].id);
  const [activeTab, setActiveTab] = useState<'text' | 'vocab' | 'quiz'>('text');

  const currentLesson = currentLessons.find(l => l.id === selectedLessonId) || currentLessons[0];

  // 切換年級、學期、課文、分頁以及離開國語平台時，立即停止任何進行中的語音朗讀
  useEffect(() => {
    speechService.stop();
    setActiveLineIdx(null);
    return () => {
      speechService.stop();
    };
  }, [selectedGrade, selectedSemester, selectedLessonId, activeTab]);

  // ==========================================
  // 課文朗讀與逐句高亮
  // ==========================================
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(null);

  const handleSpeakFullLesson = () => {
    soundFx.playCorrect();
    setActiveLineIdx(null);
    speechService.speak(currentLesson.contentAudioText);
  };

  const handleSpeakLine = (line: string, idx: number) => {
    soundFx.playPop();
    setActiveLineIdx(idx);
    speechService.speak(line);
  };

  // ==========================================
  // 生字筆順與部件解剖
  // ==========================================
  const [selectedVocab, setSelectedVocab] = useState<ChineseVocabulary>(currentLesson.vocabularies[0] || null);

  const handleSelectVocab = (v: ChineseVocabulary) => {
    soundFx.playPop();
    setSelectedVocab(v);
    speechService.speak(`${v.char}，注音 ${v.bpmf}，部首是 ${v.radical} 部，總共 ${v.strokeCount} 畫。造詞有：${v.words.join('、')}`);
  };

  // ==========================================
  // 隨堂闖關練習
  // ==========================================
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQuestion = currentLesson.questions[quizIdx] || currentLesson.questions[0];

  const handleSelectQuizOption = (opt: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);

    if (opt === currentQuestion.answer) {
      soundFx.playCorrect();
      setScore(s => s + 1);
    } else {
      soundFx.playWrong();
    }

    setTimeout(() => {
      if (quizIdx + 1 < currentLesson.questions.length) {
        setQuizIdx(i => i + 1);
        setSelectedOption(null);
      } else {
        setQuizFinished(true);
      }
    }, 1200);
  };

  const resetQuiz = () => {
    soundFx.playPop();
    setQuizIdx(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col gap-6 animate-fade-in">
      {/* 頂部學科橫條與版本標註 */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-4 sm:p-5 rounded-3xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playPop();
              onBackToMath();
            }}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-black text-xs sm:text-sm transition flex items-center gap-1.5 border border-white/30 shadow-sm"
          >
            <span>🦁</span>
            <span>切換回數學樂園</span>
          </button>
          <div className="text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black flex items-center gap-2">
                <span>📖</span>
                <span>
                  {selectedGrade === 2 
                    ? `翰林版 國小國語 ${selectedSemester === 1 ? '二年級上學期' : '二年級下學期'}` 
                    : `康軒版 國小國語 ${selectedSemester === 1 ? '一年級上學期' : '一年級下學期'}`}
                </span>
              </h1>
              <span className="text-[11px] bg-amber-400 text-amber-950 font-black px-2.5 py-0.5 rounded-full shadow-sm">
                課本同步
              </span>
            </div>
            <p className="text-xs text-emerald-100 font-bold mt-0.5">
              {selectedGrade === 2 
                ? (selectedSemester === 1
                    ? '翰林版二上：第1課至第12課 ＋ 統整活動一～四 ＋ 閱讀開門一、二（全冊完整收錄）'
                    : '翰林版二下：第1課至第12課（種子旅行、一場雨、孵蛋男孩、點亮世界的人、醜小鴨、蜘蛛救蛋等完整收錄）')
                : (selectedSemester === 1 
                    ? '康軒版一上：首冊注音符號統整 ＋ 第一課至第八課精編課文朗讀、生字筆順與測驗'
                    : '康軒版一下：第一課至第十二課完整課文朗讀、生字筆順與生活應用測驗')}
            </p>
          </div>
        </div>

        {/* 右側：年級切換、學期切換與課文大朗讀捷徑 */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* 年級切換按鈕 */}
          <div className="flex items-center bg-black/20 p-1 rounded-2xl border border-white/20">
            <button
              onClick={() => {
                soundFx.playPop();
                setSelectedGrade(1);
                setSelectedSemester(1);
                setSelectedLessonId(KANG_HSUAN_G1_CHINESE[1].id);
                setActiveLineIdx(null);
                setSelectedVocab(KANG_HSUAN_G1_CHINESE[1].vocabularies[0] || null);
                setQuizIdx(0);
                setSelectedOption(null);
                setScore(0);
                setQuizFinished(false);
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition ${
                selectedGrade === 1
                  ? 'bg-white text-emerald-950 shadow-md scale-105'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              一年級（康軒）
            </button>
            <button
              onClick={() => {
                soundFx.playPop();
                setSelectedGrade(2);
                setSelectedSemester(2); // 預設進二下
                setSelectedLessonId(HANLIN_G2_S2_CHINESE[0].id);
                setActiveLineIdx(null);
                setSelectedVocab(HANLIN_G2_S2_CHINESE[0].vocabularies[0] || null);
                setQuizIdx(0);
                setSelectedOption(null);
                setScore(0);
                setQuizFinished(false);
              }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs sm:text-sm transition ${
                selectedGrade === 2
                  ? 'bg-white text-emerald-950 shadow-md scale-105'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              二年級（翰林）
            </button>
          </div>

          {/* 上學期 / 下學期 切換 */}
          <div className="flex items-center bg-black/20 p-1 rounded-2xl border border-white/20">
            <button
              onClick={() => {
                soundFx.playPop();
                setSelectedSemester(1);
                const firstLesson = selectedGrade === 1 ? KANG_HSUAN_G1_CHINESE[1] : HANLIN_G2_S1_CHINESE[0];
                setSelectedLessonId(firstLesson.id);
                setActiveLineIdx(null);
                setSelectedVocab(firstLesson.vocabularies[0] || null);
                setQuizIdx(0);
                setSelectedOption(null);
                setScore(0);
                setQuizFinished(false);
              }}
              className={`px-2.5 py-1.5 rounded-xl font-black text-xs transition ${
                selectedSemester === 1
                  ? 'bg-white text-emerald-950 shadow-md scale-105'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              {selectedGrade === 1 ? '一上' : '二上'}
            </button>
            <button
              onClick={() => {
                soundFx.playPop();
                setSelectedSemester(2);
                const firstLesson = selectedGrade === 1 ? KANG_HSUAN_G1_S2_CHINESE[0] : HANLIN_G2_S2_CHINESE[0];
                setSelectedLessonId(firstLesson.id);
                setActiveLineIdx(null);
                setSelectedVocab(firstLesson.vocabularies[0] || null);
                setQuizIdx(0);
                setSelectedOption(null);
                setScore(0);
                setQuizFinished(false);
              }}
              className={`px-2.5 py-1.5 rounded-xl font-black text-xs transition ${
                selectedSemester === 2
                  ? 'bg-white text-emerald-950 shadow-md scale-105'
                  : 'text-emerald-100 hover:text-white'
              }`}
            >
              {selectedGrade === 1 ? '一下' : '二下'}
            </button>
          </div>

          <button
            onClick={handleSpeakFullLesson}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white text-emerald-950 hover:bg-emerald-50 rounded-2xl font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 btn-fun shrink-0"
          >
            <Volume2 size={18} className="text-emerald-600" />
            <span>朗讀全篇課文 ➔</span>
          </button>
        </div>
      </div>

      {/* 課文選單列（動態切換 一上 或 一下） */}
      <div className="bg-white p-2 sm:p-3 rounded-3xl border-3 border-emerald-200 shadow-md flex items-center gap-2 overflow-x-auto">
        {currentLessons.map((lesson) => {
          const isSelected = lesson.id === selectedLessonId;
          return (
            <button
              key={lesson.id}
              onClick={() => {
                soundFx.playPop();
                setSelectedLessonId(lesson.id);
                setActiveLineIdx(null);
                setSelectedVocab(lesson.vocabularies[0] || null);
                setQuizIdx(0);
                setSelectedOption(null);
                setScore(0);
                setQuizFinished(false);
              }}
              className={`px-3.5 py-2 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                isSelected
                  ? 'bg-emerald-600 text-white shadow-md scale-105 ring-2 ring-emerald-300'
                  : 'bg-emerald-50/70 hover:bg-emerald-100 text-slate-700 border border-emerald-200'
              }`}
            >
              <span>{lesson.icon}</span>
              <span>{lesson.title.split('：')[1] || lesson.title}</span>
            </button>
          );
        })}
      </div>

      {/* 單元主體核心區塊 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 左側：課文主體與三大模式分頁 (佔 8 欄) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* 模式切換按鈕 (課文朗讀、生字筆順、隨堂練習) */}
          <div className="bg-white p-2 rounded-2xl border-2 border-emerald-200 shadow-sm flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setActiveTab('text');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
                  activeTab === 'text'
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <BookOpen size={16} />
                <span>課文點讀朗讀</span>
              </button>
              <button
                onClick={() => {
                  soundFx.playPop();
                  setActiveTab('vocab');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
                  activeTab === 'vocab'
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Feather size={16} />
                <span>生字筆順部首</span>
              </button>
              <button
                onClick={() => {
                  soundFx.playPop();
                  setActiveTab('quiz');
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
                  activeTab === 'quiz'
                    ? 'bg-emerald-500 text-white shadow'
                    : 'text-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Sparkles size={16} />
                <span>隨堂闖關測驗</span>
              </button>
            </div>

            <div className="text-xs font-bold text-slate-400 hidden sm:block">
              第 {currentLesson.order} 課
            </div>
          </div>

          {/* ========================================== */}
          {/* 模式一：課文點讀朗讀模式 */}
          {/* ========================================== */}
          {activeTab === 'text' && (
            <div className="bg-white rounded-3xl border-4 border-emerald-300 shadow-xl p-6 sm:p-8 flex flex-col gap-6">
              <div className="border-b-2 border-emerald-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-700 mb-1">
                  <span>{currentLesson.icon}</span>
                  <BopomofoText text={currentLesson.title} bpmfText={currentLesson.titleBpmf} showBpmf={bopomofoEnabled} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  <BopomofoText text={currentLesson.subtitle} showBpmf={bopomofoEnabled} />
                </h2>
                <p className="text-xs sm:text-sm font-bold text-slate-500 mt-2">
                  💡 學習重點：{currentLesson.summary}
                </p>
              </div>

              {/* 逐句直式點讀課文 */}
              <div className="flex flex-col gap-3 py-2">
                {currentLesson.contentLines.map((line, idx) => {
                  const isActive = activeLineIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSpeakLine(line, idx)}
                      className={`p-4 rounded-2xl cursor-pointer transition transform flex items-center justify-between ${
                        isActive
                          ? 'bg-emerald-500 text-white shadow-lg scale-102 ring-4 ring-emerald-200'
                          : 'bg-emerald-50/60 hover:bg-emerald-100/80 text-slate-900 border border-emerald-200'
                      }`}
                    >
                      <div className="text-lg sm:text-2xl font-black tracking-wider leading-relaxed">
                        <BopomofoText text={line} showBpmf={bopomofoEnabled} />
                      </div>
                      <div className={`p-2 rounded-xl transition ${isActive ? 'bg-white text-emerald-600' : 'bg-white text-slate-500 shadow-sm'}`}>
                        <Volume2 size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-amber-950 text-xs sm:text-sm font-bold flex items-center gap-2">
                <span>💡</span>
                <span>點擊上方任意一句話，電腦與平板會用標準台灣國語親切朗讀給小朋友聽喔！</span>
              </div>
            </div>
          )}

          {/* ========================================== */}
          {/* 模式二：生字筆順與部首拆解 */}
          {/* ========================================== */}
          {activeTab === 'vocab' && (
            <div className="bg-white rounded-3xl border-4 border-emerald-300 shadow-xl p-6 sm:p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b-2 border-emerald-100 pb-3">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <span>✍️</span>
                  <span>本課生字小檔案（點擊查看詳解）</span>
                </h3>
                <span className="text-xs text-slate-500 font-bold">共 {currentLesson.vocabularies.length} 個生字</span>
              </div>

              {/* 生字按鈕列 */}
              <div className="flex items-center gap-3 flex-wrap">
                {currentLesson.vocabularies.map((v) => {
                  const isCur = selectedVocab?.char === v.char;
                  return (
                    <button
                      key={v.char}
                      onClick={() => handleSelectVocab(v)}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl font-black text-2xl sm:text-3xl flex items-center justify-center transition shadow-sm ${
                        isCur
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 scale-105'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-slate-900 border-2 border-emerald-200'
                      }`}
                    >
                      {v.char}
                    </button>
                  );
                })}
              </div>

              {/* 生字詳解大圖卡 */}
              {selectedVocab && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border-3 border-emerald-300 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-inner animate-scale-up">
                  {/* 田字格生字展示 */}
                  <div className="relative w-36 h-36 bg-white rounded-2xl border-4 border-emerald-500 shadow-md flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 divide-x divide-y divide-emerald-200 pointer-events-none">
                      <div></div><div></div><div></div><div></div>
                    </div>
                    <span className="text-7xl font-black text-emerald-950 z-10 font-serif">
                      {selectedVocab.char}
                    </span>
                    <button
                      onClick={() => speechService.speak(selectedVocab.char)}
                      className="absolute bottom-2 right-2 p-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  {/* 生字屬性資訊 */}
                  <div className="flex-1 flex flex-col gap-2 w-full">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-black text-emerald-900 bg-emerald-200/70 px-3 py-1 rounded-xl">
                        注音：{selectedVocab.bpmf}
                      </span>
                      <span className="text-xs font-black text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
                        部首：<span className="text-emerald-600 text-sm font-black">{selectedVocab.radical}</span> 部
                      </span>
                      <span className="text-xs font-black text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-emerald-200">
                        筆畫：<span className="text-emerald-600 text-sm font-black">{selectedVocab.strokeCount}</span> 畫
                      </span>
                    </div>

                    {/* 記憶口訣 */}
                    {selectedVocab.mnemonic && (
                      <div className="text-sm font-bold text-slate-700 mt-2 bg-white p-3 rounded-xl border border-emerald-100">
                        💡 部件拆解口訣：<span className="text-emerald-800 font-black">{selectedVocab.mnemonic}</span>
                      </div>
                    )}

                    {/* 生活造詞 */}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs font-black text-slate-500">生活造詞：</span>
                      {selectedVocab.words.map((w, idx) => (
                        <span
                          key={idx}
                          onClick={() => speechService.speak(w)}
                          className="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-950 font-black text-sm rounded-xl border border-emerald-300 shadow-sm cursor-pointer transition"
                        >
                          {w} 🔊
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================== */}
          {/* 模式三：隨堂闖關測驗 */}
          {/* ========================================== */}
          {activeTab === 'quiz' && (
            <div className="bg-white rounded-3xl border-4 border-emerald-300 shadow-xl p-6 sm:p-8 flex flex-col gap-6">
              {!quizFinished ? (
                <div className="flex flex-col gap-6">
                  {/* 進度與題數 */}
                  <div className="flex items-center justify-between text-sm font-black text-slate-500">
                    <span>第 {quizIdx + 1} / {currentLesson.questions.length} 題 · {currentQuestion.title}</span>
                    <span>目前答對：<span className="text-emerald-600 font-mono text-base">{score}</span> 題</span>
                  </div>

                  {/* 題目中央卡 */}
                  <div className="bg-emerald-50 rounded-3xl border-3 border-emerald-300 p-6 sm:p-8 text-center shadow-inner">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-relaxed">
                      <BopomofoText text={currentQuestion.prompt} showBpmf={bopomofoEnabled} />
                    </h3>
                  </div>

                  {/* 4 個選項 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentQuestion.options.map((opt, idx) => {
                      const isSelected = selectedOption === opt;
                      const isCorrect = opt === currentQuestion.answer;
                      let style = 'bg-white hover:bg-emerald-50 border-emerald-200 text-slate-900';

                      if (selectedOption !== null) {
                        if (isCorrect) {
                          style = 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-200';
                        } else if (isSelected && !isCorrect) {
                          style = 'bg-rose-500 text-white border-rose-600';
                        } else {
                          style = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={selectedOption !== null}
                          onClick={() => handleSelectQuizOption(opt)}
                          className={`p-4 sm:p-5 rounded-2xl border-3 font-black text-lg sm:text-xl shadow-md transition-all btn-fun text-left flex items-center justify-between ${style}`}
                        >
                          <BopomofoText text={opt} showBpmf={bopomofoEnabled} />
                          {selectedOption !== null && isCorrect && <Check size={24} className="text-white" />}
                        </button>
                      );
                    })}
                  </div>

                  {selectedOption !== null && (
                    <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-950 text-sm font-bold animate-fade-in">
                      💡 核心解析：{currentQuestion.explanation}
                    </div>
                  )}
                </div>
              ) : (
                /* 測驗結算卡 */
                <div className="flex flex-col items-center text-center gap-4 py-8 animate-scale-up">
                  <div className="text-6xl">🏆</div>
                  <h2 className="text-3xl font-black text-slate-900">
                    【{currentLesson.title}】隨堂練習完成！
                  </h2>
                  <div className="text-xl font-bold text-slate-700">
                    一共答對了 <span className="text-emerald-600 font-black text-3xl font-mono">{score}</span> 題！
                  </div>
                  <div className="flex gap-2 my-2">
                    {[1, 2, 3].map(s => (
                      <Star
                        key={s}
                        size={40}
                        className={
                          s <= (score === currentLesson.questions.length ? 3 : score >= 1 ? 2 : 1)
                            ? 'fill-amber-400 text-amber-500'
                            : 'fill-slate-200 text-slate-300'
                        }
                      />
                    ))}
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="mt-4 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-md transition flex items-center gap-2 btn-fun"
                  >
                    <RotateCcw size={18} />
                    <span>再練習一次</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 右側：課文側欄輔助資訊與語文小字典 (佔 4 欄) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* 當前課文概要小卡 */}
          <div className="bg-white rounded-3xl border-3 border-emerald-300 shadow-md p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-emerald-100 pb-3">
              <span className="text-2xl">{currentLesson.icon}</span>
              <div>
                <div className="font-black text-sm text-slate-900">
                  {currentLesson.title}
                </div>
                <div className="text-[11px] text-slate-400 font-bold">
                  課本第 {currentLesson.order} 篇課文
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 font-bold leading-relaxed">
              {currentLesson.summary}
            </div>

            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
              <div className="text-xs font-black text-emerald-900 mb-1">
                📌 重點生字一覽：
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {currentLesson.vocabularies.map(v => (
                  <span
                    key={v.char}
                    onClick={() => {
                      setActiveTab('vocab');
                      handleSelectVocab(v);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-200 text-emerald-900 rounded-lg text-xs font-black shadow-sm cursor-pointer border border-emerald-200"
                  >
                    {v.char}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 學習法小撇步卡片 */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border-3 border-amber-300 shadow-md p-5 flex flex-col gap-2.5 text-amber-950">
            <div className="flex items-center gap-2 text-base font-black text-amber-900">
              <span>🌟</span>
              <span>小一國語學習法</span>
            </div>
            <p className="text-xs font-bold leading-relaxed">
              1. **天天大聲朗讀**：跟著語音一句一句念，培養語感與流暢度。<br/>
              2. **認識部件搭積木**：漢字就像樂高積木，記住部首「扌、亻、木、足」認字快十倍！<br/>
              3. **注音聲調動手比**：一聲平平、二聲揚、三聲勾、四聲降！
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
