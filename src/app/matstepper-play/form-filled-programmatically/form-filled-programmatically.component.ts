import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';

@Component({
  selector: 'npw-form-filled-programmatically',
  templateUrl: './form-filled-programmatically.component.html',
  styleUrls: ['./form-filled-programmatically.component.scss']
})
export class FormFilledProgrammaticallyComponent implements OnInit {

  nameFormGroup: FormGroup;
  name: { firstName: string, lastName: string } = {
    firstName: '',
    lastName: '',
  };
  shouldPending = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.nameFormGroup = this.formBuilder.group({
      firstName: ['', {
        validators: [Validators.required]
      }],
      lastName: ['', {
        validators: [Validators.required]
      }]
    });

    this.nameFormGroup.statusChanges.subscribe(status => {
      console.log(`Status of name form group changed to ${status}`);
      if (status === 'VALID' && this.shouldPending) {
        this.nameFormGroup.markAsPending();
        this.shouldPending = false;
      }
    });

    of(true).pipe(debounceTime(1000)).subscribe(() => this.nameFormGroup.setValue({
      firstName: 'Duc',
      lastName: 'Nguyen'
    }));
  }

  checkFormStatus() {
    console.log(`Name form status is ${this.nameFormGroup.status}`);
  }

}
