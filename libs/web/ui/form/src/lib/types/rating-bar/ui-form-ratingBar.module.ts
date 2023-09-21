/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormRatingBarComponent } from './ui-form-ratingBar.component'
import { BarRatingModule } from "ngx-bar-rating";
import { WebUiLaIconModule } from 'libs/web/ui/la-icon/src/lib/web-ui-la-icon.module'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
@NgModule({
  declarations: [UiFormRatingBarComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    BarRatingModule,
    WebUiLaIconModule,
    WebUiIconModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'ratingbar',
          component: UiFormRatingBarComponent,
        }
      ],
    }),
  ],
})
export class UiRatingBarModule {}
