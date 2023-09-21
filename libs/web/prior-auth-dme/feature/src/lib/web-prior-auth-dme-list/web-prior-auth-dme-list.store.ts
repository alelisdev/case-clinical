

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, PriorAuthDme, CorePaging, UserUpdatePriorAuthDmeInput ,PriorAuthorizationRequest, DurableMedicalEquipment } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PriorAuthDmeService } from '@case-clinical/web/prior-auth-dme/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'
import { WebDurableMedicalEquipmentFeatureStore } from '@case-clinical/web/durable-medical-equipment/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface PriorAuthDmeListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
  priorAuthorizationRequestId?: string,
durableMedicalEquipmentId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: PriorAuthDme[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPriorAuthDmeListStore extends ComponentStore<PriorAuthDmeListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly priorAuthDmeService: PriorAuthDmeService,
        private readonly toast: WebUiToastService,
         private readonly priorAuthorizationRequestStore: WebPriorAuthorizationRequestFeatureStore,
 private readonly durableMedicalEquipmentStore: WebDurableMedicalEquipmentFeatureStore
    ) {
    super({
      headerTitle: 'PriorAuthDmes',
      searchFocused: false,
      searchQuery: '',
      priorAuthorizationRequestId: undefined,
durableMedicalEquipmentId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.router.snapshot.paramMap.get("priorAuthorizationRequestId")
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId)
    }


    if(this.router.snapshot.paramMap.has("durableMedicalEquipmentId")) {
      var durableMedicalEquipmentId = this.router.snapshot.paramMap.get("durableMedicalEquipmentId")
      this.setDurableMedicalEquipmentId(durableMedicalEquipmentId)
    }

    this.priorAuthorizationRequestStore.loadPriorAuthorizationRequestsEffect()
this.durableMedicalEquipmentStore.loadDurableMedicalEquipmentsEffect()
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


            readonly setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId: string) => ({
                ...state,
                priorAuthorizationRequestId,
  }))


            readonly setDurableMedicalEquipmentId = this.updater((state, durableMedicalEquipmentId: string) => ({
                ...state,
    durableMedicalEquipmentId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

readonly durableMedicalEquipmentId$ = this.select((s) => s.durableMedicalEquipmentId)

priorAuthorizationRequests$ = this.priorAuthorizationRequestStore.priorAuthorizationRequests$
durableMedicalEquipments$ = this.durableMedicalEquipmentStore.durableMedicalEquipments$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.priorAuthorizationRequestId$,
this.durableMedicalEquipmentId$, this.searchQuery$, (paging, priorAuthorizationRequestId,
durableMedicalEquipmentId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    priorAuthorizationRequestId: priorAuthorizationRequestId,
    durableMedicalEquipmentId: durableMedicalEquipmentId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.priorAuthorizationRequestId$,
this.durableMedicalEquipmentId$,
    this.data$,
    this.priorAuthorizationRequests$,
this.durableMedicalEquipments$,
    (paging, errors, loading, searchFocused, searchQuery, priorAuthorizationRequestId,
durableMedicalEquipmentId, data ,priorAuthorizationRequests,durableMedicalEquipments) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      priorAuthorizationRequestId,
durableMedicalEquipmentId,
      data,
      priorAuthorizationRequests,durableMedicalEquipments
    }),
  )

    addPriorAuthDmes = this.updater((state, priorAuthDmes: any[]) => ({...state, data: state.data.concat(priorAuthDmes) }))
    updatePriorAuthDmes = this.updater((state, priorAuthDmes: any[]) => {
        return {
            ...state,
            data: state.data.map((priorAuthDme) => {
            const updated = priorAuthDmes.find((el) => el.id === priorAuthDme.id);
            return updated ? updated : priorAuthDme;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const priorAuthorizationRequests = vm.priorAuthorizationRequests;
const durableMedicalEquipments = vm.durableMedicalEquipments;
        return this.priorAuthDmeService.validatePriorAuthDmeExcelData(excelData,priorAuthorizationRequests,durableMedicalEquipments);
      })
    )
  }


  readonly loadPriorAuthDmesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthDmes({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdatePriorAuthDmeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthDmeService.importPriorAuthDmes(data).pipe(
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

            this.addPriorAuthDmes(created);
            this.updatePriorAuthDmes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

