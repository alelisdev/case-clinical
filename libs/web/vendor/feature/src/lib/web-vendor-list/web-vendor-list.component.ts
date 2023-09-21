

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { WebVendorSelectTableViewComponent } from '@case-clinical/web/vendor/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebVendorTypeFeatureStore } from '@case-clinical/web/vendor-type/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Vendor.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.vendors"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="vendor"
          title="Vendor"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebVendorFeatureStore,
    WebVendorTypeFeatureStore
],

})
export class WebVendorListComponent implements OnInit {
  @ViewChild(WebVendorSelectTableViewComponent) tableView: WebVendorSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'vendorType.name', headerName: 'Vendor Type', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'taxId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'line1', filter: 'agTextColumnFilter'  },
{ field: 'city', filter: 'agTextColumnFilter'  },
{ field: 'state', filter: 'agTextColumnFilter'  },
{ field: 'postalCode', filter: 'agTextColumnFilter'  },
{ field: 'emailAddress', filter: 'agTextColumnFilter'  },
{ field: 'phoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'fax', filter: 'agTextColumnFilter'  },
{ field: 'mailingAddress', filter: 'agTextColumnFilter'  },
{ field: 'vendorTypeId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'line2', filter: 'agTextColumnFilter'  },
{ field: 'country', filter: 'agTextColumnFilter'  },
{ field: 'office', filter: 'agTextColumnFilter'  },
{ field: 'email', filter: 'agTextColumnFilter'  },
{ field: 'website', filter: 'agTextColumnFilter'  },
{ field: 'contactPerson', filter: 'agTextColumnFilter'  },
{ field: 'owner', filter: 'agTextColumnFilter'  },
{ field: 'bankRoutingNumber', filter: 'agTextColumnFilter'  },
{ field: 'bankAccountNumber', filter: 'agTextColumnFilter'  },
{ field: 'bankName', filter: 'agTextColumnFilter'  },
{ field: 'bankCity', filter: 'agTextColumnFilter'  },
{ field: 'bankState', filter: 'agTextColumnFilter'  },
{ field: 'bankZip', filter: 'agTextColumnFilter'  },
{ field: 'notes', filter: 'agTextColumnFilter'  },
{ field: 'agreementDetails', filter: 'agTextColumnFilter'  },
{ field: 'providerSearchNameDisplayType', filter: 'agTextColumnFilter'  },
{ field: 'driversLicenseId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'logoId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'cellphone', filter: 'agTextColumnFilter'  },
{ field: 'achCheckOrWire', filter: 'agTextColumnFilter'  },
{ field: 'reductionNotes', filter: 'agTextColumnFilter'  },

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
{ field: 'businessCentralName', filter: 'agTextColumnFilter'  }]

  constructor(
    private readonly store: WebVendorFeatureStore,
    private readonly vendorTypeFeatureStore: WebVendorTypeFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadVendorsEffect()
    this.store.filterVendorTypes('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'vendorType':
          {
            const vendorTypeCreateActionResultListener = this.vendorTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addVendorType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                vendorTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.vendorTypeFeatureStore.createVendorTypeEffect({ name: newName });
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
    this.store.loadVendorsEffect()
  }
}
