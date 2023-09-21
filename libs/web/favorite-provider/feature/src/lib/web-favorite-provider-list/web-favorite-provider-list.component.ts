

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebFavoriteProviderFeatureStore } from '@case-clinical/web/favorite-provider/shared'
import { WebFavoriteProviderSelectTableViewComponent } from '@case-clinical/web/favorite-provider/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'

@Component({
  template: `
    <ng-container *featureFlag="'FavoriteProvider.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.favoriteProviders"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="favoriteProvider"
          title="FavoriteProvider"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebFavoriteProviderFeatureStore,
    WebClinicalProviderFeatureStore
],

})
export class WebFavoriteProviderListComponent implements OnInit {
  @ViewChild(WebFavoriteProviderSelectTableViewComponent) tableView: WebFavoriteProviderSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'clinicalProvider.name', headerName: 'Clinical Provider', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'clinicalProviderId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'userId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'specialtyId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebFavoriteProviderFeatureStore,
    private readonly clinicalProviderFeatureStore: WebClinicalProviderFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadFavoriteProvidersEffect()
    this.store.filterClinicalProviders('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'clinicalProvider':
          {
            const clinicalProviderCreateActionResultListener = this.clinicalProviderFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addClinicalProvider(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                clinicalProviderCreateActionResultListener.unsubscribe();
              }
            })
            this.clinicalProviderFeatureStore.createClinicalProviderEffect({ name: newName });
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
    this.store.loadFavoriteProvidersEffect()
  }
}
