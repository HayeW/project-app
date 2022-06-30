import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from '../history/history.component';
import { TrainingschemaFormComponent } from '../trainingschema-form/trainingschema-form.component';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';

const routes: Routes = [
  { path: 'trainingschema', component: TrainingschemaFormComponent },
  { path: 'workout', component: WorkoutFormComponent},
  { path: 'history', component: HistoryComponent},
  { path: '', component: WorkoutFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }