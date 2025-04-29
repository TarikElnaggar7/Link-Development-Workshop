import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://api.npoint.io/8378472d08789a9cb165';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<{ Categories: Category[] }> {
    return this.http.get<{ Categories: Category[] }>(this.apiUrl);
  }
}
