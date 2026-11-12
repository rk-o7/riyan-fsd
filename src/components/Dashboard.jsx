import React, { useMemo } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  CheckCircle2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function Dashboard({ 
  classes, 
  students, 
  attendanceHistory, 
  selectedClassId, 
  setSelectedClassId,
  onNavigateToAttendance,
  onNavigateToStudentDetail
}) {
  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];
  const classStudents = useMemo(() => {
    return students.filter(s => s.classId === selectedClassId);
  }, [students, selectedClassId]);

  const classHistory = useMemo(() => {
    return attendanceHistory.filter(h => h.classId === selectedClassId);
  }, [attendanceHistory, selectedClassId]);

  // Compute student stats
  const studentMetrics = useMemo(() => {
    return classStudents.map(student => {
      let presentCount = 0;
      let lateCount = 0;
      let absentCount = 0;
      let excusedCount = 0;
      let totalSessions = classHistory.length;

      classHistory.forEach(record => {
        const status = record.records[student.id];
        if (status === 'Present') presentCount++;
        else if (status === 'Late') lateCount++;
        else if (status === 'Absent') absentCount++;
        else if (status === 'Excused') excusedCount++;
      });

      const attended = presentCount + lateCount;
      const percentage = totalSessions > 0 
        ? Math.round((attended / totalSessions) * 100) 
        : 100;

      return {
        ...student,
        presentCount,
        lateCount,
        absentCount,
        excusedCount,
        totalSessions,
        percentage
      };
    });
  }, [classStudents, classHistory]);

  const totalSessionsCount = classHistory.length;
  
  const overallAvg = useMemo(() => {
    if (studentMetrics.length === 0) return 0;
    const sum = studentMetrics.reduce((acc, s) => acc + s.percentage, 0);
    return Math.round(sum / studentMetrics.length);
  }, [studentMetrics]);

  const atRiskStudents = useMemo(() => {
    return studentMetrics.filter(s => s.percentage < 75 && totalSessionsCount > 0);
  }, [studentMetrics, totalSessionsCount]);

  const latestSession = classHistory[classHistory.length - 1];
  let latestStats = { present: 0, absent: 0, late: 0 };
  if (latestSession) {
    Object.values(latestSession.records).forEach(status => {
      if (status === 'Present') latestStats.present++;
      if (status === 'Absent') latestStats.absent++;
      if (status === 'Late') latestStats.late++;
    });
  }

  return (
    <div className="space-y-6">
      {/* Top Banner with Warm TerraSense Styling */}
      <div className="terra-card p-6 md:p-8 relative overflow-hidden bg-gradient-to-r from-cream-light via-cream-deep/40 to-honey/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-sun/15 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-honey/80 border border-amber-300 text-char text-xs font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-leaf" />
              <span>ACADEMIC SEMESTER MONITOR</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-char font-display tracking-tight">
              Attendance Intelligence & Insights
            </h1>
            <p className="text-sm text-ink-muted mt-1 max-w-xl">
              Track classroom attendance velocity, detect attendance drop-offs early, and export digital reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/80 border border-line rounded-2xl px-3 py-1.5 shadow-xs">
              <label className="block text-[10px] font-mono text-ink-muted uppercase">Selected Class</label>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="bg-transparent text-char text-sm font-bold focus:outline-hidden cursor-pointer"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.section})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onNavigateToAttendance}
              className="flex items-center space-x-2 bg-leaf hover:bg-leaf-dark text-white text-sm font-semibold px-5 py-3 rounded-2xl transition shadow-md shadow-leaf/20"
            >
              <Calendar className="w-4 h-4 text-honey" />
              <span>Mark Roll Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards in TerraSense warm earth tones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Enrolled */}
        <div className="terra-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">Enrolled Students</span>
            <div className="w-10 h-10 rounded-xl bg-leaf-soft border border-leaf/20 flex items-center justify-center text-leaf">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-char font-display mt-2">{classStudents.length}</h3>
          <p className="text-xs text-ink-muted mt-1 font-mono">{currentClass.department}</p>
        </div>

        {/* Class Average Rate */}
        <div className="terra-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">Aggregate Attendance</span>
            <div className="w-10 h-10 rounded-xl bg-honey/60 border border-amber-300 flex items-center justify-center text-char">
              <TrendingUp className="w-5 h-5 text-leaf" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-char font-display mt-2">{overallAvg}%</h3>
          <p className="text-xs text-ink-muted mt-1 font-mono">Over {totalSessionsCount} recorded lectures</p>
        </div>

        {/* Latest Session */}
        <div className="terra-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">Latest Session</span>
            <div className="w-10 h-10 rounded-xl bg-cream-deep border border-line flex items-center justify-center text-char">
              <UserCheck className="w-5 h-5 text-leaf" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-char font-display mt-2">
            {latestSession ? `${latestStats.present + latestStats.late} / ${classStudents.length}` : 'N/A'}
          </h3>
          <p className="text-xs text-ink-muted mt-1 font-mono">{latestSession?.date || 'No sessions yet'}</p>
        </div>

        {/* Defaulter / At Risk Count */}
        <div className="terra-card p-5 border-clay/30 bg-clay-soft/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-clay font-bold">At-Risk Students</span>
            <div className="w-10 h-10 rounded-xl bg-clay/10 border border-clay/30 flex items-center justify-center text-clay">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-3xl font-bold text-clay font-display mt-2">{atRiskStudents.length}</h3>
          <p className="text-xs text-clay/80 mt-1 font-mono">Attendance below 75% threshold</p>
        </div>
      </div>

      {/* Main Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* At-Risk Warning Defaulter Card */}
        <div className="lg:col-span-1 terra-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-clay/10 text-clay rounded-lg">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-base text-char">Defaulters List (&lt;75%)</h3>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-clay text-white">
                {atRiskStudents.length}
              </span>
            </div>

            {atRiskStudents.length === 0 ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="w-10 h-10 text-leaf mx-auto mb-2 opacity-80" />
                <p className="text-sm font-bold text-char font-display">Criterion Satisfied</p>
                <p className="text-xs text-ink-muted mt-1 max-w-xs mx-auto">
                  All students in this batch are maintaining above 75% attendance.
                </p>
              </div>
            ) : (
              <div className="space-y-3 mt-4">
                {atRiskStudents.map((st) => (
                  <div 
                    key={st.id} 
                    className="p-3.5 rounded-xl bg-white border border-line hover:border-clay/40 transition cursor-pointer flex items-center justify-between shadow-2xs"
                    onClick={() => onNavigateToStudentDetail && onNavigateToStudentDetail(st.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={st.avatar} alt={st.name} className="w-9 h-9 rounded-full object-cover border border-line" />
                      <div>
                        <p className="text-xs font-bold text-char">{st.name}</p>
                        <p className="text-[11px] font-mono text-ink-muted">{st.rollNo}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-clay bg-clay/10 px-2.5 py-1 rounded-md">
                        {st.percentage}%
                      </span>
                      <p className="text-[10px] text-ink-muted font-mono mt-1">{st.absentCount} missed</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-line text-[11px] text-ink-muted font-mono">
            Notice: Defaulter notification will be generated automatically for end-sem verification.
          </div>
        </div>

        {/* Student Attendance Detailed Matrix Table */}
        <div className="lg:col-span-2 terra-card p-6">
          <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
            <div>
              <h3 className="font-display font-bold text-lg text-char">Roster Engagement Matrix</h3>
              <p className="text-xs text-ink-muted font-mono">Class: {currentClass.name} • Sec {currentClass.section}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-deep/60 text-char font-mono font-semibold uppercase tracking-wider rounded-xl">
                <tr>
                  <th className="py-3 px-3 rounded-l-xl">Student</th>
                  <th className="py-3 px-3">Roll No</th>
                  <th className="py-3 px-2 text-center">Present</th>
                  <th className="py-3 px-2 text-center">Late</th>
                  <th className="py-3 px-2 text-center">Absent</th>
                  <th className="py-3 px-3 text-right">Aggregate</th>
                  <th className="py-3 px-3 text-center rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {studentMetrics.map((student) => {
                  const isSafe = student.percentage >= 75;
                  return (
                    <tr key={student.id} className="hover:bg-white/80 transition">
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-2.5">
                          <img 
                            src={student.avatar} 
                            alt={student.name} 
                            className="w-7 h-7 rounded-full object-cover border border-line" 
                          />
                          <span className="font-bold text-char">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-ink-muted">{student.rollNo}</td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-leaf">{student.presentCount}</td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-amber-600">{student.lateCount}</td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-clay">{student.absentCount}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="font-mono font-bold text-char">{student.percentage}%</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isSafe 
                            ? 'bg-leaf-soft text-leaf-dark border border-leaf/30' 
                            : 'bg-clay/10 text-clay border border-clay/30'
                        }`}>
                          {isSafe ? 'Eligible' : 'At-Risk'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
