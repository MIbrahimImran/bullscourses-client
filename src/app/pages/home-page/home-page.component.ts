import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Course } from 'src/app/interfaces/course.interface';
import { HomePageService } from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  defaultTerm = '202301';
  agGridComponents: any;

  constructor(private homePageService: HomePageService) {}

  columnDefs: ColDef[] = [
    { field: 'CRN' },
    { field: 'CRS' },
    { field: 'Title' },
    { field: 'Time' },
    { field: 'Credits' },
    { field: 'Seats' },
    { field: 'Status' },
    { field: 'Instructor' },
    { field: 'Location' },
  ];

  gridOptions = {
    defaultColDef: {
      resizable: true,
      initialWidth: 200,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    },
    columnDefs: this.columnDefs,
  };

  rowData: Course[] = [];

  ngOnInit(): void {}

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
          const formattedCourse = this.formatCourseData(course);
          coursesMatched.push(formattedCourse);
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

  formatCourseData(course: Course): any {
    return {
      CRN: course.CRN,
      CRS: course.SUBJ_CRS,
      Title: course.TITLE,
      Time: course.TIME,
      Instructor: course.INSTRUCTOR,
      Credits: course.CR,
      Location: course.BLDG + ' ' + course.ROOM,
      Seats: course.SEATSREMAIN + '/' + course.CAP,
      Status: course.STATUS,
    };
  }
}
