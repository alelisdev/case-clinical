import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlySelectModule } from '@ngx-formly/core/select'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { WebUiLaIconModule } from 'libs/web/ui/la-icon/src/lib/web-ui-la-icon.module'
import { UiFormToggleComponent } from './ui-form-toggle.component'
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [UiFormToggleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiFormFieldModule,
    FormlySelectModule,
    WebUiLaIconModule,
    MatButtonToggleModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'toggle',
          component: UiFormToggleComponent,
          wrappers: ['form-field'],
        },
      ],
    }),
  ],
})
export class UiFormToggleModule {}
