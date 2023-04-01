import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly API_URL = environment.API_URL;

  private _courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(
    []
  );
  public readonly courses$: Observable<Course[]> = this._courses.asObservable();

  constructor(private http: HttpClient) {}

  public setCoursesBySearch(searchInput: string): void {
    this.http
      .get<Course[]>(`${this.API_URL}/courses/${searchInput}`)
      .subscribe((courses) => this._courses.next(courses));
  }
}
