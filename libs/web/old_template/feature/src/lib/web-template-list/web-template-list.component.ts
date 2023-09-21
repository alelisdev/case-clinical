

import { Component,ElementRef, OnInit, ViewChild } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-enterprise'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { WebTemplateListStore } from './web-template-list.store'
import { Router,ActivatedRoute } from '@angular/router'
import { pluck } from 'rxjs/operators'
import { currencyFormatter } from '@case-clinical/web/core/data-access'

@Component({
  templateUrl: './web-template-list.component.html',
  providers: [WebTemplateListStore],
})
export class WebTemplateListComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular

  readonly vm$ = this.store.vm$
  activeView = 'table'

  public modules: any[] = [ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule]

  private gridApi
  private gridColumnApi
  private sideBar
  public defaultColDef
  private rowSelection
  columnDefs: ColDef[] = [,
{ field: 'id', filter: 'agTextColumnFilter' },
{ field: 'createdAt', filter: 'agDateColumnFilter' },
{ field: 'updatedAt', filter: 'agDateColumnFilter' },
{ field: 'name', filter: 'agTextColumnFilter' },
{ field: 'attachment', filter: 'agTextColumnFilter' },
{ field: 'encoding', filter: 'agTextColumnFilter' },
{ field: 'signatureFileType', filter: 'agTextColumnFilter' }]
  constructor(private readonly store: WebTemplateListStore, private route: ActivatedRoute, private router: Router) {
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
    this.store.loadTemplatesEffect()
  }

  onSkipChange(pageIndex: number) {
    this.store.setSkip(pageIndex)
    this.store.loadTemplatesEffect()
  }

  onSearchQueryChange(searchQuery: string) {
    if (searchQuery.length > 0) {
      this.store.setSearchQuery(searchQuery)
    } else {
      this.store.setSearchQuery('')
      this.store.loadTemplatesEffect()
    }
  }

  onSubmitSearchQuery() {
    this.store.setSkip(0)
    this.store.loadTemplatesEffect()
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

