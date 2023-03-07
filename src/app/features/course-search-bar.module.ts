import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseSearchBarComponent } from './course-search-bar/course-search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [CourseSearchBarComponent],
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
  exports: [CourseSearchBarComponent],
})
export class CourseSearchBarModule {}
