import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Password } from 'primeng/password';
import { Observable } from 'rxjs';
import { IExercise } from '../models/iexercise-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private url = 'http://localhost:8000/api/user';
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  private registrationData: {email: string, password: string} | null = null;

  isLogged(): boolean {
    return this.isLoggedIn;
  }
  
  setIsLogged(value: boolean) {
    this.isLoggedIn = value;
  }

  getUserExercices(iduser: number): Observable<any> {
    console.log(iduser, "auth");
    return this.httpClient.get<any>(`${this.url}/${iduser}/exercises`, this.options);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  login(mail: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/login`, {mail, password}, this.options);
  }

  register(mail: string, password: string, height:number, weight:number, sex:string, relation:string[]): Observable<any> {
    // console.log(mail, password, height, weight, sex, relation);
    return this.httpClient.post<any>(`${this.url}`, {mail, password, height, weight, sex, relation}, this.options);
  }

  setRegistrationData(email: string, password: string) {
    console.log(email, password);
    
    this.registrationData = { email, password };
  }

  getRegistrationData() {
    console.log(this.registrationData);
    return this.registrationData;
  }

  constructor(readonly httpClient : HttpClient, readonly router : Router) { }
}
