
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Insurance } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-insurance-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="insurances"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebInsuranceSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() insurances: Insurance[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'insuranceType.name', headerName: 'Insurance Type', filter: 'agTextColumnFilter' },
{ field: 'insuranceSector.name', headerName: 'Insurance Sector', filter: 'agTextColumnFilter' },
{ field: 'lead.name', headerName: 'Lead', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true },
{ field: 'insuranceTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'insuranceSectorId', filter: 'agTextColumnFilter', hide:true },
{ field: 'policyNumber', filter: 'agTextColumnFilter'  },
{ field: 'insuranceCompany', filter: 'agTextColumnFilter'  },

{
      headerName: 'Minimum Coverage Amount',
      field: 'minimumCoverageAmount',
      valueFormatter: params => currencyFormatter(params.data?.minimumCoverageAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Maximum Coverage Amount',
      field: 'maximumCoverageAmount',
      valueFormatter: params => currencyFormatter(params.data?.maximumCoverageAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Is Stackable', field: 'isStackable', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'adjuster', filter: 'agTextColumnFilter'  },
{ field: 'leadId', filter: 'agTextColumnFilter', hide:true }
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

