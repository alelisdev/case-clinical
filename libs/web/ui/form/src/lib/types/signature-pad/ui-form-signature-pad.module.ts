import { WebUiSignaturePadModule } from './../../../../../signature-pad/src/lib/web-ui-signature-pad.module';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormSignaturePadComponent } from './ui-form-signature-pad.component'

@NgModule({
  declarations: [UiFormSignaturePadComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    WebUiSignaturePadModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'signature-pad',
          component: UiFormSignaturePadComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormSignaturePadModule {}
