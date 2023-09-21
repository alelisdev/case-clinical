import { WebUiCodeModule } from '@case-clinical/web/ui/code';
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormAgChartComponent } from './ui-form-ag-chart.component'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { AgChartsAngularModule } from 'ag-charts-angular';

@NgModule({
  declarations: [UiFormAgChartComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    WebUiCodeModule,
    AgChartsAngularModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'ag-chart',
          component: UiFormAgChartComponent,
        },
      ],
    }),
  ],
})
export class UiFormAgChartModule {}
