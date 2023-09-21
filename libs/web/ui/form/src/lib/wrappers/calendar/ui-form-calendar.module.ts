import { WebUiCodeModule } from '@case-clinical/web/ui/code';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormCalendarComponent } from './ui-form-calendar.component'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiCalendarModule } from '@case-clinical/web/ui/ui-calendar';
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module';

@NgModule({
  declarations: [UiFormCalendarComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    WebUiCodeModule,
    UiFormConextProviderModule,
    UiCalendarModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'calendar',
          component: UiFormCalendarComponent,
        },
      ],
    }),
  ],
})
export class UiFormCalendarModule {}
