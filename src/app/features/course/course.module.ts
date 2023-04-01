import { NgModule } from '@angular/core';
import { CourseSearchBarComponent } from './components/course-search-bar/course-search-bar.component';
import { CourseGridComponent } from './components/course-grid/course-grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MatInputModule } from '@angular/material/input';
import { SubscriptionModule } from '../subscription/subscription.module';

@NgModule({
  declarations: [CourseSearchBarComponent, CourseGridComponent],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    AgGridModule,
    SubscriptionModule,
  ],
  exports: [CourseSearchBarComponent, CourseGridComponent],
})
export class CourseModule {}
