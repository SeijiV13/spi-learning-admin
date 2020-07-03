import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

constructor(private http: HttpClient) { }


   createCourse(course): Observable<any> {
    return this.http.post(`${environment.url}/course`, course).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );

   }

   getCourse(): Observable<any> {
    return this.http.get(`${environment.url}/course/get/ad`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
   }

   deleteCourse(id): Observable<any> {
    return this.http.delete(`${environment.url}/course/${id}`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
   }
}
