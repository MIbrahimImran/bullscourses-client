import { NgModule } from '@angular/core';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule],
  exports: [UserMenuComponent],
})
export class UserModule {}
