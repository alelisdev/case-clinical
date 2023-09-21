import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { currencyFormatter, dateFormatter } from '@case-clinical/web/core/data-access'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebAppointmentSelectTableViewComponent } from '@case-clinical/web/appointment/ui';
import { ColDef } from '@ag-grid-community/core';
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebAppointmentStatusFeatureStore } from '@case-clinical/web/appointment-status/shared'
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared';

@Component({
  template: `
    <ng-container *featureFlag="'Appointment.View'">
      <ng-container *ngIf="vm$ | async as vm">
        <ui-data-list
          class="h-full w-full"
          [data]="vm.appointments"
          [columnDefs]="columnDefs"
          [validateFunc]="validateImportData"
          [createNewFunc]="createNewFunc"
          (searchQueryDidChange)="searchQueryDidChange($event)"
          (excelDataHasBeenPopulated)="excelDataHasBeenPopulated($event)"
          tableName="appointment"
          title="Appointment"
          [cardViewTemplate]="cardViewTemplate"
        ></ui-data-list>
      </ng-container>
    </ng-container>

    <ng-template #cardViewTemplate>
      <ui-formly-json-form
        class="w-full h-full"
        [formName]="'appointment_kanban_list'"
        [showSubmitButton]="false"
        [model]="model"
        [showFormSelector]="true"
        [componentStore]="cardAppointmentStore"
        [formData]="formData">
      </ui-formly-json-form>
    </ng-template>
`,
  providers: [
    WebAppointmentFeatureStore,
    WebLocationFeatureStore,
    WebPatientFeatureStore,
    WebClinicalProviderFeatureStore,
    WebLegalCaseFeatureStore,
    WebAppointmentStatusFeatureStore,
    WebVisitKindFeatureStore,
    {
      provide: 'cardAppointmentStore',
      useClass: WebAppointmentFeatureStore,
    },
],

})
export class WebAppointmentListComponent implements OnInit {
  @ViewChild(WebAppointmentSelectTableViewComponent) tableView: WebAppointmentSelectTableViewComponent

  formData = {
    appointments: this.store.formattedAppointments$,
    medicalRecordStatuses: this.store.medicalRecordStatuses$,
    cardAppointments: this.cardAppointmentStore.formattedAppointments$
  }

  model:any = {
    medicalRecordStatusId: ['clljxq1ah0004v06ond80lu5z'],
  }
  readonly vm$ = this.store.vm$.pipe(tap(vm => console.log(vm.appointments)));
  

  columnDefs: any[] = [{ field: 'location.name', headerName: 'Location', filter: 'agTextColumnFilter' },
{ field: 'patient.name', headerName: 'Patient', filter: 'agTextColumnFilter' },
{ field: 'clinicalProvider.name', headerName: 'Clinical Provider', filter: 'agTextColumnFilter' },
{ field: 'legalCase.name', headerName: 'Legal Case', filter: 'agTextColumnFilter' },
{ field: 'appointmentStatus.name', headerName: 'Appointment Status', filter: 'agTextColumnFilter' },
{ field: 'medicalRecordStatus.name', headerName: 'Medical Record Status', filter: 'agTextColumnFilter' },
{ field: 'visitKind.name', headerName: 'Visit Kind', filter: 'agTextColumnFilter' },

{ field: 'id', filter: 'agTextColumnFilter', hide:true },
{ field: 'createdAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.createdAt), hide:true },
{ field: 'updatedAt', filter: 'agDateColumnFilter' , cellClass: 'dateTime', valueFormatter: params => dateFormatter(params.data?.updatedAt), hide:true },
{ field: 'name', filter: 'agTextColumnFilter'  },
{ field: 'appointmentDateAndTime', filter: 'agDateColumnFilter'  },
{ field: 'locationId', filter: 'agTextColumnFilter', hide:true  },
{ headerName: 'Checked in', field: 'checkedIn', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'checkedInDateTime', filter: 'agDateColumnFilter'  },
{ headerName: 'MedicalReport', field: 'medicalReport.name', filter: 'agTextColumnFilter'  },
{ headerName: 'Bill', field: 'bill.name', filter: 'agTextColumnFilter'  },
{ headerName: 'Imaging', field: 'imaging.name', filter: 'agTextColumnFilter'  },
{
      headerName: 'Duration',
      field: 'duration',
      filter: 'agNumberColumnFilter',
      aggFunc: 'sum',
},
{ field: 'patientId', filter: 'agTextColumnFilter', hide:true},
{ field: 'clinicalProviderId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'legalCaseId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'appointmentStatusId', filter: 'agTextColumnFilter', hide:true  },
{ field: 'visitKindId', filter: 'agTextColumnFilter', hide:true  },

{ field: 'notes', filter: 'agTextColumnFilter'  },
{ field: 'recurringEventId', filter: 'agTextColumnFilter', hide:true  },
{ headerName: 'Is First Instance', field: 'isFirstInstance', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'description', filter: 'agTextColumnFilter'  },
{ field: 'start', filter: 'agTextColumnFilter'  },
{ field: 'end', filter: 'agTextColumnFilter'  },
{ headerName: 'All Day', field: 'allDay', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' },
{ field: 'recurrence', filter: 'agTextColumnFilter'  },
{ headerName: 'Final Visit Approved', field: 'finalVisitApproved', filter: 'agSetColumnFilter', cellRenderer: 'checkboxRenderer' }]

  constructor(
    public readonly store: WebAppointmentFeatureStore,
    private readonly locationFeatureStore: WebLocationFeatureStore,
private readonly patientFeatureStore: WebPatientFeatureStore,
private readonly clinicalProviderFeatureStore: WebClinicalProviderFeatureStore,
private readonly legalCaseFeatureStore: WebLegalCaseFeatureStore,
private readonly appointmentStatusFeatureStore: WebAppointmentStatusFeatureStore,
private readonly visitKindFeatureStore: WebVisitKindFeatureStore,
@Inject('cardAppointmentStore') private cardAppointmentStore: WebAppointmentFeatureStore,

  ) {
    this.validateImportData = this.validateImportData.bind(this)
    this.createNewFunc = this.createNewFunc.bind(this)
  }

 ngOnInit(): void {
    this.store.loadAppointmentsEffect()
    this.store.filterLocations('').subscribe()
    this.store.filterPatients('').subscribe()
    this.store.filterClinicalProviders('').subscribe()
    this.store.filterLegalCases('').subscribe()
    this.store.filterAppointmentStatuses('').subscribe()
    this.store.filterVisitKinds('').subscribe()
    this.cardAppointmentStore.setMedicalRecordStatusOptions(['clljxq1ah0004v06ond80lu5z'])

    this.cardAppointmentStore.loadAppointmentsEffect()
 }

  createNewFunc(type: string, newName: string) {
    return new Observable((observer) => {
      switch (type) {

        case 'location':
          {
            const locationCreateActionResultListener = this.locationFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addLocation(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                locationCreateActionResultListener.unsubscribe();
              }
            })
            this.locationFeatureStore.createLocationEffect({ name: newName });
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


        case 'appointmentStatus':
          {
            const appointmentStatusCreateActionResultListener = this.appointmentStatusFeatureStore.actionResult$.subscribe((result) => {
              if (result.done) {
                this.store.addAppointmentStatus(result.item)
                setTimeout(() => {
                  observer.next(true);
                  observer.complete();
                }, 300)
                appointmentStatusCreateActionResultListener.unsubscribe();
              }
            })
            this.appointmentStatusFeatureStore.createAppointmentStatusEffect({ name: newName });
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
    this.store.loadAppointmentsEffect()
  }
}
