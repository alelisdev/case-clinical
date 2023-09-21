
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, ContractedRate } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-contracted-rate-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="contractedRates"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebContractedRateSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() contractedRates: ContractedRate[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'contract.name', headerName: 'Contract', filter: 'agTextColumnFilter' },
{ field: 'contractedRateKind.name', headerName: 'Contracted Rate Kind', filter: 'agTextColumnFilter' },
{ field: 'contractKind.name', headerName: 'Contract Kind', filter: 'agTextColumnFilter' },
{ field: 'visitKind.name', headerName: 'Visit Kind', filter: 'agTextColumnFilter' },
{ field: 'clinicalProvider.name', headerName: 'Clinical Provider', filter: 'agTextColumnFilter' },
{ field: 'specialty.name', headerName: 'Specialty', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },

{
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => currencyFormatter(params.data?.amount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Percentage',
      field: 'percentage',
      valueFormatter: params => currencyFormatter(params.data?.percentage, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Reimbursed Rate',
      field: 'reimbursedRate',
      valueFormatter: params => currencyFormatter(params.data?.reimbursedRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Bill on Behalf', field: 'billOnBehalf', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'contractId', filter: 'agTextColumnFilter', hide:true },
{ field: 'contractedRateKindId', filter: 'agTextColumnFilter', hide:true },
{ field: 'contractKindId', filter: 'agTextColumnFilter', hide:true },
{ field: 'visitKindId', filter: 'agTextColumnFilter', hide:true },
{ field: 'clinicalProviderId', filter: 'agTextColumnFilter', hide:true },
{ field: 'specialtyId', filter: 'agTextColumnFilter', hide:true }
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

