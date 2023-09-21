

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebSettingFeatureStore } from '@case-clinical/web/setting/shared'
import { WebSettingSelectTableViewComponent } from '@case-clinical/web/setting/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebUserFeatureStore } from '@case-clinical/web/user/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Setting.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.settings"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="setting"
          title="Setting"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebSettingFeatureStore,
    WebUserFeatureStore
],

})
export class WebSettingListComponent implements OnInit {
  @ViewChild(WebSettingSelectTableViewComponent) tableView: WebSettingSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'user.name', headerName: 'User', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'value', filter: 'agTextColumnFilter'  },
{ field: 'dateFormat', filter: 'agTextColumnFilter'  },
{ field: 'timeFormat', filter: 'agTextColumnFilter'  },
{ field: 'startWeekOn', filter: 'agTextColumnFilter'  },
{ field: 'userId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebSettingFeatureStore,
    private readonly userFeatureStore: WebUserFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadSettingsEffect()
    this.store.filterUsers('').subscribe()
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
    this.store.loadSettingsEffect()
  }
}
