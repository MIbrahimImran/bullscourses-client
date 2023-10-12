import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public userAuthenticated$: Observable<boolean> =
    this.userService.isUserAuthenticated$;

  userName: string | undefined | null = '';
  userPictureURL: string | undefined | null = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (user) {
        this.userName = user.given_name || user.nickname || user.name || '';
        this.userPictureURL = user.picture;
      }
    });
  }

  login(): void {
    this.userService.login();
  }

  logout(): void {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
