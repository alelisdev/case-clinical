import { AgGridModule } from '@ag-grid-community/angular';
import { CommonModule } from '@angular/common';
import { FormlyModule } from '@ngx-formly/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NgModule } from '@angular/core'
import { NgSelectModule } from '@ng-select/ng-select';
import { TableExportComponent } from './export/table-export.component';
import { TableRadioComponent } from './export/radio/radio.component';
import { TableViewComponent } from './table-view/table-view.component';
import { TableViewConfigSelectComponent } from './table-view-config-select/table-view-config-select';
import { TableViewConfigTableViewComponent } from './table-view-config-select/table-view-config-table-view';
import { TableViewSelectorComponent } from './table-view-selector/table-view-selector.component'
import { WebUiButtonModule } from '@case-clinical/web/ui/button'
import { WebUiFormModule } from '@case-clinical/web/ui/form'
import { WebUiIconModule } from '@case-clinical/web/ui/icon'
import { WebUiModalModule } from '@case-clinical/web/ui/modal'
import { WebUiSelectFormModule } from '@case-clinical/web/ui/select-form'
import { TableViewConfigStore } from './table-view-config.store';
import { WebFormsUiTableViewConfigComponent } from './table-view-config-select/table-view-config-edit';

@NgModule({
  imports: [
    AgGridModule.withComponents({}),
    CommonModule,
    FormlyModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    NgSelectModule,
    WebUiButtonModule,
    WebUiButtonModule,
    WebUiFormModule,
    WebUiIconModule,
    WebUiModalModule,
    WebUiSelectFormModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'table-view-config-select',
          component: TableViewConfigSelectComponent,
          wrappers: ['form-field'],
        }
      ],
    }),
  ],
  declarations: [
    TableExportComponent,
    TableRadioComponent,
    TableViewComponent,
    TableViewConfigSelectComponent,
    TableViewConfigTableViewComponent,
    TableViewSelectorComponent,
    WebFormsUiTableViewConfigComponent,
  ],
  exports: [
    TableExportComponent,
    TableRadioComponent,
    TableViewComponent,
    TableViewSelectorComponent,
  ],
  providers: [
    TableViewConfigStore
  ]
})
export class WebDatatableUiModule {}
