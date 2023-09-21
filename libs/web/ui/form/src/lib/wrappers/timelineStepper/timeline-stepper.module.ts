import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TimeLineStepperComponent } from './timeline-stepper.component'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module'
import { UiFormTimeLineStepComponent } from './timeline-step.component'

@NgModule({
  declarations: [TimeLineStepperComponent, UiFormTimeLineStepComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    UiFormConextProviderModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'timeline-stepper',
          component: TimeLineStepperComponent,
        },
        {
          name: 'timeline-step',
          component: UiFormTimeLineStepComponent,
        },
      ],
    }),
  ],
})
export class UiTimeLineStepperModule {}
