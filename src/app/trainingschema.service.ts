import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trainingschema } from './Trainingschema';

@Injectable({
  providedIn: 'root'
})
export class TrainingschemaService {

  constructor(public http: HttpClient) { }

  // save(trainingschema: Trainingschema){
  //   return this.http.post(
  //     'http://localhost:8080/trainingschema', trainingschema);
  // }


  save(trainingschema: Trainingschema): Observable<Trainingschema> {
    return this.http.post<Trainingschema>(
      'http://localhost:8080/trainingschema', trainingschema);
  }



  findAll(): Observable<Trainingschema[]> {
    return this.http.get<Trainingschema[]>(
      'http://localhost:8080/trainingschema');
  }
  

  findById(id: number): Observable<Trainingschema>{
    return this.http.get<Trainingschema>(
      'http://localhost:8080/trainingschema/'+id)
    }
}