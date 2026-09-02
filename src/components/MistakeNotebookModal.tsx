import React, { useState } from 'react';
import { X, BookOpen, RotateCcw, CheckCircle2, AlertTriangle, ChevronRight, Volume2, Sparkles, Trophy } from 'lucide-react';
import { UserAccount, Question } from '../types';
import { BopomofoText } from './BopomofoText';
import { QUESTIONS } from '../data/questions';
import { storageService } from '../services/storage';
import { soundFx } from '../services/audio';
import { speechService } from '../services/speech';

interface MistakeNotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bopomofoEnabled: boolean;
  userAccount: UserAccount;
  onMistakeResolved: () => void;
}

export const MistakeNotebookModal: React.FC<MistakeNotebookModalProps> = ({
  isOpen,
  onClose,
  bopomofoEnabled,
  userAccount,
  onMistakeResolved
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!isOpen) return null;

  // 取得該帳號所有的錯題清單
  const mistakeQuestionIds = new Set((userAccount.mistakes || []).map(m => m.questionId));
  const mistakeQuestions = QUESTIONS.filter(q => mistakeQuestionIds.has(q.id));

  const handleStartReviewQuestion = (q: Question) => {
    soundFx.playPop();
    setSelectedQuestion(q);
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  const handleCheckAnswer = () => {
    if (!selectedQuestion || !selectedOptionId || isAnswerChecked) return;

    const opt = selectedQuestion.options?.find(o => o.id === selectedOptionId);
    const correct = !!opt?.isCorrect;

    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      soundFx.playCorrect();
      speechService.speak('太棒了！這次答對了，已從錯題本中移出！');
      // 從錯題本移除
      storageService.removeMistake(selectedQuestion.id);
      onMistakeResolved();
    } else {
      soundFx.playWrong();
      speechService.speak('再想一想喔！看看下方的提示與解析！');
    }
  };

  const handleBackToList = () => {
    soundFx.playPop();
    setSelectedQuestion(null);
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-4 border-rose-300 shadow-2xl max-w-2xl w-full p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* 頂部標題 */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📓</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-900">
                  <BopomofoText text={`${userAccount.accountName} 的專屬錯題本`} showBpmf={bopomofoEnabled} />
                </h3>
              </div>
              <p className="text-xs text-rose-600 font-bold">
                目前尚有 {mistakeQuestions.length} 道錯題需要複習消滅
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* 模式一：錯題列表 */}
        {!selectedQuestion ? (
          <div className="my-6 flex flex-col gap-3">
            {mistakeQuestions.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-3">
                <Trophy size={64} className="text-amber-500 animate-bounce-short" />
                <h4 className="text-2xl font-black text-slate-800">
                  <BopomofoText text="太厲害了！目前沒有任何錯題！" showBpmf={bopomofoEnabled} />
                </h4>
                <p className="text-sm font-bold text-slate-500">
                  所有練習題目都已全數掌握，繼續保持喔！
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                <div className="text-xs font-black text-slate-500 mb-1">
                  點選題目重新挑戰，只要答對就會自動從錯題本移出：
                </div>
                {mistakeQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    onClick={() => handleStartReviewQuestion(q)}
                    className="p-4 bg-rose-50/60 hover:bg-rose-100/80 border-2 border-rose-200 hover:border-rose-400 rounded-2xl cursor-pointer transition flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-3 pr-2">
                      <span className="w-7 h-7 rounded-xl bg-rose-500 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-black text-slate-900 text-sm sm:text-base group-hover:text-rose-700 transition line-clamp-1">
                          <BopomofoText text={q.title} showBpmf={false} />
                        </div>
                        <span className="text-[11px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                          單元：{q.unitId}
                        </span>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-white text-rose-600 font-black text-xs rounded-xl shadow-sm border border-rose-200 shrink-0 group-hover:bg-rose-600 group-hover:text-white transition">
                      重新挑戰 ➔
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* 模式二：單題複習挑戰畫面 */
          <div className="my-4 flex flex-col gap-4">
            <button
              onClick={handleBackToList}
              className="self-start text-xs font-black text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              ⬅ 回到錯題列表
            </button>

            {/* 題目卡片 */}
            <div className="p-5 bg-gradient-to-b from-rose-50 to-white rounded-3xl border-3 border-rose-300 shadow-sm flex flex-col gap-4">
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-relaxed">
                <BopomofoText text={selectedQuestion.title} showBpmf={bopomofoEnabled} />
              </h4>

              {/* 選項列表 */}
              <div className="grid grid-cols-1 gap-2.5">
                {selectedQuestion.options?.map((opt, idx) => {
                  const isSelected = selectedOptionId === opt.id;
                  let optStyle = 'bg-white border-slate-200 text-slate-800 hover:border-rose-300';
                  if (isAnswerChecked) {
                    if (opt.isCorrect) optStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md';
                    else if (isSelected) optStyle = 'bg-rose-500 text-white border-rose-600';
                  } else if (isSelected) {
                    optStyle = 'bg-rose-500 text-white border-rose-600 shadow-md';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        if (!isAnswerChecked) {
                          soundFx.playPop();
                          setSelectedOptionId(opt.id);
                        }
                      }}
                      className={`p-4 rounded-2xl border-2 font-black text-base sm:text-lg text-left flex items-center justify-between transition ${optStyle}`}
                    >
                      <BopomofoText text={opt.text} showBpmf={bopomofoEnabled} />
                      <span className="w-6 h-6 rounded-full border border-current/40 flex items-center justify-center text-xs font-mono">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 確認按鈕 / 結果回饋 */}
              {!isAnswerChecked ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={!selectedOptionId}
                  className={`w-full py-3.5 rounded-2xl font-black text-lg shadow-md transition ${
                    selectedOptionId
                      ? 'bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-500 hover:to-rose-600 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  確認送出答案 ➔
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <div
                    className={`p-4 rounded-2xl border-2 text-center font-black text-lg ${
                      isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-rose-50 border-rose-300 text-rose-950'
                    }`}
                  >
                    {isCorrect ? '🎉 太棒了！答對了！已移出租題本！' : '❌ 還是答錯了，請看下方詳細解析：'}
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 leading-relaxed">
                    <span className="font-black text-slate-900 block mb-1">💡 翰林解題小提示：</span>
                    <BopomofoText text={selectedQuestion.explanation} showBpmf={bopomofoEnabled} />
                  </div>

                  <button
                    onClick={handleBackToList}
                    className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-2xl text-base shadow"
                  >
                    完成，回到錯題本清單
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
