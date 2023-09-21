
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, ReferralRequest } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-referral-request-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="referralRequests"
      [showSidebar]="false"
      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebReferralRequestSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() referralRequests: ReferralRequest[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'requestingProvider.name', headerName: 'Requesting Provider', filter: 'agTextColumnFilter' },
{ field: 'referredTo.name', headerName: 'Referred to', filter: 'agTextColumnFilter' },
{ field: 'referredToLocation.name', headerName: 'Referred to Location', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true },
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true },
{ field: 'requestingProviderId', filter: 'agTextColumnFilter', hide:true },
{ field: 'referredToId', filter: 'agTextColumnFilter', hide:true },
{ field: 'clinicalProviderLocationId', filter: 'agTextColumnFilter', hide:true },
{ field: 'status', filter: 'agTextColumnFilter'  }
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

