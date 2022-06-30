import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from './result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(public http: HttpClient) { }

  saveAll(results: Result[]): Observable<Result[]>{
    return this.http.post<Result[]>(
      'http://localhost:8080/result', results);
  }

  findByOefening_Trainingschema_id(id: number): Observable<Result[]>{
    return this.http.get<Result[]>(
      'http://localhost:8080/result/'+id
    )
  }

}
