import { NgModule } from '@angular/core';
import { SubscriptionButtonComponent } from './components/subscription-button/subscription-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SubscriptionButtonComponent],
  imports: [CommonModule, MatButtonModule, MatTooltipModule],
  exports: [SubscriptionButtonComponent],
})
export class SubscriptionModule {}
