/**
 * Homepage Motion Engine — v0.9.4
 *
 * The active production engine is now `engine.js` in this directory.
 *
 * This file (observer.ts) is retained only as a historical reference to the
 * legacy RevealObserver implementation (multi-trigger fallback stack:
 * init-viewport + watchdog timer + scroll listener + IntersectionObserver).
 * That architecture was replaced because competing triggers caused off-screen
 * and premature reveals (see Release 0.9.4 / Homepage Motion Engine Refactor).
 *
 * Do NOT import this file. Import `engine.js`:
 *
 *   import { MotionEngine } from '../motion/engine.js';
 */

export {};
