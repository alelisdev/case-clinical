
import { ColDef } from '@ag-grid-community/core'
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { currencyFormatter, dateFormatter, JournalEntry } from '@case-clinical/web/core/data-access'
import { TableViewComponent } from '@case-clinical/web/datatable/ui'

@Component({
  selector: 'ui-journal-entry-select-table-view',
  template: `
    <table-view
      [autoHeight]="autoHeight"
      class="w-full h-full"
      [showSidebar]="false"
      (itemDidSelect)="onSelected($event)"
      (selectionDidChange)="selectionDidChange($event)"
      [data]="journalEntries"

      [suppressRowClickSelection]="false"
      [columnDefs]="columnDefs"
    ></table-view>
  `,
})
export class WebJournalEntrySelectTableViewComponent {
  @ViewChild(TableViewComponent) tableView: TableViewComponent
  @Input() autoHeight = false;
  @Input() journalEntries: JournalEntry[] = []
  @Output() itemDidSelect: EventEmitter<any> = new EventEmitter<any>()
  @Output() rowItemsSelected: EventEmitter<any[]> = new EventEmitter<any[]>()

  columnDefs: ColDef[] = [
    { field: 'caseAccount.name', headerName: 'Case Account', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'locationName', filter: 'agTextColumnFilter'  },
{ field: 'fromTo', filter: 'agTextColumnFilter'  },
{ field: 'frequency', filter: 'agTextColumnFilter'  },
{ field: 'autoOrManual', filter: 'agTextColumnFilter'  },
{ field: 'process', filter: 'agTextColumnFilter'  },
{ field: 'perAccountOrAggregateJE', filter: 'agTextColumnFilter'  },

{
      headerName: 'Cost Rate',
      field: 'costRate',
      valueFormatter: params => currencyFormatter(params.data?.costRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'postingDate', filter: 'agDateColumnFilter'  },
{ field: 'documentDate', filter: 'agDateColumnFilter'  },
{ field: 'dueDate', filter: 'agDateColumnFilter'  },

{
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => currencyFormatter(params.data?.amount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'accountType', filter: 'agTextColumnFilter'  },
{ field: 'accountNumber', filter: 'agTextColumnFilter'  },
{ field: 'costCenter', filter: 'agTextColumnFilter'  },
{ field: 'appliesToDocumentNumber', filter: 'agTextColumnFilter'  },
{ field: 'caseAccountId', filter: 'agTextColumnFilter', hide:true }
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

