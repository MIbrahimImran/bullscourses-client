import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Course } from 'src/app/interfaces/course.interface';

@Component({
  selector: 'app-subscribe-button',
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.scss'],
})
export class SubscribeButtonComponent implements ICellRendererAngularComp {
  rowData: Course | undefined;

  agInit(params: ICellRendererParams<any, any>): void {
    this.rowData = params.data;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  subscribeCourse(): void {
    console.log('You are subscribed to CRN: ', this.rowData?.CRN);
  }
}
