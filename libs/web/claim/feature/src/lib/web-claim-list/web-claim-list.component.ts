

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebClaimFeatureStore } from '@case-clinical/web/claim/shared'
import { WebClaimSelectTableViewComponent } from '@case-clinical/web/claim/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'

@Component({
  template: `
    <ng-container *featureFlag="'Claim.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.claims"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="claim"
          title="Claim"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebClaimFeatureStore,
    WebPriorAuthorizationRequestFeatureStore,
    WebPatientFeatureStore
],

})
export class WebClaimListComponent implements OnInit {
  @ViewChild(WebClaimSelectTableViewComponent) tableView: WebClaimSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'priorAuthorizationRequest.name', headerName: 'Prior Authorization Request', filter: 'agTextColumnFilter' },
{ field: 'claim.name', headerName: 'Claim', filter: 'agTextColumnFilter' },
{ field: 'explanationOfPayment.name', headerName: 'Explanation of Payment', filter: 'agTextColumnFilter' },
{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'originalRecordDate', filter: 'agDateColumnFilter'  },
{ field: 'receivedDate', filter: 'agDateColumnFilter'  },
{ field: 'dueDate', filter: 'agDateColumnFilter'  },
{ field: 'patientName', filter: 'agTextColumnFilter'  },
{ field: 'patientPhoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'patientDob', filter: 'agTextColumnFilter'  },
{ field: 'patientAddressLine1', filter: 'agTextColumnFilter'  },
{ field: 'patientAddressCity', filter: 'agTextColumnFilter'  },
{ field: 'patientAddressState', filter: 'agTextColumnFilter'  },
{ field: 'patientAddressPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'carrierName', filter: 'agTextColumnFilter'  },
{ field: 'carrierLine1', filter: 'agTextColumnFilter'  },
{ field: 'carrierLine2', filter: 'agTextColumnFilter'  },
{ field: 'carrierCity', filter: 'agTextColumnFilter'  },
{ field: 'carrierState', filter: 'agTextColumnFilter'  },
{ field: 'carrierPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'insuredName', filter: 'agTextColumnFilter'  },
{ field: 'insuredLine1', filter: 'agTextColumnFilter'  },
{ field: 'insuredCity', filter: 'agTextColumnFilter'  },
{ field: 'insuredState', filter: 'agTextColumnFilter'  },
{ field: 'insuredPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'patientSignature', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode1', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode2', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode3', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode4', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode5', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode6', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode7', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisCode8', filter: 'agTextColumnFilter'  },
{ field: 'federalTaxId', filter: 'agTextColumnFilter'  },
{ field: 'totalCharges', filter: 'agTextColumnFilter'  },
{ field: 'amountPaid', filter: 'agTextColumnFilter'  },
{ field: 'physicianSignature', filter: 'agTextColumnFilter'  },
{ field: 'physicianSignedOn', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacility', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacilityLine1', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacilityCity', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacilityState', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacilityPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'serviceFacilityNpi', filter: 'agTextColumnFilter'  },
{ field: 'billingFacility', filter: 'agTextColumnFilter'  },
{ field: 'billingLine1', filter: 'agTextColumnFilter'  },
{ field: 'billingCity', filter: 'agTextColumnFilter'  },
{ field: 'billingState', filter: 'agTextColumnFilter'  },
{ field: 'billingPostalCode', filter: 'agTextColumnFilter'  },
{ field: 'billingNpi', filter: 'agTextColumnFilter'  },
{ field: 'billingPhoneNumber', filter: 'agTextColumnFilter'  },
{ field: 'billingOther', filter: 'agTextColumnFilter'  },
{ field: 'sessionNotes', filter: 'agTextColumnFilter'  },
{ field: 'referringProvider', filter: 'agTextColumnFilter'  },
{ field: 'referringProviderNpi', filter: 'agTextColumnFilter'  },
{ field: 'additionalClaimInfo', filter: 'agTextColumnFilter'  },
{ field: 'accountNumber', filter: 'agTextColumnFilter'  },
{ field: 'referenceNumber', filter: 'agTextColumnFilter'  },
{ field: 'facility', filter: 'agTextColumnFilter'  },
{ field: 'priorAuthorizationNumber', filter: 'agTextColumnFilter'  },
{ field: 'priorAuthorizationRequestId', filter: 'agTextColumnFilter', hide:true },
{ field: 'providerName', filter: 'agTextColumnFilter'  },
{ field: 'providerNumber', filter: 'agTextColumnFilter'  },
{ field: 'vendor', filter: 'agTextColumnFilter'  },
{ field: 'vendorLine1', filter: 'agTextColumnFilter'  },
{ field: 'vendorCSZ', filter: 'agTextColumnFilter'  },
{ field: 'vendorTaxId', filter: 'agTextColumnFilter'  },

{
      headerName: 'Total Approved Amount',
      field: 'totalApprovedAmount',
      valueFormatter: params => currencyFormatter(params.data?.totalApprovedAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Total Billed Amount',
      field: 'totalBilledAmount',
      valueFormatter: params => currencyFormatter(params.data?.totalBilledAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Total Net Pay Amount',
      field: 'totalNetPayAmount',
      valueFormatter: params => currencyFormatter(params.data?.totalNetPayAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'notes', filter: 'agTextColumnFilter'  },
{ field: 'claimId', filter: 'agTextColumnFilter', hide:true },
{ field: 'explanationOfPaymentId', filter: 'agTextColumnFilter', hide:true },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebClaimFeatureStore,
    private readonly priorAuthorizationRequestFeatureStore: WebPriorAuthorizationRequestFeatureStore,
private readonly patientFeatureStore: WebPatientFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadClaimsEffect()
    this.store.filterPriorAuthorizationRequests('').subscribe()
    this.store.filterDocuments('').subscribe()
    this.store.filterPatients('').subscribe()
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
    this.store.loadClaimsEffect()
  }
}
