import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public doc: Document
  ) {}

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
}
