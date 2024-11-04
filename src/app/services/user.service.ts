import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://50.17.125.18/api/user';
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

  savePreferences(relation: string[]) {
    console.log(relation);
    
    return this.httpClient.put(`${this.url}/${this.getIduser()}/exercises`, {relation}, this.options);    
  }

  getRegistrationData() {
    console.log(this.registrationData);
    return this.registrationData;
  }

  getPreferences(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.url}/${this.getIduser()}/exercises`, this.options);
  }

  getFavorites(): Observable<any> {
    return this.httpClient.get(`${this.url}/${this.getIduser()}/mylist`, this.options);
  }

  addToFavorites(relation: string) {
    return this.httpClient.post(`${this.url}/${this.getIduser()}/mylist`, {relation}, this.options);
  }

  removeFromFavorites(relation: string) {
    return this.httpClient.delete(`${this.url}/${this.getIduser()}/${relation}/mylist`, this.options);
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
