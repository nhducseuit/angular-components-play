import { Component, OnInit } from '@angular/core';

/**
 * https://netbasal.com/creating-behavioral-components-in-angular-8db6080f0cc4
 */
@Component({
  selector: 'npw-sample-behavioral-component',
  templateUrl: './sample-behavioral-component.component.html',
  styleUrls: ['./sample-behavioral-component.component.scss']
})
export class SampleBehavioralComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
