

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebUserCourseProgressFeatureStore } from '@case-clinical/web/user-course-progress/shared'
import { WebUserCourseProgressSelectTableViewComponent } from '@case-clinical/web/user-course-progress/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebUserFeatureStore } from '@case-clinical/web/user/shared'
import { WebCourseFeatureStore } from '@case-clinical/web/course/shared'

@Component({
  template: `
    <ng-container *featureFlag="'UserCourseProgress.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.userCourseProgresses"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="userCourseProgress"
          title="UserCourseProgress"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebUserCourseProgressFeatureStore,
    WebUserFeatureStore,
    WebCourseFeatureStore
],

})
export class WebUserCourseProgressListComponent implements OnInit {
  @ViewChild(WebUserCourseProgressSelectTableViewComponent) tableView: WebUserCourseProgressSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'user.name', headerName: 'User', filter: 'agTextColumnFilter' },
{ field: 'course.name', headerName: 'Course', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'userId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'courseId', filter: 'agTextColumnFilter', hide:true  },

{
      headerName: 'Current Step',
      field: 'currentStep',
      valueFormatter: params => currencyFormatter(params.data?.currentStep, '', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Completed',
      field: 'completed',
      valueFormatter: params => currencyFormatter(params.data?.completed, '', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
}]

  constructor(
    private readonly store: WebUserCourseProgressFeatureStore,
    private readonly userFeatureStore: WebUserFeatureStore,
private readonly courseFeatureStore: WebCourseFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadUserCourseProgressesEffect()
    this.store.filterUsers({term: undefined})
    this.store.filterCourses({term: undefined})
 }

  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {

        case 'user':
          {
            const userCreateActionResultListener = this.userFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addUser(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }
                userCreateActionResultListener.unsubscribe();
              }
            }, 300)
            this.userFeatureStore.createUserEffect({ name: newName });
            break;
          }


        case 'course':
          {
            const courseCreateActionResultListener = this.courseFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addCourse(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }
                courseCreateActionResultListener.unsubscribe();
              }
            }, 300)
            this.courseFeatureStore.createCourseEffect({ name: newName });
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
    this.store.loadUserCourseProgressesEffect()
  }
}
