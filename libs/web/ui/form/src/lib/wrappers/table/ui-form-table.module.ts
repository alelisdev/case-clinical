import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormConextProviderModule } from '../../context-provider/ui-form-context-provider.module';
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormTableComponent } from './ui-form-table.component';

@NgModule({
  declarations: [UiFormTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    UiFormFieldModule,
    MatCheckboxModule,
    UiFormConextProviderModule,
    MatFormFieldModule,
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'table',
          component: UiFormTableComponent,
        },
      ],
    }),
  ],
})
export class UiFormTableModule {}
