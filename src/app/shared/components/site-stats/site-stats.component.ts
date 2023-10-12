import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-site-stats',
  templateUrl: './site-stats.component.html',
  styleUrls: ['./site-stats.component.scss'],
})
export class SiteStatsComponent {
  @Input() icon = '';
  @Input() title = '';
  @Input() stats = '';
}
