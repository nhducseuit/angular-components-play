import { MatstepperPlayComponent } from './matstepper-play/matstepper-play.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: MatstepperPlayComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatstepperPlayRoutingModule { }
