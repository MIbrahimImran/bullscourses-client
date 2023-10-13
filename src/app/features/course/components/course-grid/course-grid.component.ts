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
  public enableRangeSelection: boolean = true;
  public enableCellTextSelection: boolean = true;

  constructor(private courseService: CourseService) {
    this.courseService.courses$
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => {
        this.rowData = courses;
      });
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  getColumnDefs(): ColDef[] {
    return [
      { field: 'CRN', width: 90 },
      { field: 'SUBJ_CRS', headerName: 'Subject', width: 120 },
      { field: 'TITLE', headerName: 'Title', width: 250 },
      { field: 'TIME', headerName: 'Time', width: 170 },
      {
        field: 'DAYS',
        headerName: 'Days',
        width: 90,
        valueFormatter: this.formatDays,
      },
      {
        field: 'CR',
        headerName: 'Credit',
        width: 90,
      },
      {
        field: 'SEATSREMAIN',
        headerName: 'Seats',
        width: 90,
        cellStyle: this.styleSeats,
      },
      {
        field: 'STATUS',
        headerName: 'Status',
        width: 90,
        cellStyle: this.styleStatus,
      },
      {
        field: 'INSTRUCTOR',
        headerName: 'Instructor',
        width: 140,
      },
      { field: 'BLDG', headerName: 'Building', width: 100 },
      {
        field: 'Subscription',
        cellRenderer: SubscriptionButtonComponent,
        minWidth: 120,
        maxWidth: 140,
      },
    ];
  }

  getDefaultColDef(): ColDef {
    return { sortable: true, resizable: true, filter: true };
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
