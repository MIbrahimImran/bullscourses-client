import { Component } from '@angular/core';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
})
export class HelpButtonComponent {
  constructor() {}

  sendEmail(): void {
    window.open(`mailto:${'support'}@${'bullscourses'}.${'com'}`, '_blank');
  }
}
