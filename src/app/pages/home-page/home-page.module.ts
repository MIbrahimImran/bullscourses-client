import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { CourseSearchBarModule } from 'src/app/features/course-search-bar.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AgGridModule } from 'ag-grid-angular';
@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    CourseSearchBarModule,
    HttpClientModule,
    MatTableModule,
    AgGridModule,
  ],
  exports: [HomePageComponent],
})
export class HomePageModule {}
