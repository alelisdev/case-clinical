

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebCaseStatusFeatureStore } from '@case-clinical/web/case-status/shared'
import { WebCaseStatusSelectTableViewComponent } from '@case-clinical/web/case-status/ui';
import { ColDef } from '@ag-grid-community/core';



@Component({
  template: `
    <ng-container *featureFlag="'CaseStatus.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.caseStatuses"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="caseStatus"
          title="CaseStatus"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebCaseStatusFeatureStore,

],

})
export class WebCaseStatusListComponent implements OnInit {
  @ViewChild(WebCaseStatusSelectTableViewComponent) tableView: WebCaseStatusSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [,
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },

{
      headerName: 'Order Index',
      field: 'orderIndex',
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'color', filter: 'agTextColumnFilter'  },
{ headerName: 'Is Default', field: 'isDefault', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },

{
      headerName: 'Ticker Date',
      field: 'tickerDate',
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Max Ticker Date',
      field: 'maxTickerDate',
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ headerName: 'Move Docs', field: 'moveDocs', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'dateCreated', filter: 'agDateColumnFilter'  },
{ headerName: 'Removed', field: 'removed', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'createdBy', filter: 'agTextColumnFilter'  },
{ field: 'migSource', filter: 'agTextColumnFilter'  },
{ field: 'entity', filter: 'agTextColumnFilter'  },
{ field: 'temp', filter: 'agTextColumnFilter'  }]

  constructor(
    private readonly store: WebCaseStatusFeatureStore,
    
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadCaseStatusesEffect()

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
    this.store.loadCaseStatusesEffect()
  }
}
