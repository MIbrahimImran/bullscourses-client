import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Course } from 'src/app/features/course/interfaces/course.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private readonly API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  subscribeCourse(courseCRN: Course): Observable<Course> {
    return this.http.post<Course>(`${this.API_URL}/subscription/subscribe`, {
      courseCRN,
    });
  }

  unsubscribeCourse(courseCRN: string): Observable<Course> {
    return this.http.post<Course>(`${this.API_URL}/subscription/unsubscribe`, {
      courseCRN,
    });
  }

  getAllSubscriptions(): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${this.API_URL}/subscription/getAllSubscriptions`
    );
  }

  unsubscribeAllCourses(): Observable<User> {
    return this.http.delete<User>(
      `${this.API_URL}/subscription/unsubscribeAllCourses`
    );
  }
}
