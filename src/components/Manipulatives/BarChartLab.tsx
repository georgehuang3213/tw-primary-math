import React, { useState } from 'react';
import { BarChart3, RotateCcw, Volume2, Sparkles, Plus, Minus } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface BarChartLabProps {
  bopomofoEnabled?: boolean;
}

interface FruitVote {
  id: string;
  name: string;
  icon: string;
  votes: number;
  color: string;
}

// 台灣教育部國小標準「正」字筆畫順序組件：
// 第 1 劃：最上面一橫 (橫)
// 第 2 劃：中間一直 (豎)
// 第 3 劃：中間一短橫向右 (短橫)
// 第 4 劃：左下一小豎 (豎)
// 第 5 劃：最底下一長橫 (長橫，封底成「正」)
export const ZhengStrokeIcon: React.FC<{ strokeCount: number; isFull?: boolean }> = ({ strokeCount, isFull }) => {
  const count = isFull ? 5 : strokeCount % 5;
  if (count === 0 && !isFull) return null;

  return (
    <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9 inline-block drop-shadow-sm">
      {/* 第 1 劃：頂端橫線 (1 ~ 5) */}
      {count >= 1 && (
        <line x1="15" y1="20" x2="85" y2="20" stroke="#6b21a8" strokeWidth="9" strokeLinecap="round" />
      )}

      {/* 第 2 劃：中間垂直線 (2 ~ 5) */}
      {count >= 2 && (
        <line x1="50" y1="20" x2="50" y2="82" stroke="#6b21a8" strokeWidth="9" strokeLinecap="round" />
      )}

      {/* 第 3 劃：中間往右短橫線 (3 ~ 5) */}
      {count >= 3 && (
        <line x1="50" y1="50" x2="82" y2="50" stroke="#6b21a8" strokeWidth="9" strokeLinecap="round" />
      )}

      {/* 第 4 劃：左下短垂直線 (4 ~ 5) */}
      {count >= 4 && (
        <line x1="24" y1="50" x2="24" y2="82" stroke="#6b21a8" strokeWidth="9" strokeLinecap="round" />
      )}

      {/* 第 5 劃：底部長橫線 (5) */}
      {count >= 5 && (
        <line x1="12" y1="82" x2="88" y2="82" stroke="#6b21a8" strokeWidth="9" strokeLinecap="round" />
      )}
    </svg>
  );
};

export const BarChartLab: React.FC<BarChartLabProps> = ({ bopomofoEnabled = true }) => {
  const [activeTab, setActiveTab] = useState<'zheng' | 'barchart'>('zheng'); // 預設為正字畫記統計表
  const [data, setData] = useState<FruitVote[]>([
    { id: 'strawberry', name: '草莓', icon: '🍓', votes: 2, color: 'bg-rose-500' },
    { id: 'watermelon', name: '西瓜', icon: '🍉', votes: 0, color: 'bg-emerald-500' },
    { id: 'mango', name: '芒果', icon: '🥭', votes: 7, color: 'bg-amber-500' },
    { id: 'banana', name: '香蕉', icon: '🍌', votes: 4, color: 'bg-yellow-400' },
  ]);

  const maxVoteItem = [...data].sort((a, b) => b.votes - a.votes)[0];
  const minVoteItem = [...data].sort((a, b) => a.votes - b.votes)[0];
  const totalVotes = data.reduce((sum, item) => sum + item.votes, 0);

  const handleAdjustVote = (id: string, delta: number) => {
    soundFx.playPop();
    setData(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextVal = Math.max(0, Math.min(15, item.votes + delta));
          return { ...item, votes: nextVal };
        }
        return item;
      })
    );
  };

  const handleSpeak = () => {
    soundFx.playCorrect();
    const diff = maxVoteItem.votes - minVoteItem.votes;
    const text = `全班共投了 ${totalVotes} 票。用「正」字計數，滿五劃就是一個正！最受歡迎的是【${maxVoteItem.name}】有 ${maxVoteItem.votes} 票；最少的是【${minVoteItem.name}】有 ${minVoteItem.votes} 票，相差 ${diff} 票！`;
    speechService.speak(text);
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-purple-50 to-pink-50 rounded-3xl border-4 border-purple-300 shadow-lg">
      {/* 頂部功能列 */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-white p-2.5 rounded-2xl border-2 border-purple-200 shadow-sm">
        {/* 切換：正字統計表 vs 長條圖 */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('zheng');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
              activeTab === 'zheng'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-purple-50'
            }`}
          >
            <span>📝</span>
            <BopomofoText text="「正」字畫記與統計表" showBpmf={bopomofoEnabled} />
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('barchart');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-1.5 ${
              activeTab === 'barchart'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-indigo-50'
            }`}
          >
            <span>📊</span>
            <BopomofoText text="長條圖統計分析" showBpmf={bopomofoEnabled} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-black border border-purple-300 transition"
          >
            <Volume2 size={15} />
            <BopomofoText text="語音分析" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setData([
                { id: 'strawberry', name: '草莓', icon: '🍓', votes: 2, color: 'bg-rose-500' },
                { id: 'watermelon', name: '西瓜', icon: '🍉', votes: 0, color: 'bg-emerald-500' },
                { id: 'mango', name: '芒果', icon: '🥭', votes: 7, color: 'bg-amber-500' },
                { id: 'banana', name: '香蕉', icon: '🍌', votes: 4, color: 'bg-yellow-400' },
              ]);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* 票數調整控制按鈕 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {data.map(item => (
          <div key={item.id} className="bg-white p-2.5 rounded-2xl border-2 border-purple-100 shadow-sm flex items-center justify-between">
            <span className="text-xs sm:text-sm font-black flex items-center gap-1">
              <span>{item.icon}</span>
              <BopomofoText text={item.name} showBpmf={bopomofoEnabled ?? false} />
            </span>
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => handleAdjustVote(item.id, -1)}
                className="w-6 h-6 bg-white text-rose-600 rounded font-black shadow-sm text-xs"
              >
                -
              </button>
              <span className="w-5 text-center font-black text-xs font-mono">{item.votes}</span>
              <button
                onClick={() => handleAdjustVote(item.id, 1)}
                className="w-6 h-6 bg-white text-emerald-600 rounded font-black shadow-sm text-xs"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= 模式一：「正」字記號與簡易統計表（任務第一核心） ================= */}
      {activeTab === 'zheng' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-purple-300 shadow-sm flex flex-col gap-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-purple-50 p-3 rounded-2xl border border-purple-200">
            <span className="text-xs sm:text-sm font-black text-purple-950 flex items-center gap-1.5">
              <span>📝</span>
              <BopomofoText text="「正」字教育部標準筆順：一筆一畫，滿 5 劃寫成一個完整的「正」！" showBpmf={bopomofoEnabled ?? false} />
            </span>

            {/* 筆順動態指南：1(橫) -> 2(豎) -> 3(短橫) -> 4(短豎) -> 5(長橫) */}
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-xl border border-purple-100 shadow-sm">
              <span className="text-purple-700"><BopomofoText text="筆順展示：" showBpmf={bopomofoEnabled ?? false} /></span>
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-0.5">①<ZhengStrokeIcon strokeCount={1} /></span>
                <span>➔</span>
                <span className="flex items-center gap-0.5">②<ZhengStrokeIcon strokeCount={2} /></span>
                <span>➔</span>
                <span className="flex items-center gap-0.5">③<ZhengStrokeIcon strokeCount={3} /></span>
                <span>➔</span>
                <span className="flex items-center gap-0.5">④<ZhengStrokeIcon strokeCount={4} /></span>
                <span>➔</span>
                <span className="flex items-center gap-0.5">⑤<ZhengStrokeIcon strokeCount={5} isFull={true} /></span>
              </div>
            </div>
          </div>

          {/* 台灣國小標準「正」字分類整理統計表格 */}
          <div className="overflow-x-auto rounded-2xl border-2 border-purple-200 shadow-sm">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-purple-100/80 text-purple-950 text-xs sm:text-sm font-black">
                  <th className="py-3 px-3 border-b border-r border-purple-200"><BopomofoText text="水果種類" showBpmf={bopomofoEnabled ?? false} /></th>
                  <th className="py-3 px-4 border-b border-r border-purple-200"><BopomofoText text="「正」字記號畫記" showBpmf={bopomofoEnabled ?? false} /></th>
                  <th className="py-3 px-3 border-b border-purple-200"><BopomofoText text="數量（票數）" showBpmf={bopomofoEnabled ?? false} /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100 text-xs sm:text-sm font-bold">
                {data.map(item => {
                  return (
                    <tr key={item.id} className="hover:bg-purple-50/50 transition">
                      <td className="py-3 px-3 border-r border-purple-100 font-black flex items-center justify-center gap-1.5">
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                      </td>

                      {/* 「正」字展示欄位 */}
                      <td className="py-3 px-4 border-r border-purple-100">
                        {item.votes === 0 ? (
                          <span className="text-slate-300 font-normal"><BopomofoText text="（無票數，0 劃）" showBpmf={bopomofoEnabled ?? false} /></span>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            {/* 滿 5 劃的「正」字 */}
                            {Array.from({ length: Math.floor(item.votes / 5) }).map((_, i) => (
                              <div
                                key={i}
                                className="p-1 bg-purple-100/70 border border-purple-300 rounded-xl shadow-sm flex items-center justify-center"
                              >
                                <ZhengStrokeIcon strokeCount={5} isFull={true} />
                              </div>
                            ))}

                            {/* 剩餘未滿 5 劃的筆畫 (第1~4劃) */}
                            {item.votes % 5 > 0 && (
                              <div
                                className="p-1 bg-amber-100/80 border border-amber-300 rounded-xl shadow-sm flex items-center justify-center"
                              >
                                <ZhengStrokeIcon strokeCount={item.votes % 5} />
                              </div>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3 font-mono font-black text-base text-purple-900">
                        <BopomofoText text={`${item.votes} 票`} showBpmf={bopomofoEnabled ?? false} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-purple-50 font-black text-purple-950 text-xs sm:text-sm border-t-2 border-purple-200">
                  <td className="py-2.5 px-3 border-r border-purple-200"><BopomofoText text="全班合計" showBpmf={bopomofoEnabled ?? false} /></td>
                  <td className="py-2.5 px-4 border-r border-purple-200 text-slate-500">
                    <BopomofoText text={`一筆一畫累計共 ${totalVotes} 劃`} showBpmf={bopomofoEnabled ?? false} />
                  </td>
                  <td className="py-2.5 px-3 font-mono text-base text-purple-900">
                    <BopomofoText text={`${totalVotes} 票`} showBpmf={bopomofoEnabled ?? false} />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* 結論分析牌 */}
          <div className="p-3.5 bg-purple-50 rounded-2xl border-2 border-purple-200 text-center">
            <div className="text-sm font-black text-purple-950 flex items-center justify-center gap-2">
              <Sparkles className="text-purple-600 w-4 h-4" />
              <BopomofoText
                text={`最受歡迎：${maxVoteItem.name}（${maxVoteItem.votes}票）；最少票：${minVoteItem.name}（${minVoteItem.votes}票），兩者相差 ${
                  maxVoteItem.votes - minVoteItem.votes
                } 票！`}
                showBpmf={bopomofoEnabled}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= 模式二：長條圖視覺展示區 ================= */}
      {activeTab === 'barchart' && (
        <div className="bg-white rounded-3xl p-6 border-3 border-indigo-300 shadow-sm flex flex-col animate-fade-in">
          <div className="text-xs font-black text-slate-500 mb-4">
            <BopomofoText text="📊 長條圖（直軸為票數 0 ~ 15，橫軸為水果類別）：" showBpmf={bopomofoEnabled ?? false} />
          </div>

          {/* 柱狀圖 */}
          <div className="h-56 flex items-end justify-around gap-2 border-b-4 border-slate-700 pb-2 relative">
            {/* 背景格線 */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-slate-500 text-[10px]">15</div>
              <div className="border-b border-slate-500 text-[10px]">12</div>
              <div className="border-b border-slate-500 text-[10px]">9</div>
              <div className="border-b border-slate-500 text-[10px]">6</div>
              <div className="border-b border-slate-500 text-[10px]">3</div>
            </div>

            {data.map(item => (
              <div key={item.id} className="flex flex-col items-center gap-2 w-16 sm:w-20 z-10">
                <span className="text-xs font-black font-mono text-purple-950"><BopomofoText text={`${item.votes} 票`} showBpmf={bopomofoEnabled ?? false} /></span>
                <div
                  className={`w-full rounded-t-2xl ${item.color} transition-all duration-500 shadow-md flex items-end justify-center pb-2`}
                  style={{ height: `${(item.votes / 15) * 180}px` }}
                >
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <span className="text-xs font-black text-slate-700">
                  <BopomofoText text={item.name} showBpmf={bopomofoEnabled ?? false} />
                </span>
              </div>
            ))}
          </div>

          {/* 結論分析牌 */}
          <div className="mt-5 p-3.5 bg-indigo-50 rounded-2xl border-2 border-indigo-200 text-center">
            <div className="text-sm sm:text-base font-black text-indigo-950 flex items-center justify-center gap-2">
              <Sparkles className="text-indigo-600 w-4 h-4" />
              <BopomofoText
                text={`最受歡迎：${maxVoteItem.name}（${maxVoteItem.votes}票）；最少票：${minVoteItem.name}（${minVoteItem.votes}票），兩者相差 ${
                  maxVoteItem.votes - minVoteItem.votes
                } 票！`}
                showBpmf={bopomofoEnabled}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
