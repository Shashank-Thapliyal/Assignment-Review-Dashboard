export const users = [
  {
    id: 'admin-1',
    name: 'Professor 1',
    email: 'professor1@ard.demo',
    role: 'admin',
    department: 'Computer Science and Engineering',
    initials: 'P1',
    rollNumber: null,
  },
  {
    id: 'admin-2',
    name: 'Professor 2',
    email: 'professor2@ard.demo',
    role: 'admin',
    department: 'Computer Science and Engineering',
    initials: 'P2',
    rollNumber: null,
  },
  ...Array.from({ length: 5 }, (_, index) => {
    const number = index + 1

    return {
      id: `student-${number}`,
      name: `Student ${number}`,
      email: `student${number}@ard.demo`,
      role: 'student',
      department: 'Computer Science and Engineering',
      initials: `S${number}`,
      rollNumber: `NITW_CSE_0${number}`,
    }
  }),
]

export const getUsersByRole = (role) => users.filter((user) => user.role === role)
