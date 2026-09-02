import React, { useState } from 'react';
import { X, Plus, Trash2, UserCheck, Sparkles, Star, BookOpen, Cloud, Download, Upload, Check, Zap, RefreshCw } from 'lucide-react';
import { StudentProfile, AccountData, Grade } from '../types';
import { BopomofoText } from './BopomofoText';
import { storageService } from '../services/storage';
import { r2StorageService, R2Config } from '../services/r2Storage';
import { soundFx } from '../services/audio';

interface StudentSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  bopomofoEnabled: boolean;
  onStudentChanged: () => void;
}

const AVATAR_OPTIONS = ['👦', '👧', '🧒', '🐰', '🦊', '🦁', '🐼', '🚀', '🦄', '🦖', '🐱', '🐶'];

export const StudentSwitcherModal: React.FC<StudentSwitcherModalProps> = ({
  isOpen,
  onClose,
  bopomofoEnabled,
  onStudentChanged
}) => {
  const [account, setAccount] = useState<AccountData>(() => storageService.getAccountData());
  const [r2Config, setR2Config] = useState<R2Config>(() => r2StorageService.getConfig());
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('👦');
  const [newGrade, setNewGrade] = useState<Grade>(1);
  const [backupText, setBackupText] = useState('');
  const [showBackupArea, setShowBackupArea] = useState(false);
  const [showR2Config, setShowR2Config] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [r2Syncing, setR2Syncing] = useState(false);
  const [r2Msg, setR2Msg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectStudent = (studentId: string) => {
    soundFx.playPop();
    storageService.setActiveStudentId(studentId);
    setAccount(storageService.getAccountData());
    onStudentChanged();
    onClose();
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    soundFx.playCorrect();
    storageService.addStudent(newName, newAvatar, newGrade);
    setAccount(storageService.getAccountData());
    setIsAdding(false);
    setNewName('');
    onStudentChanged();
  };

  const handleDeleteStudent = (e: React.MouseEvent, studentId: string) => {
    e.stopPropagation();
    if (confirm('確定要刪除這位學生的學習記錄嗎？')) {
      soundFx.playPop();
      storageService.deleteStudent(studentId);
      setAccount(storageService.getAccountData());
      onStudentChanged();
    }
  };

  const handleExportBackup = () => {
    soundFx.playPop();
    const json = storageService.exportBackup();
    navigator.clipboard.writeText(json);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSyncToR2 = async () => {
    soundFx.playPop();
    setR2Syncing(true);
    setR2Msg('正在即時同步至 Cloudflare R2 雲端儲存...');
    const result = await r2StorageService.uploadToR2(account);
    setR2Syncing(false);
    setR2Msg(result.message);
    if (result.success) {
      soundFx.playCorrect();
    }
    setTimeout(() => setR2Msg(null), 3000);
  };

  const handleFetchFromR2 = async () => {
    soundFx.playPop();
    setR2Syncing(true);
    setR2Msg('正在從 Cloudflare R2 載入最新班級進度...');
    const result = await r2StorageService.fetchFromR2();
    setR2Syncing(false);
    if (result.success && result.data) {
      soundFx.playCorrect();
      storageService.saveAccountData(result.data);
      setAccount(result.data);
      onStudentChanged();
      setR2Msg('🎉 成功從 Cloudflare R2 載入全班最新進度！');
    } else {
      soundFx.playWrong();
      setR2Msg(result.message);
    }
    setTimeout(() => setR2Msg(null), 3000);
  };

  const handleSaveR2Config = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playCorrect();
    r2StorageService.saveConfig(r2Config);
    setShowR2Config(false);
    alert('⚡ Cloudflare R2 雲端儲存設定已更新！');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border-4 border-amber-300 shadow-2xl max-w-2xl w-full p-6 sm:p-8 flex flex-col max-h-[90vh] overflow-y-auto animate-scale-up">
        {/* 頂部標題與關閉按鈕 */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-slate-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏫</span>
            <div>
              <h3 className="text-2xl font-black text-slate-900">
                <BopomofoText text="學生切換大廳與班級管理" showBpmf={bopomofoEnabled} />
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                {account.teacherName} • 共 {account.students.length} 位學生
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

        {/* 學生卡片清單 */}
        <div className="my-6 flex flex-col gap-3">
          <div className="text-sm font-black text-slate-700 flex items-center justify-between">
            <span>選擇當前上課學生：</span>
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black shadow transition"
            >
              <Plus size={16} />
              <span>新增學生</span>
            </button>
          </div>

          {/* 新增學生表單 */}
          {isAdding && (
            <form onSubmit={handleAddStudent} className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 flex flex-col gap-3 animate-slide-down">
              <div className="font-black text-sm text-amber-950">➕ 新增學生檔案：</div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="輸入學生姓名或暱稱（例如：小華）"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl border border-amber-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                  autoFocus
                />
                <select
                  value={newGrade}
                  onChange={e => setNewGrade(Number(e.target.value) as Grade)}
                  className="px-3 py-2 rounded-xl border border-amber-300 text-sm font-bold bg-white"
                >
                  <option value={1}>一年級</option>
                  <option value={2}>二年級</option>
                </select>
              </div>

              {/* 頭像選擇 */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-amber-900">挑選頭像：</span>
                {AVATAR_OPTIONS.map(av => (
                  <button
                    type="button"
                    key={av}
                    onClick={() => setNewAvatar(av)}
                    className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center transition ${
                      newAvatar === av ? 'bg-amber-500 scale-110 shadow-md ring-2 ring-white' : 'bg-white hover:bg-amber-100'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-black bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow"
                >
                  確認建立
                </button>
              </div>
            </form>
          )}

          {/* 學生卡片列表 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {account.students.map(student => {
              const isActive = account.activeStudentId === student.id;
              return (
                <div
                  key={student.id}
                  onClick={() => handleSelectStudent(student.id)}
                  className={`p-4 rounded-2xl border-3 cursor-pointer transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-amber-500 text-white border-amber-600 shadow-lg scale-102 ring-4 ring-amber-200'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-4xl p-2 bg-white/30 rounded-2xl backdrop-blur-sm shadow-inner">
                      {student.avatar}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-lg">{student.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                          isActive ? 'bg-white text-amber-900' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {student.grade} 年級
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold mt-1 opacity-90">
                        <span className="flex items-center gap-1">
                          <Star size={13} className={isActive ? 'text-amber-200 fill-amber-200' : 'text-amber-500 fill-amber-500'} />
                          {student.totalStars} 顆星
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={13} />
                          {student.completedUnits.length} 單元通關
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {isActive ? (
                      <span className="px-2.5 py-1 bg-white text-amber-700 text-xs font-black rounded-xl shadow-sm">
                        上課中
                      </span>
                    ) : (
                      <button
                        onClick={e => handleDeleteStudent(e, student.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 transition"
                        title="刪除學生檔案"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ⚡ Cloudflare R2 全自動無感即時雲端儲存面板 */}
        <div className="pt-4 border-t-2 border-slate-100 flex flex-col gap-3">
          <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 p-4 rounded-2xl border-2 border-orange-300 flex flex-col gap-3 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded-full bg-orange-500 animate-ping"></span>
                <div>
                  <div className="flex items-center gap-1.5 font-black text-sm text-orange-950">
                    <Zap size={18} className="text-orange-600 fill-orange-500" />
                    <span>⚡ Cloudflare R2 雲端儲存：全自動即時同步中</span>
                  </div>
                  <div className="text-[11px] text-orange-800 font-bold">
                    班級檔案：<code className="bg-white/80 px-1.5 py-0.5 rounded border border-orange-300 font-mono text-orange-950 font-black">{r2Config.classroomKey}</code> • 每次答題自動寫入 R2 雲端
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center flex-wrap">
                <button
                  onClick={handleSyncToR2}
                  disabled={r2Syncing}
                  className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black shadow transition disabled:opacity-50"
                  title="立即將全班最新資料上傳至 Cloudflare R2"
                >
                  <RefreshCw size={13} className={r2Syncing ? 'animate-spin' : ''} />
                  <span>立即推送到 R2</span>
                </button>
                <button
                  onClick={handleFetchFromR2}
                  disabled={r2Syncing}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-orange-100 text-orange-900 border border-orange-300 rounded-xl text-xs font-black shadow-sm transition disabled:opacity-50"
                  title="從 Cloudflare R2 載入最新班級進度"
                >
                  <Download size={13} />
                  <span>從 R2 載入</span>
                </button>
                <button
                  onClick={() => setShowR2Config(!showR2Config)}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                  title="設定 Cloudflare R2 連線參數"
                >
                  ⚙️ 設定
                </button>
              </div>
            </div>

            {/* 即時反饋訊息 */}
            {r2Msg && (
              <div className="p-2 rounded-xl bg-white/90 border border-orange-300 text-xs font-black text-orange-950 animate-bounce-short text-center">
                {r2Msg}
              </div>
            )}

            {/* Cloudflare R2 連線設定表單 */}
            {showR2Config && (
              <form onSubmit={handleSaveR2Config} className="p-3.5 bg-white rounded-xl border border-orange-300 flex flex-col gap-2.5 text-xs animate-slide-down">
                <div className="font-black text-orange-950 flex items-center justify-between">
                  <span>⚙️ Cloudflare R2 / Worker 連線設定：</span>
                  <span className="text-[10px] text-slate-500 font-normal">免伺服器 · 零流量費 · 全球加速</span>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-slate-600 font-bold">Cloudflare Worker URL / 端點網址：</label>
                  <input
                    type="text"
                    placeholder="例如: https://math-sync.your-name.workers.dev"
                    value={r2Config.workerUrl}
                    onChange={e => setR2Config({ ...r2Config, workerUrl: e.target.value })}
                    className="p-2 border rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-orange-400 bg-slate-50"
                  />
                  <span className="text-[10px] text-slate-400">（專案內已附贈一鍵部署腳本 cloudflare-r2-worker.js，貼上 Worker 網址即可）</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-600 font-bold">班級代碼 (Classroom Key)：</label>
                    <input
                      type="text"
                      value={r2Config.classroomKey}
                      onChange={e => setR2Config({ ...r2Config, classroomKey: e.target.value })}
                      className="p-2 border rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-orange-400 bg-slate-50"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-600 font-bold">同步金鑰 (Access Key)：</label>
                    <input
                      type="password"
                      value={r2Config.accessKey}
                      onChange={e => setR2Config({ ...r2Config, accessKey: e.target.value })}
                      className="p-2 border rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-orange-400 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setShowR2Config(false)}
                    className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-lg font-bold"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-black shadow"
                  >
                    儲存 R2 設定
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
