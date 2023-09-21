

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebWriteOffFeatureStore } from '@case-clinical/web/write-off/shared'
import { WebWriteOffSelectTableViewComponent } from '@case-clinical/web/write-off/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'
import { WebWriteOffStatusFeatureStore } from '@case-clinical/web/write-off-status/shared'

@Component({
  template: `
    <ng-container *featureFlag="'WriteOff.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.writeOffs"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="writeOff"
          title="WriteOff"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebWriteOffFeatureStore,
    WebCaseAccountFeatureStore,
    WebWriteOffStatusFeatureStore
],

})
export class WebWriteOffListComponent implements OnInit {
  @ViewChild(WebWriteOffSelectTableViewComponent) tableView: WebWriteOffSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'account.name', headerName: 'Account', filter: 'agTextColumnFilter' },
{ field: 'writeOffStatus.name', headerName: 'Write off Status', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'accountId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'writeOffStatusId', filter: 'agTextColumnFilter', hide:true  },

{
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => currencyFormatter(params.data?.amount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'createdBy', filter: 'agTextColumnFilter'  },
{ field: 'dateCreated', filter: 'agDateColumnFilter'  }]

  constructor(
    private readonly store: WebWriteOffFeatureStore,
    private readonly caseAccountFeatureStore: WebCaseAccountFeatureStore,
private readonly writeOffStatusFeatureStore: WebWriteOffStatusFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadWriteOffsEffect()
    this.store.filterCaseAccounts('').subscribe()
    this.store.filterWriteOffStatuses('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'caseAccount':
          {
            const caseAccountCreateActionResultListener = this.caseAccountFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addCaseAccount(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                caseAccountCreateActionResultListener.unsubscribe();
              }
            })
            this.caseAccountFeatureStore.createCaseAccountEffect({ name: newName });
            break;
          }


        case 'writeOffStatus':
          {
            const writeOffStatusCreateActionResultListener = this.writeOffStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addWriteOffStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                writeOffStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.writeOffStatusFeatureStore.createWriteOffStatusEffect({ name: newName });
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
    this.store.loadWriteOffsEffect()
  }
}
