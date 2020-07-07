import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SessionExpiredComponent } from '../components/modals/session-expired/session-expired.component';


@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
    constructor(private config: NgbModalConfig, private modalService: NgbModal, private loadr: NgxUiLoaderService) {
      config.backdrop = 'static';
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const token = localStorage.getItem('userk');
        const jwt = localStorage.getItem('token')
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${jwt}`,
                    userk: `${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            });
        }

        return next.handle(request).pipe(catchError(err => this.handleError(err, next, request)));
    }


    private handleError(error: any, handler: HttpHandler, req: HttpRequest<any>) {
      if (error.status === 401) {
        this.loadr.stop();
        this.modalService.open(SessionExpiredComponent);
        return of(null);
      } else {
        return throwError(error);
      }
    }
}
