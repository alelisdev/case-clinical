import { CommonModule } from '@angular/common'
import { CubejsClientModule } from '@cubejs-client/ngx'
import { CubeService } from './cube-service.service'
import { FormlyModule } from '@ngx-formly/core'
import { NgApexchartsModule } from 'ng-apexcharts'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormAreaChartComponent } from './ui-form-area-chart.component'
import { UiFormBarChartComponent } from './ui-form-bar-chart.component'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormLineChartComponent } from './ui-form-line-chart.component'
import { UiFormPieChartComponent } from './ui-form-pie-chart.component'
import { UiFormPolarAreaChartComponent } from './ui-form-polar-area-chart.component'
import { UiFormRadarChartComponent } from './ui-form-radar-chart.component'
import { UiFormRadialChartComponent } from './ui-form-radial-chart.component'
import { UiFormTimelineChartComponent } from './ui-form-timeline-chart.component'
import { environment } from '@case-clinical/core/feature'

const cubejsOptions = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.K9PiJkjegbhnw4Ca5pPlkTmZihoOm42w8bja9Qs2qJg",
  options: {
    apiUrl: environment.apiHost + "/cubejs-api/v1"
  }
};

@NgModule({
  providers: [
    CubeService
  ],
  declarations: [
    UiFormLineChartComponent,
    UiFormAreaChartComponent,
    UiFormPieChartComponent,
    UiFormBarChartComponent,
    UiFormTimelineChartComponent,
    UiFormRadarChartComponent,
    UiFormPolarAreaChartComponent,
    UiFormRadialChartComponent,
  ],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    CubejsClientModule.forRoot(cubejsOptions),
    FormlyModule.forChild({
      types: [
        {
          name: 'chart',
          component: UiFormLineChartComponent,
        },
        {
          name: 'area-chart',
          component: UiFormAreaChartComponent,
        },
        {
          name: 'bar-chart',
          component: UiFormBarChartComponent,
        },
        {
          name: 'column-chart',
          extends: 'bar-chart',
          defaultOptions: {
            templateOptions: { horizontal: false },
          },
        },
        {
          name: 'pie-chart',
          component: UiFormPieChartComponent,
        },
        {
          name: 'polar-area-chart',
          component: UiFormPolarAreaChartComponent,
        },
        {
          name: 'radar-chart',
          component: UiFormRadarChartComponent,
        },
        {
          name: 'radial-chart',
          component: UiFormRadialChartComponent,
        },
        {
          name: 'time-line',
          component: UiFormTimelineChartComponent,
        },
      ],
    }),
  ],
})
export class UiFormChartModule {}
