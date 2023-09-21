

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebInvoiceFeatureStore } from '@case-clinical/web/invoice/shared'
import { WebInvoiceSelectTableViewComponent } from '@case-clinical/web/invoice/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebOrganizationFeatureStore } from '@case-clinical/web/organization/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Invoice.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.invoices"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="invoice"
          title="Invoice"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebInvoiceFeatureStore,
    WebOrganizationFeatureStore,
    WebLegalCaseFeatureStore,
],

})
export class WebInvoiceListComponent implements OnInit {
  @ViewChild(WebInvoiceSelectTableViewComponent) tableView: WebInvoiceSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'billingOrganization.name', headerName: 'Billing Organization', filter: 'agTextColumnFilter' },
{ field: 'clinicalProvider.name', headerName: 'Clinical Provider', filter: 'agTextColumnFilter' },
{ field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'invoice.name', headerName: 'Invoice', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'invoiceNumber', filter: 'agTextColumnFilter'  },

{
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => currencyFormatter(params.data?.amount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Paid',
      field: 'paid',
      valueFormatter: params => currencyFormatter(params.data?.paid, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Due',
      field: 'due',
      valueFormatter: params => currencyFormatter(params.data?.due, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'organizationId', filter: 'agTextColumnFilter', hide:true },
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true },
{ field: 'invoiceId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebInvoiceFeatureStore,
    private readonly organizationFeatureStore: WebOrganizationFeatureStore,
private readonly legalCaseFeatureStore: WebLegalCaseFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadInvoicesEffect()
    this.store.filterOrganizations('').subscribe()
    this.store.filterLegalCases('').subscribe()
    this.store.filterDocuments('').subscribe()
 }

  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {

        case 'organization':
          {
            const organizationCreateActionResultListener = this.organizationFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addOrganization(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                organizationCreateActionResultListener.unsubscribe();
              }
            })
            this.organizationFeatureStore.createOrganizationEffect({ name: newName });
            break;
          }


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
    this.store.loadInvoicesEffect()
  }
}
