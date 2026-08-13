import { LocalLearningRepository } from "./LocalLearningRepository";
import { LearningRepository, LearningState, UserProgress, Module, Level, Lesson } from "./index";

const XP_PER_LESSON = 10;
const XP_PER_QUIZ = 5;

class LearningService {
  private repo: LearningRepository;
  private userId: string;

  constructor(userId: string) {
    this.repo = new LocalLearningRepository();
    this.userId = userId;
  }

  private calculateState(modules: Module[], progress: UserProgress, levels: Level[]): LearningState {
    // Recalculate XP
    progress.xp = progress.completedLessons.size * (XP_PER_LESSON + XP_PER_QUIZ);

    // Recalculate Badges
    progress.earnedBadges.clear();
    modules.forEach(module => {
      const moduleLessons = module.lessons.map(l => l.id);
      const isModuleComplete = moduleLessons.every(lId => progress.completedLessons.has(lId));
      if (isModuleComplete) {
        progress.earnedBadges.add(module.badge.id);
      }
    });

    // Determine current level
    const currentLevel = [...levels].reverse().find(l => progress.xp >= l.minXp) ?? levels[0];

    const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

    return {
      modules,
      progress,
      currentLevel,
      totalLessons,
      completedLessonsCount: progress.completedLessons.size,
    };
  }

  async getLearningState(): Promise<LearningState> {
    const [modules, progress, levels] = await Promise.all([
      this.repo.getModules(),
      this.repo.getUserProgress(this.userId),
      this.repo.getLevels(),
    ]);

    const state = this.calculateState(modules, progress, levels);
    // Save recalculated progress (XP, badges)
    await this.repo.saveUserProgress(this.userId, state.progress);
    return state;
  }

  async completeLesson(lessonId: string): Promise<LearningState> {
    const progress = await this.repo.getUserProgress(this.userId);
    progress.completedLessons.add(lessonId);
    
    const [modules, levels] = await Promise.all([
        this.repo.getModules(),
        this.repo.getLevels(),
    ]);

    const state = this.calculateState(modules, progress, levels);
    await this.repo.saveUserProgress(this.userId, state.progress);
    return state;
  }

  async getModuleStatus(module: Module, progress: UserProgress, allModules: Module[]): Promise<"locked" | "completed" | "in-progress" | "not-started"> {
    const completedModuleIds = new Set<number>();
    allModules.forEach(m => {
        const isComplete = m.lessons.every(l => progress.completedLessons.has(l.id));
        if(isComplete) completedModuleIds.add(m.id);
    });

    if (module.dependsOn?.some(depId => !completedModuleIds.has(depId))) {
      return "locked";
    }

    const completedInModule = module.lessons.filter(l => progress.completedLessons.has(l.id)).length;
    if (completedInModule === module.lessons.length) {
      return "completed";
    }
    if (completedInModule > 0) {
      return "in-progress";
    }
    return "not-started";
  }

  async resetProgress(): Promise<LearningState> {
    localStorage.removeItem(`tanglaw_learning_progress_${this.userId}`);
    return this.getLearningState();
  }

  getFirstIncompleteLesson(moduleId: number, modules: Module[], progress: UserProgress): Lesson | undefined {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return undefined;

    return module.lessons
      .sort((a, b) => a.order - b.order)
      .find(lesson => !progress.completedLessons.has(lesson.id));
  }
}

export default LearningService;