import { WebCircleProgresModule } from './../../../../../circle-progress/src/lib/web-circle-progress.module';
import { WebUiCodeModule } from '@case-clinical/web/ui/code';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormCircleProgressComponent } from './ui-form-circle-progress.component';

@NgModule({
  declarations: [UiFormCircleProgressComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    WebCircleProgresModule,
    WebUiCodeModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'circle-progress',
          component: UiFormCircleProgressComponent,
        },
      ],
    }),
  ],
})
export class UiFormCircleProgressModule {}
