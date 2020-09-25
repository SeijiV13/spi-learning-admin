import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  linkSubject = new ReplaySubject<any>();
  constructor(private http: HttpClient) { }

  getVideos(page = 1, limit = 10) {
    return this.http.get(`${environment.url}/vdo/admvideos?page=${page}&limit=${limit}`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }

  generateShareKey() {
    return this.http.get(`${environment.url}/auth/sharetoken`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
  }
}
