import { NgModule } from '@angular/core';
import { HelpButtonComponent } from './components/help-button/help-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HelpButtonComponent],
  imports: [MatIconModule, MatButtonModule],
  exports: [HelpButtonComponent],
})
export class SharedModule {}
