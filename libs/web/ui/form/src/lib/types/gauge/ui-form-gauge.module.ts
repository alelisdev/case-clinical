import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { FinanceReportGaugeComponent } from './finance-report-gauge.component'

@NgModule({
  declarations: [FinanceReportGaugeComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'financial-gauge',
          component: FinanceReportGaugeComponent,
        }
      ],
    }),
  ],
})
export class UiFormGaugeModule {}
