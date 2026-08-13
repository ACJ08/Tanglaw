import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Check, AlertTriangle } from "lucide-react";
import { Module, Lesson, UserProgress } from "./index";
import { useTheme } from "@/app/context/ThemeContext";

interface LessonViewerProps {
  module: Module;
  initialLesson: Lesson;
  progress: UserProgress;
  onClose: () => void;
  onCompleteLesson: (lessonId: string) => void;
}

// Helper component to parse and render simple markdown-like content
const MarkdownRenderer = ({ content }: { content: string }) => {
  const parseInline = (text: string) => {
    // Split by bold tags (e.g., **text**), keeping the delimiters
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Split content into blocks separated by one or more empty lines
  const blocks = content.split(/\n\s*\n/);

  return (
    <>
      {blocks.map((block, blockIndex) => {
        const lines = block.split('\n');
        // A block is a list if all its non-empty lines start with '-'
        const isList = lines.filter(line => line.trim() !== '').every(line => line.trim().startsWith('-'));

        if (isList) {
          return (
            <ul key={blockIndex} className="list-disc list-outside space-y-1 pl-5 my-4 text-sm leading-relaxed" style={{ color: "var(--tng-text-2)", fontFamily: "'Inter', sans-serif" }}>
              {lines.map((item, itemIndex) => (
                <li key={itemIndex}>{parseInline(item.replace(/^- /, ''))}</li>
              ))}
            </ul>
          );
        }

        // Otherwise, it's a paragraph that might contain manual line breaks
        return (
            <p key={blockIndex} className="my-4 text-sm leading-relaxed" style={{ color: "var(--tng-text-2)", fontFamily: "'Inter', sans-serif" }}>
                {lines.map((line, i) => (<Fragment key={i}>{parseInline(line)}{i < lines.length - 1 && <br />}</Fragment>))}
            </p>
        );
      })}
    </>
  );
};

export function LessonViewer({ module, initialLesson, progress, onClose, onCompleteLesson }: LessonViewerProps) {
  const { isDark } = useTheme();
  const [currentLesson, setCurrentLesson] = useState(initialLesson);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<"unanswered" | "correct" | "incorrect">("unanswered");

  const lessonContent = currentLesson.translations.en;
  const quiz = lessonContent.quiz;

  const isLessonComplete = progress.completedLessons.has(currentLesson.id);

  const handleSelectChoice = (choiceId: string) => {
    if (quizStatus !== "unanswered") return;
    setSelectedChoice(choiceId);
    const isCorrect = choiceId === quiz.correctChoiceId;
    setQuizStatus(isCorrect ? "correct" : "incorrect");
    if (isCorrect && !isLessonComplete) {
      onCompleteLesson(currentLesson.id);
    }
  };

  const goToLesson = (direction: "next" | "prev") => {
    const currentIndex = module.lessons.findIndex(l => l.id === currentLesson.id);
    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < module.lessons.length) {
      setCurrentLesson(module.lessons[nextIndex]);
      setSelectedChoice(null);
      setQuizStatus("unanswered");
    }
  };

  const currentIndex = module.lessons.findIndex(l => l.id === currentLesson.id);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < module.lessons.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border overflow-hidden ${isDark ? "bg-[#0C1A3A] border-white/15" : "bg-white border-slate-200"}`}
      >
        <div className={`p-5 border-b ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--tng-gold-text)" }}>{module.title}</p>
              <p className="text-xs" style={{ color: "var(--tng-text-3)" }}>Lesson {currentLesson.order} of {module.lessons.length}</p>
            </div>
            <button onClick={onClose} className={`p-2 rounded-full ${isDark ? "hover:bg-white/10" : "hover:bg-slate-100"}`}>
              <X size={18} style={{ color: "var(--tng-text-3)" }} />
            </button>
          </div>
          <div className={`h-1.5 w-full rounded-full mt-3 ${isDark ? "bg-white/10" : "bg-slate-100"}`}>
            <motion.div
              className="h-1.5 rounded-full bg-gradient-to-r from-[#F5B800] to-[#FFD44D]"
              initial={{ width: `${(currentIndex / module.lessons.length) * 100}%` }}
              animate={{ width: `${((currentIndex + 1) / module.lessons.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-xl font-bold mb-2" style={{ color: "var(--tng-text-1)" }}>{lessonContent.title}</h2>
          <MarkdownRenderer content={lessonContent.content} />

          <div className={`my-6 border-t ${isDark ? "border-white/10" : "border-slate-200"}`} />

          <h3 className="text-sm font-bold mb-3" style={{ color: "var(--tng-text-1)" }}>Knowledge Check</h3>
          <p className="text-sm mb-4" style={{ color: "var(--tng-text-2)" }}>{quiz.question}</p>
          <div className="space-y-2">
            {quiz.choices.map(choice => {
              const isSelected = selectedChoice === choice.id;
              const isCorrect = choice.id === quiz.correctChoiceId;
              let state: "default" | "correct" | "incorrect" = "default";
              if (isSelected && quizStatus === "correct") state = "correct";
              if (isSelected && quizStatus === "incorrect") state = "incorrect";
              if (!isSelected && quizStatus !== "unanswered" && isCorrect) state = "correct";

              return (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice.id)}
                  disabled={quizStatus !== "unanswered"}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm flex items-center gap-3
                    ${state === "correct" ? "border-green-500 bg-green-500/10" : ""}
                    ${state === "incorrect" ? "border-red-500 bg-red-500/10" : ""}
                    ${state === "default" ? (isDark ? "border-white/10 hover:border-white/20 bg-white/5" : "border-slate-200 hover:border-slate-300 bg-slate-50") : ""}
                  `}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${state === "correct" ? "border-green-500 bg-green-500" : state === "incorrect" ? "border-red-500 bg-red-500" : isDark ? "border-white/20" : "border-slate-300"}`}>
                    {state === "correct" && <Check size={12} className="text-white" />}
                    {state === "incorrect" && <X size={12} className="text-white" />}
                  </div>
                  <span style={{ color: "var(--tng-text-1)" }}>{choice.text}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {quizStatus !== "unanswered" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg text-sm flex items-start gap-3 ${quizStatus === "correct" ? "bg-green-500/10 text-green-300" : "bg-red-500/10 text-red-300"}`}
              >
                {quizStatus === "correct" ? <Check size={16} className="text-green-400 mt-0.5" /> : <AlertTriangle size={16} className="text-red-400 mt-0.5" />}
                <p className="flex-1">{quiz.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className={`p-4 border-t flex justify-between items-center ${isDark ? "border-white/10" : "border-slate-200"}`}>
          <button onClick={() => goToLesson("prev")} disabled={!canGoPrev} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-40" style={{ color: "var(--tng-text-2)" }}>
            <ChevronLeft size={16} /> Prev
          </button>
          <button onClick={() => goToLesson("next")} disabled={!canGoNext} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-40" style={{ color: "var(--tng-text-2)" }}>
            Next <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}