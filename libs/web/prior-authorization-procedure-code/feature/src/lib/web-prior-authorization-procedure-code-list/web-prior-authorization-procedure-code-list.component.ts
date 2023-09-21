

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPriorAuthorizationProcedureCodeFeatureStore } from '@case-clinical/web/prior-authorization-procedure-code/shared'
import { WebPriorAuthorizationProcedureCodeSelectTableViewComponent } from '@case-clinical/web/prior-authorization-procedure-code/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebCostCategoryFeatureStore } from '@case-clinical/web/cost-category/shared'
import { WebProcedureFeatureStore } from '@case-clinical/web/procedure/shared'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'

@Component({
  template: `
    <ng-container *featureFlag="'PriorAuthorizationProcedureCode.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.priorAuthorizationProcedureCodes"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="priorAuthorizationProcedureCode"
          title="PriorAuthorizationProcedureCode"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebPriorAuthorizationProcedureCodeFeatureStore,
    WebCostCategoryFeatureStore,
    WebProcedureFeatureStore,
    WebPriorAuthorizationRequestFeatureStore
],

})
export class WebPriorAuthorizationProcedureCodeListComponent implements OnInit {
  @ViewChild(WebPriorAuthorizationProcedureCodeSelectTableViewComponent) tableView: WebPriorAuthorizationProcedureCodeSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'costCategory.name', headerName: 'Cost Category', filter: 'agTextColumnFilter' },
{ field: 'procedure.name', headerName: 'Procedure', filter: 'agTextColumnFilter' },
{ field: 'priorAuthorizationRequest.name', headerName: 'Prior Authorization Request', filter: 'agTextColumnFilter' },
{ field: 'procedureId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'priorAuthorizationRequestId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'costCategoryId', filter: 'agTextColumnFilter', hide:true  },

{
      headerName: 'Estimated Cost',
      field: 'estimatedCost',
      valueFormatter: params => currencyFormatter(params.data?.estimatedCost, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
}]

  constructor(
    private readonly store: WebPriorAuthorizationProcedureCodeFeatureStore,
    private readonly costCategoryFeatureStore: WebCostCategoryFeatureStore,
private readonly procedureFeatureStore: WebProcedureFeatureStore,
private readonly priorAuthorizationRequestFeatureStore: WebPriorAuthorizationRequestFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPriorAuthorizationProcedureCodesEffect()
    this.store.filterCostCategories('').subscribe()
    this.store.filterProcedures('').subscribe()
    this.store.filterPriorAuthorizationRequests('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'costCategory':
          {
            const costCategoryCreateActionResultListener = this.costCategoryFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addCostCategory(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                costCategoryCreateActionResultListener.unsubscribe();
              }
            })
            this.costCategoryFeatureStore.createCostCategoryEffect({ name: newName });
            break;
          }


        case 'procedure':
          {
            const procedureCreateActionResultListener = this.procedureFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addProcedure(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                procedureCreateActionResultListener.unsubscribe();
              }
            })
            this.procedureFeatureStore.createProcedureEffect({ name: newName });
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
    this.store.loadPriorAuthorizationProcedureCodesEffect()
  }
}
