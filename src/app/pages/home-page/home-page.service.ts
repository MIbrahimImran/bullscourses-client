import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getAllCourses(searchTerm: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.API_URL}/courses/${searchTerm}`);
  }
}
