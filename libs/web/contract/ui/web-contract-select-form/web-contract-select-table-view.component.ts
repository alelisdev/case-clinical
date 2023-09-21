
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, Contract } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-contract-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="contracts"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebContractSelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() contracts: Contract[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'organization.name', headerName: 'Organization', filter: 'agTextColumnFilter' },
{ field: 'billingOrganization.name', headerName: 'Billing Organization', filter: 'agTextColumnFilter' },
{ field: 'template.name', headerName: 'Template', filter: 'agTextColumnFilter' },
{ field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
{ field: 'reconciliationPeriodType.name', headerName: 'Reconciliation Period Type', filter: 'agTextColumnFilter' },
{ field: 'calculationBasisType.name', headerName: 'Calculation Basis Type', filter: 'agTextColumnFilter' },
{ field: 'process.name', headerName: 'Process', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'organizationId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'billingOrganizationId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'templateId', filter: 'agTextColumnFilter', hide:true  },
{ headerName: 'Bill on Behalf', field: 'billOnBehalf', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'billRate', filter: 'agTextColumnFilter'  },
{ field: 'vendorId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'contractDate', filter: 'agDateColumnFilter'  },
{ field: 'maturityDate', filter: 'agDateColumnFilter'  },
{ headerName: 'Requires Tpa Medical Necessity', field: 'requiresTpaMedicalNecessity', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Requires Tpa Medicare Allowable', field: 'requiresTpaMedicareAllowable', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'reconciliationPeriodTypeId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'calculationBasisTypeId', filter: 'agTextColumnFilter', hide:true  },
{ headerName: 'Signed', field: 'signed', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'processId', filter: 'agTextColumnFilter', hide:true  }
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

