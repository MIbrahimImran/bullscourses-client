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
    private agGridService: AgGridService,
    public auth: AuthService
  ) {}

  defaultTerm = '202301';
  subscriptionChecked = false;

  rowData: Course[] = [];

  columnDefs: ColDef[] = [
    { field: 'CRN', maxWidth: 90 },
    { field: 'SUBJ_CRS', headerName: 'Subject', maxWidth: 120 },
    {
      field: 'TITLE',
      headerName: 'Course Title',
      width: 220,
    },
    { field: 'TIME', headerName: 'Time', maxWidth: 170 },
    { field: 'DAYS', headerName: 'Days', maxWidth: 90,
      valueFormatter: (params) => {
        
        return params.value.split('').join(' ');
      }    
  },
    { field: 'CR', headerName: 'Credit', maxWidth: 90 },
    {
      field: 'SEATSREMAIN',
      headerName: 'Seats',
      maxWidth: 90,
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
      maxWidth: 90,
      cellStyle: (params) => {
        if (params.value === 'Closed') {
          return { color: 'red', fontWeight: 'bold' };
        }
        return { color: 'green', fontWeight: 'bold' };
      },
    },
    { field: 'INSTRUCTOR', headerName: 'Instructor', maxWidth: 150 },
    { field: 'BLDG', headerName: 'Building', maxWidth: 100 },
    { field: 'Notification', cellRenderer: SubscriptionButtonComponent },
  ];

  defaultColDef = {
    sortable: true,
    resizable: true,
    filter: true,
  };

  onSearchCourse(userInput: string): void {
    userInput = userInput.trim();
    if (userInput.trim() === '') {
      this.rowData = [];
      return;
    }

    this.homePageService.getCourses(userInput).subscribe((data) => {
      if (this.subscriptionChecked) {
        this.setUsertSubscribedCourses();
      } else {
        this.rowData = data;
      }
    });
  }

  setSubscriptionCheck(checkValue: boolean): void {
    this.subscriptionChecked = checkValue;
    if (checkValue) {
      this.setUsertSubscribedCourses();
    } else {
      this.rowData = [];
    }
  }

  setUsertSubscribedCourses(): void {
    const user = this.agGridService.getLoggedInUser() as User;
    this.homePageService.getUserSubscribedCourses(user).subscribe((data) => {
      this.rowData = data;
    });
  }
}
