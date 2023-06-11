import { Component } from '@angular/core';
import axios from 'axios';

interface Input {
  name: string;
}

interface Course {
  crn: string;
  name: string;
  days: string;
  time: string;
}

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent {
  inputList: Input[] = [{ name: '' }];
  schedules: Course[][] = [];

  handleAddClick(): void {
    this.inputList.push({ name: '' });
  }

  async generateSchedules(): Promise<void> {
    const courses = await Promise.all(
      this.inputList.map(async ({ name }) => {
        const response = await axios.get(`http://localhost:3000/courses/${name}`);
        return {
          name,
          times: response.data
            .map((course: any) => ({
              crn: course.CRN,
              name: course.TITLE,
              days: course.DAYS,
              time: course.TIME.trim(),
            }))
            .filter((course: Course) => course.time.toUpperCase() !== 'TBA'),
        };
      })
    );

    const generatedSchedules = this.generateSchedulesBacktracking(courses);
    this.schedules = generatedSchedules;
  }

  generateSchedulesBacktracking(
    courses: { name: string; times: Course[] }[],
    currentSchedule: Course[] = [],
    schedules: Course[][] = []
  ): Course[][] {
    if (!courses.length) {
      schedules.push(currentSchedule);
      return schedules;
    }

    const [currentCourse, ...remainingCourses] = courses;

    for (const course of currentCourse.times) {
      if (!this.doesTimeOverlap(currentSchedule, course)) {
        this.generateSchedulesBacktracking(
          remainingCourses,
          [...currentSchedule, course],
          schedules
        );
      }
    }

    return schedules;
  }

  doesTimeOverlap(currentSchedule: Course[], newCourse: Course): boolean {
    return currentSchedule.some(({ days, time }) => {
      const [currentStart, currentEnd] = time.split('-').map((t) =>
        parseInt(t.replace(':', ''), 10)
      );
      const [newStart, newEnd] = newCourse.time.split('-').map((t) =>
        parseInt(t.replace(':', ''), 10)
      );

      const overlappingDays = [...days].filter((day) => newCourse.days.includes(day));

      if (overlappingDays.length === 0) {
        return false;
      }

      return (
        (newStart >= currentStart && newStart <= currentEnd) ||
        (newEnd >= currentStart && newEnd <= currentEnd)
      );
    });
  }
}
