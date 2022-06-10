import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url=environment.URL_BACKEND;
  constructor(private http:HttpClient, private router: Router) { }

  postLogin(data:FormData):Observable<any>{
    return this.http.post(`${this.url}/api/auth`,data);
  }
  loggedIn(){
    return !!localStorage.getItem('x-token');
  }
  loggoud(){
    localStorage.removeItem('x-token');
    this.router.navigate(['/login']);
  }
  getToken(){
    return localStorage.getItem('x-token');
  }
  getSession(){
    return localStorage.getItem('x-token');
  }
  getNombre(){
    return localStorage.getItem('usuario');
  }
}
