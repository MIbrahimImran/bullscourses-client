import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course.interface';

@Injectable({
  providedIn: 'root',
})
export class AgGridService {
  public user: User | null | undefined;
  public userSubscriptions: string[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.user$.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.getSubscribedCRNs(this.user as any).subscribe((data) => {
          this.userSubscriptions = data;
        });
      }
    });
  }

  subscribeCourse(user: User, course: Course): Observable<Course> {
    return this.http.post<Course>(
      `http://104.248.56.174:3000/subscription/subscribe`,
      {
        user,
        course,
      }
    );
  }

  unsubscribeCourse(user: User, course: Course): Observable<Course> {
    return this.http.post<Course>(
      `http://104.248.56.174:3000/subscription/unsubscribe`,
      {
        user,
        course,
      }
    );
  }

  getSubscribedCRNs(user: User): Observable<string[]> {
    return this.http.get<string[]>(
      `http://104.248.56.174:3000/subscription/getSubscribedCRNs/${user.email}`
    );
  }

  updateSubscribedCRNs(course: Course): void {
    if (this.userSubscriptions.includes(course.CRN)) {
      this.userSubscriptions = this.userSubscriptions.filter(
        (crn) => crn !== course.CRN
      );
    } else {
      this.userSubscriptions.push(course.CRN);
    }
  }
}
