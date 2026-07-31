/**
 * Experience engine types.
 *
 * Milestone 3 — Cinematic Chapter Playback System.
 *
 * New interaction model:
 *
 *   Scroll / Swipe
 *        ↓
 *   ChapterController
 *        ↓
 *   AnimationPlayer
 *        ↓
 *   Frame → Canvas
 *
 * Each chapter is a discrete unit:
 *   - `static`      → display one frame, wait for next scroll
 *   - `transition`  → play a frame range at configured fps
 */

/* ---------- Chapter ---------- */

/** Chapter kind — determines playback behaviour */
export type ChapterKind = 'static' | 'transition';

/** Discrete chapter definition */
export interface Chapter {
  /** Stable identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Static or transition */
  kind: ChapterKind;
  /** Theme tag for future styling / audio / overlay */
  theme: string;
  /** First frame (1-based) of this chapter */
  frameStart: number;
  /** Last frame (1-based) of this chapter */
  frameEnd: number;
}

/** Normalised playback range for a chapter */
export interface ChapterRange {
  frameStart: number;
  frameEnd: number;
  direction: 'forward' | 'reverse';
}

/* ---------- Animation ---------- */

/** Easing curve functions */
export type EasingFunction = (t: number) => number;

/** Built-in easing curves */
export type EasingName = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';

/** AnimationPlayer configuration */
export interface AnimationPlayerConfig {
  /** Frames per second (default 30) */
  fps: number;
  /** Easing curve (default linear) */
  easing: EasingFunction;
}

/* ---------- Chapter state ---------- */

/** Current state of the ChapterController */
export interface ChapterState {
  /** Current chapter being displayed */
  chapter: Chapter | null;
  /** Whether an animation is currently playing */
  isPlaying: boolean;
}

/* ---------- Events ---------- */

/** Internal event names used by the EventBus */
export type ExperienceEvent =
  | 'chapter:enter'
  | 'chapter:leave'
  | 'chapter:change'
  | 'animation:start'
  | 'animation:end'
  | 'animation:direction'
  | 'frame:change'
  | 'experience:start'
  | 'experience:end'
  | 'exit:start';

/** Typed payload per event */
export type ExperienceEventPayload = {
  'chapter:enter': { chapter: { id: string; name: string; kind: string } };
  'chapter:leave': { chapter: { id: string; name: string; kind: string } };
  'chapter:change': { chapter: { id: string; name: string; kind: string } };
  'animation:start': { chapter: { id: string; name: string; kind: string } };
  'animation:end': { chapter: { id: string; name: string; kind: string } };
  'animation:direction': { direction: 'forward' | 'backward' };
  'frame:change': { index: number; totalFrames: number };
  'experience:start': Record<string, never>;
  'experience:end': Record<string, never>;
  'exit:start': { button: 'Enter ToDay' };
};

/** Event callback typed by event name */
export type EventCallback<E extends ExperienceEvent> = (
  payload: ExperienceEventPayload[E],
) => void;

/* ---------- Engine config ---------- */

/** Frame sequence configuration */
export interface FrameConfig {
  totalFrames: number;
  frameStart: number;
  frameUrlPattern: string;
}

/** Full engine configuration */
export interface ExperienceConfig extends FrameConfig {
  /** Default fps for transitions */
  fps: number;
  /** Default easing for transitions */
  defaultEasing: EasingFunction;
}

/** Observable: subscribe returns a dispose function */
export interface Observable<T> {
  subscribe(cb: (value: T) => void): () => void;
}

/** Engine public API */
export interface EngineAPI {
  initialize(canvas: HTMLCanvasElement, chapters: Chapter[]): Promise<void>;
  resize(): void;
  destroy(): void;
  getProgress(): number;
  getFrameCount(): number;
  getChapterCount(): number;
  getChapterCountStatic(): number;
  getCurrentChapter(): Chapter | null;
  getCurrentChapterIndex(): number;
  isPlaying(): boolean;
  on(event: ExperienceEvent, fn: (payload: ExperienceEventPayload[keyof ExperienceEventPayload]) => void): () => void;
}
