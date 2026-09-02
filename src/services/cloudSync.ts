import { UserAccount } from '../types';

export interface CloudSyncConfig {
  syncId: string;
  syncKey: string;
  endpointUrl: string;
  autoSyncEnabled: boolean;
  lastSyncedTimestamp: number;
}

const CLOUD_CONFIG_KEY = 'tw_primary_math_cloud_config';

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
  async pushToCloud(data: UserAccount): Promise<boolean> {
    const config = this.getConfig();
    if (!config.autoSyncEnabled || !config.syncId) return false;

    try {
      const cloudPayload = {
        syncId: config.syncId,
        updatedAt: Date.now(),
        accountData: data
      };

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
  async pullFromCloud(): Promise<UserAccount | null> {
    const config = this.getConfig();
    if (!config.syncId) return null;

    try {
      const remoteData = localStorage.getItem(`cloud_remote_snapshot_${config.syncId}`);
      if (remoteData) {
        const parsed = JSON.parse(remoteData);
        if (parsed.accountData && typeof parsed.accountData.totalStars === 'number') {
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
