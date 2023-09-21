
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Lead } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-lead-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="leads"
      [showSidebar]="false"
      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebLeadSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() leads: Lead[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'accidentType.name', headerName: 'Accident Type', filter: 'agTextColumnFilter' },
{ field: 'driversLicense.name', headerName: 'Drivers License', filter: 'agTextColumnFilter' },
{ field: 'policeReportAttachment.name', headerName: 'Police Report Attachment', filter: 'agTextColumnFilter' },
{ field: 'phoneRecording.name', headerName: 'Phone Recording', filter: 'agTextColumnFilter' },
{ field: 'status.name', headerName: 'Status', filter: 'agTextColumnFilter' },
{ field: 'sourceOfLead.name', headerName: 'Source of Lead', filter: 'agTextColumnFilter' },
{ field: 'submittedBy.name', headerName: 'Submitted by', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'middleName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'address', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'postalCode', filter: 'agTextColumnFilter'  },
{ field: 'dateOfBirth', filter: 'agDateColumnFilter'  },
{ field: 'dateOfLoss', filter: 'agDateColumnFilter'  },
{ field: 'dateOfRetention', filter: 'agDateColumnFilter'  },
{ field: 'phoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'emailAddress', filter: 'agTextColumnFilter'  },
{ field: 'priorRepresentation', filter: 'agTextColumnFilter'  },
{ field: 'accidentTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'driversLicenseId', filter: 'agTextColumnFilter', hide:true },
{ field: 'driversLicenseNumber', filter: 'agTextColumnFilter'  },
{ field: 'driversLicenseState', filter: 'agTextColumnFilter'  },
{ headerName: 'Severe Injury', field: 'severeInjury', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'emergencyContactId', filter: 'agTextColumnFilter'  },
{ headerName: 'Allowed to Contact Emergency Contact', field: 'allowedToContactEmergencyContact', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Police Report', field: 'policeReport', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'policeReportAttachmentId', filter: 'agTextColumnFilter', hide:true },
{ field: 'phoneRecordingId', filter: 'agTextColumnFilter', hide:true },
{ field: 'leadStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'leadSpecialistId', filter: 'agTextColumnFilter'  },
{ field: 'leadSourceId', filter: 'agTextColumnFilter', hide:true },
{ field: 'submittedById', filter: 'agTextColumnFilter', hide:true },
{ field: 'legalCaseId', filter: 'agTextColumnFilter'  }
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

