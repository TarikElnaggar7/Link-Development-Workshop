import { Component, OnInit, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '../../core/services/course.service';
import { CartService } from '../../core/services/cart.service';
import { Course } from '../../core/models/models';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  private cartService = inject(CartService);

  course$: Observable<Course | null> | undefined;
  courseData: Course | null = null;

  ngOnInit(): void {
    this.course$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          return this.courseService.getCourses().pipe(
            switchMap((courses) => {
              const foundCourse = courses.find((c: Course) => c.id === id);
              return new Observable<Course | null>((observer) => {
                observer.next(foundCourse || null);
                observer.complete();
              });
            })
          );
        } else {
          return new Observable<Course | null>((observer) => {
            observer.next(null);
            observer.complete();
          });
        }
      })
    );

    this.course$.subscribe((data) => {
      this.courseData = data;
    });
  }

  addToCart(course: Course): void {
    if (course) {
      this.cartService.addToCart(course);
    }
  }
}
