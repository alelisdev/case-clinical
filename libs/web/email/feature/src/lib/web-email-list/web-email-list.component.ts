

import { Component,ElementRef, OnInit, ViewChild } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-enterprise'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { WebEmailListStore } from './web-email-list.store'
import { Router,ActivatedRoute } from '@angular/router'
import { pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-email-list.component.html',
  providers: [WebEmailListStore],
})
export class WebEmailListComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular

  readonly vm$ = this.store.vm$
  activeView = 'table'

  public modules: any[] = [ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule]

  private gridApi
  private gridColumnApi
  private sideBar
  public defaultColDef
  private rowSelection
  columnDefs: ColDef[] = [{ field: 'name', filter: 'agTextColumnFilter' },
{ field: 'email', filter: 'agTextColumnFilter' },
{ field: 'isPublic', filter: 'agSetColumnFilter' },
{ field: 'primary', filter: 'agSetColumnFilter' },
{ field: 'verified', filter: 'agSetColumnFilter' },
{ field: 'verifyToken', filter: 'agTextColumnFilter' },
{ field: 'verifyExpires', filter: 'agDateColumnFilter' },
{ field: 'ownerId', filter: 'agTextColumnFilter' },{ field: 'id', filter: 'agTextColumnFilter' },
{ field: 'createdAt', filter: 'agDateColumnFilter' },
{ field: 'updatedAt', filter: 'agDateColumnFilter' }]
  constructor(private readonly store: WebEmailListStore, private route: ActivatedRoute, private router: Router) {
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
    this.store.loadEmailsEffect()
  }

  onSkipChange(pageIndex: number) {
    this.store.setSkip(pageIndex)
    this.store.loadEmailsEffect()
  }

  onSearchQueryChange(searchQuery: string) {
    if (searchQuery.length > 0) {
      this.store.setSearchQuery(searchQuery)
    } else {
      this.store.setSearchQuery('')
      this.store.loadEmailsEffect()
    }
  }

  onSubmitSearchQuery() {
    this.store.setSkip(0)
    this.store.loadEmailsEffect()
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

