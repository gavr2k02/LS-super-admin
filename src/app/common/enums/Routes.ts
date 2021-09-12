export enum Routes {
  HOME = '/home',
  FACULTIES = '/faculties',
  GROUPS = '/faculty/:facultyId/groups',
  STUDENTS = '/faculty/group/:groupId/students',
  STUDENT = '/faculty/group/student/:studentId',
  TEACHERS = '/teachers',
  TEACHER = '/teacher/:teacherId',
  COURSES = '/courses',
  TIMETABLE = '/timetables',
  TIMETABLE_FACULTIES = '/timetable/:year/:month/:day/faculties',
  TIMETABLE_FACULTY = '/timetable/:year/:month/:day/faculty/:facultyId',
}
