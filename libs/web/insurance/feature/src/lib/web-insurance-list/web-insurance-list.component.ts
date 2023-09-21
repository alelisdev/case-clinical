

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebInsuranceFeatureStore } from '@case-clinical/web/insurance/shared'
import { WebInsuranceSelectTableViewComponent } from '@case-clinical/web/insurance/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebInsuranceTypeFeatureStore } from '@case-clinical/web/insurance-type/shared'
import { WebInsuranceSectorFeatureStore } from '@case-clinical/web/insurance-sector/shared'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Insurance.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.insurances"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="insurance"
          title="Insurance"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebInsuranceFeatureStore,
    WebLegalCaseFeatureStore,
    WebInsuranceTypeFeatureStore,
    WebInsuranceSectorFeatureStore,
    WebLeadFeatureStore
],

})
export class WebInsuranceListComponent implements OnInit {
  @ViewChild(WebInsuranceSelectTableViewComponent) tableView: WebInsuranceSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'insuranceType.name', headerName: 'Insurance Type', filter: 'agTextColumnFilter' },
{ field: 'insuranceSector.name', headerName: 'Insurance Sector', filter: 'agTextColumnFilter' },
{ field: 'lead.name', headerName: 'Lead', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true },
{ field: 'insuranceTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'insuranceSectorId', filter: 'agTextColumnFilter', hide:true },
{ field: 'policyNumber', filter: 'agTextColumnFilter'  },
{ field: 'insuranceCompany', filter: 'agTextColumnFilter'  },

{
      headerName: 'Minimum Coverage Amount',
      field: 'minimumCoverageAmount',
      valueFormatter: params => currencyFormatter(params.data?.minimumCoverageAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Maximum Coverage Amount',
      field: 'maximumCoverageAmount',
      valueFormatter: params => currencyFormatter(params.data?.maximumCoverageAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Is Stackable', field: 'isStackable', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer', readonly: true},
{ field: 'adjuster', filter: 'agTextColumnFilter'  },
{ field: 'leadId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebInsuranceFeatureStore,
    private readonly legalCaseFeatureStore: WebLegalCaseFeatureStore,
private readonly insuranceTypeFeatureStore: WebInsuranceTypeFeatureStore,
private readonly insuranceSectorFeatureStore: WebInsuranceSectorFeatureStore,
private readonly leadFeatureStore: WebLeadFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadInsurancesEffect()
    this.store.filterLegalCases('').subscribe()
    this.store.filterInsuranceTypes('').subscribe()
    this.store.filterInsuranceSectors('').subscribe()
    this.store.filterLeads('').subscribe()
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


        case 'insuranceType':
          {
            const insuranceTypeCreateActionResultListener = this.insuranceTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addInsuranceType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                insuranceTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.insuranceTypeFeatureStore.createInsuranceTypeEffect({ name: newName });
            break;
          }


        case 'insuranceSector':
          {
            const insuranceSectorCreateActionResultListener = this.insuranceSectorFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addInsuranceSector(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                insuranceSectorCreateActionResultListener.unsubscribe();
              }
            })
            this.insuranceSectorFeatureStore.createInsuranceSectorEffect({ name: newName });
            break;
          }


        case 'lead':
          {
            const leadCreateActionResultListener = this.leadFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLead(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                leadCreateActionResultListener.unsubscribe();
              }
            })
            this.leadFeatureStore.createLeadEffect({ name: newName });
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
    this.store.loadInsurancesEffect()
  }
}
