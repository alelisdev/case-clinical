

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebBalanceRequestFeatureStore } from '@case-clinical/web/balance-request/shared'
import { WebBalanceRequestSelectTableViewComponent } from '@case-clinical/web/balance-request/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'

@Component({
  template: `
    <ng-container *featureFlag="'BalanceRequest.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.balanceRequests"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="balanceRequest"
          title="BalanceRequest"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebBalanceRequestFeatureStore,
    WebDocumentFeatureStore,
    WebLegalCaseFeatureStore
],

})
export class WebBalanceRequestListComponent implements OnInit {
  @ViewChild(WebBalanceRequestSelectTableViewComponent) tableView: WebBalanceRequestSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'statement.name', headerName: 'Statement', filter: 'agTextColumnFilter' },
{ field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'requestedOn', filter: 'agDateColumnFilter'  },
{ field: 'repliedOn', filter: 'agDateColumnFilter'  },
{ field: 'status', filter: 'agTextColumnFilter'  },
{ field: 'statementId', filter: 'agTextColumnFilter', hide:true },
{ field: 'type', filter: 'agTextColumnFilter'  },

{
      headerName: 'Balance Amount',
      field: 'balanceAmount',
      valueFormatter: params => currencyFormatter(params.data?.balanceAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebBalanceRequestFeatureStore,
    private readonly legalCaseFeatureStore: WebLegalCaseFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadBalanceRequestsEffect()
    this.store.filterDocuments('').subscribe()
    this.store.filterLegalCases('').subscribe()
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
    this.store.loadBalanceRequestsEffect()
  }
}
