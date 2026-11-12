import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Trash2, 
  Mail, 
  GraduationCap
} from 'lucide-react';

export default function StudentsDirectory({ 
  classes, 
  students, 
  onAddStudent, 
  onDeleteStudent,
  attendanceHistory 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newRollNo, setNewRollNo] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newClassId, setNewClassId] = useState(classes[0]?.id || '');

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClassFilter === 'ALL' || student.classId === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newRollNo || !newName || !newEmail || !newClassId) {
      alert('Please fill out all fields.');
      return;
    }

    const newStudent = {
      id: `s-${Date.now()}`,
      rollNo: newRollNo,
      name: newName,
      email: newEmail,
      classId: newClassId,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 5000)}?w=120&auto=format&fit=crop&q=80`
    };

    onAddStudent(newStudent);
    setIsAddModalOpen(false);
    setNewRollNo('');
    setNewName('');
    setNewEmail('');
  };

  const getStudentPercentage = (studentId, classId) => {
    const relevantSessions = attendanceHistory.filter(h => h.classId === classId);
    if (relevantSessions.length === 0) return 100;

    let present = 0;
    relevantSessions.forEach(session => {
      const status = session.records[studentId];
      if (status === 'Present' || status === 'Late') {
        present++;
      }
    });

    return Math.round((present / relevantSessions.length) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="terra-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-char">Enrolled Student Directory</h2>
          <p className="text-xs text-ink-muted font-mono mt-0.5">Manage student identities, course allocations, and academic standings.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student or roll no..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/80 border border-line text-char text-xs sm:text-sm rounded-xl pl-9 pr-3 py-2 focus:outline-hidden w-48 sm:w-64"
            />
          </div>

          <select
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            className="bg-white/80 border border-line text-char text-xs sm:text-sm rounded-xl px-3 py-2 font-bold focus:outline-hidden"
          >
            <option value="ALL">All Course Classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.section})
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-1.5 bg-leaf hover:bg-leaf-dark text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition shadow-xs"
          >
            <UserPlus className="w-4 h-4 text-honey" />
            <span>Enroll Student</span>
          </button>
        </div>
      </div>

      {/* Grid of Student Cards with TerraSense palette */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStudents.map(student => {
          const studentClass = classes.find(c => c.id === student.classId);
          const percentage = getStudentPercentage(student.id, student.classId);
          const isAtRisk = percentage < 75;

          return (
            <div 
              key={student.id} 
              className="terra-card p-5 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="w-12 h-12 rounded-2xl object-cover border border-line" 
                    />
                    <div>
                      <h4 className="text-sm font-bold text-char font-display">{student.name}</h4>
                      <p className="text-xs font-mono text-ink-muted">{student.rollNo}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Remove ${student.name} from records?`)) {
                        onDeleteStudent(student.id);
                      }
                    }}
                    className="text-ink-muted hover:text-clay p-1 rounded-lg transition"
                    title="Remove Student"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-4 pt-3 border-t border-line space-y-2 text-xs">
                  <div className="flex items-center justify-between text-char">
                    <span className="flex items-center space-x-1.5 font-medium truncate max-w-[180px]">
                      <GraduationCap className="w-3.5 h-3.5 text-leaf shrink-0" />
                      <span className="truncate">{studentClass?.name || 'Unassigned'}</span>
                    </span>
                    <span className="font-mono text-ink-muted font-bold">Sec {studentClass?.section || '-'}</span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-ink-muted truncate font-mono">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{student.email}</span>
                  </div>
                </div>
              </div>

              {/* Progress and status */}
              <div className="mt-5 pt-3 border-t border-line flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-ink-muted uppercase">Attendance Health</span>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className={`text-base font-mono font-bold ${isAtRisk ? 'text-clay' : 'text-leaf'}`}>
                      {percentage}%
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isAtRisk ? 'bg-clay/10 text-clay' : 'bg-leaf-soft text-leaf-dark'
                    }`}>
                      {isAtRisk ? 'Below Limit' : 'Good Standing'}
                    </span>
                  </div>
                </div>

                <div className="w-16 bg-line rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${isAtRisk ? 'bg-clay' : 'bg-leaf'}`} 
                    style={{ width: `${Math.min(100, percentage)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-char/40 backdrop-blur-xs p-4">
          <div className="bg-[#fbf7ef] rounded-3xl max-w-md w-full shadow-2xl border border-line overflow-hidden">
            <div className="p-5 border-b border-line flex items-center justify-between bg-cream-deep/60">
              <h3 className="text-base font-bold font-display text-char">Enroll New Student</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-ink-muted hover:text-char text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">Roll Number / ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS2024-089"
                  value={newRollNo}
                  onChange={(e) => setNewRollNo(e.target.value)}
                  className="w-full bg-white border border-line text-char text-sm rounded-xl px-3 py-2 font-mono focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">Full Student Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Krishnan"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-white border border-line text-char text-sm rounded-xl px-3 py-2 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">Institutional Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. maya.k@univ.edu"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-white border border-line text-char text-sm rounded-xl px-3 py-2 font-mono focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">Assign Course Section</label>
                <select
                  value={newClassId}
                  onChange={(e) => setNewClassId(e.target.value)}
                  className="w-full bg-white border border-line text-char text-sm rounded-xl px-3 py-2 font-bold focus:outline-hidden"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.section})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-ink-muted hover:text-char transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-leaf hover:bg-leaf-dark text-white rounded-xl shadow-xs transition"
                >
                  Complete Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
