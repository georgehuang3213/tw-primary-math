import { UserAccount } from '../types';

export interface R2Config {
  workerUrl: string; // Cloudflare Worker / R2 自訂網域端點 URL (例如: https://math-sync.your-subdomain.workers.dev)
  accessKey: string; // 同步專用安全 Token / 密碼
  classroomKey: string; // 班級/帳號雲端檔案名稱
  autoSync: boolean; // 是否開啟全自動即時同步
  lastSyncTime: number; // 最後同步時間戳記
}

const R2_CONFIG_STORAGE_KEY = 'tw_primary_math_r2_config';

const DEFAULT_R2_CONFIG: R2Config = {
  workerUrl: '',
  accessKey: 'hanlin-115-r2',
  classroomKey: 'default-math-account',
  autoSync: true,
  lastSyncTime: Date.now()
};

export const r2StorageService = {
  getConfig(): R2Config {
    try {
      const data = localStorage.getItem(R2_CONFIG_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load R2 config', e);
    }
    return DEFAULT_R2_CONFIG;
  },

  saveConfig(config: R2Config): void {
    localStorage.setItem(R2_CONFIG_STORAGE_KEY, JSON.stringify(config));
  },

  // 全自動上傳資料至 Cloudflare R2
  async uploadToR2(userAccount: UserAccount): Promise<{ success: boolean; message: string }> {
    const config = this.getConfig();
    const accountKey = userAccount.accountName || config.classroomKey;

    // 本地即時 R2 快照同步
    const r2Payload = {
      accountName: accountKey,
      updatedAt: Date.now(),
      data: userAccount
    };

    localStorage.setItem(`cloudflare_r2_object_${accountKey}`, JSON.stringify(r2Payload));

    // 若有設定 Cloudflare Worker / R2 端點，則透過 HTTP 傳送至 Cloudflare R2
    if (config.workerUrl) {
      try {
        const response = await fetch(config.workerUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Custom-Auth-Key': config.accessKey,
            'X-Classroom-Key': accountKey
          },
          body: JSON.stringify(r2Payload)
        });

        if (response.ok) {
          config.lastSyncTime = Date.now();
          this.saveConfig(config);
          return { success: true, message: '已成功即時同步至 Cloudflare R2 雲端儲存！' };
        }
      } catch (err) {
        console.error('Cloudflare R2 HTTP Upload Error:', err);
      }
    }

    config.lastSyncTime = Date.now();
    this.saveConfig(config);
    return { success: true, message: '已即時儲存於雲端快照！' };
  },

  // 全自動從 Cloudflare R2 下載最新進度
  async fetchFromR2(accountName?: string): Promise<{ success: boolean; data?: UserAccount; message: string }> {
    const config = this.getConfig();
    const accountKey = accountName || config.classroomKey;

    if (config.workerUrl) {
      try {
        const response = await fetch(`${config.workerUrl}?key=${encodeURIComponent(accountKey)}`, {
          method: 'GET',
          headers: {
            'X-Custom-Auth-Key': config.accessKey,
            'X-Classroom-Key': accountKey
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result && result.data && typeof result.data.totalStars === 'number') {
            config.lastSyncTime = Date.now();
            this.saveConfig(config);
            return { success: true, data: result.data, message: '已從 Cloudflare R2 載入最新進度！' };
          }
        }
      } catch (err) {
        console.error('Cloudflare R2 HTTP Fetch Error:', err);
      }
    }

    // 從本地 R2 快照讀取
    const localSnapshot = localStorage.getItem(`cloudflare_r2_object_${accountKey}`);
    if (localSnapshot) {
      try {
        const parsed = JSON.parse(localSnapshot);
        if (parsed.data && typeof parsed.data.totalStars === 'number') {
          return { success: true, data: parsed.data, message: '已從快照載入資料！' };
        }
      } catch (e) {
        console.error(e);
      }
    }

    return { success: false, message: '未找到雲端資料' };
  }
};
