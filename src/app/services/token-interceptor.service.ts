import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnectBackendService } from './connect-backend.service'


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}
  intercept(req, next): Observable<HttpEvent<any>>{
    let token = this.injector.get(ConnectBackendService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
