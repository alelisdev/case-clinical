
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Document } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-document-select-table-view',
  template: `
    <table-view
    [autoHeight]="autoHeight"
      class="w-full h-full"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="documents"
      
      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebDocumentSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() documents: Document[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  @Input() autoHeight = false;
  columnDefs: ColDef[] = [
    { field: 'contract.name', headerName: 'Contract', filter: 'agTextColumnFilter' },
{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'prescription.name', headerName: 'Prescription', filter: 'agTextColumnFilter' },
{ field: 'provider.name', headerName: 'Provider', filter: 'agTextColumnFilter' },
{ field: 'patientStudies.name', headerName: 'Patient Studies', filter: 'agTextColumnFilter' },
{ field: 'procedureVendor.name', headerName: 'Procedure Vendor', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'attachment', filter: 'agTextColumnFilter'  },
{ field: 'encoding', filter: 'agTextColumnFilter'  },
{ field: 'extension', filter: 'agTextColumnFilter'  },
{ field: 'contractId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'prescriptionId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'providerId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'patientStudyId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'procedureVendorId', filter: 'agTextColumnFilter', hide:true  }
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

