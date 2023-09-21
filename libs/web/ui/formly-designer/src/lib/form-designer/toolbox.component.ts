import { FuseConfigService } from './../../../../../@fuse/services/config/config.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AllModules, ColDef } from '@ag-grid-enterprise/all-modules';
import { formFields } from './form-fields';
import {
  GridApi,
  RowDragEndEvent,
} from '@ag-grid-community/core';
@Component({
  selector: 'ui-formly-tool-box',
  template: `
      <ag-grid-angular
        class="w-full h-full"
        [ngClass]="gridClassName"
        [defaultColDef]="defaultColDef"
        [rowDragManaged]="true"
        [animateRows]="true"
        [autoGroupColumnDef]="autoGroupColumnDef"
        [rowData]="leftRowData"
        [columnDefs]="columns"
        (gridReady)="gridReady($event)"
        [modules]="modules">
      </ag-grid-angular>
    `
})
export class WebUiFormlyToolboxComponent implements OnInit {
  @Input() gridClassName = 'dark';
  @Output() onGridReady = new EventEmitter<any>

  defaultColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true
  };

  public autoGroupColumnDef: ColDef = {
    rowDrag: params => !params.node.group,
    headerName: 'Form Fields',
    field: 'name',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      suppressCount: true,
    },
  };

  gridApi: GridApi
  modules = AllModules;
  rawData = formFields;
  leftRowData: any

  columns = [
    { headerName: 'Type', field: 'type', rowGroup: true, hide: true, },
  ];

  ngOnInit(): void {
    this.leftRowData = this.rawData.map(el => ({
      ...el,
      fromToolbox: true,
    }));
  }

  gridReady($event) {
    this.gridApi = $event.api
    this.onGridReady.emit($event)
  }

  onRowDragMove(event: RowDragEndEvent) {
    var movingNode = event.node!;
    var overNode = event.overNode!;
    // find out what country group we are hovering over
    var groupCountry;
    if (overNode.group) {
      // if over a group, we take the group key (which will be the
      // country as we are grouping by country)
      groupCountry = overNode.key;
    } else {
      // if over a non-group, we take the country directly
      groupCountry = overNode.data.country;
    }
    var needToChangeParent = movingNode.data.country !== groupCountry;
    if (needToChangeParent) {
      var movingData = movingNode.data;
      movingData.country = groupCountry;
      this.gridApi.applyTransaction({
        update: [movingData],
      });
      this.gridApi.clearFocusedCell();
    }
  }

}
