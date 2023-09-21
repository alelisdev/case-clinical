

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPriorAuthorizationEquipmentFeatureStore } from '@case-clinical/web/prior-authorization-equipment/shared'
import { WebPriorAuthorizationEquipmentSelectTableViewComponent } from '@case-clinical/web/prior-authorization-equipment/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebEquipmentFeatureStore } from '@case-clinical/web/equipment/shared'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'

@Component({
  template: `
    <ng-container *featureFlag="'PriorAuthorizationEquipment.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.priorAuthorizationEquipments"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="priorAuthorizationEquipment"
          title="PriorAuthorizationEquipment"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebPriorAuthorizationEquipmentFeatureStore,
    WebEquipmentFeatureStore,
    WebPriorAuthorizationRequestFeatureStore
],

})
export class WebPriorAuthorizationEquipmentListComponent implements OnInit {
  @ViewChild(WebPriorAuthorizationEquipmentSelectTableViewComponent) tableView: WebPriorAuthorizationEquipmentSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'equipment.name', headerName: 'Equipment', filter: 'agTextColumnFilter' },
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
{ field: 'equipmentId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'priorAuthorizationRequestId', filter: 'agTextColumnFilter', hide:true  }]

  constructor(
    private readonly store: WebPriorAuthorizationEquipmentFeatureStore,
    private readonly equipmentFeatureStore: WebEquipmentFeatureStore,
private readonly priorAuthorizationRequestFeatureStore: WebPriorAuthorizationRequestFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPriorAuthorizationEquipmentsEffect()
    this.store.filterEquipments('').subscribe()
    this.store.filterPriorAuthorizationRequests('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'equipment':
          {
            const equipmentCreateActionResultListener = this.equipmentFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addEquipment(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                equipmentCreateActionResultListener.unsubscribe();
              }
            })
            this.equipmentFeatureStore.createEquipmentEffect({ name: newName });
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
    this.store.loadPriorAuthorizationEquipmentsEffect()
  }
}
