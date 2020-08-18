import { catchError, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UcService {

constructor(private http: HttpClient) { }
getAllUc() {
  return this.http.get(`${environment.url}/uc`).pipe(
    map(data => data),
    catchError(error => throwError(error))
  );
}
getUc(name) {
  return this.http.get(`${environment.url}/uc/${name}`).pipe(
    map(data => data),
    catchError(error => throwError(error))
  );
}

updateUc(uc) {
  return this.http.post(`${environment.url}/uc`, uc).pipe(
    map(data => data),
    catchError(error => throwError(error))
  );
}

}
