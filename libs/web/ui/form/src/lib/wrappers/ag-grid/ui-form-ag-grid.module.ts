import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FormlyModule } from '@ngx-formly/core'
import { UiFormFieldModule } from '../form-field/ui-form-field.module'
import { UiFormAgGridComponent } from './ui-form-ag-grid.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from '@ag-grid-community/angular';
import { UiFormAgGridColumnComponent } from './ui-form-ag-grid-column.component';

@NgModule({
  declarations: [UiFormAgGridComponent, UiFormAgGridColumnComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    UiFormFieldModule,
    AgGridModule.withComponents([]),
    FormlyModule.forChild({
      wrappers: [
        {
          name: 'ag-grid',
          component: UiFormAgGridComponent,
        },
        {
          name: 'ag-grid-column',
          component: UiFormAgGridColumnComponent,
        }
      ],
    }),
  ],
  bootstrap: [UiFormAgGridComponent],
})
export class UiFormAgGridComponentModule {}
