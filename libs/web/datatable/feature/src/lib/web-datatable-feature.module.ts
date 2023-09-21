import { WebUiLaIconModule } from './../../../../ui/la-icon/src/lib/web-ui-la-icon.module';
import { RouterModule } from '@angular/router';
import { WebUiPanelModule } from '@case-clinical/web/ui/panel';
import { WebDatatableUiModule } from '@case-clinical/web/datatable/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataListTableViewComponent } from './data-list-table/data-list-table.component';
import { WebDataListComponent } from './data-list/table-list.component';
import { WebUiCardHeaderModule } from '@case-clinical/web/ui/card-header';
import { WebUiPageHeaderModule } from '@case-clinical/web/ui/page-header';
import { WebUiPaginationModule } from '@case-clinical/web/ui/pagination';
import { WebUiSearchModule } from '@case-clinical/web/ui/search'
import { WebUiStackedListModule } from '@case-clinical/web/ui/stacked-list'
import { WebUiIconModule } from '@case-clinical/web/ui/icon';
import { WebUiButtonModule } from '@case-clinical/web/ui/button';
import { DataListService } from './business/data-list.service';
import { WebExcelDataTableViewComponent } from './data-list/excel-data-table-view';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { EditActionCellRenderer } from './data-list/edit-action-renderer';
import { NameValidationGridComponent } from './data-list/name-validation-grid';
import { AgGridModule } from '@ag-grid-community/angular';
import { NameEditActionCellRenderer } from './data-list/name-edit-action-renderer';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    RouterModule,
    WebDatatableUiModule,
    WebUiButtonModule,
    WebUiCardHeaderModule,
    WebUiIconModule,
    WebUiPageHeaderModule,
    WebUiPaginationModule,
    WebUiPanelModule,
    WebUiSearchModule,
    WebUiLaIconModule,
    WebUiStackedListModule,
    AgGridModule.withComponents([]),
  ],
  declarations: [
    DataListTableViewComponent,
    WebDataListComponent,
    EditActionCellRenderer,
    WebExcelDataTableViewComponent,
    NameValidationGridComponent,
    NameEditActionCellRenderer,
  ],

  exports: [
    WebDataListComponent,
    WebExcelDataTableViewComponent,
  ],
  providers: [
    DataListService
  ]
})
export class WebDatatableFeatureModule {}
