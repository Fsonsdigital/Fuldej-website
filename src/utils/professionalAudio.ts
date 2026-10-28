/**
 * Professional Corporate Audio Engine for Fuldej Integrated Service Ltd
 * 
 * Provides documentary-grade ambient sound layering and smooth fade-in/out
 * for the background engineering video, harmonizing with the authentic field recording.
 */

class CorporateSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private isInitialized = false;
  private isPlaying = false;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;

  private init() {
    if (this.isInitialized && this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Warm low-pass filter for corporate ambient tone
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(420, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(1.2, this.ctx.currentTime);
      this.filter.connect(this.masterGain);

      // Ambient sub-gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      this.ambientGain.connect(this.filter);

      // Elegant harmonic chord frequencies: D2 (73.42Hz), A2 (110Hz), F#3 (185Hz), A3 (220Hz), D4 (293.66Hz)
      const frequencies = [73.42, 110.0, 185.0, 220.0, 293.66];
      this.oscillators = frequencies.map((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
        // Slight detune for warm analog feel
        osc.detune.setValueAtTime((idx - 2) * 4, this.ctx!.currentTime);

        const oscGain = this.ctx!.createGain();
        oscGain.gain.setValueAtTime(idx === 0 ? 0.35 : 0.15, this.ctx!.currentTime);
        osc.connect(oscGain);
        oscGain.connect(this.ambientGain!);
        osc.start();
        return osc;
      });

      // Gentle slow LFO for subtle breath of life (0.12 Hz)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(80, this.ctx.currentTime);
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filter.frequency);
      this.lfo.start();

      this.isInitialized = true;
    } catch (e) {
      console.warn('Web Audio not initialized:', e);
    }
  }

  public activate(videoElement?: HTMLVideoElement | null, targetVideoVolume: number = 0.20, targetAmbientVolume: number = 0.10) {
    this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    // Smooth, gentle 1.0s fade-in to a cool, pleasant background level
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(targetAmbientVolume, now + 1.0);
    this.isPlaying = true;

    // Handle video audio with calm, cool volume leveling
    if (videoElement) {
      videoElement.muted = false;
      videoElement.volume = 0;
      let vol = 0;
      const interval = setInterval(() => {
        vol += 0.02;
        if (vol >= targetVideoVolume) {
          vol = targetVideoVolume;
          clearInterval(interval);
        }
        if (videoElement && !videoElement.muted) {
          videoElement.volume = vol;
        } else {
          clearInterval(interval);
        }
      }, 50);
    }
  }

  public deactivate(videoElement?: HTMLVideoElement | null) {
    if (!this.ctx || !this.masterGain) {
      if (videoElement) videoElement.muted = true;
      this.isPlaying = false;
      return;
    }

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    // Smooth 0.4s fade-out to prevent audio clicking
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
    this.isPlaying = false;

    if (videoElement) {
      let vol = videoElement.volume;
      const interval = setInterval(() => {
        vol -= 0.15;
        if (vol <= 0.05) {
          videoElement.volume = 0;
          videoElement.muted = true;
          clearInterval(interval);
        } else {
          videoElement.volume = vol;
        }
      }, 40);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const corporateSoundEngine = new CorporateSoundEngine();
