

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebReferralRequestFeatureStore } from '@case-clinical/web/referral-request/shared'
import { WebReferralRequestSelectTableViewComponent } from '@case-clinical/web/referral-request/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ReferralRequest.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.referralRequests"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="referralRequest"
          title="ReferralRequest"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebReferralRequestFeatureStore,
    WebPatientFeatureStore,
    WebLegalCaseFeatureStore,
    WebClinicalProviderFeatureStore,
    WebClinicalProviderLocationFeatureStore
],

})
export class WebReferralRequestListComponent implements OnInit {
  @ViewChild(WebReferralRequestSelectTableViewComponent) tableView: WebReferralRequestSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'requestingProvider.name', headerName: 'Requesting Provider', filter: 'agTextColumnFilter' },
{ field: 'referredTo.name', headerName: 'Referred to', filter: 'agTextColumnFilter' },
{ field: 'referredToLocation.name', headerName: 'Referred to Location', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true },
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true },
{ field: 'requestingProviderId', filter: 'agTextColumnFilter', hide:true },
{ field: 'referredToId', filter: 'agTextColumnFilter', hide:true },
{ field: 'clinicalProviderLocationId', filter: 'agTextColumnFilter', hide:true },
{ field: 'status', filter: 'agTextColumnFilter'  }]

  constructor(
    private readonly store: WebReferralRequestFeatureStore,
    private readonly patientFeatureStore: WebPatientFeatureStore,
private readonly legalCaseFeatureStore: WebLegalCaseFeatureStore,
private readonly clinicalProviderFeatureStore: WebClinicalProviderFeatureStore,
private readonly clinicalProviderLocationFeatureStore: WebClinicalProviderLocationFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadReferralRequestsEffect()
    this.store.filterPatients('').subscribe()
    this.store.filterLegalCases('').subscribe()
    this.store.filterClinicalProviders('').subscribe()
    this.store.filterClinicalProviderLocations('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'patient':
          {
            const patientCreateActionResultListener = this.patientFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPatient(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                patientCreateActionResultListener.unsubscribe();
              }
            })
            this.patientFeatureStore.createPatientEffect({ name: newName });
            break;
          }


        case 'legalCase':
          {
            const legalCaseCreateActionResultListener = this.legalCaseFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLegalCase(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                legalCaseCreateActionResultListener.unsubscribe();
              }
            })
            this.legalCaseFeatureStore.createLegalCaseEffect({ name: newName });
            break;
          }


        case 'clinicalProvider':
          {
            const clinicalProviderCreateActionResultListener = this.clinicalProviderFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addClinicalProvider(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                clinicalProviderCreateActionResultListener.unsubscribe();
              }
            })
            this.clinicalProviderFeatureStore.createClinicalProviderEffect({ name: newName });
            break;
          }


        case 'clinicalProviderLocation':
          {
            const clinicalProviderLocationCreateActionResultListener = this.clinicalProviderLocationFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addClinicalProviderLocation(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                clinicalProviderLocationCreateActionResultListener.unsubscribe();
              }
            })
            this.clinicalProviderLocationFeatureStore.createClinicalProviderLocationEffect({ name: newName });
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
    this.store.loadReferralRequestsEffect()
  }
}
