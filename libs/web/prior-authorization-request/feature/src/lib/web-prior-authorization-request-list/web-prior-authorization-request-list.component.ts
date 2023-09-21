

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'
import { WebPriorAuthorizationRequestSelectTableViewComponent } from '@case-clinical/web/prior-authorization-request/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebProcedureSiteFeatureStore } from '@case-clinical/web/procedure-site/shared'
import { WebSurgicalPositionFeatureStore } from '@case-clinical/web/surgical-position/shared'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared'
import { WebGuidelineUsedFeatureStore } from '@case-clinical/web/guideline-used/shared'
import { WebAuthorizationKindFeatureStore } from '@case-clinical/web/authorization-kind/shared'
import { WebAuthorizationStatusFeatureStore } from '@case-clinical/web/authorization-status/shared'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebCaseProcedureFeatureStore } from '@case-clinical/web/case-procedure/shared'

@Component({
  template: `
    <ng-container *featureFlag="'PriorAuthorizationRequest.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.priorAuthorizationRequests"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="priorAuthorizationRequest"
          title="PriorAuthorizationRequest"
          [cardViewTemplate]="cardViewTemplate"
        ></ui-data-list>
      </ng-container>
    </ng-container>

    <ng-template #cardViewTemplate>
      <ui-formly-json-form
        class="w-full h-full"
        [formName]="'priorAuthorizationRequests_kanban_list'"
        [showSubmitButton]="false"
        [model]="{}"
        [componentStore]="store"
        [formData]="formData">
      </ui-formly-json-form>
    </ng-template>
`,
  providers: [
    WebPriorAuthorizationRequestFeatureStore,
    WebProcedureSiteFeatureStore,
    WebSurgicalPositionFeatureStore,
    WebClinicalProviderFeatureStore,
    WebVisitKindFeatureStore,
    WebGuidelineUsedFeatureStore,
    WebAuthorizationKindFeatureStore,
    WebAuthorizationStatusFeatureStore,
    WebPatientFeatureStore,
    WebCaseProcedureFeatureStore
],

})
export class WebPriorAuthorizationRequestListComponent implements OnInit {
  @ViewChild(WebPriorAuthorizationRequestSelectTableViewComponent) tableView: WebPriorAuthorizationRequestSelectTableViewComponent

  readonly vm$ = this.store.vm$

  formData = {
    priorAuthRequests: this.store.priorAuthorizationRequests$,
  }

  columnDefs: any[] = [{ field: 'procedureSite.name', headerName: 'Procedure Site', filter: 'agTextColumnFilter' },
{ field: 'surgicalPosition.name', headerName: 'Surgical Position', filter: 'agTextColumnFilter' },
{ field: 'treatingProvider.name', headerName: 'Treating Provider', filter: 'agTextColumnFilter' },
{ field: 'referredTo.name', headerName: 'Referred to', filter: 'agTextColumnFilter' },
{ field: 'prescription.name', headerName: 'Prescription', filter: 'agTextColumnFilter' },
{ field: 'visitKind.name', headerName: 'Visit Kind', filter: 'agTextColumnFilter' },
{ field: 'guidelineUsed.name', headerName: 'Guideline Used', filter: 'agTextColumnFilter' },
{ field: 'authorizationKind.name', headerName: 'Authorization Kind', filter: 'agTextColumnFilter' },
{ field: 'authorizationStatus.name', headerName: 'Authorization Status', filter: 'agTextColumnFilter' },
{ field: 'bill.name', headerName: 'Bill', filter: 'agTextColumnFilter' },
{ field: 'medicalReport.name', headerName: 'Medical Report', filter: 'agTextColumnFilter' },
{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'caseProcedure.name', headerName: 'Case Procedure', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'referredOn', filter: 'agDateColumnFilter'  },
{ field: 'approvedOn', filter: 'agDateColumnFilter'  },
{ field: 'effectiveAsOf', filter: 'agDateColumnFilter'  },
{ field: 'expiresOn', filter: 'agDateColumnFilter'  },

{
      headerName: 'Duration',
      field: 'duration',
      valueFormatter: params => currencyFormatter(params.data?.duration, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'procedureSiteId', filter: 'agTextColumnFilter', hide:true },
{ field: 'surgicalPositionId', filter: 'agTextColumnFilter', hide:true },
{ field: 'procedureDescription', filter: 'agTextColumnFilter'  },
{ field: 'remarks', filter: 'agTextColumnFilter'  },
{ headerName: 'Underwriting Approved', field: 'underwritingApproved', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Tpa Approved', field: 'tpaApproved', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Requires Medical Director', field: 'requiresMedicalDirector', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'reviewedOn', filter: 'agDateColumnFilter'  },
{ field: 'treatingProviderId', filter: 'agTextColumnFilter', hide:true },
{ field: 'referredToId', filter: 'agTextColumnFilter', hide:true },
{ field: 'priorAuthorizationNumber', filter: 'agTextColumnFilter'  },
{ field: 'caseManager', filter: 'agTextColumnFilter'  },
{ field: 'memberNumber', filter: 'agTextColumnFilter'  },
{ field: 'medicalDirector', filter: 'agTextColumnFilter'  },
{ field: 'tpaApprover', filter: 'agTextColumnFilter'  },
{ field: 'underwriter', filter: 'agTextColumnFilter'  },
{ field: 'prescriptionId', filter: 'agTextColumnFilter', hide:true },
{ field: 'visitKindId', filter: 'agTextColumnFilter', hide:true },
{ field: 'guidelineUsedId', filter: 'agTextColumnFilter', hide:true },
{ field: 'guidelineRequires', filter: 'agTextColumnFilter'  },
{ field: 'authorizationKindId', filter: 'agTextColumnFilter', hide:true },
{ field: 'authorizationStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'billId', filter: 'agTextColumnFilter', hide:true },
{ field: 'medicalReportId', filter: 'agTextColumnFilter', hide:true },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true },
{ field: 'caseProcedureId', filter: 'agTextColumnFilter', hide:true }]

  constructor(
    public readonly store: WebPriorAuthorizationRequestFeatureStore,
    private readonly procedureSiteFeatureStore: WebProcedureSiteFeatureStore,
private readonly surgicalPositionFeatureStore: WebSurgicalPositionFeatureStore,
private readonly clinicalProviderFeatureStore: WebClinicalProviderFeatureStore,
private readonly visitKindFeatureStore: WebVisitKindFeatureStore,
private readonly guidelineUsedFeatureStore: WebGuidelineUsedFeatureStore,
private readonly authorizationKindFeatureStore: WebAuthorizationKindFeatureStore,
private readonly authorizationStatusFeatureStore: WebAuthorizationStatusFeatureStore,
private readonly patientFeatureStore: WebPatientFeatureStore,
private readonly caseProcedureFeatureStore: WebCaseProcedureFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadPriorAuthorizationRequestsEffect()
    this.store.filterProcedureSites('').subscribe()
    this.store.filterSurgicalPositions('').subscribe()
    this.store.filterClinicalProviders('').subscribe()
    this.store.filterDocuments('').subscribe()
    this.store.filterVisitKinds('').subscribe()
    this.store.filterGuidelineUseds('').subscribe()
    this.store.filterAuthorizationKinds('').subscribe()
    this.store.filterAuthorizationStatuses('').subscribe()
    this.store.filterPatients('').subscribe()
    this.store.filterCaseProcedures('').subscribe()
 }

  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {

        case 'procedureSite':
          {
            const procedureSiteCreateActionResultListener = this.procedureSiteFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addProcedureSite(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                procedureSiteCreateActionResultListener.unsubscribe();
              }
            })
            this.procedureSiteFeatureStore.createProcedureSiteEffect({ name: newName });
            break;
          }


        case 'surgicalPosition':
          {
            const surgicalPositionCreateActionResultListener = this.surgicalPositionFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addSurgicalPosition(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                surgicalPositionCreateActionResultListener.unsubscribe();
              }
            })
            this.surgicalPositionFeatureStore.createSurgicalPositionEffect({ name: newName });
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


        case 'visitKind':
          {
            const visitKindCreateActionResultListener = this.visitKindFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addVisitKind(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                visitKindCreateActionResultListener.unsubscribe();
              }
            })
            this.visitKindFeatureStore.createVisitKindEffect({ name: newName });
            break;
          }


        case 'guidelineUsed':
          {
            const guidelineUsedCreateActionResultListener = this.guidelineUsedFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addGuidelineUsed(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                guidelineUsedCreateActionResultListener.unsubscribe();
              }
            })
            this.guidelineUsedFeatureStore.createGuidelineUsedEffect({ name: newName });
            break;
          }


        case 'authorizationKind':
          {
            const authorizationKindCreateActionResultListener = this.authorizationKindFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAuthorizationKind(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                authorizationKindCreateActionResultListener.unsubscribe();
              }
            })
            this.authorizationKindFeatureStore.createAuthorizationKindEffect({ name: newName });
            break;
          }


        case 'authorizationStatus':
          {
            const authorizationStatusCreateActionResultListener = this.authorizationStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAuthorizationStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                authorizationStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.authorizationStatusFeatureStore.createAuthorizationStatusEffect({ name: newName });
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


        case 'caseProcedure':
          {
            const caseProcedureCreateActionResultListener = this.caseProcedureFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addCaseProcedure(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                caseProcedureCreateActionResultListener.unsubscribe();
              }
            })
            this.caseProcedureFeatureStore.createCaseProcedureEffect({ name: newName });
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
    this.store.loadPriorAuthorizationRequestsEffect()
  }
}
