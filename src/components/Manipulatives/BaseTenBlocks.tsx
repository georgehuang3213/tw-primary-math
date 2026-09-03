import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Sparkles, ArrowRight, Check, ShoppingBag, Target } from 'lucide-react';
import { soundFx } from '../../services/audio';
import { BopomofoText } from '../BopomofoText';

interface BaseTenBlocksProps {
  initialHundreds?: number;
  initialTens?: number;
  initialOnes?: number;
  onValueChange?: (total: number) => void;
  interactive?: boolean;
  unitId?: string;
  grade?: number;
  bopomofoEnabled?: boolean;
}

type TabType = 'money' | 'placeValue' | 'tenPack' | 'estimate';

export const BaseTenBlocks: React.FC<BaseTenBlocksProps> = ({
  initialHundreds = 0,
  initialTens = 2,
  initialOnes = 5,
  onValueChange,
  interactive = true,
  unitId,
  grade = 1,
  bopomofoEnabled
}) => {
  const isEstimateUnit = unitId === 'g2-s2-u7-add-sub-estimate' || unitId?.includes('estimate');

  // 初始分頁：
  // 若為加減估算單元 (g2-s2-u7)，預設直接進入 'estimate' 估算實驗室！
  // 若為二上第一單元 (g2-u1-num200)，預設 'money'！
  // 若為一年級 (g1-u8-num30)，預設 'tenPack'！
  const initialTab: TabType = isEstimateUnit
    ? 'estimate'
    : unitId === 'g2-u1-num200'
    ? 'money'
    : unitId === 'g1-u8-num30'
    ? 'tenPack'
    : 'placeValue';

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  const [hundreds, setHundreds] = useState(initialHundreds);
  const [tens, setTens] = useState(initialTens);
  const [ones, setOnes] = useState(initialOnes);

  // 錢幣模式專屬狀態（百元鈔、50元、10元、5元、1元）
  const [bills100, setBills100] = useState<number>(unitId === 'g2-u1-num200' ? 1 : 0);
  const [coins50, setCoins50] = useState<number>(0);
  const [coins10, setCoins10] = useState<number>(unitId === 'g2-u1-num200' ? 4 : 2);
  const [coins5, setCoins5] = useState<number>(1);
  const [coins1, setCoins1] = useState<number>(unitId === 'g2-u1-num200' ? 2 : 5);

  const totalMoney = bills100 * 100 + coins50 * 50 + coins10 * 10 + coins5 * 5 + coins1 * 1;

  // 跳數模式設定 (2個一數、5個一數、10個一數)
  const [skipStep, setSkipStep] = useState<2 | 5 | 10>(2);
  const [skipCount, setSkipCount] = useState<number>(2);

  const total = hundreds * 100 + tens * 10 + ones;

  const updateBlocks = (h: number, t: number, o: number) => {
    soundFx.playPop();
    setHundreds(h);
    setTens(t);
    setOnes(o);
    if (onValueChange) {
      onValueChange(h * 100 + t * 10 + o);
    }
  };

  const handleReset = () => {
    soundFx.playPop();
    setHundreds(initialHundreds);
    setTens(initialTens);
    setOnes(initialOnes);
    setBills100(unitId === 'g2-u1-num200' ? 1 : 0);
    setCoins50(0);
    setCoins10(unitId === 'g2-u1-num200' ? 4 : 2);
    setCoins5(1);
    setCoins1(unitId === 'g2-u1-num200' ? 2 : 5);
    setSkipCount(skipStep);
  };

  const handlePackTen = () => {
    if (ones >= 10) {
      soundFx.playCorrect();
      setTens(prev => prev + 1);
      setOnes(prev => prev - 10);
    }
  };

  // =========================================================================
  // 🌟 模式：加減估算與超市購物實驗室 (g2-s2-u7)
  // =========================================================================
  const estimateQuestions = [
    {
      id: 'breakfast',
      icon: '🥐',
      title: '小美的超市早餐估算',
      story: '小美推著購物車，買了麵包 28 元和果汁 45 元。她帶了 100 元，用估算判斷帶的錢夠不夠？',
      item1: '麵包 28 元',
      item1Price: 28,
      item1Estimate: 30,
      item1Tip: '28 的個位是 8，四捨五入進位成 30 元',
      item2: '果汁 45 元',
      item2Price: 45,
      item2Estimate: 50,
      item2Tip: '45 的個位是 5，四捨五入進位成 50 元',
      estimateTotal: 80,
      exactTotal: 73,
      budget: 100,
      isEnough: true,
      explanation: '估算約 30 ＋ 50 ＝ 80 元！帶 100 元大於 80 元，所以【夠買】！精算只要 28 ＋ 45 ＝ 73 元，完全足夠！'
    },
    {
      id: 'stationery',
      icon: '📚',
      title: '文具店買故事書估算',
      story: '小明想買一本精裝故事書 188 元和一個鉛筆盒 92 元。他口袋只有 250 元，夠不夠買？',
      item1: '精裝故事書 188 元',
      item1Price: 188,
      item1Estimate: 190,
      item1Tip: '188 大約是 190 元',
      item2: '精緻鉛筆盒 92 元',
      item2Price: 92,
      item2Estimate: 90,
      item2Tip: '92 大約是 90 元',
      estimateTotal: 280,
      exactTotal: 280,
      budget: 250,
      isEnough: false,
      explanation: '估算約 190 ＋ 90 ＝ 280 元！帶 250 元小於 280 元，所以【不夠買】！還差約 30 元！'
    },
    {
      id: 'backpack',
      icon: '🎒',
      title: '買書包找零大數估算',
      story: '媽媽帶了 500 元，買一個書包花了 298 元。估算看看大約剩下多少元？',
      item1: '準備的錢 500 元',
      item1Price: 500,
      item1Estimate: 500,
      item1Tip: '500 整百不用換',
      item2: '書包 298 元',
      item2Price: 298,
      item2Estimate: 300,
      item2Tip: '298 靠近 300，估為 300 元',
      estimateTotal: 200,
      exactTotal: 202,
      budget: 500,
      isEnough: true,
      explanation: '估算剩下：500 － 300 ＝ 200 元！精算剩下 500 － 298 ＝ 202 元，估算非常精準！'
    }
  ];

  const [estQIdx, setEstQIdx] = useState<number>(0);
  const [selectedEnough, setSelectedEnough] = useState<boolean | null>(null);
  const [userEstimateInput, setUserEstimateInput] = useState<string>('');
  const [estFeedback, setEstFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  const currentEstQ = estimateQuestions[estQIdx];

  const handleCheckEstimate = () => {
    const val = parseInt(userEstimateInput, 10);
    const isValCorrect = Math.abs(val - currentEstQ.estimateTotal) <= 10;
    const isChoiceCorrect = selectedEnough === currentEstQ.isEnough;

    if (isValCorrect && isChoiceCorrect) {
      soundFx.playCorrect();
      setEstFeedback({
        isCorrect: true,
        text: `🎉 太厲害了！估算與判斷完全正確！${currentEstQ.explanation}`
      });
    } else if (!isChoiceCorrect) {
      soundFx.playWrong();
      setEstFeedback({
        isCorrect: false,
        text: `💡 帶的錢有 ${currentEstQ.budget} 元，估算總共約 ${currentEstQ.estimateTotal} 元，比比看夠不夠呢？`
      });
    } else {
      soundFx.playWrong();
      setEstFeedback({
        isCorrect: false,
        text: `💡 再估算看看：${currentEstQ.item1Estimate} ＋ ${currentEstQ.item2Estimate} 大約是多少元呢？`
      });
    }
  };

  const handleNextEstimate = () => {
    soundFx.playPop();
    setEstQIdx((prev) => (prev + 1) % estimateQuestions.length);
    setSelectedEnough(null);
    setUserEstimateInput('');
    setEstFeedback(null);
  };

  return (
    <div className="flex flex-col gap-4 bg-amber-50/80 p-4 sm:p-6 rounded-3xl border-2 border-amber-200 max-w-2xl mx-auto w-full">
      {/* 頂部切換模式按鈕 */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-white/90 p-1.5 rounded-2xl border-2 border-amber-300 shadow-sm">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* 若為估算單元，優先顯示「加減估算」分頁 */}
          {isEstimateUnit && (
            <button
              onClick={() => {
                soundFx.playPop();
                setActiveTab('estimate');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
                activeTab === 'estimate'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-blue-950 hover:bg-blue-50'
              }`}
            >
              <span>🎯</span>
              <BopomofoText text="超市購物加減估算" showBpmf={bopomofoEnabled ?? false} />
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('placeValue');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeTab === 'placeValue'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-sky-50'
            }`}
          >
            <span>🧱</span>
            <BopomofoText text="十進位積木定位板" showBpmf={bopomofoEnabled ?? false} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('money');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
              activeTab === 'money'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-emerald-50'
            }`}
          >
            <span>💵</span>
            <BopomofoText text="百元紙鈔與錢幣換算" showBpmf={bopomofoEnabled ?? false} />
          </button>

          {!isEstimateUnit && (
            <button
              onClick={() => {
                soundFx.playPop();
                setActiveTab('tenPack');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1 ${
                activeTab === 'tenPack'
                  ? 'bg-amber-500 text-amber-950 shadow-md'
                  : 'text-slate-600 hover:bg-amber-100'
              }`}
            >
              <span>📦</span>
              <BopomofoText text="滿10顆拼成一條十" showBpmf={bopomofoEnabled ?? false} />
            </button>
          )}
        </div>

        {activeTab !== 'estimate' && (
          <div className="flex items-center gap-2">
            <div className="text-xl sm:text-2xl font-black text-amber-600 font-mono">
              = {activeTab === 'money' ? totalMoney : total}
            </div>
            {interactive && (
              <button
                onClick={handleReset}
                className="p-1.5 text-slate-400 hover:text-amber-700 rounded-lg"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 🌟 模式：加減估算與超市購物實驗室 (二下第七單元專屬) */}
      {/* ========================================================================= */}
      {activeTab === 'estimate' && (
        <div className="flex flex-col gap-4 animate-fade-in w-full">
          {/* 題目切換膠囊按鈕 */}
          <div className="w-full bg-blue-50 border-2 border-blue-200 rounded-2xl p-2.5 shadow-sm">
            <p className="text-xs font-black text-blue-950 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Target size={15} className="text-blue-600" />
                <BopomofoText text="選擇估算購物情境題：" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-[11px] font-bold text-blue-700">
                {estQIdx + 1} / {estimateQuestions.length}
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              {estimateQuestions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => {
                    soundFx.playPop();
                    setEstQIdx(idx);
                    setSelectedEnough(null);
                    setUserEstimateInput('');
                    setEstFeedback(null);
                  }}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                    estQIdx === idx
                      ? 'bg-blue-600 text-white shadow-md font-black scale-102'
                      : 'bg-white text-blue-950 hover:bg-blue-100 border border-blue-200'
                  }`}
                >
                  <span>{q.icon}</span>
                  <span className="truncate">{q.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 情境故事卡 */}
          <div className="w-full bg-white border-2 border-blue-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black px-2.5 py-0.5 bg-blue-600 text-white rounded-full flex items-center gap-1">
                <span>{currentEstQ.icon}</span>
                <BopomofoText text={currentEstQ.title} showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-xs font-bold text-slate-500">
                錢包裡有：${currentEstQ.budget} 元
              </span>
            </div>
            <p className="text-sm sm:text-base font-black text-slate-800 leading-relaxed mt-1">
              <BopomofoText text={currentEstQ.story} showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          {/* 🌟 四捨五入數線尺與物品估算對比 */}
          <div className="bg-gradient-to-r from-blue-100 via-sky-50 to-indigo-100 p-4 sm:p-5 rounded-3xl border-3 border-blue-300 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-black text-blue-950">
              <span className="flex items-center gap-1">
                <span>📏</span>
                <BopomofoText text="四捨五入取近似值（估算）：" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="text-[11px] text-blue-800 font-bold bg-white/80 px-2 py-0.5 rounded-full border border-blue-200">
                0,1,2,3,4 捨去 | 5,6,7,8,9 進位
              </span>
            </div>

            {/* 兩件商品估算卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-1">
              <div className="bg-white p-3.5 rounded-2xl border-2 border-blue-200 shadow-sm flex flex-col">
                <span className="text-xs font-black text-slate-700">{currentEstQ.item1}</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs text-slate-500 font-bold">大約估為：</span>
                  <span className="text-2xl font-black font-mono text-blue-600">${currentEstQ.item1Estimate}</span>
                  <span className="text-xs text-slate-600 font-bold">元</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">💡 {currentEstQ.item1Tip}</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border-2 border-blue-200 shadow-sm flex flex-col">
                <span className="text-xs font-black text-slate-700">{currentEstQ.item2}</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs text-slate-500 font-bold">大約估為：</span>
                  <span className="text-2xl font-black font-mono text-blue-600">${currentEstQ.item2Estimate}</span>
                  <span className="text-xs text-slate-600 font-bold">元</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">💡 {currentEstQ.item2Tip}</p>
              </div>
            </div>

            {/* 估算口訣 */}
            <div className="w-full bg-white/90 p-2.5 rounded-xl border border-blue-200 text-xs text-blue-950 font-bold text-center">
              <span>💡 </span>
              <BopomofoText text="估算好處：去超市買東西不用拿出筆紙精算，先在心裡四捨五入加一加，立刻知道錢夠不夠！" showBpmf={bopomofoEnabled ?? false} />
            </div>
          </div>

          {/* 🌟 學生動手判斷與填答區 */}
          <div className="w-full bg-white p-4 sm:p-5 rounded-2xl border-2 border-blue-300 shadow-sm flex flex-col items-center gap-4">
            <div className="w-full text-center">
              <p className="text-xs sm:text-sm font-black text-blue-950 mb-2">
                <BopomofoText text="步驟 1：估算合起來大約是多少元？" showBpmf={bopomofoEnabled ?? false} />
              </p>
              <div className="flex items-center justify-center gap-2 font-mono text-xl sm:text-2xl font-black text-slate-800 flex-wrap">
                <span>{currentEstQ.item1Estimate} ＋ {currentEstQ.item2Estimate}</span>
                <span>＝</span>
                <span className="text-xs font-sans font-bold text-slate-500"><BopomofoText text="大約" showBpmf={bopomofoEnabled ?? false} /></span>
                <input
                  type="text"
                  maxLength={3}
                  value={userEstimateInput}
                  onChange={(e) => setUserEstimateInput(e.target.value)}
                  placeholder="?"
                  className="w-18 h-12 text-center text-2xl font-black bg-blue-50 text-blue-950 rounded-xl border-2 border-blue-400 focus:outline-none focus:ring-4 ring-blue-300/50"
                />
                <span className="text-base font-sans font-black text-slate-700">
                  <BopomofoText text="元" showBpmf={bopomofoEnabled ?? false} />
                </span>
              </div>
            </div>

            <div className="w-full border-t border-slate-100 pt-3 text-center">
              <p className="text-xs sm:text-sm font-black text-blue-950 mb-2">
                <BopomofoText text={`步驟 2：錢包帶了 ${currentEstQ.budget} 元，用估算判斷夠不夠買？`} showBpmf={bopomofoEnabled ?? false} />
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedEnough(true);
                  }}
                  className={`px-6 py-2.5 rounded-2xl font-black text-sm sm:text-base border-3 transition-all flex items-center gap-1.5 shadow-sm ${
                    selectedEnough === true
                      ? 'bg-emerald-600 border-emerald-700 text-white scale-105 shadow-md'
                      : 'bg-white border-emerald-300 text-emerald-900 hover:bg-emerald-50'
                  }`}
                >
                  <span>✅ </span>
                  <BopomofoText text="夠買！" showBpmf={bopomofoEnabled ?? false} />
                </button>

                <button
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedEnough(false);
                  }}
                  className={`px-6 py-2.5 rounded-2xl font-black text-sm sm:text-base border-3 transition-all flex items-center gap-1.5 shadow-sm ${
                    selectedEnough === false
                      ? 'bg-rose-600 border-rose-700 text-white scale-105 shadow-md'
                      : 'bg-white border-rose-300 text-rose-900 hover:bg-rose-50'
                  }`}
                >
                  <span>❌ </span>
                  <BopomofoText text="不夠買！" showBpmf={bopomofoEnabled ?? false} />
                </button>
              </div>
            </div>

            <button
              onClick={handleCheckEstimate}
              disabled={!userEstimateInput || selectedEnough === null}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-md btn-fun disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2 text-sm"
            >
              <Check size={16} />
              <BopomofoText text="檢查估算與判定結果" showBpmf={bopomofoEnabled ?? false} />
            </button>

            {estFeedback && (
              <div className={`w-full p-2.5 rounded-xl text-xs sm:text-sm font-black text-center ${
                estFeedback.isCorrect ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                <BopomofoText text={estFeedback.text} showBpmf={bopomofoEnabled ?? false} />
              </div>
            )}

            {estFeedback?.isCorrect && (
              <button
                onClick={handleNextEstimate}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black rounded-xl shadow-md btn-fun flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                <BopomofoText text="挑戰下一道超市估算題" showBpmf={bopomofoEnabled ?? false} /> <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= 模式零：百元紙鈔與錢幣換算 ================= */}
      {activeTab === 'money' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="bg-white p-5 rounded-3xl border-3 border-emerald-300 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-black text-emerald-950 flex items-center gap-1.5">
                <span>🏦</span>
                <span>操作百元紙鈔與硬幣，觀察三位數百位、十位、個位定位板：</span>
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                💡 10 個 10 元 ＝ 1 張 100 元！2 個 50 元 ＝ 1 張 100 元！
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center border-2 border-emerald-100 rounded-2xl p-3 bg-emerald-50/40">
              <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-emerald-200 shadow-sm">
                <span className="text-xs font-black text-rose-700 mb-2"><BopomofoText text="百位（100元紙鈔）" showBpmf={bopomofoEnabled ?? false} /></span>
                <div className="flex flex-wrap gap-1.5 justify-center min-h-[64px] items-center">
                  {Array.from({ length: bills100 }).map((_, i) => (
                    <div key={i} className="px-3 py-1.5 bg-red-600 border-2 border-red-800 text-white font-black text-xs rounded-lg shadow-sm">
                      💵 100元
                    </div>
                  ))}
                  {bills100 === 0 && <span className="text-xs text-slate-300 font-bold">0 張</span>}
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => { soundFx.playPop(); setBills100(p => Math.max(0, p - 1)); }}
                    className="w-6 h-6 bg-slate-100 rounded font-black text-xs"
                  >
                    -
                  </button>
                  <span className="font-mono font-black text-sm text-red-600">{bills100}</span>
                  <button
                    onClick={() => { soundFx.playCoin(); setBills100(p => Math.min(2, p + 1)); }}
                    className="w-6 h-6 bg-red-500 text-white rounded font-black text-xs"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-emerald-200 shadow-sm">
                <span className="text-xs font-black text-sky-700 mb-2"><BopomofoText text="十位（50元 / 10元硬幣）" showBpmf={bopomofoEnabled ?? false} /></span>
                <div className="flex flex-wrap gap-1.5 justify-center min-h-[64px] items-center">
                  {Array.from({ length: coins50 }).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-amber-400 border border-amber-600 text-amber-950 font-black text-[10px] flex items-center justify-center shadow-sm">
                      50
                    </div>
                  ))}
                  {Array.from({ length: coins10 }).map((_, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-slate-200 border border-slate-400 text-slate-800 font-black text-[10px] flex items-center justify-center shadow-sm">
                      10
                    </div>
                  ))}
                  {coins50 === 0 && coins10 === 0 && <span className="text-xs text-slate-300 font-bold">0 元</span>}
                </div>
                <div className="flex items-center justify-around w-full mt-2 pt-2 border-t border-slate-100 text-[11px] font-bold">
                  <div className="flex items-center gap-1">
                    <span className="text-amber-700">50:</span>
                    <button onClick={() => { soundFx.playPop(); setCoins50(p => Math.max(0, p - 1)); }} className="w-5 h-5 bg-slate-100 rounded">-</button>
                    <span className="font-mono">{coins50}</span>
                    <button onClick={() => { soundFx.playCoin(); setCoins50(p => Math.min(2, p + 1)); }} className="w-5 h-5 bg-amber-400 text-amber-950 rounded">+</button>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-600">10:</span>
                    <button onClick={() => { soundFx.playPop(); setCoins10(p => Math.max(0, p - 1)); }} className="w-5 h-5 bg-slate-100 rounded">-</button>
                    <span className="font-mono">{coins10}</span>
                    <button onClick={() => { soundFx.playCoin(); setCoins10(p => Math.min(9, p + 1)); }} className="w-5 h-5 bg-slate-300 text-slate-900 rounded">+</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center bg-white p-3 rounded-xl border border-emerald-200 shadow-sm">
                <span className="text-xs font-black text-amber-800 mb-2"><BopomofoText text="個位（5元 / 1元硬幣）" showBpmf={bopomofoEnabled ?? false} /></span>
                <div className="flex flex-wrap gap-1 justify-center min-h-[64px] items-center">
                  {Array.from({ length: coins5 }).map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-300 border border-slate-400 text-slate-800 font-black text-[9px] flex items-center justify-center shadow-sm">
                      5
                    </div>
                  ))}
                  {Array.from({ length: coins1 }).map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded-full bg-amber-700 border border-amber-900 text-amber-100 font-black text-[8px] flex items-center justify-center shadow-sm">
                      1
                    </div>
                  ))}
                  {coins5 === 0 && coins1 === 0 && <span className="text-xs text-slate-300 font-bold">0 元</span>}
                </div>
                <div className="flex items-center justify-around w-full mt-2 pt-2 border-t border-slate-100 text-[11px] font-bold">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-600">5:</span>
                    <button onClick={() => { soundFx.playPop(); setCoins5(p => Math.max(0, p - 1)); }} className="w-5 h-5 bg-slate-100 rounded">-</button>
                    <span className="font-mono">{coins5}</span>
                    <button onClick={() => { soundFx.playCoin(); setCoins5(p => Math.min(1, p + 1)); }} className="w-5 h-5 bg-slate-300 text-slate-800 rounded">+</button>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-800">1:</span>
                    <button onClick={() => { soundFx.playPop(); setCoins1(p => Math.max(0, p - 1)); }} className="w-5 h-5 bg-slate-100 rounded">-</button>
                    <span className="font-mono">{coins1}</span>
                    <button onClick={() => { soundFx.playCoin(); setCoins1(p => Math.min(9, p + 1)); }} className="w-5 h-5 bg-amber-700 text-white rounded">+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-100/70 p-3.5 rounded-2xl border border-emerald-300 flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm font-black text-emerald-950">
              <div className="flex items-center gap-1">
                <span><BopomofoText text="💰 錢幣點數總金額：" showBpmf={bopomofoEnabled ?? false} /></span>
                <span className="text-emerald-700 font-mono text-base">{bills100}<BopomofoText text="張百元" showBpmf={bopomofoEnabled ?? false} /></span>
                <span>＋</span>
                <span className="text-sky-700 font-mono text-base">{coins50 * 50 + coins10 * 10}<BopomofoText text="元" showBpmf={bopomofoEnabled ?? false} /></span>
                <span>＋</span>
                <span className="text-amber-700 font-mono text-base">{coins5 * 5 + coins1 * 1}<BopomofoText text="元" showBpmf={bopomofoEnabled ?? false} /></span>
              </div>
              <div className="text-base sm:text-lg font-mono text-rose-600 font-black">
                ＝ {totalMoney} 元
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 模式一：滿10顆拼成一條十與跳數 ================= */}
      {activeTab === 'tenPack' && (
        <div className="flex flex-col gap-4 animate-fade-in">
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-amber-950 flex items-center gap-1.5">
                <span>📦</span>
                <span><BopomofoText text="把 10 顆單獨的小積木，打包拼成 1 條十：" showBpmf={bopomofoEnabled ?? false} /></span>
              </span>
              <span className="text-xs font-bold text-slate-500">
                目前：{tens} 條十，{ones} 個一（共 {tens * 10 + ones}）
              </span>
            </div>

            <div className="flex items-center gap-4 bg-amber-50/60 p-3 rounded-xl border border-amber-200 justify-around">
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-sky-700 mb-1">十位（條十）</span>
                <div className="flex gap-1 items-end min-h-[70px]">
                  {Array.from({ length: tens }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3.5 h-16 bg-sky-500 border border-sky-700 rounded shadow-sm flex flex-col justify-between py-0.5 px-[1px]"
                      title="1條十"
                    >
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div key={j} className="h-2 bg-sky-300/50 rounded-[1px]"></div>
                      ))}
                    </div>
                  ))}
                  {tens === 0 && <span className="text-xs text-slate-400 font-bold self-center">無</span>}
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={handlePackTen}
                  disabled={ones < 10}
                  className={`px-3 py-2 rounded-xl font-black text-xs shadow transition flex items-center gap-1 ${
                    ones >= 10
                      ? 'bg-amber-500 hover:bg-amber-600 text-amber-950 animate-bounce'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>滿10顆拼成一條十</span>
                  <ArrowRight size={14} />
                </button>
                <span className="text-[10px] text-amber-800">
                  {ones >= 10 ? '✨ 滿十了！快點擊打包！' : `還差 ${10 - ones} 顆可打包`}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-amber-800 mb-1">個位（散裝一）</span>
                <div className="flex flex-wrap gap-1 w-28 min-h-[70px] items-center p-1 bg-white rounded-lg border border-amber-200">
                  {Array.from({ length: ones }).map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-amber-400 border border-amber-600 rounded-sm shadow-sm"></div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => setOnes(p => Math.max(0, p - 1))} className="w-5 h-5 bg-slate-100 rounded text-xs font-black">-</button>
                  <span className="text-xs font-bold font-mono">{ones}</span>
                  <button onClick={() => setOnes(p => p + 1)} className="w-5 h-5 bg-amber-400 text-amber-950 rounded text-xs font-black">+</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border-2 border-indigo-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-indigo-950 flex items-center gap-1.5">
                <span>🔢</span>
                <BopomofoText text="跳數練習：" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <div className="flex gap-1">
                {[2, 5, 10].map(step => (
                  <button
                    key={step}
                    onClick={() => {
                      soundFx.playPop();
                      setSkipStep(step as 2 | 5 | 10);
                      setSkipCount(step);
                    }}
                    className={`px-2 py-0.5 rounded-lg text-xs font-black transition ${
                      skipStep === step
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100'
                    }`}
                  >
                    {step}個一數
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-around bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setSkipCount(p => Math.max(skipStep, p - skipStep));
                }}
                disabled={skipCount <= skipStep}
                className="px-3 py-1.5 bg-white hover:bg-rose-50 text-slate-700 rounded-xl border border-slate-200 text-xs font-black disabled:opacity-30"
              >
                倒數 -{skipStep}
              </button>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-500">目前數到</span>
                <span className="text-3xl font-black font-mono text-indigo-600">{skipCount}</span>
              </div>

              <button
                onClick={() => {
                  soundFx.playCoin();
                  setSkipCount(p => Math.min(100, p + skipStep));
                }}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow btn-fun"
              >
                跳數 +{skipStep} ➡
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 模式二：十進位積木定位板（百位、十位、個位） ================= */}
      {activeTab === 'placeValue' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex flex-col items-center bg-white p-3.5 rounded-2xl border-2 border-emerald-300 shadow-sm min-h-[220px]">
            <div className="font-bold text-xs text-emerald-800 mb-2 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <BopomofoText text={`百位 (${hundreds})`} showBpmf={bopomofoEnabled ?? false} />
            </div>
            <div className="flex-1 flex flex-wrap gap-2 justify-center items-center overflow-y-auto max-h-44 p-1">
              {Array.from({ length: hundreds }).map((_, i) => (
                <div
                  key={i}
                  className="w-14 h-14 bg-emerald-500 border-2 border-emerald-700 rounded-md shadow-sm grid grid-cols-5 grid-rows-5 gap-[1px] p-[1px]"
                  title="100格大板"
                >
                  {Array.from({ length: 25 }).map((_, j) => (
                    <div key={j} className="bg-emerald-300/40 rounded-[1px]"></div>
                  ))}
                </div>
              ))}
            </div>
            {interactive && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 w-full justify-center">
                <button
                  onClick={() => updateBlocks(Math.max(0, hundreds - 1), tens, ones)}
                  disabled={hundreds <= 0}
                  className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-700 disabled:opacity-30"
                >
                  <Minus size={12} />
                </button>
                <span className="font-bold text-xs">{hundreds}</span>
                <button
                  onClick={() => updateBlocks(Math.min(9, hundreds + 1), tens, ones)}
                  className="p-1 rounded bg-slate-100 hover:bg-emerald-100 text-slate-700"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center bg-white p-3.5 rounded-2xl border-2 border-sky-300 shadow-sm min-h-[220px]">
            <div className="font-bold text-xs text-sky-800 mb-2 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
              <BopomofoText text={`十位 (${tens})`} showBpmf={bopomofoEnabled ?? false} />
            </div>
            <div className="flex-1 flex flex-wrap gap-1.5 justify-center items-center overflow-y-auto max-h-44 p-1">
              {Array.from({ length: tens }).map((_, i) => (
                <div
                  key={i}
                  className="w-3.5 h-16 bg-sky-500 border border-sky-700 rounded shadow-sm flex flex-col justify-between py-0.5 px-[1px]"
                  title="1條十"
                >
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-2 bg-sky-300/50 rounded-[1px]"></div>
                  ))}
                </div>
              ))}
            </div>
            {interactive && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 w-full justify-center">
                <button
                  onClick={() => updateBlocks(hundreds, Math.max(0, tens - 1), ones)}
                  disabled={tens <= 0}
                  className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-700 disabled:opacity-30"
                >
                  <Minus size={12} />
                </button>
                <span className="font-bold text-xs">{tens}</span>
                <button
                  onClick={() => updateBlocks(hundreds, Math.min(19, tens + 1), ones)}
                  className="p-1 rounded bg-slate-100 hover:bg-sky-100 text-slate-700"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center bg-white p-3.5 rounded-2xl border-2 border-amber-300 shadow-sm min-h-[220px]">
            <div className="font-bold text-xs text-amber-800 mb-2 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <BopomofoText text={`個位 (${ones})`} showBpmf={bopomofoEnabled ?? false} />
            </div>
            <div className="flex-1 flex flex-wrap gap-1.5 justify-center items-start content-start overflow-y-auto max-h-44 p-1">
              {Array.from({ length: ones }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-amber-400 border border-amber-600 rounded-sm shadow-sm"
                  title="1個小積木"
                ></div>
              ))}
            </div>
            {interactive && (
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 w-full justify-center">
                <button
                  onClick={() => updateBlocks(hundreds, tens, Math.max(0, ones - 1))}
                  disabled={ones <= 0}
                  className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-700 disabled:opacity-30"
                >
                  <Minus size={12} />
                </button>
                <span className="font-bold text-xs">{ones}</span>
                <button
                  onClick={() => updateBlocks(hundreds, tens, Math.min(29, ones + 1))}
                  className="p-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-700"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
