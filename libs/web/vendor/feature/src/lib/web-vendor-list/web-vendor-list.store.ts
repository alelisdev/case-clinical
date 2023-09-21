

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Vendor, CorePaging, UserUpdateVendorInput ,VendorType } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { VendorService } from '@case-clinical/web/vendor/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebVendorTypeFeatureStore } from '@case-clinical/web/vendor-type/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface VendorListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
vendorTypeId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Vendor[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebVendorListStore extends ComponentStore<VendorListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly vendorService: VendorService,
        private readonly toast: WebUiToastService,
         private readonly vendorTypeStore: WebVendorTypeFeatureStore
    ) {
    super({
      headerTitle: 'Vendors',
      searchFocused: false,
      searchQuery: '',
vendorTypeId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("vendorTypeId")) {
      var vendorTypeId = this.router.snapshot.paramMap.get("vendorTypeId")
      this.setVendorTypeId(vendorTypeId)
    }

    this.vendorTypeStore.loadVendorTypesEffect()
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


            readonly setVendorTypeId = this.updater((state, vendorTypeId: string) => ({
                ...state,
    vendorTypeId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly vendorTypeId$ = this.select((s) => s.vendorTypeId)

vendorTypes$ = this.vendorTypeStore.vendorTypes$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.vendorTypeId$, this.searchQuery$, (paging, vendorTypeId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    vendorTypeId: vendorTypeId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.vendorTypeId$,
    this.data$,
    this.vendorTypes$,
    (paging, errors, loading, searchFocused, searchQuery, vendorTypeId, data ,vendorTypes) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      vendorTypeId,
      data,
      vendorTypes
    }),
  )

    addVendors = this.updater((state, vendors: any[]) => ({...state, data: state.data.concat(vendors) }))
    updateVendors = this.updater((state, vendors: any[]) => {
        return {
            ...state,
            data: state.data.map((vendor) => {
            const updated = vendors.find((el) => el.id === vendor.id);
            return updated ? updated : vendor;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const vendorTypes = vm.vendorTypes;
        return this.vendorService.validateVendorExcelData(excelData,vendorTypes);
      })
    )
  }


  readonly loadVendorsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userVendors({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateVendorInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.vendorService.importVendors(data).pipe(
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

            this.addVendors(created);
            this.updateVendors(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

