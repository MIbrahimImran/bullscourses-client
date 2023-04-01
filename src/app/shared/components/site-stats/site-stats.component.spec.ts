import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteStatsComponent } from './site-stats.component';

describe('SiteStatsComponent', () => {
  let component: SiteStatsComponent;
  let fixture: ComponentFixture<SiteStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
