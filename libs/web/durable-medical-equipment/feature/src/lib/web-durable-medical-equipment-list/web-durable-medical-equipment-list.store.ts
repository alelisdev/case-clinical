

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, DurableMedicalEquipment, CorePaging, UserUpdateDurableMedicalEquipmentInput ,Vendor } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { DurableMedicalEquipmentService } from '@case-clinical/web/durable-medical-equipment/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface DurableMedicalEquipmentListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
vendorId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: DurableMedicalEquipment[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebDurableMedicalEquipmentListStore extends ComponentStore<DurableMedicalEquipmentListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly durableMedicalEquipmentService: DurableMedicalEquipmentService,
        private readonly toast: WebUiToastService,
         private readonly vendorStore: WebVendorFeatureStore
    ) {
    super({
      headerTitle: 'DurableMedicalEquipments',
      searchFocused: false,
      searchQuery: '',
vendorId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.router.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }

    this.vendorStore.loadVendorsEffect()
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


            readonly setVendorId = this.updater((state, vendorId: string) => ({
                ...state,
    vendorId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly vendorId$ = this.select((s) => s.vendorId)

vendors$ = this.vendorStore.vendors$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.vendorId$, this.searchQuery$, (paging, vendorId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    vendorId: vendorId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.vendorId$,
    this.data$,
    this.vendors$,
    (paging, errors, loading, searchFocused, searchQuery, vendorId, data ,vendors) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      vendorId,
      data,
      vendors
    }),
  )

    addDurableMedicalEquipments = this.updater((state, durableMedicalEquipments: any[]) => ({...state, data: state.data.concat(durableMedicalEquipments) }))
    updateDurableMedicalEquipments = this.updater((state, durableMedicalEquipments: any[]) => {
        return {
            ...state,
            data: state.data.map((durableMedicalEquipment) => {
            const updated = durableMedicalEquipments.find((el) => el.id === durableMedicalEquipment.id);
            return updated ? updated : durableMedicalEquipment;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const vendors = vm.vendors;
        return this.durableMedicalEquipmentService.validateDurableMedicalEquipmentExcelData(excelData,vendors);
      })
    )
  }


  readonly loadDurableMedicalEquipmentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userDurableMedicalEquipments({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateDurableMedicalEquipmentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.durableMedicalEquipmentService.importDurableMedicalEquipments(data).pipe(
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

            this.addDurableMedicalEquipments(created);
            this.updateDurableMedicalEquipments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

