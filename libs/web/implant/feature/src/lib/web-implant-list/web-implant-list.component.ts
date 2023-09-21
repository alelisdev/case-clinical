

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebImplantFeatureStore } from '@case-clinical/web/implant/shared'
import { WebImplantSelectTableViewComponent } from '@case-clinical/web/implant/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebImplantCategoryFeatureStore } from '@case-clinical/web/implant-category/shared'
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'
import { WebManufacturerFeatureStore } from '@case-clinical/web/manufacturer/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Implant.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.implants"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="implant"
          title="Implant"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebImplantFeatureStore,
    WebImplantCategoryFeatureStore,
    WebContactFeatureStore,
    WebManufacturerFeatureStore
],

})
export class WebImplantListComponent implements OnInit {
  @ViewChild(WebImplantSelectTableViewComponent) tableView: WebImplantSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'implantCategory.name', headerName: 'Implant Category', filter: 'agTextColumnFilter' },
{ field: 'salesRepresentative.name', headerName: 'Sales Representative', filter: 'agTextColumnFilter' },
{ field: 'manufacturer.name', headerName: 'Manufacturer', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },

{
      headerName: 'Estimated Cost',
      field: 'estimatedCost',
      valueFormatter: params => currencyFormatter(params.data?.estimatedCost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'implantCategoryId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'manufacturerId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'photoUrl', filter: 'agTextColumnFilter'  },
{ field: 'salesRepresentativeId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'sku', filter: 'agTextColumnFilter'  }]

  constructor(
    private readonly store: WebImplantFeatureStore,
    private readonly implantCategoryFeatureStore: WebImplantCategoryFeatureStore,
private readonly contactFeatureStore: WebContactFeatureStore,
private readonly manufacturerFeatureStore: WebManufacturerFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadImplantsEffect()
    this.store.filterImplantCategories('').subscribe()
    this.store.filterContacts('').subscribe()
    this.store.filterManufacturers('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'implantCategory':
          {
            const implantCategoryCreateActionResultListener = this.implantCategoryFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addImplantCategory(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                implantCategoryCreateActionResultListener.unsubscribe();
              }
            })
            this.implantCategoryFeatureStore.createImplantCategoryEffect({ name: newName });
            break;
          }


        case 'contact':
          {
            const contactCreateActionResultListener = this.contactFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addContact(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                contactCreateActionResultListener.unsubscribe();
              }
            })
            this.contactFeatureStore.createContactEffect({ name: newName });
            break;
          }


        case 'manufacturer':
          {
            const manufacturerCreateActionResultListener = this.manufacturerFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addManufacturer(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                manufacturerCreateActionResultListener.unsubscribe();
              }
            })
            this.manufacturerFeatureStore.createManufacturerEffect({ name: newName });
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
    this.store.loadImplantsEffect()
  }
}
