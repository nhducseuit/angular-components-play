import { MatstepperPlayComponent } from './matstepper-play/matstepper-play.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisableStepperHeaderComponent } from './disable-stepper-header/disable-stepper-header.component';

const routes: Routes = [
  { path: '', component: MatstepperPlayComponent },
  { path: 'header-disabled', component: DisableStepperHeaderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatstepperPlayRoutingModule { }
