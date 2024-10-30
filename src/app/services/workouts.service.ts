import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';  
import { IDataAPI } from '../models/idata-api';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  private url = 'https://exercisedb.p.rapidapi.com/exercises/target';
  private options = {
    headers: new HttpHeaders({
      'x-rapidapi-key': '625c6bdbf6msh57a3831dc2e7066p1a2997jsn2a8a2e8aa5e8',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    })
  };

  getExercises(list: string[]): Observable<IDataAPI[]> {
    let requests = list.map((id) => this.httpClient.get<IDataAPI>(`${this.url}/${id}`, this.options));
    return forkJoin([...requests]);
  }

  constructor(readonly httpClient: HttpClient) { }
}
