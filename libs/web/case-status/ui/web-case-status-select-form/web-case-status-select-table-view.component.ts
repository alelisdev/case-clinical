
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, CaseStatus } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-case-status-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="caseStatuses"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebCaseStatusSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() caseStatuses: CaseStatus[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    ,
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },

{
      headerName: 'Order Index',
      field: 'orderIndex',
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'color', filter: 'agTextColumnFilter'  },
{ headerName: 'Is Default', field: 'isDefault', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },

{
      headerName: 'Ticker Date',
      field: 'tickerDate',
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Max Ticker Date',
      field: 'maxTickerDate',
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Move Docs', field: 'moveDocs', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'dateCreated', filter: 'agDateColumnFilter'  },
{ headerName: 'Removed', field: 'removed', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'createdBy', filter: 'agTextColumnFilter'  },
{ field: 'migSource', filter: 'agTextColumnFilter'  },
{ field: 'entity', filter: 'agTextColumnFilter'  },
{ field: 'temp', filter: 'agTextColumnFilter'  }
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

