import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Trophy, 
  Timer, 
  Flame, 
  Check, 
  HelpCircle, 
  ChevronRight, 
  Star, 
  Award, 
  BookOpen,
  Zap,
  ArrowRight
} from 'lucide-react';
import { BopomofoText } from './BopomofoText';
import { soundFx } from '../services/audio';
import { speechService } from '../services/speech';

interface MultiplicationPracticeTabProps {
  bopomofoEnabled: boolean;
  onBackToHome: () => void;
}

type TabType = 'recite' | 'chant' | 'fill' | 'sprint';

// 口訣字串字典 (例如 2x1=2: 二一得二, 2x5=10: 二五一十, 3x7=21: 三七二十一)
const CHANT_MAP: Record<string, string> = {
  '1x1': '一一得一', '1x2': '一二得二', '1x3': '一三得三', '1x4': '一四得四', '1x5': '一五得五', '1x6': '一六得六', '1x7': '一七得七', '1x8': '一八得八', '1x9': '一九得九',
  '2x1': '二一得二', '2x2': '二二得四', '2x3': '二三得六', '2x4': '二四得八', '2x5': '二五一十', '2x6': '二六十二', '2x7': '二七十四', '2x8': '二八十六', '2x9': '二九十八',
  '3x1': '三一得三', '3x2': '三二得六', '3x3': '三三得九', '3x4': '三四十二', '3x5': '三五十五', '3x6': '三六十八', '3x7': '三七二十一', '3x8': '三八二十四', '3x9': '三九二十七',
  '4x1': '四一得四', '4x2': '四二得八', '4x3': '四三十一', '4x4': '四四十六', '4x5': '四五二十', '4x6': '四六二十四', '4x7': '四七二十八', '4x8': '四八三十二', '4x9': '四九三十六',
  '5x1': '五一得五', '5x2': '五二一十', '5x3': '五三十五', '5x4': '五四二十', '5x5': '五五二十五', '5x6': '五六三十', '5x7': '五七三十五', '5x8': '五八四十', '5x9': '五九四十五',
  '6x1': '六一得六', '6x2': '六二十二', '6x3': '六三十八', '6x4': '六四二十四', '6x5': '六五三十', '6x6': '六六三十六', '6x7': '六七四十二', '6x8': '六八四十八', '6x9': '六九五十四',
  '7x1': '七一得七', '7x2': '七二十四', '7x3': '七三二十一', '7x4': '七四二十八', '7x5': '七五三十五', '7x6': '七六四十二', '7x7': '七七四十九', '7x8': '七八五十六', '7x9': '七九六十三',
  '8x1': '八一得八', '8x2': '八二十六', '8x3': '八三二十四', '8x4': '八四三十二', '8x5': '八五四十', '8x6': '八六四十八', '8x7': '八七五十六', '8x8': '八八六十四', '8x9': '八九七十二',
  '9x1': '九一得九', '9x2': '九二十八', '9x3': '九三二十七', '9x4': '九四三十六', '9x5': '九五四十五', '9x6': '九六五十四', '9x7': '九七六十三', '9x8': '九八七十二', '9x9': '九九八十一'
};

export const MultiplicationPracticeTab: React.FC<MultiplicationPracticeTabProps> = ({
  bopomofoEnabled,
  onBackToHome
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('recite');

  // ========================================================
  // 1. 探索與朗讀模式：點選段數 (1 ~ 9 的乘法)
  // ========================================================
  const [selectedBase, setSelectedBase] = useState<number>(2); // 預設 2 的乘法
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

  // 切換分頁或切換段數，以及離開九九乘法時，立即停止任何語音朗讀
  useEffect(() => {
    speechService.stop();
    return () => {
      speechService.stop();
    };
  }, [activeTab, selectedBase]);

  const handleSpeakRow = (base: number) => {
    soundFx.playCorrect();
    const chantList: string[] = [];
    for (let i = 1; i <= 9; i++) {
      const chant = CHANT_MAP[`${base}x${i}`] || `${base} 乘以 ${i} 等於 ${base * i}`;
      chantList.push(chant);
    }
    speechService.speak(`${base} 的乘法口訣開始：` + chantList.join('， '));
  };

  const handleSpeakCell = (r: number, c: number) => {
    soundFx.playPop();
    const chant = CHANT_MAP[`${r}x${c}`] || `${r} 乘以 ${c} 等於 ${r * c}`;
    speechService.speak(`${chant}。${r} 乘以 ${c} 等於 ${r * c}`);
  };

  // ========================================================
  // 2. 乘法填空測驗模式 (單一段數自我挑戰)
  // ========================================================
  const [fillBase, setFillBase] = useState<number>(3);
  const [fillStep, setFillStep] = useState<number>(1);
  const [fillOptions, setFillOptions] = useState<number[]>([]);
  const [fillSelected, setFillSelected] = useState<number | null>(null);
  const [fillScore, setFillScore] = useState<number>(0);
  const [fillFinished, setFillFinished] = useState<boolean>(false);

  // 產生 4 個選項（1 正確 + 3 鄰近干擾項）
  const generateFillOptions = (base: number, step: number) => {
    const correct = base * step;
    const pool = new Set<number>([correct]);
    
    // 干擾項：+/- base, +/- 1, +/- 2, 或是倒轉
    const candidates = [
      correct + base,
      correct - base,
      correct + 2,
      correct - 2,
      correct + 1,
      correct + 5,
      (base - 1) * step,
      (base + 1) * step
    ].filter(v => v > 0 && v !== correct);

    while (pool.size < 4 && candidates.length > 0) {
      const randIdx = Math.floor(Math.random() * candidates.length);
      pool.add(candidates[randIdx]);
      candidates.splice(randIdx, 1);
    }

    // 若不足補隨機
    while (pool.size < 4) {
      pool.add(correct + Math.floor(Math.random() * 10) + 1);
    }

    return Array.from(pool).sort(() => Math.random() - 0.5);
  };

  const startFillTest = (base: number) => {
    soundFx.playPop();
    setFillBase(base);
    setFillStep(1);
    setFillSelected(null);
    setFillScore(0);
    setFillFinished(false);
    setFillOptions(generateFillOptions(base, 1));
  };

  const handleSelectFillOption = (ans: number) => {
    if (fillSelected !== null) return;
    setFillSelected(ans);
    const correct = fillBase * fillStep;
    if (ans === correct) {
      soundFx.playCorrect();
      setFillScore(s => s + 1);
    } else {
      soundFx.playWrong();
    }

    setTimeout(() => {
      if (fillStep < 9) {
        const nextStep = fillStep + 1;
        setFillStep(nextStep);
        setFillSelected(null);
        setFillOptions(generateFillOptions(fillBase, nextStep));
      } else {
        setFillFinished(true);
      }
    }, 1000);
  };

  // ========================================================
  // 3. 閃電神算：60 秒九九乘法極速大挑戰 (全九九混題)
  // ========================================================
  const [sprintRunning, setSprintRunning] = useState<boolean>(false);
  const [sprintTimeLeft, setSprintTimeLeft] = useState<number>(60);
  const [sprintQ, setSprintQ] = useState<{ r: number; c: number; opts: number[] }>({ r: 2, c: 3, opts: [6, 8, 4, 9] });
  const [sprintScore, setSprintScore] = useState<number>(0);
  const [sprintCombo, setSprintCombo] = useState<number>(0);
  const [sprintSelected, setSprintSelected] = useState<number | null>(null);
  const [sprintFinished, setSprintFinished] = useState<boolean>(false);

  const generateSprintQuestion = () => {
    const r = Math.floor(Math.random() * 8) + 2; // 2 ~ 9
    const c = Math.floor(Math.random() * 9) + 1; // 1 ~ 9
    const correct = r * c;
    const pool = new Set<number>([correct]);
    
    const candidates = [
      correct + r,
      correct - r,
      correct + 2,
      correct - 2,
      correct + 10,
      correct - 10,
      (r + 1) * c,
      r * (c + 1)
    ].filter(v => v > 0 && v !== correct);

    while (pool.size < 4 && candidates.length > 0) {
      const idx = Math.floor(Math.random() * candidates.length);
      pool.add(candidates[idx]);
      candidates.splice(idx, 1);
    }
    while (pool.size < 4) {
      pool.add(correct + Math.floor(Math.random() * 10) + 1);
    }

    return {
      r,
      c,
      opts: Array.from(pool).sort(() => Math.random() - 0.5)
    };
  };

  const startSprint = () => {
    soundFx.playCorrect();
    setSprintRunning(true);
    setSprintTimeLeft(60);
    setSprintScore(0);
    setSprintCombo(0);
    setSprintSelected(null);
    setSprintFinished(false);
    setSprintQ(generateSprintQuestion());
  };

  // 計時器
  useEffect(() => {
    if (!sprintRunning) return;
    if (sprintTimeLeft <= 0) {
      setSprintRunning(false);
      setSprintFinished(true);
      soundFx.playCorrect();
      return;
    }
    const timer = setInterval(() => {
      setSprintTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [sprintRunning, sprintTimeLeft]);

  const handleSprintAnswer = (ans: number) => {
    if (sprintSelected !== null || !sprintRunning) return;
    setSprintSelected(ans);
    const correct = sprintQ.r * sprintQ.c;
    if (ans === correct) {
      soundFx.playCorrect();
      setSprintScore(s => s + 10 + sprintCombo * 2);
      setSprintCombo(c => c + 1);
    } else {
      soundFx.playWrong();
      setSprintCombo(0);
    }

    setTimeout(() => {
      setSprintSelected(null);
      setSprintQ(generateSprintQuestion());
    }, 280);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col gap-6 animate-fade-in">
      {/* 頂部功能橫列：返回大廳、模式分頁切換 */}
      <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playPop();
              onBackToHome();
            }}
            className="px-4 py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-2xl font-black text-sm transition flex items-center gap-1.5 border border-amber-300 shadow-sm"
          >
            <span>🏠</span>
            <BopomofoText text="返回單元大廳" showBpmf={bopomofoEnabled} />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <BopomofoText text="九九乘法冒險樂園" showBpmf={bopomofoEnabled} />
              <span className="text-xs bg-amber-500 text-amber-950 px-2.5 py-0.5 rounded-full font-black">
                國小必備口訣
              </span>
            </h1>
          </div>
        </div>

        {/* 4 大特色模式切換標籤 */}
        <div className="flex items-center gap-2 bg-amber-50 p-1.5 rounded-2xl border-2 border-amber-200 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('recite');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'recite'
                ? 'bg-amber-500 text-amber-950 shadow-md scale-105'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            <span>📜</span>
            <BopomofoText text="完整九九表" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('chant');
              handleSpeakRow(selectedBase);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'chant'
                ? 'bg-amber-500 text-amber-950 shadow-md scale-105'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            <span>🗣️</span>
            <BopomofoText text="口訣朗朗背" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('fill');
              startFillTest(fillBase);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fill'
                ? 'bg-amber-500 text-amber-950 shadow-md scale-105'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            <span>✏️</span>
            <BopomofoText text="段數挑戰賽" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('sprint');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sprint'
                ? 'bg-rose-500 text-white shadow-md scale-105 ring-2 ring-rose-300'
                : 'text-rose-900 hover:bg-rose-100'
            }`}
          >
            <span>🔥</span>
            <BopomofoText text="60秒神算賽" showBpmf={bopomofoEnabled} />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 模式一：完整 9×9 矩陣探索表（直橫對應高亮、點擊語音讀出） */}
      {/* ======================================================== */}
      {activeTab === 'recite' && (
        <div className="bg-white rounded-3xl sm:rounded-[36px] border-4 sm:border-8 border-amber-300 shadow-xl p-5 sm:p-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <p className="text-xs sm:text-sm font-black text-amber-950">
                <BopomofoText text="點擊格子可以聽標準語音發音與乘法口訣，橫欄與直列會自動高亮輔助對齊喔！" showBpmf={bopomofoEnabled} />
              </p>
            </div>
            {hoveredCell && (
              <div className="px-4 py-1.5 bg-amber-400 text-amber-950 font-black text-sm rounded-xl shadow-sm animate-scale-up">
                {hoveredCell.r} × {hoveredCell.c} ＝ {hoveredCell.r * hoveredCell.c}（{CHANT_MAP[`${hoveredCell.r}x${hoveredCell.c}`]}）
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[620px]">
              {/* 表頭 (乘數 1 ~ 9) */}
              <div className="grid grid-cols-10 gap-1.5 text-center text-sm font-black mb-1.5">
                <div className="w-12 h-12 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center font-mono font-black text-base shadow-sm">
                  ×
                </div>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-12 rounded-xl flex items-center justify-center font-mono font-black text-base transition-all ${
                      hoveredCell?.c === i + 1
                        ? 'bg-amber-500 text-white shadow-md scale-105 ring-2 ring-amber-300'
                        : 'bg-amber-100 text-amber-950'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* 表身 (被乘數 1 ~ 9) */}
              {Array.from({ length: 9 }).map((_, rIdx) => {
                const r = rIdx + 1;
                return (
                  <div key={r} className="grid grid-cols-10 gap-1.5 text-center text-sm font-black my-1.5">
                    {/* 左側被乘數頭 */}
                    <div
                      className={`h-12 rounded-xl flex items-center justify-center font-mono font-black text-base transition-all ${
                        hoveredCell?.r === r
                          ? 'bg-amber-500 text-white shadow-md scale-105 ring-2 ring-amber-300'
                          : 'bg-amber-100 text-amber-950'
                      }`}
                    >
                      {r}
                    </div>

                    {/* 9 個積 */}
                    {Array.from({ length: 9 }).map((_, cIdx) => {
                      const c = cIdx + 1;
                      const product = r * c;
                      const isHovered = hoveredCell?.r === r && hoveredCell?.c === c;
                      const isRowMatched = hoveredCell?.r === r;
                      const isColMatched = hoveredCell?.c === c;

                      let cellBg = 'bg-slate-50 text-slate-800 hover:bg-amber-100 border border-slate-200';
                      if (isHovered) {
                        cellBg = 'bg-amber-500 text-white shadow-lg scale-110 ring-4 ring-amber-300 z-10';
                      } else if (isRowMatched || isColMatched) {
                        cellBg = 'bg-amber-100 text-amber-950 font-black';
                      }

                      return (
                        <button
                          key={c}
                          type="button"
                          onMouseEnter={() => setHoveredCell({ r, c })}
                          onClick={() => handleSpeakCell(r, c)}
                          className={`h-12 rounded-xl flex flex-col items-center justify-center transition-all ${cellBg}`}
                        >
                          <span className="font-mono font-black text-base">{product}</span>
                          <span className="text-[9px] opacity-75 hidden sm:inline -mt-0.5">
                            {CHANT_MAP[`${r}x${c}`]?.slice(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 模式二：口訣朗朗背（1~9 段數大字卡、口訣連讀） */}
      {/* ======================================================== */}
      {activeTab === 'chant' && (
        <div className="bg-white rounded-3xl sm:rounded-[36px] border-4 sm:border-8 border-amber-300 shadow-xl p-6 sm:p-8 flex flex-col gap-6">
          {/* 段數選擇膠囊 */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b-2 border-slate-100">
            <span className="text-sm font-black text-slate-800 flex items-center gap-1.5">
              <span>🎯</span>
              <BopomofoText text="選擇要練習背誦的段數：" showBpmf={bopomofoEnabled} />
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {Array.from({ length: 9 }).map((_, i) => {
                const base = i + 1;
                return (
                  <button
                    key={base}
                    type="button"
                    onClick={() => {
                      soundFx.playPop();
                      setSelectedBase(base);
                      handleSpeakRow(base);
                    }}
                    className={`w-10 h-10 rounded-2xl font-black text-base transition-all ${
                      selectedBase === base
                        ? 'bg-amber-500 text-amber-950 shadow-md scale-110 ring-4 ring-amber-200'
                        : 'bg-amber-50 hover:bg-amber-100 text-slate-800 border border-amber-200'
                    }`}
                  >
                    {base}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 朗讀整段按鈕 */}
          <div className="flex items-center justify-between bg-gradient-to-r from-amber-400 to-orange-400 text-white p-4 sm:p-5 rounded-3xl shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">📢</span>
              <div>
                <h3 className="text-lg sm:text-xl font-black">
                  【{selectedBase} 的乘法】口訣朗讀卡
                </h3>
                <p className="text-xs sm:text-sm text-amber-100 font-bold">
                  每多乘一次，就增加一個 {selectedBase}！
                </p>
              </div>
            </div>

            <button
              onClick={() => handleSpeakRow(selectedBase)}
              className="px-5 py-2.5 bg-white text-amber-950 hover:bg-amber-50 rounded-2xl font-black text-sm shadow-md transition flex items-center gap-1.5 btn-fun shrink-0"
            >
              <Volume2 size={18} className="text-amber-600" />
              <span>整段朗讀 ➔</span>
            </button>
          </div>

          {/* 9 道口訣精美卡片網格 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {Array.from({ length: 9 }).map((_, i) => {
              const step = i + 1;
              const product = selectedBase * step;
              const chant = CHANT_MAP[`${selectedBase}x${step}`];

              return (
                <div
                  key={step}
                  onClick={() => handleSpeakCell(selectedBase, step)}
                  className="p-4 rounded-2xl bg-amber-50/70 hover:bg-amber-100/90 border-2 border-amber-200 shadow-sm cursor-pointer transition transform hover:scale-102 flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="font-mono text-xl sm:text-2xl font-black text-slate-900">
                      {selectedBase} × {step} ＝ <span className="text-amber-600">{product}</span>
                    </span>
                    <span className="text-xs font-black text-amber-900 mt-1">
                      <BopomofoText text={chant} showBpmf={bopomofoEnabled} />
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white text-amber-600 flex items-center justify-center shadow-sm">
                    <Volume2 size={18} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 模式三：段數自我挑戰賽（單一段數 1 ~ 9 逐步填空測驗） */}
      {/* ======================================================== */}
      {activeTab === 'fill' && (
        <div className="bg-white rounded-3xl sm:rounded-[36px] border-4 sm:border-8 border-amber-300 shadow-xl p-6 sm:p-10 flex flex-col gap-6">
          {/* 段數切換列 */}
          <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b-2 border-slate-100">
            <span className="text-sm font-black text-slate-800">
              <BopomofoText text="選擇你想測試的乘法段數：" showBpmf={bopomofoEnabled} />
            </span>
            <div className="flex gap-1.5 flex-wrap">
              {Array.from({ length: 9 }).map((_, i) => {
                const base = i + 1;
                return (
                  <button
                    key={base}
                    type="button"
                    onClick={() => startFillTest(base)}
                    className={`w-10 h-10 rounded-2xl font-black text-base transition-all ${
                      fillBase === base
                        ? 'bg-amber-500 text-amber-950 shadow-md scale-110 ring-4 ring-amber-200'
                        : 'bg-amber-50 hover:bg-amber-100 text-slate-800 border border-amber-200'
                    }`}
                  >
                    {base}
                  </button>
                );
              })}
            </div>
          </div>

          {!fillFinished ? (
            <div className="flex flex-col items-center text-center gap-6 py-4">
              {/* 進度條 */}
              <div className="w-full flex items-center justify-between text-sm font-black text-slate-500">
                <span>第 {fillStep} / 9 題</span>
                <span>目前得分：<span className="text-amber-600 font-mono text-base">{fillScore}</span> 分</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 border border-slate-200 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(fillStep / 9) * 100}%` }}
                ></div>
              </div>

              {/* 題目中央大看板 */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-4 border-amber-300 rounded-3xl p-8 sm:p-12 w-full max-w-lg shadow-inner">
                <div className="font-mono text-4xl sm:text-6xl font-black text-slate-900 tracking-wider">
                  {fillBase} × {fillStep} ＝ <span className="text-amber-600 underline decoration-wavy decoration-amber-400">？</span>
                </div>
                <div className="text-sm sm:text-base font-black text-amber-900 mt-4">
                  💡 口訣提示：<BopomofoText text={CHANT_MAP[`${fillBase}x${fillStep}`]?.slice(0, 2) + '...'} showBpmf={bopomofoEnabled} />
                </div>
              </div>

              {/* 4 個選項按鈕 */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {fillOptions.map((opt, idx) => {
                  const correct = fillBase * fillStep;
                  const isSelected = fillSelected === opt;
                  let btnStyle = 'bg-white hover:bg-amber-50 border-amber-300 text-slate-900';

                  if (fillSelected !== null) {
                    if (opt === correct) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-200';
                    } else if (isSelected && opt !== correct) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600';
                    } else {
                      btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={fillSelected !== null}
                      onClick={() => handleSelectFillOption(opt)}
                      className={`py-5 sm:py-6 rounded-2xl border-3 font-mono font-black text-2xl sm:text-3xl shadow-md transition-all btn-fun ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* 測驗完成獎勵結算卡 */
            <div className="flex flex-col items-center text-center gap-4 py-8 animate-scale-up">
              <div className="text-6xl animate-bounce-short">🏆</div>
              <h2 className="text-3xl font-black text-slate-900">
                【{fillBase} 的乘法】挑戰完成！
              </h2>
              <div className="text-xl font-bold text-slate-700">
                9 題中答對了 <span className="text-emerald-600 font-black text-3xl font-mono">{fillScore}</span> 題！
              </div>
              <div className="flex gap-2 my-2">
                {[1, 2, 3].map(s => (
                  <Star
                    key={s}
                    size={40}
                    className={
                      s <= (fillScore === 9 ? 3 : fillScore >= 6 ? 2 : 1)
                        ? 'fill-amber-400 text-amber-500'
                        : 'fill-slate-200 text-slate-300'
                    }
                  />
                ))}
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => startFillTest(fillBase)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-2xl shadow-md transition flex items-center gap-2 btn-fun"
                >
                  <RotateCcw size={18} />
                  <span>再挑戰一次</span>
                </button>
                <button
                  onClick={() => startFillTest((fillBase % 9) + 1)}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-md transition flex items-center gap-2 btn-fun"
                >
                  <span>挑戰下一段 ({(fillBase % 9) + 1} 的乘法) ➔</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 模式四：60 秒閃電神算極速賽（全九九混題、連擊加分） */}
      {/* ======================================================== */}
      {activeTab === 'sprint' && (
        <div className="bg-white rounded-3xl sm:rounded-[36px] border-4 sm:border-8 border-rose-300 shadow-xl p-6 sm:p-10 flex flex-col gap-6">
          {!sprintRunning && !sprintFinished ? (
            <div className="flex flex-col items-center text-center gap-6 py-8">
              <div className="w-24 h-24 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-5xl shadow-inner animate-bounce-short">
                ⚡
              </div>
              <div>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                  <BopomofoText text="60秒九九乘法極速大挑戰！" showBpmf={bopomofoEnabled} />
                </h2>
                <p className="text-sm sm:text-base text-slate-600 font-bold mt-2 max-w-md">
                  考驗你的乘法反應力！在 60 秒內連續作答，連對有額外 COMBO 加分喔！
                </p>
              </div>

              <button
                type="button"
                onClick={startSprint}
                className="px-10 py-5 bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500 text-white font-black text-2xl rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 active:scale-95 flex items-center gap-3 btn-fun"
              >
                <span>🔥 開始挑戰！ ➔</span>
              </button>
            </div>
          ) : sprintRunning ? (
            <div className="flex flex-col items-center gap-6">
              {/* 計時與分數儀表板 */}
              <div className="w-full flex items-center justify-between bg-rose-50 p-4 rounded-2xl border-2 border-rose-200">
                <div className="flex items-center gap-2 text-rose-600 font-black text-lg">
                  <Timer size={22} className="animate-spin-slow" />
                  <span>倒數：<span className="font-mono text-2xl">{sprintTimeLeft}</span> 秒</span>
                </div>

                <div className="flex items-center gap-3">
                  {sprintCombo >= 2 && (
                    <span className="px-3 py-1 bg-amber-400 text-amber-950 font-black text-xs rounded-full animate-bounce-short">
                      🔥 {sprintCombo} 連擊！
                    </span>
                  )}
                  <div className="text-slate-900 font-black text-lg">
                    分數：<span className="text-rose-600 font-mono text-2xl">{sprintScore}</span>
                  </div>
                </div>
              </div>

              {/* 乘法速算大題板 */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-14 w-full max-w-lg text-center shadow-2xl border-4 border-slate-700">
                <div className="text-5xl sm:text-7xl font-black font-mono tracking-wider">
                  {sprintQ.r} × {sprintQ.c} ＝ ？
                </div>
              </div>

              {/* 4 個快速選項 */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {sprintQ.opts.map((opt, idx) => {
                  const correct = sprintQ.r * sprintQ.c;
                  const isSelected = sprintSelected === opt;
                  let style = 'bg-white hover:bg-rose-50 border-rose-200 text-slate-900';
                  if (sprintSelected !== null) {
                    if (opt === correct) {
                      style = 'bg-emerald-500 text-white border-emerald-600';
                    } else if (isSelected && opt !== correct) {
                      style = 'bg-rose-500 text-white border-rose-600';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={sprintSelected !== null}
                      onClick={() => handleSprintAnswer(opt)}
                      className={`py-6 rounded-2xl border-3 font-mono font-black text-3xl shadow-md transition-all btn-fun ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* 60秒挑戰結算卡 */
            <div className="flex flex-col items-center text-center gap-4 py-8 animate-scale-up">
              <div className="text-7xl">🎉</div>
              <h2 className="text-3xl font-black text-slate-900">時間到！挑戰結算</h2>
              <div className="text-5xl font-black text-rose-600 font-mono my-2">
                {sprintScore} <span className="text-xl text-slate-600">分</span>
              </div>
              <p className="text-slate-600 font-bold">
                {sprintScore >= 150 ? '🏅 神算大師！你的乘法口訣已經練得滾瓜爛熟！' : sprintScore >= 80 ? '🌟 太棒了！反應非常迅速，再接再厲！' : '💪 多練習幾次，你的速度一定會越來越快！'}
              </p>

              <button
                type="button"
                onClick={startSprint}
                className="mt-4 px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white font-black text-xl rounded-2xl shadow-lg transition btn-fun flex items-center gap-2"
              >
                <RotateCcw size={20} />
                <span>再次挑戰極速賽 ➔</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
