

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebBodyPartLeadFeatureStore } from '@case-clinical/web/body-part-lead/shared'
import { WebBodyPartLeadSelectTableViewComponent } from '@case-clinical/web/body-part-lead/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { WebBodyPartFeatureStore } from '@case-clinical/web/body-part/shared'

@Component({
  template: `
    <ng-container *featureFlag="'BodyPartLead.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.bodyPartLeads"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="bodyPartLead"
          title="BodyPartLead"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebBodyPartLeadFeatureStore,
    WebLeadFeatureStore,
    WebBodyPartFeatureStore
],

})
export class WebBodyPartLeadListComponent implements OnInit {
  @ViewChild(WebBodyPartLeadSelectTableViewComponent) tableView: WebBodyPartLeadSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'lead.name', headerName: 'Lead', filter: 'agTextColumnFilter' },
{ field: 'bodyPart.name', headerName: 'Body Part', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'leadId', filter: 'agTextColumnFilter', hide:true },
{ field: 'bodyPartId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebBodyPartLeadFeatureStore,
    private readonly leadFeatureStore: WebLeadFeatureStore,
private readonly bodyPartFeatureStore: WebBodyPartFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadBodyPartLeadsEffect()
    this.store.filterLeads('').subscribe()
    this.store.filterBodyParts('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'lead':
          {
            const leadCreateActionResultListener = this.leadFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLead(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                leadCreateActionResultListener.unsubscribe();
              }
            })
            this.leadFeatureStore.createLeadEffect({ name: newName });
            break;
          }


        case 'bodyPart':
          {
            const bodyPartCreateActionResultListener = this.bodyPartFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addBodyPart(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                bodyPartCreateActionResultListener.unsubscribe();
              }
            })
            this.bodyPartFeatureStore.createBodyPartEffect({ name: newName });
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
    this.store.loadBodyPartLeadsEffect()
  }
}
