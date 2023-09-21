
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, FeeSchedule } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-fee-schedule-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="feeSchedules"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebFeeScheduleSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() feeSchedules: FeeSchedule[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'organization.name', headerName: 'Organization', filter: 'agTextColumnFilter' },
{ field: 'specialty.name', headerName: 'Specialty', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'organizationId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'specialtyId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'code', filter: 'agTextColumnFilter'  },
{ field: 'modifier', filter: 'agTextColumnFilter'  },
{ field: 'description', filter: 'agTextColumnFilter'  },

{
      headerName: 'Medicare Physician Non Facility Rate',
      field: 'medicarePhysicianNonFacilityRate',
      valueFormatter: params => currencyFormatter(params.data?.medicarePhysicianNonFacilityRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Physician Non Facility Fee',
      field: 'physicianNonFacilityFee',
      valueFormatter: params => currencyFormatter(params.data?.physicianNonFacilityFee, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Medicare Physician Facility Rate',
      field: 'medicarePhysicianFacilityRate',
      valueFormatter: params => currencyFormatter(params.data?.medicarePhysicianFacilityRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Physician Facility Fee',
      field: 'physicianFacilityFee',
      valueFormatter: params => currencyFormatter(params.data?.physicianFacilityFee, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'baseUnit', filter: 'agTextColumnFilter'  },
{ field: 'profCf', filter: 'agTextColumnFilter'  }
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

