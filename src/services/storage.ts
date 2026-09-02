import { AccountData, StudentProfile, Grade } from '../types';
import { cloudSyncService } from './cloudSync';
import { r2StorageService } from './r2Storage';

const STORAGE_KEY = 'tw_primary_math_account_v2';

const DEFAULT_STUDENTS: StudentProfile[] = [
  {
    id: 'student-1',
    name: '小明',
    avatar: '👦',
    grade: 1,
    totalStars: 0,
    completedUnits: [],
    unitStars: {},
    mistakes: [],
    lastActiveAt: Date.now()
  },
  {
    id: 'student-2',
    name: '小美',
    avatar: '👧',
    grade: 1,
    totalStars: 0,
    completedUnits: [],
    unitStars: {},
    mistakes: [],
    lastActiveAt: Date.now()
  }
];

const DEFAULT_ACCOUNT: AccountData = {
  teacherName: '一年級與二年級數學導師',
  teacherEmail: 'teacher@hanlin.edu.tw',
  activeStudentId: 'student-1',
  students: DEFAULT_STUDENTS,
  lastCloudSyncAt: Date.now()
};

const ACCOUNT_SESSION_KEY = 'tw_primary_math_current_session';

export const storageService = {
  getCurrentAccountName(): string | null {
    return localStorage.getItem(ACCOUNT_SESSION_KEY);
  },

  loginAccount(accountName: string): AccountData {
    const trimmed = accountName.trim() || '一年級與二年級數學導師';
    localStorage.setItem(ACCOUNT_SESSION_KEY, trimmed);

    const accountStorageKey = `tw_primary_math_acc_${trimmed}`;
    const saved = localStorage.getItem(accountStorageKey);
    if (saved) {
      try {
        const parsed: AccountData = JSON.parse(saved);
        if (parsed.students && parsed.students.length > 0) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }

    const newAccount: AccountData = {
      teacherName: trimmed,
      teacherEmail: `${trimmed}@math.tw`,
      activeStudentId: 'student-1',
      students: DEFAULT_STUDENTS,
      lastCloudSyncAt: Date.now()
    };
    this.saveAccountData(newAccount);
    return newAccount;
  },

  logoutAccount(): void {
    localStorage.removeItem(ACCOUNT_SESSION_KEY);
  },

  getAccountData(): AccountData {
    try {
      const currentName = this.getCurrentAccountName() || '預設班級';
      const accountStorageKey = `tw_primary_math_acc_${currentName}`;
      const data = localStorage.getItem(accountStorageKey) || localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return this.loginAccount(currentName);
      }
      const parsed: AccountData = JSON.parse(data);
      if (!parsed.students || parsed.students.length === 0) {
        parsed.students = DEFAULT_STUDENTS;
        parsed.activeStudentId = 'student-1';
      }
      return parsed;
    } catch (e) {
      console.error('Failed to read account data from localStorage', e);
      return DEFAULT_ACCOUNT;
    }
  },

  // 多人同時上線智慧合併演算法（防止多台平板同時答題時互相覆蓋）
  mergeAccountData(local: AccountData, remote: AccountData): AccountData {
    const mergedStudentsMap = new Map<string, StudentProfile>();

    // 1. 先加入遠端學生資料
    (remote.students || []).forEach(rs => {
      mergedStudentsMap.set(rs.id, { ...rs });
    });

    // 2. 智慧合併本地學生資料（保留最佳星級、合併已完成單元、合併錯題）
    (local.students || []).forEach(ls => {
      if (!mergedStudentsMap.has(ls.id)) {
        mergedStudentsMap.set(ls.id, { ...ls });
      } else {
        const rs = mergedStudentsMap.get(ls.id)!;
        // 合併已完成單元 (Set union)
        const completedSet = new Set([...(ls.completedUnits || []), ...(rs.completedUnits || [])]);
        
        // 合併星級 (取最高星級)
        const allUnitKeys = new Set([...Object.keys(ls.unitStars || {}), ...Object.keys(rs.unitStars || {})]);
        const mergedUnitStars: Record<string, number> = {};
        allUnitKeys.forEach(uk => {
          mergedUnitStars[uk] = Math.max(ls.unitStars?.[uk] || 0, rs.unitStars?.[uk] || 0);
        });

        // 重新計算總星數
        const totalStars = Object.values(mergedUnitStars).reduce((sum, s) => sum + s, 0);

        // 合併錯題本 (以 questionId 去重)
        const mistakeMap = new Map<string, { questionId: string; unitId: string; timestamp: number }>();
        [...(rs.mistakes || []), ...(ls.mistakes || [])].forEach(m => {
          mistakeMap.set(m.questionId, m);
        });

        mergedStudentsMap.set(ls.id, {
          ...rs,
          name: ls.name || rs.name,
          avatar: ls.avatar || rs.avatar,
          grade: ls.grade || rs.grade,
          completedUnits: Array.from(completedSet),
          unitStars: mergedUnitStars,
          totalStars,
          mistakes: Array.from(mistakeMap.values()),
          lastActiveAt: Math.max(ls.lastActiveAt || 0, rs.lastActiveAt || 0)
        });
      }
    });

    return {
      teacherName: local.teacherName || remote.teacherName,
      teacherEmail: local.teacherEmail || remote.teacherEmail,
      activeStudentId: local.activeStudentId || remote.activeStudentId,
      students: Array.from(mergedStudentsMap.values()),
      lastCloudSyncAt: Date.now()
    };
  },

  saveAccountData(account: AccountData): void {
    try {
      const currentName = this.getCurrentAccountName() || account.teacherName || '預設班級';
      const accountStorageKey = `tw_primary_math_acc_${currentName}`;
      account.lastCloudSyncAt = Date.now();
      localStorage.setItem(accountStorageKey, JSON.stringify(account));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
      // 全自動無感即時推送到 Cloudflare R2 雲端儲存
      r2StorageService.uploadToR2(account).catch(err => {
        console.error('Auto Cloudflare R2 sync error', err);
      });
      cloudSyncService.pushToCloud(account).catch(err => {
        console.error('Auto cloud sync background error', err);
      });
    } catch (e) {
      console.error('Failed to save account data to localStorage', e);
    }
  },

  getActiveStudent(): StudentProfile {
    const account = this.getAccountData();
    const active = account.students.find(s => s.id === account.activeStudentId);
    return active || account.students[0] || DEFAULT_STUDENTS[0];
  },

  setActiveStudentId(studentId: string): AccountData {
    const account = this.getAccountData();
    account.activeStudentId = studentId;
    const student = account.students.find(s => s.id === studentId);
    if (student) {
      student.lastActiveAt = Date.now();
    }
    this.saveAccountData(account);
    return account;
  },

  addStudent(name: string, avatar: string, grade: Grade = 1): StudentProfile {
    const account = this.getAccountData();
    const newStudent: StudentProfile = {
      id: `student-${Date.now()}`,
      name: name.trim() || `學生 ${account.students.length + 1}`,
      avatar: avatar || '🧒',
      grade,
      totalStars: 0,
      completedUnits: [],
      unitStars: {},
      mistakes: [],
      lastActiveAt: Date.now()
    };
    account.students.push(newStudent);
    account.activeStudentId = newStudent.id;
    this.saveAccountData(account);
    return newStudent;
  },

  updateStudent(studentId: string, updates: Partial<StudentProfile>): void {
    const account = this.getAccountData();
    account.students = account.students.map(s => {
      if (s.id === studentId) {
        return { ...s, ...updates, lastActiveAt: Date.now() };
      }
      return s;
    });
    this.saveAccountData(account);
  },

  deleteStudent(studentId: string): void {
    const account = this.getAccountData();
    if (account.students.length <= 1) {
      alert('請至少保留一位學生的個人檔案！');
      return;
    }
    account.students = account.students.filter(s => s.id !== studentId);
    if (account.activeStudentId === studentId) {
      account.activeStudentId = account.students[0].id;
    }
    this.saveAccountData(account);
  },

  recordQuizCompletion(
    studentId: string,
    unitId: string,
    earnedStars: number,
    newMistakes: { questionId: string; unitId: string }[]
  ): void {
    const account = this.getAccountData();
    account.students = account.students.map(student => {
      if (student.id !== studentId) return student;

      // 更新星級
      const currentStar = student.unitStars[unitId] || 0;
      const bestStar = Math.max(currentStar, earnedStars);
      const updatedUnitStars = { ...student.unitStars, [unitId]: bestStar };

      // 更新已完成單元
      const completedSet = new Set(student.completedUnits);
      completedSet.add(unitId);

      // 計算總星數
      const totalStars = Object.values(updatedUnitStars).reduce((sum, s) => sum + s, 0);

      // 更新錯題本（去重）
      const existingMistakeIds = new Set(student.mistakes.map(m => m.questionId));
      const formattedNew = newMistakes
        .filter(m => !existingMistakeIds.has(m.questionId))
        .map(m => ({ ...m, timestamp: Date.now() }));
      const updatedMistakes = [...student.mistakes, ...formattedNew];

      return {
        ...student,
        completedUnits: Array.from(completedSet),
        unitStars: updatedUnitStars,
        totalStars,
        mistakes: updatedMistakes,
        lastActiveAt: Date.now()
      };
    });

    this.saveAccountData(account);
  },

  removeStudentMistake(studentId: string, questionId: string): void {
    const account = this.getAccountData();
    account.students = account.students.map(student => {
      if (student.id === studentId) {
        return {
          ...student,
          mistakes: student.mistakes.filter(m => m.questionId !== questionId)
        };
      }
      return student;
    });
    this.saveAccountData(account);
  },

  exportBackup(): string {
    const account = this.getAccountData();
    return JSON.stringify(account, null, 2);
  },

  importBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.students && Array.isArray(parsed.students)) {
        this.saveAccountData(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Failed to import backup', e);
      return false;
    }
  }
};
