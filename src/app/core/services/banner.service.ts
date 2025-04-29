import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Banner } from '../models/models';

interface BannersApiResponse {
  banners: Banner[];
}

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private apiUrl = 'https://api.npoint.io/2c9281eddfb0e4be229b';

  constructor(private http: HttpClient) {}

  getBanners(): Observable<Banner[]> {
    return this.http
      .get<BannersApiResponse>(this.apiUrl)
      .pipe(map((response) => response.banners));
  }
}
