import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSearchBarComponent } from './course-search-bar.component';

describe('CourseSearchBarComponent', () => {
  let component: CourseSearchBarComponent;
  let fixture: ComponentFixture<CourseSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
