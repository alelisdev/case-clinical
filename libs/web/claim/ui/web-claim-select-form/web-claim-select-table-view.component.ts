
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Claim } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-claim-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="claims"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebClaimSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() claims: Claim[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'priorAuthorizationRequest.name', headerName: 'Prior Authorization Request', filter: 'agTextColumnFilter' },
{ field: 'claim.name', headerName: 'Claim', filter: 'agTextColumnFilter' },
{ field: 'explanationOfPayment.name', headerName: 'Explanation of Payment', filter: 'agTextColumnFilter' },
{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'originalRecordDate', filter: 'agDateColumnFilter'  },
{ field: 'receivedDate', filter: 'agDateColumnFilter'  },
{ field: 'dueDate', filter: 'agDateColumnFilter'  },
{ field: 'patientName', filter: 'agTextColumnFilter'  },
{ field: 'patientPhoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'patientDob', filter: 'agTextColumnFilter'  },
{ field: 'patientAddressLine1', filter: 'agTextColumnFilter'  },
{ field: 'patientAddressCity', filter: 'agTextColumnFilter'  },
{ field: 'patientAddressState', filter: 'agTextColumnFilter'  },
{ field: 'patientAddressPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'carrierName', filter: 'agTextColumnFilter'  },
{ field: 'carrierLine1', filter: 'agTextColumnFilter'  },
{ field: 'carrierLine2', filter: 'agTextColumnFilter'  },
{ field: 'carrierCity', filter: 'agTextColumnFilter'  },
{ field: 'carrierState', filter: 'agTextColumnFilter'  },
{ field: 'carrierPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'insuredName', filter: 'agTextColumnFilter'  },
{ field: 'insuredLine1', filter: 'agTextColumnFilter'  },
{ field: 'insuredCity', filter: 'agTextColumnFilter'  },
{ field: 'insuredState', filter: 'agTextColumnFilter'  },
{ field: 'insuredPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'patientSignature', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode1', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode2', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode3', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode4', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode5', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode6', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode7', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode8', filter: 'agTextColumnFilter'  },
{ field: 'federalTaxId', filter: 'agTextColumnFilter'  },
{ field: 'totalCharges', filter: 'agTextColumnFilter'  },
{ field: 'amountPaid', filter: 'agTextColumnFilter'  },
{ field: 'physicianSignature', filter: 'agTextColumnFilter'  },
{ field: 'physicianSignedOn', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacility', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacilityLine1', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacilityCity', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacilityState', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacilityPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacilityNpi', filter: 'agTextColumnFilter'  },
{ field: 'billingFacility', filter: 'agTextColumnFilter'  },
{ field: 'billingLine1', filter: 'agTextColumnFilter'  },
{ field: 'billingCity', filter: 'agTextColumnFilter'  },
{ field: 'billingState', filter: 'agTextColumnFilter'  },
{ field: 'billingPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'billingNpi', filter: 'agTextColumnFilter'  },
{ field: 'billingPhoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'billingOther', filter: 'agTextColumnFilter'  },
{ field: 'sessionNotes', filter: 'agTextColumnFilter'  },
{ field: 'referringProvider', filter: 'agTextColumnFilter'  },
{ field: 'referringProviderNpi', filter: 'agTextColumnFilter'  },
{ field: 'additionalClaimInfo', filter: 'agTextColumnFilter'  },
{ field: 'accountNumber', filter: 'agTextColumnFilter'  },
{ field: 'referenceNumber', filter: 'agTextColumnFilter'  },
{ field: 'facility', filter: 'agTextColumnFilter'  },
{ field: 'priorAuthorizationNumber', filter: 'agTextColumnFilter'  },
{ field: 'priorAuthorizationRequestId', filter: 'agTextColumnFilter', hide:true },
{ field: 'providerName', filter: 'agTextColumnFilter'  },
{ field: 'providerNumber', filter: 'agTextColumnFilter'  },
{ field: 'vendor', filter: 'agTextColumnFilter'  },
{ field: 'vendorLine1', filter: 'agTextColumnFilter'  },
{ field: 'vendorCSZ', filter: 'agTextColumnFilter'  },
{ field: 'vendorTaxId', filter: 'agTextColumnFilter'  },

{
      headerName: 'Total Approved Amount',
      field: 'totalApprovedAmount',
      valueFormatter: params => currencyFormatter(params.data?.totalApprovedAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Total Billed Amount',
      field: 'totalBilledAmount',
      valueFormatter: params => currencyFormatter(params.data?.totalBilledAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Total Net Pay Amount',
      field: 'totalNetPayAmount',
      valueFormatter: params => currencyFormatter(params.data?.totalNetPayAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'notes', filter: 'agTextColumnFilter'  },
{ field: 'claimId', filter: 'agTextColumnFilter', hide:true },
{ field: 'explanationOfPaymentId', filter: 'agTextColumnFilter', hide:true },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true }
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

