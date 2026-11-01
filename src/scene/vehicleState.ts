// Mutable vehicle state shared between the render loop and the UI.
// The render loop (useFrame) writes here every frame without triggering React re-renders;
// the UI samples it a few times per second via subscribe().
export interface VehicleSnapshot {
  x: number;
  z: number;
  rotation: number;
  speed: number;
}

// World units per second. Negative Z is "forward" down the boulevard.
export const DRIVE = {
  autoTourSpeed: -7.5,
  cruiseSpeed: -11,
  reverseSpeed: 5,
  nitroBoost: -7,
  roadHalfWidth: 5.0,
  startZ: 20,
  endZ: -525
} as const;

class VehicleState {
  x = 0;
  z = 0;
  rotation = 0;
  speed = 0;
  nitroUntil = 0;

  private pendingTeleport: { z: number; speed: number } | null = null;
  private listeners = new Set<(s: VehicleSnapshot) => void>();

  teleport(z: number, speed: number) {
    this.pendingTeleport = { z, speed };
  }

  consumeTeleport() {
    const t = this.pendingTeleport;
    this.pendingTeleport = null;
    return t;
  }

  fireNitro(durationMs = 1400) {
    this.nitroUntil = performance.now() + durationMs;
  }

  get isNitroActive() {
    return performance.now() < this.nitroUntil;
  }

  snapshot(): VehicleSnapshot {
    return { x: this.x, z: this.z, rotation: this.rotation, speed: this.speed };
  }

  // UI subscription, sampled at a modest rate so the HUD stays cheap.
  subscribe(listener: (s: VehicleSnapshot) => void, hz = 10) {
    this.listeners.add(listener);
    const id = window.setInterval(() => listener(this.snapshot()), 1000 / hz);
    return () => {
      this.listeners.delete(listener);
      window.clearInterval(id);
    };
  }
}

export const vehicleState = new VehicleState();
