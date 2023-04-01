import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/features/user/services/user.service';
import { SubscriptionService } from '../../services/subscription.service';

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
      .subscribeCourse(this.params.data.CRN)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  onUnsubscribe(): void {
    this.subscriptionService
      .unsubscribeCourse(this.params.data.CRN)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
