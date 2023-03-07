import { Component } from '@angular/core';
import { Course } from 'src/app/interfaces/course.interface';
import { HomePageService } from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  coursesMatched: Course[] = [];

  defaultTerm = '202301';

  constructor(private homePageService: HomePageService) {}

  onSearchCourse(userInput: string): void {
    if (userInput.trim() === '') {
      this.coursesMatched = [];
      return;
    }

    this.homePageService.getAllCourses(this.defaultTerm).subscribe((data) => {
      const matched = [];
      for (const course of data) {
        if (
          this.isValidCourseTitle(userInput, course) ||
          this.isValidCourseCRN(userInput, course)
        ) {
          matched.push(course);
        }
      }
      this.coursesMatched = matched;
    });
  }

  isValidCourseTitle(userInput: string, course: Course): boolean {
    return course.TITLE?.toLowerCase().includes(userInput.toLowerCase());
  }

  isValidCourseCRN(userInput: string, course: Course): boolean {
    return course.CRN?.toLowerCase().includes(userInput.toLowerCase());
  }
}
