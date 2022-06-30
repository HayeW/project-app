import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Workout } from './workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(public http: HttpClient) { }

  save(workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(
      'http://localhost:8080/workout', workout);      
  }
}

