
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Firm } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-firm-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="firms"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebFirmSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() firms: Firm[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'firmStatus.name', headerName: 'Firm Status', filter: 'agTextColumnFilter' },
{ field: 'eula.name', headerName: 'Eula', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'firmStatusNote', filter: 'agTextColumnFilter'  },
{ field: 'firmStatusId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'firmName', filter: 'agTextColumnFilter'  },
{ field: 'address', filter: 'agTextColumnFilter'  },
{ field: 'address2', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'zip', filter: 'agTextColumnFilter'  },
{ field: 'country', filter: 'agTextColumnFilter'  },
{ field: 'office', filter: 'agTextColumnFilter'  },
{ field: 'fax', filter: 'agTextColumnFilter'  },
{ field: 'webAddress', filter: 'agTextColumnFilter'  },
{ field: 'email', filter: 'agTextColumnFilter'  },

{
      headerName: 'Rating',
      field: 'rating',
      valueFormatter: params => currencyFormatter(params.data?.rating, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'notes', filter: 'agTextColumnFilter'  },
{ headerName: 'Do Not Disturb', field: 'doNotDisturb', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Invoice Only', field: 'invoiceOnly', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'reductionNotes', filter: 'agTextColumnFilter'  },
{ headerName: 'Deceased', field: 'deceased', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'createdBy', filter: 'agTextColumnFilter'  },
{ field: 'dateCreated', filter: 'agDateColumnFilter'  },
{ field: 'eulaId', filter: 'agTextColumnFilter', hide:true  }
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

