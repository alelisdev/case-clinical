

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebAuthorizationDiagnosisCodeFeatureStore } from '@case-clinical/web/authorization-diagnosis-code/shared'
import { WebAuthorizationDiagnosisCodeSelectTableViewComponent } from '@case-clinical/web/authorization-diagnosis-code/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebDiagnosisCodeFeatureStore } from '@case-clinical/web/diagnosis-code/shared'
import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared'

@Component({
  template: `
    <ng-container *featureFlag="'AuthorizationDiagnosisCode.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.authorizationDiagnosisCodes"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="authorizationDiagnosisCode"
          title="AuthorizationDiagnosisCode"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebAuthorizationDiagnosisCodeFeatureStore,
    WebDiagnosisCodeFeatureStore,
    WebAuthorizationFeatureStore
],

})
export class WebAuthorizationDiagnosisCodeListComponent implements OnInit {
  @ViewChild(WebAuthorizationDiagnosisCodeSelectTableViewComponent) tableView: WebAuthorizationDiagnosisCodeSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'diagnosis.name', headerName: 'Diagnosis', filter: 'agTextColumnFilter' },
{ field: 'authorization.name', headerName: 'Authorization', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCodeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'authorizationId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebAuthorizationDiagnosisCodeFeatureStore,
    private readonly diagnosisCodeFeatureStore: WebDiagnosisCodeFeatureStore,
private readonly authorizationFeatureStore: WebAuthorizationFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadAuthorizationDiagnosisCodesEffect()
    this.store.filterDiagnosisCodes('').subscribe()
    this.store.filterAuthorizations('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'diagnosisCode':
          {
            const diagnosisCodeCreateActionResultListener = this.diagnosisCodeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addDiagnosisCode(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                diagnosisCodeCreateActionResultListener.unsubscribe();
              }
            })
            this.diagnosisCodeFeatureStore.createDiagnosisCodeEffect({ name: newName });
            break;
          }


        case 'authorization':
          {
            const authorizationCreateActionResultListener = this.authorizationFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAuthorization(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                authorizationCreateActionResultListener.unsubscribe();
              }
            })
            this.authorizationFeatureStore.createAuthorizationEffect({ name: newName });
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
    this.store.loadAuthorizationDiagnosisCodesEffect()
  }
}
