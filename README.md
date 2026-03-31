HealthyDots - Nutrition & Fitness Tracker
HealthyDots is a full-stack web application designed to simplify personal nutrition management. The core functionality allows users to input their physical metrics, calculate daily caloric needs, and track their nutritional intake in real-time.

Key Functionalities
Smart Calorie Calculation: Uses height, weight, age, and personal goals (lose/gain/maintain) to determine daily intake limits.

Meal Management: Users can log, view, and delete daily meals with instant updates to their calorie balance.

Progress Tracking: A dedicated dashboard to visualize consistency and progress toward the daily goal.

Secure Authentication: Implemented a full auth flow with JWT, protected routes, and persistent sessions using LocalStorage.

Responsive UI: Fully optimized for mobile, tablet, and desktop views using Tailwind CSS.

Tech Stack
Frontend: React.js (Vite) for fast HMR and optimized builds.

Styling: Tailwind CSS for a utility-first, responsive design.

State & Routing: React Hooks and React Router Dom for navigation and data flow.

Animations: AOS library for scroll-triggered transitions.

Backend: Node.js and Express.js.

Database: MongoDB for scalable user and meal data storage.

Getting Started
Clone the repository:

Bash
git clone https://github.com/your-username/healthydots.git
Install dependencies:

Bash
npm install
Launch the development server:

Bash
npm run dev
Roadmap
Integrate external Nutrition APIs for automated calorie lookups.

Implement a Personal Coach subscription tier.

Enhance Progress Dashboard with advanced charting (Recharts/Chart.js).

Developed by: Ruba ALmahmoud - Full Stack Developer