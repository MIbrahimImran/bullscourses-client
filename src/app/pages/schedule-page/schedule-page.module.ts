import { NgModule } from '@angular/core';
import { SchedulePageComponent } from './schedule-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CourseModule } from 'src/app/features/course/course.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from 'src/app/features/user/user.module';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'; // Add this line
import { MatFormFieldModule } from '@angular/material/form-field'; // Add this line
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SchedulePageComponent],
  imports: [
     CommonModule,
    MatToolbarModule,
    CourseModule,
    SharedModule,
    UserModule,
    MatTableModule,
    MatCheckboxModule,
    FormsModule,
    MatInputModule, 
    MatFormFieldModule,
  ],
  exports: [SchedulePageComponent],
})
export class SchedulePageModule {}
