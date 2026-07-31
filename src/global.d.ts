import type { Engine } from './scripts/experience';

declare global {
  interface Window {
    __experienceEngine?: {
      destroy: () => void;
    };
  }
}

export {};
