

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Implant, CorePaging, UserUpdateImplantInput ,ImplantCategory, Contact, Manufacturer } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { ImplantService } from '@case-clinical/web/implant/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebImplantCategoryFeatureStore } from '@case-clinical/web/implant-category/shared'
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'
import { WebManufacturerFeatureStore } from '@case-clinical/web/manufacturer/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface ImplantListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
implantCategoryId?: string,salesRepresentativeId?: string,manufacturerId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Implant[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebImplantListStore extends ComponentStore<ImplantListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly implantService: ImplantService,
        private readonly toast: WebUiToastService,
         private readonly implantCategoryStore: WebImplantCategoryFeatureStore,
 private readonly contactStore: WebContactFeatureStore,
 private readonly manufacturerStore: WebManufacturerFeatureStore
    ) {
    super({
      headerTitle: 'Implants',
      searchFocused: false,
      searchQuery: '',
implantCategoryId: undefined,
salesRepresentativeId: undefined,
manufacturerId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("implantCategoryId")) {
      var implantCategoryId = this.router.snapshot.paramMap.get("implantCategoryId")
      this.setImplantCategoryId(implantCategoryId)
    }


    if(this.router.snapshot.paramMap.has("salesRepresentativeId")) {
      var salesRepresentativeId = this.router.snapshot.paramMap.get("salesRepresentativeId")
      this.setSalesRepresentativeId(salesRepresentativeId)
    }


    if(this.router.snapshot.paramMap.has("manufacturerId")) {
      var manufacturerId = this.router.snapshot.paramMap.get("manufacturerId")
      this.setManufacturerId(manufacturerId)
    }

    this.implantCategoryStore.loadImplantCategoriesEffect()
this.contactStore.loadContactsEffect()
this.manufacturerStore.loadManufacturersEffect()
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


            readonly setImplantCategoryId = this.updater((state, implantCategoryId: string) => ({
                ...state,
    implantCategoryId,
  }))


            readonly setSalesRepresentativeId = this.updater((state, salesRepresentativeId: string) => ({
                ...state,
    salesRepresentativeId,
  }))


            readonly setManufacturerId = this.updater((state, manufacturerId: string) => ({
                ...state,
    manufacturerId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly implantCategoryId$ = this.select((s) => s.implantCategoryId)

readonly salesRepresentativeId$ = this.select((s) => s.salesRepresentativeId)

readonly manufacturerId$ = this.select((s) => s.manufacturerId)

implantCategories$ = this.implantCategoryStore.implantCategories$
contacts$ = this.contactStore.contacts$
manufacturers$ = this.manufacturerStore.manufacturers$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.implantCategoryId$,
this.salesRepresentativeId$,
this.manufacturerId$, this.searchQuery$, (paging, implantCategoryId,
salesRepresentativeId,
manufacturerId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    implantCategoryId: implantCategoryId,salesRepresentativeId: salesRepresentativeId,manufacturerId: manufacturerId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.implantCategoryId$,
this.salesRepresentativeId$,
this.manufacturerId$,
    this.data$,
    this.implantCategories$,
this.contacts$,
this.manufacturers$,
    (paging, errors, loading, searchFocused, searchQuery, implantCategoryId,
salesRepresentativeId,
manufacturerId, data ,implantCategories,contacts,manufacturers) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      implantCategoryId,
salesRepresentativeId,
manufacturerId,
      data,
      implantCategories,contacts,manufacturers
    }),
  )

    addImplants = this.updater((state, implants: any[]) => ({...state, data: state.data.concat(implants) }))
    updateImplants = this.updater((state, implants: any[]) => {
        return {
            ...state,
            data: state.data.map((implant) => {
            const updated = implants.find((el) => el.id === implant.id);
            return updated ? updated : implant;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const implantCategories = vm.implantCategories;
const contacts = vm.contacts;
const manufacturers = vm.manufacturers;
        return this.implantService.validateImplantExcelData(excelData,implantCategories,contacts,manufacturers);
      })
    )
  }


  readonly loadImplantsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userImplants({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateImplantInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.implantService.importImplants(data).pipe(
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

            this.addImplants(created);
            this.updateImplants(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

