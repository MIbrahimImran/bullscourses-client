import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseSearchBarService {
  constructor() {}

  fetchCourses(searchTerm: string) {
    return [
      {
        title: 'Introduction to Sociology',
        seatsRemain: 49,
        totalSeats: 50,
        time: '10:00 AM - 11:00 AM',
        instructor: 'John Doe',
        days: 'MW',
      },
      {
        title: 'Analysis of Algorithms',
        seatsRemain: 49,
        totalSeats: 50,
        time: '10:00 AM - 11:00 AM',
        instructor: 'John Doe',
        days: 'MW',
      },
      {
        title: 'Data Structures',
        seatsRemain: 49,
        totalSeats: 50,
        time: '10:00 AM - 11:00 AM',
        instructor: 'John Doe',
        days: 'MW',
      },
    ];
  }
}
