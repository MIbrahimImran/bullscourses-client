import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-search-bar',
  templateUrl: './course-search-bar.component.html',
  styleUrls: ['./course-search-bar.component.scss'],
})
export class CourseSearchBarComponent {
  searchCourse = new FormControl('') as FormControl;

  constructor(private courseService: CourseService) {}

  onSearchCourse(): void {
    if (this.searchCourse.value) {
      this.courseService.setCoursesBySearch(this.searchCourse.value);
    }
  }
}
