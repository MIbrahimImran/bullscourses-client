import { Component } from '@angular/core';
import axios from 'axios';
import * as moment from 'moment';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';

interface Input {
  name: string;
  color:string;
}

interface Course {
  crn: string;
  name: string;
  days: string;
  time: string;
  color:string;
  campus:string;
  prof:string;
}

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
})
export class SchedulePageComponent {
  onlyOpenClasses = true;

  currentPage: number = 1;
  schedulesPerPage: number = 1;

  totalPages(): number {
    return Math.ceil(this.schedules.length / this.schedulesPerPage);
  }

  // colors: Record<string, EventColor> = {
  //   red: {
  //     primary: '#ad2121',
  //     secondary: '#FAE3E3',
  //   },
  //   blue: {
  //     primary: '#1e90ff',
  //     secondary: '#D1E8FF',
  //   },
  //   yellow: {
  //     primary: '#e3bc08',
  //     secondary: '#FDF1BA',
  //   },
  // };

  viewDate: Date = new Date();
  dayStartHour: number = 8;
  dayEndHour: number = 19;
  start: Date;
  end: Date;
  events: CalendarEvent[] = [];
  paginatedSchedules: Course[][] = [];

  constructor() {
    const now = moment();
    this.start = now.startOf('day').add(2, 'hours').toDate();
    this.end = now.add(2, 'hours').toDate();

    this.events = [
      {
        start: this.start,
        end: this.end,
        title: 'A draggable and resizable event',
      },
    ];
  }

  inputList: Input[] = [{ name: 'ENC 1101', color: '#177B20' }]; //Input interface
  schedules: Course[][] = []; //course interface

  getRandomUniqueColor(): string {
    const usedColors = this.inputList.map((input) => input.color);
    const availableColors = [
      '#add8e6',
      '#00ff00',
      '#f490ec',
      '#6609c3',
      '#fec20f',
      '#0efb94',
    ].filter((color) => !usedColors.includes(color));

    if (availableColors.length === 0) {
      return 'rgb(200, 200, 200)'; // Return a default color if all colors have been used
    }

    const index = Math.floor(Math.random() * availableColors.length);
    return availableColors[index];
  }

  handleAddClick(): void {
    const color = this.getRandomUniqueColor();
    this.inputList.push({ name: '', color });
  }

  handleRemoveClick(index: number): void {
    this.inputList.splice(index, 1);
  }

  //  Days: MWFS - Time: 09:30am-10:45am09:30am-10:20am09:00am-10:15am  4 classes per week
  // TRF - Time: 12:30pm-01:45pm10:00am-10:50am 3 classes per week

  convertToCalendarEvents(paginatedSchedules: Course[][]): CalendarEvent[] {
    //the libray
    const dayMap = new Map<string, number>([
      ['M', 1],
      ['T', 2],
      ['W', 3],
      ['R', 4],
      ['F', 5],
      ['S', 6],
      ['U', 0],
    ]);

    return paginatedSchedules.flatMap((schedule: Course[]) => {
      return schedule.flatMap((course: Course) => {
        const days = course.days;
        const events: CalendarEvent[] = [];

        var daycount = 0;
        var timestring = course.time;
        for (const day of days) {
          daycount++;
          const dayIndex = dayMap.get(day);

          if (dayIndex !== undefined) {
            var start = moment(course.time.split('-')[0], 'hh:mma')
              .day(dayIndex)
              .toDate(); // Set the day for the start time
            var end = moment(course.time.split('-')[1], 'hh:mma')
              .day(dayIndex)
              .toDate(); // Set the day for the end time

            if (daycount >= 3 && course.time.length > 15) {
              console.log(timestring);
              timestring = timestring.slice(15);
              console.log(timestring);
            }

            if (
              timestring &&
              timestring.length > 0 &&
              (daycount == 3 || daycount == 4)
            ) {
              console.log(dayIndex);
              // secondstart = course.time.split('-')[1].slice(7);
              start = moment(timestring.split('-')[0], 'hh:mma')
                .day(dayIndex)
                .toDate(); // Set the day for the start time
              end = moment(timestring.split('-')[1], 'hh:mma')
                .day(dayIndex)
                .toDate();
            }

            const event: CalendarEvent = {
              start,
              end,
              title: course.name + '\n' + course.crn,
              color: { primary: course.color, secondary: course.color },
              meta: {
                crn: course.crn,
                days: course.days,
                time: course.time,
              },
            };
            events.push(event);
          }
        }

        return events;
      });
    });
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async generateSchedules(): Promise<void> {
    //gets classes
    const courses = await Promise.all(
      this.inputList.map(async ({ name, color }) => {
        const response = await axios.get(
          `https://server.bullscourses.com/courses/${name}`
        );
        console.log(response);
        return {
          name,
          times: response.data
            .filter(
              (course: any) =>
                course?.SUBJ_CRS.localeCompare(name, undefined, {
                  sensitivity: 'base',
                }) === 0 &&
                (this.onlyOpenClasses ? course?.STATUS === 'Open' : true) &&
                course?.CAMPUS === 'Tampa'
            )
            .map((course: any) => ({
              crn: course?.CRN,
              name: course?.TITLE,
              days: course?.DAYS,
              time: course?.TIME.trim(),
              color: color,
              campus: course?.CAMPUS,
              prof: course?.INSTRUCTOR,
            }))
            .filter(
              (course: Course) =>
                course.time.toUpperCase() !== 'TBA' && course.campus === 'Tampa'
            ),
        };
      })
    );

    const validcourses = courses.filter((e) => e.times.length !== 0);
    const generatedSchedules = this.generateSchedulesBacktracking(validcourses);
    this.schedules = this.shuffleArray(generatedSchedules); // Assign all generated schedules
    this.currentPage = 1;
    this.paginateSchedules(); // Call the pagination method
  }

  paginateSchedules(): void {
    const startIndex = (this.currentPage - 1) * this.schedulesPerPage;
    const endIndex = startIndex + this.schedulesPerPage;
    this.paginatedSchedules = this.schedules.slice(startIndex, endIndex);
  }

  nextPage(): void {
    const totalPages = this.totalPages();
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.paginateSchedules(); // Update paginated schedules for the new page
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateSchedules(); // Update paginated schedules for the new page
    }
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

  convertToMinutes(time: string): number {
    let hours, minutes, period;

    // Check if time includes a space
    if (time.includes(' ')) {
      const [hourMin, periodWithSpace] = time.split(' ');
      [hours, minutes] = hourMin.split(':').map(Number);
      period = periodWithSpace;
    } else {
      const hourMin = time.slice(0, -2);
      period = time.slice(-2);
      [hours, minutes] = hourMin.split(':').map(Number);
    }

    if (period.toLowerCase() === 'pm' && hours !== 12) {
      hours += 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  }
  
  
  
  doesTimeOverlap(currentSchedule: Course[], newCourse: Course): boolean {
    return currentSchedule.some(({ days, time }) => {
      const [currentStartStr, currentEndStr] = time.split('-');
      const currentStart = this.convertToMinutes(currentStartStr);
      const currentEnd = this.convertToMinutes(currentEndStr);
  
      const [newStartStr, newEndStr] = newCourse.time.split('-');
      const newStart = this.convertToMinutes(newStartStr);
      const newEnd = this.convertToMinutes(newEndStr);
  
      const overlappingDays = [...days].filter((day) =>
        newCourse.days.includes(day)
      );
  
      if (overlappingDays.length === 0) {
        return false;
      }
  
      return (
        (newStart >= currentStart && newStart < currentEnd) ||
        (newEnd > currentStart && newEnd <= currentEnd) ||
        (newStart <= currentStart && newEnd >= currentEnd)
      );
    });
  }
  
}
