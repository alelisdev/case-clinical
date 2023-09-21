

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebCaseAccountPaymentFeatureStore } from '@case-clinical/web/case-account-payment/shared'
import { WebCaseAccountPaymentSelectTableViewComponent } from '@case-clinical/web/case-account-payment/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebPaymentFeatureStore } from '@case-clinical/web/payment/shared'
import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'

@Component({
  template: `
    <ng-container *featureFlag="'CaseAccountPayment.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.caseAccountPayments"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="caseAccountPayment"
          title="CaseAccountPayment"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebCaseAccountPaymentFeatureStore,
    WebPaymentFeatureStore,
    WebCaseAccountFeatureStore
],

})
export class WebCaseAccountPaymentListComponent implements OnInit {
  @ViewChild(WebCaseAccountPaymentSelectTableViewComponent) tableView: WebCaseAccountPaymentSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'payment.name', headerName: 'Payment', filter: 'agTextColumnFilter' },
{ field: 'caseAccount.name', headerName: 'Case Account', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },

{
      headerName: 'Amount Applied',
      field: 'amountApplied',
      valueFormatter: params => currencyFormatter(params.data?.amountApplied, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'paymentId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'caseAccountId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebCaseAccountPaymentFeatureStore,
    private readonly paymentFeatureStore: WebPaymentFeatureStore,
private readonly caseAccountFeatureStore: WebCaseAccountFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadCaseAccountPaymentsEffect()
    this.store.filterPayments('').subscribe()
    this.store.filterCaseAccounts('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'payment':
          {
            const paymentCreateActionResultListener = this.paymentFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPayment(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                paymentCreateActionResultListener.unsubscribe();
              }
            })
            this.paymentFeatureStore.createPaymentEffect({ name: newName });
            break;
          }


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
    this.store.loadCaseAccountPaymentsEffect()
  }
}
