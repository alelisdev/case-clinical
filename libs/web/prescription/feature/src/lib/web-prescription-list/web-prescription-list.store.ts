

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Prescription, CorePaging, UserUpdatePrescriptionInput ,Patient } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PrescriptionService } from '@case-clinical/web/prescription/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface PrescriptionListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
patientId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Prescription[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPrescriptionListStore extends ComponentStore<PrescriptionListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly prescriptionService: PrescriptionService,
        private readonly toast: WebUiToastService,
         private readonly patientStore: WebPatientFeatureStore
    ) {
    super({
      headerTitle: 'Prescriptions',
      searchFocused: false,
      searchQuery: '',
patientId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("patientId")) {
      var patientId = this.router.snapshot.paramMap.get("patientId")
      this.setPatientId(patientId)
    }

    this.patientStore.loadPatientsEffect()
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


            readonly setPatientId = this.updater((state, patientId: string) => ({
                ...state,
    patientId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly patientId$ = this.select((s) => s.patientId)

patients$ = this.patientStore.patients$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.patientId$, this.searchQuery$, (paging, patientId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    patientId: patientId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.patientId$,
    this.data$,
    this.patients$,
    (paging, errors, loading, searchFocused, searchQuery, patientId, data ,patients) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      patientId,
      data,
      patients
    }),
  )

    addPrescriptions = this.updater((state, prescriptions: any[]) => ({...state, data: state.data.concat(prescriptions) }))
    updatePrescriptions = this.updater((state, prescriptions: any[]) => {
        return {
            ...state,
            data: state.data.map((prescription) => {
            const updated = prescriptions.find((el) => el.id === prescription.id);
            return updated ? updated : prescription;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const patients = vm.patients;
        return this.prescriptionService.validatePrescriptionExcelData(excelData,patients);
      })
    )
  }


  readonly loadPrescriptionsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPrescriptions({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdatePrescriptionInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.prescriptionService.importPrescriptions(data).pipe(
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

            this.addPrescriptions(created);
            this.updatePrescriptions(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

