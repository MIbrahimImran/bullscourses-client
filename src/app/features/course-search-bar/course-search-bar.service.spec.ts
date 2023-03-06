import { TestBed } from '@angular/core/testing';

import { CourseSearchBarService } from './course-search-bar.service';

describe('CourseSearchBarService', () => {
  let service: CourseSearchBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseSearchBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
