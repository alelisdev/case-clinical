
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, LegalCase } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-legal-case-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="legalCases"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebLegalCaseSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() legalCases: LegalCase[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'accidentType.name', headerName: 'Accident Type', filter: 'agTextColumnFilter' },
{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'medLevel.name', headerName: 'Med Level', filter: 'agTextColumnFilter' },
{ field: 'firm.name', headerName: 'Firm', filter: 'agTextColumnFilter' },
{ field: 'attorney.name', headerName: 'Attorney', filter: 'agTextColumnFilter' },
{ field: 'caseStatus.name', headerName: 'Case Status', filter: 'agTextColumnFilter' },
{ field: 'caseType.name', headerName: 'Case Type', filter: 'agTextColumnFilter' },
{ field: 'patientTreatmentStatus.name', headerName: 'Patient Treatment Status', filter: 'agTextColumnFilter' },
{ field: 'caseProgressStatus.name', headerName: 'Case Progress Status', filter: 'agTextColumnFilter' },
{ field: 'adverseInsuranceStatus.name', headerName: 'Adverse Insurance Status', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'accidentTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true },
{ field: 'medLevelId', filter: 'agTextColumnFilter', hide:true },
{ field: 'firmId', filter: 'agTextColumnFilter', hide:true },
{ field: 'attorneyId', filter: 'agTextColumnFilter', hide:true },
{ field: 'agentId', filter: 'agTextColumnFilter'  },
{ field: 'caseStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'caseTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'patientTreatmentStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'medicalRecordNumber', filter: 'agTextColumnFilter'  },
{ field: 'pharmacyControlNumber', filter: 'agTextColumnFilter'  },
{ field: 'pchGroupNumber', filter: 'agTextColumnFilter'  },
{ field: 'dateOfLoss', filter: 'agDateColumnFilter'  },
{ field: 'caseStatusDate', filter: 'agDateColumnFilter'  },
{ field: 'caseStatusOther', filter: 'agTextColumnFilter'  },
{ field: 'paralegal', filter: 'agTextColumnFilter'  },
{ field: 'paralegalContact', filter: 'agTextColumnFilter'  },
{ field: 'caseNoteSummary', filter: 'agTextColumnFilter'  },

{
      headerName: 'Policy Limit',
      field: 'policyLimit',
      valueFormatter: params => currencyFormatter(params.data?.policyLimit, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Attorney Fee',
      field: 'attorneyFee',
      valueFormatter: params => currencyFormatter(params.data?.attorneyFee, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'referringPhysician', filter: 'agTextColumnFilter'  },
{ headerName: 'No More Treatment', field: 'noMoreTreatment', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Medpay', field: 'medpay', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'fileNumber', filter: 'agTextColumnFilter'  },
{ field: 'caseNumber', filter: 'agTextColumnFilter'  },
{ field: 'accidentState', filter: 'agTextColumnFilter'  },
{ field: 'assignedTo', filter: 'agTextColumnFilter'  },
{ headerName: 'Attorney Paid', field: 'attorneyPaid', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'attorneySentDate', filter: 'agDateColumnFilter'  },
{ headerName: 'Write off', field: 'writeOff', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'No MRI', field: 'noMRI', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'No PT', field: 'noPT', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'No First Appointment', field: 'noFirstAppointment', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Hot', field: 'hot', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Documents Uploaded', field: 'documentsUploaded', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Attorney Review', field: 'attorneyReview', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Escalated Review', field: 'escalatedReview', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'In Active', field: 'inActive', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Criteria 1712', field: 'criteria1712', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'documentUploadedDate', filter: 'agDateColumnFilter'  },
{ field: 'patientDischargedGatheringRecordsDate', filter: 'agDateColumnFilter'  },
{ field: 'resubmitted', filter: 'agDateColumnFilter'  },
{ field: 'caseProgressStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'firmCaseManager', filter: 'agTextColumnFilter'  },
{ field: 'adverseInsuranceStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdBy', filter: 'agTextColumnFilter'  },
{ field: 'renegotiatePayOffDate', filter: 'agDateColumnFilter'  }
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

