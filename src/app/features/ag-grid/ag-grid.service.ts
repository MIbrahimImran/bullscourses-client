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
        this.updateSubscribedCRNs();
      }
    });
  }

  subscribeCourse(user: User, course: Course): Observable<Course> {
    return this.http.post<Course>(
      `http://localhost:3000/subscription/subscribe`,
      {
        user,
        course,
      }
    );
  }

  unsubscribeCourse(user: User, course: Course): Observable<Course> {
    return this.http.post<Course>(
      `http://localhost:3000/subscription/unsubscribe`,
      {
        user,
        course,
      }
    );
  }

  getSubscribedCRNs(user: User): Observable<string[]> {
    return this.http.get<string[]>(
      `http://localhost:3000/subscription/getSubscribedCRNs/${user.email}`
    );
  }

  updateSubscribedCRNs(): void {
    this.getSubscribedCRNs(this.user as any).subscribe((data) => {
      this.userSubscriptions = data;
    });
  }
}
