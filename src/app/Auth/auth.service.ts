import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data){
    return this.http.post(`${environment.url}/auth/login`, data);
  }
  signUp(data){
    return this.http.post(`${environment.url}/auth/signUp`, data);
  }
}
