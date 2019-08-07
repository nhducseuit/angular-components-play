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
    // console.log(stepperHeaderElements);
    // const firstStepHeader = stepperHeaderElements[0];
    stepperHeaderElements.forEach((stepHeader: any, index: number) => {
      fromEvent(stepHeader, 'click').subscribe(event => {
        console.log('Click on step header ', index + 1);
        this.stepHeaderClick.emit(index + 1);
      });
    });
  }

  // @HostListener('click', ['$event']) onclick($event: MouseEvent) {
  //   console.log('target', $event.target);
  //   console.log('related target', $event.relatedTarget);
  // }

}
