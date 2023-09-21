

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPriorAuthDmeFeatureStore } from '@case-clinical/web/prior-auth-dme/shared'
import { WebPriorAuthDmeSelectTableViewComponent } from '@case-clinical/web/prior-auth-dme/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'
import { WebDurableMedicalEquipmentFeatureStore } from '@case-clinical/web/durable-medical-equipment/shared'

@Component({
  template: `
    <ng-container *featureFlag="'PriorAuthDme.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.priorAuthDmes"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="priorAuthDme"
          title="PriorAuthDme"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebPriorAuthDmeFeatureStore,
    WebPriorAuthorizationRequestFeatureStore,
    WebDurableMedicalEquipmentFeatureStore
],

})
export class WebPriorAuthDmeListComponent implements OnInit {
  @ViewChild(WebPriorAuthDmeSelectTableViewComponent) tableView: WebPriorAuthDmeSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'priorAuthorizationRequest.name', headerName: 'Prior Authorization Request', filter: 'agTextColumnFilter' },
{ field: 'durableMedicalEquipment.name', headerName: 'Durable Medical Equipment', filter: 'agTextColumnFilter' },
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
{ field: 'priorAuthId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'durableMedicalEquipmentId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebPriorAuthDmeFeatureStore,
    private readonly priorAuthorizationRequestFeatureStore: WebPriorAuthorizationRequestFeatureStore,
private readonly durableMedicalEquipmentFeatureStore: WebDurableMedicalEquipmentFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPriorAuthDmesEffect()
    this.store.filterPriorAuthorizationRequests('').subscribe()
    this.store.filterDurableMedicalEquipments('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
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


        case 'durableMedicalEquipment':
          {
            const durableMedicalEquipmentCreateActionResultListener = this.durableMedicalEquipmentFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addDurableMedicalEquipment(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                durableMedicalEquipmentCreateActionResultListener.unsubscribe();
              }
            })
            this.durableMedicalEquipmentFeatureStore.createDurableMedicalEquipmentEffect({ name: newName });
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
    this.store.loadPriorAuthDmesEffect()
  }
}
