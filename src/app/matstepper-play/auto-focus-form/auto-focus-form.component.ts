import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'npw-auto-focus-form',
  templateUrl: './auto-focus-form.component.html',
  styleUrls: ['./auto-focus-form.component.scss']
})
export class AutoFocusFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
      }
      );

    this.secondFormGroup = this.formBuilder.group(
      {
        address: ['', Validators.required],
        zipCode: ['', Validators.required]
      }
      );
  }
}
