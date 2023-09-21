

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebClinicalProviderServiceFeatureStore } from '@case-clinical/web/clinical-provider-service/shared'
import { WebClinicalProviderServiceSelectTableViewComponent } from '@case-clinical/web/clinical-provider-service/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebServiceFeatureStore } from '@case-clinical/web/service/shared'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ClinicalProviderService.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.clinicalProviderServices"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="clinicalProviderService"
          title="ClinicalProviderService"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebClinicalProviderServiceFeatureStore,
    WebServiceFeatureStore,
    WebClinicalProviderFeatureStore
],

})
export class WebClinicalProviderServiceListComponent implements OnInit {
  @ViewChild(WebClinicalProviderServiceSelectTableViewComponent) tableView: WebClinicalProviderServiceSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'service.name', headerName: 'Service', filter: 'agTextColumnFilter' },
{ field: 'clinicalProvider.name', headerName: 'Clinical Provider', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'serviceId', filter: 'agTextColumnFilter', hide:true },
{ field: 'clinicalProviderId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebClinicalProviderServiceFeatureStore,
    private readonly serviceFeatureStore: WebServiceFeatureStore,
private readonly clinicalProviderFeatureStore: WebClinicalProviderFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadClinicalProviderServicesEffect()
    this.store.filterServices('').subscribe()
    this.store.filterClinicalProviders('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'service':
          {
            const serviceCreateActionResultListener = this.serviceFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addService(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                serviceCreateActionResultListener.unsubscribe();
              }
            })
            this.serviceFeatureStore.createServiceEffect({ name: newName });
            break;
          }


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
    this.store.loadClinicalProviderServicesEffect()
  }
}
