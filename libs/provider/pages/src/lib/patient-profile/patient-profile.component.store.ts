/* eslint-disable @typescript-eslint/member-ordering */
import { ActivatedRoute } from '@angular/router'
import { Appointment, WebCoreDataAccessService, Document } from '@case-clinical/web/core/data-access'
import { DateFilterInput } from '@case-clinical/web/core/data-access';
import { DatePipe } from '@angular/common'
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer'
import { getAge, addMinutesToTime } from '@case-clinical/shared/util/helpers'
import { Inject, Injectable, Injector, ChangeDetectorRef } from '@angular/core'
import { ModalController } from '@case-clinical/web/ui/form'
import { of, switchMap, tap, withLatestFrom } from 'rxjs'
import { ProcedureRequestModalStore, ProcedureRequestModalActionListener } from './procedure-request.modal.store';
import { ProviderBaseStore } from '../provider-page.base.store'
import { ReferralCreateModalStore } from './referral-create.modal.store';
import { tapResponse } from '@ngrx/component-store'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
import { WebAuthorizationFeatureStore } from '@case-clinical/web/authorization/shared'
import { WebAuthorizationTypeFeatureStore } from '@case-clinical/web/authorization-type/shared'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { WebMedicalRecordFeatureStore } from '@case-clinical/web/medical-record/shared'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebPrescriptionFeatureStore } from '@case-clinical/web/prescription/shared'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import * as moment from 'moment'
import printJS from 'print-js'
import { RecommendOrderModalActionListener, RecommendOrderModalStore } from './recommend-order.modal.store';
import { WebDiagnosisCodeFeatureStore } from '@case-clinical/web/diagnosis-code/shared';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';

export interface PatientProfileState {
  centerLatitude: string | undefined
  centerLongitude: string | undefined
  appointment?: Appointment
  loading: boolean
  query: string
  patientIdForRecOrder: string,
  selectedMrn?: string,
  dateFilter?: DateFilterInput
}

@Injectable()
export class PatientProfileStore extends ProviderBaseStore<PatientProfileState> implements ProcedureRequestModalActionListener, RecommendOrderModalActionListener {

  billModalController?: ModalController
  imageModalController?: ModalController
  medicalReportModalController?: ModalController
  svgCardModalController?: ModalController
  currentProviderId = ''

  private submitAuthorizationModalCtrl?: FormlyModalController

  /** DME-Related Modal Controllers **/
  private dmeModalCtrl?: FormlyModalController
  /** DME-Related Modal Controllers **/

  private imagingModalCtrl?: FormlyModalController
  private recOrderModalCtrl?: FormlyModalController
  private referralModalCtrl?: FormlyModalController
  private requestMoreVisitsModalCtrl?: FormlyModalController
  private procedureAuthorizationModalCtrl?: FormlyModalController
  private currentDateFilter?:DateFilterInput = {startDate:undefined,endDate:undefined, operator:'In'}

  constructor(
    @Inject('calendarAppointmentStore') private calendarAppointmentStore: WebAppointmentFeatureStore,
    @Inject('priorAppointmentStore') private priorAppointmentStore: WebAppointmentFeatureStore,
    @Inject('upcomingAppointmentStore') private upcomingAppointmentStore: WebAppointmentFeatureStore,

    injector: Injector,
    private authorizationTypeStore: WebAuthorizationTypeFeatureStore,
    private authorizationStore: WebAuthorizationFeatureStore,
    private data: WebCoreDataAccessService,
    private datePipe: DatePipe,
    private documentStore: WebDocumentFeatureStore,
    private medicalRecordStore: WebMedicalRecordFeatureStore,
    private patientStore: WebPatientFeatureStore,
    private prescriptionStore: WebPrescriptionFeatureStore,
    private readonly route: ActivatedRoute,
    private toast: WebUiToastService,
    private diagnosisCodeStore: WebDiagnosisCodeFeatureStore,
    private referralCreateStore: ReferralCreateModalStore,
    private procedureRequestStore: ProcedureRequestModalStore,
    private recommendOrderStore: RecommendOrderModalStore,
    private providerStore: WebClinicalProviderFeatureStore,
  ) {
    super(injector)

    this.procedureRequestStore.setListener(this);
    this.recommendOrderStore.setListener(this);

    if (this.route.snapshot.paramMap.has('patientId')) {
      const patientId = this.route.snapshot.paramMap.get('patientId') ?? ''
      // Select the first MRN when patient info is fetched
      const subscriber = this.patientStore.item$.subscribe((item) => {
        if(item) {
          subscriber.unsubscribe();
          const firstMrn = item?.legalCases?.at(0);
          if(firstMrn) {
            this.patchState({
              selectedMrn: firstMrn.id as string
            })
          }
        }
      });
      this.patientStore.loadPatientEffect(patientId)
    }

    this.authorizationStore.loadAuthorizationsEffect()
    this.authorizationTypeStore.loadAuthorizationTypesEffect();

    this.selectedProviderId$.subscribe((value) => {
      this.currentProviderId = value
    })

    // Set Filters to Stores
    this.prescriptionStore.setLimit(10);
    this.medicalRecordStore.setLimit(10);

    // Set Filters to Appointment Stores
    this.priorAppointmentStore.setDateFilter({ startDate: new Date(), operator: '<' });
    this.upcomingAppointmentStore.setDateFilter({ startDate: new Date(), operator: '>=' });
    this.priorAppointmentStore.setLimit(10);
    this.upcomingAppointmentStore.setLimit(10);
    const addressFilter = localStorage.getItem('addressFilter');
    this.referralCreateStore.setCenterLatitude(addressFilter?JSON.parse(addressFilter)['lat']:undefined);
    this.referralCreateStore.setCenterLongitude(addressFilter?JSON.parse(addressFilter)['lng']:undefined);
    this.diagnosisCodeStore.loadDiagnosisCodesEffect();
    this.providerStore.loadClinicalProvidersEffect()
  }

  providerOptionsForFilter$ = this.select(
    this.providerStore.clinicalProviders$,
    (clinicalProviders) => {
      const options = clinicalProviders?.map((clinicalProvider) => {
        const { id, name } = clinicalProvider;
        return {
          id, name,
        }
      });
      return [
        {
          id: "all",
          name: 'All'
        },
        ...options
      ]
    })

  appointment$ = this.select((s) => s.appointment)
  selectedMrn$ = this.select((s) => s.selectedMrn)
  loading$ = this.select((s) => s.loading)
  dateFilter$ = this.select(s => s.dateFilter)

  prescriptions$ = this.prescriptionStore.prescriptions$
  prescriptionsPaging$ = this.prescriptionStore.paging$;
  medicalRecords$ = this.select(this.medicalRecordStore.medicalRecords$, (medicalRecords) => {
    const tempData = medicalRecords
    tempData.sort((first, second) => {
      if (moment(first.createdAt).diff(moment(second.createdAt)) < 0) return 1
      else return -1
    })
    return tempData.map((medicalRecord) => {
      return {
        ...medicalRecord,
        createdAt: this.datePipe.transform(medicalRecord.createdAt, 'MM/dd/yyyy', 'UTC') ?? '',
      }
    })
  })

  /** DME-Related Selectors **/
  authorizationTypes$ = this.authorizationTypeStore.authorizationTypes$;
  authorizations$ = this.authorizationStore.authorizations$;
  authorizationUpdateData$ = this.select(this.authorizations$, (authorizations) => {
    return authorizations?.map((authorization) => {
      const { id, name, unit, durationOrQuantity } = authorization;
      return {
        id, name, unit, durationOrQuantity
      }
    })
  })
  /** DME-Related Selectors **/
  centerLongitude$ = this.select((s) => s.centerLongitude)
  centerLatitude$ = this.select((s) => s.centerLatitude)
  medicalRecordsPaging$ = this.medicalRecordStore.paging$;

  patient$ = this.select(this.patientStore.item$, (patientDetail) => {
    let avatarUrl = undefined
    if (patientDetail?.users && patientDetail?.users.length > 0) avatarUrl = patientDetail?.users[0]?.avatarUrl
    const age = getAge(patientDetail?.dateOfBirth ?? new Date())
    return {
      ...patientDetail,
      age,
      avatarUrl,
      gender: patientDetail?.gender?.name ? patientDetail?.gender?.name : '',
    }
  })

  mrns$ = this.select(this.patient$, (patient) => patient.legalCases?.map((legalCase) => ({ id: legalCase.id, mrn: legalCase.medicalRecordNumber })))

  legalCase$ = this.select(this.patient$, this.selectedMrn$, (patient, selectedMrn) => {
    const legalCase = patient?.legalCases?.find((el) => el.id === selectedMrn);
    console.log(legalCase);
    return legalCase;
  })

  // Appointments Related Selectors
  priorAppointments$ = this.select(this.priorAppointmentStore.formattedAppointments$, this.patient$, (appointments, patient) => {
    return appointments.map((appointment) => {
      return {
        ...appointment,
        patientLocation: {
          latitude: patient?.latitude,
          longitude: patient?.longitude,
        }
      }
    })
  });
  priorAppointmentsPaging$ = this.priorAppointmentStore.paging$;
  upcomingAppointments$ = this.select(this.upcomingAppointmentStore.formattedAppointments$, this.patient$, (appointments, patient) => {
    return appointments.map((appointment) => {
      return {
        ...appointment,
        patientLocation: {
          latitude: patient?.latitude,
          longitude: patient?.longitude,
        }
      }
    })
  });
  upcomingAppointmentsPaging$ = this.upcomingAppointmentStore.paging$;
  appointmentEvents$ = this.select(this.calendarAppointmentStore.formattedAppointments$, (appointments) => {
    const events: any[] = [];
    appointments.forEach(appointment => {
      if (!appointment?.end) {
        appointment.end = addMinutesToTime(appointment.start ?? "0:0", appointment.duration ?? 0)
      }
      if (appointment.appointmentDateAndTime && appointment.start && appointment.end > appointment.start) {
        events.push({
          id: appointment.id,
          start: new Date(`${moment(appointment.appointmentDateAndTime).format("MM-DD-yyyy")} ${appointment.start}`),
          end: new Date(`${moment(appointment.appointmentDateAndTime).format("MM-DD-yyyy")} ${appointment.end ?? '?'}`),
          title: `${appointment.clinicalProvider?.name} ${appointment.start} - ${appointment.end ?? '?'}`,
          data: appointment
        });
      }
    });
    return events;
  })

  diagnosisCodes$ = this.select( this.diagnosisCodeStore.diagnosisCodes$, (diagnosisCodes) => {
    return diagnosisCodes.map((diagnosisCode) => {
      return {
        id: diagnosisCode.id,
        title: diagnosisCode?.name
      }
    });
  });

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
    this.appointmentEvents$,
    this.prescriptions$,
    this.medicalRecords$,
    this.patient$,
    this.legalCase$,
    (
      loading,
      upcomingAppointments,
      priorAppointments,
      appointmentEvents,
      prescriptions,
      medicalRecords,
      patient,
      legalCase,
    ) => {
      return ({
        loading,
        upcomingAppointments,
        priorAppointments,
        prescriptions,
        medicalRecords,
        patient,
        appointmentEvents,
        legalCase,
      })
    }
  )

  setDateFilter = this.updater((state, dateFilter: DateFilterInput) => ({ ...state, dateFilter }))

  setAppointment = this.updater((state, appointment: Appointment) => {
    return { ...state, appointment }
  })

  readonly setCenterLatitude = this.updater((state, centerLatitude: any) => ({
    ...state,
    centerLatitude: centerLatitude.toString(),
  }))

  readonly setSelectedMrn = this.updater((state, selectedMrn: string) => ({
    ...state,
    selectedMrn,
  }))

  readonly setCenterLongitude = this.updater((state, centerLongitude: any) => ({
    ...state,
    centerLongitude: centerLongitude.toString(),
  }))
  setPatientIdForRecOrder = this.updater((state, patientIdForRecOrder: string) => ({ ...state, patientIdForRecOrder }))

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
              () => {
                this.toast.success('Successfully uploaded medical report', { duration: 2000 })
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
              () => {
                this.toast.success('Successfully uploaded bill document', { duration: 2000 })
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
              () => {
                this.toast.success('Successfully uploaded imaging document', { duration: 2000 })
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
              if (!document?.attachment) {
                this.toast.error('Cannot find attachment file!', { duration: 2000 })
                return
              }
              const base64String = document?.attachment
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
        break;
      case 1:
        this.upcomingAppointmentStore.loadAppointmentsEffect();
        this.priorAppointmentStore.loadAppointmentsEffect();
        break;
      case 2:
        this.prescriptionStore.setSkip(0);
        this.prescriptionStore.loadPrescriptionsEffect();
        break;
      case 3:
        this.medicalRecordStore.setSkip(0);
        this.medicalRecordStore.loadMedicalRecordsEffect();
        break;
      default:
        break;
    }
  }

  dateFilterDidChange(dates: { start: Date, end: Date }) {
    const filter = {} as DateFilterInput;
    filter.startDate = dates.start;
    filter.endDate = dates.end;
    filter.operator = "In";

    this.calendarAppointmentStore.setDateFilter(filter);
    this.calendarAppointmentStore.loadAppointmentsEffect();
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

  setSvgCardModalController(controller: ModalController) {
    this.svgCardModalController = controller
  }

  openSvgCardDialog() {
    this.svgCardModalController?.open()
  }



  setSubmitAuthorizationModalCtrl(controller: FormlyModalController) {
    this.submitAuthorizationModalCtrl = controller
  }

  setImagingModalCtrl(controller: FormlyModalController) {
    this.imagingModalCtrl = controller
  }

  setRequestMoreVisitsModalCtrl(controller: FormlyModalController) {
    this.requestMoreVisitsModalCtrl = controller
  }

  /** Procedure Request */
  setProcedureAuthorizationModalCtrl(controller: FormlyModalController) {
    this.procedureAuthorizationModalCtrl = controller
  }

  openProcedureAuthorizationModalCtrl() {
    this.vm$.subscribe(({ patient, legalCase }) => {
      this.procedureAuthorizationModalCtrl?.open({
        patientName: patient?.name,
        patientId: patient?.id,
        legalCaseId: legalCase?.id,
        mrn: legalCase?.medicalRecordNumber,
        status: 'Pending'
      }, {
        providers: this.providers$,
      }, this.procedureRequestStore)
    }).unsubscribe();
  }

  procedureRequestModalActionCompleted(): void {
    this.procedureAuthorizationModalCtrl?.close();
  }
  /** Procedure Request */

  /** Recommended Order */
  setRecOrderModalCtrl(controller: FormlyModalController) {
    this.recOrderModalCtrl = controller
  }

  openRecOrderModalCtrl() {
    this.vm$.subscribe(({ patient, legalCase }) => {
      this.recOrderModalCtrl?.open({
        patientId: patient?.id,
        legalCaseId: legalCase?.id,
        dol: legalCase?.dateOfLoss,
        patientName: patient?.name,
        patientDob: patient?.dateOfBirth,
        mrn: legalCase?.medicalRecordNumber,
        status: 'Pending',
      }, {
        providers: this.providers$,
        diagnosisCodes: this.diagnosisCodes$
      }, this.recommendOrderStore)
    }).unsubscribe();
  }

  RecommendOrderModalActionCompleted(): void {
    this.recOrderModalCtrl?.close();
  }
  /** Recommended Order */

  setReferralModalCtrl(controller: FormlyModalController) {
    this.referralModalCtrl = controller
  }

  openReferralModalCtrl() {
    // Wait for referral create api result
    const referralCreateSubscriber = this.referralCreateStore.created$.subscribe((created) => {
      if(created) {
        this.referralModalCtrl?.close();
        referralCreateSubscriber.unsubscribe();
      }
    })
    const queryFilter = localStorage.getItem('queryFilter');
    const distanceFilter = localStorage.getItem('distanceFilter');
    const addressFilter = localStorage.getItem('addressFilter');
    const specialtyFilter = localStorage.getItem('specialtyFilter');
    this.referralCreateStore.setModalCtrl(this.referralModalCtrl)
    this.vm$.subscribe(({ patient, legalCase }) => {
      if (patient) {
        const formattedDate = moment(new Date()).format('DD/MMMM/yyyy hh:mm:ss')
        this.referralModalCtrl?.open(
          {
            patientName: patient.name,
            patientId: patient.id,
            status: 'Pending',
            legalCaseName: legalCase?.name,
            legalCaseId: legalCase?.id,
            referredToId: "",
            centerLocation: addressFilter?JSON.parse(addressFilter):undefined,
            providerName:queryFilter,
            distance:distanceFilter?distanceFilter:"15",
            doctorsCount:0,
            multiSelect:(specialtyFilter?.split(",")[0] == "" ? [] : specialtyFilter?.split(",")),
            centerlatitude:addressFilter?JSON.parse(addressFilter)['lat']:undefined,
            centerlongitude:addressFilter?JSON.parse(addressFilter)['lng']:undefined,
            name: `${patient.name ? `${patient.name}` : ''} ${legalCase?.name ? `on ${legalCase?.name}` : ''} ${formattedDate ? `on ${formattedDate}` : ''
              }`,
          },
          {
            specialties: this.referralCreateStore.specialties$,
            providerLocations: this.referralCreateStore.mapProviderLocations$,
            providers: this.providers$,
          },
          this.referralCreateStore,
        )
      }
    }).unsubscribe();
  }

  /** BEGIN DME  **/
  /**
   * Set DME Modal Controller
   * @param controller
   */
  setDmeModalCtrl(controller: FormlyModalController) {
    this.dmeModalCtrl = controller
  }

  /**
   * Open DME Modal
   */
  openDmeModalCtrl() {
    const formState = {
      authorizations: this.authorizations$,
    }
    this.dmeModalCtrl?.open({}, formState, this)
  }

  /**
   * Increate Quantity of Authorization
   * @param authorizationId
   */
  increaseAuthorizationQuantity(authorizationId: string) {
    //this.authorizationStore.increaseAuthorizationQuantity(authorizationId);
  }

  /**
   * Decreate Quantity of Authorization
   * @param authorizationId
   */
  decreaseAuthorizationQuantity(authorizationId: string) {
    //this.authorizationStore.decreaseAuthorizationQuantity(authorizationId);
  }

  /**
   * Save Increased/Decreased Authorization Quantities To DB
   */
  updateAuthorizationsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.authorizationUpdateData$),
    switchMap(([, authorizationUpdateData]) => {
      console.log(authorizationUpdateData);
      //this.authorizationStore.updateAuthorizationsEffect(authorizationUpdateData)
      return of(true);
    }
    )
  ))
  /** END DME  **/

  filterByProvider(providerId: string) {
    this.medicalRecordStore.setClinicalProviderId(providerId=='all'?undefined:providerId)
    this.medicalRecordStore.setSkip(0);
    this.medicalRecordStore.loadMedicalRecordsEffect();
  }

  filterByName(name: string) {
    this.medicalRecordStore.setSearchQuery(name)
    this.medicalRecordStore.setSkip(0);
    this.medicalRecordStore.loadMedicalRecordsEffect();
  }

  filterByStartDate(value:Date){
    value = ((value==null || value==undefined)?new Date('1970-01-01T00:00:00Z'):value);
    this.currentDateFilter = {...this.currentDateFilter,startDate:value};
    console.log('currentDateFilter', this.currentDateFilter)
    
    this.medicalRecordStore.setDateFilter(this.currentDateFilter)
    this.medicalRecordStore.setSkip(0);
    this.medicalRecordStore.loadMedicalRecordsEffect();
    
  }

  filterByEndDate(value:Date){
    value = ((value==null || value==undefined)?new Date('2099-12-31T23:59:59Z'):value);

    this.currentDateFilter = {...this.currentDateFilter, startDate:((this.currentDateFilter?.startDate==null || this.currentDateFilter?.startDate==undefined)?new Date('1970-01-01T00:00:00Z'):this.currentDateFilter?.startDate),endDate:value};
    console.log('currentDateFilter', this.currentDateFilter, value);
    this.medicalRecordStore.setDateFilter(this.currentDateFilter);
    this.medicalRecordStore.setSkip(0);
    this.medicalRecordStore.loadMedicalRecordsEffect();
    
  }

  openSubmitAutorizationModalCtrl() {
    this.submitAuthorizationModalCtrl?.open({}, {}, this)
  }

  openImagingModalCtrl() {
    this.imagingModalCtrl?.open({}, {}, this)
  }

  openRequestMoreVisitsModalCtrl() {
    this.requestMoreVisitsModalCtrl?.open({}, {}, this)
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

  addMedicalRecord(input: any) {
    const subscriber = this.medicalRecordStore.actionResult$.subscribe(({ done }) => {
      if (done) subscriber.unsubscribe()
    })
    const { clinicalProviderId, document, description } = input
    this.patient$.subscribe((patient) => {
      const name = clinicalProviderId + new Date().valueOf().toString() + patient.id
      this.medicalRecordStore.createMedicalRecordEffect({ name, document, clinicalProviderId, description })
    })
  }

  addImaging(input: any) {
    const subscriber = this.medicalRecordStore.actionResult$.subscribe(({ done }) => {
      if (done) subscriber.unsubscribe()
    })
    const { clinicalProviderId, document, description } = input
    this.patient$.subscribe((patient) => {
      const name = clinicalProviderId + new Date().valueOf().toString() + patient.id
      this.medicalRecordStore.createMedicalRecordEffect({ name, document, clinicalProviderId, description })
    })
  }

  checkInAppointment(mode: 'upcoming' | 'prior', appointment: Appointment) {
    if (mode === 'upcoming') this.upcomingAppointmentStore.checkInAppointmentEffect(appointment);
    else if (mode === 'prior') this.priorAppointmentStore.checkInAppointmentEffect(appointment);
  }

  hideAppointment(mode: 'upcoming' | 'prior', appointment: Appointment) {
    if (mode === 'upcoming') this.upcomingAppointmentStore.hideAppointmentEffect(appointment);
    else if (mode === 'prior') this.priorAppointmentStore.hideAppointmentEffect(appointment);
  }

  getInitialState(): PatientProfileState {
    return {
      query: '',
      loading: false,
      centerLatitude: undefined,
      centerLongitude: undefined,
      patientIdForRecOrder:''
    }
  }
  override setAppointmentViewModalController(controller: FormlyModalController) {
    super.setAppointmentViewModalController(controller)
  }

  override setRequestsMoreVisitsModalController(controller: FormlyModalController) {
    super.setRequestsMoreVisitsModalController(controller)
  }

  override openAppointmentViewModal(appointment: Appointment) {
    super.openAppointmentViewModal(appointment)
  }

  override openRequestsMoreVisitsModal(appointment: Appointment) {
    super.openRequestsMoreVisitsModal(appointment)
  }


}
