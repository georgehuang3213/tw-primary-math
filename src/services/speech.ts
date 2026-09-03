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

    // 🏆 最貼近台灣國小國語老師真人發音優先順序 (溫柔、標準、字正腔圓的國語老師發音)
    const preferredVoiceKeywords = [
      // 1. 微軟神經網路真人女聲（台灣公認最字正腔圓、語氣最像國小國語老師的聲音）
      'HsiaoChenNeural', // 台灣微軟曉臻（神經網路自然發音）
      'HsiaoYuNeural',   // 台灣微軟曉雨
      'Microsoft HsiaoChen Online',
      'Microsoft HsiaoYu Online',
      'HsiaoChen',
      'HsiaoYu',
      'Taiwanese Mandarin',
      // 2. Google 高音質台灣繁體國語（Chrome 內建標準發音）
      'Google 國語（台灣）',
      'Google 國語',
      'Google 普通话（中国大陆）', // 備用高品質
      // 3. Apple iOS / macOS 台灣 Siri 與美佳女聲
      'Mei-Jia',         // 台灣美佳
      'Sin-Ji',          // 台灣新芝
      'Ting-Ting',
      // 4. 標準語言代碼
      'zh-TW',
      'zh_TW',
      'cmn-Hant-TW'
    ];

    // 1. 優先尋找「台灣繁體」+「自然神經網路 / 女聲」模型
    let bestVoice = voices.find(v => 
      (v.lang.includes('TW') || v.lang.includes('Hant') || v.lang === 'zh-TW') && 
      (v.name.includes('HsiaoChen') || v.name.includes('HsiaoYu') || v.name.includes('Natural') || v.name.includes('Neural'))
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

    // 3. 次選：任何台灣繁體語音
    if (!bestVoice) {
      bestVoice = voices.find(v => v.lang === 'zh-TW' || v.lang === 'zh_TW' || v.lang.includes('TW'));
    }

    // 4. 後備：任何中文語音
    if (!bestVoice) {
      bestVoice = voices.find(v => v.lang.startsWith('zh'));
    }

    if (bestVoice) {
      this.voice = bestVoice;
    }
  }

  // 針對台灣國語生字與破音字進行發音校正（確保 TTS 發出最精準的台灣標準國小發音）
  private correctPronunciation(text: string): string {
    return text
      // 破音字校正
      .replace(/好好的說話/g, '好好地說話')
      .replace(/音樂會/g, '音悅會')
      .replace(/樂曲/g, '悅曲')
      .replace(/長大/g, '掌大')
      .replace(/長高/g, '掌高')
      .replace(/生長/g, '生掌')
      .replace(/一行/g, '一航')
      .replace(/兩行/g, '兩航')
      .replace(/整齊的一行/g, '整齊的一航')
      .replace(/排成一行/g, '排成一航')
      .replace(/和你在/g, '汗你在')
      .replace(/小鼎/g, '小頂')
      .replace(/一匹馬/g, '一匹馬')
      .replace(/幾丈高/g, '幾丈高')
      .replace(/孵蛋/g, '敷蛋')
      .replace(/孵雞蛋/g, '敷雞蛋')
      .replace(/踩影子/g, '踩引子')
      .replace(/落葉裡的星星/g, '落葉裡的星星');
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

    const cleanText = this.correctPronunciation(this.sanitizeForSpeech(text));
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.lang = 'zh-TW';

    // 🌸 國小國語老師親切真人發音調校：
    // rate 設為 0.92（字正腔圓、溫和從容，小朋友聽得清清楚楚、好跟讀）
    // pitch 設為 1.02（微微提亮溫柔甜美度，更具親和力與耐心）
    utterance.rate = 0.92;
    utterance.pitch = 1.02;

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
