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

  lineChar!: any


  constructor(
    public trainingschemaService: TrainingschemaService,
    public oefeningService: OefeningService,
    public resultService: ResultService,
    
    ) { Chart.register(...registerables); }

  ngOnInit(): void {
    this.getSchemas()
    this.generateChart([], [], [])

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
    this.oefeningService.findByTrainingschema_Id(id)
    .subscribe({
      next: oefeningen => this.oefeningen = oefeningen,
      complete: () => this.findByOefening_Trainingschema_id(this.selectedSchemaID)
    })
  }

  findByOefening_Trainingschema_id(id: number): void{
    this.resultService.findByOefening_Trainingschema_id(id).subscribe({
      next: results => this.results = results,
      complete: () => this.onChange()
    })
  }

  generateChart(xdata: any[], ydatasets: number[][], labels: string[]): void{

      var datasets = []
      var colors = ['rgba(39, 71, 245)', 'rgba(245, 66, 66)', 'rgba(42, 163, 36)', 'rgba(219, 139, 0)']

      for (let i = 0; i < labels.length; i++){
        datasets.push(
          { data: ydatasets[i], label: labels[i], borderColor: (i < colors.length ? colors[i] : colors[0]) }
        )
      }

      // Line Chart
      const lineCanvasEle: any = document.getElementById('line_chart')
      this.lineChar = new Chart(lineCanvasEle.getContext('2d'), {
        type: 'line',
          data: { labels: xdata, datasets: datasets },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {display: true, text:'Gewicht (kg)' },
                    beginAtZero: true
                }
            }
          }
        });
      }
  
  onChange(): void{
    var oefeningen: string[] = []
    var name: string

    for (let result of this.results){
      name = result.oefening.naam
      if (!(oefeningen.includes(name))){
        oefeningen.push(name)
      }
    }

    var ydata: number[] = []
    var ydatasets: number[][] = []
    for (let oefening of oefeningen){
      ydata = []

      for (let result of this.results){
        if (result.oefening.naam == oefening){
          ydata.push(Math.max(...result.gewicht))
        }
      }
      ydatasets.push(ydata)
    }

    var xdata_length = 0
    for (let ydata of ydatasets){
      if (ydata.length > xdata_length){
        xdata_length = ydata.length
      }
    }
    var xdata = []
    for(var i = 1; i <= xdata_length; i++){
      xdata.push(i)
    }

    this.lineChar.destroy()
    this.generateChart(xdata, ydatasets, oefeningen)
  }
}
