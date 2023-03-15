import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-search-bar',
  templateUrl: './course-search-bar.component.html',
  styleUrls: ['./course-search-bar.component.scss'],
})
export class CourseSearchBarComponent {
  @Output() userInput = new EventEmitter<string>();

  searchForm: FormGroup;

  constructor() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl(''),
    });
  }

  onSearchCourse(): void {
    this.userInput.emit(this.searchForm.controls['searchTerm'].value);
  }
}
