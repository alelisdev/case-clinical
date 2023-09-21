

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPriorAuthGuidelineFeatureStore } from '@case-clinical/web/prior-auth-guideline/shared'
import { WebPriorAuthGuidelineSelectTableViewComponent } from '@case-clinical/web/prior-auth-guideline/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebGuidelineFeatureStore } from '@case-clinical/web/guideline/shared'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'

@Component({
  template: `
    <ng-container *featureFlag="'PriorAuthGuideline.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.priorAuthGuidelines"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="priorAuthGuideline"
          title="PriorAuthGuideline"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebPriorAuthGuidelineFeatureStore,
    WebGuidelineFeatureStore,
    WebPriorAuthorizationRequestFeatureStore
],

})
export class WebPriorAuthGuidelineListComponent implements OnInit {
  @ViewChild(WebPriorAuthGuidelineSelectTableViewComponent) tableView: WebPriorAuthGuidelineSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'guideline.name', headerName: 'Guideline', filter: 'agTextColumnFilter' },
{ field: 'priorAuthorizationRequest.name', headerName: 'Prior Authorization Request', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'guidelineId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'priorAuthorizationRequestId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebPriorAuthGuidelineFeatureStore,
    private readonly guidelineFeatureStore: WebGuidelineFeatureStore,
private readonly priorAuthorizationRequestFeatureStore: WebPriorAuthorizationRequestFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPriorAuthGuidelinesEffect()
    this.store.filterGuidelines('').subscribe()
    this.store.filterPriorAuthorizationRequests('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'guideline':
          {
            const guidelineCreateActionResultListener = this.guidelineFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addGuideline(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                guidelineCreateActionResultListener.unsubscribe();
              }
            })
            this.guidelineFeatureStore.createGuidelineEffect({ name: newName });
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
    this.store.loadPriorAuthGuidelinesEffect()
  }
}
