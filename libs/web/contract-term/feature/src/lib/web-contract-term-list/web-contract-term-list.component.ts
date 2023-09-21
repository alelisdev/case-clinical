

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebContractTermFeatureStore } from '@case-clinical/web/contract-term/shared'
import { WebContractTermSelectTableViewComponent } from '@case-clinical/web/contract-term/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ContractTerm.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.contractTerms"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="contractTerm"
          title="ContractTerm"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebContractTermFeatureStore,
    WebContractFeatureStore
],

})
export class WebContractTermListComponent implements OnInit {
  @ViewChild(WebContractTermSelectTableViewComponent) tableView: WebContractTermSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'contract.name', headerName: 'Contract', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },

{
      headerName: 'Max Approved',
      field: 'maxApproved',
      valueFormatter: params => currencyFormatter(params.data?.maxApproved, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Number Included',
      field: 'numberIncluded',
      valueFormatter: params => currencyFormatter(params.data?.numberIncluded, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Factor',
      field: 'factor',
      valueFormatter: params => currencyFormatter(params.data?.factor, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'contractTermId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebContractTermFeatureStore,
    private readonly contractFeatureStore: WebContractFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadContractTermsEffect()
    this.store.filterContracts('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'contract':
          {
            const contractCreateActionResultListener = this.contractFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addContract(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                contractCreateActionResultListener.unsubscribe();
              }
            })
            this.contractFeatureStore.createContractEffect({ name: newName });
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
    this.store.loadContractTermsEffect()
  }
}
