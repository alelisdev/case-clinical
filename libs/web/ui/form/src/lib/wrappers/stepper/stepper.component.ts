import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'ui-formly-field-stepper',
  styleUrls: ['./stepper.components.scss'],
  template: `
    <mat-horizontal-stepper #stepper>
      <mat-step *ngFor="let step of field.fieldGroup; let index = index; let last = last" class='px-1'>
        <ng-template matStepLabel>{{ step.templateOptions.label }}</ng-template>
        <formly-field [field]="step"></formly-field>
        <div class='flex flex-row gap-1'>
          <button matStepperPrevious *ngIf="index !== 0" type="button" class="btn btn-primary text-black dark:text-white">Back</button>
          <!-- <ui-button matStepperPrevious *ngIf="index !== 0" [label]="'Back'" type="button" ></ui-button> -->
          <button matStepperNext *ngIf="!last" class="btn btn-primary text-black hover:text-white dark:text-white" type="button" [disabled]="!isValid(step)">
            Next
          </button>
          <!-- <ui-button matStepperNext *ngIf="!last" [label]="'Next'" type="button" ></ui-button> -->
          <!-- <button *ngIf="last" class="btn btn-primary" [disabled]="!form.valid" type="submit">Submit</button> -->
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  `,
})
export class StepperComponent extends FieldType implements AfterViewInit {
  @ViewChild('stepper') stepper: MatStepper;

  ngAfterViewInit(): void {
    const tabsCount = this.field.fieldGroup.length;
    const currentIndex = this.to.currentIndex;
    if(currentIndex && currentIndex < tabsCount) {
      this.stepper.selectedIndex = currentIndex;
    }
  }


  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field.formControl.valid;
    }

    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
}
