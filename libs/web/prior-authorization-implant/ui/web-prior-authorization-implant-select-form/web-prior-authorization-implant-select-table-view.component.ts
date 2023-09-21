
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, PriorAuthorizationImplant } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-prior-authorization-implant-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="priorAuthorizationImplants"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebPriorAuthorizationImplantSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() priorAuthorizationImplants: PriorAuthorizationImplant[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'implant.name', headerName: 'Implant', filter: 'agTextColumnFilter' },
{ field: 'priorAuthorizationRequest.name', headerName: 'Prior Authorization Request', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },

{
      headerName: 'Estimated Cost',
      field: 'estimatedCost',
      valueFormatter: params => currencyFormatter(params.data?.estimatedCost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'implantId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'priorAuthorizationRequestId', filter: 'agTextColumnFilter', hide:true  }
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

