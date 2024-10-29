import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register() {
    throw new Error('Method not implemented.');
  }
  private authenticated = true;
  constructor() { }

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
  }

  isLoggedIn(): boolean {
    return this.authenticated;
  }

}
