import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { UiFormOverviewComponent } from './ui-form-overview.component'

const currencyMask: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [UiFormOverviewComponent],
  imports: [
    CommonModule,
    UiFormFieldModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'overview',
          component: UiFormOverviewComponent,
        }
      ],
    }),
    NgxMaskModule.forRoot(currencyMask),
  ],
})
export class UiFormOverviewModule {}
