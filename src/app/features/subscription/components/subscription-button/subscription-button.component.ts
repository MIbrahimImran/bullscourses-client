import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/features/user/services/user.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Course } from 'src/app/features/course/interfaces/course.interface';

@Component({
  selector: 'app-subscription-button',
  templateUrl: './subscription-button.component.html',
  styleUrls: ['./subscription-button.component.scss'],
})
export class SubscriptionButtonComponent {
  private destroy$ = new Subject<void>();

  public params: any;

  public userAuthenticated$: Observable<boolean> =
    this.userService.isUserAuthenticated$;

  constructor(
    private userService: UserService,
    private subscriptionService: SubscriptionService
  ) {}

  agInit(params: ICellRendererParams<any, any>): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  onSubscribe(): void {
    this.subscriptionService
      .subscribeCourse(this.params.data as Course)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.subscriptionService.updateUserSubscriptions(
          this.params.data as Course
        );
      });
  }

  onUnsubscribe(): void {
    this.subscriptionService
      .unsubscribeCourse(this.params.data as Course)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.subscriptionService.updateUserSubscriptions(
          this.params.data as Course
        );
      });
  }

  isSubscribed(): boolean {
    return this.subscriptionService.userSubscriptions.some(
      (course) => course.CRN === this.params.data.CRN
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
