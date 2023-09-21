

import { Component, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebLegalCaseSelectTableViewComponent } from '@case-clinical/web/legal-case/ui';
import { ColDef } from '@ag-grid-community/core';

import { WebAccidentTypeFeatureStore } from '@case-clinical/web/accident-type/shared'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebMedLevelFeatureStore } from '@case-clinical/web/med-level/shared'
import { WebFirmFeatureStore } from '@case-clinical/web/firm/shared'
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared'
import { WebCaseStatusFeatureStore } from '@case-clinical/web/case-status/shared'
import { WebCaseTypeFeatureStore } from '@case-clinical/web/case-type/shared'
import { WebPatientTreatmentStatusFeatureStore } from '@case-clinical/web/patient-treatment-status/shared'
import { WebCaseProgressStatusFeatureStore } from '@case-clinical/web/case-progress-status/shared'
import { WebAdverseInsuranceStatusFeatureStore } from '@case-clinical/web/adverse-insurance-status/shared'

@Component({
  template: `
    <ng-container *featureFlag="'LegalCase.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.legalCases"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="legalCase"
          title="LegalCase"
        ></ui-data-list>
      </ng-container>
    </ng-container>
`,
  providers: [
    WebLegalCaseFeatureStore,
    WebAccidentTypeFeatureStore,
    WebPatientFeatureStore,
    WebMedLevelFeatureStore,
    WebFirmFeatureStore,
    WebAttorneyFeatureStore,
    WebCaseStatusFeatureStore,
    WebCaseTypeFeatureStore,
    WebPatientTreatmentStatusFeatureStore,
    WebCaseProgressStatusFeatureStore,
    WebAdverseInsuranceStatusFeatureStore
],

})
export class WebLegalCaseListComponent implements OnInit {
  @ViewChild(WebLegalCaseSelectTableViewComponent) tableView: WebLegalCaseSelectTableViewComponent

  readonly vm$ = this.store.vm$

  columnDefs: any[] = [{ field: 'accidentType.name', headerName: 'Accident Type', filter: 'agTextColumnFilter' },
{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'medLevel.name', headerName: 'Med Level', filter: 'agTextColumnFilter' },
{ field: 'firm.name', headerName: 'Firm', filter: 'agTextColumnFilter' },
{ field: 'attorney.name', headerName: 'Attorney', filter: 'agTextColumnFilter' },
{ field: 'caseStatus.name', headerName: 'Case Status', filter: 'agTextColumnFilter' },
{ field: 'caseType.name', headerName: 'Case Type', filter: 'agTextColumnFilter' },
{ field: 'patientTreatmentStatus.name', headerName: 'Patient Treatment Status', filter: 'agTextColumnFilter' },
{ field: 'caseProgressStatus.name', headerName: 'Case Progress Status', filter: 'agTextColumnFilter' },
{ field: 'adverseInsuranceStatus.name', headerName: 'Adverse Insurance Status', filter: 'agTextColumnFilter' },
{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'accidentTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true },
{ field: 'medLevelId', filter: 'agTextColumnFilter', hide:true },
{ field: 'firmId', filter: 'agTextColumnFilter', hide:true },
{ field: 'attorneyId', filter: 'agTextColumnFilter', hide:true },
{ field: 'agentId', filter: 'agTextColumnFilter'  },
{ field: 'caseStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'caseTypeId', filter: 'agTextColumnFilter', hide:true },
{ field: 'patientTreatmentStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'medicalRecordNumber', filter: 'agTextColumnFilter'  },
{ field: 'pharmacyControlNumber', filter: 'agTextColumnFilter'  },
{ field: 'pchGroupNumber', filter: 'agTextColumnFilter'  },
{ field: 'dateOfLoss', filter: 'agDateColumnFilter'  },
{ field: 'caseStatusDate', filter: 'agDateColumnFilter'  },
{ field: 'caseStatusOther', filter: 'agTextColumnFilter'  },
{ field: 'paralegal', filter: 'agTextColumnFilter'  },
{ field: 'paralegalContact', filter: 'agTextColumnFilter'  },
{ field: 'caseNoteSummary', filter: 'agTextColumnFilter'  },

{
      headerName: 'Policy Limit',
      field: 'policyLimit',
      valueFormatter: params => currencyFormatter(params.data?.policyLimit, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},

{
      headerName: 'Attorney Fee',
      field: 'attorneyFee',
      valueFormatter: params => currencyFormatter(params.data?.attorneyFee, '$', 2),
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'referringPhysician', filter: 'agTextColumnFilter'  },
{ headerName: 'No More Treatment', field: 'noMoreTreatment', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Medpay', field: 'medpay', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'fileNumber', filter: 'agTextColumnFilter'  },
{ field: 'caseNumber', filter: 'agTextColumnFilter'  },
{ field: 'accidentState', filter: 'agTextColumnFilter'  },
{ field: 'assignedTo', filter: 'agTextColumnFilter'  },
{ headerName: 'Attorney Paid', field: 'attorneyPaid', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'attorneySentDate', filter: 'agDateColumnFilter'  },
{ headerName: 'Write off', field: 'writeOff', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'No MRI', field: 'noMRI', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'No PT', field: 'noPT', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'No First Appointment', field: 'noFirstAppointment', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Hot', field: 'hot', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Documents Uploaded', field: 'documentsUploaded', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Attorney Review', field: 'attorneyReview', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Escalated Review', field: 'escalatedReview', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'In Active', field: 'inActive', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ headerName: 'Criteria 1712', field: 'criteria1712', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'documentUploadedDate', filter: 'agDateColumnFilter'  },
{ field: 'patientDischargedGatheringRecordsDate', filter: 'agDateColumnFilter'  },
{ field: 'resubmitted', filter: 'agDateColumnFilter'  },
{ field: 'caseProgressStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'firmCaseManager', filter: 'agTextColumnFilter'  },
{ field: 'adverseInsuranceStatusId', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdBy', filter: 'agTextColumnFilter'  },
{ field: 'renegotiatePayOffDate', filter: 'agDateColumnFilter'  }]

  constructor(
    private readonly store: WebLegalCaseFeatureStore,
    private readonly accidentTypeFeatureStore: WebAccidentTypeFeatureStore,
private readonly patientFeatureStore: WebPatientFeatureStore,
private readonly medLevelFeatureStore: WebMedLevelFeatureStore,
private readonly firmFeatureStore: WebFirmFeatureStore,
private readonly attorneyFeatureStore: WebAttorneyFeatureStore,
private readonly caseStatusFeatureStore: WebCaseStatusFeatureStore,
private readonly caseTypeFeatureStore: WebCaseTypeFeatureStore,
private readonly patientTreatmentStatusFeatureStore: WebPatientTreatmentStatusFeatureStore,
private readonly caseProgressStatusFeatureStore: WebCaseProgressStatusFeatureStore,
private readonly adverseInsuranceStatusFeatureStore: WebAdverseInsuranceStatusFeatureStore
  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadLegalCasesEffect()
    this.store.filterAccidentTypes('').subscribe()
    this.store.filterPatients('').subscribe()
    this.store.filterMedLevels('').subscribe()
    this.store.filterFirms('').subscribe()
    this.store.filterAttorneys('').subscribe()
    this.store.filterCaseStatuses('').subscribe()
    this.store.filterCaseTypes('').subscribe()
    this.store.filterPatientTreatmentStatuses('').subscribe()
    this.store.filterCaseProgressStatuses('').subscribe()
    this.store.filterAdverseInsuranceStatuses('').subscribe()
 }
  
  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {
        
        case 'accidentType':
          {
            const accidentTypeCreateActionResultListener = this.accidentTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAccidentType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                accidentTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.accidentTypeFeatureStore.createAccidentTypeEffect({ name: newName });
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


        case 'medLevel':
          {
            const medLevelCreateActionResultListener = this.medLevelFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addMedLevel(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                medLevelCreateActionResultListener.unsubscribe();
              }
            })
            this.medLevelFeatureStore.createMedLevelEffect({ name: newName });
            break;
          }


        case 'firm':
          {
            const firmCreateActionResultListener = this.firmFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addFirm(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                firmCreateActionResultListener.unsubscribe();
              }
            })
            this.firmFeatureStore.createFirmEffect({ name: newName });
            break;
          }


        case 'attorney':
          {
            const attorneyCreateActionResultListener = this.attorneyFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAttorney(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                attorneyCreateActionResultListener.unsubscribe();
              }
            })
            this.attorneyFeatureStore.createAttorneyEffect({ name: newName });
            break;
          }


        case 'caseStatus':
          {
            const caseStatusCreateActionResultListener = this.caseStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addCaseStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                caseStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.caseStatusFeatureStore.createCaseStatusEffect({ name: newName });
            break;
          }


        case 'caseType':
          {
            const caseTypeCreateActionResultListener = this.caseTypeFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addCaseType(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                caseTypeCreateActionResultListener.unsubscribe();
              }
            })
            this.caseTypeFeatureStore.createCaseTypeEffect({ name: newName });
            break;
          }


        case 'patientTreatmentStatus':
          {
            const patientTreatmentStatusCreateActionResultListener = this.patientTreatmentStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addPatientTreatmentStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                patientTreatmentStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.patientTreatmentStatusFeatureStore.createPatientTreatmentStatusEffect({ name: newName });
            break;
          }


        case 'caseProgressStatus':
          {
            const caseProgressStatusCreateActionResultListener = this.caseProgressStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addCaseProgressStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                caseProgressStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.caseProgressStatusFeatureStore.createCaseProgressStatusEffect({ name: newName });
            break;
          }


        case 'adverseInsuranceStatus':
          {
            const adverseInsuranceStatusCreateActionResultListener = this.adverseInsuranceStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAdverseInsuranceStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                adverseInsuranceStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.adverseInsuranceStatusFeatureStore.createAdverseInsuranceStatusEffect({ name: newName });
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
    this.store.loadLegalCasesEffect()
  }
}
