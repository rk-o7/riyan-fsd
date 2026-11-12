import React, { useState } from 'react';
import { 
  Download, 
  Trash2, 
  Eye,
  FileSpreadsheet,
  Filter
} from 'lucide-react';

export default function AttendanceHistory({ 
  classes, 
  students, 
  attendanceHistory, 
  selectedClassId, 
  setSelectedClassId,
  onDeleteRecord 
}) {
  const [filterDate, setFilterDate] = useState('');
  const [activeRecordModal, setActiveRecordModal] = useState(null);

  const filteredHistory = attendanceHistory.filter(h => {
    const matchesClass = h.classId === selectedClassId;
    const matchesDate = filterDate ? h.date === filterDate : true;
    return matchesClass && matchesDate;
  });

  const classStudents = students.filter(s => s.classId === selectedClassId);
  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];

  const exportToCSV = () => {
    if (filteredHistory.length === 0) {
      alert('No records available to export.');
      return;
    }

    const dates = filteredHistory.map(h => `${h.date} (${h.session})`);
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += ['Roll No', 'Student Name', ...dates].join(',') + '\r\n';

    classStudents.forEach(st => {
      const row = [
        `"${st.rollNo}"`,
        `"${st.name}"`,
        ...filteredHistory.map(h => `"${h.records[st.id] || 'N/A'}"`)
      ];
      csvContent += row.join(',') + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Attendance_Report_${currentClass.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Actions */}
      <div className="terra-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-display text-char">Attendance Logs & Archives</h2>
          <p className="text-xs text-ink-muted font-mono mt-0.5">Audit digital records and generate institutional CSV sheets.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-white/80 border border-line text-char text-xs sm:text-sm rounded-xl px-3 py-2 font-bold focus:outline-hidden"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.section})
              </option>
            ))}
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="bg-white/80 border border-line text-char font-mono text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-hidden"
          />

          {filterDate && (
            <button
              onClick={() => setFilterDate('')}
              className="text-xs font-mono text-clay hover:underline"
            >
              Clear
            </button>
          )}

          <button
            onClick={exportToCSV}
            className="flex items-center space-x-1.5 bg-leaf hover:bg-leaf-dark text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition shadow-xs"
          >
            <Download className="w-4 h-4 text-honey" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* History Log List */}
      <div className="terra-card overflow-hidden">
        <div className="p-4 bg-cream-deep/40 border-b border-line flex items-center justify-between">
          <h3 className="text-sm font-bold font-display text-char">
            Verified Sessions ({filteredHistory.length})
          </h3>
          <span className="text-xs font-mono text-ink-muted">Historical records</span>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="p-12 text-center text-ink-muted">
            <FileSpreadsheet className="w-10 h-10 mx-auto mb-2 text-ink-muted/50" />
            <p className="text-sm font-bold font-display text-char">No attendance sessions found</p>
            <p className="text-xs font-mono mt-1">Select another class or take new attendance.</p>
          </div>
        ) : (
          <div className="divide-y divide-line/60">
            {[...filteredHistory].reverse().map((record) => {
              let p = 0, a = 0, l = 0, e = 0;
              Object.values(record.records).forEach(status => {
                if (status === 'Present') p++;
                if (status === 'Absent') a++;
                if (status === 'Late') l++;
                if (status === 'Excused') e++;
              });
              const totalLogged = p + a + l + e;
              const rate = totalLogged > 0 ? Math.round(((p + l) / totalLogged) * 100) : 0;

              return (
                <div key={record.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white transition">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-mono font-bold text-char">{record.date}</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-honey border border-amber-300 text-char">
                        {record.session}
                      </span>
                    </div>
                    <p className="text-xs text-ink-muted font-mono">
                      Turnout: <strong className="text-char">{rate}%</strong> ({p} present, {a} absent, {l} late)
                    </p>
                  </div>

                  <div className="flex items-center space-x-2.5 self-end sm:self-center">
                    <button
                      onClick={() => setActiveRecordModal(record)}
                      className="px-3 py-1.5 rounded-xl border border-line bg-white text-char hover:border-leaf/40 text-xs font-semibold flex items-center space-x-1.5 transition shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-leaf" />
                      <span>Roster Detail</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('Delete this recorded session?')) {
                          onDeleteRecord(record.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-ink-muted hover:text-clay hover:bg-clay-soft transition"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {activeRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-char/40 backdrop-blur-xs p-4">
          <div className="bg-[#fbf7ef] rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-line overflow-hidden">
            <div className="p-5 border-b border-line flex items-center justify-between bg-cream-deep/60">
              <div>
                <h3 className="text-base font-bold font-display text-char">
                  Session Detail: {activeRecordModal.date}
                </h3>
                <p className="text-xs font-mono text-ink-muted mt-0.5">{activeRecordModal.session}</p>
              </div>
              <button
                onClick={() => setActiveRecordModal(null)}
                className="text-ink-muted hover:text-char text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 flex-1 bg-white/60">
              <div className="divide-y divide-line/60">
                {classStudents.map(student => {
                  const status = activeRecordModal.records[student.id] || 'Not Recorded';
                  let badgeClass = 'bg-cream-deep text-char border-line';
                  if (status === 'Present') badgeClass = 'bg-leaf-soft text-leaf-dark border-leaf/30';
                  if (status === 'Absent') badgeClass = 'bg-clay/10 text-clay border-clay/30';
                  if (status === 'Late') badgeClass = 'bg-honey text-char border-amber-300';
                  if (status === 'Excused') badgeClass = 'bg-cream-deep text-char border-line';

                  return (
                    <div key={student.id} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full object-cover border border-line" />
                        <div>
                          <p className="text-xs font-bold text-char font-display">{student.name}</p>
                          <p className="text-[11px] font-mono text-ink-muted">{student.rollNo}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md border ${badgeClass}`}>
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-cream-deep/40 border-t border-line text-right">
              <button
                onClick={() => setActiveRecordModal(null)}
                className="px-5 py-2 bg-char hover:bg-char-soft text-cream-light text-xs font-semibold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
