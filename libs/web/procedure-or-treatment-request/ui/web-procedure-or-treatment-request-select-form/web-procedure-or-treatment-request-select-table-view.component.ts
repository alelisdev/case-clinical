
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, ProcedureOrTreatmentRequest } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-procedure-or-treatment-request-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="procedureOrTreatmentRequests"
      [showSidebar]="false"
      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebProcedureOrTreatmentRequestSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() procedureOrTreatmentRequests: ProcedureOrTreatmentRequest[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    ,
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'patientId', filter: 'agTextColumnFilter'  },
{ field: 'legalCaseId', filter: 'agTextColumnFilter'  },
{ field: 'facilityVendorId', filter: 'agTextColumnFilter'  },
{ field: 'facilityContractId', filter: 'agTextColumnFilter'  },
{ field: 'anesthesiaVendorId', filter: 'agTextColumnFilter'  },
{ field: 'anesthesiaVendorContractId', filter: 'agTextColumnFilter'  },
{ field: 'requestingProviderId', filter: 'agTextColumnFilter'  },
{ field: 'procedureTypeId', filter: 'agTextColumnFilter'  },
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

