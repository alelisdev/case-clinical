

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPaymentFeatureStore } from '@case-clinical/web/payment/shared'
import { WebPaymentSelectTableViewComponent } from '@case-clinical/web/payment/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebBatchControlFeatureStore } from '@case-clinical/web/batch-control/shared'
import { WebBankFeatureStore } from '@case-clinical/web/bank/shared'
import { WebPayorTypeFeatureStore } from '@case-clinical/web/payor-type/shared'
import { WebPaymentTypeFeatureStore } from '@case-clinical/web/payment-type/shared'
import { WebPaymentApplicationMethodFeatureStore } from '@case-clinical/web/payment-application-method/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Payment.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.payments"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="payment"
          title="Payment"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebPaymentFeatureStore,
    WebBatchControlFeatureStore,
    WebBankFeatureStore,
    WebPayorTypeFeatureStore,
    WebPaymentTypeFeatureStore,
    WebPaymentApplicationMethodFeatureStore
],

})
export class WebPaymentListComponent implements OnInit {
  @ViewChild(WebPaymentSelectTableViewComponent) tableView: WebPaymentSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'batchControl.name', headerName: 'Batch Control', filter: 'agTextColumnFilter' },
{ field: 'bank.name', headerName: 'Bank', filter: 'agTextColumnFilter' },
{ field: 'payorType.name', headerName: 'Payor Type', filter: 'agTextColumnFilter' },
{ field: 'paymentType.name', headerName: 'Payment Type', filter: 'agTextColumnFilter' },
{ field: 'paymentApplicationMethod.name', headerName: 'Payment Application Method', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'paidOn', filter: 'agDateColumnFilter'  },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'batchControlId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'bankId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'payorTypeId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'paymentTypeId', filter: 'agTextColumnFilter', hide:true  },

{
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => currencyFormatter(params.data?.amount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Collected',
      field: 'collected',
      valueFormatter: params => currencyFormatter(params.data?.collected, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Dac',
      field: 'dac',
      valueFormatter: params => currencyFormatter(params.data?.dac, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Is Partial', field: 'isPartial', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'dateReceived', filter: 'agDateColumnFilter'  },
{ field: 'memo', filter: 'agTextColumnFilter'  },
{ field: 'createdBy', filter: 'agTextColumnFilter'  },
{ field: 'dateCreated', filter: 'agDateColumnFilter'  },
{ field: 'securitizationGroup', filter: 'agTextColumnFilter'  },
{ field: 'paymentApplicationMethodId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebPaymentFeatureStore,
    private readonly batchControlFeatureStore: WebBatchControlFeatureStore,
private readonly bankFeatureStore: WebBankFeatureStore,
private readonly payorTypeFeatureStore: WebPayorTypeFeatureStore,
private readonly paymentTypeFeatureStore: WebPaymentTypeFeatureStore,
private readonly paymentApplicationMethodFeatureStore: WebPaymentApplicationMethodFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPaymentsEffect()
    this.store.filterBatchControls('').subscribe()
    this.store.filterBanks('').subscribe()
    this.store.filterPayorTypes('').subscribe()
    this.store.filterPaymentTypes('').subscribe()
    this.store.filterPaymentApplicationMethods('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'batchControl':
          {
            const batchControlCreateActionResultListener = this.batchControlFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addBatchControl(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                batchControlCreateActionResultListener.unsubscribe();
              }
            })
            this.batchControlFeatureStore.createBatchControlEffect({ name: newName });
            break;
          }


        case 'bank':
          {
            const bankCreateActionResultListener = this.bankFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addBank(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                bankCreateActionResultListener.unsubscribe();
              }
            })
            this.bankFeatureStore.createBankEffect({ name: newName });
            break;
          }


        case 'payorType':
          {
            const payorTypeCreateActionResultListener = this.payorTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPayorType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                payorTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.payorTypeFeatureStore.createPayorTypeEffect({ name: newName });
            break;
          }


        case 'paymentType':
          {
            const paymentTypeCreateActionResultListener = this.paymentTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPaymentType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                paymentTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.paymentTypeFeatureStore.createPaymentTypeEffect({ name: newName });
            break;
          }


        case 'paymentApplicationMethod':
          {
            const paymentApplicationMethodCreateActionResultListener = this.paymentApplicationMethodFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPaymentApplicationMethod(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                paymentApplicationMethodCreateActionResultListener.unsubscribe();
              }
            })
            this.paymentApplicationMethodFeatureStore.createPaymentApplicationMethodEffect({ name: newName });
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
    this.store.loadPaymentsEffect()
  }
}
