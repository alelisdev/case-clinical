
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Payment } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-payment-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="payments"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebPaymentSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() payments: Payment[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'batchControl.name', headerName: 'Batch Control', filter: 'agTextColumnFilter' },
{ field: 'bank.name', headerName: 'Bank', filter: 'agTextColumnFilter' },
{ field: 'payorType.name', headerName: 'Payor Type', filter: 'agTextColumnFilter' },
{ field: 'paymentType.name', headerName: 'Payment Type', filter: 'agTextColumnFilter' },
{ field: 'paymentApplicationMethod.name', headerName: 'Payment Application Method', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'paidOn', filter: 'agDateColumnFilter'  },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'batchControlId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'bankId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'payorTypeId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'paymentTypeId', filter: 'agTextColumnFilter', hide:true  },

{
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => currencyFormatter(params.data?.amount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Collected',
      field: 'collected',
      valueFormatter: params => currencyFormatter(params.data?.collected, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Dac',
      field: 'dac',
      valueFormatter: params => currencyFormatter(params.data?.dac, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Is Partial', field: 'isPartial', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'dateReceived', filter: 'agDateColumnFilter'  },
{ field: 'memo', filter: 'agTextColumnFilter'  },
{ field: 'createdBy', filter: 'agTextColumnFilter'  },
{ field: 'dateCreated', filter: 'agDateColumnFilter'  },
{ field: 'securitizationGroup', filter: 'agTextColumnFilter'  },
{ field: 'paymentApplicationMethodId', filter: 'agTextColumnFilter', hide:true  }
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

