import { WebUiLaIconModule } from '../../../../../la-icon/src/lib/web-ui-la-icon.module';
import { WebUiCodeModule } from '@case-clinical/web/ui/code';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormIconComponent } from './ui-form-icon.component'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'

@NgModule({
  declarations: [UiFormIconComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    WebUiCodeModule,
    WebUiLaIconModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'icon',
          component: UiFormIconComponent,
        },
      ],
    }),
  ],
})
export class UiFormLaIconModule {}
