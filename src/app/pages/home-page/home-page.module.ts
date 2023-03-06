import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { CourseSearchBarModule } from 'src/app/features/course-search-bar.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [CommonModule, CourseSearchBarModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}
