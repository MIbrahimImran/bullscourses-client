import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getCourses(userInput: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.API_URL}/courses/${userInput}`);
  }

  getUserSubscribedCourses(user: User): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${this.API_URL}/courses/subscribed/${user.email}`
    );
  }
}
