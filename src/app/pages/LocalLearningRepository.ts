import { LearningRepository, Module, UserProgress, Badge, Level } from "./index";
import { modules } from "./modules";
import { badges } from "./badges";
import { levels } from "./levels";

const getStorageKey = (userId: string) => `tanglaw_learning_progress_${userId}`;

const getInitialProgress = (): UserProgress => ({
  completedLessons: new Set([
    // Pre-complete Module 1
    "m1-l1", "m1-l2", "m1-l3", "m1-l4", "m1-l5",
    // Pre-progress Module 2
    "m2-l1", "m2-l2", "m2-l3", "m2-l4",
    // Pre-progress Module 3
    "m3-l1", "m3-l2",
  ]),
  xp: 0, // will be calculated on first load
  earnedBadges: new Set(), // will be calculated on first load
  lastAccessedLesson: null,
});

export class LocalLearningRepository implements LearningRepository {
  async getModules(): Promise<Module[]> {
    return Promise.resolve(modules);
  }

  async getBadges(): Promise<Badge[]> {
    return Promise.resolve(badges);
  }

  async getLevels(): Promise<Level[]> {
    return Promise.resolve(levels);
  }

  async getUserProgress(userId: string): Promise<UserProgress> {
    try {
      const storedProgress = localStorage.getItem(getStorageKey(userId));
      if (storedProgress) {
        const parsed = JSON.parse(storedProgress);
        // Revive Set from array
        return {
          ...parsed,
          completedLessons: new Set(parsed.completedLessons),
          earnedBadges: new Set(parsed.earnedBadges),
        };
      }
    } catch (error) {
      console.error("Failed to load user progress, resetting.", error);
      localStorage.removeItem(getStorageKey(userId));
    }
    // If no progress, create and save initial state
    const initialProgress = getInitialProgress();
    await this.saveUserProgress(userId, initialProgress);
    return initialProgress;
  }

  async saveUserProgress(userId: string, progress: UserProgress): Promise<void> {
    const serializableProgress = {
      ...progress,
      completedLessons: Array.from(progress.completedLessons),
      earnedBadges: Array.from(progress.earnedBadges),
    };
    localStorage.setItem(getStorageKey(userId), JSON.stringify(serializableProgress));
    return Promise.resolve();
  }
}