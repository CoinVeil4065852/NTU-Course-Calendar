import {
  GetCourseResponse,
  IntervalKey,
  IntervalsOfStartAndEndTime,
  Time,
} from "@/app/utils/types";
import ical from "ical-generator";

const semester = "113-2";
const firstDayOfSchool = {
  "113-1": new Date(2024, 8, 2, 0, 0, 0, 0),
  "113-2": new Date(2025, 1, 17, 0, 0, 0, 0),
};
const intervalsOfStartAndEndTime: IntervalsOfStartAndEndTime = {
  "0": { start: { hour: 7, minute: 10 }, end: { hour: 8, minute: 0 } },
  "1": { start: { hour: 8, minute: 10 }, end: { hour: 9, minute: 0 } },
  "2": { start: { hour: 9, minute: 10 }, end: { hour: 10, minute: 0 } },
  "3": { start: { hour: 10, minute: 20 }, end: { hour: 11, minute: 10 } },
  "4": { start: { hour: 11, minute: 20 }, end: { hour: 12, minute: 10 } },
  "5": { start: { hour: 12, minute: 20 }, end: { hour: 13, minute: 10 } },
  "6": { start: { hour: 13, minute: 20 }, end: { hour: 14, minute: 10 } },
  "7": { start: { hour: 14, minute: 20 }, end: { hour: 15, minute: 10 } },
  "8": { start: { hour: 15, minute: 30 }, end: { hour: 16, minute: 20 } },
  "9": { start: { hour: 16, minute: 30 }, end: { hour: 17, minute: 20 } },
  X: { start: { hour: 17, minute: 30 }, end: { hour: 18, minute: 20 } },
  A: { start: { hour: 18, minute: 25 }, end: { hour: 19, minute: 15 } },
  B: { start: { hour: 19, minute: 20 }, end: { hour: 20, minute: 10 } },
  C: { start: { hour: 20, minute: 15 }, end: { hour: 21, minute: 5 } },
  D: { start: { hour: 21, minute: 10 }, end: { hour: 22, minute: 0 } },
};

export function courseToCalendar(courseResponse: GetCourseResponse) {
  const calendar = ical({ name: "臺大課表", timezone: "Asia/Taipei" });

  courseResponse.assignedCourses.forEach(({ course }) => {
    course.schedules.forEach((it) => {
      const startTime = new Date(firstDayOfSchool[semester]);
      startTime.setDate(
        startTime.getDate() + (it.weekday - startTime.getDay())
      );

      const startHourAndMinute =
        intervalsOfStartAndEndTime[it.intervals[0]].start;
      startTime.setHours(startHourAndMinute.hour, startHourAndMinute.minute);

      const endTime = new Date(startTime);
      const endHourAndMinute =
        intervalsOfStartAndEndTime[it.intervals[it.intervals.length - 1]].end;
      endTime.setHours(endHourAndMinute.hour, endHourAndMinute.minute);

      for (let week = 1; week <= 16; week++) {
        if (
          course.intensiveWeeks.includes(week) ||
          course.intensiveWeeks.length === 0
        ) {
          if (startTime >= firstDayOfSchool[semester]) {
            calendar.createEvent({
              start: new Date(startTime),
              end: new Date(endTime),
              summary: course.name as string,
              location: it.classroom?.name,
            });
          }
        }
        startTime.setDate(startTime.getDate() + 7);
        endTime.setDate(endTime.getDate() + 7);
      }
    });
  });
  return calendar.toString();
}

type CourseList = {
  name: string;
  location: string | undefined;
  weekday: number;
  intervals: IntervalKey[];
  start: Time;
  end: Time;
};

//TODO needs refactor
export function courseResponseToCourses(
  courseResponse: GetCourseResponse
): CourseList[] {
  const courses: CourseList[] = [];
  courseResponse.assignedCourses.forEach(({ course }) => {
    course.schedules.forEach((it) => {
      courses.push({
        name: course.name as string,
        location: it.classroom?.name,
        weekday: it.weekday,
        intervals: it.intervals as IntervalKey[],
        start: intervalsOfStartAndEndTime[it.intervals[0]].start,
        end: intervalsOfStartAndEndTime[it.intervals[it.intervals.length - 1]]
          .end,
      });
    });
  });
  return courses;
}
