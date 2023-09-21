
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, ClaimProcedure } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-claim-procedure-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="claimProcedures"
      [showSidebar]="false"
      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebClaimProcedureSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() claimProcedures: ClaimProcedure[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'placeOfService.name', headerName: 'Place of Service', filter: 'agTextColumnFilter' },
{ field: 'claimStatus.name', headerName: 'Claim Status', filter: 'agTextColumnFilter' },
{ field: 'claim.name', headerName: 'Claim', filter: 'agTextColumnFilter' },
{ field: 'appointment.name', headerName: 'Appointment', filter: 'agTextColumnFilter' },
{ field: 'procedure.name', headerName: 'Procedure', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'claimProcedureCodeId', filter: 'agTextColumnFilter'  },
{ field: 'procedureCodeId', filter: 'agTextColumnFilter'  },
{ field: 'claimId', filter: 'agTextColumnFilter', hide:true },
{ field: 'fromDateOfService', filter: 'agDateColumnFilter'  },
{ field: 'toDateOfService', filter: 'agDateColumnFilter'  },
{ field: 'placeOfServiceId', filter: 'agTextColumnFilter', hide:true },
{ field: 'nationalDrugCode', filter: 'agTextColumnFilter'  },
{ field: 'drugUnit', filter: 'agTextColumnFilter'  },
{ field: 'drugQuantity', filter: 'agTextColumnFilter'  },

{
      headerName: 'Quantity',
      field: 'quantity',
      valueFormatter: params => currencyFormatter(params.data?.quantity, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Billed Amount',
      field: 'billedAmount',
      valueFormatter: params => currencyFormatter(params.data?.billedAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Approved Amount',
      field: 'approvedAmount',
      valueFormatter: params => currencyFormatter(params.data?.approvedAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Adjustment Amount',
      field: 'adjustmentAmount',
      valueFormatter: params => currencyFormatter(params.data?.adjustmentAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Net Payment Amount',
      field: 'netPaymentAmount',
      valueFormatter: params => currencyFormatter(params.data?.netPaymentAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'paymentMethod', filter: 'agTextColumnFilter'  },
{ field: 'internalMemo', filter: 'agTextColumnFilter'  },
{ field: 'explainationOfBenefitsComment', filter: 'agTextColumnFilter'  },
{ field: 'claimStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'reason', filter: 'agTextColumnFilter'  },
{ field: 'procedureCode', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisPointer', filter: 'agTextColumnFilter'  },
{ field: 'modifier1', filter: 'agTextColumnFilter'  },
{ field: 'modifier2', filter: 'agTextColumnFilter'  },
{ field: 'modifier3', filter: 'agTextColumnFilter'  },
{ field: 'modifier4', filter: 'agTextColumnFilter'  },
{ field: 'appointmentId', filter: 'agTextColumnFilter', hide:true },
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

