import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8000/api/user';
  private registrationData: {email: string, password: string} | null = null;
  private iduser: number | null = null;
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  setRegistrationData(email: string, password: string) {
    console.log(email, password);
    
    this.registrationData = { email, password };
  }

  getRegistrationData() {
    console.log(this.registrationData);
    return this.registrationData;
  }

  setIduser(id: number) {
    this.iduser = id;
    // console.log("set iduser", this.iduser);
  }

  getIduser() {
    return this.iduser;
  }

  constructor(readonly httpClient: HttpClient) { }
}
