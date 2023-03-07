import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}

  getAllCourses(searchTerm: string): Observable<Course[]> {
    return this.http.get<Course[]>(
      `http://localhost:3000/courses/${searchTerm}`
    );
  }
}
