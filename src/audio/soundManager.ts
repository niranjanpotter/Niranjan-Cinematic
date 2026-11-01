// Procedural Cyberpunk Audio & Music Synthesizer Engine
class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private isEngineRunning: boolean = false;

  // Background Synthwave Music State
  private isMusicPlaying: boolean = false;
  private musicTimer: number | null = null;
  private musicGain: GainNode | null = null;
  private noteIndex: number = 0;

  // Cyberpunk bassline & arpeggio notes (Frequencies in Hz: A Minor / Cyber scale)
  private readonly bassNotes = [110, 110, 130.81, 146.83, 110, 110, 164.81, 146.83];
  private readonly arpNotes = [
    220, 261.63, 329.63, 440, 523.25, 440, 329.63, 261.63,
    196, 246.94, 293.66, 392, 493.88, 392, 293.66, 246.94
  ];

  public initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.ctx) {
      if (this.engineGain) {
        this.engineGain.gain.setValueAtTime(this.isMuted ? 0 : 0.05, this.ctx.currentTime);
      }
      if (this.musicGain) {
        this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime);
      }
    }
    return this.isMuted;
  }

  // --- BACKGROUND CYBERPUNK MUSIC SYNTHESIZER ---
  public startCyberMusic() {
    if (this.isMusicPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime);
    this.musicGain.connect(this.ctx.destination);

    this.isMusicPlaying = true;
    this.scheduleMusicBeat();
  }

  private scheduleMusicBeat() {
    if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;

    const t = this.ctx.currentTime;
    const tempo = 124; // 124 BPM Cyber Synthwave
    const beatDuration = 60 / tempo / 2; // Eighth note

    // 1. Synth Arpeggio Voice
    const arpFreq = this.arpNotes[this.noteIndex % this.arpNotes.length];
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(arpFreq, t);

    // Warm Lowpass filter for smooth synthwave timbre
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, t);
    filter.frequency.exponentialRampToValueAtTime(600, t + beatDuration * 0.9);

    noteGain.gain.setValueAtTime(0.06, t);
    noteGain.gain.exponentialRampToValueAtTime(0.001, t + beatDuration * 0.85);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.musicGain);

    osc.start(t);
    osc.stop(t + beatDuration * 0.9);

    // 2. Punchy Sub-Bass Voice every 4th step
    if (this.noteIndex % 4 === 0) {
      const bassFreq = this.bassNotes[Math.floor(this.noteIndex / 4) % this.bassNotes.length];
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(bassFreq / 2, t);

      bassGain.gain.setValueAtTime(0.14, t);
      bassGain.gain.exponentialRampToValueAtTime(0.01, t + beatDuration * 2);

      bassOsc.connect(bassGain);
      bassGain.connect(this.musicGain);

      bassOsc.start(t);
      bassOsc.stop(t + beatDuration * 2.1);
    }

    this.noteIndex++;
    this.musicTimer = window.setTimeout(() => this.scheduleMusicBeat(), beatDuration * 1000);
  }

  public stopCyberMusic() {
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
    this.isMusicPlaying = false;
  }

  // --- SOUND EFFECTS ---
  public playClick() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Silent fallback
    }
  }

  public playIgnition() {
    this.initContext();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Starter crank & roar
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(70, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.4);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.8);

    gain.gain.setValueAtTime(0.01, t);
    gain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.3, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.85);

    setTimeout(() => {
      this.startEngineHum();
      this.startCyberMusic();
    }, 700);
  }

  public startEngineHum() {
    if (this.isEngineRunning || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      this.engineOsc = this.ctx.createOscillator();
      this.engineGain = this.ctx.createGain();

      this.engineOsc.type = 'triangle';
      this.engineOsc.frequency.setValueAtTime(80, t);

      const initialVolume = this.isMuted ? 0 : 0.05;
      this.engineGain.gain.setValueAtTime(initialVolume, t);

      this.engineOsc.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc.start();
      this.isEngineRunning = true;
    } catch {
      // Silent
    }
  }

  public updateEngineSpeed(speedRatio: number) {
    if (!this.engineOsc || !this.ctx || this.isMuted) return;
    try {
      const targetFreq = 80 + Math.abs(speedRatio) * 160;
      this.engineOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.08);
    } catch {
      // Silent
    }
  }

  public playNitroBoost() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      // High pitch turbo whoosh
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(1400, t + 0.6);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.75);
    } catch {
      // Silent
    }
  }

  public playDistrictChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C Major high arpeggio chime

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.09);

        gain.gain.setValueAtTime(0.1, t + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.09);
        osc.stop(t + idx * 0.09 + 0.55);
      });
    } catch {
      // Silent
    }
  }

  public playWarp() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(1600, t + 0.4);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.5);
    } catch {
      // Silent
    }
  }
}

export const soundManager = new SoundManager();
