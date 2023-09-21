

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebFacilityFeeScheduleFeatureStore } from '@case-clinical/web/facility-fee-schedule/shared'
import { WebFacilityFeeScheduleSelectTableViewComponent } from '@case-clinical/web/facility-fee-schedule/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebOrganizationFeatureStore } from '@case-clinical/web/organization/shared'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'

@Component({
  template: `
    <ng-container *featureFlag="'FacilityFeeSchedule.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.facilityFeeSchedules"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="facilityFeeSchedule"
          title="FacilityFeeSchedule"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebFacilityFeeScheduleFeatureStore,
    WebOrganizationFeatureStore,
    WebSpecialtyFeatureStore
],

})
export class WebFacilityFeeScheduleListComponent implements OnInit {
  @ViewChild(WebFacilityFeeScheduleSelectTableViewComponent) tableView: WebFacilityFeeScheduleSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'organization.name', headerName: 'Organization', filter: 'agTextColumnFilter' },
{ field: 'specialty.name', headerName: 'Specialty', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'organizationId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'specialtyId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'code', filter: 'agTextColumnFilter'  },
{ field: 'modifier', filter: 'agTextColumnFilter'  },
{ field: 'description', filter: 'agTextColumnFilter'  },

{
      headerName: 'Medicare Facility Rate',
      field: 'medicareFacilityRate',
      valueFormatter: params => currencyFormatter(params.data?.medicareFacilityRate, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Facility Fee',
      field: 'facilityFee',
      valueFormatter: params => currencyFormatter(params.data?.facilityFee, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Base Unit',
      field: 'baseUnit',
      valueFormatter: params => currencyFormatter(params.data?.baseUnit, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Prof Cf',
      field: 'profCf',
      valueFormatter: params => currencyFormatter(params.data?.profCf, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
}]

  constructor(
    private readonly store: WebFacilityFeeScheduleFeatureStore,
    private readonly organizationFeatureStore: WebOrganizationFeatureStore,
private readonly specialtyFeatureStore: WebSpecialtyFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadFacilityFeeSchedulesEffect()
    this.store.filterOrganizations('').subscribe()
    this.store.filterSpecialties('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'organization':
          {
            const organizationCreateActionResultListener = this.organizationFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addOrganization(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                organizationCreateActionResultListener.unsubscribe();
              }
            })
            this.organizationFeatureStore.createOrganizationEffect({ name: newName });
            break;
          }


        case 'specialty':
          {
            const specialtyCreateActionResultListener = this.specialtyFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addSpecialty(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                specialtyCreateActionResultListener.unsubscribe();
              }
            })
            this.specialtyFeatureStore.createSpecialtyEffect({ name: newName });
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
    this.store.loadFacilityFeeSchedulesEffect()
  }
}
