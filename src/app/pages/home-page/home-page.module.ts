import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { FeaturesModule } from 'src/app/features/features.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AgGridModule } from 'ag-grid-angular';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    AgGridModule,
    MatToolbarModule,
    FeaturesModule,
  ],
  exports: [HomePageComponent],
})
export class HomePageModule {}
