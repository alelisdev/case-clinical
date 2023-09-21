

import { Component,ElementRef, OnInit, ViewChild } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-enterprise'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { WebChatListStore } from './web-chat-list.store'
import { Router,ActivatedRoute } from '@angular/router'
import { pluck } from 'rxjs/operators'
import { currencyFormatter } from '@case-clinical/web/core/data-access'

@Component({
  templateUrl: './web-chat-list.component.html',
  providers: [WebChatListStore],
})
export class WebChatListComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular

  readonly vm$ = this.store.vm$
  activeView = 'table'

  public modules: any[] = [ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule]

  private gridApi
  private gridColumnApi
  private sideBar
  public defaultColDef
  private rowSelection
  columnDefs: ColDef[] = [{ field: 'user.name', filter: "'agSetColumnFilter'" },
{ field: 'id', filter: 'agTextColumnFilter' },
{ field: 'createdAt', filter: 'agDateColumnFilter' },
{ field: 'updatedAt', filter: 'agDateColumnFilter' },
{ field: 'name', filter: 'agTextColumnFilter' },
{ field: 'userId', filter: 'agTextColumnFilter' },

{
      headerName: 'Unread Count',
      field: 'unreadCount',
      valueFormatter: params => currencyFormatter(params.data?.unreadCount, '', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'muted', filter: 'agSetColumnFilter' },
{ field: 'lastMessage', filter: 'agTextColumnFilter' },
{ field: 'lastMessageAt', filter: 'agTextColumnFilter' }]
  constructor(private readonly store: WebChatListStore, private route: ActivatedRoute, private router: Router) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
      sortable: true,
    }

    this.rowSelection = 'single'
    this.sideBar = 'filters'
}

  ngOnInit(): void {
    this.store.loadChatsEffect()
  }

  onSkipChange(pageIndex: number) {
    this.store.setSkip(pageIndex)
    this.store.loadChatsEffect()
  }

  onSearchQueryChange(searchQuery: string) {
    if (searchQuery.length > 0) {
      this.store.setSearchQuery(searchQuery)
    } else {
      this.store.setSearchQuery('')
      this.store.loadChatsEffect()
    }
  }

  onSubmitSearchQuery() {
    this.store.setSkip(0)
    this.store.loadChatsEffect()
  }

  setSearchFocus(searchFocused) {
    this.store.setSearchBarInFocus(searchFocused)
  }

  setActiveView(viewName) {
    this.activeView = viewName
  }

  sizeToFit(): void {
    this.gridApi.sizeColumnsToFit()
  }

  autoSizeAll(skipHeader): void {
    const allColumnIds = []
    this.gridColumnApi.getAllColumns().forEach((column) => {
      allColumnIds.push(column.colId)
   })
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader)
  }

  onGridReady(params): void {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    this.sizeToFit()
  }


  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    this.router.navigate([selectedRows[0]?.id], { relativeTo: this.route });
  }
}

