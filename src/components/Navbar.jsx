import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  BarChart3, 
  Sparkles, 
  BookOpen, 
  FileSpreadsheet,
  GraduationCap
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { id: 'take-attendance', label: 'Roll Call', icon: CalendarCheck },
    { id: 'attendance-history', label: 'Session Logs', icon: FileSpreadsheet },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'classes', label: 'Courses', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#fbf7ef]/90 backdrop-blur-md border-b border-line shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand matching TerraSense */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-leaf to-char flex items-center justify-center shadow-md shadow-leaf/20 text-honey">
              <GraduationCap className="w-5 h-5 text-honey" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-bold text-xl tracking-tight text-char">
                  Terra<span className="text-leaf">Attend</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-honey text-char border border-amber-300">
                  AI FACULTY
                </span>
              </div>
              <p className="text-[11px] text-ink-muted hidden sm:block">Digital Attendance & Academic Intelligence</p>
            </div>
          </div>

          {/* Navigation Pills */}
          <nav className="flex items-center p-1 bg-cream-deep/60 rounded-2xl border border-line">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-char text-cream-light shadow-sm shadow-char/10'
                      : 'text-char-soft hover:text-char hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sun' : 'text-ink-muted'}`} />
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Faculty Profile badge */}
          <div className="hidden lg:flex items-center space-x-3 pl-4 border-l border-line">
            <div className="text-right">
              <p className="text-xs font-bold text-char font-display">Prof. Jonathan Smith</p>
              <p className="text-[11px] text-ink-muted font-mono">Faculty ID: #FAC-842</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-leaf-soft border border-leaf/30 flex items-center justify-center text-xs font-bold text-leaf-dark">
              JS
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
