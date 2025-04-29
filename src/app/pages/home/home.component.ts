import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses/courses.component';
import { HeroComponent } from './hero/hero.component';
import { GallerySliderComponent } from './gallery-slider/gallery-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CoursesComponent,
    HeroComponent,
    GallerySliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
