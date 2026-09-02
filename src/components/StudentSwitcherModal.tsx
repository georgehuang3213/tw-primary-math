import React, { useState } from 'react';
import { X, Plus, Trash2, UserCheck, Sparkles, Star, BookOpen, Cloud, Download, Upload, Check } from 'lucide-react';
import { StudentProfile, AccountData, Grade } from '../types';
import { BopomofoText } from './BopomofoText';
import { storageService } from '../services/storage';
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
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('👦');
  const [newGrade, setNewGrade] = useState<Grade>(1);
  const [backupText, setBackupText] = useState('');
  const [showBackupArea, setShowBackupArea] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleImportBackup = () => {
    if (!backupText.trim()) return;
    const success = storageService.importBackup(backupText);
    if (success) {
      soundFx.playCorrect();
      setAccount(storageService.getAccountData());
      setShowBackupArea(false);
      setBackupText('');
      onStudentChanged();
      alert('🎉 雲端備份資料還原成功！');
    } else {
      soundFx.playWrong();
      alert('⚠️ 備份資料格式不正確，請確認後重試！');
    }
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

        {/* 雲端資料庫備份與還原列 */}
        <div className="pt-4 border-t-2 border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <Cloud size={16} className="text-sky-500" />
              <span>雲端資料庫儲存狀態：正常已同步</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleExportBackup}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition"
              >
                {copySuccess ? <Check size={14} className="text-emerald-600" /> : <Download size={14} />}
                <span>{copySuccess ? '已複製備份！' : '一鍵匯出雲端備份'}</span>
              </button>
              <button
                onClick={() => setShowBackupArea(!showBackupArea)}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition"
              >
                <Upload size={14} />
                <span>匯入還原</span>
              </button>
            </div>
          </div>

          {showBackupArea && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2 animate-slide-down">
              <textarea
                placeholder="貼上備份 JSON 資料字串..."
                value={backupText}
                onChange={e => setBackupText(e.target.value)}
                rows={3}
                className="w-full p-2 text-xs font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
              />
              <button
                onClick={handleImportBackup}
                className="self-end px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-xs font-black shadow"
              >
                確認還原
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
