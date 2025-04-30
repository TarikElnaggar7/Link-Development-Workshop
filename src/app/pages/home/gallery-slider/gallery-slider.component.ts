import { Component, computed, signal } from "@angular/core";

@Component({
  standalone: true,
  selector: "app-gallery-slider",
  templateUrl: "./gallery-slider.component.html",
  styleUrl: "./gallery-slider.component.scss",
})
export class GallerySliderComponent {
  readonly images = signal(["Frame1.png", "Frame2.png", "Frame3.png"]);
  readonly activeImageIndex = signal(0);
  readonly totalImages = computed(() => this.images().length);

  ngOnInit(): void {
    setInterval(() => {
      this.slide();
    }, 1700);
  }

  slide(): void {
    if (this.activeImageIndex() === this.images().length - 1) {
      this.activeImageIndex.set(0);
    } else {
      this.activeImageIndex.update((id) => id + 1);
    }
  }
}
