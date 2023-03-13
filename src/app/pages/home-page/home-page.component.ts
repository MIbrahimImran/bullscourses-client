import { Component } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { ColDef } from 'ag-grid-community';
import { Course } from 'src/app/interfaces/course.interface';
import { HomePageService } from './home-page.service';
import { SubscriptionButtonComponent } from 'src/app/features/ag-grid/subscription-button/subscription-button.component';
import { AgGridService } from 'src/app/features/ag-grid/ag-grid.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(
    private homePageService: HomePageService,
    public auth: AuthService,
    public agGridService: AgGridService
  ) {}

  defaultTerm = '202301';
  subscriptionChecked = false;

  rowData: Course[] = [];

  columnDefs: ColDef[] = [
    { field: 'CRN', maxWidth: 100 },
    { field: 'SUBJ_CRS', headerName: 'Subject', maxWidth: 150 },
    {
      field: 'TITLE',
      headerName: 'Course Title',
      width: 350,
    },
    { field: 'TIME', headerName: 'Time', maxWidth: 200 },
    { field: 'CR', headerName: 'Credit', maxWidth: 100 },
    {
      field: 'SEATSREMAIN',
      headerName: 'Seats',
      maxWidth: 100,
      cellStyle: (params) => {
        if (params.value <= 0) {
          return { color: 'red', fontWeight: 'bold' };
        } else if (params.value <= 10) {
          return { color: 'orange', fontWeight: 'bold' };
        }
        return { color: 'green', fontWeight: 'bold' };
      },
    },
    {
      field: 'STATUS',
      headerName: 'Status',
      maxWidth: 100,
      cellStyle: (params) => {
        if (params.value === 'Closed') {
          return { color: 'red', fontWeight: 'bold' };
        }
        return { color: 'green', fontWeight: 'bold' };
      },
    },
    { field: 'INSTRUCTOR', headerName: 'Instructor', maxWidth: 200 },
    { field: 'BLDG', headerName: 'Building', maxWidth: 150 },
    { field: 'Notification', cellRenderer: SubscriptionButtonComponent },
  ];

  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

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
          this.isValidCourseCRN(userInput, course) ||
          this.isValidCourseCRS(userInput, course)
        ) {
          if (this.subscriptionChecked) {
            if (this.isCourseSubscribed(course)) {
              coursesMatched.push(course);
            }
          } else {
            coursesMatched.push(course);
          }
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

  isValidCourseCRS(userInput: string, course: Course): boolean {
    const trimmedInput = userInput.trim();
    const splitInput = trimmedInput.split(' ');
    if (splitInput.length === 2) {
      const [subject, courseNumber] = splitInput;
      return (
        course.SUBJ_CRS?.toLowerCase().includes(subject.toLowerCase()) &&
        course.SUBJ_CRS?.toLowerCase().includes(courseNumber.toLowerCase())
      );
    } else {
      return course.SUBJ_CRS?.toLowerCase().includes(userInput.toLowerCase());
    }
  }

  setSubscriptionCheck(checkValue: boolean): void {
    this.subscriptionChecked = checkValue;
    if (checkValue) {
      this.setOnlySubscribedCourses();
    }
  }

  setOnlySubscribedCourses(): void {
    const userSubscriptions = this.agGridService.userSubscriptions;
    this.homePageService.getAllCourses(this.defaultTerm).subscribe((data) => {
      const subscribedCourses = [];
      for (const course of data) {
        if (userSubscriptions.includes(course.CRN)) {
          subscribedCourses.push(course);
        }
      }
      this.rowData = subscribedCourses;
    });
  }

  isCourseSubscribed(course: Course): boolean {
    return this.agGridService.userSubscriptions.includes(course.CRN);
  }
}
