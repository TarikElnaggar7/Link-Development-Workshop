import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { CategoryService } from '../../../core/services/category.service';
import { CartService } from '../../../core/services/cart.service';
import { Course, Category } from '../../../core/models/models';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  private courseService = inject(CourseService);
  private categoryService = inject(CategoryService);
  private cartService = inject(CartService);

  allCourses: Course[] = [];
  filteredCourses: Course[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | '0' = '0';

  ngOnInit(): void {
    this.loadCategories();
    this.loadCourses();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data.Categories;
    });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.allCourses = data;
      this.filterCourses();
    });
  }

  filterCourses(categoryId: number | '0' = '0'): void {
    this.selectedCategoryId = categoryId;
    if (categoryId === '0') {
      this.filteredCourses = this.allCourses;
    } else {
      const selectedCategory = this.categories.find(
        (cat) => cat.id === categoryId
      );
      if (selectedCategory) {
        this.filteredCourses = this.allCourses.filter(
          (course) => course.category === selectedCategory.name
        );
      }
    }
  }

  addToCart(course: Course): void {
    this.cartService.addToCart(course);
  }
}
