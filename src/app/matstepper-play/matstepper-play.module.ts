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

@NgModule({
  declarations: [MatstepperPlayComponent],
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
