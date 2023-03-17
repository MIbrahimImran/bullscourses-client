import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
  constructor(private auth: AuthService) {}

  givenName: string | undefined = '';
  profilePictureUrl: string | undefined = '';

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      console.log(user?.picture);
      this.givenName = user?.given_name ? user.given_name : user?.nickname;
      this.profilePictureUrl = user?.picture;
    });
  }
}
