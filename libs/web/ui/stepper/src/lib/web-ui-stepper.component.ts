import { Component, OnInit } from '@angular/core'
import { FieldType, FormlyFieldConfig  } from '@ngx-formly/core'
import { trigger, state, style, transition, animate } from '@angular/animations'

export enum StepIndicatorMode {
  Simple,
  Panels,
  Bullets,
  PanelsWithBorder,
  Circles,
  BulletsAndText,
  CirclesWithText,
}

@Component({
  selector: 'ui-stepper',
  templateUrl: 'web-ui-stepper.component.html',
})
export class WebUiStepperComponent extends FieldType implements OnInit {
  STEP_INDICATOR_MODE: typeof StepIndicatorMode = StepIndicatorMode

  activeStepIndex = 0
  slideDirection: 'left' | 'right' = 'right'


  get stepHeader() {
    const activeStep = this.field.fieldGroup[this.activeStepIndex]
    const label = activeStep?.templateOptions?.label
    const lead = activeStep?.templateOptions?.lead
    return { label, lead }
  }

  get stepCount(): number {
    return this.field?.fieldGroup?.length || [].length
  }

  constructor() {
    super()
  }

  ngOnInit(): void {
    console.log(this.to)
  }

  log(steps) {
    console.log('step test');
    console.log(steps)
  }

  buildStepNumber(index: number) {
    const stepNum = index + 1
    return index + 1 < 10 ? '0' + stepNum : stepNum
  }


  validateChildFields(field1) {
    let res1=true;
    field1.fieldGroup.forEach(function (maingroup1) {
      maingroup1.fieldGroup.forEach(function (value1) {
      if(value1.formControl.valid ==false && value1.hide !=true){
          value1.focus=true;
          res1=false;
      }
    });
  });
  return res1;
  }

  validateFieldsSubSteps(field) { //validate parent and child upto two levels
    let res=true;
    try{
    field.fieldGroup.forEach(function (maingroup) {
      maingroup.fieldGroup.forEach(function (value) {
      if(value.formControl.valid ==false && value.hide !=true){
        if(value.fieldGroup != undefined){
          value.fieldGroup.forEach(function (subfieldgroup) {
            subfieldgroup.fieldGroup.forEach(function (maingroup1) {
              maingroup1.fieldGroup.forEach(function (value1) {
              if(value1.formControl.valid ==false && value1.hide !=true){
                value1.focus=true;
                res=false;
              }
            });
          });
          });
        }else{
          value.focus=true;
          res=false;
        }
      }
    });
  });
}catch(e){console.log(e)};
  return res;
  }

  validateStepFields(field) {
    return this.validateFieldsSubSteps(field); //validate fields
  }

  onNextStep() {
    let nextstep=true;
    if (this.activeStepIndex + 1 < this.stepCount) {
       nextstep = this.validateStepFields(this.field.fieldGroup[this.activeStepIndex]); //validate all step fields
    if(!nextstep){
      return false;
    }
      this.slideDirection = 'right'
      this.activeStepIndex = this.activeStepIndex + 1
    }
  }

  onPrevStep() {
    if (this.activeStepIndex > 0) {
      this.slideDirection = 'left'
      this.activeStepIndex = this.activeStepIndex - 1
    }
  }

  onComplete() {
    this.to?.onComplete(this.formState)
  }



}
