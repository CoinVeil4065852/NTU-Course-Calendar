export interface GetCourseResponse {
  assignedCourses: AssignedCourse[];
  unassignedCourses: unknown[];
}

export interface AssignedCourse {
  courseId: string;
  course: Course;
}

export interface Course {
  id: string;
  serial: string;
  identifier: string;
  code: string;
  name: string;
  notes: string;
  teacher: Teacher;
  class?: string;
  courseTargets: CourseTarget[];
  schedules: Schedule[];
  isCommon: boolean;
  intensiveWeeks: number[];
  specializedPrograms: SpecializedProgram[];
  credits: number;
  totalStudentQuota: number;
  otherDepartmentsStudentQuota: number;
  nonNtuStudentQuota: number;
  changeItems: unknown[];
  status: string;
  enrollMethod: number;
  studentGradeLimits: StudentGradeLimit[];
  isEnglishTaught: boolean;
  precourseLimit?: PrecourseLimit;
  semester: string;
  provider: string;
  hostDepartment: string;
  coreCapabilityUrlQuery?: string;
  basicAttainmentUrlQuery: unknown;
  coolUrl?: string;
  practiceGroups: unknown[];
}

export interface Teacher {
  id: string;
  name: string;
  hostDepartment?: string;
  college?: string;
  jobTitle: string;
  websiteUrl?: string;
  email?: string;
  phone?: string;
  office?: string;
  info?: string;
}

export interface CourseTarget {
  department: Department;
  courseType: string;
  isCompulsory?: boolean;
  isPreallocated: boolean;
  generalMarks: string[];
}

export interface Department {
  id: string;
  name: string;
  shortName: string;
}

export interface Schedule {
  weekday: number;
  intervals: string[];
  classroom?: Classroom;
}

export interface Classroom {
  id: string;
  name: string;
  location: string;
  buildingName: string;
  buildingId?: string;
  accessibility: boolean;
  layer: string;
  detail: string;
}

export interface SpecializedProgram {
  code: string;
  name: string;
}

export interface StudentGradeLimit {
  id: string;
  description: string;
}

export interface PrecourseLimit {
  id: string;
  identificationType: string;
  studentLimitType: string;
  precourseLimitCourses: PrecourseLimitCourse[];
}

export interface PrecourseLimitCourse {
  order: number;
  precourseName: string;
  precourseCode: string;
  requiredScore: number;
  isCorequisite: boolean;
}

export interface Time {
  hour: number;
  minute: number;
}

export interface Interval {
  start: Time;
  end: Time;
}

export type IntervalsOfStartAndEndTime = {
  [key: string]: Interval;
};

export type IntervalKey= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "X" | "A" | "B" | "C" | "D"