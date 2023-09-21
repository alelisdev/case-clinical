

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebContractedRateFeatureStore } from '@case-clinical/web/contracted-rate/shared'
import { WebContractedRateSelectTableViewComponent } from '@case-clinical/web/contracted-rate/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { WebContractedRateKindFeatureStore } from '@case-clinical/web/contracted-rate-kind/shared'
import { WebContractKindFeatureStore } from '@case-clinical/web/contract-kind/shared'
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ContractedRate.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.contractedRates"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="contractedRate"
          title="ContractedRate"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebContractedRateFeatureStore,
    WebContractFeatureStore,
    WebContractedRateKindFeatureStore,
    WebContractKindFeatureStore,
    WebVisitKindFeatureStore,
    WebClinicalProviderFeatureStore,
    WebSpecialtyFeatureStore
],

})
export class WebContractedRateListComponent implements OnInit {
  @ViewChild(WebContractedRateSelectTableViewComponent) tableView: WebContractedRateSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'contract.name', headerName: 'Contract', filter: 'agTextColumnFilter' },
{ field: 'contractedRateKind.name', headerName: 'Contracted Rate Kind', filter: 'agTextColumnFilter' },
{ field: 'contractKind.name', headerName: 'Contract Kind', filter: 'agTextColumnFilter' },
{ field: 'visitKind.name', headerName: 'Visit Kind', filter: 'agTextColumnFilter' },
{ field: 'clinicalProvider.name', headerName: 'Clinical Provider', filter: 'agTextColumnFilter' },
{ field: 'specialty.name', headerName: 'Specialty', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },

{
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => currencyFormatter(params.data?.amount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Percentage',
      field: 'percentage',
      valueFormatter: params => currencyFormatter(params.data?.percentage, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Reimbursed Rate',
      field: 'reimbursedRate',
      valueFormatter: params => currencyFormatter(params.data?.reimbursedRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Bill on Behalf', field: 'billOnBehalf', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'contractId', filter: 'agTextColumnFilter', hide:true },
{ field: 'contractedRateKindId', filter: 'agTextColumnFilter', hide:true },
{ field: 'contractKindId', filter: 'agTextColumnFilter', hide:true },
{ field: 'visitKindId', filter: 'agTextColumnFilter', hide:true },
{ field: 'clinicalProviderId', filter: 'agTextColumnFilter', hide:true },
{ field: 'specialtyId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebContractedRateFeatureStore,
    private readonly contractFeatureStore: WebContractFeatureStore,
private readonly contractedRateKindFeatureStore: WebContractedRateKindFeatureStore,
private readonly contractKindFeatureStore: WebContractKindFeatureStore,
private readonly visitKindFeatureStore: WebVisitKindFeatureStore,
private readonly clinicalProviderFeatureStore: WebClinicalProviderFeatureStore,
private readonly specialtyFeatureStore: WebSpecialtyFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadContractedRatesEffect()
    this.store.filterContracts('').subscribe()
    this.store.filterContractedRateKinds('').subscribe()
    this.store.filterContractKinds('').subscribe()
    this.store.filterVisitKinds('').subscribe()
    this.store.filterClinicalProviders('').subscribe()
    this.store.filterSpecialties('').subscribe()
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


        case 'contractedRateKind':
          {
            const contractedRateKindCreateActionResultListener = this.contractedRateKindFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addContractedRateKind(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                contractedRateKindCreateActionResultListener.unsubscribe();
              }
            })
            this.contractedRateKindFeatureStore.createContractedRateKindEffect({ name: newName });
            break;
          }


        case 'contractKind':
          {
            const contractKindCreateActionResultListener = this.contractKindFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addContractKind(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                contractKindCreateActionResultListener.unsubscribe();
              }
            })
            this.contractKindFeatureStore.createContractKindEffect({ name: newName });
            break;
          }


        case 'visitKind':
          {
            const visitKindCreateActionResultListener = this.visitKindFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addVisitKind(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                visitKindCreateActionResultListener.unsubscribe();
              }
            })
            this.visitKindFeatureStore.createVisitKindEffect({ name: newName });
            break;
          }


        case 'clinicalProvider':
          {
            const clinicalProviderCreateActionResultListener = this.clinicalProviderFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addClinicalProvider(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                clinicalProviderCreateActionResultListener.unsubscribe();
              }
            })
            this.clinicalProviderFeatureStore.createClinicalProviderEffect({ name: newName });
            break;
          }


        case 'specialty':
          {
            const specialtyCreateActionResultListener = this.specialtyFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addSpecialty(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                specialtyCreateActionResultListener.unsubscribe();
              }
            })
            this.specialtyFeatureStore.createSpecialtyEffect({ name: newName });
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
    this.store.loadContractedRatesEffect()
  }
}
