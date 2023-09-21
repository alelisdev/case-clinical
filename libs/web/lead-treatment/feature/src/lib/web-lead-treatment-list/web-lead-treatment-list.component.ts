

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebLeadTreatmentFeatureStore } from '@case-clinical/web/lead-treatment/shared'
import { WebLeadTreatmentSelectTableViewComponent } from '@case-clinical/web/lead-treatment/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { WebTreatmentFeatureStore } from '@case-clinical/web/treatment/shared'

@Component({
  template: `
    <ng-container *featureFlag="'LeadTreatment.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.leadTreatments"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="leadTreatment"
          title="LeadTreatment"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebLeadTreatmentFeatureStore,
    WebLeadFeatureStore,
    WebTreatmentFeatureStore
],

})
export class WebLeadTreatmentListComponent implements OnInit {
  @ViewChild(WebLeadTreatmentSelectTableViewComponent) tableView: WebLeadTreatmentSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'lead.name', headerName: 'Lead', filter: 'agTextColumnFilter' },
{ field: 'treatment.name', headerName: 'Treatment', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'leadId', filter: 'agTextColumnFilter', hide:true },
{ field: 'treatmentId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebLeadTreatmentFeatureStore,
    private readonly leadFeatureStore: WebLeadFeatureStore,
private readonly treatmentFeatureStore: WebTreatmentFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadLeadTreatmentsEffect()
    this.store.filterLeads('').subscribe()
    this.store.filterTreatments('').subscribe()
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


        case 'treatment':
          {
            const treatmentCreateActionResultListener = this.treatmentFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addTreatment(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                treatmentCreateActionResultListener.unsubscribe();
              }
            })
            this.treatmentFeatureStore.createTreatmentEffect({ name: newName });
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
    this.store.loadLeadTreatmentsEffect()
  }
}
