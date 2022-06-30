import { Component, OnInit } from '@angular/core';
import { Oefening } from '../oefening';
import { OefeningService } from '../oefening.service';
import { Result } from '../result';
import { ResultService } from '../result.service';
import { Trainingschema } from '../Trainingschema';
import { TrainingschemaService } from '../trainingschema.service';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {

  schemas: Trainingschema[] = []
  selectedSchemaID!: number;
  oefeningen: Oefening[] = []
  workout: Workout = new Workout();
  results: Result[] = []

  selectedSchema!: Trainingschema;

  constructor(
    public trainingschemaService: TrainingschemaService, 
    public oefeningService: OefeningService,
    public resultService: ResultService,
    public workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.getSchemas()
  }

  getSchemas(): void{
    this.trainingschemaService.findAll()
    .subscribe(schemas => this.schemas = schemas)
  }

change(id: number): void{
  for (let schema of this.schemas){
    if (schema.id == id) {
      this.selectedSchema = schema
      this.workout.trainingschema = schema
      console.log(this.workout)
    }
  }
  this.findByTrainingschema_Id(id)
}

findByTrainingschema_Id(id: number): void{
  this.oefeningService.findByTrainingschema_Id(id)
  .subscribe({
    next: oefeningen => this.oefeningen = oefeningen,
    complete: () => {      
      for (let oefening of this.oefeningen){
        var temp = new Result();
        temp.oefening = oefening;
        this.results.push(temp);
      }
    }
  })
}

saveAll() {
  this.workoutService.save(this.workout).subscribe({
    next: workout => this.workout = workout,
    complete:
    () => 
    {
      for (let result of this.results){
        result.workout = this.workout
      }

      this.resultService.saveAll(this.results).subscribe({
        next: (results) => this.results = results,
        complete: () => console.log("results saved")
    })
    }
  })
}

}
