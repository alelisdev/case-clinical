

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebUserRoleFeatureStore } from '@case-clinical/web/user-role/shared'
import { WebUserRoleSelectTableViewComponent } from '@case-clinical/web/user-role/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebRoleFeatureStore } from '@case-clinical/web/role/shared'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'

@Component({
  template: `
    <ng-container *featureFlag="'UserRole.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.userRoles"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="userRole"
          title="UserRole"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebUserRoleFeatureStore,
    WebRoleFeatureStore,
    WebUserFeatureStore
],

})
export class WebUserRoleListComponent implements OnInit {
  @ViewChild(WebUserRoleSelectTableViewComponent) tableView: WebUserRoleSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'role.name', headerName: 'Role', filter: 'agTextColumnFilter' },
{ field: 'user.name', headerName: 'User', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'roleId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'userId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebUserRoleFeatureStore,
    private readonly roleFeatureStore: WebRoleFeatureStore,
private readonly userFeatureStore: WebUserFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadUserRolesEffect()
    this.store.filterRoles('').subscribe()
    this.store.filterUsers('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'role':
          {
            const roleCreateActionResultListener = this.roleFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addRole(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                roleCreateActionResultListener.unsubscribe();
              }
            })
            this.roleFeatureStore.createRoleEffect({ name: newName });
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
    this.store.loadUserRolesEffect()
  }
}
