import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }


   createUser(User): Observable<any> {
    return this.http.post(`${environment.url}/user`, User).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );

   }

   getUsers(): Observable<any> {
    return this.http.get(`${environment.url}/user/ret/all`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
   }

   getUser(id): Observable<any> {
    return this.http.get(`${environment.url}/user/single/${id}`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
   }

   deactivateUser(user): Observable<any> {
    return this.http.put(`${environment.url}/user/deactivate/${user.id}`, user).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
   }

   updateUser(user): Observable<any> {
    return this.http.put(`${environment.url}/user/update/${user.id}`, user).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
   }


   deleteUser(id): Observable<any> {
    return this.http.delete(`${environment.url}/user/${id}`).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );
   }
}
