
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Vendor } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-vendor-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="vendors"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebVendorSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() vendors: Vendor[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'vendorType.name', headerName: 'Vendor Type', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'taxId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'line1', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'postalCode', filter: 'agTextColumnFilter'  },
{ field: 'emailAddress', filter: 'agTextColumnFilter'  },
{ field: 'phoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'fax', filter: 'agTextColumnFilter'  },
{ field: 'mailingAddress', filter: 'agTextColumnFilter'  },
{ field: 'vendorTypeId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'line2', filter: 'agTextColumnFilter'  },
{ field: 'country', filter: 'agTextColumnFilter'  },
{ field: 'office', filter: 'agTextColumnFilter'  },
{ field: 'email', filter: 'agTextColumnFilter'  },
{ field: 'website', filter: 'agTextColumnFilter'  },
{ field: 'contactPerson', filter: 'agTextColumnFilter'  },
{ field: 'owner', filter: 'agTextColumnFilter'  },
{ field: 'bankRoutingNumber', filter: 'agTextColumnFilter'  },
{ field: 'bankAccountNumber', filter: 'agTextColumnFilter'  },
{ field: 'bankName', filter: 'agTextColumnFilter'  },
{ field: 'bankCity', filter: 'agTextColumnFilter'  },
{ field: 'bankState', filter: 'agTextColumnFilter'  },
{ field: 'bankZip', filter: 'agTextColumnFilter'  },
{ field: 'notes', filter: 'agTextColumnFilter'  },
{ field: 'agreementDetails', filter: 'agTextColumnFilter'  },
{ field: 'providerSearchNameDisplayType', filter: 'agTextColumnFilter'  },
{ field: 'driversLicenseId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'logoId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'cellphone', filter: 'agTextColumnFilter'  },
{ field: 'achCheckOrWire', filter: 'agTextColumnFilter'  },
{ field: 'reductionNotes', filter: 'agTextColumnFilter'  },

{
      headerName: 'Latitude',
      field: 'latitude',
      valueFormatter: params => currencyFormatter(params.data?.latitude, '', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Longitude',
      field: 'longitude',
      valueFormatter: params => currencyFormatter(params.data?.longitude, '', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'businessCentralName', filter: 'agTextColumnFilter'  }
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

