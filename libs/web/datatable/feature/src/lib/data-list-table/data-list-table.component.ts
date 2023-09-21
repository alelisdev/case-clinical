import { TableViewComponent } from '@case-clinical/web/datatable/ui';
import { Component,EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { ColDef } from '@ag-grid-community/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'data-list-table-view',
  template:  `
    <table-view
      class="w-full h-full"
      (itemDidSelect)="itemDidSelect.emit($event)"
      (selectionDidChange)="selectionDidChange.emit($event)"
      [data]="data"
      [pagination]="true"

      [columnDefs]="columnDefs"
      (firstDataDidRender)="firstDataDidRender.emit()"
      (filteredData)="filteredData.emit($event)"
      [checkBoxSelection]="checkBoxSelection"
    ></table-view>
  `
 })
export class DataListTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() data: any[] = []
  @Input() columnDefs: ColDef[]
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() selectionDidChange: EventEmitter<any> = new EventEmitter<any>()
  @Output() firstDataDidRender = new EventEmitter<void>()
  @Output() filteredData = new EventEmitter<any>()
  @Input() checkBoxSelection = false;

  setFilterState(filterState) {
    this.tableView.setFilterState(filterState)
  }

  setColumnState(columnState) {
    this.tableView.setColumnState(columnState)
  }

  getTableViewState() {
    return this.tableView.getTableViewState()
  }

  getImportColumns() {
    return this.tableView.getImportColumns();
  }

  exportTableView(exportConfig) {
    this.tableView.exportTableView(exportConfig)
  }
}
