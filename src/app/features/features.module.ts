import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSearchBarComponent } from './course-search-bar/course-search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { SubscriptionButtonComponent } from './ag-grid/subscription-button/subscription-button.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    CourseSearchBarComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SubscriptionButtonComponent,
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
  ],
  exports: [
    CourseSearchBarComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    UserInfoComponent,
  ],
})
export class FeaturesModule {}