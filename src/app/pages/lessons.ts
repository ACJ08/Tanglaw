import { Lesson } from "./index";

export const lessons: Lesson[] = [
  // Module 1: Spotting Fake Headlines (5 lessons)
  {
    id: "m1-l1", moduleId: 1, order: 1, estimatedMinutes: 2,
    translations: {
      en: {
        title: "What Makes a Headline Misleading?",
        description: "Understand the core difference between a factual and a misleading headline.",
        content: "A headline's job is to summarize an article. Misleading headlines often use tricks to get you to click, even if the story doesn't support the claim. They might be technically true but leave out key information (context), use emotional words, or ask a question they don't answer.",
        quiz: {
          question: "A headline can be technically accurate but still misleading. True or False?",
          choices: [{ id: "a", text: "True" }, { id: "b", text: "False" }],
          correctChoiceId: "a",
          explanation: "True. Leaving out important context is a common way to mislead readers. For example, 'Stock Market Crashes!' might be true for a tiny, irrelevant market, but it's framed to make you think it's a major crisis."
        }
      }
    }
  },
  {
    id: "m1-l2", moduleId: 1, order: 2, estimatedMinutes: 2,
    translations: {
      en: {
        title: "Emotional Language",
        description: "Identify words designed to make you feel, not think.",
        content: "Scare words like 'SHOCKING', 'WARNING', or 'SECRET' are huge red flags. They are designed to trigger an emotional reaction (fear, anger, curiosity) so you share the story without thinking critically. Professional news sources use neutral, factual language.",
        quiz: {
          question: "Which headline uses the most emotional language?",
          choices: [
            { id: "a", text: "New Study on Coffee Released by University" },
            { id: "b", text: "SHOCKING TRUTH About Coffee They Don't Want You To Know!" }
          ],
          correctChoiceId: "b",
          explanation: "The second headline uses 'SHOCKING TRUTH' and implies a conspiracy ('They Don't Want You To Know!'), which are classic emotional manipulation tactics."
        }
      }
    }
  },
  {
    id: "m1-l3", moduleId: 1, order: 3, estimatedMinutes: 1,
    translations: {
      en: {
        title: "Clickbait Patterns",
        description: "Recognize common clickbait phrases.",
        content: "Clickbait headlines create a 'curiosity gap'. They tease you with information but force you to click to find out what it is. Common patterns include:\n- 'You won't believe what happened next...'\n- '...and the reason why will surprise you.'\n- 'Number 3 will shock you!'",
        quiz: {
          question: "Is 'The One Trick to Lower Your Electric Bill' a likely clickbait headline?",
          choices: [{ id: "a", text: "Yes" }, { id: "b", text: "No" }],
          correctChoiceId: "a",
          explanation: "Yes, it creates a curiosity gap by promising a single, simple solution without providing any details, forcing you to click."
        }
      }
    }
  },
  {
    id: "m1-l4", moduleId: 1, order: 4, estimatedMinutes: 2,
    translations: {
      en: {
        title: "Missing Context",
        description: "Learn how leaving out information can change the story.",
        content: "A headline might say 'Famous Actor Seen Arguing in Public'. The article might reveal the 'argument' was just a scene being filmed for a movie. The headline isn't technically false, but it's deeply misleading because it omits the crucial context that it was a performance.",
        quiz: {
          question: "If a headline is true, can it still be misinformation?",
          choices: [{ id: "a", text: "Yes, if it omits key context." }, { id: "b", text: "No, if it's true, it's not misinformation." }],
          correctChoiceId: "a",
          explanation: "Absolutely. Misinformation isn't just about lies; it's also about deception. Using a fact out of context to create a false impression is a common and effective tactic."
        }
      }
    }
  },
  {
    id: "m1-l5", moduleId: 1, order: 5, estimatedMinutes: 1,
    translations: {
      en: {
        title: "Headline Verification Challenge",
        description: "Put your new skills to the test.",
        content: "Before sharing, always ask yourself: \n1. Does it use emotional words? \n2. Is it creating a curiosity gap? \n3. Does it feel like it's missing context? \nIf you answer 'yes' to any of these, pause and verify before you share.",
        quiz: {
          question: "What is the first thing you should do when you see a shocking headline?",
          choices: [{ id: "a", text: "Share it immediately to warn others." }, { id: "b", text: "Pause, and check for red flags." }],
          correctChoiceId: "b",
          explanation: "Always pause. The goal of sensational headlines is to make you react instantly. Taking a moment to think is your best defense."
        }
      }
    }
  },

  // Module 2: Understanding Visual Misinformation (6 lessons)
  {
    id: "m2-l1", moduleId: 2, order: 1, estimatedMinutes: 2,
    translations: {
      en: {
        title: "What is Visual Misinformation?",
        description: "Learn why images and videos are so persuasive and easy to misuse.",
        content: "Visual misinformation uses images or videos to deceive. Because we often believe what we see, a powerful image can be more convincing than text. Scammers and propagandists exploit this by sharing real photos with false captions, old photos as new events, or digitally altered content to create a false narrative.",
        quiz: {
          question: "A real, unedited photograph can still be used to spread misinformation. True or False?",
          choices: [{ id: "a", text: "True" }, { id: "b", text: "False" }],
          correctChoiceId: "a",
          explanation: "True. The most common form of visual misinformation is a real photo or video presented with false context. For example, a photo of a flood from 2012 being shared as if it happened yesterday."
        }
      }
    }
  },
  {
    id: "m2-l2", moduleId: 2, order: 2, estimatedMinutes: 2,
    translations: {
      en: {
        title: "Context is Key",
        description: "Understand how removing context changes the story.",
        content: "An image without context is just data. Misinformation thrives when context is removed. Key context clues to look for are:\n- **Date:** When was it taken?\n- **Location:** Where was it taken?\n- **Original Source:** Who took it and why?\nCropping an image to remove important background details or cutting a video short can completely change its meaning.",
        quiz: {
          question: "A video shows a politician making an angry statement. What context is most important to verify?",
          choices: [
            { id: "a", text: "The quality of the video." },
            { id: "b", text: "What was said or done right before the clip started." }
          ],
          correctChoiceId: "b",
          explanation: "The surrounding context is crucial. The politician might have been responding to a provocative question or a heckler, but cutting the video to only show their reaction is a classic manipulation tactic."
        }
      }
    }
  },
  {
    id: "m2-l3", moduleId: 2, order: 3, estimatedMinutes: 2,
    translations: {
      en: {
        title: "Basic Image Manipulation",
        description: "Learn to spot common digital editing red flags.",
        content: "Simple editing tools can alter reality. Look for:\n- **Inconsistent Lighting:** Shadows on one person don't match others.\n- **Strange Edges:** Blurry or jagged edges around a person or object can indicate it was pasted in.\n- **Repeated Patterns:** A cloned crowd or background element might have identical features.\n- **Impossible Physics:** Objects floating or bending unnaturally.",
        quiz: {
          question: "You see a photo with a person who seems to have no shadow on a sunny day. What is this a sign of?",
          choices: [
            { id: "a", text: "A high-quality camera." },
            { id: "b", text: "Potential digital manipulation." }
          ],
          correctChoiceId: "b",
          explanation: "Inconsistent lighting and shadows are a major red flag that an element may have been digitally added to a photo."
        }
      }
    }
  },
  {
    id: "m2-l4", moduleId: 2, order: 4, estimatedMinutes: 2,
    translations: {
      en: {
        title: "AI and Deepfakes",
        description: "An introduction to AI-generated media.",
        content: "Artificial Intelligence can now create realistic but completely fake images, videos, and audio ('deepfakes'). Clues to spot them include:\n- **Unnatural Blinking:** The person in the video blinks too much or not at all.\n- **Awkward facial movements:** The mouth movements don't perfectly sync with the audio.\n- **Weird details:** Look at hands, ears, and teeth. AI often struggles to render these perfectly.",
        quiz: {
          question: "If a video looks very realistic, can you assume it's real?",
          choices: [{ id: "a", text: "Yes, seeing is believing." }, { id: "b", text: "No, deepfake technology can create convincing fake videos." }],
          correctChoiceId: "b",
          explanation: "No. Deepfake technology is advancing quickly. Always question the source of a video, especially if it's sensational or emotionally charged, regardless of how real it looks."
        }
      }
    }
  },
  {
    id: "m2-l5", moduleId: 2, order: 5, estimatedMinutes: 2,
    translations: {
      en: {
        title: "How to Verify Images",
        description: "Learn the basics of reverse image searching.",
        content: "Don't just look at the image, investigate it. A powerful tool is the 'reverse image search' (available on Google Images, TinEye, and others). This lets you upload an image to find where else it has appeared online. This can help you find the original source, date, and context.",
        quiz: {
          question: "What is the primary goal of a reverse image search?",
          choices: [
            { id: "a", text: "To find higher quality versions of the image." },
            { id: "b", text: "To find the original source and see how it's been used before." }
          ],
          correctChoiceId: "b",
          explanation: "A reverse image search is a key verification step. It helps you trace an image back to its origin, revealing if it's old, from a different event, or has been altered."
        }
      }
    }
  },
  {
    id: "m2-l6", moduleId: 2, order: 6, estimatedMinutes: 2,
    translations: {
      en: {
        title: "Final Challenge: Become an Image Verifier",
        description: "Apply your skills to a real-world scenario.",
        content: "You see a photo on Facebook of a massive crowd at a political rally for Candidate X. The caption says it was taken this morning. What is the BEST first step to verify this?",
        quiz: {
          question: "What is the BEST first step?",
          choices: [
            { id: "a", text: "Comment on the post and ask if it's real." },
            { id: "b", text: "Share it, but add a note saying 'not verified'." },
            { id: "c", text: "Perform a reverse image search to see if the photo is from a previous event." }
          ],
          correctChoiceId: "c",
          explanation: "Performing a reverse image search is the most effective first step. It can quickly reveal if the photo is old or from a different event entirely, which is a very common tactic in political misinformation."
        }
      }
    }
  },

  // Module 3: Social Media Scam Patterns (8 lessons)
  {
    id: "m3-l1", moduleId: 3, order: 1, estimatedMinutes: 2,
    translations: {
      en: {
        title: "Recognizing Social Media Scams",
        description: "Learn the common red flags of social media scams.",
        content: "Scammers love social media because it's easy to create fake profiles and reach many people. They often use tactics like:\n- **Urgency:** 'Act now or lose this offer!'\n- **Emotion:** 'Help! I'm in trouble and need money.'\n- **Too-good-to-be-true offers:** 'Win a free iPhone, just click here!'\nAlways be suspicious of messages that try to make you panic or get overly excited.",
        quiz: {
          question: "A message that creates a strong sense of urgency is often...",
          choices: [{ id: "a", text: "A legitimate, important warning." }, { id: "b", text: "A tactic used by scammers to make you act without thinking." }],
          correctChoiceId: "b",
          explanation: "Correct. Scammers create urgency to prevent you from taking the time to verify the message. If it's truly urgent, you can always verify it through an official channel (e.g., calling your bank directly)."
        }
      }
    }
  },
  // ... (7 more lessons for Module 3 will be added here)

  // Module 4: Election & Political Misinformation (9 lessons)
  {
    id: "m4-l1", moduleId: 4, order: 1, estimatedMinutes: 2,
    translations: {
      en: {
        title: "What Is Political Misinformation?",
        description: "Learn to distinguish between legitimate political debate and deceptive content.",
        content: "Political misinformation is false or misleading information spread to influence public opinion, often by making a candidate look better or worse. It can include out-of-context quotes, manipulated videos, or fake statistics. The goal is not to inform, but to persuade through deception. It's crucial to separate these tactics from legitimate political commentary and criticism.",
        quiz: {
          question: "Is criticizing a politician's policy always misinformation?",
          choices: [
            { id: "a", text: "Yes, any negative comment is misinformation." },
            { id: "b", text: "No, criticism based on facts is part of healthy debate. Misinformation involves deception." }
          ],
          correctChoiceId: "b",
          explanation: "Correct. A healthy democracy relies on open debate. Misinformation is not about disagreement; it's about the use of false or manipulated information to deceive the public."
        }
      }
    }
  },
  // ... (8 more lessons for Module 4 will be added here)

  // Module 5: Health & Medical Claims (7 lessons)
  ...Array.from({ length: 7 }, (_, i) => ({
    id: `m5-l${i + 1}`, moduleId: 5, order: i + 1, estimatedMinutes: 2,
    translations: { en: { title: `Health Claims Lesson ${i + 1}`, description: "...", content: "...", quiz: { question: "?", choices: [], correctChoiceId: "", explanation: "" } } }
  })),

  // Module 6: AI and Deepfake Awareness (10 lessons)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `m6-l${i + 1}`, moduleId: 6, order: i + 1, estimatedMinutes: 2,
    translations: { en: { title: `AI/Deepfake Lesson ${i + 1}`, description: "...", content: "...", quiz: { question: "?", choices: [], correctChoiceId: "", explanation: "" } } }
  })),
];