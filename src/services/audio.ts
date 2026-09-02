// 使用 Web Audio API 產生生動的音效，免外部音檔依賴
class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.enabled) return null;
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // 答對的叮咚音效 (Cheerful Chime)
  playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      
      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.4);
    });
  }

  // 答錯溫和提示音 (Gentle Try Again)
  playWrong() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [329.63, 293.66]; // E4, D4
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

      gain.gain.setValueAtTime(0.01, ctx.currentTime + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.15 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 0.3);
    });
  }

  // 點擊與按鈕音效 (Pop/Click)
  playPop() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
  }

  // 錢幣投幣音效 (Coin Clink)
  playCoin() {
    const ctx = this.getContext();
    if (!ctx) return;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
    osc1.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1975.53, ctx.currentTime); // B6
    osc2.frequency.setValueAtTime(2637.02, ctx.currentTime + 0.08); // E7

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.35);
    osc2.stop(ctx.currentTime + 0.35);
  }

  // 勝利大慶祝音效 (Fanfare / Level Up)
  playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;

    const melody = [
      { freq: 523.25, time: 0, dur: 0.12 },   // C5
      { freq: 659.25, time: 0.12, dur: 0.12 },// E5
      { freq: 783.99, time: 0.24, dur: 0.12 },// G5
      { freq: 1046.50, time: 0.36, dur: 0.35 },// C6
    ];

    melody.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

      gain.gain.setValueAtTime(0.01, ctx.currentTime + time);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + dur + 0.05);
    });
  }
}

export const soundFx = new SoundEffects();
