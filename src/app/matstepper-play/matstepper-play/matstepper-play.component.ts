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
      console.log('Status ', status);
      console.log('1st formgroup error ', this.firstFormGroup.errors);
      this.isDuplicated = status.toLowerCase() === 'invalid' && this.firstFormGroup.hasError('duplicateName');
    });

    this.secondFormGroup.statusChanges.pipe(
      tap(status => console.log('Address form status is ', status, 'Has notChanged error = ', this.secondFormGroup.hasError('notChanged'))),
      filter((status: string) => status.toLowerCase() === 'invalid' && this.secondFormGroup.hasError('notChanged')),
    ).subscribe(() => {
      this.snackBar.open('Your address is not changed', 'OK', {
        duration: 1000
      });
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
}
