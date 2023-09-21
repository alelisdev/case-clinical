

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebRoleFeaturePermissionFeatureStore } from '@case-clinical/web/role-feature-permission/shared'
import { WebRoleFeaturePermissionSelectTableViewComponent } from '@case-clinical/web/role-feature-permission/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebRoleFeatureStore } from '@case-clinical/web/role/shared'

@Component({
  template: `
    <ng-container *featureFlag="'RoleFeaturePermission.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.roleFeaturePermissions"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="roleFeaturePermission"
          title="RoleFeaturePermission"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebRoleFeaturePermissionFeatureStore,
    WebRoleFeatureStore
],

})
export class WebRoleFeaturePermissionListComponent implements OnInit {
  @ViewChild(WebRoleFeaturePermissionSelectTableViewComponent) tableView: WebRoleFeaturePermissionSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'featurePermission.name', headerName: 'Feature Permission', filter: 'agTextColumnFilter' },
{ field: 'role.name', headerName: 'Role', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'featurePermissionId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'roleId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebRoleFeaturePermissionFeatureStore,
private readonly roleFeatureStore: WebRoleFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadRoleFeaturePermissionsEffect()
 }

  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        case 'role':
          {
            const roleCreateActionResultListener = this.roleFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                observer.next(true);
                observer.complete();
                roleCreateActionResultListener.unsubscribe();
              }
            })
            this.roleFeatureStore.createRoleEffect({ name: newName });
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
    this.store.loadRoleFeaturePermissionsEffect()
  }
}
