
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Appointment } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-appointment-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="appointments"
      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebAppointmentSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() appointments: Appointment[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'location.name', headerName: 'Location', filter: 'agTextColumnFilter' },
{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'clinicalProvider.name', headerName: 'Clinical Provider', filter: 'agTextColumnFilter' },
{ field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'appointmentStatus.name', headerName: 'Appointment Status', filter: 'agTextColumnFilter' },
{ field: 'medicalRecordStatus.name', headerName: 'Medical Record Status', filter: 'agTextColumnFilter' },
{ field: 'visitKind.name', headerName: 'Visit Kind', filter: 'agTextColumnFilter' },

{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'appointmentDateAndTime', filter: 'agDateColumnFilter'  },
{ field: 'locationId', filter: 'agTextColumnFilter', hide:true  },
{ headerName: 'Checked in', field: 'checkedIn', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'checkedInDateTime', filter: 'agDateColumnFilter'  },
{ headerName: 'MedicalReport', field: 'medicalReport.name', filter: 'agTextColumnFilter'  },
{ headerName: 'Bill', field: 'bill.name', filter: 'agTextColumnFilter'  },
{ headerName: 'Imaging', field: 'imaging.name', filter: 'agTextColumnFilter'  },
{
      headerName: 'Duration',
      field: 'duration',
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'clinicalProviderId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'appointmentStatusId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'visitKindId', filter: 'agTextColumnFilter', hide:true  },

{ field: 'notes', filter: 'agTextColumnFilter'  },
{ field: 'recurringEventId', filter: 'agTextColumnFilter', hide:true  },
{ headerName: 'Is First Instance', field: 'isFirstInstance', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'description', filter: 'agTextColumnFilter'  },
{ field: 'start', filter: 'agTextColumnFilter'  },
{ field: 'end', filter: 'agTextColumnFilter'  },
{ headerName: 'All Day', field: 'allDay', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'recurrence', filter: 'agTextColumnFilter'  },
{ headerName: 'Final Visit Approved', field: 'finalVisitApproved', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
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

