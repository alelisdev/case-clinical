

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { WebContractSelectTableViewComponent } from '@case-clinical/web/contract/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebOrganizationFeatureStore } from '@case-clinical/web/organization/shared'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { WebReconciliationPeriodTypeFeatureStore } from '@case-clinical/web/reconciliation-period-type/shared'
import { WebCalculationBasisTypeFeatureStore } from '@case-clinical/web/calculation-basis-type/shared'
import { WebProcessFeatureStore } from '@case-clinical/web/process/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Contract.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.contracts"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="contract"
          title="Contract"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebContractFeatureStore,
    WebOrganizationFeatureStore,
    WebVendorFeatureStore,
    WebReconciliationPeriodTypeFeatureStore,
    WebCalculationBasisTypeFeatureStore,
    WebProcessFeatureStore
],

})
export class WebContractListComponent implements OnInit {
  @ViewChild(WebContractSelectTableViewComponent) tableView: WebContractSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'organization.name', headerName: 'Organization', filter: 'agTextColumnFilter' },
{ field: 'billingOrganization.name', headerName: 'Billing Organization', filter: 'agTextColumnFilter' },
{ field: 'template.name', headerName: 'Template', filter: 'agTextColumnFilter' },
{ field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
{ field: 'reconciliationPeriodType.name', headerName: 'Reconciliation Period Type', filter: 'agTextColumnFilter' },
{ field: 'calculationBasisType.name', headerName: 'Calculation Basis Type', filter: 'agTextColumnFilter' },
{ field: 'process.name', headerName: 'Process', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'organizationId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'billingOrganizationId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'templateId', filter: 'agTextColumnFilter', hide:true  },
{ headerName: 'Bill on Behalf', field: 'billOnBehalf', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'billRate', filter: 'agTextColumnFilter'  },
{ field: 'vendorId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'contractDate', filter: 'agDateColumnFilter'  },
{ field: 'maturityDate', filter: 'agDateColumnFilter'  },
{ headerName: 'Requires Tpa Medical Necessity', field: 'requiresTpaMedicalNecessity', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Requires Tpa Medicare Allowable', field: 'requiresTpaMedicareAllowable', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'reconciliationPeriodTypeId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'calculationBasisTypeId', filter: 'agTextColumnFilter', hide:true  },
{ headerName: 'Signed', field: 'signed', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'processId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebContractFeatureStore,
    private readonly organizationFeatureStore: WebOrganizationFeatureStore,
private readonly vendorFeatureStore: WebVendorFeatureStore,
private readonly reconciliationPeriodTypeFeatureStore: WebReconciliationPeriodTypeFeatureStore,
private readonly calculationBasisTypeFeatureStore: WebCalculationBasisTypeFeatureStore,
private readonly processFeatureStore: WebProcessFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadContractsEffect()
    this.store.filterOrganizations('').subscribe()
    this.store.filterTemplates('').subscribe()
    this.store.filterVendors('').subscribe()
    this.store.filterReconciliationPeriodTypes('').subscribe()
    this.store.filterCalculationBasisTypes('').subscribe()
    this.store.filterProcesses('').subscribe()
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


        case 'vendor':
          {
            const vendorCreateActionResultListener = this.vendorFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addVendor(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                vendorCreateActionResultListener.unsubscribe();
              }
            })
            this.vendorFeatureStore.createVendorEffect({ name: newName });
            break;
          }


        case 'reconciliationPeriodType':
          {
            const reconciliationPeriodTypeCreateActionResultListener = this.reconciliationPeriodTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addReconciliationPeriodType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                reconciliationPeriodTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.reconciliationPeriodTypeFeatureStore.createReconciliationPeriodTypeEffect({ name: newName });
            break;
          }


        case 'calculationBasisType':
          {
            const calculationBasisTypeCreateActionResultListener = this.calculationBasisTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addCalculationBasisType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                calculationBasisTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.calculationBasisTypeFeatureStore.createCalculationBasisTypeEffect({ name: newName });
            break;
          }


        case 'process':
          {
            const processCreateActionResultListener = this.processFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addProcess(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                processCreateActionResultListener.unsubscribe();
              }
            })
            this.processFeatureStore.createProcessEffect({ name: newName });
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
    this.store.loadContractsEffect()
  }
}
