import { Component, Input, OnInit } from '@angular/core';
import { Oefening } from '../oefening';
import { OefeningService } from '../oefening.service';
import { Trainingschema } from '../Trainingschema';
import { TrainingschemaService } from '../trainingschema.service';

@Component({
  selector: 'app-trainingschema-form',
  templateUrl: './trainingschema-form.component.html',
  styleUrls: ['./trainingschema-form.component.css']
})
export class TrainingschemaFormComponent implements OnInit {
  trainingschema: Trainingschema = new Trainingschema()
  oefeningen: Oefening[] = [new Oefening()]
  items: any = [0];

  constructor(public trainingschemaService: TrainingschemaService, public oefeningService: OefeningService) { }

  ngOnInit(): void {
  }

  save() {
    
    this.trainingschemaService.save(this.trainingschema).subscribe({
      
      next: trainingschema => {this.trainingschema = trainingschema},
      error: (error) => { alert(error.error.messages.join('\n')) },
      complete: () => {
        for (let oefening of this.oefeningen) {oefening.trainingschema = this.trainingschema}
        this.oefeningService.saveAll(this.oefeningen).subscribe({
          next: oefeningen => this.oefeningen = oefeningen,
          error: (error) => { alert(error.error.messages.join('\n')) }
        })
      }
    }
)
  }

  add() {
    var temp: Oefening = new Oefening();
    var len: number = this.oefeningen.push(temp) - 1
    this.items.push(len)
  }

  delete() {
    if(this.oefeningen.length > 1){
      this.oefeningen.pop()
      this.items.pop()  
    }
  }
}
