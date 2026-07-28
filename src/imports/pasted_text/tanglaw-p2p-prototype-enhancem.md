Prompt
Act as a Senior Full Stack Software Engineer, Senior Frontend Engineer, Senior Backend Engineer, UI/UX Designer, Software Architect, and Product Designer with over 15 years of experience building scalable SaaS platforms, AI-powered applications, and enterprise-grade web systems.
You are tasked with transforming my existing Tanglaw P2P application into a production-quality prototype suitable for presentation to UNESCO judges, hackathon judges, investors, government agencies, NGOs, and community stakeholders.
The current landing page already exists.
Do NOT redesign everything from scratch.
Instead:
•	Analyze the current implementation. 
•	Preserve the existing design language. 
•	Improve the UI/UX. 
•	Improve the architecture. 
•	Implement missing frontend and backend functionality. 
•	Ensure every implemented feature aligns strictly with my research paper. 
•	Do not invent core features beyond what is supported in the paper. 
•	Expand the UI and user experience where appropriate while remaining faithful to the solution. 
________________________________________
Overall Goal
Tanglaw P2P is not just another misinformation detection application.
It is an offline-first Community Verification Infrastructure designed to strengthen Media and Information Literacy (MIL) for digitally marginalized communities in the Philippines.
The application should clearly communicate this mission through every page, interaction, dashboard, workflow, and user journey.
Everything should feel polished, modern, responsive, accessible, and production-ready.
________________________________________
1. Separate Navigation Bars
I want two completely different navigation systems depending on the authentication state.
Public Navigation Bar (Before Authentication)
If the visitor is not signed in, only show the public marketing navigation.
Examples:
•	Home 
•	About 
•	Features 
•	How It Works 
•	Truth Hubs 
•	Accessibility 
•	Community Impact 
•	Resources 
•	FAQ 
•	Contact 
•	Sign In 
•	Create Account 
The public navigation should focus on introducing Tanglaw P2P and encouraging visitors to sign up.
Users should not have access to application features before authentication.
________________________________________
Authenticated Navigation Bar
Once the user successfully signs in or creates an account, replace the public navigation bar with a dedicated application navigation.
This navigation should only appear for authenticated users.
Suggested navigation:
•	Dashboard 
•	Verify 
•	Learn 
•	Truth Hubs 
•	Community 
•	Offline Threat Ledger 
•	Offline Sync 
•	Crisis Mode 
•	Notifications 
•	Profile 
•	Accessibility Settings 
Hide all marketing navigation after login.
The application should clearly transition from a marketing website into a functional web application.
________________________________________
2. Hero Section Improvements
Currently, the Hero section contains three capability cards.
They currently display:
•	100% Free & Open 
•	Offline Capable 
•	AI-Powered Explainable Verification 
Improve the layout.
Instead of placing all three in a straight line,
arrange them like this:
100% Free & Open          Offline Capable

      AI-Powered Explainable Verification
The AI-Powered Explainable Verification card should be centered beneath the first two cards.
Ensure:
•	perfect alignment 
•	equal spacing 
•	responsive layout 
•	premium glassmorphism styling 
•	smooth hover animations 
________________________________________
3. Functional Authentication System
The current Sign In and Create Account pages are mostly placeholders.
Implement a complete authentication workflow.
Frontend:
•	Registration Form 
•	Login Form 
•	Forgot Password 
•	Password Visibility Toggle 
•	Remember Me 
•	Email Validation 
•	Password Validation 
•	Loading States 
•	Error Handling 
•	Success Notifications 
Backend:
Implement authentication using the existing backend stack (or a mock backend if necessary).
Include:
•	JWT Authentication 
•	Password Hashing 
•	User Sessions 
•	Protected Routes 
•	Authentication Middleware 
•	Persistent Login 
•	Logout 
Users should remain logged in after refreshing the page.
________________________________________
4. Role-Based Access Control (RBAC)
The application should implement proper Role-Based Access Control based entirely on my research paper.
Do not invent arbitrary roles.
Instead, derive roles from the intended beneficiaries and stakeholders described in the paper.
Examples include:
Community Member
Primary users:
•	Low-income households 
•	Rural residents 
•	Disaster-prone communities 
•	Senior citizens 
Access:
•	Verify Information 
•	Learn 
•	Offline Threat Ledger 
•	Crisis Mode 
•	Truth Hubs 
•	Accessibility Settings 
•	Verification History 
________________________________________
Student Media Literacy Advocate
Access:
•	Everything available to Community Members 
•	Community Education Toolkit 
•	Community Awareness Campaigns 
•	Verification Demonstrations 
•	Learning Modules 
•	Educational Resources 
________________________________________
Barangay / LGU Representative
Access:
•	Community Reports 
•	Truth Hub Management 
•	Local Advisory Dashboard 
•	Community Analytics 
•	Community Verification Requests 
•	Crisis Coordination 
________________________________________
Educator / School Representative
Access:
•	Classroom Resources 
•	Media Literacy Lessons 
•	Student Activities 
•	Educational Materials 
________________________________________
NGO / Civil Society Organization
Access:
•	Awareness Campaign Dashboard 
•	Community Insights 
•	Educational Content 
•	Threat Pattern Monitoring 
________________________________________
Humanitarian / Disaster Response Organization
Access:
•	Crisis Verification 
•	Emergency Advisories 
•	Community Monitoring 
•	Disaster Information Dashboard 
________________________________________
5. Dynamic Dashboard
After login,
users should be redirected to a personalized dashboard.
The dashboard should change depending on their selected role.
Examples:
Community Member Dashboard
Student Dashboard
Barangay Dashboard
Educator Dashboard
NGO Dashboard
Humanitarian Dashboard
Each dashboard should have:
•	role-specific widgets 
•	statistics 
•	shortcuts 
•	quick actions 
•	announcements 
•	accessibility options 
________________________________________
6. Role Selection During Registration
During account creation,
add a dedicated step allowing users to choose their role.
Instead of a dropdown,
display interactive role cards.
Each card should include:
•	icon 
•	role name 
•	description 
•	who the role is intended for 
•	available features 
After selecting a role,
display a short explanation of what functionality they will have access to.
________________________________________

8. Replace the "By The Numbers" Section
The current "By The Numbers" section contains placeholder statistics that are not supported by my research paper and may misrepresent the problem.
The current section displays:
•	78% of Filipinos encounter misinformation online monthly 
•	43% of households have limited internet access 
•	7M+ potential community users across target barangays 
•	92% accuracy in AI-powered fact verification 
These figures should not be used because they are either unsupported, inaccurate, or make claims that my research does not provide.
Instead, redesign this section using evidence-based statistics and key findings directly from my Problem Statement.
The goal of this section is not to showcase product performance, but rather to highlight the real-world challenges that justify why Tanglaw P2P is needed.
Create a modern statistics section using premium cards with icons, animated number counters, and concise supporting descriptions.
Use only information supported by my research paper. Examples include:
•	48.8% — of Philippine households had internet access at home in 2024, emphasizing that many families still depend on costly, unstable prepaid mobile data instead of reliable household internet. (PSA, 2026) 
•	Connectivity remains uneven — particularly across geographically isolated and disadvantaged areas (GIDAs), rural barangays, and island communities, making information verification significantly more difficult than in urban areas. 
•	Disasters amplify misinformation — during events such as typhoons, volcanic eruptions, floods, and other emergencies, communities must make time-critical decisions while communication infrastructure is disrupted. 
•	Scams and social engineering continue to rise — phishing, impersonation, fraudulent text messages, fake emergency advisories, and other digital scams increasingly target vulnerable groups, including seniors, low-income households, students, OFW families, and informal workers. 
Do not invent percentages, user counts, AI accuracy claims, or marketing statistics that are not explicitly supported by my research.
If a finding in my research is qualitative rather than quantitative, present it as a concise insight card instead of forcing it into a percentage.
The overall purpose of this section is to immediately communicate the scale of the information access problem in the Philippines and establish a compelling rationale for why Tanglaw P2P's offline-first Community Verification Infrastructure is necessary. The section should be visually engaging while remaining academically accurate and faithful to the evidence presented in my research.

9. Backend Architecture
Implement a clean backend architecture following best practices.
Suggested structure:
backend/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middleware/
│   ├── routes/
│   ├── models/
│   ├── auth/
│   ├── utils/
│   ├── config/
│   └── app.ts
Include:
•	JWT authentication 
•	Role-based authorization middleware 
•	Secure password hashing 
•	Validation 
•	Error handling 
•	RESTful APIs 
•	Modular services 
•	Environment variables 
•	Protected endpoints 
•	Logging 

9. Fully Functional Demo Features (Hackathon Demonstration Mode)
This application is intended to be demonstrated live to UNESCO judges, hackathon judges, investors, government agencies, NGOs, and community stakeholders.
Therefore, every feature shown in the UI must be functional for demonstration purposes.
Do not create buttons, navigation items, cards, dashboards, pages, or menus that simply display "Coming Soon," "Under Development," empty placeholders, or blank screens.
Instead, every feature should simulate a realistic end-to-end user experience, even if backend integrations or AI services are mocked.
The goal is to make the application feel like a complete, production-ready prototype.
General Requirements
Every page should include:
•	Meaningful UI and content 
•	Interactive components 
•	Realistic sample data where appropriate 
•	Loading states 
•	Empty states 
•	Error handling 
•	Success notifications 
•	Responsive layouts 
•	Smooth animations and transitions 
•	Consistent styling across the application 
Every button should perform an action.
Every navigation item should open a corresponding page.
Every page should demonstrate how the feature is intended to work.
Avoid dead links, inactive controls, and placeholder interfaces.
________________________________________
Verification Module
The Verify feature must be fully interactive.
Users should be able to:
•	Paste suspicious text 
•	Upload screenshots or images (frontend demo) 
•	Simulate OCR extraction if applicable 
•	Click Verify 
•	Display an animated verification process using the existing Processing.png illustration 
•	Animate only the speech bubble while verification is running 
•	Display an explainable verification result 
•	Show a confidence level 
•	Highlight detected manipulation techniques 
•	Recommend trusted next steps 
•	Save the verification to the user's history 
________________________________________
Learn Module
The Learn section should not simply display static text.
Instead, create an interactive learning experience that includes:
•	Media and Information Literacy lessons 
•	Scam awareness topics 
•	Disaster preparedness guidance 
•	Interactive learning cards 
•	Progress tracking 
•	Lesson completion indicators 
•	Achievement badges 
•	Search and filtering 
________________________________________
Truth Hub Module
The Truth Hubs feature should be fully demonstrable.
Users should be able to:
•	View nearby Truth Hubs on an interactive map 
•	Browse community verification centers 
•	View Truth Hub details 
•	Simulate navigation directions 
•	Filter Truth Hubs by category 
•	Search locations 
•	View available community services 
________________________________________
Community Module
The Community section should demonstrate community participation.
Include:
•	Community discussion feed 
•	Verified reports 
•	Trending misinformation alerts 
•	Educational posts 
•	Community campaigns 
•	Awareness announcements 
•	User contributions 
•	Recent verification activity 
________________________________________
Offline Threat Ledger
Create a realistic interface demonstrating:
•	Offline database 
•	Threat signatures 
•	Scam categories 
•	Recently synced entries 
•	Search functionality 
•	Last synchronization timestamp 
•	Local storage visualization 
________________________________________
Offline Sync
The Offline Sync page should simulate how synchronization works.
Demonstrate:
•	Device status 
•	Internet detection 
•	Ledger synchronization 
•	Progress animation 
•	Sync history 
•	QR Code synchronization 
•	Peer-to-peer sharing 
•	WebRTC synchronization flow 
•	Successful synchronization notifications 
________________________________________
Crisis Mode
Create a dedicated Crisis Mode interface.
Include:
•	Emergency advisory cards 
•	Crisis verification workflow 
•	Neutral / Unknown State Protocol 
•	Trusted verification checklist 
•	Emergency contacts 
•	Official advisory references 
•	Community alerts 
________________________________________
Dashboard
Each role-specific dashboard should feel complete.
Include:
•	Statistics 
•	Recent activity 
•	Notifications 
•	Quick actions 
•	Personalized recommendations 
•	Verification history 
•	Learning progress 
•	Community updates 
•	Sync status 
Every widget should be interactive.
________________________________________
Profile Page
Users should be able to:
•	Edit profile information 
•	Update accessibility preferences 
•	Change password 
•	Change language 
•	Enable voice guidance 
•	Toggle high contrast mode 
•	Manage notification settings 
•	View account activity 
________________________________________
Accessibility Settings
Accessibility should be fully demonstrable.
Allow users to:
•	Enable high contrast mode 
•	Increase font size 
•	Enable voice assistance 
•	Switch languages 
•	Enable simplified interface 
•	Adjust motion preferences 
All settings should immediately update the interface where appropriate.
________________________________________
Demo Data
Because this is a demonstration prototype, populate the application with realistic mock data instead of empty states.
Examples include:
•	Sample scam messages 
•	Sample disaster advisories 
•	Example phishing attempts 
•	Community verification reports 
•	Learning progress 
•	Truth Hub locations 
•	Notifications 
•	Verification history 
•	Community announcements 
The mock data should accurately reflect the Philippine context described in my research paper while avoiding fabricated statistics or unsupported factual claims.
________________________________________
Demo Quality Expectations
The final application should feel like a polished, investor-ready and hackathon-ready product. Judges should be able to navigate every page, click every button, explore every feature, and experience complete user flows without encountering placeholder screens, unfinished functionality, inactive navigation, or broken interactions. Where real backend services or AI integrations are not yet available, implement realistic frontend simulations that clearly demonstrate the intended behavior while preserving a production-quality user experience.
________________________________________
I would also merge your Sections 7 and 8, since they're both about the "By The Numbers" section. Keeping both is redundant and can confuse the AI into making two different versions of the same section. A single, consolidated section will produce more consistent results.

10. Final Objective
The completed application should feel like a real, deployable platform rather than a hackathon prototype. Visitors should experience a seamless transition from a compelling marketing website into a functional application after authentication. Every design decision, navigation flow, dashboard, and role-specific feature should reinforce Tanglaw P2P's mission of offline-first community verification, equitable access to trustworthy information, explainable AI, Media and Information Literacy, accessibility, and community resilience, while remaining fully aligned with the research paper and avoiding unsupported claims or invented functionality.

