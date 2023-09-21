/* eslint-disable @typescript-eslint/no-unused-vars */
import { Appointment, Document, WebCoreDataAccessService, DateFilterInput } from '@case-clinical/web/core/data-access'
import { addMinutesToTime, convertTo12HourFormat, getCalculateDurationWithNumberFormat, getDuration } from '@case-clinical/shared/util/helpers'
import { DatePipe } from '@angular/common'
import { FormService, ModalController } from '@case-clinical/web/ui/form'
import { FuseLoadingService } from '@fuse/services/loading/loading.service'
import { Inject, Injectable, Injector } from '@angular/core'
import { of, switchMap, tap, withLatestFrom } from 'rxjs'
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store'
import { tapResponse } from '@ngrx/component-store'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebClaimFeatureStore } from '@case-clinical/web/claim/shared'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { WebMedicalRecordFeatureStore } from '@case-clinical/web/medical-record/shared'
import { WebPrescriptionFeatureStore } from '@case-clinical/web/prescription/shared'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import * as moment from 'moment'
import printJS from 'print-js'
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer'

export interface DashboardState extends PatientBaseState {
  appointment?: Appointment
  loading: boolean
  query: string
  limit: number
  skip: number
  dateFilter?: DateFilterInput
  viewMode: 'List' | 'Calendar',
}

@Injectable()
export class DashboardStore extends PatientBaseStore<DashboardState> {
  billModalController?: ModalController
  imageModalController?: ModalController
  medicalReportModalController?: ModalController
  requestMoreVisitsModalController?: FormlyModalController
  appointmentViewModalController?: FormlyModalController

  constructor(
    @Inject('calendarAppointmentStore') private calendarAppointmentStore: WebAppointmentFeatureStore,
    @Inject('priorAppointmentStore') private priorAppointmentStore: WebAppointmentFeatureStore,
    @Inject('upcomingAppointmentStore') private upcomingAppointmentStore: WebAppointmentFeatureStore,
    injector: Injector,
    private appointmentStore: WebAppointmentFeatureStore,
    private claimStore: WebClaimFeatureStore,
    private clinicalProviderStore: WebClinicalProviderFeatureStore,
    private data: WebCoreDataAccessService,
    private documentStore: WebDocumentFeatureStore,
    private medicalRecordStore: WebMedicalRecordFeatureStore,
    private prescriptionStore: WebPrescriptionFeatureStore,
    private toast: WebUiToastService,
  ) {
    super(injector)

    this.claimStore.loadClaimsEffect()
    this.clinicalProviderStore.loadClinicalProvidersEffect();
    // Set Filters to Stores
    this.prescriptionStore.setLimit(10)
    this.medicalRecordStore.setLimit(10)
    this.appointmentStore.setLimit(10)

    this.priorAppointmentStore.setLimit(10);
    this.priorAppointmentStore.setDateFilter({ startDate: new Date(), operator: '<' });
    this.upcomingAppointmentStore.setLimit(10);
    this.upcomingAppointmentStore.setDateFilter({ startDate: new Date(), operator: '>=' });

  }

  prescriptionDetail$ = this.prescriptionStore.prescriptions$
  prescriptions$ = this.prescriptionDetail$.pipe(
    switchMap((prescriptionDetail) => {
      prescriptionDetail.sort((a, b) => Date.parse(b.dateWritten ?? '') - Date.parse(a.dateWritten ?? ''))
      return of(
        prescriptionDetail
      )
    }),
  )
  prescriptionsPaging$ = this.prescriptionStore.paging$
  clinicalProviders$ = this.clinicalProviderStore.clinicalProviders$;

  loading$ = this.select((s) => s.loading)
  skip$ = this.select(s => s.skip)
  limit$ = this.select(s => s.limit)
  dateFilter$ = this.select(s => s.dateFilter)
  viewMode$ = this.select(s => s.viewMode)
  appointment$ = this.select((s) => s.appointment)
  paging$ = this.prescriptionStore.paging$

  //Filter By Valid Status
  appointmentsAll$ = this.appointmentStore.appointments$
  .pipe(
    switchMap((appointments) => {
      return of(
        appointments.filter(
          (item) => {
            return item.appointmentStatus?.name == "Checked In" || item.appointmentStatus?.name == "Pending" || item.appointmentStatus?.name == "Confirmed" || item.appointmentStatus?.name == "Cancelled";
          }
        )
      )
    })
  )

  appointmentsDetail$ = this.appointmentsAll$.pipe(
    switchMap((appointmentsAll) => {
      return of(
        appointmentsAll.map((item) => {
          const dateObj = new Date(item.appointmentDateAndTime ?? '')
          const isValid = !isNaN(dateObj.getTime())
          return {
            ...item,
            mainSpecialty: item.clinicalProvider?.clinicalProviderSpecialties?.slice(0,5),
            profileImage: item.clinicalProvider?.profileImage,
            appDate: ((isValid) ? moment(dateObj).format('MM/DD/YYYY') : ''),
            appTime: ((isValid) ? ((item.appointmentDateAndTime ?? '').split(' '))[1] ?? '' : ''),
          }
        }),
      )
    }),
  )

  medicalRecordsAll$ = this.medicalRecordStore.medicalRecords$
  medicalRecords$ = this.medicalRecordsAll$.pipe(
    switchMap((medicalRecord) => {
      return of(
        medicalRecord.map((item) => {
          return {
            ...item,
            clinicalProviderSpecialties: item?.clinicalProvider?.clinicalProviderSpecialties?.slice(0,3)
          }
        })
      )
    }),
  )

  medicalRecordsPaging$ = this.medicalRecordStore.paging$;

  priorAppointments$ = this.select(this.priorAppointmentStore.formattedAppointments$, (appointments,) => {
    return appointments.map((appointment) => {
      return {
        ...appointment,
      }
    })
  });

  priorAppointmentsPaging$ = this.priorAppointmentStore.paging$;

  upcomingAppointments$ = this.select(this.upcomingAppointmentStore.formattedAppointments$,  (appointments, ) => {
    return appointments.map((appointment) => {
      return {
        ...appointment,
      }
    })
  });
  upcomingAppointmentsPaging$ = this.upcomingAppointmentStore.paging$;

  appointmentEvents$ = this.select(this.calendarAppointmentStore.formattedAppointments$, (appointments) => {
    
    return appointments.map(appointment => {
      if(!appointment?.end){
        appointment.end = addMinutesToTime(appointment.start?? "00:00",appointment.duration ?? 0)
      }
      return {
        ...appointment,
        id: appointment.id,
        start: new Date(`${moment(appointment.appointmentDateAndTime).format("MM-DD-yyyy")} ${appointment.start}`),
        end: new Date(`${moment(appointment.appointmentDateAndTime).format("MM-DD-yyyy")} ${appointment.end ?? '?'}`),
        title: `${appointment.clinicalProvider?.name} ${appointment.start} - ${appointment.end ?? '?'}`,
        data: appointment
      }
    }).filter(appointment =>appointment.appointmentDateAndTime && appointment.start && appointment.end > appointment.start)
  })


  claims$ = this.claimStore.claims$
  imagingPaging$ = this.appointmentStore.paging$

  attachment$ = this.documentStore.item$.pipe(
    tap((document) => {
      if (document && !document.attachment) {
        this.toast.error('Cannot find attachment file!', { duration: 2000 })
      }
    }),
  )

  vm$ = this.select(
    this.loading$,
    this.upcomingAppointments$,
    this.priorAppointments$,
    this.prescriptions$,
    this.medicalRecords$,
    this.claims$,
    this.user$,
    this.membership$,
    this.clinicalProviders$,
    this.appointmentsDetail$,
    this.appointmentEvents$,
    (loading, upcomingAppointments, priorAppointments, prescriptions, medicalRecords, claims, user, membership, clinicalProviders, appointments, appointmentEvents) => ({
      loading,
      upcomingAppointments,
      priorAppointments,
      prescriptions,
      medicalRecords,
      claims,
      user,
      membership,
      clinicalProviders,
      appointments,
      appointmentEvents,
    }),
  )
  /******* Selectors  ********/

  /******* Updaters *******/
  setAppointment = this.updater((state, appointment: Appointment) => {
    return { ...state, appointment }
  })
  setDateFilter = this.updater((state, dateFilter: DateFilterInput) => ({ ...state, dateFilter }))
  setViewMode = this.updater((state, viewMode: 'List' | 'Calendar') => ({ ...state, viewMode }))

  /******* Updaters *******/

  /****** Effects ******/

  loadAppoinmentsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom( this.viewMode$, this.skip$, this.limit$, this.dateFilter$),
    switchMap(([, viewMode, skip, limit, dateFilter]) => {

      if (viewMode === 'List') {
        this.appointmentStore.setDateFilter(undefined);
        this.appointmentStore.setLimit(limit);
        this.appointmentStore.setSkip(skip);

        this.priorAppointmentStore.setLimit(limit);
        this.priorAppointmentStore.setSkip(skip);
        this.upcomingAppointmentStore.setLimit(limit);
        this.upcomingAppointmentStore.setSkip(skip);

        this.upcomingAppointmentStore.loadAppointmentsEffect();
        this.priorAppointmentStore.loadAppointmentsEffect();
        


      } else if (viewMode === 'Calendar') {
        this.calendarAppointmentStore.setDateFilter(dateFilter);
        this.calendarAppointmentStore.setLimit(10000);
        this.calendarAppointmentStore.setSkip(0);
        this.calendarAppointmentStore.loadAppointmentsEffect();
        this.appointmentStore.setDateFilter(dateFilter);
        this.appointmentStore.setLimit(10000);
        this.appointmentStore.setSkip(0);
      }
      this.appointmentStore.loadAppointmentsEffect();

      return of(true);
    }
    )
  ))

  uploadMedicalReportEffect = this.effect<any>((model$) =>
    model$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      withLatestFrom(this.appointment$),
      switchMap(([model, appointment]) => {
        const { document } = model
        return this.data
          .userUpdateAppointment({
            appointmentId: appointment?.id as string,
            input: { medicalReport: document, name: appointment?.name },
          })
          .pipe(
            tapResponse(
              (resp) => {
                this.toast.success('Successfully uploaded medical report', { duration: 2000 })
                this.appointmentStore.updateAppointment(resp.data?.updated as any)
              },
              (errors: any) => {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 2000 })
              },
            ),
          )
      }),
    ),
  )

  uploadBillEffect = this.effect<any>((model$) =>
    model$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      withLatestFrom(this.appointment$),
      switchMap(([model, appointment]) => {
        const { document } = model
        return this.data
          .userUpdateAppointment({
            appointmentId: appointment?.id as string,
            input: { bill: document, name: appointment?.name },
          })
          .pipe(
            tapResponse(
              (resp) => {
                this.toast.success('Successfully uploaded bill document', { duration: 2000 })
                this.appointmentStore.updateAppointment(resp.data?.updated as any)
              },
              (errors: any) => {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 2000 })
              },
            ),
          )
      }),
    ),
  )

  uploadImageEffect = this.effect<any>((model$) =>
    model$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      withLatestFrom(this.appointment$),
      switchMap(([model, appointment]) => {
        const { document } = model
        return this.data
          .userUpdateAppointment({
            appointmentId: appointment?.id as string,
            input: { imaging: document, name: appointment?.name },
          })
          .pipe(
            tapResponse(
              (resp) => {
                this.toast.success('Successfully uploaded imaging document', { duration: 2000 })
                this.appointmentStore.updateAppointment(resp.data?.updated as any)
              },
              (errors: any) => {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 2000 })
              },
            ),
          )
      }),
    ),
  )

  printEffect = this.effect<string>((documentId$) =>
    documentId$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap((documentId) =>
        this.data.getDocument(documentId).pipe(
          tapResponse(
            (document: Document) => {
              if (!document.attachment) {
                this.toast.error('Cannot find attachment file!', { duration: 2000 })
                return
              }
              const base64String = document.attachment
              if (base64String) {
                const typeFlag = base64String.search('image')
                if (typeFlag > 0) {
                  const myWindow = window.open('', 'Image')
                  myWindow?.document.write("<img src='" + base64String + "''>")
                  myWindow?.print()
                } else {
                  const str = base64String.split('data:application/pdf;base64,')
                  const temp = str[1]
                  printJS({ printable: temp, type: 'pdf', base64: true })
                }
              }
            },
            () => {
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )

  downloadEffect = this.effect<string>((documentId$) =>
    documentId$.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap((documentId) =>
        this.data.getDocument(documentId).pipe(
          tapResponse(
            (doc: Document) => {
              if (!doc?.attachment) {
                this.toast.error('Cannot find attachment file!', { duration: 2000 })
                return
              }
              const base64String = doc?.attachment
              const fileName = doc?.name
              if (base64String) {
                const linkSource = base64String
                const downloadLink = document.createElement('a')
                downloadLink.href = linkSource
                downloadLink.download = fileName ?? 'noname'
                downloadLink.click()
              }
            },
            () => {
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )

  tabSelectionDidChange(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        this.upcomingAppointmentStore.loadAppointmentsEffect();
        this.priorAppointmentStore.loadAppointmentsEffect();
        break;
      case 1:
        this.prescriptionStore.setSkip(0);
        this.prescriptionStore.loadPrescriptionsEffect();
        break;
      case 2:
        this.medicalRecordStore.setSkip(0);
        this.medicalRecordStore.loadMedicalRecordsEffect();
        break;
      default:
        this.appointmentStore.setSkip(0);
        this.appointmentStore.loadAppointmentsEffect();
        break;
    }
  }

  setPriorAppointmentsSkip(skip: number) {
    this.priorAppointmentStore.setSkip(skip);
    this.priorAppointmentStore.loadAppointmentsEffect();
  }

  setUpcomingAppointmentsSkip(skip: number) {
    this.upcomingAppointmentStore.setSkip(skip);
    this.upcomingAppointmentStore.loadAppointmentsEffect();
  }

  setPrescriptionsSkip(skip: number) {
    this.prescriptionStore.setSkip(skip);
    this.prescriptionStore.loadPrescriptionsEffect();
  }

  setMedicalRecordsSkip(skip: number) {
    this.medicalRecordStore.setSkip(skip);
    this.medicalRecordStore.loadMedicalRecordsEffect();
  }

  setImagingSkip(skip: number) {
    this.appointmentStore.setSkip(skip);
    this.appointmentStore.loadAppointmentsEffect();
  }

  setMedicalReportModalController(controller: ModalController) {
    this.medicalReportModalController = controller
  }

  openMedicalReportDialog(appointment: Appointment) {
    this.setAppointment(appointment)
    this.medicalReportModalController?.open()
  }

  setBillModalController(controller: ModalController) {
    this.billModalController = controller
  }

  setRequestsModal(controller: FormlyModalController) {
    this.requestMoreVisitsModalController = controller;
  }

  setAppointmentViewModal(controller: FormlyModalController) {
    this.appointmentViewModalController = controller;
  }

  openRequestsModal(appointment: Appointment) {
    this.requestMoreVisitsModalController?.open(appointment, {}, {});
  }

  openAppointmentViewModal(appointment: Appointment) {
    this.patient$.subscribe((patient: any) => {
      this.appointmentViewModalController?.open({
        ...appointment,
        myLocation: {
          latitude: patient?.latitude ?? 0,
          longitude: patient?.longitude ?? 0,
        }
      }, {}, this);
    }).unsubscribe();
  }

  openBillReportDialog(appointment: Appointment) {
    this.setAppointment(appointment)
    this.billModalController?.open()
  }

  setImageModalController(controller: ModalController) {
    this.imageModalController = controller
  }

  openImageDialog(appointment: Appointment) {
    this.setAppointment(appointment)
    this.imageModalController?.open()
  }

  addPrescription(input: any) {
    const subscriber = this.prescriptionStore.actionResult$.subscribe(({ done }) => {
      if (done) subscriber.unsubscribe()
    })
    const { name, document, quantity, strength } = input
    this.prescriptionStore.createPrescriptionEffect({ name, document, quantity, strength })
  }

  loadDocumentDetails(documentId: string) {
    this.documentStore.loadDocumentEffect(documentId)
  }

  confirmAppointment(mode: 'upcoming' | 'prior', appointment: Appointment) {
    if(mode === 'upcoming') this.upcomingAppointmentStore.confirmAppointmentEffect(appointment);
    else if(mode === 'prior') this.priorAppointmentStore.confirmAppointmentEffect(appointment);
  }

  cancelAppointment(mode: 'upcoming' | 'prior' ,appointment: Appointment) {
    if(mode === 'upcoming') this.upcomingAppointmentStore.cancelAppointmentEffect(appointment);
    else if(mode === 'prior') this.priorAppointmentStore.cancelAppointmentEffect(appointment);
  }

  hideAppointment(appointment: Appointment) {
    this.appointmentStore.hideAppointmentEffect(appointment);
  }

  addMedicalRecord(input: any) {
    const subscriber = this.medicalRecordStore.actionResult$.subscribe(({ done }) => {
      if (done) subscriber.unsubscribe()
    })
    const { document, description, clinicalProviderId } = input;

    const getuserSubscriber = this.patient$.subscribe((patient)=>{
      if(patient){
        const name = `${new Date().toString()} ${clinicalProviderId} ${patient.id}`;
        this.medicalRecordStore.createMedicalRecordEffect({ name, document, description, clinicalProviderId })
        getuserSubscriber.unsubscribe();
      }
    })

  }

  viewModeDidChange(viewMode: 'List' | 'Calendar') {
    this.setViewMode(viewMode);
    this.loadAppoinmentsEffect();
  }

  dateFilterDidChange(dates: { start: Date, end: Date }) {
    const filter = {} as DateFilterInput;
    filter.startDate = dates.start;
    filter.endDate = dates.end;
    filter.operator = "In";

    this.calendarAppointmentStore.setDateFilter(filter);
    this.calendarAppointmentStore.loadAppointmentsEffect();
  }

  override getInitialState(): DashboardState {
    return {
      query: '',
      loading: false,
      skip: 0,
      limit: 10,
      viewMode: 'List',
      dateFilter: undefined,
    }
  }
}
