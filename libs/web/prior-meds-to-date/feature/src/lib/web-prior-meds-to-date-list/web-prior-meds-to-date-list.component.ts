

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPriorMedsToDateFeatureStore } from '@case-clinical/web/prior-meds-to-date/shared'
import { WebPriorMedsToDateSelectTableViewComponent } from '@case-clinical/web/prior-meds-to-date/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebPriorMedsToDateStatusFeatureStore } from '@case-clinical/web/prior-meds-to-date-status/shared'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared';
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared';

@Component({
  template: `
    <ng-container *featureFlag="'PriorMedsToDate.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.priorMedsToDates"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="priorMedsToDate"
          title="PriorMedsToDate"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebPriorMedsToDateFeatureStore,
    WebLegalCaseFeatureStore,
    WebPriorMedsToDateStatusFeatureStore,
    WebSpecialtyFeatureStore,
    WebVisitKindFeatureStore
],

})
export class WebPriorMedsToDateListComponent implements OnInit {
  @ViewChild(WebPriorMedsToDateSelectTableViewComponent) tableView: WebPriorMedsToDateSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'priorMedsToDateStatus.name', headerName: 'Prior Meds to Date Status', filter: 'agTextColumnFilter' },
{ field: 'specialty.name', headerName: 'Specialty', filter: 'agTextColumnFilter' },
{ field: 'visitKind.name', headerName: 'Visit Kind', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'priorMedsToDateStatusId', filter: 'agTextColumnFilter', hide:true  },

{ field: 'specialtyId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'visitKindId', filter: 'agTextColumnFilter', hide:true  },

{
      headerName: 'Quantity',
      field: 'quantity',
      valueFormatter: params => currencyFormatter(params.data?.quantity, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: params => currencyFormatter(params.data?.amount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
}]

  constructor(
    private readonly store: WebPriorMedsToDateFeatureStore,
    private readonly legalCaseFeatureStore: WebLegalCaseFeatureStore,
private readonly priorMedsToDateStatusFeatureStore: WebPriorMedsToDateStatusFeatureStore,
private readonly specialtyFeatureStore: WebSpecialtyFeatureStore,
private readonly visitKindFeatureStore: WebVisitKindFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPriorMedsToDatesEffect()
    this.store.filterLegalCases('').subscribe()
    this.store.filterPriorMedsToDateStatuses('').subscribe()
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


        case 'priorMedsToDateStatus':
          {
            const priorMedsToDateStatusCreateActionResultListener = this.priorMedsToDateStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPriorMedsToDateStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                priorMedsToDateStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.priorMedsToDateStatusFeatureStore.createPriorMedsToDateStatusEffect({ name: newName });
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
          
          case 'visitKind':
          {
            const visitKindActionResultListener = this.visitKindFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addVisitKind(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                visitKindActionResultListener.unsubscribe();
              }
            })
            this.visitKindFeatureStore.createVisitKindEffect({ name: newName });
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
    this.store.loadPriorMedsToDatesEffect()
  }
}
