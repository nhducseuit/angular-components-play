import { MatstepperPlayComponent } from './matstepper-play/matstepper-play.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisableStepperHeaderComponent } from './disable-stepper-header/disable-stepper-header.component';
import { FormFilledProgrammaticallyComponent } from './form-filled-programmatically/form-filled-programmatically.component';

const routes: Routes = [
  { path: '', component: MatstepperPlayComponent },
  { path: 'header-disabled', component: DisableStepperHeaderComponent },
  { path: 'form-filled-programatically', component: FormFilledProgrammaticallyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatstepperPlayRoutingModule { }
