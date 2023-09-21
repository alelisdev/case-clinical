

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, ClaimProcedure, CorePaging, UserUpdateClaimProcedureInput ,PlaceOfService, ClaimStatus, Claim, Appointment } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { ClaimProcedureService } from '@case-clinical/web/claim-procedure/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebPlaceOfServiceFeatureStore } from '@case-clinical/web/place-of-service/shared'
import { WebClaimStatusFeatureStore } from '@case-clinical/web/claim-status/shared'
import { WebClaimFeatureStore } from '@case-clinical/web/claim/shared'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface ClaimProcedureListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
placeOfServiceId?: string,claimStatusId?: string,claimId?: string,appointmentId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: ClaimProcedure[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebClaimProcedureListStore extends ComponentStore<ClaimProcedureListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly claimProcedureService: ClaimProcedureService,
        private readonly toast: WebUiToastService,
         private readonly placeOfServiceStore: WebPlaceOfServiceFeatureStore,
 private readonly claimStatusStore: WebClaimStatusFeatureStore,
 private readonly claimStore: WebClaimFeatureStore,
 private readonly appointmentStore: WebAppointmentFeatureStore
    ) {
    super({
      headerTitle: 'ClaimProcedures',
      searchFocused: false,
      searchQuery: '',
placeOfServiceId: undefined,
claimStatusId: undefined,
claimId: undefined,
appointmentId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("placeOfServiceId")) {
      var placeOfServiceId = this.router.snapshot.paramMap.get("placeOfServiceId")
      this.setPlaceOfServiceId(placeOfServiceId)
    }


    if(this.router.snapshot.paramMap.has("claimStatusId")) {
      var claimStatusId = this.router.snapshot.paramMap.get("claimStatusId")
      this.setClaimStatusId(claimStatusId)
    }


    if(this.router.snapshot.paramMap.has("claimId")) {
      var claimId = this.router.snapshot.paramMap.get("claimId")
      this.setClaimId(claimId)
    }


    if(this.router.snapshot.paramMap.has("appointmentId")) {
      var appointmentId = this.router.snapshot.paramMap.get("appointmentId")
      this.setAppointmentId(appointmentId)
    }

    this.placeOfServiceStore.loadPlaceOfServicesEffect()
this.claimStatusStore.loadClaimStatusesEffect()
this.claimStore.loadClaimsEffect()
this.appointmentStore.loadAppointmentsEffect()
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


            readonly setPlaceOfServiceId = this.updater((state, placeOfServiceId: string) => ({
                ...state,
    placeOfServiceId,
  }))


            readonly setClaimStatusId = this.updater((state, claimStatusId: string) => ({
                ...state,
    claimStatusId,
  }))


            readonly setClaimId = this.updater((state, claimId: string) => ({
                ...state,
    claimId,
  }))


            readonly setAppointmentId = this.updater((state, appointmentId: string) => ({
                ...state,
    appointmentId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly placeOfServiceId$ = this.select((s) => s.placeOfServiceId)

readonly claimStatusId$ = this.select((s) => s.claimStatusId)

readonly claimId$ = this.select((s) => s.claimId)

readonly appointmentId$ = this.select((s) => s.appointmentId)

placeOfServices$ = this.placeOfServiceStore.placeOfServices$
claimStatuses$ = this.claimStatusStore.claimStatuses$
claims$ = this.claimStore.claims$
appointments$ = this.appointmentStore.appointments$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.placeOfServiceId$,
this.claimStatusId$,
this.claimId$,
this.appointmentId$, this.searchQuery$, (paging, placeOfServiceId,
claimStatusId,
claimId,
appointmentId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    placeOfServiceId: placeOfServiceId,claimStatusId: claimStatusId,claimId: claimId,appointmentId: appointmentId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.placeOfServiceId$,
this.claimStatusId$,
this.claimId$,
this.appointmentId$,
    this.data$,
    this.placeOfServices$,
this.claimStatuses$,
this.claims$,
this.appointments$,
    (paging, errors, loading, searchFocused, searchQuery, placeOfServiceId,
claimStatusId,
claimId,
appointmentId, data ,placeOfServices,claimStatuses,claims,appointments) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      placeOfServiceId,
claimStatusId,
claimId,
appointmentId,
      data,
      placeOfServices,claimStatuses,claims,appointments
    }),
  )

    addClaimProcedures = this.updater((state, claimProcedures: any[]) => ({...state, data: state.data.concat(claimProcedures) }))
    updateClaimProcedures = this.updater((state, claimProcedures: any[]) => {
        return {
            ...state,
            data: state.data.map((claimProcedure) => {
            const updated = claimProcedures.find((el) => el.id === claimProcedure.id);
            return updated ? updated : claimProcedure;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const placeOfServices = vm.placeOfServices;
const claimStatuses = vm.claimStatuses;
const claims = vm.claims;
const appointments = vm.appointments;
        return this.claimProcedureService.validateClaimProcedureExcelData(excelData,placeOfServices,claimStatuses,claims,appointments);
      })
    )
  }


  readonly loadClaimProceduresEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userClaimProcedures({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                data: res.data.items,
                errors: res.errors,
                loading: false,
              }),
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

readonly importExcelEffect = this.effect<UserUpdateClaimProcedureInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.claimProcedureService.importClaimProcedures(data).pipe(
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

            this.addClaimProcedures(created);
            this.updateClaimProcedures(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

