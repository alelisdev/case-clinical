

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebLocationSelectTableViewComponent } from '@case-clinical/web/location/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebPlaceOfServiceFeatureStore } from '@case-clinical/web/place-of-service/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Location.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.locations"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="location"
          title="Location"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebLocationFeatureStore,
    WebPlaceOfServiceFeatureStore
],

})
export class WebLocationListComponent implements OnInit {
  @ViewChild(WebLocationSelectTableViewComponent) tableView: WebLocationSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'placeOfService.name', headerName: 'Place of Service', filter: 'agTextColumnFilter' },
  { field: 'vendorLocation.name', headerName: 'Vendor Location', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'locationName', filter: 'agTextColumnFilter'  },
{ field: 'line1', filter: 'agTextColumnFilter'  },
{ field: 'line2', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'postalCode', filter: 'agTextColumnFilter'  },

{
      headerName: 'Latitude',
      field: 'latitude',
      valueFormatter: params => currencyFormatter(params.data?.latitude, '', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Longitude',
      field: 'longitude',
      valueFormatter: params => currencyFormatter(params.data?.longitude, '', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'abbrev', filter: 'agTextColumnFilter'  },
{ field: 'division', filter: 'agTextColumnFilter'  },
{ field: 'country', filter: 'agTextColumnFilter'  },
{ field: 'officePhone', filter: 'agTextColumnFilter'  },
{ field: 'fax', filter: 'agTextColumnFilter'  },
{ field: 'attentionTo', filter: 'agTextColumnFilter'  },
{ field: 'placeOfServiceId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebLocationFeatureStore,
    private readonly placeOfServiceFeatureStore: WebPlaceOfServiceFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadLocationsEffect()
    this.store.filterPlaceOfServices('').subscribe()
 }

  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {

        case 'placeOfService':
          {
            const placeOfServiceCreateActionResultListener = this.placeOfServiceFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPlaceOfService(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                placeOfServiceCreateActionResultListener.unsubscribe();
              }
            })
            this.placeOfServiceFeatureStore.createPlaceOfServiceEffect({ name: newName });
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
    this.store.loadLocationsEffect()
  }
}
