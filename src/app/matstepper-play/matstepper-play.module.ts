import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatstepperPlayRoutingModule } from './matstepper-play-routing.module';
import { MatstepperPlayComponent } from './matstepper-play/matstepper-play.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ServicesModule } from '../services/services.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DisableStepperHeaderComponent } from './disable-stepper-header/disable-stepper-header.component';
import { StepperHeaderTweakerDirective } from './stepper-header-tweaker.directive';
import { FormFilledProgrammaticallyComponent } from './form-filled-programmatically/form-filled-programmatically.component';
import { AutoFocusFormComponent } from './auto-focus-form/auto-focus-form.component';

@NgModule({
  declarations: [MatstepperPlayComponent, DisableStepperHeaderComponent, StepperHeaderTweakerDirective, FormFilledProgrammaticallyComponent, AutoFocusFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatDialogModule,
    MatSnackBarModule,
    MatstepperPlayRoutingModule,
    ServicesModule
  ]
})
export class MatstepperPlayModule { }
