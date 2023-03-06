import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CourseSearchBarService } from './course-search-bar.service';

@Component({
  selector: 'app-course-search-bar',
  templateUrl: './course-search-bar.component.html',
  styleUrls: ['./course-search-bar.component.scss'],
})
export class CourseSearchBarComponent {
  searchForm: FormGroup;

  coursesMatched: string[] = [];

  constructor(private courseBarService: CourseSearchBarService) {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(''),
    });

    this.searchForm.controls['searchTerm'].valueChanges.subscribe((input) => {
      const courseData = this.courseBarService.fetchCourses(input);
      const coursesMatched = [];
      for (const course of courseData) {
        if (course.title.toLowerCase().includes(input.toLowerCase())) {
          coursesMatched.push(course.title);
        }
      }

      this.coursesMatched = coursesMatched;
      console.log(this.coursesMatched);
    });
  }
}
