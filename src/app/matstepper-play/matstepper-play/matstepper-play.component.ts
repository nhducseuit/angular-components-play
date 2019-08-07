import { FakeHttpService } from './../../services/fake-http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'npw-matstepper-play',
  templateUrl: './matstepper-play.component.html',
  styleUrls: ['./matstepper-play.component.scss']
})
export class MatstepperPlayComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isDuplicated: boolean;
  isUnchanged: boolean;
  selectedStep = 1;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: FakeHttpService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group(
      {
        firstName: ['', {
          validators: [Validators.required],
          updateOn: 'blur'
        }],
        lastName: ['', {
          validators: [Validators.required],
          updateOn: 'blur'
        }]
      },
      {
        asyncValidators: this.checkDuplicateName()
      });
    this.secondFormGroup = this.formBuilder.group(
      {
        address: ['', Validators.required],
        zipCode: ['', Validators.required]
      },
      {
        asyncValidators: this.checkInformationNotChanged()
      });

    this.firstFormGroup.statusChanges.subscribe((status: string) => {
      this.isDuplicated = status.toLowerCase() === 'invalid' && this.firstFormGroup.hasError('duplicateName');
    });

    this.secondFormGroup.statusChanges.subscribe((status: string) => {
      this.isUnchanged = status.toLowerCase() === 'invalid' && this.secondFormGroup.hasError('notChanged');
    });
  }

  checkDuplicateName(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.httpService.checkDuplicate(control.value).pipe(map(result => result ? { duplicateName: result } : null));
    };
  }

  checkInformationNotChanged(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const address = control.value;
      if (address.address === '7' && address.zipCode === '7') {
        return of({ notChanged: true });
      }
      return of(null);
    };
  }

  onStepHeaderClicked(step: number) {
    if (this.selectedStep === 1 && this.isDuplicated && step > 1) {
      this.showDuplicateDialog();
    }
    if (this.selectedStep === 2 && this.isUnchanged && step > 2) {
      this.showUnchangedDialog();
    }
  }

  private showDuplicateDialog() {
    this.snackBar.open('Your name is duplicated', 'OK', {
      duration: 1000
    });
  }

  stepSelectionChanged(event: StepperSelectionEvent) {
    this.selectedStep = event.selectedIndex + 1;
  }

  firstFormNextClicked() {
    if (this.isDuplicated) {
      this.showDuplicateDialog();
    }
  }

  secondFormNextClicked() {
    if (this.isUnchanged) {
      this.showUnchangedDialog();
    }
  }

  private showUnchangedDialog() {
    this.snackBar.open('Your address is not changed', 'OK', {
      duration: 1000
    });
  }
}
