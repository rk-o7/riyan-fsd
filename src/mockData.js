export const INITIAL_CLASSES = [
  { id: 'c1', name: 'CS101 - Intro to Computer Science', department: 'Computer Science', semester: 'Semester 1', section: 'A' },
  { id: 'c2', name: 'CS202 - Data Structures & Algorithms', department: 'Computer Science', semester: 'Semester 3', section: 'B' },
  { id: 'c3', name: 'CS305 - Full Stack Web Development', department: 'Information Technology', semester: 'Semester 5', section: 'A' },
  { id: 'c4', name: 'CS410 - Artificial Intelligence', department: 'Computer Science', semester: 'Semester 7', section: 'A' },
];

export const INITIAL_STUDENTS = [
  { id: 's1', rollNo: 'CS2024-001', name: 'Aarav Sharma', email: 'aarav.sharma@univ.edu', classId: 'c3', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80' },
  { id: 's2', rollNo: 'CS2024-002', name: 'Diya Patel', email: 'diya.patel@univ.edu', classId: 'c3', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80' },
  { id: 's3', rollNo: 'CS2024-003', name: 'Rohan Verma', email: 'rohan.verma@univ.edu', classId: 'c3', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80' },
  { id: 's4', rollNo: 'CS2024-004', name: 'Ananya Iyer', email: 'ananya.iyer@univ.edu', classId: 'c3', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80' },
  { id: 's5', rollNo: 'CS2024-005', name: 'Vikram Malhotra', email: 'vikram.m@univ.edu', classId: 'c3', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
  { id: 's6', rollNo: 'CS2024-006', name: 'Sneha Reddy', email: 'sneha.r@univ.edu', classId: 'c3', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
  { id: 's7', rollNo: 'CS2024-007', name: 'Kabir Das', email: 'kabir.das@univ.edu', classId: 'c3', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
  { id: 's8', rollNo: 'CS2024-008', name: 'Pooja Hegde', email: 'pooja.h@univ.edu', classId: 'c3', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80' },
  { id: 's9', rollNo: 'CS2024-009', name: 'Arjun Nair', email: 'arjun.n@univ.edu', classId: 'c2', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80' },
  { id: 's10', rollNo: 'CS2024-010', name: 'Meera Sen', email: 'meera.sen@univ.edu', classId: 'c2', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
  { id: 's11', rollNo: 'CS2024-011', name: 'Tanmay Joshi', email: 'tanmay.j@univ.edu', classId: 'c1', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80' },
  { id: 's12', rollNo: 'CS2024-012', name: 'Kavya Rao', email: 'kavya.rao@univ.edu', classId: 'c1', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80' },
];

// Generate past 5 days of sample records for class c3
const getPastDateStr = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const INITIAL_ATTENDANCE_RECORDS = [
  // 4 days ago
  { id: 'att-1', classId: 'c3', date: getPastDateStr(4), session: 'Morning Lecture (09:00 - 10:30 AM)', records: {
    s1: 'Present', s2: 'Present', s3: 'Late', s4: 'Present', s5: 'Absent', s6: 'Present', s7: 'Present', s8: 'Excused'
  }},
  // 3 days ago
  { id: 'att-2', classId: 'c3', date: getPastDateStr(3), session: 'Lab Session (02:00 - 04:00 PM)', records: {
    s1: 'Present', s2: 'Present', s3: 'Present', s4: 'Absent', s5: 'Present', s6: 'Present', s7: 'Absent', s8: 'Present'
  }},
  // 2 days ago
  { id: 'att-3', classId: 'c3', date: getPastDateStr(2), session: 'Morning Lecture (09:00 - 10:30 AM)', records: {
    s1: 'Present', s2: 'Late', s3: 'Present', s4: 'Present', s5: 'Present', s6: 'Present', s7: 'Present', s8: 'Present'
  }},
  // 1 day ago
  { id: 'att-4', classId: 'c3', date: getPastDateStr(1), session: 'Tutorial & Code Review (11:00 - 12:30 PM)', records: {
    s1: 'Present', s2: 'Present', s3: 'Absent', s4: 'Present', s5: 'Late', s6: 'Present', s7: 'Present', s8: 'Present'
  }},
  // Today's attendance
  { id: 'att-5', classId: 'c3', date: getPastDateStr(0), session: 'Main Theory (10:00 - 11:30 AM)', records: {
    s1: 'Present', s2: 'Present', s3: 'Present', s4: 'Present', s5: 'Absent', s6: 'Present', s7: 'Present', s8: 'Present'
  }}
];

