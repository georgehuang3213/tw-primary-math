import React, { useState } from 'react';
import { RotateCcw, Plus, Minus, ShoppingBag } from 'lucide-react';
import { soundFx } from '../../services/audio';

interface TaiwanCoinsProps {
  targetAmount?: number;
  itemName?: string;
  itemPrice?: number;
  onAmountChange?: (total: number) => void;
  interactive?: boolean;
}

export const TaiwanCoins: React.FC<TaiwanCoinsProps> = ({
  targetAmount,
  itemName,
  itemPrice,
  onAmountChange,
  interactive = true
}) => {
  const [coins, setCoins] = useState<{ [denom: number]: number }>({
    100: 0,
    50: 0,
    10: 0,
    5: 0,
    1: 0
  });

  const coinDenoms = [
    { value: 100, label: '100元', color: 'bg-red-500 border-red-700 text-white', type: 'bill', size: 'w-24 h-14' },
    { value: 50, label: '50元', color: 'bg-amber-400 border-amber-600 text-amber-950', type: 'coin', size: 'w-16 h-16' },
    { value: 10, label: '10元', color: 'bg-slate-300 border-slate-400 text-slate-900', type: 'coin', size: 'w-14 h-14' },
    { value: 5, label: '5元', color: 'bg-slate-200 border-slate-400 text-slate-800', type: 'coin', size: 'w-12 h-12' },
    { value: 1, label: '1元', color: 'bg-amber-700 border-amber-900 text-amber-100', type: 'coin', size: 'w-10 h-10' }
  ];

  const totalAmount = Object.entries(coins).reduce((sum, [denom, count]) => {
    return sum + Number(denom) * count;
  }, 0);

  const addCoin = (denom: number) => {
    soundFx.playCoin();
    setCoins(prev => {
      const next = { ...prev, [denom]: prev[denom] + 1 };
      const newTotal = Object.entries(next).reduce((s, [d, c]) => s + Number(d) * c, 0);
      if (onAmountChange) onAmountChange(newTotal);
      return next;
    });
  };

  const removeCoin = (denom: number) => {
    if (coins[denom] <= 0) return;
    soundFx.playPop();
    setCoins(prev => {
      const next = { ...prev, [denom]: Math.max(0, prev[denom] - 1) };
      const newTotal = Object.entries(next).reduce((s, [d, c]) => s + Number(d) * c, 0);
      if (onAmountChange) onAmountChange(newTotal);
      return next;
    });
  };

  const handleReset = () => {
    soundFx.playPop();
    setCoins({ 100: 0, 50: 0, 10: 0, 5: 0, 1: 0 });
    if (onAmountChange) onAmountChange(0);
  };

  return (
    <div className="flex flex-col gap-4 bg-amber-50/80 p-4 sm:p-6 rounded-3xl border-2 border-amber-200 max-w-xl mx-auto">
      {/* 若有商品情境顯示商品與應付金額 */}
      {itemName && itemPrice && (
        <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border-2 border-amber-300 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
              <ShoppingBag size={22} />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold">要購買的商品</span>
              <p className="text-base font-black text-slate-800">{itemName}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 font-bold">商品售價</span>
            <p className="text-xl font-black text-rose-600">${itemPrice} 元</p>
          </div>
        </div>
      )}

      {/* 收銀盤 / 投幣區 */}
      <div className="bg-emerald-800/90 text-white p-4 rounded-2xl border-4 border-emerald-950 shadow-inner flex flex-col justify-between min-h-[140px]">
        <div className="flex justify-between items-center border-b border-emerald-700/60 pb-2 mb-2">
          <span className="text-xs font-bold text-emerald-200 tracking-wider">錢包已拿出的金額</span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-emerald-200 hover:text-white bg-emerald-700/50 hover:bg-emerald-700 px-2 py-1 rounded-lg"
          >
            <RotateCcw size={12} /> 清空重算
          </button>
        </div>

        {/* 拿出的錢幣與紙鈔預覽區 */}
        <div className="flex flex-wrap items-center gap-2 py-2 min-h-[50px]">
          {totalAmount === 0 ? (
            <span className="text-emerald-300/70 text-sm font-medium italic mx-auto">
              點擊下方的硬幣或紙鈔放進錢包裡
            </span>
          ) : (
            <>
              {coins[100] > 0 && (
                <div className="flex items-center bg-red-600 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg border border-red-800 shadow">
                  💵 100元 × {coins[100]}
                </div>
              )}
              {coins[50] > 0 && (
                <div className="flex items-center bg-amber-400 text-amber-950 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-amber-600 shadow">
                  🪙 50元 × {coins[50]}
                </div>
              )}
              {coins[10] > 0 && (
                <div className="flex items-center bg-slate-200 text-slate-800 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-slate-400 shadow">
                  🪙 10元 × {coins[10]}
                </div>
              )}
              {coins[5] > 0 && (
                <div className="flex items-center bg-slate-300 text-slate-800 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-slate-400 shadow">
                  🪙 5元 × {coins[5]}
                </div>
              )}
              {coins[1] > 0 && (
                <div className="flex items-center bg-amber-800 text-amber-100 font-bold text-xs px-2.5 py-1.5 rounded-lg border border-amber-950 shadow">
                  🪙 1元 × {coins[1]}
                </div>
              )}
            </>
          )}
        </div>

        {/* 總計結算 */}
        <div className="flex justify-between items-end pt-2 border-t border-emerald-700/60">
          <span className="text-sm font-bold text-emerald-100">目前總共：</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
            $ {totalAmount} <span className="text-base font-normal text-white">元</span>
          </div>
        </div>
      </div>

      {/* 錢幣選擇按鈕區 */}
      {interactive && (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {coinDenoms.map(denom => (
            <div
              key={denom.value}
              className="flex flex-col items-center bg-white p-2.5 rounded-2xl border-2 border-amber-200 shadow-sm"
            >
              <button
                onClick={() => addCoin(denom.value)}
                className={`flex flex-col items-center justify-center font-black rounded-2xl border-2 shadow-md btn-fun ${denom.color} ${
                  denom.type === 'bill' ? 'w-20 h-12 text-sm rounded-lg' : 'w-14 h-14 rounded-full text-base'
                }`}
              >
                <span>{denom.label}</span>
              </button>

              <div className="flex items-center justify-between w-full mt-2 pt-1 border-t border-slate-100 text-xs font-bold text-slate-600">
                <button
                  onClick={() => removeCoin(denom.value)}
                  disabled={coins[denom.value] <= 0}
                  className="p-1 rounded-md bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 disabled:opacity-30 disabled:pointer-events-none"
                  title="減少一個"
                >
                  <Minus size={12} />
                </button>
                <span className="font-mono text-sm text-slate-800">{coins[denom.value]}</span>
                <button
                  onClick={() => addCoin(denom.value)}
                  className="p-1 rounded-md bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700"
                  title="增加一個"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
