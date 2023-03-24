import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSearchBarComponent } from './course-search-bar/course-search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LoginButtonComponent } from './login-button/login-button.component';
import { SubscriptionButtonComponent } from './ag-grid/subscription-button/subscription-button.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { HelpButtonComponent } from './help-button/help-button.component';
import { MatIconModule } from '@angular/material/icon';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { SiteStatsComponent } from './site-stats/site-stats.component';

@NgModule({
  declarations: [
    CourseSearchBarComponent,
    LoginButtonComponent,
    SubscriptionButtonComponent,
    UserInfoComponent,
    HelpButtonComponent,
    UserMenuComponent,
    SiteStatsComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
  exports: [
    CourseSearchBarComponent,
    LoginButtonComponent,
    UserInfoComponent,
    HelpButtonComponent,
    UserMenuComponent,
    SiteStatsComponent,
  ],
})
export class FeaturesModule {}
