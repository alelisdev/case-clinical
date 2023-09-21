

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebEligibilityRequestFeatureStore } from '@case-clinical/web/eligibility-request/shared'
import { WebEligibilityRequestSelectTableViewComponent } from '@case-clinical/web/eligibility-request/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebEligibilityStatusFeatureStore } from '@case-clinical/web/eligibility-status/shared'

@Component({
  template: `
    <ng-container *featureFlag="'EligibilityRequest.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.eligibilityRequests"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="eligibilityRequest"
          title="EligibilityRequest"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebEligibilityRequestFeatureStore,
    WebEligibilityStatusFeatureStore
],

})
export class WebEligibilityRequestListComponent implements OnInit {
  @ViewChild(WebEligibilityRequestSelectTableViewComponent) tableView: WebEligibilityRequestSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'elegibilityStatus.name', headerName: 'Elegibility Status', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'providerId', filter: 'agTextColumnFilter'  },
{ field: 'specialtyId', filter: 'agTextColumnFilter'  },
{ field: 'locationId', filter: 'agTextColumnFilter'  },
{ field: 'visitTypeId', filter: 'agTextColumnFilter'  },
{ field: 'taxID', filter: 'agTextColumnFilter'  },
{ field: 'dateOfBirth', filter: 'agDateColumnFilter'  },
{ field: 'memberRegistrationNumber', filter: 'agTextColumnFilter'  },
{ field: 'eligibilityStatusId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebEligibilityRequestFeatureStore,
    private readonly eligibilityStatusFeatureStore: WebEligibilityStatusFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadEligibilityRequestsEffect()
    this.store.filterEligibilityStatuses('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'eligibilityStatus':
          {
            const eligibilityStatusCreateActionResultListener = this.eligibilityStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addEligibilityStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                eligibilityStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.eligibilityStatusFeatureStore.createEligibilityStatusEffect({ name: newName });
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
    this.store.loadEligibilityRequestsEffect()
  }
}
