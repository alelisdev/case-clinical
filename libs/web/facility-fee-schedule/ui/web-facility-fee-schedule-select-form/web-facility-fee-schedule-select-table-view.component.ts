
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, FacilityFeeSchedule } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-facility-fee-schedule-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="facilityFeeSchedules"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebFacilityFeeScheduleSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() facilityFeeSchedules: FacilityFeeSchedule[] = []
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
      headerName: 'Medicare Facility Rate',
      field: 'medicareFacilityRate',
      valueFormatter: params => currencyFormatter(params.data?.medicareFacilityRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Facility Fee',
      field: 'facilityFee',
      valueFormatter: params => currencyFormatter(params.data?.facilityFee, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Base Unit',
      field: 'baseUnit',
      valueFormatter: params => currencyFormatter(params.data?.baseUnit, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Prof Cf',
      field: 'profCf',
      valueFormatter: params => currencyFormatter(params.data?.profCf, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
}
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

