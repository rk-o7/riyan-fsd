import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TakeAttendance from './components/TakeAttendance';
import AttendanceHistory from './components/AttendanceHistory';
import StudentsDirectory from './components/StudentsDirectory';
import CourseClasses from './components/CourseClasses';
import { 
  INITIAL_CLASSES, 
  INITIAL_STUDENTS, 
  INITIAL_ATTENDANCE_RECORDS 
} from './mockData';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-xl mx-auto my-12 bg-white rounded-2xl border border-red-200 shadow-lg text-slate-800">
          <h2 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h2>
          <pre className="text-xs bg-red-50 p-3 rounded-lg overflow-x-auto text-red-800 mb-4">
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
          >
            Clear Stored Data & Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function safeLoad(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    if (!val) return fallback;
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallback;
  } catch (e) {
    return fallback;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const [classes, setClasses] = useState(() => safeLoad('attend_classes', INITIAL_CLASSES));
  const [students, setStudents] = useState(() => safeLoad('attend_students', INITIAL_STUDENTS));
  const [attendanceHistory, setAttendanceHistory] = useState(() => safeLoad('attend_records', INITIAL_ATTENDANCE_RECORDS));

  const [selectedClassId, setSelectedClassId] = useState(() => {
    return classes && classes.length > 0 ? classes[0].id : 'c3';
  });

  useEffect(() => {
    try {
      localStorage.setItem('attend_classes', JSON.stringify(classes));
    } catch (e) {}
  }, [classes]);

  useEffect(() => {
    try {
      localStorage.setItem('attend_students', JSON.stringify(students));
    } catch (e) {}
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem('attend_records', JSON.stringify(attendanceHistory));
    } catch (e) {}
  }, [attendanceHistory]);

  const handleSaveAttendance = (newRecord) => {
    setAttendanceHistory(prev => [...prev, newRecord]);
  };

  const handleDeleteRecord = (recordId) => {
    setAttendanceHistory(prev => prev.filter(r => r.id !== recordId));
  };

  const handleAddStudent = (newStudent) => {
    setStudents(prev => [...prev, newStudent]);
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
  };

  const handleAddClass = (newClass) => {
    setClasses(prev => [...prev, newClass]);
    setSelectedClassId(newClass.id);
  };

  const handleDeleteClass = (classId) => {
    setClasses(prev => prev.filter(c => c.id !== classId));
    if (selectedClassId === classId) {
      const remaining = classes.filter(c => c.id !== classId);
      if (remaining.length > 0) setSelectedClassId(remaining[0].id);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col font-sans selection:bg-amber-300 selection:text-slate-900 bg-[#fbf7ef]">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              classes={classes}
              students={students}
              attendanceHistory={attendanceHistory}
              selectedClassId={selectedClassId}
              setSelectedClassId={setSelectedClassId}
              onNavigateToAttendance={() => setActiveTab('take-attendance')}
              onNavigateToStudentDetail={() => setActiveTab('students')}
            />
          )}

          {activeTab === 'take-attendance' && (
            <TakeAttendance
              classes={classes}
              students={students}
              selectedClassId={selectedClassId}
              setSelectedClassId={setSelectedClassId}
              onSaveAttendance={handleSaveAttendance}
            />
          )}

          {activeTab === 'attendance-history' && (
            <AttendanceHistory
              classes={classes}
              students={students}
              attendanceHistory={attendanceHistory}
              selectedClassId={selectedClassId}
              setSelectedClassId={setSelectedClassId}
              onDeleteRecord={handleDeleteRecord}
            />
          )}

          {activeTab === 'students' && (
            <StudentsDirectory
              classes={classes}
              students={students}
              onAddStudent={handleAddStudent}
              onDeleteStudent={handleDeleteStudent}
              attendanceHistory={attendanceHistory}
            />
          )}

          {activeTab === 'classes' && (
            <CourseClasses
              classes={classes}
              students={students}
              onAddClass={handleAddClass}
              onDeleteClass={handleDeleteClass}
            />
          )}
        </main>

        <footer className="border-t border-[#e9e2d1] bg-[#fbf7ef]/80 backdrop-blur-md py-6 text-center text-xs font-mono text-[#7c7768]">
          <p>Student Attendance Management System • Faculty Digital Records</p>
          <p className="mt-1 text-[11px] opacity-75">Styled with TerraSense Warm Earth Natural Palette & Typography</p>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
