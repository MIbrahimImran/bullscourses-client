import { Component } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { CourseService } from '../../services/course.service';
import { Course } from '../../interfaces/course.interface';
import { Subject, takeUntil } from 'rxjs';
import { SubscriptionButtonComponent } from 'src/app/features/subscription/components/subscription-button/subscription-button.component';

@Component({
  selector: 'app-course-grid',
  templateUrl: './course-grid.component.html',
  styleUrls: ['./course-grid.component.scss'],
})
export class CourseGridComponent {
  private destroy$ = new Subject<void>();

  private gridApi!: GridApi;

  public rowData: Course[] = [];
  public columnDefs: ColDef[] = this.getColumnDefs();
  public defaultColDef: ColDef = this.getDefaultColDef();

  constructor(private courseService: CourseService) {
    this.courseService.courses$
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.rowData = courses;
      });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  getColumnDefs(): ColDef[] {
    return [
      { field: 'CRN', maxWidth: 90 },
      { field: 'SUBJ_CRS', headerName: 'Subject', maxWidth: 120 },
      { field: 'TITLE', headerName: 'Title' },
      { field: 'TIME', headerName: 'Time', maxWidth: 170 },
      {
        field: 'DAYS',
        headerName: 'Days',
        maxWidth: 90,
        valueFormatter: this.formatDays,
      },
      {
        field: 'CR',
        headerName: 'Credit',
        maxWidth: 90,
      },
      {
        field: 'SEATSREMAIN',
        headerName: 'Seats',
        maxWidth: 90,
        cellStyle: this.styleSeats,
      },
      {
        field: 'STATUS',
        headerName: 'Status',
        maxWidth: 90,
        cellStyle: this.styleStatus,
      },
      {
        field: 'INSTRUCTOR',
        headerName: 'Instructor',
        maxWidth: 170,
      },
      { field: 'BLDG', headerName: 'Building', maxWidth: 100 },
      {
        field: 'Subscription',
        cellRenderer: SubscriptionButtonComponent,
      },
    ];
  }

  getDefaultColDef(): ColDef {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
      minWidth: 100,
    };
  }

  formatDays(params: any): string {
    return params.value.split('').join(' ');
  }

  styleSeats(params: any): any {
    if (params.value <= 0) {
      return { color: 'red', fontWeight: 'bold' };
    } else if (params.value <= 10) {
      return { color: 'orange', fontWeight: 'bold' };
    }
    return { color: 'green', fontWeight: 'bold' };
  }

  styleStatus(params: any): any {
    if (params.value === 'Open') {
      return { color: 'green', fontWeight: 'bold' };
    } else if (params.value === 'Closed') {
      return { color: 'red', fontWeight: 'bold' };
    }
    return { color: 'orange', fontWeight: 'bold' };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
