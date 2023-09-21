

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared'
import { WebClinicalProviderLocationAvailabilitySelectTableViewComponent } from '@case-clinical/web/clinical-provider-location-availability/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ClinicalProviderLocationAvailability.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.clinicalProviderLocationAvailabilities"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="clinicalProviderLocationAvailability"
          title="ClinicalProviderLocationAvailability"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebClinicalProviderLocationAvailabilityFeatureStore,
    WebClinicalProviderLocationFeatureStore
],

})
export class WebClinicalProviderLocationAvailabilityListComponent implements OnInit {
  @ViewChild(WebClinicalProviderLocationAvailabilitySelectTableViewComponent) tableView: WebClinicalProviderLocationAvailabilitySelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'clinicalProviderLocation.name', headerName: 'Clinical Provider Location', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'day', filter: 'agTextColumnFilter'  },
{ field: 'startTime', filter: 'agTextColumnFilter'  },
{ field: 'endTime', filter: 'agTextColumnFilter'  },
{ field: 'clinicalProviderLocationId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebClinicalProviderLocationAvailabilityFeatureStore,
    private readonly clinicalProviderLocationFeatureStore: WebClinicalProviderLocationFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadClinicalProviderLocationAvailabilitiesEffect()
    this.store.filterClinicalProviderLocations('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'clinicalProviderLocation':
          {
            const clinicalProviderLocationCreateActionResultListener = this.clinicalProviderLocationFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addClinicalProviderLocation(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                clinicalProviderLocationCreateActionResultListener.unsubscribe();
              }
            })
            this.clinicalProviderLocationFeatureStore.createClinicalProviderLocationEffect({ name: newName });
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
    this.store.loadClinicalProviderLocationAvailabilitiesEffect()
  }
}
