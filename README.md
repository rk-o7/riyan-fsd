# Student Attendance Management System

A modern, web-based digital attendance management platform designed for faculty members to record, track, and analyze student attendance in real time. Styled with the organic, warm-earth aesthetic of [TerraSense](https://terra-sense-virid.vercel.app/).

## 🌟 Key Features

- **Faculty Dashboard & Analytics**: Real-time aggregate attendance rates, total enrollments, session turnouts, and automated defaulter tracking (<75% threshold).
- **Digital Roll Call**: Fast single-click attendance status toggling (`Present`, `Absent`, `Late`, `Excused`) with bulk actions (`Mark All Present`, `Mark All Absent`).
- **History & Session Logs**: Filter attendance logs by class and date, view detailed roster breakdowns, and export session spreadsheets directly to **CSV**.
- **Student & Course Management**: Enroll students, assign courses/sections, track individual attendance health, and manage academic batches.
- **Client-Side Persistence**: Safe local storage caching with fallback recovery and React Error Boundary protection.

## 🚀 Local Development

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd student-attendance-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## ⚡ Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [Vercel Dashboard](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Select **Vite** as framework preset (detected automatically).
5. Click **Deploy**.
