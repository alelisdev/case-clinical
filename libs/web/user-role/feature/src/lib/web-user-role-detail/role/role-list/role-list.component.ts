

import { Component,ElementRef, OnInit, ViewChild } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-enterprise'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { RoleListStore } from './role-list.store'
import { Router,ActivatedRoute } from '@angular/router'
import { pluck } from 'rxjs/operators'

@Component({
  templateUrl: './role-list.component.html',
  providers: [RoleListStore],
})
export class RoleListComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular

  readonly vm$ = this.store.vm$
  activeView = 'table'

  public modules: any[] = [ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule]

  private gridApi
  private gridColumnApi
  private sideBar
  public defaultColDef
  columnDefs: ColDef[] = [{ field: 'id', filter: 'agSetColumnFilter' },{ field: 'createdAt', filter: 'agDateColumnFilter' },{ field: 'updatedAt', filter: 'agDateColumnFilter' },{ field: 'name', filter: 'agSetColumnFilter' },{ field: 'roleId', filter: 'agSetColumnFilter' },{ field: 'userId', filter: 'agSetColumnFilter' }]

  userRoleId = ''
  constructor(private readonly store: RoleListStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute) {

    this.defaultColDef = {
          flex: 1,
          minWidth: 200,
          resizable: true,
          floatingFilter: true,
          sortable: true,
        }
    this.sideBar = 'filters'
    this.rowSelection = 'single';

}

  ngOnInit(): void {
    this.route.params.pipe(pluck('userRoleId')).subscribe((t) => {
      this.userRoleId = t
      this.store.loadRolesEffect(this.userRoleId)
    }
      );
  }

  onSkipChange(pageIndex: number) {
    this.store.setSkip(pageIndex)
    this.store.loadRolesEffect(this.userRoleId)
  }

  onSearchQueryChange(searchQuery: string) {
    if (searchQuery.length > 0) {
      this.store.setSearchQuery(searchQuery)
    } else {
      this.store.setSearchQuery('')
      this.store.loadRolesEffect(this.userRoleId)
    }
  }

  onSubmitSearchQuery() {
    this.store.setSkip(0)
    this.store.loadRolesEffect(this.userRoleId)
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

