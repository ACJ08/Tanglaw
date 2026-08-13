# React App Development with AI

## 1. Assignment Overview

This project was developed as an independent React application with AI used as a development assistant throughout the implementation process.

## 2. Completed Application

### Tanglaw

**Title:** Tanglaw: Bringing Trusted Information Within Reach, Anywhere

Tanglaw is an offline-first Media and Information Literacy platform designed to help users learn about misinformation, verify information, participate in community verification, and access trusted information in constrained connectivity environments.

### Main Features

- Learning Center
- Community Verification
- Threat Ledger
- Crisis Mode
- Information Verification
- Offline-first functionality
- Local data persistence
- Light and Dark theme support
- Responsive interface

## 3. AI-Assisted Development

AI was used as a development assistant throughout the implementation process.

AI assistance was used for:

- Analyzing the existing codebase
- Understanding the existing architecture
- Planning feature implementations
- React and TypeScript development
- Debugging errors
- Refactoring
- UI/UX improvements
- Local-first persistence
- Testing and validation
- Identifying potential edge cases

AI-generated code was reviewed before being integrated into the application.

## 4. Development Approach

The development process generally followed this workflow:

1. Inspect the existing project
2. Identify the problem or required feature
3. Create a detailed development prompt
4. Ask AI to analyze the existing implementation
5. Review the proposed implementation
6. Integrate or modify the generated code
7. Run the application
8. Identify errors
9. Manually correct and refine the implementation
10. Test the feature again
11. Validate the final implementation

## 5. AI Development Prompts

### Learning Center

Prompt:
Make the Existing Liyab Learn Page Fully Functional
Act as a senior React/TypeScript full-stack developer, frontend engineer, backend engineer, UI/UX designer, local data-layer architect, authentication/RBAC engineer, and future Supabase integration engineer.
I am giving you my existing LearnPage.tsx.
I do NOT want you to redesign the page from scratch.
I want you to take the existing implementation and transform it from a mostly static UI into a fully functional learning experience running on localhost.
IMPORTANT CONTEXT
I currently do not have access to the Supabase database.
Therefore:
•	Do NOT make Supabase access a blocker.
•	Do NOT wait for database credentials.
•	Do NOT replace the existing page with a static mockup.
•	Do NOT hardcode the final functionality into the UI.
•	Build a complete local data/persistence layer for development.
•	Structure the code so that the local implementation can later be replaced by Supabase.
The goal is:
Fully functional locally now → easy Supabase migration later.
________________________________________
1. START WITH THE EXISTING LearnPage.tsx
First inspect the exact LearnPage.tsx I provided.
The existing page already contains:
•	PageLayout
•	ThemeContext
•	dark/light theme support
•	motion/react
•	Liyab learning illustration
•	existing visual styling
•	six learning modules
•	progress UI
•	module cards
•	locked/unlocked states
•	module expansion
•	badges
•	difficulty levels
Preserve this existing visual identity.
Do NOT unnecessarily rewrite the entire design.
The current page already has the desired visual foundation, including the "Media Literacy Center" header, "Learn with Liyab" introduction, overall progress section, and learning-module cards.
________________________________________
2. CURRENT PROBLEM
The current page is visually implemented but not actually a learning system.
For example, the modules are currently hardcoded:
const modules = [
  {
    id: 1,
    title: "Spotting Fake Headlines",
    ...
    completed: 5,
    ...
  }
]
The progress is calculated directly from those static values:
const totalProgress = modules.reduce(...)
const totalLessons = modules.reduce(...)
And the badge/level information is currently static UI text.
The module button also currently does not actually launch a lesson experience.
I want you to replace this static behavior with actual functionality.
________________________________________
3. DO NOT THROW AWAY THE EXISTING UI
Preserve:
•	Existing colors
•	Existing typography
•	Existing cards
•	Existing animations
•	Existing dark/light theme behavior
•	Existing Liyab illustration
•	Existing responsive layout
•	Existing overall page hierarchy
Improve the UX where necessary, but do not redesign the Learn Tab unnecessarily.
The goal is:
Existing UI
     ↓
Functional data
     ↓
Functional lessons
     ↓
Functional quizzes
     ↓
Functional progress
     ↓
Functional badges
     ↓
Functional levels
________________________________________
4. CREATE A LOCAL LEARNING DATA SYSTEM
Because Supabase is unavailable, create a local development repository.
The architecture should look approximately like:
LearnPage.tsx
      ↓
Learning Service
      ↓
Learning Repository
      ↓
Local Storage / IndexedDB
The UI should NOT directly manipulate localStorage.
For example:
learningService.getModules()
learningService.getUserProgress()
learningService.startLesson()
learningService.completeLesson()
learningService.submitQuiz()
learningService.getBadges()
learningService.getLevel()
The exact architecture should follow the existing project's conventions.
________________________________________
5. IMPORTANT: MAKE IT MIGRATION-FRIENDLY
Later, I want to replace the local repository with Supabase.
Therefore structure it like:
LearningRepository
├── LocalLearningRepository
└── SupabaseLearningRepository (future)
The React components should depend on the repository/service interface rather than directly on localStorage.
Later:
LocalLearningRepository
can be replaced with:
SupabaseLearningRepository
without rewriting the entire Learn UI.
________________________________________
6. CREATE REAL LEARNING CONTENT
The six existing modules must become real learning modules.
Use these exact modules:
1. Spotting Fake Headlines
Beginner
8 minutes
5 lessons
Description:
Learn how misleading headlines are written and how to identify them at a glance.
Badge:
Headline Detective
________________________________________
2. Understanding Visual Misinformation
Beginner
12 minutes
6 lessons
Description:
Discover how images and videos are manipulated to spread false narratives.
Badge:
Image Verifier
________________________________________
3. Social Media Scam Patterns
Intermediate
15 minutes
8 lessons
Description:
Recognize common scam tactics on Facebook, TikTok, and messaging apps.
Badge:
Scam Shield
________________________________________
4. Election & Political Misinformation
Intermediate
18 minutes
9 lessons
Description:
Understand how political misinformation spreads and how to verify claims.
Badge:
Election Guardian
________________________________________
5. Health & Medical Claims
Intermediate
14 minutes
7 lessons
Description:
Evaluate health claims and understand how to find credible medical information.
Badge:
Health Verifier
________________________________________
6. AI and Deepfake Awareness
Advanced
20 minutes
10 lessons
Description:
Understand AI-generated content and tools to detect manipulated media.
Badge:
Digital Truth Seeker
________________________________________
7. TOTAL LESSON COUNT
The system must contain:
5
+ 6
+ 8
+ 9
+ 7
+ 10
= 45 lessons
The page should dynamically calculate:
Total lessons = 45
Do NOT hardcode:
45 lessons
into the UI.
________________________________________
8. CREATE INDIVIDUAL LESSONS
Every module needs actual lessons.
For example:
Spotting Fake Headlines
1.	What Makes a Headline Misleading?
2.	Emotional Language
3.	Clickbait Patterns
4.	Missing Context
5.	Headline Verification Challenge
Do the same for all 45 lessons.
Each lesson should have:
{
  id,
  moduleId,
  title,
  description,
  order,
  estimatedMinutes,
  content,
  activity,
  quiz,
  completionRule
}
The exact data model can be improved if necessary.
________________________________________
9. LESSON CONTENT MUST BE MEANINGFUL
Do NOT generate placeholder content such as:
"This lesson teaches you about misinformation."
Each lesson should actually teach a useful media-literacy concept.
Use realistic Filipino/community-relevant examples where appropriate.
Examples can include:
•	Misleading Facebook posts
•	Clickbait headlines
•	Edited photos
•	Misleading screenshots
•	Scam messages
•	Fake government announcements
•	Health claims
•	AI-generated images
•	Deepfake videos
•	Misleading political claims
However, do not present fictional examples as real-world factual events.
Clearly label examples as educational scenarios when necessary.
________________________________________
10. LESSON VIEWER
When the user clicks:
Start Module
or:
Continue Module
do NOT merely expand the card.
Open a proper lesson experience.
It can be:
•	A dedicated route
•	A modal
•	A full-screen learning view
•	A nested learning page
Choose the approach that best fits the existing routing architecture.
The experience should include:
Module title

Lesson 1 of 5

Progress bar

Lesson title

Lesson content

Interactive activity

Knowledge check

Previous
Next
________________________________________
11. LESSON NAVIGATION
Users should be able to:
•	Start a module
•	Move to the next lesson
•	Go back to the previous lesson
•	Exit the lesson
•	Resume later
•	See which lessons are complete
•	Jump to previously completed lessons if appropriate
Do not allow users to become trapped inside a lesson.
________________________________________
12. REAL INTERACTIVE ACTIVITIES
Implement reusable activity types.
At minimum support:
Multiple Choice
Example:
Which headline is more trustworthy?
A. "SHOCKING!!! Scientists Don't Want You To Know This!"
B. "Researchers publish findings from a new study"
The user selects an answer.
________________________________________
True / False
Example:
A headline can be technically accurate while still being misleading.
________________________________________
Identify the Red Flag
Show a claim and ask the user to identify:
•	Emotional language
•	Missing context
•	Unsupported claim
•	Suspicious source
•	Manipulated framing
________________________________________
Compare Two Claims
Let users compare two versions and choose which is more trustworthy.
________________________________________
Scam Detection
Show a realistic educational scam scenario and ask the learner to identify warning signs.
________________________________________
Verification Sequence
Ask the learner to identify the correct verification order.
For example:
1. Check the original source
2. Find independent sources
3. Check date/context
4. Compare evidence
________________________________________
13. QUIZ BEHAVIOR
When the user submits an answer:
Show immediate feedback.
For example:
✓ Correct!

Why?

The headline uses emotional language and creates urgency without providing evidence.
Or:
Not quite.

The stronger warning sign is the use of unsupported claims without a verifiable source.

Try again.
Do not just show:
Correct!
The explanation is part of the learning experience.
________________________________________
14. COMPLETION RULES
Opening a lesson does NOT automatically complete it.
A lesson becomes complete after the configured requirement is satisfied.
For example:
Read lesson
      ↓
Complete activity
      ↓
Pass knowledge check
      ↓
Lesson completed
Once completed:
lesson.completed = true
The system should then:
Update module progress
Update overall progress
Award XP
Check badge requirements
Check level progression
Update dashboard
________________________________________
15. LOCAL USER PROGRESS
Persist learning progress locally.
Track:
{
  userId,
  lessonId,
  startedAt,
  completedAt,
  completed,
  quizAttempts,
  bestScore,
  lastAccessedAt
}
Also track:
Current lesson
XP
Level
Badges
Preferred language
The data must survive:
•	Page refresh
•	Navigation
•	Browser restart
________________________________________
16. INITIAL DEMO STATE
I want the Learn page to initially resemble the current design.
Seed this progress:
Spotting Fake Headlines
5/5
Understanding Visual Misinformation
4/6
Social Media Scam Patterns
2/8
Election & Political Misinformation
0/9
Health & Medical Claims
0/7
AI and Deepfake Awareness
0/10
Therefore:
Completed = 11
Total = 45
The current page's progress display should dynamically produce:
11 / 45 lessons
rather than hardcoding it. The existing page already calculates the overall total from module data, so replace that source with the local learning repository.
________________________________________
17. BADGES
Implement actual badge logic.
Initial demo user can have:
2 badges earned
But this must come from stored badge records.
Create badges such as:
Headline Detective
Image Verifier
Scam Shield
Election Guardian
Health Verifier
Digital Truth Seeker
Media Literacy Champion
Award them based on actual completion conditions.
For example:
Complete Spotting Fake Headlines
        ↓
Headline Detective
Prevent duplicate badge awards.
________________________________________
18. LEVEL SYSTEM
Implement:
Level 1 — New Learner
Level 2 — Fact Finder
Level 3 — Verification Explorer
Level 4 — Media Literacy Defender
Level 5 — Community Truth Guardian
Use XP to determine the level.
For example:
Lesson completed = +10 XP
Quiz passed = +5 XP
Module completed = bonus XP
Make thresholds configurable.
The UI should dynamically display:
Level 2 — Fact Finder
based on actual XP.
________________________________________
19. CONTINUE LEARNING
The current module button says:
Continue Module
but does not currently launch a lesson.
Change this.
When clicked, it should find the user's first incomplete lesson and open it.
For example:
Module:
Understanding Visual Misinformation

Progress:
4 / 6

Button:
Continue Module

↓

Opens:

Lesson 5 of 6
If the module is not started:
Start Module
should open:
Lesson 1
If completed:
Review Module
should open the lesson list.
________________________________________
20. LOCKED MODULES
The current implementation has:
Health & Medical Claims → locked
AI and Deepfake Awareness → locked
Do not simply make the lock permanent.
Implement an actual unlock rule.
For example:
Complete required Beginner modules
        ↓
Unlock Health & Medical Claims
and:
Complete required Intermediate modules
        ↓
Unlock AI and Deepfake Awareness
However, choose sensible unlock rules that fit the learning progression.
Make the unlock conditions configurable.
The lock icon should represent an actual state, not decoration.
________________________________________
21. MODULE PROGRESS
The current page calculates:
const pct = (m.completed / m.lessons) * 100;
Replace this with actual user progress from the local learning service.
For every module calculate:
completed lessons
total lessons
percentage
status
Possible statuses:
Not Started
In Progress
Completed
Locked
________________________________________
22. LEARN DASHBOARD
Keep the existing dashboard layout, but make every section functional.
The header should dynamically show:
Your Progress
11 / 45 lessons
The badge count should come from the user's earned badges.
The level should come from the user's XP.
The progress bar should reflect actual completion.
The module cards should reflect actual progress.
The buttons should perform actual actions.
________________________________________
23. LANGUAGE SUPPORT
Support:
English
Filipino
Taglish
Add a language selector to the learning experience.
The lesson data should support translations.
For example:
lesson.translations = {
  en: {...},
  fil: {...},
  tl: {...}
}
If the project already has localization infrastructure, reuse it instead.
Do not build an unrelated translation system.
________________________________________
24. ROLE-BASED ACCESS
Inspect the existing project's roles before implementing this.
Do NOT invent conflicting roles.
Determine which existing roles need the Learn Tab.
At minimum, the system should be able to support:
Learner
Community Validator
Administrator
if those roles already exist.
Learner
Can:
•	View lessons
•	Complete lessons
•	Take quizzes
•	View own progress
•	Earn badges
•	Gain XP
•	View level
Community Validator
If applicable:
•	Access standard lessons
•	Access additional verification/media-literacy training if required
Administrator
May have access to:
•	Learning content management
•	Lesson management
•	Quiz management
•	Badge management
•	Aggregate analytics
Do not expose admin controls to ordinary learners.
________________________________________
25. DEVELOPMENT AUTHENTICATION
Because Supabase may not be available:
First inspect whether the existing application authentication works locally.
If it works:
Reuse it.
If authentication currently depends on unavailable Supabase services:
Create a development-only local user/session mechanism.
Do NOT pretend this is production authentication.
It should only allow us to test:
user
role
progress
permissions
locally.
________________________________________
26. RESET PROGRESS
Add a development-only reset function.
For example:
Reset Demo Progress
It should restore:
5/5
4/6
2/8
0/9
0/7
0/10
and reset:
•	XP
•	Badges
•	Level
•	Current lesson
•	Quiz attempts
This is useful for testing the learning flow repeatedly.
Make sure this is clearly a development feature and not exposed as a normal learner action in production.
________________________________________
27. RESPONSIVE UI
Preserve the existing responsive design.
The existing page already uses:
sm:
lg:
responsive layouts.
Maintain this approach.
The lesson viewer must also work on:
•	Desktop
•	Tablet
•	Mobile
Pay special attention to quizzes and lesson navigation on mobile.
________________________________________
28. ACCESSIBILITY
Ensure:
•	Keyboard navigation
•	Focus states
•	Semantic buttons
•	Accessible labels
•	Proper disabled states
•	Screen-reader-friendly quiz controls
•	Do not rely only on color for completion
•	Sufficient contrast
________________________________________
29. ERROR HANDLING
Handle:
•	Invalid module
•	Invalid lesson
•	Missing progress
•	Local storage failure
•	Corrupt saved data
•	Quiz submission failure
•	Unauthorized action
•	Locked module
•	Empty module
•	Missing content
Show friendly UI messages rather than raw errors.
________________________________________
30. DO NOT BREAK EXISTING CODE
Do not:
•	Remove PageLayout
•	Remove ThemeContext
•	Remove existing dark/light behavior
•	Remove the Liyab image
•	Break existing navigation
•	Break other Tanglaw pages
•	Replace unrelated components
•	Modify unrelated features
•	Add unnecessary dependencies
Reuse existing utilities/components wherever possible.
________________________________________
31. FILE ORGANIZATION
Before creating files, inspect the project's existing structure.
Then create only what is actually necessary.
A possible structure is:
learning/
├── data/
│   ├── modules.ts
│   ├── lessons.ts
│   ├── badges.ts
│   └── levels.ts
│
├── services/
│   └── learningService.ts
│
├── repositories/
│   ├── LearningRepository.ts
│   └── LocalLearningRepository.ts
│
├── types/
│   └── learning.ts
│
└── components/
    ├── LessonViewer.tsx
    ├── Quiz.tsx
    ├── ModuleLessons.tsx
    ├── BadgeCard.tsx
    └── LevelProgress.tsx
But adapt this to the existing codebase.
Do not blindly create this structure if the project already has a feature architecture.
________________________________________
32. TEST THE COMPLETE USER JOURNEY
After implementation, test this exact flow:
Open Learn Tab
        ↓
See 11/45 progress
        ↓
Click Understanding Visual Misinformation
        ↓
Click Continue Module
        ↓
Open Lesson 5
        ↓
Read lesson
        ↓
Complete interactive activity
        ↓
Answer quiz
        ↓
Receive explanation
        ↓
Complete lesson
        ↓
XP increases
        ↓
Progress becomes 12/45
        ↓
Module becomes 5/6
        ↓
Return to Learn dashboard
        ↓
Dashboard reflects new progress
        ↓
Refresh browser
        ↓
Progress remains 12/45
Test this end-to-end.
________________________________________
33. TEST THE MODULE COMPLETION FLOW
Complete the remaining lesson.
Expected:
6/6 completed
Then:
Module Completed
Then:
Badge condition checked
Then:
Badge awarded if applicable
Then:
XP updated
Then:
Level recalculated
________________________________________
34. TEST LOCKED MODULES
Verify that locked modules cannot be opened.
Then complete the required prerequisites.
Verify that:
Locked
becomes:
Available
without manually changing the source code.
________________________________________
35. FINAL CODE QUALITY
Before finishing:
Run the project's existing:
npm run lint
npm run build
and any available type-check/test commands.
Fix errors introduced by the implementation.
Do not claim a test passed if it was not actually executed.
________________________________________
36. FINAL REPORT
After implementing, give me:
1. What was changed
Explain exactly what you changed from the original LearnPage.tsx.
2. New files
List every file created.
3. Learning system
Explain how modules, lessons, quizzes, progress, badges, and levels work.
4. Local persistence
Explain where progress is stored and how it survives refresh/restart.
5. Role-based access
Explain how roles are handled locally.
6. Supabase migration
Explain exactly how we can later replace the local repository with Supabase.
7. Testing
Report:
PASS
FAIL
NOT RUN
for:
•	TypeScript
•	Lint
•	Build
•	Learning flow
•	Progress persistence
•	Quiz
•	Badge
•	Level
•	Role access
•	Responsive behavior
________________________________________
MOST IMPORTANT INSTRUCTION
Do not simply make LearnPage.tsx look functional. Make it actually functional.
The current page is already visually designed.
Your job is to turn:
Static modules
Static progress
Static badges
Static levels
Static locked states
Non-functional buttons
into:
Real modules
Real lessons
Real interactive activities
Real quizzes
Real completion
Real progress
Real persistence
Real XP
Real levels
Real badges
Real unlock conditions
Real role-aware behavior
while preserving the existing Liyab visual design.
Build it locally first. Do not require Supabase. Make the architecture Supabase-ready for later.


Act as an expert Full-Stack Developer, React/TypeScript Developer, Vite Developer, Backend Developer, Debugging Engineer, UI/UX Engineer, and Software Architect.
You are working on my Tanglaw project, an offline-first Media & Information Literacy platform. I need you to diagnose and fix the current development errors, with special attention to the Learning / Learn Tab.
1. Current Environment
Project directory:
C:/Users/acj32/Documents/Tanglaw
Tech stack includes:
•	React
•	TypeScript
•	Vite
•	Node.js
•	Express/Node backend
•	tsx
•	Tailwind CSS
•	Local development environment
•	Existing frontend/backend architecture
I currently run the project with:
npm run dev:full
which executes:
concurrently "npm run dev" "npm run server"
The frontend runs through Vite and the backend runs through:
tsx backend/src/server.ts
2. Current Terminal Output
When I run npm run dev:full, I get:
acj32@CarolJ MINGW64 C:/Users/acj32/Documents/Tanglaw (main)
$ npm run dev:full

> @Figma/my-make-file@0.0.1 dev:full
> concurrently "npm run dev" "npm run server"

[0]

[0] > @Figma/my-make-file@0.0.1 dev
[0] > vite

[0]

[1]

[1] > @Figma/my-make-file@0.0.1 server
[1] > tsx backend/src/server.ts

[0]

[0]   VITE v6.3.5  ready in 630 ms

[0]

[0]   ➜  Local:   http://localhost:5173/
[0]   ➜  Network: use --host to expose

[1] Tanglaw API listening

[0] 10:40:54 AM [vite] (client) Pre-transform error:
Failed to resolve import "@/app/features/learning/services/learningService"
from "src/app/pages/LearnPage.tsx". Does the file exist?

[0]   Plugin: vite:import-analysis
[0]   File:
C:/Users/acj32/Documents/Tanglaw/src/app/pages/LearnPage.tsx:9:28

[0]  24 |  import { useTheme } from "@/app/context/ThemeContext";
[0]  25 |  import { useAuth } from "@/app/context/AuthContext";
[0]  26 |  import LearningService from "@/app/features/learning/services/learningService";
[0]      |                               ^
[0]  27 |  import { LessonViewer } from "@/app/components/learning/LessonViewer";

[0]  28 |  const levelColor = {

[0] 10:40:55 AM [vite] Internal server error:
Failed to resolve import "@/app/features/learning/services/learningService"
from "src/app/pages/LearnPage.tsx". Does the file exist?

[0]       at TransformPluginContext._formatLog
[0]       at TransformPluginContext.error
[0]       at normalizeUrl
[0]       at EnvironmentPluginContainer.transform
[0]       at async Promise.all
[0]       at async TransformPluginContext.transform
The backend appears to start successfully:
Tanglaw API listening
Vite also starts successfully:
VITE v6.3.5 ready
Local: http://localhost:5173/
Therefore, do not assume the entire application or backend is broken. Diagnose the actual root cause.
________________________________________
3. Primary Error to Fix
The immediate error is:
Failed to resolve import "@/app/features/learning/services/learningService"
from "src/app/pages/LearnPage.tsx".
Does the file exist?
The problematic import is:
import LearningService from "@/app/features/learning/services/learningService";
Before modifying anything, investigate the repository structure.
Specifically verify:
src/
  app/
    features/
      learning/
        services/
          learningService
Determine whether:
1.	learningService.ts exists but is named differently.
2.	The file exists in another directory.
3.	The import path is incorrect.
4.	The file uses a different capitalization.
5.	The service was deleted or never created.
6.	The service exists but has a different export style.
7.	The @ alias is incorrectly configured.
8.	There are additional Learning Tab imports that will fail after this one is fixed.
Do not immediately create a duplicate learningService.ts.
First inspect the existing architecture and determine what the intended implementation is.
________________________________________
4. Inspect the Existing Project Before Editing
Before making changes, inspect the relevant files and directories, including but not limited to:
src/app/pages/LearnPage.tsx
src/app/features/
src/app/components/learning/
src/app/context/
src/app/
vite.config.*
tsconfig.json
tsconfig.app.json
package.json
backend/
Also search the entire repository for:
LearningService
learningService
LessonViewer
LearnPage
learning/
Look for:
•	Existing services
•	Existing API clients
•	Existing types/interfaces
•	Existing lesson data
•	Existing hooks
•	Existing contexts
•	Existing local-storage utilities
•	Existing backend endpoints
•	Existing mock data
•	Existing components
•	Existing database/Supabase integrations
•	Existing routing
•	Existing authentication logic
Reuse existing implementations whenever possible.
Do not introduce a second architecture when the project already has one.
________________________________________
5. Fix the Import Resolution Error Properly
Determine the actual cause of:
@/app/features/learning/services/learningService
If the file exists under a different path, update the import to the correct path.
If the file exists but has a different filename/capitalization, fix the import consistently.
If the service is genuinely missing, inspect the existing Learning Tab implementation and create the smallest appropriate service layer required by the current architecture.
If the @ alias itself is broken, inspect the Vite and TypeScript configuration and fix the alias consistently rather than replacing all imports with relative paths.
Do not use a temporary hack such as:
// @ts-ignore
or:
const LearningService = ...
just to make the compiler stop complaining.
The goal is a maintainable production-quality fix.
________________________________________
6. Fully Debug the Learning Tab
After fixing the initial import error, do not stop.
I also want you to:
Fix all errors and broken functionality in the Learning / Learn Tab.
Treat the Learning Tab as a complete feature that needs to work end-to-end.
Inspect LearnPage.tsx and all components/services it depends on.
Check for:
Frontend issues
•	TypeScript errors
•	Missing imports
•	Incorrect imports
•	Incorrect exports
•	Undefined variables
•	Undefined functions
•	Incorrect props
•	Incorrect component usage
•	Incorrect state management
•	Broken React hooks
•	Incorrect useEffect dependencies
•	Incorrect async behavior
•	Race conditions
•	Null/undefined values
•	Array .map() / .filter() errors
•	Incorrect object structures
•	Incorrect TypeScript interfaces
•	Broken routing
•	Broken navigation
•	Broken modal/dialog behavior
•	Broken lesson selection
•	Broken progress tracking
•	Broken completion states
•	Broken buttons
•	Broken loading states
•	Broken empty states
•	Broken error states
•	Responsive layout problems
Learning functionality
Verify that the Learning Tab can properly:
1.	Display available lessons.
2.	Organize lessons by the intended learning level/category.
3.	Display lesson metadata.
4.	Allow the user to select a lesson.
5.	Open the lesson viewer.
6.	Display lesson content correctly.
7.	Navigate through lesson content if applicable.
8.	Track lesson progress.
9.	Mark lessons as completed.
10.	Persist progress appropriately.
11.	Restore progress after refreshing the page.
12.	Handle incomplete lessons.
13.	Handle completed lessons.
14.	Handle empty lesson data.
15.	Handle loading states.
16.	Handle errors gracefully.
17.	Work for authenticated users.
18.	Avoid crashing if authentication information is temporarily unavailable.
________________________________________
7. Verify LessonViewer
Inspect:
src/app/components/learning/LessonViewer
Determine:
•	What props it expects.
•	What data structure it expects.
•	Whether LearnPage.tsx passes the correct props.
•	Whether the component has missing dependencies.
•	Whether it assumes lesson data that does not exist.
•	Whether it crashes on null/undefined content.
•	Whether navigation works.
•	Whether completion is correctly reported back to the parent page.
Do not rewrite LessonViewer unnecessarily.
Only modify it if there is a concrete bug or integration mismatch.
________________________________________
8. Verify the Learning Service
If LearningService is intended to exist, inspect how the application expects it to work.
Determine whether it should:
•	Load lesson data.
•	Fetch lessons from the backend.
•	Load local/mock lesson data.
•	Store progress locally.
•	Communicate with an API.
•	Communicate with Supabase.
•	Manage completion state.
•	Retrieve user progress.
Follow the architecture already present in the repository.
Important constraint
I currently do not want the application to depend on an unavailable remote database just to make the Learn Tab functional during local development.
If the existing backend/database is unavailable, implement a reliable local development fallback using the project's existing architecture, preferably:
•	local mock data
•	local JSON/static lesson data
•	localStorage
•	an existing local API endpoint
Do not invent a completely separate data architecture.
If the project already has a local API/backend implementation, use that instead.
________________________________________
9. Localhost-First Requirement
The project must be fully testable through:
http://localhost:5173/
and:
npm run dev:full
The Learning Tab should not require production deployment just to verify basic functionality.
If an external database/API is unavailable, the application should fail gracefully and use the existing local fallback where appropriate.
________________________________________
10. Check API Integration
Inspect the backend for Learning-related endpoints.
Search for things such as:
learning
lesson
lessons
progress
completion
Determine whether the frontend expects an API endpoint that doesn't exist.
If an endpoint exists:
•	Verify its URL.
•	Verify HTTP methods.
•	Verify request payloads.
•	Verify response structures.
•	Verify error handling.
If an endpoint does not exist but the frontend expects one, determine whether the correct solution is to use existing local data rather than unnecessarily adding a new backend endpoint.
Do not create unnecessary backend APIs.
________________________________________
11. Authentication Compatibility
Inspect:
src/app/context/AuthContext.tsx
and determine how the Learning Tab uses:
useAuth()
Make sure the Learn Tab does not crash when:
•	User is logged out.
•	User is still loading.
•	User data is undefined.
•	User profile is incomplete.
•	Authentication is unavailable in local development.
Use safe defaults where appropriate.
Do not bypass the application's authentication architecture.
________________________________________
12. Theme Compatibility
Inspect:
useTheme()
and make sure the Learning Tab correctly supports the application's existing light/dark theme behavior.
Do not introduce a new theme system.
Preserve the existing Tanglaw visual language.
________________________________________
13. UI/UX Requirements
While fixing functionality, preserve the existing design.
Do not unnecessarily redesign the entire Learn Tab.
Maintain:
•	Existing layout
•	Existing colors
•	Existing typography
•	Existing spacing
•	Existing components
•	Existing navigation
•	Existing responsive behavior
•	Existing Tanglaw branding
Only make UI changes when they are required to fix a broken interaction, improve accessibility, or prevent a functional problem.
The final Learning Tab should feel like an integrated part of Tanglaw, not a separate prototype.
________________________________________
14. Error Handling
Add proper handling for:
Loading
Show an appropriate loading state while lessons/progress are being retrieved.
Empty state
If no lessons are available, show a useful empty state instead of crashing.
Error state
If lesson loading fails, show a useful error message and provide a retry option if appropriate.
Invalid lesson
If a lesson ID is invalid or the lesson no longer exists, handle it gracefully.
Missing user
If progress depends on a user but the user is unavailable, do not crash the page.
________________________________________
15. TypeScript Quality
Do not solve errors by weakening TypeScript.
Avoid unnecessary:
any
Avoid:
as any
Avoid:
@ts-ignore
Avoid suppressing errors without understanding their cause.
Use proper:
•	Interfaces
•	Types
•	Type guards
•	Optional properties
•	Null checks
•	Default values
where appropriate.
________________________________________
16. Do Not Break Existing Features
This is extremely important.
Before changing code, understand the existing architecture.
Do not:
•	Rewrite unrelated pages.
•	Replace the project's routing system.
•	Replace the authentication system.
•	Replace the backend.
•	Replace the existing styling system.
•	Delete existing components without justification.
•	Remove working functionality.
•	Change package versions unnecessarily.
•	Install packages unless genuinely required.
•	Replace existing services with a new architecture.
•	Modify database migrations unless absolutely required.
Make the smallest clean changes necessary.
________________________________________
17. Validation Requirements
After making the changes, actually validate the solution.
Run:
npm run dev:full
Then verify:
http://localhost:5173/
Also run the project's available validation commands, such as:
npm run build
and, if available:
npm run lint
and:
npx tsc --noEmit
Use the actual scripts defined in package.json; do not assume scripts exist.
Fix any errors revealed by these checks.
________________________________________
18. Test the Learning Tab End-to-End
Manually verify the following flow:
Open Tanglaw
    ↓
Navigate to Learn
    ↓
LearnPage renders
    ↓
Lessons load
    ↓
Lesson cards render
    ↓
Select a lesson
    ↓
LessonViewer opens
    ↓
Lesson content renders
    ↓
Navigate/interact with lesson
    ↓
Complete lesson
    ↓
Progress updates
    ↓
Return to Learn page
    ↓
Completion state is reflected
    ↓
Refresh browser
    ↓
Progress remains available
Also test:
No lessons
Loading
API/local data failure
Unauthenticated user
Authenticated user
Invalid lesson
Completed lesson
Incomplete lesson
Browser refresh
________________________________________
19. Important Debugging Strategy
Do not assume that the first error is the only error.
Follow this cycle:
Inspect
↓
Identify root cause
↓
Make minimal fix
↓
Run TypeScript/build checks
↓
Run application
↓
Inspect next error
↓
Fix root cause
↓
Repeat
↓
Verify complete Learning Tab
Continue until the Learning Tab is functional and there are no obvious runtime, import, TypeScript, or build errors related to it.
________________________________________
20. Final Response Requirements
When you finish, give me a concise but useful summary containing:
Root cause
Explain exactly why this happened:
Failed to resolve import "@/app/features/learning/services/learningService"
Files changed
List every file you modified and briefly explain why.
Fixes made
Explain the important fixes.
Learning Tab status
Tell me what now works:
•	Lesson loading
•	Lesson selection
•	Lesson viewer
•	Progress
•	Completion
•	Persistence
•	Error handling
•	Authentication behavior
•	Localhost functionality
Validation
Tell me which commands you actually ran and whether they passed.
For example:
npm run dev:full — PASS
npm run build — PASS
npx tsc --noEmit — PASS
Do not claim a command passed unless you actually ran it.
Remaining issues
If something cannot be tested because of an unavailable external service/database, clearly state that instead of pretending it works.
________________________________________
Most Important Rule
Do not blindly patch the error. Investigate the existing Tanglaw codebase first, identify the intended Learning architecture, then make the smallest maintainable changes necessary to get the Learn Tab fully functional.
The immediate error is the starting point, not the entire task.
The final goal is:
A stable, fully functional Learning Tab running locally through npm run dev:full, without breaking the rest of Tanglaw.


### Community

[Insert the Community prompt here]

### Threat Ledger

Fully Functional Threat Ledger — LocalStorage-First Implementation
Act as a senior full-stack engineer, React/TypeScript architect, frontend engineer, offline-first systems engineer, UX/UI engineer, and debugging expert.
I am building Tanglaw, an offline-first Media and Information Literacy platform for Filipino communities.
I currently have a frontend implementation of my ThreatLedger.tsx, but I do not currently have access to my Supabase database. Therefore, I want you to make this page fully functional using LocalStorage as the temporary/local persistence layer.
Existing File
The main file is:
ThreatLedger.tsx
I will provide the existing implementation below.
IMPORTANT: Do not blindly rewrite the entire page. First understand the current architecture, styling, components, state management, and existing design system. Preserve the existing UI/UX unless a change is necessary for functionality.
________________________________________
PRIMARY OBJECTIVE
Convert the current Threat Ledger from a mostly static frontend into a fully interactive, persistent, offline-first LocalStorage implementation.
The application should work correctly when:
•	Supabase is unavailable
•	There is no backend
•	The user is offline
•	The browser is refreshed
•	The browser/tab is closed and reopened
•	The user performs actions repeatedly
•	The user has no existing LocalStorage data
The page must remain usable entirely on localhost.
Do not require Supabase for this implementation.
Do not add fake API calls that pretend to connect to Supabase.
Instead, create a clean abstraction so that LocalStorage can later be replaced by Supabase without rewriting the UI.
________________________________________
1. CREATE A LOCAL-FIRST DATA ARCHITECTURE
Do not keep all application state permanently inside hardcoded arrays.
Create a small LocalStorage-based persistence layer.
For example, you may create:
src/app/services/threatLedgerStorage.ts
or an equivalent location that matches the existing project architecture.
The storage layer should handle:
•	loading threats
•	saving threats
•	adding threats
•	updating threats
•	deleting threats if needed
•	updating report counts
•	marking threats as known
•	saving sync metadata
•	saving P2P-related state
•	saving cache statistics
•	resetting local data
Use strongly typed TypeScript interfaces.
For example, conceptually:
interface ThreatEntry {
  id: number | string;
  type: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  pattern: string;
  lastSeen: string;
  reports: number;
  verified?: boolean;
  known?: boolean;
  source?: string;
  createdAt?: string;
  updatedAt?: string;
}
You may improve this structure if necessary.
Do not use any unless absolutely unavoidable.
________________________________________
2. USE VERSIONED LOCALSTORAGE DATA
Create a clear namespace for Tanglaw Threat Ledger data.
For example:
tanglaw_threat_ledger
tanglaw_threat_ledger_version
tanglaw_threat_ledger_sync
tanglaw_threat_ledger_settings
You may use a better naming convention, but keep it organized.
Use a schema/version number so future migration to Supabase or another storage system is easier.
Example concept:
const STORAGE_KEY = "tanglaw_threat_ledger";
const STORAGE_VERSION = 1;
Handle malformed or corrupted LocalStorage data gracefully.
If parsing fails:
1.	Do not crash the application.
2.	Log the issue in development mode.
3.	Restore the default dataset.
4.	Save the repaired dataset.
________________________________________
3. INITIALIZE DEFAULT THREATS
Use my existing threatEntries as the initial dataset.
On first load:
•	Check LocalStorage.
•	If no threat ledger exists, initialize it with the existing threat entries.
•	If LocalStorage already contains data, load that data instead.
•	Never overwrite existing user data on every render.
This is extremely important.
The existing hardcoded threats should act as seed/demo data, not as the permanent source of truth.
________________________________________
4. MAKE SEARCH FULLY FUNCTIONAL
The existing search field:
Search threats by name or type...
must work against the LocalStorage-backed dataset.
Search should support:
•	threat title
•	threat type
•	pattern
•	severity
•	source if available
Make search:
•	case-insensitive
•	whitespace-tolerant
•	responsive
•	safe when the dataset is empty
Example:
Searching:
GCash
should find:
GCash Account Suspension Scam
Searching:
financial
should find:
Financial Scam
Searching:
critical
should show critical threats.
________________________________________
5. ADD THREAT FILTERING
Improve the Threat Ledger with functional filters while preserving the existing visual style.
Add filters for:
•	All
•	Critical
•	High
•	Medium
•	Low
•	Known
•	Unverified
If appropriate, include a compact filter UI near the search bar.
Filtering must operate on the LocalStorage dataset.
The selected filter should persist during the current session.
If reasonable, persist the selected filter to LocalStorage as well.
________________________________________
6. MAKE "MARK AS KNOWN" FUNCTIONAL
The current button:
Mark as Known
is currently only visual.
Make it functional.
When the user clicks it:
1.	Update the threat's known property.
2.	Save the updated threat to LocalStorage.
3.	Immediately update the UI.
4.	Show a clear visual state such as:
o	Known
o	Marked
o	check icon
5.	Prevent accidental duplicate actions.
6.	Allow the user to undo/unmark if appropriate.
Example:
Before:
Mark as Known
After:
✓ Known
If the user clicks again:
Mark as Unknown
or provide another appropriate interaction.
Do not reload the page.
________________________________________
7. MAKE COMMUNITY REPORT COUNTS INTERACTIVE
The existing:
847 community reports
should come from the LocalStorage-backed threat object.
If you implement a report action, it should:
•	increment the report count
•	persist the change
•	update the UI immediately
Do not fabricate network submissions.
If a reporting UI is added, clearly indicate that the report is stored locally and will be synchronized later when backend functionality exists.
________________________________________
8. IMPLEMENT REAL LOCAL SYNC BEHAVIOR
The existing:
Sync Now
button must become functional.
Since Supabase is unavailable, implement a Local Sync Simulation / Local Cache Refresh.
When clicked:
Step 1
Set syncing state.
Display:
Syncing...
Step 2
Animate the sync icon.
Step 3
Update the sync pipeline:
•	Device Offline
•	Connection Detected
•	Ledger Update
•	Community Sync
•	Devices Updated
The UI should visibly progress through these stages.
For example:
Device Offline       ✓
Connection Detected  ✓
Ledger Update        ⟳
Community Sync       ○
Devices Updated      ○
Then:
Device Offline       ✓
Connection Detected  ✓
Ledger Update        ✓
Community Sync       ✓
Devices Updated      ✓
Finally:
Synced ✓
Do not just wait 2.5 seconds and change the button.
The displayed synchronization state should actually correspond to the simulated process.
________________________________________
9. SAVE SYNC METADATA
Store information such as:
{
  lastSyncAt: "...",
  syncCount: 0,
  lastSyncStatus: "success"
}
in LocalStorage.
Display meaningful information such as:
Last synced: Just now
or:
Last synced: 12 minutes ago
instead of permanently hardcoding:
Last update: 12 min ago.
Use a helper function to format relative time.
Examples:
•	Just now
•	2 minutes ago
•	1 hour ago
•	Yesterday
•	3 days ago
________________________________________
10. IMPLEMENT CACHE STATISTICS
The current UI says:
214 threats cached
This should not remain hardcoded.
Calculate the actual number from the LocalStorage threat dataset.
Example:
214 threats cached
If there are only 6 seed threats, display:
6 threats cached
If the user adds threats locally, the number should update automatically.
Also consider displaying:
•	total threats
•	known threats
•	critical threats
•	pending local reports
if it fits the current UI without making it cluttered.
________________________________________
11. ADD LOCAL THREAT MANAGEMENT
The Threat Ledger should behave like a real local database.
Implement functionality to support:
•	adding a new threat
•	updating a threat
•	marking known
•	unmarking known
•	optionally deleting locally-created threats
•	updating report counts
•	persistence after refresh
If adding a threat requires a new modal/dialog, follow the existing Tanglaw visual language.
Suggested fields:
Threat Title
Threat Type
Severity
Threat Pattern
Source
Validation:
•	title required
•	type required
•	pattern required
•	severity required
Prevent invalid records from being saved.
________________________________________
12. DISTINGUISH SEEDED VS LOCALLY CREATED DATA
Add a field such as:
sourceType: "seed" | "local" | "community"
or an equivalent structure.
This will make future Supabase synchronization easier.
Example:
Seeded threat
Local report
Community threat
Do not expose this metadata unless it improves the UX.
________________________________________
13. IMPLEMENT "AUTO-DOWNLOAD" AS LOCAL CACHE BEHAVIOR
The existing card says:
Auto-Download
New threats sync automatically when you connect.
Since there is currently no backend, do not pretend that an actual network download is occurring.
Instead, implement a realistic local cache refresh simulation.
The UI can explain:
Threat updates are currently stored locally. Backend synchronization will be connected when the Supabase service is available.
If you simulate automatic synchronization, clearly treat it as a local demonstration.
Store the auto-sync preference in LocalStorage.
Example:
Auto-download updates
[ ON ]
The setting should persist after refresh.
________________________________________
14. IMPLEMENT P2P SHARING AS A LOCAL DEMO
The current interface has:
•	QR Code
•	Wi-Fi Direct
•	Bluetooth
buttons.
Do not leave them as dead buttons.
Since there is no backend, make them meaningful offline-first demonstrations.
QR Code
When clicked:
Open a modal showing a generated QR code representing the current local threat ledger or a serialized export payload.
The QR payload should NOT contain sensitive information.
For example, encode:
{
  "type": "tanglaw-threat-ledger",
  "version": 1,
  "threats": [...]
}
If a QR library already exists in the project, use it.
If not, choose a lightweight approach that fits the current project.
Wi-Fi Direct
Show a modal such as:
Wi-Fi Direct sharing
with:
Demo mode — device discovery is simulated locally.
Allow the user to simulate:
Find Nearby Device
and show a fake local device such as:
Tanglaw Device · Ready to Receive
Clearly label this as demo functionality.
Bluetooth
Same principle.
Do not pretend the browser has established a real Bluetooth connection unless the project explicitly implements the Web Bluetooth API.
________________________________________
15. ADD EXPORT / IMPORT FUNCTIONALITY
Because this is an offline-first application, users should be able to back up their local ledger.
Implement:
Export Ledger
Download the LocalStorage threat ledger as:
tanglaw-threat-ledger.json
The JSON should include:
•	version
•	exportedAt
•	threats
•	sync metadata if appropriate
Import Ledger
Allow the user to select a .json file.
Validate the structure before importing.
Do not overwrite existing data blindly.
Provide options such as:
•	Merge
•	Replace
•	Cancel
If implementing the full UI is too much, at minimum provide a safe import flow with validation.
________________________________________
16. HANDLE OFFLINE/ONLINE STATUS
Use the browser's:
navigator.onLine
and:
window.addEventListener("online", ...)
window.addEventListener("offline", ...)
to detect connectivity.
Display a small status indicator such as:
● Offline — Local ledger active
or:
● Online — Updates available
The application should continue functioning when offline.
Important:
Being online must NOT be required for the Threat Ledger to work.
________________________________________
17. HANDLE PAGE REFRESH CORRECTLY
Test this exact workflow:
1.	Open Threat Ledger.
2.	Mark a threat as known.
3.	Add/update a threat.
4.	Sync.
5.	Refresh the browser.
6.	Confirm all state remains.
Nothing should reset to the original hardcoded dataset.
________________________________________
18. HANDLE EMPTY STATES
If search returns no results, do not show a blank page.
Display an appropriate empty state:
No threats found

Try another search term or adjust your filters.
Provide:
Clear Search
button.
Also handle:
•	zero threats
•	corrupted LocalStorage
•	failed import
•	invalid import
•	sync failure simulation
without crashing.
________________________________________
19. ADD USER FEEDBACK
Every important action should provide feedback.
Examples:
Mark Known
Threat marked as known
Undo
Threat restored to unverified
Sync
Threat ledger synchronized locally
Export
Threat ledger exported successfully
Import
12 threats imported successfully
Error
Unable to import this file. The ledger format is invalid.
Use the project's existing toast/notification system if one exists.
Do not introduce another notification library if the project already has one.
________________________________________
20. DO NOT BREAK THE EXISTING DESIGN
This is extremely important.
Preserve:
•	current Tanglaw branding
•	current colors
•	dark/light mode
•	existing typography
•	animations
•	cards
•	responsive layout
•	existing PageLayout
•	ImageWithFallback
•	ThemeContext
•	existing icons
•	existing spacing system
The goal is:
same visual identity + dramatically improved functionality
Do not redesign the page unnecessarily.
________________________________________
21. RESPONSIVE DESIGN
Ensure all newly added functionality works on:
•	desktop
•	tablet
•	mobile
Pay particular attention to:
•	search/filter controls
•	sync status
•	modals
•	P2P sharing
•	import/export buttons
•	threat cards
Do not introduce horizontal overflow.
________________________________________
22. ACCESSIBILITY
Use proper:
•	button labels
•	aria-labels where needed
•	keyboard navigation
•	focus states
•	semantic HTML
•	readable contrast
•	modal focus handling if a modal is introduced
Do not rely exclusively on color to communicate severity.
For example:
CRITICAL
should have text/icon support in addition to red styling.
________________________________________
23. PREVENT COMMON REACT PROBLEMS
Make sure the implementation does not create:
•	infinite useEffect loops
•	state updates after unmount
•	duplicate LocalStorage writes
•	stale state problems
•	unnecessary re-renders
•	unstable list keys
•	hydration problems if applicable
•	event listener leaks
Use appropriate useEffect cleanup.
________________________________________
24. CREATE REUSABLE UTILITIES
If appropriate, separate functionality into utilities/hooks such as:
useThreatLedger()
threatLedgerStorage.ts
threatLedgerTypes.ts
threatLedgerUtils.ts
For example:
const {
  threats,
  addThreat,
  updateThreat,
  markKnown,
  removeThreat,
  syncLedger,
  exportLedger,
  importLedger,
} = useThreatLedger();
Do not over-engineer it.
Keep the architecture understandable for a student project that will later migrate to Supabase.
________________________________________
25. DESIGN FOR FUTURE SUPABASE MIGRATION
This is a critical architectural requirement.
Do not tightly couple the UI to LocalStorage.
Create a repository/service abstraction conceptually like:
interface ThreatLedgerRepository {
  getThreats(): Promise<ThreatEntry[]>;
  saveThreats(threats: ThreatEntry[]): Promise<void>;
  addThreat(threat: ThreatEntry): Promise<void>;
  updateThreat(id: string | number, updates: Partial<ThreatEntry>): Promise<void>;
}
Then create:
LocalStorageThreatLedgerRepository
as the current implementation.
Later we should be able to create:
SupabaseThreatLedgerRepository
without rebuilding the entire UI.
For now:
LocalStorage is the source of truth.
________________________________________
26. IMPORTANT: DO NOT USE SUPABASE
For this implementation:
•	Do not require Supabase credentials.
•	Do not import Supabase just for this feature.
•	Do not call Supabase APIs.
•	Do not create fake Supabase responses.
•	Do not require database migrations.
•	Do not modify existing Supabase migrations.
•	Do not assume the database is accessible.
Everything must work entirely on localhost.
________________________________________
27. ADD DEVELOPMENT/DEBUG INFORMATION
During development, make it easy to inspect the local ledger.
Optionally provide a small developer-only section or console utilities showing:
Storage:
LocalStorage

Threats:
6

Known:
2

Last Sync:
Just now

Online:
No

Storage Version:
1
Do not expose unnecessary debugging UI to normal users unless it fits the design.
________________________________________
28. ADD RESET LOCAL DATA
Provide a safe developer/user option:
Reset Local Ledger
When clicked:
1.	Ask for confirmation.
2.	Clear only Tanglaw Threat Ledger LocalStorage keys.
3.	Restore the seed dataset.
4.	Reset sync metadata.
5.	Refresh the UI.
Do NOT clear the entire browser LocalStorage because other Tanglaw features may use it.
Only remove keys owned by the Threat Ledger.
________________________________________
29. TEST THESE USER FLOWS
After implementation, verify every flow:
Flow A — First Visit
1.	Open page.
2.	No LocalStorage data exists.
3.	Seed threats appear.
4.	Correct threat count appears.
Flow B — Search
1.	Search GCash.
2.	Only matching threats appear.
3.	Clear search.
4.	All threats return.
Flow C — Filter
1.	Select Critical.
2.	Only critical threats appear.
3.	Select All.
4.	All threats return.
Flow D — Mark Known
1.	Click Mark as Known.
2.	UI changes immediately.
3.	Refresh page.
4.	Threat remains known.
Flow E — Sync
1.	Click Sync Now.
2.	Sync animation starts.
3.	Sync stages progress.
4.	Sync finishes.
5.	Last sync timestamp updates.
6.	Refresh.
7.	Timestamp remains.
Flow F — Offline
1.	Disconnect internet.
2.	Reload page.
3.	Threat ledger still loads.
4.	Search still works.
5.	Mark Known still works.
6.	LocalStorage still persists data.
Flow G — Export
1.	Export ledger.
2.	JSON file downloads.
3.	JSON contains valid ledger data.
Flow H — Import
1.	Import valid JSON.
2.	Validate.
3.	Merge/replace appropriately.
4.	UI updates.
Flow I — Invalid Import
1.	Select invalid JSON.
2.	Do not crash.
3.	Show useful error message.
4.	Existing ledger remains untouched.
Flow J — P2P
1.	Click QR Code.
2.	QR/share modal opens.
3.	Click Wi-Fi Direct.
4.	Demo discovery UI appears.
5.	Click Bluetooth.
6.	Demo sharing UI appears.
________________________________________
30. PERFORMANCE
Do not write to LocalStorage on every keystroke.
Search state should remain in React state.
Only persist actual data changes.
If necessary, debounce expensive operations.
Do not unnecessarily serialize large datasets repeatedly.
________________________________________
31. SECURITY
Even though this is a local demo:
•	Validate imported JSON.
•	Never execute imported strings as code.
•	Never use eval.
•	Do not inject unsanitized HTML.
•	Do not store passwords or authentication tokens.
•	Do not store sensitive personal information.
•	Treat imported threat data as untrusted input.
________________________________________
32. PRESERVE THE CURRENT DATA
Do not remove these existing threat entries:
1.	GCash Account Suspension Scam
2.	Miracle Cure Claims
3.	Fake DSWD Cash Aid Messages
4.	Manipulated Candidate Endorsements
5.	Typhoon Relief Donation Fraud
6.	Ponzi & Crypto Scam Patterns
Use them as the initial seed data.
________________________________________
33. IMPORTANT UX PRINCIPLE
The page should communicate this concept clearly:
Tanglaw works even when the internet doesn't.
The LocalStorage implementation is not just a temporary workaround.
Treat it as a realistic offline-first local cache architecture.
The user should feel that the Threat Ledger is a real local safety tool rather than a static demo.
________________________________________
34. IMPLEMENTATION PROCESS
Before changing code:
Step 1 — Inspect
Inspect:
•	ThreatLedger.tsx
•	PageLayout
•	ThemeContext
•	existing modal/dialog components
•	existing toast components
•	existing utility functions
•	package.json
•	existing LocalStorage usage elsewhere in the project
Step 2 — Identify reusable infrastructure
Reuse existing project utilities instead of creating duplicates.
Step 3 — Implement storage layer
Create the LocalStorage repository/service.
Step 4 — Connect ThreatLedger
Replace hardcoded state usage with the repository/hook.
Step 5 — Add interactions
Implement:
•	search
•	filtering
•	known/unknown
•	sync
•	import/export
•	cache metadata
•	online/offline state
•	P2P demo interactions
Step 6 — Preserve styling
Do not unnecessarily modify the existing design.
Step 7 — Test
Run the application and verify all flows above.
Step 8 — Fix errors
Resolve all TypeScript, React, runtime, and UI errors.
________________________________________
35. ACCEPTANCE CRITERIA
The implementation is complete only when:
•	Threat data persists after browser refresh.
•	Threat data persists after closing/reopening the browser.
•	Search works.
•	Filtering works.
•	Mark as Known works.
•	Known state persists.
•	Sync button performs a realistic local sync process.
•	Sync metadata persists.
•	Cache count is dynamic.
•	Online/offline status works.
•	Local ledger works without internet.
•	Import works safely.
•	Export works.
•	Invalid import does not corrupt existing data.
•	P2P buttons are functional demonstrations rather than dead buttons.
•	Auto-download/cache settings persist.
•	Empty states work.
•	Error states work.
•	Reset local ledger works safely.
•	Dark mode still works.
•	Light mode still works.
•	Mobile layout still works.
•	No TypeScript errors.
•	No runtime errors.
•	No unnecessary Supabase dependency is introduced.
•	Existing Tanglaw styling is preserved.
•	Architecture is ready for future Supabase integration.
________________________________________
36. FINAL REQUIREMENT
Do not simply give me a code explanation.
Actually implement the functionality in my existing project.
Before making changes, inspect the existing codebase and determine the best integration points.
If multiple implementation approaches are possible, choose the approach that is:
1.	Reliable
2.	Simple
3.	Maintainable
4.	Offline-first
5.	Type-safe
6.	Easy to migrate to Supabase later
7.	Consistent with the existing Tanglaw architecture
After implementation, report:
Files changed
List every file modified/created.
Functionality added
Briefly explain what now works.
LocalStorage schema
Show the keys and data structure used.
Testing performed
List the flows you verified.
Remaining limitations
Only mention limitations that genuinely cannot be implemented locally.
Do not claim functionality works unless you actually implemented and tested it.


### Crisis Mode

Act as a senior full-stack engineer, frontend engineer, backend engineer, TypeScript/React expert, UI/UX engineer, offline-first application architect, data/state-management engineer, QA engineer, and cybersecurity-aware misinformation verification systems expert.
I want you to make the Crisis Mode tab in my Tanglaw project fully functional, while preserving the existing design system, UI/UX, architecture, and functionality of the rest of the application.
1. Analyze the entire project FIRST
Do not immediately start changing code.
Before making any modifications:
•	Analyze all files in the project that are available to you.
•	Accept/use all relevant project files as the source of truth.
•	Inspect the existing:
o	React/TypeScript components
o	pages
o	routing
o	hooks
o	services
o	utility functions
o	types/interfaces
o	localStorage/offline storage logic
o	API/server code
o	mock data
o	configuration files
o	package.json/dependencies
o	styling/Tailwind configuration
o	existing UI components
o	existing verification-related functionality
o	Threat Ledger implementation
o	Learn tab implementation
o	Truth Hub functionality
o	offline-first functionality
o	synchronization logic
o	notification/state-management logic
•	Identify how the existing application is structured before deciding where Crisis Mode functionality belongs.
•	Reuse existing components, utilities, types, services, hooks, and design patterns whenever possible.
•	Do not unnecessarily create duplicate components or duplicate business logic.
•	Do not replace existing working functionality simply to implement Crisis Mode.
First determine:
1.	Which file contains the Crisis Mode page/tab.
2.	Which files control navigation/routing.
3.	Which files contain shared layout/UI components.
4.	Which files contain local/offline persistence.
5.	Which files contain existing advisory/threat/verification types.
6.	Which files can be reused for Crisis Mode.
7.	Whether an API/backend already exists that can support advisories.
8.	Whether the application currently has an offline fallback mechanism.
9.	Whether there are existing patterns for loading, errors, empty states, timestamps, filtering, and synchronization.
10.	Whether any existing dependencies can already support the required functionality.
After analysis, implement the solution within the existing architecture rather than creating an isolated demo.
________________________________________
2. Main Objective
Make the Crisis Mode tab a genuinely functional feature rather than a static UI.
The Crisis Mode experience should support:
•	verified crisis advisories
•	advisory status
•	severity levels
•	advisory categories
•	timestamps
•	source attribution
•	verification status
•	actionable safety instructions
•	verification checklist
•	checklist progress
•	emergency hotlines
•	nearest Truth Hub
•	directions
•	offline access
•	local persistence
•	synchronization
•	refresh/sync state
•	loading states
•	error states
•	empty states
•	stale-data handling
•	accessible interactions
•	responsive design
The implementation must work in localhost/offline-first conditions because the project may not currently have reliable database access.
________________________________________
3. Crisis Mode UI
The existing Crisis Mode UI concept is:
Crisis Mode
CRISIS VERIFICATION MODE ACTIVE
Showing only verified advisories from NDRRMC, DOH, and accredited community partners.
Last sync: 2 min ago
Active Advisories
Auto-updating
Example advisory:
CRITICAL — Scam Alert — Verified — 2 hours ago
Typhoon Relief Donation Scam — Ongoing
Fraudulent GCash numbers and fake NGO pages collecting donations following a recent typhoon. Verified relief channels are listed below.
Actions:
•	Only donate via official DSWD channels.
•	Verify NGO registration through SEC.
•	Report fake pages to PNP-ACG.
Another:
HIGH — Health Advisory — Verified — 5 hours ago
Fake Medicine Sellers Near Evacuation Centers
Reports of unlicensed vendors selling unverified medicines near an evacuation center. FDA advisory in effect.
Actions:
•	Accept medicines only from identified Red Cross / DOH personnel.
•	Report suspicious vendors to the Barangay Health Worker.
Another:
MEDIUM — Misinformation Alert — 8 hours ago
Unverified Evacuation Route Circulating on Social Media
A viral post showing an alternative evacuation route has not been confirmed by NDRRMC.
Actions:
•	Follow official evacuation routes only.
•	Contact the Barangay Emergency Coordinator.
________________________________________
4. Do NOT treat static sample data as the final implementation
The sample advisories above are only examples of the expected UI/content structure.
Create a proper data model for advisories.
For example, determine whether the project should use something conceptually similar to:
•	id
•	title
•	description
•	severity
•	category
•	verificationStatus
•	source
•	sourceUrl
•	publishedAt
•	updatedAt
•	verifiedAt
•	verifiedBy
•	actions
•	location
•	expiresAt
•	isActive
•	lastSyncedAt
Use the project's existing naming conventions if equivalent types already exist.
Do not create duplicate types if an appropriate existing type can be extended safely.
________________________________________
5. Verification Rules
Crisis Mode must follow Tanglaw's neutral verification philosophy.
The core rule is:
During crises, Tanglaw labels unconfirmed information as "Unverified" rather than "False" to prevent additional confusion. Only confirmed agency statements receive "Verified" status.
Implement this as an actual application rule, not merely explanatory text.
The system should distinguish at minimum:
•	Verified
•	Unverified
If the existing project already supports additional states such as pending/rejected/expired, integrate them carefully.
Important:
Do not allow arbitrary user-created information to automatically become Verified.
A verified advisory should require an appropriate trusted source/verification condition.
Trusted sources may include:
•	NDRRMC
•	DOH
•	DSWD
•	DILG
•	FDA
•	Philippine Red Cross
•	accredited community partners
•	verified Truth Hub/community verification mechanisms already implemented in the project
Use the existing project architecture for source validation if one exists.
________________________________________
6. Active Advisories
Make the Active Advisories section dynamic.
Implement:
•	rendering from actual application state/data
•	severity badges
•	category badges
•	verification badges
•	relative timestamps
•	full timestamps where appropriate
•	source information
•	advisory details
•	actionable recommendations
•	active/inactive status
•	expiration handling
Users should be able to interact with an advisory.
For example:
•	expand/collapse advisory
•	view details
•	view source
•	view verification information
•	view recommended actions
•	optionally mark as acknowledged/read if the project architecture supports it
Do not add interactions that do not fit the existing UX.
________________________________________
7. Auto-Updating and Synchronization
The UI currently says:
Auto-updating
and:
Last sync: 2 min ago
Make this functional.
Implement a sensible synchronization mechanism compatible with the current project.
If a backend/API already exists:
•	reuse it.
If an API exists but is unavailable:
•	fail gracefully.
If the project is designed to work offline:
•	use cached local data.
The application should clearly distinguish:
•	online
•	offline
•	syncing
•	sync successful
•	sync failed
•	stale cached data
Do not fake synchronization by simply changing the timestamp.
The displayed last sync value should come from actual stored synchronization metadata.
________________________________________
8. Offline-First Behavior
This is extremely important because Tanglaw is an offline-first Media & Information Literacy platform.
Crisis Mode should remain useful when the user loses internet connectivity.
Implement appropriate local persistence using the project's existing mechanism.
If the project already uses:
•	localStorage
•	IndexedDB
•	a custom offline store
•	service workers
•	another persistence mechanism
reuse that architecture.
At minimum, Crisis Mode should preserve:
•	latest successfully synchronized advisories
•	verification status
•	timestamps
•	source information
•	checklist progress
•	relevant crisis metadata
When offline:
•	show cached advisories
•	clearly indicate that data is cached/offline
•	do not claim that the data is currently live
•	do not fabricate a successful synchronization
•	gracefully handle stale information
For example:
Offline — Showing last synchronized advisories
rather than misleading the user into thinking the information is live.
________________________________________
9. Verification Checklist
Implement the following checklist as functional state:
Verification Checklist
1.	Is the source identified?
Anonymous or unverifiable sources are a red flag.
2.	Has it been published by official agencies?
NDRRMC, DOH, DSWD, DILG are primary authorities.
3.	Does it pressure you to act immediately?
Urgency can be a manipulation tactic. Pause and verify.
4.	Are there identifiable links or contact numbers?
Cross-reference with official hotlines.
5.	Have community members independently confirmed?
Check with Barangay officials or Truth Hubs.
Checklist progress
Example:
2/5
Make this interactive.
Users should be able to:
•	check/uncheck items
•	see progress update dynamically
•	persist their progress locally
•	reset the checklist if appropriate
Do not hard-code 2/5.
________________________________________
10. Emergency Hotlines
Implement the Emergency Hotlines section as structured data rather than hard-coded visual text.
Example:
NDRRMC Operations Center
(02) 8911-1406
DOH Emergency Hotline
1555
PNP Hotline
117
Red Cross Philippines
143
DSWD Crisis Hotline
(02) 8931-8101
Make these actionable where the platform/browser permits it.
For example:
•	tel: links on supported devices
•	copy-to-clipboard functionality
•	clear accessible labels
Do not invent additional hotlines.
Also consider whether the existing application already has a centralized contact/hotline data source.
________________________________________
11. Nearest Truth Hub
Implement:
Nearest Truth Hub
Barangay 15 Hall
0.4 km · Open Now · 8AM–8PM
Get Directions
This must not remain a static visual.
If the project already has Truth Hub data:
•	reuse it.
If location services are available:
•	determine the user's approximate location only with appropriate browser permission
•	calculate/select the nearest available Truth Hub
•	display distance
•	display operating status
•	display hours
If location permission is unavailable:
•	gracefully fall back to the existing configured/default Truth Hub mechanism.
Do not crash if:
•	geolocation is denied
•	geolocation is unavailable
•	no Truth Hub exists
•	the user is offline
The Get Directions interaction should use an appropriate maps URL or existing project mechanism if one already exists.
________________________________________
12. Advisory Filtering
Crisis Mode should show only advisories that meet the Crisis Mode verification policy.
Implement appropriate filtering such as:
•	active advisories only
•	verified advisories only
•	trusted sources only
•	non-expired advisories only
However, preserve the project's neutral-information philosophy.
If an advisory is unverified, it should not automatically be labeled false.
If useful within the existing UX, provide a separate indication such as:
Unverified information
rather than silently presenting it as verified.
________________________________________
13. Severity System
Use a consistent severity model:
•	CRITICAL
•	HIGH
•	MEDIUM
•	optionally LOW if supported by the application
Ensure the severity values are type-safe in TypeScript.
Do not scatter raw string literals throughout the application if the project already has a centralized enum/union/type pattern.
Severity should affect the UI appropriately while remaining accessible.
________________________________________
14. Accessibility and UX
Ensure the Crisis Mode interface is:
•	responsive
•	keyboard accessible
•	screen-reader friendly
•	visually understandable
•	mobile-friendly
•	usable during stressful situations
•	clear about verification state
•	clear about offline state
•	clear about stale information
•	free from misleading status indicators
Do not rely exclusively on color to communicate severity or verification status.
Use:
•	text
•	icons
•	labels
•	accessible attributes
where appropriate.
________________________________________
15. Loading, Error, Empty, and Offline States
Implement proper states for:
Loading
Example:
Loading verified advisories…
Empty
Example:
No active verified advisories
Offline
Example:
You're offline. Showing the latest synchronized advisories.
Sync Error
Example:
Unable to synchronize advisories. Showing cached information.
No Truth Hub
Example:
No nearby Truth Hub is currently available.
Do not leave the UI blank when something fails.
________________________________________
16. Security and Data Integrity
Because Crisis Mode deals with emergency information:
•	do not trust arbitrary client-side data as verified
•	validate advisory structures
•	sanitize externally sourced content
•	avoid unsafe HTML rendering
•	do not execute external content
•	validate URLs before displaying/opening them where appropriate
•	avoid exposing secrets
•	do not put API keys in frontend code
•	use environment variables according to the existing architecture
•	never hard-code private credentials
If the project currently has no backend verification mechanism, implement the frontend in a way that can later connect to a trusted backend without redesigning the entire feature.
________________________________________
17. Preserve Existing UI/UX
This is critical.
Do not redesign the entire Tanglaw application.
The Crisis Mode tab should look like it belongs to the existing Tanglaw design system.
Reuse:
•	existing colors
•	typography
•	cards
•	buttons
•	badges
•	icons
•	spacing
•	animations
•	responsive behavior
•	navigation
•	layout components
Only introduce new components when necessary.
________________________________________
18. Integration With Other Tanglaw Features
Before implementing anything, inspect whether Crisis Mode should interact with:
•	Threat Ledger
•	Liyab / AI Verification
•	Truth Hub
•	Learning Center
•	offline synchronization
•	community verification
•	notification systems
•	existing data stores
Where appropriate, connect these systems instead of creating separate isolated implementations.
For example, if a crisis-related verification already exists in Threat Ledger, determine whether Crisis Mode should consume or reference that data rather than duplicating it.
________________________________________
19. No Database Access Assumption
I may not currently have access to the production database.
Therefore:
•	make the feature work correctly in localhost
•	use the project's existing local/offline architecture
•	use mock/seed data only where necessary
•	clearly separate seed/mock data from real data
•	make the data layer replaceable
•	do not require a production database just to render or test Crisis Mode
The local implementation should still behave like a real application.
________________________________________
20. TypeScript Quality
Ensure the implementation is strongly typed.
Avoid:
•	unnecessary any
•	unsafe casts
•	duplicated interfaces
•	undefined properties
•	invalid imports
•	circular dependencies
•	unused imports
•	unused variables
•	inconsistent naming
If existing TypeScript errors are related to Crisis Mode, fix the root cause instead of suppressing them.
Do not use:
// @ts-ignore
or similar workarounds unless there is a genuinely unavoidable and documented reason.
________________________________________
21. Testing and Verification
After implementation:
1.	Run the project's existing type-check command.
2.	Run linting if available.
3.	Run the development server.
4.	Test the Crisis Mode route/tab.
5.	Test advisory rendering.
6.	Test verification states.
7.	Test checklist interaction.
8.	Test checklist persistence.
9.	Test offline behavior.
10.	Test synchronization.
11.	Test sync failure.
12.	Test empty advisories.
13.	Test expired advisories.
14.	Test hotline interactions.
15.	Test Truth Hub functionality.
16.	Test directions.
17.	Test responsive layouts.
18.	Check the browser console for errors.
19.	Check for React warnings.
20.	Check for broken imports.
21.	Check for TypeScript errors.
22.	Check that existing Tanglaw tabs still work.
________________________________________
22. Important Development Rule
Do not stop after making the UI look correct.
The goal is not a mockup.
The goal is a fully functional Crisis Verification Mode feature integrated into the actual Tanglaw application.
Every visible interactive element should either:
•	perform its intended action,
•	connect to the existing application logic,
•	persist state,
•	or gracefully explain why an operation cannot currently be performed.
________________________________________
23. Final Implementation Report
After completing the work, provide a concise report containing:
Files analyzed
List the major files you inspected.
Files modified
List every file you changed.
Files created
List every new file you created and why.
Functionality implemented
Explain what Crisis Mode can now actually do.
Data flow
Explain:
Source → synchronization → validation → local persistence → Crisis Mode UI
Offline behavior
Explain exactly what happens when the user loses connectivity.
Verification behavior
Explain how Verified vs Unverified is determined.
Testing performed
List the commands/tests you ran and their results.
Remaining limitations
Clearly identify anything that still requires:
•	backend/database access
•	external API credentials
•	production deployment
•	trusted agency integration
•	real geolocation data
Do not claim something is fully functional if it depends on an unavailable external service.
________________________________________
Most Important Instruction
Analyze first. Implement second. Test third.
Do not guess the project's architecture.
Do not blindly replace existing files.
Do not create duplicate systems.
Do not remove existing functionality.
Do not hard-code fake synchronization states.
Do not label unverified information as false.
Do not claim cached data is live.
Use the existing Tanglaw codebase as the source of truth and integrate Crisis Mode into it as a production-quality, offline-first feature.
The final result should feel like a natural, fully functional part of Tanglaw rather than a separate prototype.
Act as an expert Full-Stack Developer, React/TypeScript Developer, UI/UX Engineer, Local-First Application Architect, Data Persistence Engineer, QA Engineer, and debugging specialist.
I want you to make the Community tab/page of my Tanglaw application fully functional, not just visually complete. All existing buttons, interactions, counters, forms, report workflows, and community features should actually work end-to-end.
1. Analyze the entire project FIRST
Before modifying anything:
•	Thoroughly analyze all files currently available in this project.
•	Inspect the existing project structure, routing, components, contexts, utilities, types, hooks, styles, data models, and related pages.
•	Identify how the Community page currently connects to the rest of the application.
•	Find reusable components, modal/dialog patterns, form components, notification/toast systems, localStorage utilities, TypeScript types, and existing design patterns.
•	Check whether there are existing implementations for:
o	authentication/user identity
o	notifications/toasts
o	dialogs/modals
o	offline/local-first storage
o	report submission
o	voting
o	filtering/search
o	badges/contributors
o	verification
o	synchronization
•	Do not blindly create duplicate utilities or components if equivalent functionality already exists.
•	Follow the existing architecture and coding conventions of the project.
•	Check for existing TypeScript errors and potential integration problems before making changes.
•	Analyze all relevant files before deciding what needs to be changed.
2. Accept and incorporate all project files
Please treat all files currently available in this project as part of the codebase.
Do not limit your analysis to CommunityPage.tsx.
If the Community feature requires changes to other files, update the appropriate files as well, including—but not limited to:
•	CommunityPage.tsx
•	Community-related TypeScript types
•	components
•	hooks
•	utilities
•	localStorage helpers
•	routing
•	dialogs/modals
•	notification components
•	CSS/Tailwind styles
•	mock/seed data
•	shared types
•	services
•	other pages/components that need to interact with Community data
Do not unnecessarily modify unrelated functionality.
________________________________________
3. IMPORTANT: Use localStorage instead of Supabase
I currently do not have access to Supabase/database functionality, so for this implementation:
Do NOT depend on Supabase.
The Community feature must work completely on localhost using localStorage as the persistent data layer.
The application should still behave like a real functional community system.
Use a structured localStorage architecture rather than scattering direct localStorage.setItem() calls throughout the UI.
For example, create/reuse a dedicated storage/service layer such as:
•	community storage utility
•	community repository/service
•	custom hooks for Community state
Use appropriate names based on the project's existing architecture.
Persist at minimum:
•	community reports
•	user votes
•	submitted reports
•	report statuses
•	report metadata
•	report timestamps
•	contributor statistics
•	verification information where appropriate
•	user/community activity
•	dismissed/handled UI states if necessary
Data must survive:
•	page refresh
•	browser restart
•	navigating away and returning to Community
________________________________________
4. Make the provided CommunityPage actually functional
Here is the current CommunityPage.tsx implementation I am starting from:
[PASTE THE PROVIDED COMMUNITY PAGE CODE HERE]
Do not simply make cosmetic changes.
Every meaningful interaction should perform a real action.
________________________________________
5. Submit Report must work
The following buttons currently do nothing:
•	Submit Report beside "Latest Reports"
•	Submit a Report in the "Spot something suspicious?" card
Both should open the same functional report-submission workflow.
Create an appropriate modal/dialog/drawer based on the existing project's UI conventions.
The form should allow the user to submit a community report with fields such as:
•	Report type/category
•	Title
•	Description/details
•	Location
•	Optional source/platform
•	Optional source URL
•	Optional evidence/reference
•	Reporter name or anonymous option, depending on the existing application architecture
•	Confirmation that the information is being submitted in good faith
Suggested categories:
•	Scam
•	Health
•	Election
•	Misinformation
•	Other
Validate the form properly.
Examples:
•	required title
•	required description
•	required category
•	reasonable character limits
•	valid URL when a URL is supplied
Show validation errors clearly.
After submission:
1.	Save the report to localStorage.
2.	Add it to the Community feed.
3.	Give it a unique ID.
4.	Record the submission timestamp.
5.	Assign an appropriate initial status such as Under Investigation or Unverified.
6.	Update community statistics.
7.	Update contributor statistics.
8.	Show a success toast/notification.
9.	Close/reset the form.
10.	Make the newly submitted report immediately visible in the feed.
Do not require a page refresh.
________________________________________
6. Voting system must work correctly
The existing thumbs-up button currently only changes temporary React state.
Make voting persistent using localStorage.
Requirements:
•	A user can vote on a report.
•	Clicking again removes their vote.
•	Vote count updates immediately.
•	Vote state survives refresh.
•	A report cannot receive duplicate votes from the same local user/session.
•	The UI must clearly indicate whether the current user has voted.
•	Voting should work for both seeded reports and newly submitted reports.
Do not mutate the original static data directly.
Use a proper data model.
________________________________________
7. Report details interaction
Make each report meaningfully interactive.
When a user clicks a report/card, provide a detailed report view using an appropriate modal/drawer/page.
The detailed view should show:
•	Title
•	Category
•	Full description
•	Reporter
•	Reporter role
•	Location
•	Submitted time/date
•	Current status
•	Verification state
•	Vote count
•	Community verification information
•	Source/evidence when available
•	Any available review/verification history
Make sure the detailed view is responsive on desktop and mobile.
________________________________________
8. Community verification functionality
Because Tanglaw's Community feature is supposed to support community-powered verification, implement a local verification workflow.
Users should be able to perform an appropriate community verification action on eligible reports.
For example:
•	Confirm
•	Dispute
•	Needs More Evidence
Do not automatically mark a report as officially verified simply because one user clicks a button.
Instead, use transparent local logic.
For example:
•	multiple community confirmations can increase confidence
•	disputes can decrease confidence
•	reports remain Under Investigation until appropriate thresholds are reached
•	seeded/demo reports may retain their predefined status where appropriate
Clearly distinguish:
•	Community-confirmed
•	Under Investigation
•	Unverified
•	Disputed
•	Officially verified, if the existing architecture supports this
Do not falsely claim that a localStorage result is an official NDRRMC/DOH/government verification.
________________________________________
9. Report filtering and discovery
If the existing Community UI can support it without damaging the current design, add useful filtering/search functionality.
Allow users to filter reports by:
•	All
•	Scam
•	Health
•	Election
•	Misinformation
•	Other
•	Verified/Confirmed
•	Under Investigation
•	Unverified
Add search functionality for:
•	title
•	description
•	location
•	category
•	reporter
Filtering should update instantly without a page reload.
________________________________________
10. Sorting
Add a sensible sorting mechanism if appropriate.
Possible options:
•	Latest
•	Most Voted
•	Most Verified
•	Trending
Make sure sorting works together with filtering and searching.
________________________________________
11. This Week statistics must be functional
The current sidebar contains hardcoded values:
•	Reports Submitted: 89
•	Verified & Confirmed: 61
•	Scams Prevented: 34
These should not remain permanently hardcoded.
Calculate them from the actual Community data stored in localStorage.
For example:
Reports Submitted
Number of reports submitted within the current week.
Verified & Confirmed
Number of reports that reached the appropriate confirmed/verified state.
Scams Prevented
Use a clearly defined local rule based on the project's report status model.
If a metric cannot be objectively calculated, implement a transparent and deterministic rule rather than inventing fake data.
Update the statistics immediately when a report is submitted or its state changes.
________________________________________
12. Top Contributors must be functional
The current contributors are hardcoded:
•	Angel Reyes
•	Maria Santos
•	Teacher Lorna
Make the contributor system data-driven.
Calculate contributor statistics from Community activity stored locally.
Track things such as:
•	reports submitted
•	reports verified/confirmed
•	helpful votes/community contributions
•	contributor ranking
•	badges
Possible badges:
•	Top Contributor
•	Verified Contributor
•	Truth Champion
•	Community Watcher
Do not award badges arbitrarily.
Create clear criteria for each badge.
The ranking should update when users submit reports or participate in verification.
Seeded contributors can remain available as demo data, but the system must also account for newly created local users/reports.
________________________________________
13. Seed/demo data
The four existing reports are useful for demonstrating the Community feature.
Preserve them as initial seed data, but do not keep them as immutable hardcoded UI data.
On first load:
1.	Check whether Community data already exists in localStorage.
2.	If not, initialize localStorage with the existing demo reports.
3.	If data already exists, load the saved data instead.
4.	Never overwrite user-created data on every page refresh.
Create a versioned storage key if appropriate, for example:
tanglaw_community_*
Use a naming convention consistent with the existing project.
________________________________________
14. Reset/demo data functionality
For development/testing, consider adding a safe local-only reset mechanism if consistent with the application.
It should allow me to:
•	reset Community data
•	restore seeded reports
•	clear votes
•	clear locally submitted reports
If you add this, make it clearly marked as a development/testing function and do not expose it as an accidental destructive action in the normal UI.
________________________________________
15. Notifications and feedback
Every important action should provide user feedback.
Examples:
•	Report submitted successfully
•	Vote added
•	Vote removed
•	Verification submitted
•	Report already verified
•	Invalid form submission
•	Report deleted/reset
•	Local data restored
Use the project's existing toast/notification system if one exists.
Do not introduce another notification library unnecessarily.
________________________________________
16. Time handling
The current data uses values such as:
•	2h ago
•	5h ago
•	1d ago
•	2d ago
Do not rely exclusively on static strings.
Store actual timestamps and create a reusable relative-time formatter where appropriate.
Examples:
•	Just now
•	5 minutes ago
•	2 hours ago
•	Yesterday
•	3 days ago
The UI should automatically update appropriately.
________________________________________
17. Data architecture
Create clean TypeScript models for the Community system.
For example, conceptually:
•	CommunityReport
•	CommunityVote
•	CommunityVerification
•	CommunityContributor
•	CommunityStats
Use proper union types for categories and statuses.
Avoid unnecessary any.
Ensure the implementation is type-safe.
If the project already contains equivalent types, reuse or extend them instead of creating duplicate definitions.
________________________________________
18. Local user identity
Since there is no Supabase authentication available, create a lightweight local identity mechanism if the application does not already have one.
For example:
•	Generate a stable local user ID once.
•	Store it in localStorage.
•	Reuse it across sessions.
•	Use it to track votes and community contributions.
Do not ask the user to log in just to use Community unless the existing application already requires authentication.
________________________________________
19. Offline-first behavior
Tanglaw is designed around offline-first functionality.
The Community tab should therefore remain functional when there is no network connection.
The following should work offline:
•	viewing reports
•	searching
•	filtering
•	sorting
•	submitting reports
•	voting
•	community verification
•	viewing statistics
•	viewing contributor rankings
Do not make the Community tab dependent on an API call merely to render the page.
If an API/sync architecture already exists, keep it optional rather than required.
________________________________________
20. Future backend compatibility
Even though we are using localStorage now, structure the code so it can later be migrated to Supabase.
Prefer:
CommunityPage → Community Hook/Service → Storage Repository
rather than:
CommunityPage → localStorage everywhere
This will make it easier to replace localStorage with Supabase later.
Do not implement Supabase now unless an existing part of the application requires it.
________________________________________
21. UI/UX requirements
Preserve the existing Tanglaw visual identity.
Do not redesign the entire page unnecessarily.
Keep:
•	current layout
•	typography
•	gradients
•	colors
•	dark/light theme support
•	cards
•	animations
•	spacing
•	responsive behavior
But improve usability where needed.
Ensure all newly added UI works in both:
•	Light mode
•	Dark mode
Use the existing useTheme() system.
Do not hardcode a UI that only looks correct in dark mode.
________________________________________
22. Accessibility
Ensure interactive elements have:
•	appropriate buttons
•	keyboard accessibility
•	visible focus states
•	meaningful labels
•	appropriate ARIA labels where needed
•	accessible modal behavior
•	sensible tab order
Do not use clickable <div> elements when a <button> is appropriate.
________________________________________
23. Error handling
Handle failures gracefully.
Examples:
•	localStorage unavailable
•	malformed stored JSON
•	storage quota errors
•	invalid report data
•	duplicate actions
•	missing report IDs
•	corrupted Community state
If localStorage data is corrupted, recover safely rather than crashing the entire Community page.
________________________________________
24. Avoid common implementation mistakes
Do NOT:
•	hardcode new fake functionality
•	use temporary React state for persistent data
•	overwrite localStorage on every render
•	recreate seed data every time the component mounts
•	use Supabase
•	add unnecessary dependencies
•	introduce any unnecessarily
•	break existing routing
•	break the ThemeContext
•	break PageLayout
•	remove existing Community content unnecessarily
•	rewrite unrelated pages
•	create duplicate utilities when existing ones can be reused
________________________________________
25. Testing requirements
After implementing the Community functionality, test the complete workflow.
At minimum verify:
Initial state
•	Community page loads successfully.
•	Seed reports appear.
•	No console errors.
Submit Report
•	Open modal.
•	Validate fields.
•	Submit valid report.
•	Report appears immediately.
•	Refresh page.
•	Report remains.
Voting
•	Vote on report.
•	Counter increases.
•	Toggle vote off.
•	Counter decreases.
•	Refresh.
•	Vote state persists.
Verification
•	Submit community verification.
•	State/count updates.
•	Refresh.
•	Data persists.
Search/filter
•	Search finds matching reports.
•	Category filter works.
•	Status filter works.
•	Sorting works.
Statistics
•	Statistics reflect actual local data.
•	Submitting reports changes the relevant metrics.
Contributors
•	Contributor activity updates.
•	Ranking remains consistent.
•	Badges follow defined criteria.
Theme
•	Test Light Mode.
•	Test Dark Mode.
Responsive UI
•	Desktop.
•	Tablet.
•	Mobile.
Persistence
•	Refresh browser.
•	Navigate to another tab.
•	Return to Community.
•	Data remains intact.
________________________________________
26. Run/build validation
After making the changes:
•	Run the project's appropriate type-check/build command.
•	Run the development server if available.
•	Check for TypeScript errors.
•	Check for ESLint errors if configured.
•	Check browser console errors.
•	Fix all errors introduced by your changes.
•	Verify imports and exports.
•	Verify that all new files are correctly connected to the project.
If an existing unrelated error prevents the build, clearly identify it instead of silently ignoring it.
________________________________________
27. Final implementation standard
I do not want a mockup.
I want the Community tab to behave like a real local-first community verification system.
The final result should allow a user to:
View → Search → Filter → Open → Submit → Persist → Vote → Verify → Update Statistics → Update Contributors
entirely through localhost/localStorage without requiring Supabase.
Most importantly, analyze my existing project first and adapt the implementation to the architecture that is already there. Do not assume file names, hooks, components, or utilities exist without checking.
Before finishing, review the changes once more and make sure there are no broken imports, duplicate types, unused code, runtime errors, or interactions that still appear clickable but do nothing.
The Community tab should be production-quality in behavior while remaining localStorage-based and offline-first for this development phase.




## 6. Manual Improvements and Corrections

AI-generated code was not accepted without review.

### 6.1 TypeScript Corrections

During development, TypeScript errors were identified in the Community report submission flow. The generated implementation did not correctly match the existing report data structure.

The implementation was manually reviewed and corrected to conform to the existing TypeScript types.

### 6.2 Import and Architecture Debugging

The Learning Tab encountered an import resolution error involving:

`@/app/features/learning/services/learningService`

Instead of immediately creating a replacement file, the existing repository structure was inspected to determine whether the problem was caused by the file location, filename, export, or path configuration.

### 6.3 UI/UX Refinement

Generated implementations were manually reviewed to ensure consistency with the existing Tanglaw design system.

This included:

- Light mode colors
- Dark mode colors
- Buttons
- Cards
- Text contrast
- Spacing
- Responsive behavior
- Interactive states

### 6.4 Functional Corrections

Features were manually tested after implementation to verify that buttons and interactions actually performed their intended actions rather than simply appearing functional.

## 7. Testing and Validation

The application was tested through:

- Application startup
- TypeScript validation
- Production build
- Linting
- Manual feature testing
- Browser refresh testing
- Local persistence testing
- Light/dark theme testing
- Responsive layout testing

Only tests that were actually executed are reported as passing.



## 9. Developer Responsibility

AI was used as a development assistant rather than as a replacement for the developer.

I remained responsible for:

- Defining requirements
- Reviewing AI-generated code
- Making architectural decisions
- Correcting implementation errors
- Refining UI/UX
- Testing functionality
- Validating the final application
- Deciding which AI-generated suggestions should be accepted or modified

## 10. Conclusion

The completed application demonstrates an independent React development process supported by AI-assisted analysis, implementation, debugging, and refinement.

The development process involved continuous review and manual correction to ensure that the final application remained functional, maintainable, and consistent with the project's requirements.