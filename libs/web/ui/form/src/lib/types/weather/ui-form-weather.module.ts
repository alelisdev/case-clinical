import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormWeatherComponent } from './ui-form-weather.component'
import { WebUiWeatherWidgetModule } from '@case-clinical/web/ui/weather-widget'
import { RouterModule } from '@angular/router'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'


@NgModule({
  declarations: [UiFormWeatherComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    WebUiIconModule,
    WebUiWeatherWidgetModule,
    UiFormFieldModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'weather',
          component: UiFormWeatherComponent
        },
      ],
    }),
  ],
})
export class UiFormWeatherModule {}
