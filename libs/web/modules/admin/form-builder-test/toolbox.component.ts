import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AllModules, ColDef } from '@ag-grid-enterprise/all-modules';

import {
  GridApi,
} from '@ag-grid-community/core';
import { formFields } from '@case-clinical/web/ui/formly-designer';
import { FuseConfigService } from '@fuse/services/config';

@Component({
  selector: 'example-tool-box',
  template: `
      <ag-grid-angular
        class="w-full h-full"
        *ngIf="agGridClassName | async as agGridClassName"
        [ngClass]="agGridClassName"
        [defaultColDef]="defaultColDef"
        [animateRows]="true"
        [rowSelection]="'single'"
        [autoGroupColumnDef]="autoGroupColumnDef"
        [rowData]="leftRowData"
        [columnDefs]="columns"
        (selectionChanged)="selectionChanged()"
        (gridReady)="gridReady($event)"
        [modules]="modules">
      </ag-grid-angular>
    `
})
export class ExampleToolboxComponent implements OnInit {
  @Output() selected = new EventEmitter()

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true
  };

  public autoGroupColumnDef: ColDef = {
    headerName: 'Form Fields',
    field: 'name',
    cellRenderer: 'agGroupCellRenderer',
  };

  gridApi: GridApi
  modules = AllModules;
  rawData = formFields.map(el => ({ name: el.name, type: el.type }));

  leftRowData: any
  agGridClassName = this.configService.agGridClassName$
  columns = [
    { headerName: 'Type', field: 'type', rowGroup: true, hide: true, },
  ];

  constructor(private configService: FuseConfigService) {}

  ngOnInit(): void {
    this.rawData.unshift({ name: 'Style', type: 'Class Builder' });
    this.leftRowData = this.rawData.map(el => ({
      ...el,
    }));
  }

  selectionChanged() {
    console.log('selectionChanged')
    this.selected.emit(this.gridApi.getSelectedRows()[0])
  }

  gridReady($event) {
    this.gridApi = $event.api
  }
}
