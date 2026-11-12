import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  HelpCircle, 
  Save, 
  CheckCheck, 
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';

export default function TakeAttendance({ 
  classes, 
  students, 
  selectedClassId, 
  setSelectedClassId,
  onSaveAttendance
}) {
  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];
  const classStudents = students.filter(s => s.classId === selectedClassId);

  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [session, setSession] = useState('Morning Lecture (09:00 - 10:30 AM)');
  const [statuses, setStatuses] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const initial = {};
    classStudents.forEach(st => {
      initial[st.id] = 'Present';
    });
    setStatuses(initial);
  }, [selectedClassId, students]);

  const handleStatusChange = (studentId, status) => {
    setStatuses(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const markAll = (status) => {
    const updated = {};
    classStudents.forEach(st => {
      updated[st.id] = status;
    });
    setStatuses(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (classStudents.length === 0) {
      alert('No students found for this class.');
      return;
    }

    const record = {
      id: `att-${Date.now()}`,
      classId: selectedClassId,
      date,
      session,
      records: { ...statuses }
    };

    onSaveAttendance(record);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const total = classStudents.length;
  const presentCount = Object.values(statuses).filter(s => s === 'Present').length;
  const absentCount = Object.values(statuses).filter(s => s === 'Absent').length;
  const lateCount = Object.values(statuses).filter(s => s === 'Late').length;
  const excusedCount = Object.values(statuses).filter(s => s === 'Excused').length;

  return (
    <div className="space-y-6">
      {/* Configuration Header Card */}
      <div className="terra-card p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-honey border border-amber-300 text-char text-[11px] font-mono font-medium mb-2">
              <Sparkles className="w-3 h-3 text-leaf" />
              <span>DIGITAL ROLL CALL SESSION</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-char tracking-tight">Record Class Attendance</h2>
            <p className="text-xs text-ink-muted mt-1 font-mono">
              Fast, single-click student status toggling with instant validation.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => markAll('Present')}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-leaf-soft text-leaf-dark border border-leaf/30 hover:bg-leaf hover:text-white transition flex items-center space-x-1.5 shadow-2xs"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Present</span>
            </button>
            <button
              onClick={() => markAll('Absent')}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-clay/10 text-clay border border-clay/30 hover:bg-clay hover:text-white transition shadow-2xs"
            >
              Mark All Absent
            </button>
          </div>
        </div>

        {/* Inputs in TerraSense warm aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/80 p-3.5 rounded-2xl border border-line">
            <label className="block text-[11px] font-mono text-ink-muted uppercase mb-1">Target Course</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full bg-transparent font-bold text-char text-sm focus:outline-hidden cursor-pointer"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.section})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white/80 p-3.5 rounded-2xl border border-line">
            <label className="block text-[11px] font-mono text-ink-muted uppercase mb-1">Lecture Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent font-mono font-bold text-char text-sm focus:outline-hidden"
            />
          </div>

          <div className="bg-white/80 p-3.5 rounded-2xl border border-line">
            <label className="block text-[11px] font-mono text-ink-muted uppercase mb-1">Lecture / Session Slot</label>
            <input
              type="text"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              placeholder="e.g. Lab Session 02:00 - 04:00 PM"
              className="w-full bg-transparent font-bold text-char text-sm focus:outline-hidden"
            />
          </div>
        </div>

        {/* Live Counters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6 pt-4 border-t border-line text-xs font-mono">
          <span className="text-ink-muted font-bold">Session Counter:</span>
          <span className="px-3 py-1 rounded-full bg-white border border-line text-char font-bold">
            Total: {total}
          </span>
          <span className="px-3 py-1 rounded-full bg-leaf-soft border border-leaf/30 text-leaf-dark font-bold">
            Present: {presentCount}
          </span>
          <span className="px-3 py-1 rounded-full bg-clay/10 border border-clay/30 text-clay font-bold">
            Absent: {absentCount}
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100/70 border border-amber-300 text-amber-800 font-bold">
            Late: {lateCount}
          </span>
          <span className="px-3 py-1 rounded-full bg-cream-deep border border-line text-char font-bold">
            Excused: {excusedCount}
          </span>
        </div>
      </div>

      {/* Save Success Alert */}
      {saveSuccess && (
        <div className="p-4 bg-leaf-soft border border-leaf/40 text-leaf-dark rounded-2xl flex items-center space-x-3 shadow-xs">
          <CheckCircle className="w-5 h-5 text-leaf shrink-0" />
          <p className="text-sm font-bold font-display">
            Session recorded successfully! Stored in the institutional digital log.
          </p>
        </div>
      )}

      {/* Roster Form List */}
      <div className="terra-card overflow-hidden">
        <div className="p-4.5 bg-cream-deep/40 border-b border-line flex items-center justify-between">
          <h3 className="text-sm font-bold font-display text-char">
            Student Roster ({classStudents.length} Students)
          </h3>
          <span className="text-xs font-mono text-ink-muted">Tap status to assign</span>
        </div>

        {classStudents.length === 0 ? (
          <div className="p-12 text-center text-ink-muted font-mono">
            No students registered in this course class.
          </div>
        ) : (
          <div className="divide-y divide-line/60">
            {classStudents.map((student, idx) => {
              const currentStatus = statuses[student.id] || 'Present';
              return (
                <div 
                  key={student.id} 
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition"
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-xs font-mono font-bold text-ink-muted w-6">#{idx + 1}</span>
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="w-10 h-10 rounded-full object-cover border border-line" 
                    />
                    <div>
                      <p className="text-sm font-bold text-char font-display">{student.name}</p>
                      <p className="text-xs font-mono text-ink-muted">{student.rollNo} • {student.email}</p>
                    </div>
                  </div>

                  {/* TerraSense styled status toggles */}
                  <div className="flex items-center space-x-1.5 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Present')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center space-x-1 transition ${
                        currentStatus === 'Present'
                          ? 'bg-leaf text-white shadow-xs font-bold'
                          : 'bg-white border border-line text-ink-muted hover:border-leaf/40 hover:text-leaf-dark'
                      }`}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Present</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Absent')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center space-x-1 transition ${
                        currentStatus === 'Absent'
                          ? 'bg-clay text-white shadow-xs font-bold'
                          : 'bg-white border border-line text-ink-muted hover:border-clay/40 hover:text-clay'
                      }`}
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Absent</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Late')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center space-x-1 transition ${
                        currentStatus === 'Late'
                          ? 'bg-sun text-char font-bold shadow-xs'
                          : 'bg-white border border-line text-ink-muted hover:border-amber-300 hover:text-amber-800'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Late</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStatusChange(student.id, 'Excused')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center space-x-1 transition ${
                        currentStatus === 'Excused'
                          ? 'bg-char text-cream-light font-bold shadow-xs'
                          : 'bg-white border border-line text-ink-muted hover:border-char/40 hover:text-char'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Excused</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="p-4.5 bg-cream-deep/40 border-t border-line flex items-center justify-between">
          <p className="text-xs text-ink-muted font-mono">
            Signed by Faculty In-Charge • Auto-synced to student portal
          </p>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-char hover:bg-char-soft text-cream-light text-sm font-semibold px-6 py-2.5 rounded-xl transition shadow-md"
          >
            <Save className="w-4 h-4 text-sun" />
            <span>Save & Finalize Roster</span>
          </button>
        </div>
      </div>
    </div>
  );
}
