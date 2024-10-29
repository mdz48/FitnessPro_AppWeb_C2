import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';  

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  private url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
  private options = {
    headers: new HttpHeaders({
      'x-rapidapi-key': '625c6bdbf6msh57a3831dc2e7066p1a2997jsn2a8a2e8aa5e8',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    })
  };

  getExercises(): Observable<any> {
    return this.http.get(this.url, this.options);
  }

  constructor(private http: HttpClient) { }
}
