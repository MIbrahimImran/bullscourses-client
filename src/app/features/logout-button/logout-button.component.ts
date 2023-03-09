import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss'],
})
export class LogoutButtonComponent {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public doc: Document
  ) {}

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
}
