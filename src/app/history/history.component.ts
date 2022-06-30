import { Component, OnInit } from '@angular/core';
import { Oefening } from '../oefening';
import { OefeningService } from '../oefening.service';
import { Result } from '../result';
import { ResultService } from '../result.service';
import { Trainingschema } from '../Trainingschema';
import { TrainingschemaService } from '../trainingschema.service';
import { Chart, registerables } from 'chart.js';
import { throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  title = 'angular-chart';
  schemas: Trainingschema[] = []
  selectedSchemaID: number = 0

  oefeningen: Oefening[] = []
  selectedOefeningID: number = 0

  results: Result[] = []

  // xdata: any[] = []
  // ydata: number[] = []

  lineChar!: any


  constructor(
    public trainingschemaService: TrainingschemaService,
    public oefeningService: OefeningService,
    public resultService: ResultService,
    
    ) { Chart.register(...registerables); }

  ngOnInit(): void {
    this.getSchemas()
    this.generateChart([], [])

  }

  getSchemas(): void{
    this.trainingschemaService.findAll()
    .subscribe({
      next: schemas => this.schemas = schemas
    })
  }

  getOefeningen(): void{
    this.oefeningService.findAll().subscribe(
      oefeningen => this.oefeningen = oefeningen
    )
  }

  findByTrainingschema_Id(id: number): void{
    console.log("henk")
    this.oefeningService.findByTrainingschema_Id(id)
    .subscribe({
      next: oefeningen => this.oefeningen = oefeningen,
      complete: () => this.findByOefening_Trainingschema_id(this.selectedSchemaID)
    })
  }

  findByOefening_Trainingschema_id(id: number): void{
    this.resultService.findByOefening_Trainingschema_id(id).subscribe({
      next: results => this.results = results,
      complete: () => this.change()
    })
  }

  generateChart(xdata: any[], ydata: number[]): void{
        // Line Chart
        const lineCanvasEle: any = document.getElementById('line_chart')
        this.lineChar = new Chart(lineCanvasEle.getContext('2d'), {
          type: 'line',
            data: {
              labels: xdata,
              datasets: [
                { data: ydata, label: 'Orders', borderColor: 'rgba(54, 162, 235)' },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
            }
          });
      }
  
  change(): void{
    var ydata: number[] = []
    for (let result of this.results){
      ydata.push(Math.max(...result.gewicht))
    }

    var xdata = []
    for(var i = 1; i <= ydata.length; i++){
      xdata.push(i)
    }

    this.lineChar.destroy()
    this.generateChart(xdata, ydata)
  }
}
