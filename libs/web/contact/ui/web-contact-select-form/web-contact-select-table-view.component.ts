
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Contact } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-contact-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="contacts"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebContactSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() contacts: Contact[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'contactKind.name', headerName: 'Contact Kind', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'honorific', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'suffix', filter: 'agTextColumnFilter'  },
{ field: 'primaryPhoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'primaryEmailAddress', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressLine1', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressLine2', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressCity', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressStateOrProvince', filter: 'agTextColumnFilter'  },
{ field: 'primaryAddressPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'notes', filter: 'agTextColumnFilter'  },
{ field: 'discriminator', filter: 'agTextColumnFilter'  },
{ field: 'contactKindId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'dateOfBirth', filter: 'agDateColumnFilter'  },

{
      headerName: 'Latitude',
      field: 'latitude',
      valueFormatter: params => currencyFormatter(params.data?.latitude, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Longitude',
      field: 'longitude',
      valueFormatter: params => currencyFormatter(params.data?.longitude, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'avatar', filter: 'agTextColumnFilter'  },
{ field: 'background', filter: 'agTextColumnFilter'  },
{ field: 'title', filter: 'agTextColumnFilter'  },
{ field: 'company', filter: 'agTextColumnFilter'  },
{ field: 'birthday', filter: 'agTextColumnFilter'  },
{ field: 'address', filter: 'agTextColumnFilter'  }
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

