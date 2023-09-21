

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebInvoiceDetailFeatureStore } from '@case-clinical/web/invoice-detail/shared'
import { WebInvoiceDetailSelectTableViewComponent } from '@case-clinical/web/invoice-detail/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebInvoiceFeatureStore } from '@case-clinical/web/invoice/shared'

@Component({
  template: `
    <ng-container *featureFlag="'InvoiceDetail.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.invoiceDetails"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="invoiceDetail"
          title="InvoiceDetail"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebInvoiceDetailFeatureStore,
    WebInvoiceFeatureStore
],

})
export class WebInvoiceDetailListComponent implements OnInit {
  @ViewChild(WebInvoiceDetailSelectTableViewComponent) tableView: WebInvoiceDetailSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'invoice.name', headerName: 'Invoice', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'invoiceId', filter: 'agTextColumnFilter', hide:true },
{ field: 'dateOfService', filter: 'agDateColumnFilter'  },
{ field: 'providerName', filter: 'agTextColumnFilter'  },
{ field: 'procedureDescription', filter: 'agTextColumnFilter'  },

{
      headerName: 'Quantity',
      field: 'quantity',
      valueFormatter: params => currencyFormatter(params.data?.quantity, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Charges',
      field: 'charges',
      valueFormatter: params => currencyFormatter(params.data?.charges, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Line Total',
      field: 'lineTotal',
      valueFormatter: params => currencyFormatter(params.data?.lineTotal, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
}]

  constructor(
    private readonly store: WebInvoiceDetailFeatureStore,
    private readonly invoiceFeatureStore: WebInvoiceFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadInvoiceDetailsEffect()
    this.store.filterInvoices('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'invoice':
          {
            const invoiceCreateActionResultListener = this.invoiceFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addInvoice(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                invoiceCreateActionResultListener.unsubscribe();
              }
            })
            this.invoiceFeatureStore.createInvoiceEffect({ name: newName });
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
    this.store.loadInvoiceDetailsEffect()
  }
}
