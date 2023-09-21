

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Appointment, CorePaging, UserUpdateAppointmentInput  } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState } from '@ag-grid-community/core'
import { AppointmentService } from '@case-clinical/web/appointment/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebAppointmentStatusFeatureStore } from '@case-clinical/web/appointment-status/shared'
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface AppointmentListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
        locationId?: string,patientId?: string,legalCaseId?: string,appointmentStatusId?: string,visitKindId?: string,  //<---- These didn't make it to FeatureStore when we migrated
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Appointment[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebAppointmentListStore extends ComponentStore<AppointmentListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly appointmentService: AppointmentService,
        private readonly toast: WebUiToastService,
         private readonly locationStore: WebLocationFeatureStore,
 private readonly patientStore: WebPatientFeatureStore,
 private readonly legalCaseStore: WebLegalCaseFeatureStore,
 private readonly appointmentStatusStore: WebAppointmentStatusFeatureStore,
 private readonly visitKindStore: WebVisitKindFeatureStore
    ) {
    super({
      headerTitle: 'Appointments',
      searchFocused: false,
      searchQuery: '',
locationId: undefined,
patientId: undefined,
legalCaseId: undefined,
appointmentStatusId: undefined,
visitKindId: undefined,

      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("locationId")) {
      const locationId = this.router.snapshot.paramMap.get("locationId")
      this.setLocationId(locationId)
    }


    if(this.router.snapshot.paramMap.has("patientId")) {
      const patientId = this.router.snapshot.paramMap.get("patientId")
      this.setPatientId(patientId)
    }


    if(this.router.snapshot.paramMap.has("legalCaseId")) {
      const legalCaseId = this.router.snapshot.paramMap.get("legalCaseId")
      this.setLegalCaseId(legalCaseId)
    }


    if(this.router.snapshot.paramMap.has("appointmentStatusId")) {
      const appointmentStatusId = this.router.snapshot.paramMap.get("appointmentStatusId")
      this.setAppointmentStatusId(appointmentStatusId)
    }

    if(this.router.snapshot.paramMap.has("visitKindId")) {
      const visitKindId = this.router.snapshot.paramMap.get("visitKindId")
      this.setVisitKindId(visitKindId)
    }

    this.locationStore.loadLocationsEffect()
this.patientStore.loadPatientsEffect()
this.legalCaseStore.loadLegalCasesEffect()
this.appointmentStatusStore.loadAppointmentStatusesEffect()
  }

  
  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: { ...state.paging, skip }
  }))

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  readonly setSearchBarInFocus = this.updater((state, searchFocused: boolean) => ({
    ...state,
    searchFocused
  }))


            readonly setLocationId = this.updater((state, locationId: string) => ({
                ...state,
    locationId,
  }))


            readonly setPatientId = this.updater((state, patientId: string) => ({
                ...state,
    patientId,
  }))


            readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
                ...state,
    legalCaseId,
  }))


            readonly setAppointmentStatusId = this.updater((state, appointmentStatusId: string) => ({
                ...state,
    appointmentStatusId,
  }))

  readonly setVisitKindId = this.updater((state, visitKindId: string) => ({
    ...state,
    visitKindId,
}))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly locationId$ = this.select((s) => s.locationId)

readonly patientId$ = this.select((s) => s.patientId)

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly appointmentStatusId$ = this.select((s) => s.appointmentStatusId)
readonly visitKindId$ = this.select((s) => s.visitKindId)

locations$ = this.locationStore.locations$
patients$ = this.patientStore.patients$
legalCases$ = this.legalCaseStore.legalCases$
appointmentStatuses$ = this.appointmentStatusStore.appointmentStatuses$
visitKinds$ = this.visitKindStore.visitKinds$

  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.locationId$,
this.patientId$,
this.legalCaseId$,
this.appointmentStatusId$,
this.visitKindId$, this.searchQuery$, (paging, locationId,
patientId,
legalCaseId,
appointmentStatusId, visitKindId, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    locationId: locationId,patientId: patientId,legalCaseId: legalCaseId,appointmentStatusId: appointmentStatusId, visitKindId:visitKindId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.locationId$,
this.patientId$,
this.legalCaseId$,
this.appointmentStatusId$,
this.visitKindId$,

    this.data$,
    this.locations$,
this.patients$,
this.legalCases$,
this.appointmentStatuses$,
this.visitKinds$,
    (paging, errors, loading, searchFocused, searchQuery, locationId,
patientId,
legalCaseId,
appointmentStatusId,visitKindId, data ,locations,patients,legalCases,appointmentStatuses, visitKinds) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      locationId,
patientId,
legalCaseId,
appointmentStatusId,
visitKindId,
      data,
      locations,patients,legalCases,appointmentStatuses, visitKinds
    }),
  )

    addAppointments = this.updater((state, appointments: any[]) => ({...state, data: state.data.concat(appointments) }))
    updateAppointments = this.updater((state, appointments: any[]) => {
        return {
            ...state,
            data: state.data.map((appointment) => {
            const updated = appointments.find((el) => el.id === appointment.id);
            return updated ? updated : appointment;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const locations = vm.locations;
const patients = vm.patients;
const legalCases = vm.legalCases;
const appointmentStatuses = vm.appointmentStatuses;
        return this.appointmentService.validateAppointmentExcelData(excelData,locations,patients,[],legalCases,appointmentStatuses);
      })
    )
  }


  readonly loadAppointmentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAppointments({input}).pipe(
          tapResponse(
            (res) =>{
              console.log('userAppointments')
              return this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                data: res.data.items,
                errors: res.errors,
                loading: false,
              })},
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

readonly importExcelEffect = this.effect<UserUpdateAppointmentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.appointmentService.importAppointments(data).pipe(
        catchError(error => {
          console.log(error)
          this.toast.error(error.Message ?? 'Failed to save', {duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addAppointments(created);
            this.updateAppointments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

