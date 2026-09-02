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

export const BarChartLab: React.FC<BarChartLabProps> = ({ bopomofoEnabled = true }) => {
  const [data, setData] = useState<FruitVote[]>([
    { id: 'strawberry', name: '草莓', icon: '🍓', votes: 8, color: 'bg-rose-500' },
    { id: 'watermelon', name: '西瓜', icon: '🍉', votes: 5, color: 'bg-emerald-500' },
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
          const nextVal = Math.max(0, Math.min(10, item.votes + delta));
          return { ...item, votes: nextVal };
        }
        return item;
      })
    );
  };

  const handleSpeak = () => {
    soundFx.playCorrect();
    const diff = maxVoteItem.votes - minVoteItem.votes;
    const text = `全班共投了 ${totalVotes} 票。最受歡迎的是【${maxVoteItem.name}】有 ${maxVoteItem.votes} 票；最少的是【${minVoteItem.name}】有 ${minVoteItem.votes} 票，相差 ${diff} 票！`;
    speechService.speak(text);
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-purple-50 to-pink-50 rounded-3xl border-4 border-purple-300 shadow-lg">
      {/* 頂部功能列 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-2xl border-2 border-purple-200 shadow-sm">
        <div className="flex items-center gap-2 text-purple-950 font-black text-base">
          <BarChart3 size={22} className="text-purple-600" />
          <BopomofoText text="資料整理與長條圖統計實驗室" showBpmf={bopomofoEnabled} />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-black border border-purple-300 transition"
          >
            <Volume2 size={16} />
            <BopomofoText text="語音分析圖表" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setData([
                { id: 'strawberry', name: '草莓', icon: '🍓', votes: 8, color: 'bg-rose-500' },
                { id: 'watermelon', name: '西瓜', icon: '🍉', votes: 5, color: 'bg-emerald-500' },
                { id: 'mango', name: '芒果', icon: '🥭', votes: 7, color: 'bg-amber-500' },
                { id: 'banana', name: '香蕉', icon: '🍌', votes: 4, color: 'bg-yellow-400' },
              ]);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
            title="重設"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* 票數調整按鈕組 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {data.map(item => (
          <div key={item.id} className="bg-white p-3 rounded-2xl border-2 border-purple-100 shadow-sm flex items-center justify-between">
            <span className="text-sm font-black flex items-center gap-1">
              <span>{item.icon}</span>
              <BopomofoText text={item.name} showBpmf={false} />
            </span>
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => handleAdjustVote(item.id, -1)}
                className="w-6 h-6 bg-white text-rose-600 rounded font-black shadow-sm"
              >
                -
              </button>
              <span className="w-5 text-center font-black text-xs font-mono">{item.votes}</span>
              <button
                onClick={() => handleAdjustVote(item.id, 1)}
                className="w-6 h-6 bg-white text-emerald-600 rounded font-black shadow-sm"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 長條圖視覺展示區 */}
      <div className="bg-white rounded-3xl p-6 border-3 border-purple-300 shadow-sm flex flex-col">
        <div className="text-xs font-black text-slate-500 mb-4">
          📊 長條圖（直軸為票數 0 ~ 10，橫軸為水果類別）：
        </div>

        {/* 柱狀圖 */}
        <div className="h-56 flex items-end justify-around gap-2 border-b-4 border-slate-700 pb-2 relative">
          {/* 背景格線 */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-slate-500 text-[10px]">10</div>
            <div className="border-b border-slate-500 text-[10px]">8</div>
            <div className="border-b border-slate-500 text-[10px]">6</div>
            <div className="border-b border-slate-500 text-[10px]">4</div>
            <div className="border-b border-slate-500 text-[10px]">2</div>
          </div>

          {data.map(item => (
            <div key={item.id} className="flex flex-col items-center gap-2 w-16 sm:w-20 z-10">
              <span className="text-xs font-black font-mono text-purple-950">{item.votes} 票</span>
              <div
                className={`w-full rounded-t-2xl ${item.color} transition-all duration-500 shadow-md flex items-end justify-center pb-2`}
                style={{ height: `${(item.votes / 10) * 180}px` }}
              >
                <span className="text-2xl">{item.icon}</span>
              </div>
              <span className="text-xs font-black text-slate-700">
                <BopomofoText text={item.name} showBpmf={false} />
              </span>
            </div>
          ))}
        </div>

        {/* 結論分析牌 */}
        <div className="mt-5 p-3.5 bg-purple-50 rounded-2xl border-2 border-purple-200 text-center">
          <div className="text-sm sm:text-base font-black text-purple-950 flex items-center justify-center gap-2">
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
    </div>
  );
};
