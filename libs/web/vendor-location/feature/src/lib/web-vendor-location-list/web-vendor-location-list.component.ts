

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebVendorLocationFeatureStore } from '@case-clinical/web/vendor-location/shared'
import { WebVendorLocationSelectTableViewComponent } from '@case-clinical/web/vendor-location/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'

@Component({
  template: `
    <ng-container *featureFlag="'VendorLocation.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.vendorLocations"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="vendorLocation"
          title="VendorLocation"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebVendorLocationFeatureStore,
    WebLocationFeatureStore,
    WebVendorFeatureStore
],

})
export class WebVendorLocationListComponent implements OnInit {
  @ViewChild(WebVendorLocationSelectTableViewComponent) tableView: WebVendorLocationSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [
{ field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'locationId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'vendorId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebVendorLocationFeatureStore,
    private readonly locationFeatureStore: WebLocationFeatureStore,
private readonly vendorFeatureStore: WebVendorFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadVendorLocationsEffect()
    this.store.filterLocations('').subscribe()
    this.store.filterVendors('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'location':
          {
            const locationCreateActionResultListener = this.locationFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLocation(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                locationCreateActionResultListener.unsubscribe();
              }
            })
            this.locationFeatureStore.createLocationEffect({ name: newName });
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
    this.store.loadVendorLocationsEffect()
  }
}
