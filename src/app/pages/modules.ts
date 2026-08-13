import { Module } from "./index";
import { lessons } from "./lessons";
import { badges } from "./badges";

export const modules: Module[] = [
  { id: 1, title: "Spotting Fake Headlines", level: "Beginner", desc: "Learn how misleading headlines are written and how to identify them at a glance.", badge: badges[0], lessons: lessons.filter(l => l.moduleId === 1) },
  { id: 2, title: "Understanding Visual Misinformation", level: "Beginner", desc: "Discover how images and videos are manipulated to spread false narratives.", badge: badges[1], lessons: lessons.filter(l => l.moduleId === 2) },
  { id: 3, title: "Social Media Scam Patterns", level: "Intermediate", desc: "Recognize common scam tactics on Facebook, TikTok, and messaging apps.", badge: badges[2], lessons: lessons.filter(l => l.moduleId === 3) },
  { id: 4, title: "Election & Political Misinformation", level: "Intermediate", desc: "Understand how political misinformation spreads and how to verify claims.", badge: badges[3], lessons: lessons.filter(l => l.moduleId === 4) },
  {
    id: 5,
    title: "Health & Medical Claims",
    level: "Intermediate",
    desc: "Evaluate health claims and understand how to find credible medical information.",
    badge: badges[4],
    lessons: lessons.filter(l => l.moduleId === 5),
    dependsOn: [1, 2] // Must complete modules 1 and 2
  },
  {
    id: 6,
    title: "AI and Deepfake Awareness",
    level: "Advanced",
    desc: "Understand AI-generated content and tools to detect manipulated media.",
    badge: badges[5],
    lessons: lessons.filter(l => l.moduleId === 6),
    dependsOn: [3, 4] // Must complete modules 3 and 4
  },
];