

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared'
import { WebAuthorizationSelectTableViewComponent } from '@case-clinical/web/authorization/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { WebAuthorizationCategoryFeatureStore } from '@case-clinical/web/authorization-category/shared'
import { WebAuthorizationTypeFeatureStore } from '@case-clinical/web/authorization-type/shared'
import { WebProcedureFeatureStore } from '@case-clinical/web/procedure/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Authorization.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.authorizations"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="authorization"
          title="Authorization"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebAuthorizationFeatureStore,
    WebVendorFeatureStore,
    WebAuthorizationCategoryFeatureStore,
    WebAuthorizationTypeFeatureStore,
    WebProcedureFeatureStore
],

})
export class WebAuthorizationListComponent implements OnInit {
  @ViewChild(WebAuthorizationSelectTableViewComponent) tableView: WebAuthorizationSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
{ field: 'authorizationCategory.name', headerName: 'Authorization Category', filter: 'agTextColumnFilter' },
{ field: 'authorizationType.name', headerName: 'Authorization Type', filter: 'agTextColumnFilter' },
{ field: 'procedure.name', headerName: 'Procedure', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'vendorId', filter: 'agTextColumnFilter', hide:true },
{ field: 'authorizationCategoryId', filter: 'agTextColumnFilter', hide:true },
{ field: 'authorizationTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'requestDescription', filter: 'agTextColumnFilter'  },
{
      headerName: 'Duration or Quantity',
      field: 'durationOrQuantity',
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'unit', filter: 'agTextColumnFilter'  },
{ field: 'cptCode', filter: 'agTextColumnFilter'  },
{ field: 'procedureId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebAuthorizationFeatureStore,
    private readonly vendorFeatureStore: WebVendorFeatureStore,
private readonly authorizationCategoryFeatureStore: WebAuthorizationCategoryFeatureStore,
private readonly authorizationTypeFeatureStore: WebAuthorizationTypeFeatureStore,
private readonly procedureFeatureStore: WebProcedureFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadAuthorizationsEffect()
    this.store.filterVendors('').subscribe()
    this.store.filterAuthorizationCategories('').subscribe()
    this.store.filterAuthorizationTypes('').subscribe()
    this.store.filterProcedures('').subscribe()
 }

  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {

        case 'vendor':
          {
            const vendorCreateActionResultListener = this.vendorFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addVendor(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                vendorCreateActionResultListener.unsubscribe();
              }
            })
            this.vendorFeatureStore.createVendorEffect({ name: newName });
            break;
          }


        case 'authorizationCategory':
          {
            const authorizationCategoryCreateActionResultListener = this.authorizationCategoryFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAuthorizationCategory(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                authorizationCategoryCreateActionResultListener.unsubscribe();
              }
            })
            this.authorizationCategoryFeatureStore.createAuthorizationCategoryEffect({ name: newName });
            break;
          }


        case 'authorizationType':
          {
            const authorizationTypeCreateActionResultListener = this.authorizationTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAuthorizationType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                authorizationTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.authorizationTypeFeatureStore.createAuthorizationTypeEffect({ name: newName });
            break;
          }


        case 'procedure':
          {
            const procedureCreateActionResultListener = this.procedureFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addProcedure(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                procedureCreateActionResultListener.unsubscribe();
              }
            })
            this.procedureFeatureStore.createProcedureEffect({ name: newName });
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
    this.store.loadAuthorizationsEffect()
  }
}
