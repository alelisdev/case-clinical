
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, MedLevel } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-med-level-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="medLevels"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebMedLevelSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() medLevels: MedLevel[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    ,
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },

{
      headerName: 'Approved Site Costs',
      field: 'approvedSiteCosts',
      valueFormatter: params => currencyFormatter(params.data?.approvedSiteCosts, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Maximum Medical Bills to Date',
      field: 'maximumMedicalBillsToDate',
      valueFormatter: params => currencyFormatter(params.data?.maximumMedicalBillsToDate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
}
  ]

  selectionDidChange(selectedRows) {
    this.rowItemsSelected.emit(selectedRows)
  }
  setSelected(ids: string[]) {
    this.tableView.gridApi.forEachNode((node) => {
      if (ids.includes(node.data?.id)) {
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

