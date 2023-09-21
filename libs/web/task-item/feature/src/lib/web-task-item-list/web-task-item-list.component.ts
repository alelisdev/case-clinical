

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebTaskItemFeatureStore } from '@case-clinical/web/task-item/shared'
import { WebTaskItemSelectTableViewComponent } from '@case-clinical/web/task-item/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'

@Component({
  template: `
    <ng-container *featureFlag="'TaskItem.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.taskItems"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="taskItem"
          title="TaskItem"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebTaskItemFeatureStore,
    WebLegalCaseFeatureStore,
    WebUserFeatureStore
],

})
export class WebTaskItemListComponent implements OnInit {
  @ViewChild(WebTaskItemSelectTableViewComponent) tableView: WebTaskItemSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'assignedTo.name', headerName: 'Assigned to', filter: 'agTextColumnFilter' },
{ field: 'type', filter: 'agTextColumnFilter'  },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'notes', filter: 'agTextColumnFilter'  },
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true },

{
      headerName: 'Order',
      field: 'order',
      valueFormatter: params => currencyFormatter(params.data?.order, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Priority',
      field: 'priority',
      valueFormatter: params => currencyFormatter(params.data?.priority, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'assignedToId', filter: 'agTextColumnFilter', hide:true },
{ field: 'title', filter: 'agTextColumnFilter'  },
{ field: 'dueDate', filter: 'agDateColumnFilter'  },
{ field: 'assignedDate', filter: 'agDateColumnFilter'  },
{ field: 'completedOn', filter: 'agDateColumnFilter'  },
{ headerName: 'Completed', field: 'completed', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' }]

  constructor(
    private readonly store: WebTaskItemFeatureStore,
    private readonly legalCaseFeatureStore: WebLegalCaseFeatureStore,
private readonly userFeatureStore: WebUserFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadTaskItemsEffect()
    this.store.filterLegalCases('').subscribe()
    this.store.filterUsers('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'legalCase':
          {
            const legalCaseCreateActionResultListener = this.legalCaseFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLegalCase(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                legalCaseCreateActionResultListener.unsubscribe();
              }
            })
            this.legalCaseFeatureStore.createLegalCaseEffect({ name: newName });
            break;
          }


        case 'user':
          {
            const userCreateActionResultListener = this.userFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addUser(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                userCreateActionResultListener.unsubscribe();
              }
            })
            this.userFeatureStore.createUserEffect({ name: newName });
            break;
          }

        default:
          observer.next(false);
      }
    })
  }


  validateImportData(excelData: any[]) {
    return new Observable((resolver) => {
      this.store.validateImportData(excelData).subscribe((result) => {
        resolver.next(result);
        resolver.complete();
      }).unsubscribe();
    })
  }


  /**
   * This function is called when user select the excel from by clicking Import button on data list and click Save button on consequential dialog
   * Here can send batch update request to the server
   * @param excelData excel rows extracted from the excel file
   */
  excelDataHasBeenPopulated(excelData: any[]) { this.store.importExcelEffect(excelData) }

  searchQueryDidChange(searchQuery) {
    this.store.setSearchQuery(searchQuery)
    this.store.loadTaskItemsEffect()
  }
}
