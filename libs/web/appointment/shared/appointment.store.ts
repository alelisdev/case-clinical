import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { EMPTY, of } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AppointmentService } from './appointment.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import {
  UserCreateAppointmentInput,
  UserUpdateAppointmentInput,
  WebCoreDataAccessService,
  CorePaging,
  Appointment,
  Location,
  Patient,
  ClinicalProvider,
  LegalCase,
  AppointmentStatus,
  DateFilterInput,
  VisitKind,
} from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { convertTo12HourFormat } from '@case-clinical/shared/util/helpers'
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer'

export const appointmentStatusColorMap: Record<string, string> = {
  'Pending': "#ffbc03",
  'Checked In': "#49c204",
  'Claim Submitted': "#50fe93",
  'Approved': 'green',
  'Rejected':"red",
  'Rescheduled':"#ffbc03",
  'Personal':'orange',
  'Provider Paid': "blue",
  'No Showed': "#ff1d1a",
  'Confirmed': "#49c204",
  'Processing': "#50fe93",
  'Cancelled': "red",
}

export const appointmentStatusIconMap: Record<string, string> = {
  'Pending': "assets/icons/pending.png",
  'Checked In': "assets/icons/checkedin.png",
  'Rescheduled':"assets/icons/rescheduled.png",
  'No Showed': "assets/icons/noshow.png",
  'Confirmed': "assets/icons/confirmed.png",
  'Cancelled': "assets/icons/cancel.png",
  'Approved': 'assets/icons/pending.png',
  'Rejected':"assets/icons/pending.png",
  'Personal':'assets/icons/pending.png',
  'Processing': "assets/icons/pending.png",
  'Provider Paid': "assets/icons/pending.png",
  'Claim Submitted': "assets/icons/pending.png",
}

export interface AppointmentFeatureState {
  errors?: any
  loading?: boolean
  item?: Appointment
  done: boolean
  formName?: string
  id?: string
  locationId?: string
  patientId?: string
  attorneyId?: string
  firmId?: string
  clinicalProviderId?: string
  legalCaseId?: string
  appointmentStatusId?: string | undefined
  visitKindId?: string

  appointments: Appointment[]
  locations?: Location[]
  appointmentCount?: any
  patients?: Patient[]
  clinicalProviders?: ClinicalProvider[]
  legalCases?: LegalCase[]
  appointmentStatuses?: AppointmentStatus[]
  visitKinds?: VisitKind[]

  searchQuery?: string
  paging?: CorePaging
  dateFilter?: DateFilterInput | undefined
  medicalRecordStatusId: string | undefined
  medicalRecordStatusOptions: string[] |undefined
}

@Injectable()
export class WebAppointmentFeatureStore extends ComponentStore<AppointmentFeatureState> {

  private assignUserModalCtrl?: FormlyModalController;
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly appointmentService: AppointmentService,
  ) {
    super({
      loading: false,
      appointments: [],
      done: false,
      searchQuery: '',
      id: undefined,
      formName: undefined,
      locationId: undefined,
      patientId: undefined,
      clinicalProviderId: undefined,
      attorneyId: undefined,
      firmId: undefined,
      legalCaseId: undefined,
      appointmentStatusId: undefined,
      visitKindId: undefined,
      medicalRecordStatusId:undefined,
      medicalRecordStatusOptions:undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })


    if (this.route.snapshot.paramMap.has('appointmentId')) {
      const appointmentId = this.route.snapshot.paramMap.get('appointmentId')
      this.setId(appointmentId)
      this.setFormName('appointment_edit')
    } else {
      this.setFormName('appointment_create')
    }

    if (this.route.snapshot.paramMap.has('locationId')) {
      const locationId = this.route.snapshot.paramMap.get('locationId')
      this.setLocationId(locationId)
    }

    if (this.route.snapshot.paramMap.has('patientId')) {
      const patientId = this.route.snapshot.paramMap.get('patientId')
      this.setPatientId(patientId)
    }

    if (this.route.snapshot.paramMap.has('clinicalProviderId')) {
      const clinicalProviderId = this.route.snapshot.paramMap.get('clinicalProviderId')
      this.setClinicalProviderId(clinicalProviderId)
    }

    if (this.route.snapshot.paramMap.has('legalCaseId')) {
      const legalCaseId = this.route.snapshot.paramMap.get('legalCaseId')
      this.setLegalCaseId(legalCaseId)
    }

    if (this.route.snapshot.paramMap.has('appointmentStatusId')) {
      const appointmentStatusId = this.route.snapshot.paramMap.get('appointmentStatusId')
      this.setAppointmentStatusId(appointmentStatusId)
    }

    if (this.route.snapshot.paramMap.has('visitKindId')) {
      const visitKindId = this.route.snapshot.paramMap.get('visitKindId')
      this.setVisitKindId(visitKindId)
    }

    if (this.route.snapshot.paramMap.has('attorneyId')) {
      const attorneyId = this.route.snapshot.paramMap.get('attorneyId')
      this.setAttorneyId(attorneyId)
    }

    if (this.route.snapshot.paramMap.has('firmId')) {
      const firmId = this.route.snapshot.paramMap.get('firmId')
      this.setFirmId(firmId)
    }


  }

  readonly  medicalRecordStatuses$ = this.data.userMedicalRecordStatuses({ input: {  } }).pipe(switchMap((res) =>
  {
    return of(res.data.items?.map((medicalRecordStatus) => {
      return {
        id:medicalRecordStatus?.id, title:medicalRecordStatus?.name,
      }
    }).filter(f=>(f.title!="Test Status" && f.title!="Medical Records Complete")));
  }))

  readonly dateFilter$ = this.select((s) => s.dateFilter)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => {
    return {
      ...s.item,
      firstSpecialty: s.item?.clinicalProvider?.clinicalProviderSpecialties?.at(0),
      color: s.item?.appointmentStatus ? appointmentStatusColorMap[s.item.appointmentStatus.name] : 'red',
    }
  });
  readonly appointments$ = this.select((s) => s.appointments)
  readonly locations$ = this.select((s) => s.locations || [])
  readonly patients$ = this.select((s) => s.patients || [])
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly appointmentStatuses$ = this.select((s) => s.appointmentStatuses || [])
  readonly visitKinds$ = this.select((s) => s.visitKinds || [])

  readonly locationId$ = this.select((s) => s.locationId)

  readonly patientId$ = this.select((s) => s.patientId)
  readonly attorneyId$ = this.select((s) => s.attorneyId)
  readonly firmId$ = this.select((s) => s.firmId)
  readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

  readonly legalCaseId$ = this.select((s) => s.legalCaseId)
  readonly appointmentCount$ = this.select((s) => s.appointmentCount)

  readonly appointmentStatusId$ = this.select((s) => s.appointmentStatusId)
  readonly medicalRecordStatusId$ = this.select((s) => s.medicalRecordStatusId)
  readonly medicalRecordStatusOptions$ = this.select((s)=>s.medicalRecordStatusOptions)
  readonly visitKindId$ = this.select((s) => s.visitKindId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$, (item, done) => ({ item, done }), { debounce: true })

  // Further Processed Appointment List
  readonly formattedAppointments$ = this.select(this.appointments$, (appointments) => {
    return appointments.map((appointment) => {
      let timeAndDuration = '- -(-min)'
      if (appointment.start) {
        let duration = appointment.duration || '0 min';
        if (appointment.duration) {
          if (appointment.duration < 60) {
            duration = `${appointment.duration}min`
          } else {
            if (appointment.duration > 60) duration = Math.floor(appointment.duration / 60) + 'h ' + (appointment.duration % 60) + 'min'
            if (appointment.duration % 60 === 0) duration = Math.floor(appointment.duration / 60) + 'h'
          }
        }
        timeAndDuration = `${convertTo12HourFormat(appointment.start)} (${duration})`;
      }

      const otherActions = [
        {
          title: 'View'
        },
        {
          title: 'Edit'
        },
      ]

      if(appointment.appointmentStatus?.name !== 'No Showed') {
        otherActions.unshift({
          title: 'No Show'
        })
      }

      let canRequestVisits = false
      const arr = appointment.clinicalProvider?.clinicalProviderSpecialties

      arr?.forEach((item) => {
        if (item.specialty?.name === 'Chiropractor' || item?.name === 'Home Health') canRequestVisits = true
      })

      if(canRequestVisits) {
        otherActions.push({
          title: 'Request More Visits'
        })
      }

      return {
        ...appointment,
        timeAndDuration,
        canRequestVisits,
        otherActions,
        providerImage: appointment.clinicalProvider?.profileImage?.id,
        firstSpecialty: appointment.clinicalProvider?.clinicalProviderSpecialties?.at(0),
        patientImage: (appointment.patient?.users != null && appointment.patient?.users != undefined) ? appointment.patient?.users[0]?.avatarUrl : '',
        providerSpecialties: appointment.clinicalProvider?.clinicalProviderSpecialties,
        color: appointment.appointmentStatus ? (appointmentStatusColorMap[appointment.appointmentStatus.name] ?? "red") : 'red',
        icon: appointment.appointmentStatus ? (appointmentStatusIconMap[appointment.appointmentStatus.name] ?? 'assets/icons/rescheduled.png' ) : 'assets/icons/rescheduled.png',
      }
    })
  })

  readonly formattedAppointmentsForProvider$ = this.select(this.formattedAppointments$, (appointments) => {
    return appointments.map((appointment) => {
      const actions = [
        {
          title: 'Check In',
          color:  appointmentStatusColorMap['Checked In'] ?? 'red',
          icon: appointmentStatusIconMap['Checked In'],
        },
        {
          title: 'Cancel',
          color:  appointmentStatusColorMap['Cancelled'] ?? 'red',
          icon: appointmentStatusIconMap['Cancelled']
        },
        {
          title: 'No Show',
          color:  appointmentStatusColorMap['No Showed'] ?? 'red',
          icon: appointmentStatusIconMap['No Showed']
        },
      ]

      return {
        ...appointment,
        actions,
        canChangeStatus: true,
      }
    })
  })

  readonly formattedAppointmentsForPatient$ = this.select(this.formattedAppointments$, (appointments) => {
    return appointments.map((appointment) => {
      const possibleActions = {
        'Pending': [
          {
            title: 'Confirm',
            color:  appointmentStatusColorMap['Confirmed'] ?? 'red',
            icon: appointmentStatusIconMap['Confirmed']
          },
          {
            title: 'Cancel',
            color:  appointmentStatusColorMap['Cancelled'] ?? 'red',
            icon: appointmentStatusIconMap['Cancelled']
          },
        ],
        'Checked In': [

        ],
        'Rescheduled': [
          {
            title: 'Confirm',
            color:  appointmentStatusColorMap['Confirmed'] ?? 'red',
            icon: appointmentStatusIconMap['Confirmed']
          },
          {
            title: 'Cancel',
            color:  appointmentStatusColorMap['Cancelled'] ?? 'red',
            icon: appointmentStatusIconMap['Cancelled']
          },
        ],
        'No Showed': [],
        'Confirmed': [

        ],
        'Cancelled': [
          // {
          //   title: 'Request Reschedule',
          //   color:  appointmentStatusColorMap['Rescheduled'] ?? 'red',
          //   icon: appointmentStatusIconMap['Rescheduled'],
          // }
        ],
      }
      const statusChangeActions = appointment.appointmentStatus ? possibleActions[appointment.appointmentStatus.name] : [];

      return {
        ...appointment,
        actions: statusChangeActions,
        canChangeStatus: statusChangeActions.length > 0,
      }
    })
  })

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.item$,
    this.formName$,
    this.formattedAppointments$,
    this.locations$,
    this.patients$,
    this.clinicalProviders$,
    this.legalCases$,
    this.appointmentStatuses$,
    this.visitKinds$,
    this.medicalRecordStatuses$,
    (
      errors,
      loading,
      item,
      formName,
      appointments,
      locations,
      patients,
      clinicalProviders,
      legalCases,
      appointmentStatuses,
      visitKinds,
      medicalRecordStatuses
    ) => ({
      errors,
      loading,
      item,
      formName,
      appointments,

      locations,
      patients,
      clinicalProviders,
      legalCases,
      appointmentStatuses,
      visitKinds,
      medicalRecordStatuses
    }),
    { debounce: true },
  )

  readonly input$ = this.select(
    this.paging$,
    this.locationId$,
    this.dateFilter$,
    this.patientId$,
    this.clinicalProviderId$,
    this.legalCaseId$,
    this.appointmentStatusId$,
    this.visitKindId$,

    this.searchQuery$,
    this.attorneyId$,
    this.firmId$,
    this.medicalRecordStatusId$,
    this.medicalRecordStatusOptions$,
    (
      paging,
      locationId,
      dateFilter,
      patientId,
      clinicalProviderId,
      legalCaseId,
      appointmentStatusId,
      visitKindId,
      searchQuery,
      attorneyId,
      firmId,
      medicalRecordStatusId,
      medicalRecordStatusOptions
    ) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      locationId: locationId,
      patientId: patientId,
      clinicalProviderId: clinicalProviderId,
      legalCaseId: legalCaseId,
      appointmentStatusId: appointmentStatusId,
      visitKindId:visitKindId,
      total: paging.total,
      attorneyId: attorneyId,
      firmId: firmId,
      dateFilter,
      medicalRecordStatusId:medicalRecordStatusId,
      medicalRecordStatusOptions:medicalRecordStatusOptions
    }),
  )

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))

  readonly setAttorneyId = this.updater((state, attorneyId: string | undefined) => ({
    ...state,
    attorneyId,
  }))

  readonly setProviderId = this.updater((state, providerId: string | undefined) => ({
    ...state,
    providerId,
  }))

  readonly setFirmId = this.updater((state, firmId: string) => ({
    ...state,
    firmId,
  }))

  readonly setLocationId = this.updater((state, locationId: string | undefined) => ({
    ...state,
    locationId,
  }))

  readonly setId = this.updater((state, id: string | undefined) => ({
    ...state,
    id,
  }))

  readonly setPatientId = this.updater((state, patientId: string) => ({
    ...state,
    patientId,
  }))

  readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string | undefined) => ({
    ...state,
    clinicalProviderId,
  }))

  readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
    ...state,
    legalCaseId,
  }))

  readonly setAppointmentStatusId = this.updater((state, appointmentStatusId: string | undefined) => ({
    ...state,
    appointmentStatusId,
  }))

  readonly setMedicalRecordStatusId = this.updater((state, medicalRecordStatusId: string | undefined) => ({
    ...state,
    medicalRecordStatusId,
  }))

  readonly setMedicalRecordStatusOptions = this.updater((state, medicalRecordStatusOptions: string[] | undefined) => ({
    ...state,
    medicalRecordStatusOptions,
  }))

  readonly setVisitKindId = this.updater((state, visitKindId: string) => ({
    ...state,
    visitKindId,
  }))

  readonly setDateFilter = this.updater((state, dateFilter: DateFilterInput | undefined) => ({
    ...state,
    dateFilter,
  }))

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: {
      ...state.paging,
      skip: skip
    }
  }))

  readonly setLimit = this.updater((state, limit: number) => ({
    ...state,
    paging: {
      ...state.paging,
      limit: limit
    }
  }))

  readonly filterLocations = (term) =>
    this.data.userSelectLocations({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const locations = res.data.items
          this.patchState({ locations })
          return locations
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterPatients = (term) =>
    this.data.userSelectPatients({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const patients = res.data.items
          this.patchState({ patients })
          return patients
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterClinicalProviders = (term) =>
    this.data.userSelectClinicalProviders({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const clinicalProviders = res.data.items
          this.patchState({ clinicalProviders })
          return clinicalProviders
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterLegalCases = (term) =>
    this.data.userSelectLegalCases({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const legalCases = res.data.items
          this.patchState({ legalCases })
          return legalCases
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterAppointmentStatuses = (term) =>
    this.data.userSelectAppointmentStatuses({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const appointmentStatuses = res.data.items
          this.patchState({ appointmentStatuses })
          return appointmentStatuses
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterVisitKinds = (term) =>
    this.data.userSelectVisitKinds({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const visitKinds = res.data.items
          this.patchState({ visitKinds })
          return visitKinds
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly addLocation = this.updater((state, location: Location) => ({
    ...state,
    locations: state.locations.concat(location),
  }))

  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state,
    patients: state.patients.concat(patient),
  }))

  readonly addClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state,
    clinicalProviders: state.clinicalProviders.concat(clinicalProvider),
  }))

  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state,
    legalCases: state.legalCases.concat(legalCase),
  }))

  readonly addAppointmentStatus = this.updater((state, appointmentStatus: AppointmentStatus) => ({
    ...state,
    appointmentStatuses: state.appointmentStatuses.concat(appointmentStatus),
  }))

  readonly addVisitKind = this.updater((state, visitKind: VisitKind) => ({
    ...state,
    visitKinds: state.visitKinds.concat(visitKind),
  }))

  deleteAppointment = this.updater((state, appointment: Appointment) => {
    return {
      ...state,
      appointments: state.appointments.filter((el) => el.id !== appointment.id),
    }
  })

  readonly setItem = this.updater((state, item: Appointment) => ({ ...state, item }))

  addNewAppointment = this.updater((state, appointment: Appointment) => ({
    ...state,
    appointments: [...state.appointments, appointment],
  }))

  updateAppointment = this.updater((state, appointment: Appointment) => {
    return {
      ...state,
      appointments: state.appointments.map((el) => {
          return (el.id === appointment.id)?appointment:el;
      }),
    }
  })

  addAppointments = this.updater((state, newAppointments: any[]) => ({
    ...state,
    appointments: state.appointments.concat(newAppointments),
  }))
  updateAppointments = this.updater((state, updatedAppointments: any[]) => {
    return {
      ...state,
      appointments: state.appointments.map((appointment) => {
        const updated = updatedAppointments.find((el) => el.id === appointment.id)
        return updated ? updated : appointment
      }),
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery,
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.appointmentService.validateAppointmentExcelData(
          excelData,
          vm.locations,
          vm.patients,
          vm.clinicalProviders,
          vm.legalCases,
          vm.appointmentStatuses,
        )
      }),
    )
  }

  readonly loadAppointmentEffect = this.effect<string>((appointmentId$) =>
    appointmentId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((appointmentId) =>
        this.data.userAppointment({ appointmentId }).pipe(
          tapResponse(
            (res) => {
              const appointment = res.data.item
              return this.patchState({
                item: appointment,
                errors: res.errors,
                loading: false,
              })
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly loadAppointmentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) => {
        console.log('appointment input', input)
        return this.data.userAppointments({ input }).pipe(
          tapResponse(
            (res) => {

              return this.patchState({
                paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                appointments: res.data.items,
                errors: res.errors,
                loading: false,
              })
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        );
      }
      ),
    ),
  )

  readonly uploadBillEffect = this.effect<UserUpdateAppointmentInput>(($) =>
  $.pipe(
    tap(() => this.patchState({ loading: true })),
    switchMap((input) => {
      console.log('appointment input', input)
      return this.data.userUploadBill({ input }).pipe(
        tapResponse(
          (res) => {
            return this.patchState({
              item: {...input, bill: res.data.updated.bill},
              errors: res.errors,
              loading: false,
            })
          },
          (errors: any) =>
            this.patchState({
              loading: false,
              errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
            }),
        ),
      );
    }
    ),
  ),
)


  readonly createAppointmentEffect = this.effect<UserCreateAppointmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.appointmentService.createAppointment({ ...input }).pipe(
          tapResponse(
            (appointment: Appointment) => {
              this.addNewAppointment(appointment)
              this.toast.success('Created Successfully!')
              setTimeout(() => this.patchState({ item: appointment, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        ),
      ),
    ),
  )

  readonly updateAppointmentEffect = this.effect<UserUpdateAppointmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.appointmentService.updateAppointment(input, input.id).pipe(
          tapResponse(
            (appointment) => {
              this.updateAppointment(appointment)
              this.toast.success('Updated Successfully!')
              setTimeout(() => this.patchState({ item: appointment, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        ),
      ),
    ),
  )

  readonly deleteAppointmentEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([_, appointment]) => {
        return this.data.userDeleteAppointment({ appointmentId: appointment.id }).pipe(
          tapResponse(
            (res) => {
              this.toast.success('Deleted successfully!', { duration: 3000 })
              setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        )
      }),
    ),
  )

  readonly importExcelEffect = this.effect<UserUpdateAppointmentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((data) =>
        this.appointmentService.importAppointments(data).pipe(
          catchError((error) => {
            this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
            return EMPTY
          }),
          tap((updateResult) => {
            const created = JSON.parse(updateResult.created)
            const updated = JSON.parse(updateResult.updated)
            const failed = JSON.parse(updateResult.failed)
            const total = created.length + updated.length + failed.length

            this.addAppointments(created)
            this.updateAppointments(updated)

            this.toast.success(
              `${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`,
              { duration: 3000 },
            )
          }),
        ),
      ),
    ),
  )

  readonly deleteSpecificAppointmentEffect = this.effect<Appointment>((appointment$) =>
    appointment$.pipe(
      switchMap((appointment) =>
        this.data
          .userDeleteAppointment({
            appointmentId: appointment.id,
          })
          .pipe(
            tapResponse(
              (res) => {
                this.toast.success('Deleted successfully!', { duration: 3000 })
                setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300)
                setTimeout(() => this.patchState({ done: false, item: null }), 600)
              },
              (errors: any) => {
                if (errors.graphQLErrors) {
                  this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                  this.patchState({
                    loading: false,
                    errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                  })
                } else {
                  this.toast.error(errors.Message)
                  this.formService.setErrors(errors.Data)
                }
              },
            ),
          ),
      ),
    ),
  )

  readonly checkInAppointmentEffect = this.effect<Appointment>((appointment$) =>
    appointment$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([appointment, item]) => {
        console.log("checkIn store appointment", appointment);
        return this.appointmentService.checkInAppointment(appointment).pipe(
          tapResponse(
            (appointment) => {
              this.updateAppointment(appointment)
              this.toast.success('Checked In Successfully!')
              setTimeout(() => this.patchState({ item: appointment, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        );
      }
      ),
    ),
  )

  readonly confirmAppointmentEffect = this.effect<Appointment>((appointment$) =>
    appointment$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([appointment, item]) => {
        return this.appointmentService.confirmAppointment(appointment).pipe(
          tapResponse(
            (appointment) => {
              this.updateAppointment(appointment)
              this.toast.success('Confirmed Successfully!')
              setTimeout(() => this.patchState({ item: appointment, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        );
      }
      ),
    ),
  )

  readonly requestRescehduleAppointmentEffect = this.effect<Appointment>((appointment$) =>
    appointment$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([appointment, item]) => {
        return this.appointmentService.requestRescheduleAppointment(appointment).pipe(
          tapResponse(
            (appointment) => {
              this.updateAppointment(appointment)
              this.toast.success('Requested Reschedule Successfully!')
              setTimeout(() => this.patchState({ item: appointment, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        );
      }
      ),
    ),
  )

  readonly rescehduleAppointmentEffect = this.effect<{ appointment: Appointment, rescheduleDate: Date }>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([{ appointment, rescheduleDate }, item]) => {
        return this.appointmentService.rescheduleAppointment(appointment, rescheduleDate).pipe(
          tapResponse(
            (appointment) => {
              this.updateAppointment(appointment)
              this.toast.success('Rescheduled Successfully!')
              setTimeout(() => this.patchState({ item: appointment, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        );
      }
      ),
    ),
  )

  readonly cancelAppointmentEffect = this.effect<Appointment>((appointment$) =>
    appointment$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([appointment, item]) =>
        this.appointmentService.cancelAppointment(appointment).pipe(
          tapResponse(
            (appointment) => {
              this.updateAppointment(appointment)
              this.toast.success('Cancelled Successfully!')
              setTimeout(() => this.patchState({ item: appointment, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        ),
      ),
    ),
  )

  readonly hideAppointmentEffect = this.effect<Appointment>((appointment$) =>
    appointment$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([appointment, item]) =>
        this.appointmentService.hideAppointment(appointment).pipe(
          tapResponse(
            (appointment) => {
              this.updateAppointment(appointment)
              this.toast.success('Hided Successfully!')
              setTimeout(() => this.patchState({ item: appointment, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        ),
      ),
    ),
  )

  /** Assign To User */
  setAssignUserModalCtrl(ctrl: FormlyModalController) {
    this.assignUserModalCtrl = ctrl;
  }

  openAssignUserModal(appointment: Appointment) {
    this.assignUserModalCtrl?.open(appointment, {}, this);
  }

  filterByMedicalRecordStatus(values:string[]){
    if(values){
      this.setMedicalRecordStatusOptions(values)
      this.loadAppointmentsEffect()
    }
  }

  assignAppointmentToUser(model: any) {
    const { id, name, assignedToId } = model;
    const subscriber = this.actionResult$.subscribe(result => {
      const { done } = result;
      if(done) {
        subscriber.unsubscribe();
        this.assignUserModalCtrl?.close();
      }
    })
    this.updateAppointmentEffect({ id, name, assignedToId });
  }

  /** Assign To User */
}
