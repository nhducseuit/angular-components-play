import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BehavioralComponentsRoutingModule } from './behavioral-components-routing.module';
import { SampleBehavioralComponentComponent } from './sample-behavioral-component/sample-behavioral-component.component';

@NgModule({
  declarations: [SampleBehavioralComponentComponent],
  imports: [
    CommonModule,
    BehavioralComponentsRoutingModule
  ]
})
export class BehavioralComponentsModule { }
