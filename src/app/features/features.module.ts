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

@NgModule({
  declarations: [
    CourseSearchBarComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SubscriptionButtonComponent,
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
  ],
})
export class FeaturesModule {}
