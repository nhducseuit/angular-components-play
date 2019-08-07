import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[npwStepperHeaderTweaker]'
})
export class StepperHeaderTweakerDirective {

  @Output() stepHeaderClick = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    const stepperHeaderElements: any[] = this.elementRef.nativeElement.querySelectorAll('.mat-step-header');
    stepperHeaderElements.forEach((stepHeader: any, index: number) => {
      fromEvent(stepHeader, 'click').subscribe(event => {
        console.log('Click on step header ', index + 1);
        this.stepHeaderClick.emit(index + 1);
      });
    });
  }

}
