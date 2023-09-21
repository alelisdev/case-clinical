import { WebUiFormlyDesignerModule } from './../../../../../formly-designer/src/lib/web-ui-formly-designer.module';
import { AgGridModule  } from '@ag-grid-community/angular'
import { CommonModule } from '@angular/common'
import { FormlyModule } from '@ngx-formly/core'
import { GridFormlyCellComponent } from './grid-formly-cell.component'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { UiFormFieldModule } from '../../wrappers/form-field/ui-form-field.module'
import { UiFormGridComponent } from './ui-form-grid.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import { WebUiModalModule } from '@case-clinical/web/ui/modal';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    GridFormlyCellComponent,
    UiFormGridComponent,
  ],
  imports: [
    AgGridModule.withComponents([GridFormlyCellComponent]),
    CommonModule,
    MatButtonModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'grid',
          component: UiFormGridComponent,
          defaultOptions: {
            templateOptions: {
              width: '100%',
              height: '400px',
            },
          },
        },
      ],
    }),
    ReactiveFormsModule,
    UiFormFieldModule,
    WebUiFormlyDesignerModule,
    WebUiButtonModule,
    WebUiModalModule,
  ],
})
export class UiFormGridModule {}
