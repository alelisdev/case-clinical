import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { UiFormBaseWrapper } from '../base-field-wrapper';

@Component({
  template: `
    <button [disabled]="formControl?.status === 'INVALID' && to.submitButton" [style]="Style" type='button' (click)="click($event)">
      <ng-container #fieldComponent></ng-container>
    </button>
  `,
})
export class UiFormButtonComponent extends UiFormBaseWrapper implements OnInit {
  formControl!: FormControl
  value = ''

  open = false;

  click($event) {
    let stopPropagaion = this.to.stopPropagation;
    if(stopPropagaion === undefined) stopPropagaion = true;
    if(stopPropagaion)
      $event.stopPropagation();

    if(this.to.submitButton) {
      this.to.submitAction();
    }
    if(this.to.click) this.to.click(this.service.getData());
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
  public get Style() : string {
    return "width: 100%; height: 100%;"
  }
}
