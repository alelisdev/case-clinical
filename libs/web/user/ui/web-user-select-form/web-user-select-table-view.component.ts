
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, User } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-user-select-table-view',
  template: `
    <table-view
      class="w-full h-full"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="users"
      
      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebUserSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() users: User[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'provider.name', headerName: 'Provider', filter: 'agTextColumnFilter' },
{ field: 'attorney.name', headerName: 'Attorney', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data.updatedAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ headerName: 'Developer', field: 'developer', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'username', filter: 'agTextColumnFilter'  },
{ field: 'password', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'avatarUrl', filter: 'agTextColumnFilter'  },
{ field: 'line1', filter: 'agTextColumnFilter'  },
{ field: 'line2', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'postalCode', filter: 'agTextColumnFilter'  },
{ field: 'phone', filter: 'agTextColumnFilter'  },
{ field: 'bio', filter: 'agTextColumnFilter'  },
{ field: 'slug', filter: 'agTextColumnFilter'  },
{ field: 'status', filter: 'agTextColumnFilter'  },

{
      headerName: 'Signup Status',
      field: 'signupStatus',
      valueFormatter: params => currencyFormatter(params.data.signupStatus, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Verified', field: 'verified', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'customerId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'planId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'dateOfBirth', filter: 'agDateColumnFilter'  },
{ field: 'cellPhone', filter: 'agTextColumnFilter'  },
{ field: 'education', filter: 'agTextColumnFilter'  },
{ field: 'attorneyId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'providerId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true  }
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

