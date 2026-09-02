class SpeechService {
  private synth: SpeechSynthesis | null = null;
  public enabled: boolean = true;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return;

    // 🏆 最佳真人語音優先順序 (優先採用微軟/Google/蘋果的高品質 Natural 神經網路真人女聲)
    const preferredVoiceKeywords = [
      'HsiaoChen', // 曉臻 - 台灣微軟最自然真人女聲
      'HsiaoYu',   // 曉雨 - 台灣微軟自然女聲
      'YunJhe',    // 雲哲 - 台灣微軟自然男聲
      'Google 國語（台灣）',
      'Google 國語',
      'Mei-Jia',   // Apple 台灣女聲 (iOS / macOS Siri)
      'Sin-Ji',    // Apple 台灣女聲
      'Ting-Ting',
      'zh-TW',
      'zh_TW',
      'cmn-Hant-TW'
    ];

    // 1. 尋找台灣自然發音模型 (Natural / Online / Neural)
    let bestVoice = voices.find(v => 
      (v.lang.includes('TW') || v.lang.includes('Hant')) && 
      (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Neural'))
    );

    // 2. 尋找關鍵字推薦清單
    if (!bestVoice) {
      for (const kw of preferredVoiceKeywords) {
        const found = voices.find(v => v.name.includes(kw) || v.lang === kw);
        if (found) {
          bestVoice = found;
          break;
        }
      }
    }

    // 3. 次選：任何繁體中文或中文語音
    if (!bestVoice) {
      bestVoice = voices.find(v => v.lang.startsWith('zh'));
    }

    if (bestVoice) {
      this.voice = bestVoice;
    }
  }

  // 標點符號與語氣平滑化，去除機器生硬斷句感
  private sanitizeForSpeech(raw: string): string {
    return raw
      .replace(/\[([^\]]+)\|([^\]]+)\]/g, '$1') // 去除注音標籤
      .replace(/[\(（][^\)）]*[\)）]/g, ' ')    // 去除括號內的文字干擾
      .replace(/[『』「」【】《》〈〉]/g, ' ')   // 去除硬引號，避免生硬頓挫
      .replace(/[*#_~`➔→•·]/g, ' ')            // 去除特殊符號
      .replace(/[!！?？]/g, '，')               // 將突兀感強的感嘆號換為自然呼吸逗號
      .replace(/，+/g, '，')                    // 壓縮連續逗號
      .replace(/\s+/g, ' ')                     // 壓縮空白
      .trim();
  }

  speak(text: string, onEnd?: () => void) {
    if (!this.enabled || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();
    this.initVoices(); // 確保每次發音取得系統當前最優語音

    const cleanText = this.sanitizeForSpeech(text);
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.lang = 'zh-TW';

    // 🌸 真人自然語音參數最佳化：
    // rate 設為 0.95（比原先 0.88 更連貫流暢，完全消除機械拉長音與頓挫卡頓）
    // pitch 設為 1.0（採用語音模型最真實原生音高，保證圓潤溫柔）
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechService = new SpeechService();
