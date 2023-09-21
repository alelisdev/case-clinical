
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, PriorAuthorizationProcedureCode } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-prior-authorization-procedure-code-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="priorAuthorizationProcedureCodes"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebPriorAuthorizationProcedureCodeSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() priorAuthorizationProcedureCodes: PriorAuthorizationProcedureCode[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'costCategory.name', headerName: 'Cost Category', filter: 'agTextColumnFilter' },
{ field: 'procedure.name', headerName: 'Procedure', filter: 'agTextColumnFilter' },
{ field: 'priorAuthorizationRequest.name', headerName: 'Prior Authorization Request', filter: 'agTextColumnFilter' },
{ field: 'procedureId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'priorAuthorizationRequestId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'costCategoryId', filter: 'agTextColumnFilter', hide:true  },

{
      headerName: 'Estimated Cost',
      field: 'estimatedCost',
      valueFormatter: params => currencyFormatter(params.data?.estimatedCost, '$', 2),
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

