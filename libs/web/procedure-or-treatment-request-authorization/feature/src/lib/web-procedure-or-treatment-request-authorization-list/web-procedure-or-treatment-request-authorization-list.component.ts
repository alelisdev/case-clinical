

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebProcedureOrTreatmentRequestAuthorizationFeatureStore } from '@case-clinical/web/procedure-or-treatment-request-authorization/shared'
import { WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent } from '@case-clinical/web/procedure-or-treatment-request-authorization/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared'
import { WebProcedureOrTreatmentRequestFeatureStore } from '@case-clinical/web/procedure-or-treatment-request/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ProcedureOrTreatmentRequestAuthorization.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.procedureOrTreatmentRequestAuthorizations"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="procedureOrTreatmentRequestAuthorization"
          title="ProcedureOrTreatmentRequestAuthorization"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebProcedureOrTreatmentRequestAuthorizationFeatureStore,
    WebAuthorizationFeatureStore,
    WebProcedureOrTreatmentRequestFeatureStore
],

})
export class WebProcedureOrTreatmentRequestAuthorizationListComponent implements OnInit {
  @ViewChild(WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent) tableView: WebProcedureOrTreatmentRequestAuthorizationSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'authorization.name', headerName: 'Authorization', filter: 'agTextColumnFilter' },
{ field: 'procedureOrTreatmentRequest.name', headerName: 'Procedure or Treatment Request', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'authorizationId', filter: 'agTextColumnFilter', hide:true },
{ field: 'procedureOrTreatmentRequestId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebProcedureOrTreatmentRequestAuthorizationFeatureStore,
    private readonly authorizationFeatureStore: WebAuthorizationFeatureStore,
private readonly procedureOrTreatmentRequestFeatureStore: WebProcedureOrTreatmentRequestFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadProcedureOrTreatmentRequestAuthorizationsEffect()
    this.store.filterAuthorizations('').subscribe()
    this.store.filterProcedureOrTreatmentRequests('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
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


        case 'procedureOrTreatmentRequest':
          {
            const procedureOrTreatmentRequestCreateActionResultListener = this.procedureOrTreatmentRequestFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addProcedureOrTreatmentRequest(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                procedureOrTreatmentRequestCreateActionResultListener.unsubscribe();
              }
            })
            this.procedureOrTreatmentRequestFeatureStore.createProcedureOrTreatmentRequestEffect({ name: newName });
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
    this.store.loadProcedureOrTreatmentRequestAuthorizationsEffect()
  }
}
