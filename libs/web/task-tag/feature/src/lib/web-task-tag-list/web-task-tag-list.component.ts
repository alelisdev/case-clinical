

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebTaskTagFeatureStore } from '@case-clinical/web/task-tag/shared'
import { WebTaskTagSelectTableViewComponent } from '@case-clinical/web/task-tag/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebTaskItemFeatureStore } from '@case-clinical/web/task-item/shared'
import { WebTagFeatureStore } from '@case-clinical/web/tag/shared'

@Component({
  template: `
    <ng-container *featureFlag="'TaskTag.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.taskTags"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="taskTag"
          title="TaskTag"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebTaskTagFeatureStore,
    WebTaskItemFeatureStore,
    WebTagFeatureStore
],

})
export class WebTaskTagListComponent implements OnInit {
  @ViewChild(WebTaskTagSelectTableViewComponent) tableView: WebTaskTagSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'task.name', headerName: 'Task', filter: 'agTextColumnFilter' },
{ field: 'tag.name', headerName: 'Tag', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'taskId', filter: 'agTextColumnFilter', hide:true },
{ field: 'tagId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebTaskTagFeatureStore,
    private readonly taskItemFeatureStore: WebTaskItemFeatureStore,
private readonly tagFeatureStore: WebTagFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadTaskTagsEffect()
    this.store.filterTaskItems('').subscribe()
    this.store.filterTags('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'taskItem':
          {
            const taskItemCreateActionResultListener = this.taskItemFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addTaskItem(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                taskItemCreateActionResultListener.unsubscribe();
              }
            })
            this.taskItemFeatureStore.createTaskItemEffect({ name: newName });
            break;
          }


        case 'tag':
          {
            const tagCreateActionResultListener = this.tagFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addTag(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                tagCreateActionResultListener.unsubscribe();
              }
            })
            this.tagFeatureStore.createTagEffect({ name: newName });
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
    this.store.loadTaskTagsEffect()
  }
}
