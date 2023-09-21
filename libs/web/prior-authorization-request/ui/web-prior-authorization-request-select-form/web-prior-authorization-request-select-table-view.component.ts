
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-prior-authorization-request-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="priorAuthorizationRequests"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebPriorAuthorizationRequestSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() priorAuthorizationRequests: PriorAuthorizationRequest[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'procedureSite.name', headerName: 'Procedure Site', filter: 'agTextColumnFilter' },
{ field: 'surgicalPosition.name', headerName: 'Surgical Position', filter: 'agTextColumnFilter' },
{ field: 'treatingProvider.name', headerName: 'Treating Provider', filter: 'agTextColumnFilter' },
{ field: 'referredTo.name', headerName: 'Referred to', filter: 'agTextColumnFilter' },
{ field: 'prescription.name', headerName: 'Prescription', filter: 'agTextColumnFilter' },
{ field: 'visitKind.name', headerName: 'Visit Kind', filter: 'agTextColumnFilter' },
{ field: 'guidelineUsed.name', headerName: 'Guideline Used', filter: 'agTextColumnFilter' },
{ field: 'authorizationKind.name', headerName: 'Authorization Kind', filter: 'agTextColumnFilter' },
{ field: 'authorizationStatus.name', headerName: 'Authorization Status', filter: 'agTextColumnFilter' },
{ field: 'bill.name', headerName: 'Bill', filter: 'agTextColumnFilter' },
{ field: 'medicalReport.name', headerName: 'Medical Report', filter: 'agTextColumnFilter' },
{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'caseProcedure.name', headerName: 'Case Procedure', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'referredOn', filter: 'agDateColumnFilter'  },
{ field: 'approvedOn', filter: 'agDateColumnFilter'  },
{ field: 'effectiveAsOf', filter: 'agDateColumnFilter'  },
{ field: 'expiresOn', filter: 'agDateColumnFilter'  },

{
      headerName: 'Duration',
      field: 'duration',
      valueFormatter: params => currencyFormatter(params.data?.duration, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'procedureSiteId', filter: 'agTextColumnFilter', hide:true },
{ field: 'surgicalPositionId', filter: 'agTextColumnFilter', hide:true },
{ field: 'procedureDescription', filter: 'agTextColumnFilter'  },
{ field: 'remarks', filter: 'agTextColumnFilter'  },
{ headerName: 'Underwriting Approved', field: 'underwritingApproved', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Tpa Approved', field: 'tpaApproved', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Requires Medical Director', field: 'requiresMedicalDirector', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'reviewedOn', filter: 'agDateColumnFilter'  },
{ field: 'treatingProviderId', filter: 'agTextColumnFilter', hide:true },
{ field: 'referredToId', filter: 'agTextColumnFilter', hide:true },
{ field: 'priorAuthorizationNumber', filter: 'agTextColumnFilter'  },
{ field: 'caseManager', filter: 'agTextColumnFilter'  },
{ field: 'memberNumber', filter: 'agTextColumnFilter'  },
{ field: 'medicalDirector', filter: 'agTextColumnFilter'  },
{ field: 'tpaApprover', filter: 'agTextColumnFilter'  },
{ field: 'underwriter', filter: 'agTextColumnFilter'  },
{ field: 'prescriptionId', filter: 'agTextColumnFilter', hide:true },
{ field: 'visitKindId', filter: 'agTextColumnFilter', hide:true },
{ field: 'guidelineUsedId', filter: 'agTextColumnFilter', hide:true },
{ field: 'guidelineRequires', filter: 'agTextColumnFilter'  },
{ field: 'authorizationKindId', filter: 'agTextColumnFilter', hide:true },
{ field: 'authorizationStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'billId', filter: 'agTextColumnFilter', hide:true },
{ field: 'medicalReportId', filter: 'agTextColumnFilter', hide:true },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true },
{ field: 'caseProcedureId', filter: 'agTextColumnFilter', hide:true }
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

