

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebClinicalProviderSelectTableViewComponent } from '@case-clinical/web/clinical-provider/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ClinicalProvider.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.clinicalProviders"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="clinicalProvider"
          title="ClinicalProvider"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebClinicalProviderFeatureStore,
    WebVendorFeatureStore
],

})
export class WebClinicalProviderListComponent implements OnInit {
  @ViewChild(WebClinicalProviderSelectTableViewComponent) tableView: WebClinicalProviderSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'vendorId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'expertId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'npi', filter: 'agTextColumnFilter'  },
{ field: 'honorific', filter: 'agTextColumnFilter'  },
{ field: 'firstName', filter: 'agTextColumnFilter'  },
{ field: 'lastName', filter: 'agTextColumnFilter'  },
{ field: 'suffix', filter: 'agTextColumnFilter'  },
{ field: 'phoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'profileImage.name', headerName: 'Profile Image', filter: 'agTextColumnFilter'  },
{ field: 'emailAddress', filter: 'agTextColumnFilter'  },
{ field: 'profilePictureId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'compressProfilePictureId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebClinicalProviderFeatureStore,
    private readonly vendorFeatureStore: WebVendorFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadClinicalProvidersEffect()
    this.store.filterVendors('').subscribe()
 }

  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {

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
    this.store.loadClinicalProvidersEffect()
  }
}
