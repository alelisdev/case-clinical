import { Component, Input } from "@angular/core";
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { GridApi } from '@ag-grid-community/core'
import { NameEditActionCellRenderer } from "./name-edit-action-renderer";
import { EditActionCellRenderer } from "./edit-action-renderer";
import { FuseConfigService } from "@fuse/services/config";

@Component({
  styleUrls: ['./edit-action-renderer.scss'],
  selector: 'table-name-validation-grid',
  template: `
    <ag-grid-angular
    *ngIf="agGridClassName | async as agGridClassName"
      #agGrid
      style="width: 100%;"
      [ngClass]="agGridClassName"
      [modules]="modules"
      domLayout="autoHeight"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [masterDetail]="true"
      [frameworkComponents]="frameworkComponents"
      [detailCellRendererParams]="detailCellRendererParams"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NameValidationGridComponent {
  @Input() rowData: any[];
  @Input() columnDefs: any[];
  @Input() detailCellRendererParams: any;
  agGridClassName = this.configService.agGridClassName$;
  modules = AllModules
  public gridApi: GridApi

  frameworkComponents = {
    btnActionCellRenderer: EditActionCellRenderer,
    btnNameActionCellRenderer: NameEditActionCellRenderer,
  }

  defaultColDef = {
    flex: 1,
    minWidth: 200,
    floatingFilter: false,
    hide: false,
    resizable: true,
    sortable: true
  }

  constructor( private configService: FuseConfigService, ) {}

  onGridReady(params): void {
    this.gridApi = params.api
  }
}
