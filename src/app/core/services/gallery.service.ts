import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GalleryItem } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private apiUrl = 'https://api.npoint.io/8494c045d50509ba0d5a';

  constructor(private http: HttpClient) {}

  getGalleryItems(): Observable<GalleryItem[]> {
    return this.http.get<GalleryItem[]>(this.apiUrl);
  }
}
