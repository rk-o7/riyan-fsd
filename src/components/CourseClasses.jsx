import React, { useState } from 'react';
import { BookOpen, Plus, Users, Trash2 } from 'lucide-react';

export default function CourseClasses({ 
  classes, 
  students, 
  onAddClass, 
  onDeleteClass 
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [semester, setSemester] = useState('Semester 1');
  const [section, setSection] = useState('A');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    const newClass = {
      id: `c-${Date.now()}`,
      name,
      department,
      semester,
      section
    };

    onAddClass(newClass);
    setIsModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="terra-card p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-display text-char">Course Classes & Sections</h2>
          <p className="text-xs text-ink-muted font-mono mt-0.5">Faculty course allocation and academic section management.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-1.5 bg-leaf hover:bg-leaf-dark text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition shadow-xs"
        >
          <Plus className="w-4 h-4 text-honey" />
          <span>Add Course Class</span>
        </button>
      </div>

      {/* Class Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {classes.map((cls) => {
          const studentCount = students.filter(s => s.classId === cls.id).length;

          return (
            <div 
              key={cls.id} 
              className="terra-card p-6 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-honey/80 border border-amber-300 flex items-center justify-center text-char">
                    <BookOpen className="w-5 h-5 text-leaf" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-cream-deep border border-line text-char">
                    Sec {cls.section}
                  </span>
                </div>

                <h3 className="text-base font-bold font-display text-char mt-3">{cls.name}</h3>
                <p className="text-xs text-ink-muted font-mono mt-1">{cls.department}</p>
                <p className="text-xs font-semibold text-char-soft mt-0.5">{cls.semester}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-line flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs text-char font-mono font-semibold">
                  <Users className="w-4 h-4 text-leaf" />
                  <span>{studentCount} Enrolled Students</span>
                </div>

                {classes.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm(`Remove class "${cls.name}"?`)) {
                        onDeleteClass(cls.id);
                      }
                    }}
                    className="text-ink-muted hover:text-clay p-1 rounded-lg transition"
                    title="Delete Class"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-char/40 backdrop-blur-xs p-4">
          <div className="bg-[#fbf7ef] rounded-3xl max-w-md w-full shadow-2xl border border-line overflow-hidden">
            <div className="p-5 border-b border-line flex items-center justify-between bg-cream-deep/60">
              <h3 className="text-base font-bold font-display text-char">Create Academic Course</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ink-muted hover:text-char text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">Course Code & Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CS302 - Database Engineering"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-line text-char text-sm rounded-xl px-3 py-2 font-bold focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-ink-muted mb-1">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white border border-line text-char text-sm rounded-xl px-3 py-2 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-ink-muted mb-1">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full bg-white border border-line text-char text-sm rounded-xl px-3 py-2 font-bold focus:outline-hidden"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={`Semester ${sem}`}>Semester {sem}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-ink-muted mb-1">Section</label>
                  <input
                    type="text"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full bg-white border border-line text-char text-sm rounded-xl px-3 py-2 font-mono font-bold focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-ink-muted hover:text-char transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-leaf hover:bg-leaf-dark text-white rounded-xl shadow-xs transition"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
