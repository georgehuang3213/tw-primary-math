import React, { useState } from 'react';
import { RotateCcw, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Check, RefreshCw } from 'lucide-react';
import { soundFx } from '../../services/audio';
import { BopomofoText } from '../BopomofoText';

interface TaiwanCoinsProps {
  targetAmount?: number;
  itemName?: string;
  itemPrice?: number;
  onAmountChange?: (total: number) => void;
  interactive?: boolean;
  bopomofoEnabled?: boolean;
  unitId?: string;
}

type CoinTab = 'cashier' | 'exchange' | 'placeValue';

export const TaiwanCoins: React.FC<TaiwanCoinsProps> = ({
  targetAmount: propTarget,
  itemName: propItemName,
  itemPrice: propItemPrice,
  onAmountChange,
  interactive = true,
  bopomofoEnabled,
  unitId
}) => {
  const is1000Unit = unitId === 'g2-s2-u1-numbers-1000' || unitId?.includes('1000');

  // 商品列表（若為 1000 單元，提供千元級大額生活商品；若為 1 年級，提供 100 元內文具）
  const catalog1000 = [
    { name: '🚲 酷炫變速腳踏車', price: 850 },
    { name: '🤖 智慧對話機器人', price: 680 },
    { name: '🎮 掌上遊戲機', price: 990 },
    { name: '🛹 酷炫特技滑板', price: 450 },
    { name: '🧸 巨大抱抱泰迪熊', price: 720 },
    { name: '🎸 兒童木吉他', price: 1000 }
  ];

  const catalog100 = [
    { name: '✏️ 彩色鉛筆套組', price: 65 },
    { name: '📖 精彩漫畫故事書', price: 85 },
    { name: '🧼 造型香氛橡皮擦', price: 25 },
    { name: '📏 可愛動物尺', price: 15 },
    { name: '🎨 十二色粉蠟筆', price: 48 }
  ];

  const catalog = is1000Unit ? catalog1000 : catalog100;
  const [selectedProductIdx, setSelectedProductIdx] = useState(0);

  const currentItemName = propItemName || catalog[selectedProductIdx].name;
  const currentItemPrice = propItemPrice || catalog[selectedProductIdx].price;

  // 模式：若為 1000 單元且任務是大額換幣，預設直接進入「大額換幣實驗室」
  const defaultTab: CoinTab = is1000Unit ? 'exchange' : 'cashier';
  const [activeTab, setActiveTab] = useState<CoinTab>(defaultTab);

  // 錢包硬幣/紙鈔數量
  const [coins, setCoins] = useState<{ [denom: number]: number }>({
    1000: 0,
    500: 0,
    100: is1000Unit ? 3 : 0,
    50: 0,
    10: 0,
    5: 0,
    1: 0
  });

  const coinDenoms = is1000Unit
    ? [
        { value: 1000, label: '1000元', color: 'bg-sky-700 border-sky-900 text-white', type: 'bill', size: 'w-24 h-13' },
        { value: 500, label: '500元', color: 'bg-amber-800 border-amber-950 text-amber-100', type: 'bill', size: 'w-22 h-13' },
        { value: 100, label: '100元', color: 'bg-red-600 border-red-800 text-white', type: 'bill', size: 'w-20 h-13' },
        { value: 50, label: '50元', color: 'bg-amber-400 border-amber-600 text-amber-950', type: 'coin', size: 'w-14 h-14' },
        { value: 10, label: '10元', color: 'bg-slate-300 border-slate-400 text-slate-900', type: 'coin', size: 'w-13 h-13' },
        { value: 5, label: '5元', color: 'bg-slate-200 border-slate-400 text-slate-800', type: 'coin', size: 'w-12 h-12' },
        { value: 1, label: '1元', color: 'bg-amber-700 border-amber-900 text-amber-100', type: 'coin', size: 'w-10 h-10' }
      ]
    : [
        { value: 100, label: '100元', color: 'bg-red-600 border-red-800 text-white', type: 'bill', size: 'w-20 h-13' },
        { value: 50, label: '50元', color: 'bg-amber-400 border-amber-600 text-amber-950', type: 'coin', size: 'w-14 h-14' },
        { value: 10, label: '10元', color: 'bg-slate-300 border-slate-400 text-slate-900', type: 'coin', size: 'w-13 h-13' },
        { value: 5, label: '5元', color: 'bg-slate-200 border-slate-400 text-slate-800', type: 'coin', size: 'w-12 h-12' },
        { value: 1, label: '1元', color: 'bg-amber-700 border-amber-900 text-amber-100', type: 'coin', size: 'w-10 h-10' }
      ];

  const totalAmount = Object.entries(coins).reduce((sum, [denom, count]) => {
    return sum + Number(denom) * count;
  }, 0);

  const addCoin = (denom: number) => {
    soundFx.playCoin();
    setCoins((prev) => {
      const next = { ...prev, [denom]: (prev[denom] || 0) + 1 };
      const newTotal = Object.entries(next).reduce((s, [d, c]) => s + Number(d) * c, 0);
      if (onAmountChange) onAmountChange(newTotal);
      return next;
    });
  };

  const removeCoin = (denom: number) => {
    if (!coins[denom] || coins[denom] <= 0) return;
    soundFx.playPop();
    setCoins((prev) => {
      const next = { ...prev, [denom]: Math.max(0, prev[denom] - 1) };
      const newTotal = Object.entries(next).reduce((s, [d, c]) => s + Number(d) * c, 0);
      if (onAmountChange) onAmountChange(newTotal);
      return next;
    });
  };

  const handleReset = () => {
    soundFx.playPop();
    setCoins({ 1000: 0, 500: 0, 100: 0, 50: 0, 10: 0, 5: 0, 1: 0 });
    if (onAmountChange) onAmountChange(0);
  };

  // -------------------------------------------------------------
  // 🌟 大額換幣實驗室狀態 (10張100元換1張1000元大鈔)
  // -------------------------------------------------------------
  const [exchangeType, setExchangeType] = useState<'100to1000' | '500to1000' | '10to100'>('100to1000');
  const [exchangeCount, setExchangeCount] = useState<number>(5); // 初始有 5 張 100 元
  const [exchangedBigBills, setExchangedBigBills] = useState<number>(0);
  const [exchangeFeedback, setExchangeFeedback] = useState<string | null>(null);

  const maxExchangeNeeded = exchangeType === '100to1000' ? 10 : exchangeType === '500to1000' ? 2 : 10;
  const canExchange = exchangeCount >= maxExchangeNeeded;

  const handleAddSmallBill = () => {
    soundFx.playCoin();
    setExchangeCount((prev) => prev + 1);
    setExchangeFeedback(null);
  };

  const handleMinusSmallBill = () => {
    if (exchangeCount <= 0) return;
    soundFx.playPop();
    setExchangeCount((prev) => prev - 1);
    setExchangeFeedback(null);
  };

  const handleDoExchange = () => {
    if (!canExchange) return;
    soundFx.playCorrect();
    setExchangeCount((prev) => prev - maxExchangeNeeded);
    setExchangedBigBills((prev) => prev + 1);

    if (exchangeType === '100to1000') {
      setExchangeFeedback('🎉 太棒了！10 張 100 元大鈔成功兌換成 1 張千元大鈔（1000元）！十個一百成一千！');
    } else if (exchangeType === '500to1000') {
      setExchangeFeedback('🎉 答對了！2 張 500 元紙鈔成功兌換成 1 張千元大鈔（1000元）！');
    } else {
      setExchangeFeedback('🎉 太棒了！10 個 10 元銅板成功兌換成 1 張紅色百元鈔（100元）！');
    }
  };

  const handleResetExchange = () => {
    soundFx.playPop();
    setExchangeCount(5);
    setExchangedBigBills(0);
    setExchangeFeedback(null);
  };

  // 千位定位板拆解
  const thousands = Math.floor(totalAmount / 1000);
  const hundreds = Math.floor((totalAmount % 1000) / 100);
  const tens = Math.floor((totalAmount % 100) / 10);
  const ones = totalAmount % 10;

  return (
    <div className="flex flex-col gap-4 bg-amber-50/80 p-4 sm:p-6 rounded-3xl border-2 border-amber-200 max-w-2xl mx-auto w-full">
      {/* 頂部功能模式切換分頁 */}
      <div className="flex items-center justify-between bg-white p-1.5 rounded-2xl border-2 border-amber-200 shadow-sm flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* 若為 1000 單元，最優先突顯「大額換幣實驗室」 */}
          {is1000Unit && (
            <button
              onClick={() => {
                soundFx.playPop();
                setActiveTab('exchange');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
                activeTab === 'exchange'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-red-950 hover:bg-red-50'
              }`}
            >
              <span>🔄</span>
              <BopomofoText text="大額換幣實驗室" showBpmf={bopomofoEnabled ?? false} />
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('cashier');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              activeTab === 'cashier'
                ? 'bg-amber-500 text-amber-950 shadow-md'
                : 'text-amber-950 hover:bg-amber-100'
            }`}
          >
            <span>🛒</span>
            <BopomofoText text={is1000Unit ? '1000以內收銀找零' : '超商收銀模擬'} showBpmf={bopomofoEnabled ?? false} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('placeValue');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1 ${
              activeTab === 'placeValue'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-sky-950 hover:bg-sky-50'
            }`}
          >
            <span>🏷️</span>
            <BopomofoText text={is1000Unit ? '千位定位板點數' : '百位定位板點數'} showBpmf={bopomofoEnabled ?? false} />
          </button>
        </div>

        {activeTab === 'cashier' && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 font-bold px-2 py-1 rounded-lg"
          >
            <RotateCcw size={13} />
            <BopomofoText text="清空錢包" showBpmf={bopomofoEnabled ?? false} />
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 🌟 模式 1：大額換幣實驗室（10張100元換1張1000元千元大鈔） */}
      {/* ========================================================================= */}
      {activeTab === 'exchange' && (
        <div className="w-full flex flex-col gap-4">
          {/* 換幣規則選擇膠囊按鈕 */}
          <div className="w-full bg-white p-3 rounded-2xl border-2 border-red-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-black text-red-950 flex items-center gap-1">
              <Sparkles size={15} className="text-amber-500" />
              <BopomofoText text="選擇大額換幣規則：" showBpmf={bopomofoEnabled ?? false} />
            </span>
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setExchangeType('100to1000');
                  setExchangeCount(5);
                  setExchangedBigBills(0);
                  setExchangeFeedback(null);
                }}
                className={`px-3 py-1 text-xs font-black rounded-xl transition ${
                  exchangeType === '100to1000'
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-red-50 text-red-900 hover:bg-red-100 border border-red-200'
                }`}
              >
                <BopomofoText text="10張100元 ➔ 1張1000元" showBpmf={bopomofoEnabled ?? false} />
              </button>

              <button
                onClick={() => {
                  soundFx.playPop();
                  setExchangeType('500to1000');
                  setExchangeCount(1);
                  setExchangedBigBills(0);
                  setExchangeFeedback(null);
                }}
                className={`px-3 py-1 text-xs font-black rounded-xl transition ${
                  exchangeType === '500to1000'
                    ? 'bg-amber-800 text-white shadow-md'
                    : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                <BopomofoText text="2張500元 ➔ 1張1000元" showBpmf={bopomofoEnabled ?? false} />
              </button>

              <button
                onClick={() => {
                  soundFx.playPop();
                  setExchangeType('10to100');
                  setExchangeCount(5);
                  setExchangedBigBills(0);
                  setExchangeFeedback(null);
                }}
                className={`px-3 py-1 text-xs font-black rounded-xl transition ${
                  exchangeType === '10to100'
                    ? 'bg-slate-700 text-white shadow-md'
                    : 'bg-slate-50 text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <BopomofoText text="10個10元 ➔ 1張100元" showBpmf={bopomofoEnabled ?? false} />
              </button>
            </div>
          </div>

          {/* 換幣操作主桌台 */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-3 border-red-300 rounded-3xl p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black px-2.5 py-0.5 bg-red-600 text-white rounded-full">
                  <BopomofoText text="小明的存錢大桌面" showBpmf={bopomofoEnabled ?? false} />
                </span>
                <p className="text-sm font-black text-red-950 mt-1">
                  {exchangeType === '100to1000' && (
                    <BopomofoText text="桌上每放滿 10 張 100 元，就可以換成 1 張千元大鈔（1000元）！" showBpmf={bopomofoEnabled ?? false} />
                  )}
                  {exchangeType === '500to1000' && (
                    <BopomofoText text="桌上每放滿 2 張 500 元，就可以換成 1 張千元大鈔（1000元）！" showBpmf={bopomofoEnabled ?? false} />
                  )}
                  {exchangeType === '10to100' && (
                    <BopomofoText text="桌上每放滿 10 個 10 元銅板，就可以換成 1 張紅色百元鈔（100元）！" showBpmf={bopomofoEnabled ?? false} />
                  )}
                </p>
              </div>

              <button
                onClick={handleResetExchange}
                className="text-xs text-slate-500 hover:text-red-700 flex items-center gap-1 font-bold p-1 rounded-lg"
              >
                <RotateCcw size={13} />
                <BopomofoText text="重設換幣" showBpmf={bopomofoEnabled ?? false} />
              </button>
            </div>

            {/* 待換鈔票展示區 */}
            <div className="bg-white/90 p-4 rounded-2xl border-2 border-red-200 shadow-inner flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  {exchangeType === '100to1000' && <BopomofoText text="目前桌上的 100 元鈔票：" showBpmf={bopomofoEnabled ?? false} />}
                  {exchangeType === '500to1000' && <BopomofoText text="目前桌上的 500 元鈔票：" showBpmf={bopomofoEnabled ?? false} />}
                  {exchangeType === '10to100' && <BopomofoText text="目前桌上的 10 元硬幣：" showBpmf={bopomofoEnabled ?? false} />}
                </span>
                <span className="text-xs font-mono font-black text-red-700">
                  {exchangeCount} / {maxExchangeNeeded}
                </span>
              </div>

              {/* 鈔票排列陣列 */}
              <div className="flex flex-wrap items-center gap-2 min-h-[60px] py-1">
                {exchangeCount === 0 ? (
                  <span className="text-slate-400 text-xs italic mx-auto">
                    <BopomofoText text="桌上目前沒有鈔票，點擊下方「➕」放進鈔票！" showBpmf={bopomofoEnabled ?? false} />
                  </span>
                ) : (
                  Array.from({ length: exchangeCount }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center font-black text-xs shadow-sm rounded-lg border animate-fade-in ${
                        exchangeType === '100to1000'
                          ? 'bg-red-600 text-white border-red-800 w-16 h-10'
                          : exchangeType === '500to1000'
                          ? 'bg-amber-800 text-amber-100 border-amber-950 w-16 h-10'
                          : 'bg-slate-200 text-slate-900 border-slate-400 w-10 h-10 rounded-full'
                      }`}
                    >
                      {exchangeType === '100to1000' ? '100' : exchangeType === '500to1000' ? '500' : '10'}
                    </div>
                  ))
                )}
              </div>

              {/* 增加/減少操作按鈕 */}
              <div className="flex items-center justify-center gap-3 pt-2 border-t border-red-100">
                <button
                  onClick={handleMinusSmallBill}
                  disabled={exchangeCount <= 0}
                  className="px-3 py-1 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-xl text-xs font-black flex items-center gap-1 disabled:opacity-30"
                >
                  <Minus size={14} />
                  <BopomofoText text="收回一張" showBpmf={bopomofoEnabled ?? false} />
                </button>

                <button
                  onClick={handleAddSmallBill}
                  className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1 btn-fun"
                >
                  <Plus size={14} />
                  <BopomofoText text="拿出放一張到桌上" showBpmf={bopomofoEnabled ?? false} />
                </button>
              </div>
            </div>

            {/* 🌟 換成大鈔按鈕（當集滿時點亮！） */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={handleDoExchange}
                disabled={!canExchange}
                className={`w-full py-3.5 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-md transition-all ${
                  canExchange
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white scale-102 ring-4 ring-sky-300 animate-pulse'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>✨</span>
                {exchangeType === '100to1000' && (
                  <BopomofoText
                    text={canExchange ? '滿 10 張 100 元了！點我換成 1 張千元大鈔（1000元）！' : `還差 ${maxExchangeNeeded - exchangeCount} 張 100 元就能換 1000 元大鈔`}
                    showBpmf={bopomofoEnabled ?? false}
                  />
                )}
                {exchangeType === '500to1000' && (
                  <BopomofoText
                    text={canExchange ? '滿 2 張 500 元了！點我換成 1 張千元大鈔（1000元）！' : `還差 ${maxExchangeNeeded - exchangeCount} 張 500 元就能換 1000 元大鈔`}
                    showBpmf={bopomofoEnabled ?? false}
                  />
                )}
                {exchangeType === '10to100' && (
                  <BopomofoText
                    text={canExchange ? '滿 10 個 10 元了！點我換成 1 張紅色百元鈔（100元）！' : `還差 ${maxExchangeNeeded - exchangeCount} 個 10 元就能換 100 元`}
                    showBpmf={bopomofoEnabled ?? false}
                  />
                )}
              </button>

              {/* 兌換獲得的千元大鈔展示 */}
              {exchangedBigBills > 0 && (
                <div className="w-full bg-sky-50 border-2 border-sky-300 rounded-2xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    <span className="text-xs font-black text-sky-950">
                      {exchangeType === '10to100' ? (
                        <BopomofoText text={`成功兌換了 ${exchangedBigBills} 張紅色百元大鈔！`} showBpmf={bopomofoEnabled ?? false} />
                      ) : (
                        <BopomofoText text={`成功兌換了 ${exchangedBigBills} 張深藍色千元大鈔（1000元）！`} showBpmf={bopomofoEnabled ?? false} />
                      )}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {Array.from({ length: exchangedBigBills }).map((_, i) => (
                      <div
                        key={i}
                        className={`font-black text-xs px-2.5 py-1.5 rounded-lg border shadow-sm ${
                          exchangeType === '10to100'
                            ? 'bg-red-600 text-white border-red-800'
                            : 'bg-sky-700 text-white border-sky-950'
                        }`}
                      >
                        {exchangeType === '10to100' ? '💵 100元' : '💵 1000元'}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 回饋提示 */}
              {exchangeFeedback && (
                <div className="w-full p-2.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs sm:text-sm font-black text-center">
                  <BopomofoText text={exchangeFeedback} showBpmf={bopomofoEnabled ?? false} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 2：超商收銀模擬（多元商品與付款找零） */}
      {/* ========================================================================= */}
      {activeTab === 'cashier' && (
        <div className="w-full flex flex-col gap-4">
          {/* 商品快速選擇輪播列 */}
          <div className="w-full bg-white p-2.5 rounded-2xl border-2 border-amber-200 shadow-sm flex items-center justify-between gap-2 overflow-x-auto">
            <span className="text-xs font-black text-slate-700 shrink-0">
              <BopomofoText text="選擇要購買的商品：" showBpmf={bopomofoEnabled ?? false} />
            </span>
            <div className="flex gap-1.5">
              {catalog.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playPop();
                    setSelectedProductIdx(idx);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition shrink-0 ${
                    selectedProductIdx === idx
                      ? 'bg-amber-500 text-amber-950 font-black shadow-md'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  {item.name} (${item.price})
                </button>
              ))}
            </div>
          </div>

          {/* 當前商品卡 */}
          <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border-2 border-amber-300 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 bg-amber-100 rounded-xl text-amber-800">
                <ShoppingBag size={24} />
              </div>
              <div>
                <span className="text-xs text-slate-500 font-bold">
                  <BopomofoText text="要購買的商品" showBpmf={bopomofoEnabled ?? false} />
                </span>
                <p className="text-base font-black text-slate-800">{currentItemName}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 font-bold">
                <BopomofoText text="商品售價" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <p className="text-2xl font-black text-rose-600 font-mono">
                ${currentItemPrice} <span className="text-sm font-sans font-bold text-slate-600"><BopomofoText text="元" showBpmf={bopomofoEnabled ?? false} /></span>
              </p>
            </div>
          </div>

          {/* 收銀盤 / 投幣區 */}
          <div className="bg-emerald-800/95 text-white p-4 rounded-2xl border-4 border-emerald-950 shadow-inner flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-center border-b border-emerald-700/60 pb-2 mb-2">
              <span className="text-xs font-bold text-emerald-200 tracking-wider">
                <BopomofoText text="錢包已拿出的金額" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-emerald-200 hover:text-white bg-emerald-700/50 hover:bg-emerald-700 px-2 py-1 rounded-lg"
              >
                <RotateCcw size={12} /> <BopomofoText text="清空重算" showBpmf={bopomofoEnabled ?? false} />
              </button>
            </div>

            {/* 拿出的錢幣與紙鈔預覽區 */}
            <div className="flex flex-wrap items-center gap-2 py-2 min-h-[50px]">
              {totalAmount === 0 ? (
                <span className="text-emerald-300/70 text-sm font-medium italic mx-auto">
                  <BopomofoText text="點擊下方的硬幣或紙鈔放進錢包裡" showBpmf={bopomofoEnabled ?? false} />
                </span>
              ) : (
                <>
                  {coins[1000] > 0 && (
                    <div className="flex items-center bg-sky-700 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg border border-sky-950 shadow">
                      💵 <BopomofoText text="1000元" showBpmf={bopomofoEnabled ?? false} /> × {coins[1000]}
                    </div>
                  )}
                  {coins[500] > 0 && (
                    <div className="flex items-center bg-amber-800 text-amber-100 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-amber-950 shadow">
                      💵 <BopomofoText text="500元" showBpmf={bopomofoEnabled ?? false} /> × {coins[500]}
                    </div>
                  )}
                  {coins[100] > 0 && (
                    <div className="flex items-center bg-red-600 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg border border-red-800 shadow">
                      💵 <BopomofoText text="100元" showBpmf={bopomofoEnabled ?? false} /> × {coins[100]}
                    </div>
                  )}
                  {coins[50] > 0 && (
                    <div className="flex items-center bg-amber-400 text-amber-950 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-amber-600 shadow">
                      🪙 <BopomofoText text="50元" showBpmf={bopomofoEnabled ?? false} /> × {coins[50]}
                    </div>
                  )}
                  {coins[10] > 0 && (
                    <div className="flex items-center bg-slate-200 text-slate-800 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-slate-400 shadow">
                      🪙 <BopomofoText text="10元" showBpmf={bopomofoEnabled ?? false} /> × {coins[10]}
                    </div>
                  )}
                  {coins[5] > 0 && (
                    <div className="flex items-center bg-slate-300 text-slate-800 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-slate-400 shadow">
                      🪙 <BopomofoText text="5元" showBpmf={bopomofoEnabled ?? false} /> × {coins[5]}
                    </div>
                  )}
                  {coins[1] > 0 && (
                    <div className="flex items-center bg-amber-800 text-amber-100 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-amber-950 shadow">
                      🪙 <BopomofoText text="1元" showBpmf={bopomofoEnabled ?? false} /> × {coins[1]}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* 總計結算與找零指示 */}
            <div className="flex justify-between items-end pt-2 border-t border-emerald-700/60 flex-wrap gap-2">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-emerald-200">
                  <BopomofoText text="目前拿出：" showBpmf={bopomofoEnabled ?? false} />
                </span>
                <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                  $ {totalAmount} <span className="text-sm font-normal text-white"><BopomofoText text="元" showBpmf={bopomofoEnabled ?? false} /></span>
                </span>
              </div>

              {/* 付款判定狀態 */}
              <div className="text-right">
                {totalAmount === currentItemPrice && (
                  <span className="text-xs sm:text-sm font-black text-amber-300 bg-emerald-900/80 px-3 py-1 rounded-xl border border-amber-400 flex items-center gap-1">
                    <Check size={14} /> <BopomofoText text="剛好付清，不必找錢！" showBpmf={bopomofoEnabled ?? false} />
                  </span>
                )}
                {totalAmount > currentItemPrice && (
                  <span className="text-xs sm:text-sm font-black text-sky-200 bg-emerald-900/80 px-3 py-1 rounded-xl border border-sky-300">
                    <BopomofoText text={`應找回：$ ${totalAmount - currentItemPrice} 元！`} showBpmf={bopomofoEnabled ?? false} />
                  </span>
                )}
                {totalAmount < currentItemPrice && totalAmount > 0 && (
                  <span className="text-xs sm:text-sm font-bold text-rose-300 bg-emerald-900/80 px-3 py-1 rounded-xl border border-rose-400">
                    <BopomofoText text={`還差：$ ${currentItemPrice - totalAmount} 元`} showBpmf={bopomofoEnabled ?? false} />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 錢幣選擇按鈕區 */}
          {interactive && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {coinDenoms.map((denom) => (
                <div
                  key={denom.value}
                  className="flex flex-col items-center bg-white p-2 rounded-2xl border-2 border-amber-200 shadow-sm"
                >
                  <button
                    onClick={() => addCoin(denom.value)}
                    className={`flex flex-col items-center justify-center font-black shadow-md btn-fun ${denom.color} ${
                      denom.type === 'bill' ? 'w-18 h-11 text-xs rounded-lg' : 'w-12 h-12 rounded-full text-sm'
                    }`}
                  >
                    <span><BopomofoText text={denom.label} showBpmf={bopomofoEnabled ?? false} /></span>
                  </button>

                  <div className="flex items-center justify-between w-full mt-1.5 pt-1 border-t border-slate-100 text-xs font-bold text-slate-600">
                    <button
                      onClick={() => removeCoin(denom.value)}
                      disabled={!coins[denom.value] || coins[denom.value] <= 0}
                      className="p-1 rounded-md bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-mono text-sm text-slate-800">{coins[denom.value] || 0}</span>
                    <button
                      onClick={() => addCoin(denom.value)}
                      className="p-1 rounded-md bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 模式 3：千位定位板點數（千位、百位、十位、個位） */}
      {/* ========================================================================= */}
      {activeTab === 'placeValue' && (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="w-full bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 text-center">
            <h4 className="text-sm font-black text-sky-950">
              <BopomofoText text="千位定位板點數分析" showBpmf={bopomofoEnabled ?? false} />
            </h4>
            <p className="text-xs font-bold text-slate-600 mt-0.5">
              <BopomofoText text="個、十、百、千四兄弟，看清每一位代表的真實數量！" showBpmf={bopomofoEnabled ?? false} />
            </p>
          </div>

          {/* 定位板四欄位 */}
          <div className="grid grid-cols-4 gap-2 w-full text-center">
            {/* 千位 */}
            <div className="bg-sky-600 text-white p-3 rounded-2xl shadow-sm border-2 border-sky-700 flex flex-col items-center">
              <span className="text-xs font-black text-sky-100 mb-1">
                <BopomofoText text="千位" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="font-mono font-black text-3xl sm:text-4xl text-amber-300 my-1">
                {thousands}
              </span>
              <span className="text-[10px] text-sky-200">
                （{thousands * 1000}元）
              </span>
            </div>

            {/* 百位 */}
            <div className="bg-red-500 text-white p-3 rounded-2xl shadow-sm border-2 border-red-700 flex flex-col items-center">
              <span className="text-xs font-black text-red-100 mb-1">
                <BopomofoText text="百位" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="font-mono font-black text-3xl sm:text-4xl text-white my-1">
                {hundreds}
              </span>
              <span className="text-[10px] text-red-100">
                （{hundreds * 100}元）
              </span>
            </div>

            {/* 十位 */}
            <div className="bg-amber-400 text-amber-950 p-3 rounded-2xl shadow-sm border-2 border-amber-600 flex flex-col items-center">
              <span className="text-xs font-black text-amber-900 mb-1">
                <BopomofoText text="十位" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="font-mono font-black text-3xl sm:text-4xl text-amber-950 my-1">
                {tens}
              </span>
              <span className="text-[10px] text-amber-800">
                （{tens * 10}元）
              </span>
            </div>

            {/* 個位 */}
            <div className="bg-slate-300 text-slate-900 p-3 rounded-2xl shadow-sm border-2 border-slate-400 flex flex-col items-center">
              <span className="text-xs font-black text-slate-700 mb-1">
                <BopomofoText text="個位" showBpmf={bopomofoEnabled ?? false} />
              </span>
              <span className="font-mono font-black text-3xl sm:text-4xl text-slate-900 my-1">
                {ones}
              </span>
              <span className="text-[10px] text-slate-600">
                （{ones}元）
              </span>
            </div>
          </div>

          <div className="w-full bg-white p-4 rounded-2xl border-2 border-sky-200 text-center shadow-sm">
            <span className="text-xs font-bold text-slate-500"><BopomofoText text="目前錢包總計：" showBpmf={bopomofoEnabled ?? false} /></span>
            <div className="text-3xl sm:text-4xl font-black text-sky-900 font-mono mt-1">
              $ {totalAmount} <span className="text-lg font-sans font-bold text-slate-700"><BopomofoText text="元" showBpmf={bopomofoEnabled ?? false} /></span>
            </div>
            <p className="text-xs font-bold text-slate-600 mt-2">
              <BopomofoText
                text={`由 ${thousands} 個一千、${hundreds} 個一百、${tens} 個十、${ones} 個一合起來！`}
                showBpmf={bopomofoEnabled ?? false}
              />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
