import { ColDef } from '@ag-grid-community/core';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { Role } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-role-table-view',
  template: `
    <table-view
      class="w-full h-full"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="roles"
      [showSidebar]="false"
      [floatingFilter]="false"
      [suppressRowClickSelection]="true"
      [columnDefs]="columnDefs"
      ></table-view>
  `
})
export class WebRoleTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() roles: Role[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'id', filter: 'agTextColumnFilter' ,hide:true },
    { headerName: 'Please select roles to assign', field: 'name', filter: 'agTextColumnFilter' , headerCheckboxSelection: true, checkboxSelection: true},
  ]

  selectionDidChange(selectedRows) {
    this.rowItemsSelected.emit(selectedRows);
  }

  setSelected(ids: string[]) {
    this.tableView.gridApi.forEachNode((node) => {
      if(ids.includes(node.data?.id)) {
        node.setSelected(true)
      } else {
        node.setSelected(false)
      }
    })
  }

  onSelected(selected) {
    this.itemDidSelect.emit(selected)
  }
}
