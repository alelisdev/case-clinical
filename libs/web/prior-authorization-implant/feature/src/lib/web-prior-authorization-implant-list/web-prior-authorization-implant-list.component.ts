

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPriorAuthorizationImplantFeatureStore } from '@case-clinical/web/prior-authorization-implant/shared'
import { WebPriorAuthorizationImplantSelectTableViewComponent } from '@case-clinical/web/prior-authorization-implant/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebImplantFeatureStore } from '@case-clinical/web/implant/shared'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'

@Component({
  template: `
    <ng-container *featureFlag="'PriorAuthorizationImplant.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.priorAuthorizationImplants"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="priorAuthorizationImplant"
          title="PriorAuthorizationImplant"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebPriorAuthorizationImplantFeatureStore,
    WebImplantFeatureStore,
    WebPriorAuthorizationRequestFeatureStore
],

})
export class WebPriorAuthorizationImplantListComponent implements OnInit {
  @ViewChild(WebPriorAuthorizationImplantSelectTableViewComponent) tableView: WebPriorAuthorizationImplantSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'implant.name', headerName: 'Implant', filter: 'agTextColumnFilter' },
{ field: 'priorAuthorizationRequest.name', headerName: 'Prior Authorization Request', filter: 'agTextColumnFilter' },
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
{ field: 'implantId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'priorAuthorizationRequestId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebPriorAuthorizationImplantFeatureStore,
    private readonly implantFeatureStore: WebImplantFeatureStore,
private readonly priorAuthorizationRequestFeatureStore: WebPriorAuthorizationRequestFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPriorAuthorizationImplantsEffect()
    this.store.filterImplants('').subscribe()
    this.store.filterPriorAuthorizationRequests('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'implant':
          {
            const implantCreateActionResultListener = this.implantFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addImplant(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                implantCreateActionResultListener.unsubscribe();
              }
            })
            this.implantFeatureStore.createImplantEffect({ name: newName });
            break;
          }


        case 'priorAuthorizationRequest':
          {
            const priorAuthorizationRequestCreateActionResultListener = this.priorAuthorizationRequestFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPriorAuthorizationRequest(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                priorAuthorizationRequestCreateActionResultListener.unsubscribe();
              }
            })
            this.priorAuthorizationRequestFeatureStore.createPriorAuthorizationRequestEffect({ name: newName });
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
    this.store.loadPriorAuthorizationImplantsEffect()
  }
}
