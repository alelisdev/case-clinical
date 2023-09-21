import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormlyModule } from '@ngx-formly/core'
import { WebUiStepperComponent } from './web-ui-stepper.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'stepper',
          component: WebUiStepperComponent,
        },
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
  ],
  declarations: [WebUiStepperComponent],
  exports: [WebUiStepperComponent],
})
export class WebUiStepperModule {}
