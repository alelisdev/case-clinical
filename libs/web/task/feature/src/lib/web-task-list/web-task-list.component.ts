

import { Component,ElementRef, OnInit, ViewChild } from '@angular/core'
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef } from 'ag-grid-community'
import 'ag-grid-enterprise'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { WebTaskListStore } from './web-task-list.store'
import { Router,ActivatedRoute } from '@angular/router'
import { pluck } from 'rxjs/operators'

@Component({
  templateUrl: './web-task-list.component.html',
  providers: [WebTaskListStore],
})
export class WebTaskListComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridAngular

  readonly vm$ = this.store.vm$
  activeView = 'table'

  public modules: any[] = [ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule]

  private gridApi
  private gridColumnApi
  private sideBar
  public defaultColDef
  private rowSelection
  columnDefs: ColDef[] = [{ field: 'id', filter: 'agSetColumnFilter' },
{ field: 'createdAt', filter: 'agDateColumnFilter' },
{ field: 'updatedAt', filter: 'agDateColumnFilter' },
{ field: 'name', filter: 'agSetColumnFilter' },
{ field: 'title', filter: 'agSetColumnFilter' },
{ field: 'dueDate', filter: 'agDateColumnFilter' },
{ field: 'assignedDate', filter: 'agDateColumnFilter' },
{ field: 'completedOn', filter: 'agDateColumnFilter' },
{ field: 'completed', filter: 'agSetColumnFilter' },
{ field: 'completionNotes', filter: 'agSetColumnFilter' },
{ field: 'assignedToId', filter: 'agSetColumnFilter' },
{ field: 'appointmentId', filter: 'agSetColumnFilter' },
{ field: 'taskCategoryId', filter: 'agSetColumnFilter' },
{ field: 'taskSubCategoryId', filter: 'agSetColumnFilter' },
{ field: 'taskStatus', filter: 'agSetColumnFilter' },
{ field: 'taskPriorityName', filter: 'agSetColumnFilter' },
{ field: 'assignedUser', filter: 'agSetColumnFilter' },
{ field: 'subject', filter: 'agSetColumnFilter' },
{ field: 'summary', filter: 'agSetColumnFilter' },
{ field: 'dueBy', filter: 'agDateColumnFilter' },
{ field: 'scheduledFor', filter: 'agDateColumnFilter' },
{ field: 'dateClosed', filter: 'agDateColumnFilter' },
{ field: 'closedBy', filter: 'agSetColumnFilter' },
{ field: 'isImportant', filter: 'agSetColumnFilter' },
{ field: 'temp', filter: 'agSetColumnFilter' },
{ field: 'createdBy', filter: 'agSetColumnFilter' },
{ field: 'dateCreated', filter: 'agDateColumnFilter' },
{ field: 'removed', filter: 'agSetColumnFilter' },
{ field: 'taskCompletedDate', filter: 'agDateColumnFilter' },
{ field: 'migSource', filter: 'agSetColumnFilter' },
{ field: 'entity', filter: 'agSetColumnFilter' }]
  constructor(private readonly store: WebTaskListStore, private route: ActivatedRoute, private router: Router) {
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
    this.store.loadTasksEffect()
  }

  onSkipChange(pageIndex: number) {
    this.store.setSkip(pageIndex)
    this.store.loadTasksEffect()
  }

  onSearchQueryChange(searchQuery: string) {
    if (searchQuery.length > 0) {
      this.store.setSearchQuery(searchQuery)
    } else {
      this.store.setSearchQuery('')
      this.store.loadTasksEffect()
    }
  }

  onSubmitSearchQuery() {
    this.store.setSkip(0)
    this.store.loadTasksEffect()
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

