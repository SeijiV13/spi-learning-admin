import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }


   login(user): Observable<any> {
    return this.http.post(`${environment.url}/auth/adlogin`, user).pipe(
      map(data => data),
      catchError(error => throwError(error))
    );

   }
}
