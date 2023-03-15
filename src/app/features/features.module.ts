import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSearchBarComponent } from './course-search-bar/course-search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule, MatIconAnchor } from '@angular/material/button';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { SubscriptionButtonComponent } from './ag-grid/subscription-button/subscription-button.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

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
    MatTooltipModule,
    MatCardModule,
  ],
  exports: [
    CourseSearchBarComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    UserInfoComponent,
  ],
})
export class FeaturesModule {}
