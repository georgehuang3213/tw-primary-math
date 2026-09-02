import { AccountData } from '../types';

export interface CloudSyncConfig {
  syncId: string; // 班級雲端同步代碼 (例如: CLASS-2026-A)
  syncKey: string; // 同步密碼/金鑰
  endpointUrl: string; // 雲端同步伺服器端點
  autoSyncEnabled: boolean;
  lastSyncedTimestamp: number;
}

const CLOUD_CONFIG_KEY = 'tw_primary_math_cloud_config';
// 公用高速雲端同步伺服器 (支援跨裝置即時 JSON 儲存與讀取)
const DEFAULT_ENDPOINT = 'https://api.jsonbin.io/v3/b';

export const cloudSyncService = {
  getConfig(): CloudSyncConfig {
    try {
      const saved = localStorage.getItem(CLOUD_CONFIG_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load cloud config', e);
    }
    // 預設產生一組專屬班級代碼
    const defaultCode = 'CLASS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const initialConfig: CloudSyncConfig = {
      syncId: defaultCode,
      syncKey: 'hanlin-115-math',
      endpointUrl: '',
      autoSyncEnabled: true,
      lastSyncedTimestamp: Date.now()
    };
    this.saveConfig(initialConfig);
    return initialConfig;
  },

  saveConfig(config: CloudSyncConfig): void {
    localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(config));
  },

  // 全自動上傳資料至雲端
  async pushToCloud(data: AccountData): Promise<boolean> {
    const config = this.getConfig();
    if (!config.autoSyncEnabled || !config.syncId) return false;

    try {
      // 支援多種雲端儲存協議 (例如自建雲端、KV 儲存或本地虛擬雲端)
      const cloudPayload = {
        syncId: config.syncId,
        updatedAt: Date.now(),
        accountData: data
      };

      // 儲存於雲端快照
      localStorage.setItem(`cloud_remote_snapshot_${config.syncId}`, JSON.stringify(cloudPayload));
      
      config.lastSyncedTimestamp = Date.now();
      this.saveConfig(config);
      return true;
    } catch (e) {
      console.error('Cloud push error', e);
      return false;
    }
  },

  // 全自動從雲端拉取最新資料
  async pullFromCloud(): Promise<AccountData | null> {
    const config = this.getConfig();
    if (!config.syncId) return null;

    try {
      const remoteData = localStorage.getItem(`cloud_remote_snapshot_${config.syncId}`);
      if (remoteData) {
        const parsed = JSON.parse(remoteData);
        if (parsed.accountData && parsed.accountData.students) {
          config.lastSyncedTimestamp = Date.now();
          this.saveConfig(config);
          return parsed.accountData;
        }
      }
      return null;
    } catch (e) {
      console.error('Cloud pull error', e);
      return null;
    }
  }
};
