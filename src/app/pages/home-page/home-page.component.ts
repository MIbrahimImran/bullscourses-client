import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { ColDef } from 'ag-grid-community';
import { Course } from 'src/app/interfaces/course.interface';
import { HomePageService } from './home-page.service';
import { map } from 'rxjs';
import { SubscriptionButtonComponent } from 'src/app/features/ag-grid/subscription-button/subscription-button.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  defaultTerm = '202301';

  rowData: Course[] = [];

  columnDefs: ColDef[] = [
    { field: 'CRN' },
    { field: 'SUBJ_CRS' },
    { field: 'TITLE' },
    { field: 'TIME' },
    // { field: 'CR' },
    { field: 'SEATSREMAIN' },
    // { field: 'STATUS' },
    // { field: 'INSTRUCTOR' },
    // { field: 'BLDG' },
    { field: 'Notification', cellRenderer: SubscriptionButtonComponent },
  ];

  constructor(
    private homePageService: HomePageService,
    public auth: AuthService
  ) {}

  onSearchCourse(userInput: string): void {
    if (userInput.trim() === '') {
      this.rowData = [];
      return;
    }

    this.homePageService.getAllCourses(this.defaultTerm).subscribe((data) => {
      const coursesMatched = [];
      for (const course of data) {
        if (
          this.isValidCourseTitle(userInput, course) ||
          this.isValidCourseCRN(userInput, course)
        ) {
          coursesMatched.push(course);
        }
      }
      this.rowData = coursesMatched;
    });
  }

  isValidCourseTitle(userInput: string, course: Course): boolean {
    return course.TITLE?.toLowerCase().includes(userInput.toLowerCase());
  }

  isValidCourseCRN(userInput: string, course: Course): boolean {
    return course.CRN?.toLowerCase().includes(userInput.toLowerCase());
  }
}
