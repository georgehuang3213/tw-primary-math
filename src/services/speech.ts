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
    // 優先尋找繁體中文 (台灣) 語音
    const twVoice = voices.find(v => v.lang === 'zh-TW' || v.lang === 'zh_TW' || v.name.includes('Taiwan') || v.name.includes('Han'));
    const zhVoice = twVoice || voices.find(v => v.lang.startsWith('zh'));
    if (zhVoice) {
      this.voice = zhVoice;
    }
  }

  speak(text: string, onEnd?: () => void) {
    if (!this.enabled || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    // 移除注音符號格式，純淨發音
    const cleanText = text.replace(/\[([^\]]+)\|([^\]]+)\]/g, '$1');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.lang = 'zh-TW';
    utterance.rate = 0.88; // 低年級語速稍微放慢，清晰溫柔
    utterance.pitch = 1.1; // 稍微帶點活力朝氣

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
