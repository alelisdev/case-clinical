
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Attorney } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-attorney-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="attorneys"
      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebAttorneySelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() attorneys: Attorney[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()
  columnDefs: ColDef[] = [
    { field: 'firm.name', headerName: 'Firm', filter: 'agTextColumnFilter' },
{ field: 'attorneyStatus.name', headerName: 'Attorney Status', filter: 'agTextColumnFilter' },
{ field: 'attorneyType.name', headerName: 'Attorney Type', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'firmId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'attorneyStatusId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'attorneyTypeId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'title', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'address', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'zip', filter: 'agTextColumnFilter'  },
{ field: 'email', filter: 'agTextColumnFilter'  },
{ field: 'direct', filter: 'agTextColumnFilter'  },
{ field: 'fax', filter: 'agTextColumnFilter'  },
{ field: 'cellPhone', filter: 'agTextColumnFilter'  },
{ field: 'barNumber', filter: 'agTextColumnFilter'  },
{ field: 'barState', filter: 'agTextColumnFilter'  },
{ headerName: 'Do Not Disturb', field: 'doNotDisturb', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'temp', filter: 'agTextColumnFilter'  },
{ field: 'createdById', filter: 'agTextColumnFilter', hide:true  },
{ field: 'dateCreated', filter: 'agDateColumnFilter'  },
{ headerName: 'Removed', field: 'removed', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'migSource', filter: 'agTextColumnFilter'  },
{ field: 'entity', filter: 'agTextColumnFilter'  },
{ headerName: 'Firm Nolonger Needed', field: 'firmNolongerNeeded', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' }
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

