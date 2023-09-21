
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Authorization } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-authorization-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="authorizations"
      [showSidebar]="false"
      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebAuthorizationSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() authorizations: Authorization[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
{ field: 'authorizationCategory.name', headerName: 'Authorization Category', filter: 'agTextColumnFilter' },
{ field: 'authorizationType.name', headerName: 'Authorization Type', filter: 'agTextColumnFilter' },
{ field: 'procedure.name', headerName: 'Procedure', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'vendorId', filter: 'agTextColumnFilter', hide:true },
{ field: 'authorizationCategoryId', filter: 'agTextColumnFilter', hide:true },
{ field: 'authorizationTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'requestDescription', filter: 'agTextColumnFilter'  },

{
      headerName: 'Duration or Quantity',
      field: 'durationOrQuantity',
      valueFormatter: params => currencyFormatter(params.data?.durationOrQuantity, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'unit', filter: 'agTextColumnFilter'  },
{ field: 'cptCode', filter: 'agTextColumnFilter'  },
{ field: 'procedureId', filter: 'agTextColumnFilter', hide:true }
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

