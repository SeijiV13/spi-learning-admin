import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

constructor(private http: HttpClient) { }


   createAdmin(User): Observable<any> {
    return this.http.post(`${environment.url}/admin`, User).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );

   }
}
