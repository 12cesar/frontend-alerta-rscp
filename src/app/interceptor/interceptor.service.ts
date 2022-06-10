import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private authService: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    
    /* const headers = new HttpHeaders({
      'x-token': this.authService.getToken()!
    })
    const reqClone = req.clone({
      headers
    }) */
    /* console.log(this.authService.getToken());
    return next.handle(req); */
    const tokenizeReq = req.clone({
      setHeaders: {
        'x-token': `${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
