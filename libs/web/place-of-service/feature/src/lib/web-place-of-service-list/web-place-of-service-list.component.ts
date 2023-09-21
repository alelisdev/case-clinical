

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPlaceOfServiceFeatureStore } from '@case-clinical/web/place-of-service/shared'
import { WebPlaceOfServiceSelectTableViewComponent } from '@case-clinical/web/place-of-service/ui';
import { ColDef } from '@ag-grid-community/core';



@Component({
  template: `
    <ng-container *featureFlag="'PlaceOfService.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.placeOfServices"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="placeOfService"
          title="PlaceOfService"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebPlaceOfServiceFeatureStore,

],

})
export class WebPlaceOfServiceListComponent implements OnInit {
  @ViewChild(WebPlaceOfServiceSelectTableViewComponent) tableView: WebPlaceOfServiceSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [,
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ headerName: 'Is Facility', field: 'isFacility', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' }]

  constructor(
    private readonly store: WebPlaceOfServiceFeatureStore,
    
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPlaceOfServicesEffect()

 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
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
    this.store.loadPlaceOfServicesEffect()
  }
}
