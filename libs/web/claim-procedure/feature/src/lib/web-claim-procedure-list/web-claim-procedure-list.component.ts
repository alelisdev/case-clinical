

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebClaimProcedureFeatureStore } from '@case-clinical/web/claim-procedure/shared'
import { WebClaimProcedureSelectTableViewComponent } from '@case-clinical/web/claim-procedure/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebPlaceOfServiceFeatureStore } from '@case-clinical/web/place-of-service/shared'
import { WebClaimStatusFeatureStore } from '@case-clinical/web/claim-status/shared'
import { WebClaimFeatureStore } from '@case-clinical/web/claim/shared'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebProcedureFeatureStore } from '@case-clinical/web/procedure/shared'

@Component({
  template: `
    <ng-container *featureFlag="'ClaimProcedure.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.claimProcedures"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="claimProcedure"
          title="ClaimProcedure"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebClaimProcedureFeatureStore,
    WebPlaceOfServiceFeatureStore,
    WebClaimStatusFeatureStore,
    WebClaimFeatureStore,
    WebAppointmentFeatureStore,
    WebProcedureFeatureStore
],

})
export class WebClaimProcedureListComponent implements OnInit {
  @ViewChild(WebClaimProcedureSelectTableViewComponent) tableView: WebClaimProcedureSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'placeOfService.name', headerName: 'Place of Service', filter: 'agTextColumnFilter' },
{ field: 'claimStatus.name', headerName: 'Claim Status', filter: 'agTextColumnFilter' },
{ field: 'claim.name', headerName: 'Claim', filter: 'agTextColumnFilter' },
{ field: 'appointment.name', headerName: 'Appointment', filter: 'agTextColumnFilter' },
{ field: 'procedure.name', headerName: 'Procedure', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'claimProcedureCodeId', filter: 'agTextColumnFilter'  },
{ field: 'procedureCodeId', filter: 'agTextColumnFilter'  },
{ field: 'claimId', filter: 'agTextColumnFilter', hide:true },
{ field: 'fromDateOfService', filter: 'agDateColumnFilter'  },
{ field: 'toDateOfService', filter: 'agDateColumnFilter'  },
{ field: 'placeOfServiceId', filter: 'agTextColumnFilter', hide:true },
{ field: 'nationalDrugCode', filter: 'agTextColumnFilter'  },
{ field: 'drugUnit', filter: 'agTextColumnFilter'  },
{ field: 'drugQuantity', filter: 'agTextColumnFilter'  },

{
      headerName: 'Quantity',
      field: 'quantity',
      valueFormatter: params => currencyFormatter(params.data?.quantity, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Billed Amount',
      field: 'billedAmount',
      valueFormatter: params => currencyFormatter(params.data?.billedAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Approved Amount',
      field: 'approvedAmount',
      valueFormatter: params => currencyFormatter(params.data?.approvedAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Adjustment Amount',
      field: 'adjustmentAmount',
      valueFormatter: params => currencyFormatter(params.data?.adjustmentAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Net Payment Amount',
      field: 'netPaymentAmount',
      valueFormatter: params => currencyFormatter(params.data?.netPaymentAmount, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'paymentMethod', filter: 'agTextColumnFilter'  },
{ field: 'internalMemo', filter: 'agTextColumnFilter'  },
{ field: 'explainationOfBenefitsComment', filter: 'agTextColumnFilter'  },
{ field: 'claimStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'reason', filter: 'agTextColumnFilter'  },
{ field: 'procedureCode', filter: 'agTextColumnFilter'  },
{ field: 'diagnosisPointer', filter: 'agTextColumnFilter'  },
{ field: 'modifier1', filter: 'agTextColumnFilter'  },
{ field: 'modifier2', filter: 'agTextColumnFilter'  },
{ field: 'modifier3', filter: 'agTextColumnFilter'  },
{ field: 'modifier4', filter: 'agTextColumnFilter'  },
{ field: 'appointmentId', filter: 'agTextColumnFilter', hide:true },
{ field: 'procedureId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    private readonly store: WebClaimProcedureFeatureStore,
    private readonly placeOfServiceFeatureStore: WebPlaceOfServiceFeatureStore,
private readonly claimStatusFeatureStore: WebClaimStatusFeatureStore,
private readonly claimFeatureStore: WebClaimFeatureStore,
private readonly appointmentFeatureStore: WebAppointmentFeatureStore,
private readonly procedureFeatureStore: WebProcedureFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadClaimProceduresEffect()
    this.store.filterPlaceOfServices('').subscribe()
    this.store.filterClaimStatuses('').subscribe()
    this.store.filterClaims('').subscribe()
    this.store.filterAppointments('').subscribe()
    this.store.filterProcedures('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'placeOfService':
          {
            const placeOfServiceCreateActionResultListener = this.placeOfServiceFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPlaceOfService(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                placeOfServiceCreateActionResultListener.unsubscribe();
              }
            })
            this.placeOfServiceFeatureStore.createPlaceOfServiceEffect({ name: newName });
            break;
          }


        case 'claimStatus':
          {
            const claimStatusCreateActionResultListener = this.claimStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addClaimStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                claimStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.claimStatusFeatureStore.createClaimStatusEffect({ name: newName });
            break;
          }


        case 'claim':
          {
            const claimCreateActionResultListener = this.claimFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addClaim(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                claimCreateActionResultListener.unsubscribe();
              }
            })
            this.claimFeatureStore.createClaimEffect({ name: newName });
            break;
          }


        case 'appointment':
          {
            const appointmentCreateActionResultListener = this.appointmentFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAppointment(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                appointmentCreateActionResultListener.unsubscribe();
              }
            })
            this.appointmentFeatureStore.createAppointmentEffect({ name: newName });
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
    this.store.loadClaimProceduresEffect()
  }
}
