import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User | undefined | null = null;

  constructor(
    private authService: AuthService,
    @Inject(DOCUMENT) public doc: Document
  ) {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(): void {
    this.authService.loginWithRedirect();
  }

  logout(): void {
    this.authService.logout({
      logoutParams: { returnTo: this.doc.location.origin },
    });
  }

  get isUserAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }

  get user$(): Observable<User | undefined | null> {
    return this.authService.user$;
  }

  getUser(): User | undefined | null {
    return this.user;
  }
}
