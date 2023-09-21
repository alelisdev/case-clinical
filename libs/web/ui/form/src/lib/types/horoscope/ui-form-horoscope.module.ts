import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormHoroscopeComponent } from './ui-form-horoscope.component'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { HttpClientModule } from '@angular/common/http'
import { WebUiLaIconModule } from '@case-clinical/web/ui/la-icon'

@NgModule({
  declarations: [UiFormHoroscopeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    WebUiIconModule,
    UiFormFieldModule,
    WebUiLaIconModule,
    HttpClientModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'horoscope',
          component: UiFormHoroscopeComponent
        },
      ],
    }),
  ],
})
export class UiFormHoroscopeModule {}
