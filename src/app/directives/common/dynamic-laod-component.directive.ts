import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicLaodComponent]'
})
export class DynamicLaodComponentDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
