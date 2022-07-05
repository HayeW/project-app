import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oefening } from './oefening';

@Injectable({
  providedIn: 'root'
})
export class OefeningService {

  constructor(public http: HttpClient) { }

  saveAll(oefeningen: Oefening[]): Observable<Oefening[]>{
    return this.http.post<Oefening[]>(
      'http://localhost:8080/oefening', oefeningen);
  }

  findAll(): Observable<Oefening[]>{
    return this.http.get<Oefening[]>(
      'http://localhost:8080/oefening'
    )
  }

  findByTrainingschema_Id(id: number){
    return this.http.get<Oefening[]>(
      'http://localhost:8080/oefening/'+id+'/');
  }
}

