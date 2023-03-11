import { Component, OnDestroy } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Course } from 'src/app/interfaces/course.interface';
import { AgGridService } from '../ag-grid.service';

@Component({
  selector: 'app-subscription-button',
  templateUrl: './subscription-button.component.html',
  styleUrls: ['./subscription-button.component.scss'],
})
export class SubscriptionButtonComponent {
  public params: any;

  constructor(private agGridService: AgGridService) {}

  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  handleClick(): void {
    const rowData = this.params.data;
    this.params.onClick(rowData);
  }

  onSubscribe(course: Course): void {
    this.agGridService
      .subscribeCourse(this.agGridService.user as any, course)
      .subscribe((course) => {
        this.agGridService.updateSubscribedCRNs(course);
      });
  }

  onUnsubscribe(course: Course): void {
    this.agGridService
      .unsubscribeCourse(this.agGridService.user as any, course)
      .subscribe((course) => {
        this.agGridService.updateSubscribedCRNs(course);
      });
  }

  isSubscribed(course: Course): boolean {
    return this.agGridService.userSubscriptions.includes(course.CRN);
  }

  isUserLoggedIn(): boolean {
    return (
      this.agGridService.user !== null && this.agGridService.user !== undefined
    );
  }
}
