

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebJournalEntryFeatureStore } from '@case-clinical/web/journal-entry/shared'
import { WebJournalEntrySelectTableViewComponent } from '@case-clinical/web/journal-entry/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'

@Component({
  template: `
    <ng-container *featureFlag="'JournalEntry.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.journalEntries"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="journalEntry"
          title="JournalEntry"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebJournalEntryFeatureStore,
    WebCaseAccountFeatureStore
],

})
export class WebJournalEntryListComponent implements OnInit {
  @ViewChild(WebJournalEntrySelectTableViewComponent) tableView: WebJournalEntrySelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'caseAccount.name', headerName: 'Case Account', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'locationName', filter: 'agTextColumnFilter'  },
{ field: 'fromTo', filter: 'agTextColumnFilter'  },
{ field: 'frequency', filter: 'agTextColumnFilter'  },
{ field: 'autoOrManual', filter: 'agTextColumnFilter'  },
{ field: 'process', filter: 'agTextColumnFilter'  },
{ field: 'perAccountOrAggregateJE', filter: 'agTextColumnFilter'  },

{
      headerName: 'Cost Rate',
      field: 'costRate',
      valueFormatter: params => currencyFormatter(params.data?.costRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'postingDate', filter: 'agDateColumnFilter'  },
{ field: 'documentDate', filter: 'agDateColumnFilter'  },
{ field: 'dueDate', filter: 'agDateColumnFilter'  },

{
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => currencyFormatter(params.data?.amount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'accountType', filter: 'agTextColumnFilter'  },
{ field: 'accountNumber', filter: 'agTextColumnFilter'  },
{ field: 'costCenter', filter: 'agTextColumnFilter'  },
{ field: 'appliesToDocumentNumber', filter: 'agTextColumnFilter'  },
{ field: 'caseAccountId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebJournalEntryFeatureStore,
    private readonly caseAccountFeatureStore: WebCaseAccountFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadJournalEntriesEffect()
    this.store.filterCaseAccounts('').subscribe()
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
    this.store.loadJournalEntriesEffect()
  }
}
