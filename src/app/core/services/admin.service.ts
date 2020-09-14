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

   updateAdmin(User): Observable<any> {
    return this.http.put(`${environment.url}/admin/update/${User.id}`, User).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );

   }

   getAdmins(): Observable<any> {
     return this.http.get(`${environment.url}/admin`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
   }

   getAdmin(id): Observable<any> {
    return this.http.get(`${environment.url}/admin/single/${id}`).pipe(
     map(data => data),
     catchError(error => throwError(error))
   );
  }

   deleteAdmin(id)   {
    return this.http.delete(`${environment.url}/admin/${id}`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
   }
}
