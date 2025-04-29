import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Course } from '../models/models';

interface CoursesApiResponse {
  Courses: Course[];
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'https://api.npoint.io/983f88db4d99fec8edd9';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http
      .get<CoursesApiResponse>(this.apiUrl)
      .pipe(map((response) => response.Courses));
  }

  getCourseById(id: number): Observable<Course | undefined> {
    return this.getCourses().pipe(
      map((courses) => courses.find((course) => course.id === id.toString()))
    );
  }
}
