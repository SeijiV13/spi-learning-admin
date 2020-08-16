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

  getVideos() {
    return this.http.get(`${environment.url}/vdo/admvideos`).pipe(
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
