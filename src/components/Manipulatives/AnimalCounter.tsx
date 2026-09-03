import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { BopomofoText } from '../BopomofoText';
import { soundFx } from '../../services/audio';
import { speechService } from '../../services/speech';

interface AnimalCounterProps {
  bopomofoEnabled?: boolean;
}

const ANIMAL_AVATARS = [
  { name: '獅子隊長', icon: '🦁', sound: '吼～我是獅子隊長！' },
  { name: '小白兔', icon: '🐰', sound: '蹦蹦跳的小白兔！' },
  { name: '小棕熊', icon: '🐻', sound: '愛吃蜜的小棕熊！' },
  { name: '大熊貓', icon: '🐼', sound: '圓滾滾的大熊貓！' },
  { name: '小狐狸', icon: '🦊', sound: '聰明的小狐狸！' },
  { name: '小猴子', icon: '🐵', sound: '愛爬樹的小猴子！' },
  { name: '小青蛙', icon: '🐸', sound: '呱呱叫的小青蛙！' },
  { name: '小黃雞', icon: '🐥', sound: '吱吱叫的小黃雞！' },
  { name: '小綠鴨', icon: '🦆', sound: '游泳的小綠鴨！' },
  { name: '小柴犬', icon: '🐶', sound: '忠實的小柴犬！' },
];

export const AnimalCounter: React.FC<AnimalCounterProps> = ({ bopomofoEnabled = true }) => {
  const [animalCount, setAnimalCount] = useState<number>(6);
  const [carrotCount, setCarrotCount] = useState<number>(6);
  const [activeTab, setActiveTab] = useState<'count' | 'compare'>('count');
  const [showLine, setShowLine] = useState<boolean>(true);
  const [selectedAnimalIndex, setSelectedAnimalIndex] = useState<number | null>(null);

  const handleAddAnimal = () => {
    if (animalCount < 10) {
      soundFx.playPop();
      setAnimalCount(prev => prev + 1);
    }
  };

  const handleRemoveAnimal = () => {
    if (animalCount > 0) {
      soundFx.playPop();
      setAnimalCount(prev => prev - 1);
    }
  };

  const handleAddCarrot = () => {
    if (carrotCount < 10) {
      soundFx.playPop();
      setCarrotCount(prev => prev + 1);
    }
  };

  const handleRemoveCarrot = () => {
    if (carrotCount > 0) {
      soundFx.playPop();
      setCarrotCount(prev => prev - 1);
    }
  };

  const handleReadCount = () => {
    soundFx.playCorrect();
    const text = `草地上一共有 ${animalCount} 隻小動物！`;
    speechService.speak(text);
  };

  const handleAnimalClick = (index: number) => {
    soundFx.playPop();
    setSelectedAnimalIndex(index);
    const animal = ANIMAL_AVATARS[index];
    const speechText = `第 ${index + 1} 個是 ${animal.name}！`;
    speechService.speak(speechText);
  };

  return (
    <div className="flex flex-col gap-5 p-4 sm:p-6 bg-gradient-to-b from-amber-50 to-emerald-50 rounded-3xl border-4 border-emerald-300 shadow-lg">
      {/* 頂部模式切換按鈕 */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2.5 rounded-2xl border-2 border-emerald-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('count');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-black transition flex items-center gap-1.5 ${
              activeTab === 'count'
                ? 'bg-emerald-500 text-white shadow-md scale-105'
                : 'text-slate-700 hover:bg-emerald-100'
            }`}
          >
            <span>🦁</span>
            <BopomofoText text="草地動物點點名" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setActiveTab('compare');
            }}
            className={`px-4 py-2 rounded-xl text-sm font-black transition flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-amber-500 text-amber-950 shadow-md scale-105'
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            <span>⚖️</span>
            <BopomofoText text="兔子與蘿蔔比多少" showBpmf={bopomofoEnabled} />
          </button>
        </div>

        {/* 語音朗讀與重設按鈕 */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReadCount}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-black border border-emerald-300 transition"
          >
            <Volume2 size={16} />
            <BopomofoText text="獅子隊長點名" showBpmf={bopomofoEnabled} />
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              setAnimalCount(6);
              setCarrotCount(6);
              setSelectedAnimalIndex(null);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* ================= 模式一：草地動物點點名 ================= */}
      {activeTab === 'count' && (
        <div className="flex flex-col gap-4">
          {/* 數量大看板 */}
          <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border-2 border-emerald-300 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌿</span>
              <div>
                <span className="text-xs font-black text-emerald-800">
                  <BopomofoText text="草地上小動物總數" showBpmf={bopomofoEnabled} />
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-950 flex items-center gap-2">
                  <span>{animalCount}</span>
                  <span className="text-sm font-bold text-slate-600">
                    <BopomofoText text="隻小動物" showBpmf={bopomofoEnabled} />
                  </span>
                </div>
              </div>
            </div>

            {/* 增減按鈕 */}
            <div className="flex items-center gap-2 bg-emerald-100 p-1.5 rounded-2xl border border-emerald-300">
              <button
                onClick={handleRemoveAnimal}
                disabled={animalCount <= 0}
                className="w-10 h-10 rounded-xl bg-white hover:bg-rose-50 text-rose-600 font-black text-xl flex items-center justify-center shadow-sm disabled:opacity-40 transition"
              >
                <Minus size={20} />
              </button>
              <span className="w-8 text-center font-black text-xl text-emerald-950 font-mono">
                {animalCount}
              </span>
              <button
                onClick={handleAddAnimal}
                disabled={animalCount >= 10}
                className="w-10 h-10 rounded-xl bg-white hover:bg-emerald-50 text-emerald-600 font-black text-xl flex items-center justify-center shadow-sm disabled:opacity-40 transition"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* 綠油油草地舞台 */}
          <div className="bg-gradient-to-b from-emerald-400 to-green-500 rounded-3xl p-6 sm:p-8 border-4 border-emerald-600 shadow-inner min-h-[220px] flex flex-col justify-between relative overflow-hidden">
            {/* 草原裝飾小花 */}
            <div className="absolute top-2 left-4 text-xl opacity-60">🌼</div>
            <div className="absolute top-4 right-8 text-xl opacity-60">🌸</div>
            <div className="absolute bottom-2 left-1/3 text-xl opacity-60">🍀</div>

            <div className="flex items-center justify-between text-white/90 text-xs font-black mb-3">
              <span className="flex items-center gap-1">
                <span>🚩</span>
                <BopomofoText text="從前往後排隊順序（點擊動物聽牠的名字）：" showBpmf={bopomofoEnabled} />
              </span>
              <span>1 ~ 10 <BopomofoText text="格" showBpmf={bopomofoEnabled ?? false} /></span>
            </div>

            {/* 10格動物站立區 */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 sm:gap-2.5 z-10">
              {Array.from({ length: 10 }).map((_, i) => {
                const hasAnimal = i < animalCount;
                const animal = ANIMAL_AVATARS[i];
                const isSelected = selectedAnimalIndex === i;

                return (
                  <div
                    key={i}
                    onClick={() => hasAnimal && handleAnimalClick(i)}
                    className={`h-20 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-between p-1.5 transition-all select-none ${
                      hasAnimal
                        ? `bg-white/95 border-amber-300 shadow-md cursor-pointer hover:scale-110 active:scale-95 ${
                            isSelected ? 'ring-4 ring-amber-400 scale-105 bg-amber-50' : ''
                          }`
                        : 'bg-black/10 border-white/20 border-dashed justify-center'
                    }`}
                  >
                    {hasAnimal ? (
                      <>
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {i + 1}
                        </span>
                        <span className="text-3xl sm:text-4xl animate-bounce" style={{ animationDuration: `${1.5 + (i % 3) * 0.3}s` }}>
                          {animal.icon}
                        </span>
                        <span className="text-[10px] font-bold text-slate-700 truncate max-w-full">
                          <BopomofoText text={animal.name} showBpmf={bopomofoEnabled ?? false} />
                        </span>
                      </>
                    ) : (
                      <span className="text-white/40 text-xs font-black font-mono">{i + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 底部提示小語 */}
            <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-black text-emerald-950 flex items-center justify-between flex-wrap gap-2 shadow-sm">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <BopomofoText
                  text={
                    selectedAnimalIndex !== null
                      ? `你點選了排在第 ${selectedAnimalIndex + 1} 個的【${ANIMAL_AVATARS[selectedAnimalIndex].name}】！`
                      : `草地上一共有 ${animalCount} 隻動物排排隊！`
                  }
                  showBpmf={bopomofoEnabled}
                />
              </span>
              <span className="text-slate-500 text-xs flex items-center gap-1">
                {animalCount === 10 ? (
                  <span>🎉 10<BopomofoText text="格全部站滿了！" showBpmf={bopomofoEnabled ?? false} /></span>
                ) : (
                  <span><BopomofoText text="還能再加入 " showBpmf={bopomofoEnabled ?? false} />{10 - animalCount}<BopomofoText text=" 隻小動物" showBpmf={bopomofoEnabled ?? false} /></span>
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================= 模式二：兔子與蘿蔔一一對應比多少 ================= */}
      {activeTab === 'compare' && (
        <div className="flex flex-col gap-4">
          {/* 上下兩排控制面板 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 兔子數量控制 */}
            <div className="bg-white p-4 rounded-2xl border-2 border-rose-300 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🐰</span>
                <div>
                  <span className="text-xs font-black text-rose-800">
                    <BopomofoText text="小白兔數量" showBpmf={bopomofoEnabled} />
                  </span>
                  <div className="text-xl font-black text-rose-950 font-mono">
                    <span>{animalCount} <BopomofoText text="隻" showBpmf={bopomofoEnabled ?? false} /></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-rose-50 p-1 rounded-xl border border-rose-200">
                <button
                  onClick={handleRemoveAnimal}
                  disabled={animalCount <= 0}
                  className="w-8 h-8 rounded-lg bg-white text-rose-600 font-black shadow-sm disabled:opacity-40"
                >
                  -
                </button>
                <span className="w-6 text-center font-black">{animalCount}</span>
                <button
                  onClick={handleAddAnimal}
                  disabled={animalCount >= 10}
                  className="w-8 h-8 rounded-lg bg-white text-rose-600 font-black shadow-sm disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>

            {/* 蘿蔔數量控制 */}
            <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🥕</span>
                <div>
                  <span className="text-xs font-black text-amber-800">
                    <BopomofoText text="紅蘿蔔數量" showBpmf={bopomofoEnabled} />
                  </span>
                  <div className="text-xl font-black text-amber-950 font-mono">
                    <span>{carrotCount} <BopomofoText text="根" showBpmf={bopomofoEnabled ?? false} /></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
                <button
                  onClick={handleRemoveCarrot}
                  disabled={carrotCount <= 0}
                  className="w-8 h-8 rounded-lg bg-white text-amber-600 font-black shadow-sm disabled:opacity-40"
                >
                  -
                </button>
                <span className="w-6 text-center font-black">{carrotCount}</span>
                <button
                  onClick={handleAddCarrot}
                  disabled={carrotCount >= 10}
                  className="w-8 h-8 rounded-lg bg-white text-amber-600 font-black shadow-sm disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 一對一連線比較舞台 */}
          <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-md flex flex-col gap-6">
            {/* 上排：兔子排隊 */}
            <div>
              <div className="text-xs font-black text-rose-800 mb-2 flex items-center gap-1">
                <span>🐰</span>
                <BopomofoText text="小白兔隊伍：" showBpmf={bopomofoEnabled} />
              </div>
              <div className="flex items-center gap-2 flex-wrap min-h-[50px] p-2 bg-rose-50/60 rounded-2xl border-2 border-rose-200 border-dashed">
                {animalCount === 0 ? (
                  <span className="text-xs text-slate-400 font-bold p-2">
                    <BopomofoText text="沒有小白兔" showBpmf={bopomofoEnabled ?? false} />
                  </span>
                ) : (
                  Array.from({ length: animalCount }).map((_, i) => (
                    <div
                      key={i}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border-2 border-rose-300 shadow-sm flex flex-col items-center justify-center text-2xl"
                    >
                      🐰
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 一一對應結論指示牌 */}
            <div className="bg-gradient-to-r from-amber-100 via-emerald-100 to-amber-100 p-3.5 rounded-2xl border-2 border-emerald-300 text-center">
              <div className="text-base sm:text-lg font-black text-emerald-950 flex items-center justify-center gap-2">
                <CheckCircle2 className="text-emerald-600" />
                <BopomofoText
                  text={
                    animalCount === carrotCount
                      ? `小白兔有 ${animalCount} 隻，紅蘿蔔有 ${carrotCount} 根，兩邊剛好一樣多！`
                      : animalCount > carrotCount
                      ? `小白兔有 ${animalCount} 隻，比紅蘿蔔多 ${animalCount - carrotCount} 隻！`
                      : `紅蘿蔔有 ${carrotCount} 根，比小白兔多 ${carrotCount - animalCount} 根！`
                  }
                  showBpmf={bopomofoEnabled}
                />
              </div>
            </div>

            {/* 下排：蘿蔔排隊 */}
            <div>
              <div className="text-xs font-black text-amber-800 mb-2 flex items-center gap-1">
                <span>🥕</span>
                <BopomofoText text="紅蘿蔔隊伍：" showBpmf={bopomofoEnabled} />
              </div>
              <div className="flex items-center gap-2 flex-wrap min-h-[50px] p-2 bg-amber-50/60 rounded-2xl border-2 border-amber-200 border-dashed">
                {carrotCount === 0 ? (
                  <span className="text-xs text-slate-400 font-bold p-2">
                    <BopomofoText text="沒有紅蘿蔔" showBpmf={bopomofoEnabled ?? false} />
                  </span>
                ) : (
                  Array.from({ length: carrotCount }).map((_, i) => (
                    <div
                      key={i}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border-2 border-amber-300 shadow-sm flex flex-col items-center justify-center text-2xl"
                    >
                      🥕
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
