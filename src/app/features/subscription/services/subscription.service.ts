import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Course } from 'src/app/features/course/interfaces/course.interface';
import { environment } from 'src/environments/environment';
import { UserService } from '../../user/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private readonly API_URL = environment.API_URL;

  public userSubscriptions: Course[] = [];

  constructor(private http: HttpClient, private userService: UserService) {
    if (this.userService.getUser()) {
      this.getUserSubscriptions().subscribe((courses) => {
        this.userSubscriptions = courses;
      });
    }
  }

  subscribeCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.API_URL}/subscription/subscribe`, {
      course,
    });
  }

  unsubscribeCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.API_URL}/subscription/unsubscribe`, {
      course,
    });
  }

  getUserSubscriptions(): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${this.API_URL}/subscription/getUserSubscriptions`
    );
  }

  unsubscribeAllCourses(): Observable<User> {
    return this.http.delete<User>(
      `${this.API_URL}/subscription/unsubscribeAllCourses`
    );
  }

  updateUserSubscriptions(course: Course): void {
    if (this.userSubscriptions.some((c) => c.CRN === course.CRN)) {
      this.userSubscriptions = this.userSubscriptions.filter(
        (c) => c.CRN !== course.CRN
      );
    } else {
      this.userSubscriptions.push(course);
    }
  }
}
