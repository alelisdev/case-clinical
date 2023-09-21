

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebDurableMedicalEquipmentFeatureStore } from '@case-clinical/web/durable-medical-equipment/shared'
import { WebDurableMedicalEquipmentSelectTableViewComponent } from '@case-clinical/web/durable-medical-equipment/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'

@Component({
  template: `
    <ng-container *featureFlag="'DurableMedicalEquipment.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.durableMedicalEquipments"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="durableMedicalEquipment"
          title="DurableMedicalEquipment"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebDurableMedicalEquipmentFeatureStore,
    WebVendorFeatureStore
],

})
export class WebDurableMedicalEquipmentListComponent implements OnInit {
  @ViewChild(WebDurableMedicalEquipmentSelectTableViewComponent) tableView: WebDurableMedicalEquipmentSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'vendor.name', headerName: 'Vendor', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'itemCode', filter: 'agTextColumnFilter'  },
{ field: 'vendorId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'size', filter: 'agTextColumnFilter'  },
{ field: 'brand', filter: 'agTextColumnFilter'  },
{ field: 'itemURL', filter: 'agTextColumnFilter'  },
{ field: 'estimatedCost', filter: 'agTextColumnFilter'  }]

  constructor(
    private readonly store: WebDurableMedicalEquipmentFeatureStore,
    private readonly vendorFeatureStore: WebVendorFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadDurableMedicalEquipmentsEffect()
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
    this.store.loadDurableMedicalEquipmentsEffect()
  }
}
