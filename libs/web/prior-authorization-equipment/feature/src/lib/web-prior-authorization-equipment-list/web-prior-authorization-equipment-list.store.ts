

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, PriorAuthorizationEquipment, CorePaging, UserUpdatePriorAuthorizationEquipmentInput ,Equipment, PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PriorAuthorizationEquipmentService } from '@case-clinical/web/prior-authorization-equipment/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebEquipmentFeatureStore } from '@case-clinical/web/equipment/shared'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface PriorAuthorizationEquipmentListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
equipmentId?: string,priorAuthorizationRequestId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: PriorAuthorizationEquipment[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPriorAuthorizationEquipmentListStore extends ComponentStore<PriorAuthorizationEquipmentListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly priorAuthorizationEquipmentService: PriorAuthorizationEquipmentService,
        private readonly toast: WebUiToastService,
         private readonly equipmentStore: WebEquipmentFeatureStore,
 private readonly priorAuthorizationRequestStore: WebPriorAuthorizationRequestFeatureStore
    ) {
    super({
      headerTitle: 'PriorAuthorizationEquipments',
      searchFocused: false,
      searchQuery: '',
equipmentId: undefined,
priorAuthorizationRequestId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("equipmentId")) {
      var equipmentId = this.router.snapshot.paramMap.get("equipmentId")
      this.setEquipmentId(equipmentId)
    }


    if(this.router.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.router.snapshot.paramMap.get("priorAuthorizationRequestId")
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId)
    }

    this.equipmentStore.loadEquipmentsEffect()
this.priorAuthorizationRequestStore.loadPriorAuthorizationRequestsEffect()
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


            readonly setEquipmentId = this.updater((state, equipmentId: string) => ({
                ...state,
    equipmentId,
  }))


            readonly setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId: string) => ({
                ...state,
    priorAuthorizationRequestId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly equipmentId$ = this.select((s) => s.equipmentId)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

equipments$ = this.equipmentStore.equipments$
priorAuthorizationRequests$ = this.priorAuthorizationRequestStore.priorAuthorizationRequests$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.equipmentId$,
this.priorAuthorizationRequestId$, this.searchQuery$, (paging, equipmentId,
priorAuthorizationRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    equipmentId: equipmentId,priorAuthorizationRequestId: priorAuthorizationRequestId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.equipmentId$,
this.priorAuthorizationRequestId$,
    this.data$,
    this.equipments$,
this.priorAuthorizationRequests$,
    (paging, errors, loading, searchFocused, searchQuery, equipmentId,
priorAuthorizationRequestId, data ,equipments,priorAuthorizationRequests) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      equipmentId,
priorAuthorizationRequestId,
      data,
      equipments,priorAuthorizationRequests
    }),
  )

    addPriorAuthorizationEquipments = this.updater((state, priorAuthorizationEquipments: any[]) => ({...state, data: state.data.concat(priorAuthorizationEquipments) }))
    updatePriorAuthorizationEquipments = this.updater((state, priorAuthorizationEquipments: any[]) => {
        return {
            ...state,
            data: state.data.map((priorAuthorizationEquipment) => {
            const updated = priorAuthorizationEquipments.find((el) => el.id === priorAuthorizationEquipment.id);
            return updated ? updated : priorAuthorizationEquipment;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const equipments = vm.equipments;
const priorAuthorizationRequests = vm.priorAuthorizationRequests;
        return this.priorAuthorizationEquipmentService.validatePriorAuthorizationEquipmentExcelData(excelData,equipments,priorAuthorizationRequests);
      })
    )
  }


  readonly loadPriorAuthorizationEquipmentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthorizationEquipments({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdatePriorAuthorizationEquipmentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthorizationEquipmentService.importPriorAuthorizationEquipments(data).pipe(
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

            this.addPriorAuthorizationEquipments(created);
            this.updatePriorAuthorizationEquipments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

