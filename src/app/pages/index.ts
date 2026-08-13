export interface LearningContent {
  title: string;
  description: string;
  content: string; // Markdown or plain text
}

export interface QuizChoice {
  id: string;
  text: string;
}

export interface Quiz {
  question: string;
  choices: QuizChoice[];
  correctChoiceId: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  moduleId: number;
  order: number;
  estimatedMinutes: number;
  translations: {
    en: LearningContent & { quiz: Quiz };
    // fil and tl can be added here
  };
}

export interface Module {
  id: number;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  desc: string;
  badge: Badge;
  lessons: Lesson[];
  unlocks?: number[]; // IDs of modules this one unlocks
  dependsOn?: number[]; // IDs of modules that must be completed first
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
}

export interface Level {
  level: number;
  name: string;
  minXp: number;
}

export interface UserProgress {
  completedLessons: Set<string>;
  xp: number;
  earnedBadges: Set<string>;
  lastAccessedLesson: {
    moduleId: number;
    lessonId: string;
  } | null;
}

export interface LearningState {
  modules: Module[];
  progress: UserProgress;
  currentLevel: Level;
  totalLessons: number;
  completedLessonsCount: number;
}

export interface LearningRepository {
  getModules(): Promise<Module[]>;
  getUserProgress(userId: string): Promise<UserProgress>;
  saveUserProgress(userId: string, progress: UserProgress): Promise<void>;
  getBadges(): Promise<Badge[]>;
  getLevels(): Promise<Level[]>;
}