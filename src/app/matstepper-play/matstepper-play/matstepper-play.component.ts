import { FakeHttpService } from './../../services/fake-http.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'npw-matstepper-play',
  templateUrl: './matstepper-play.component.html',
  styleUrls: ['./matstepper-play.component.scss']
})
export class MatstepperPlayComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

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

    this.firstFormGroup.statusChanges.pipe(
      tap(status => console.log('Name form status is ', status)),
      filter((status: string) => status.toLowerCase() === 'invalid' && this.firstFormGroup.hasError('duplicateName'))
    ).subscribe(() => {
      this.snackBar.open('Your name is duplicated', 'OK', {
        duration: 1000
      });
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
}
