

import { Component,ElementRef, OnInit, ViewChild } from '@angular/core'
import { AgGridAngular } from '@ag-grid-community/angular'
import { ColDef, FilterChangedEvent, SortChangedEvent } from '@ag-grid-community/core'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { WebUserFeaturePermissionListStore } from './web-user-feature-permission-list.store'
import { Router,ActivatedRoute } from '@angular/router'
import { pluck } from 'rxjs/operators'
import { currencyFormatter } from '@case-clinical/web/core/data-access'

@Component({
  templateUrl: './web-user-feature-permission-list.component.html',
  providers: [WebUserFeaturePermissionListStore],
})
export class WebUserFeaturePermissionListComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular

  readonly vm$ = this.store.vm$
  activeView = 'table'

  public modules: any[] = [ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule]

  private gridApi
  private gridColumnApi
  private sideBar
  public defaultColDef
  private rowSelection
  columnDefs: any[] = [{ field: 'featurePermission.name', headerName: 'Feature Permission', filter: 'agTextColumnFilter' },
{ field: 'user.name', headerName: 'User', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter' ,hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' ,hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' ,hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'featurePermissionId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'userId', filter: 'agTextColumnFilter', hide:true  }]
  constructor(private readonly store: WebUserFeaturePermissionListStore, private route: ActivatedRoute, private router: Router) {
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
    this.store.loadUserFeaturePermissionsEffect()
  }

  onSkipChange(pageIndex: number) {
    this.store.setSkip(pageIndex)
    this.store.loadUserFeaturePermissionsEffect()
  }

  onSearchQueryChange(searchQuery: string) {
    if (searchQuery.length > 0) {
      this.store.setSearchQuery(searchQuery)
    } else {
      this.store.setSearchQuery('')
      this.store.loadUserFeaturePermissionsEffect()
    }
  }

  onSubmitSearchQuery() {
    this.store.setSkip(0)
    this.store.loadUserFeaturePermissionsEffect()
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

  onSortChanged({ columnApi }: SortChangedEvent): void {
   this.store.setSortState(columnApi.getColumnState())
  }

  onFilterChanged({ api }: FilterChangedEvent): void {
    this.store.setFilterState(api.getFilterModel())
  }

  onFirstDataRendered(event): void {
    this.store.restoreFilterAndSortState()
    this.store.filterSettings$.subscribe(filterSettings => {
        this.gridApi.setFilterModel(filterSettings);
    }).unsubscribe();
    this.store.sortSettings$.subscribe(sortSettings => {
      this.gridColumnApi.applyColumnState(sortSettings);
    }).unsubscribe();
  }
}

