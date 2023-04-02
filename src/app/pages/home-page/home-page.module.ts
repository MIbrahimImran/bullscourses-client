import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CourseModule } from 'src/app/features/course/course.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from 'src/app/features/user/user.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    MatTableModule,
    CourseModule,
    SharedModule,
    UserModule,
    MatToolbarModule,
    MatCheckboxModule,
  ],
  exports: [HomePageComponent],
})
export class HomePageModule {}
