import { NgModule } from '@angular/core';
import { SchedulePageComponent } from './schedule-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CourseModule } from 'src/app/features/course/course.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from 'src/app/features/user/user.module';

@NgModule({
  declarations: [SchedulePageComponent],
  imports: [
    MatToolbarModule,
    CourseModule,
    SharedModule,
    UserModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  exports: [SchedulePageComponent],
})
export class SchedulePageModule {}
