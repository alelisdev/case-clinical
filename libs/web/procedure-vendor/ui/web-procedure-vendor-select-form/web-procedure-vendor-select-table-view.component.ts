
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, ProcedureVendor } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-procedure-vendor-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="procedureVendors"
      [showSidebar]="false"
      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebProcedureVendorSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() procedureVendors: ProcedureVendor[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'procedure.name', headerName: 'Procedure', filter: 'agTextColumnFilter' },
{ field: 'contract.name', headerName: 'Contract', filter: 'agTextColumnFilter' },
{ field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
{ field: 'status.name', headerName: 'Status', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'procedureId', filter: 'agTextColumnFilter', hide:true },
{ field: 'contractId', filter: 'agTextColumnFilter', hide:true },
{ field: 'vendorId', filter: 'agTextColumnFilter', hide:true },
{ field: 'statusId', filter: 'agTextColumnFilter', hide:true },

{
      headerName: 'Estimate',
      field: 'estimate',
      valueFormatter: params => currencyFormatter(params.data?.estimate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Funding Approved', field: 'fundingApproved', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' }
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

