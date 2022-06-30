import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TrainingschemaFormComponent } from './trainingschema-form/trainingschema-form.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HistoryComponent } from './history/history.component';


imports: [
]


@NgModule({
  declarations: [
    AppComponent,
    TrainingschemaFormComponent,
    WorkoutFormComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
