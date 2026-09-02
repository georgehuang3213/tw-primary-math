import { UserAccount } from '../types';
import { r2StorageService } from './r2Storage';

const ACCOUNT_SESSION_KEY = 'tw_primary_math_current_session';
const STORAGE_PREFIX = 'tw_primary_math_user_';

const DEFAULT_ACCOUNT = (name: string): UserAccount => ({
  accountName: name,
  totalStars: 0,
  completedUnits: [],
  unitStars: {},
  mistakes: [],
  lastActiveAt: Date.now(),
  lastCloudSyncAt: Date.now()
});

export const storageService = {
  getCurrentAccountName(): string | null {
    return localStorage.getItem(ACCOUNT_SESSION_KEY);
  },

  loginAccount(accountName: string): UserAccount {
    const trimmed = accountName.trim() || '小勇士';
    localStorage.setItem(ACCOUNT_SESSION_KEY, trimmed);

    const storageKey = `${STORAGE_PREFIX}${trimmed}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed: UserAccount = JSON.parse(saved);
        if (typeof parsed.totalStars === 'number') {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }

    const newAcc = DEFAULT_ACCOUNT(trimmed);
    this.saveUserAccount(newAcc);
    return newAcc;
  },

  logoutAccount(): void {
    localStorage.removeItem(ACCOUNT_SESSION_KEY);
  },

  getUserAccount(): UserAccount {
    const currentName = this.getCurrentAccountName() || '小勇士';
    const storageKey = `${STORAGE_PREFIX}${currentName}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed: UserAccount = JSON.parse(saved);
        if (typeof parsed.totalStars === 'number') {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse user account', e);
      }
    }
    return DEFAULT_ACCOUNT(currentName);
  },

  saveUserAccount(account: UserAccount): void {
    try {
      const storageKey = `${STORAGE_PREFIX}${account.accountName}`;
      account.lastActiveAt = Date.now();
      account.lastCloudSyncAt = Date.now();
      localStorage.setItem(storageKey, JSON.stringify(account));
      // 全自動無感即時推送到 Cloudflare R2 雲端儲存
      r2StorageService.uploadToR2(account).catch(err => {
        console.error('Auto Cloudflare R2 sync error', err);
      });
    } catch (e) {
      console.error('Failed to save user account', e);
    }
  },

  recordQuizCompletion(
    unitId: string,
    earnedStars: number,
    newMistakes: { questionId: string; unitId: string }[]
  ): UserAccount {
    const account = this.getUserAccount();

    // 更新星級
    const currentStar = account.unitStars[unitId] || 0;
    const bestStar = Math.max(currentStar, earnedStars);
    const updatedUnitStars = { ...account.unitStars, [unitId]: bestStar };

    // 更新已完成單元
    const completedSet = new Set(account.completedUnits);
    completedSet.add(unitId);

    // 計算總星數
    const totalStars = Object.values(updatedUnitStars).reduce((sum, s) => sum + s, 0);

    // 更新錯題本（去重）
    const existingMistakeIds = new Set(account.mistakes.map(m => m.questionId));
    const formattedNew = newMistakes
      .filter(m => !existingMistakeIds.has(m.questionId))
      .map(m => ({ ...m, timestamp: Date.now() }));
    const updatedMistakes = [...account.mistakes, ...formattedNew];

    const updatedAccount: UserAccount = {
      ...account,
      completedUnits: Array.from(completedSet),
      unitStars: updatedUnitStars,
      totalStars,
      mistakes: updatedMistakes,
      lastActiveAt: Date.now()
    };

    this.saveUserAccount(updatedAccount);
    return updatedAccount;
  },

  removeMistake(questionId: string): UserAccount {
    const account = this.getUserAccount();
    const updatedAccount: UserAccount = {
      ...account,
      mistakes: account.mistakes.filter(m => m.questionId !== questionId),
      lastActiveAt: Date.now()
    };
    this.saveUserAccount(updatedAccount);
    return updatedAccount;
  },

  // 多台裝置同時上線智慧差量合併
  mergeUserAccount(local: UserAccount, remote: UserAccount): UserAccount {
    const completedSet = new Set([...(local.completedUnits || []), ...(remote.completedUnits || [])]);
    
    // 合併星級 (取最高星級)
    const allUnitKeys = new Set([...Object.keys(local.unitStars || {}), ...Object.keys(remote.unitStars || {})]);
    const mergedUnitStars: Record<string, number> = {};
    allUnitKeys.forEach(uk => {
      mergedUnitStars[uk] = Math.max(local.unitStars?.[uk] || 0, remote.unitStars?.[uk] || 0);
    });

    const totalStars = Object.values(mergedUnitStars).reduce((sum, s) => sum + s, 0);

    const mistakeMap = new Map<string, { questionId: string; unitId: string; timestamp: number }>();
    [...(remote.mistakes || []), ...(local.mistakes || [])].forEach(m => {
      mistakeMap.set(m.questionId, m);
    });

    return {
      accountName: local.accountName || remote.accountName,
      completedUnits: Array.from(completedSet),
      unitStars: mergedUnitStars,
      totalStars,
      mistakes: Array.from(mistakeMap.values()),
      lastActiveAt: Math.max(local.lastActiveAt || 0, remote.lastActiveAt || 0),
      lastCloudSyncAt: Date.now()
    };
  }
};
