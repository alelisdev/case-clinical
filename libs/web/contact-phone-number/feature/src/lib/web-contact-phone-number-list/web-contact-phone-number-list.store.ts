

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, ContactPhoneNumber, CorePaging, UserUpdateContactPhoneNumberInput ,Country, Contact } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { ContactPhoneNumberService } from '@case-clinical/web/contact-phone-number/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebCountryFeatureStore } from '@case-clinical/web/country/shared'
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface ContactPhoneNumberListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
countryId?: string,contactId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: ContactPhoneNumber[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebContactPhoneNumberListStore extends ComponentStore<ContactPhoneNumberListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly contactPhoneNumberService: ContactPhoneNumberService,
        private readonly toast: WebUiToastService,
         private readonly countryStore: WebCountryFeatureStore,
 private readonly contactStore: WebContactFeatureStore
    ) {
    super({
      headerTitle: 'ContactPhoneNumbers',
      searchFocused: false,
      searchQuery: '',
countryId: undefined,
contactId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("countryId")) {
      var countryId = this.router.snapshot.paramMap.get("countryId")
      this.setCountryId(countryId)
    }


    if(this.router.snapshot.paramMap.has("contactId")) {
      var contactId = this.router.snapshot.paramMap.get("contactId")
      this.setContactId(contactId)
    }

    this.countryStore.loadCountriesEffect()
this.contactStore.loadContactsEffect()
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


            readonly setCountryId = this.updater((state, countryId: string) => ({
                ...state,
    countryId,
  }))


            readonly setContactId = this.updater((state, contactId: string) => ({
                ...state,
    contactId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly countryId$ = this.select((s) => s.countryId)

readonly contactId$ = this.select((s) => s.contactId)

countries$ = this.countryStore.countries$
contacts$ = this.contactStore.contacts$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.countryId$,
this.contactId$, this.searchQuery$, (paging, countryId,
contactId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    countryId: countryId,contactId: contactId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.countryId$,
this.contactId$,
    this.data$,
    this.countries$,
this.contacts$,
    (paging, errors, loading, searchFocused, searchQuery, countryId,
contactId, data ,countries,contacts) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      countryId,
contactId,
      data,
      countries,contacts
    }),
  )

    addContactPhoneNumbers = this.updater((state, contactPhoneNumbers: any[]) => ({...state, data: state.data.concat(contactPhoneNumbers) }))
    updateContactPhoneNumbers = this.updater((state, contactPhoneNumbers: any[]) => {
        return {
            ...state,
            data: state.data.map((contactPhoneNumber) => {
            const updated = contactPhoneNumbers.find((el) => el.id === contactPhoneNumber.id);
            return updated ? updated : contactPhoneNumber;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const countries = vm.countries;
const contacts = vm.contacts;
        return this.contactPhoneNumberService.validateContactPhoneNumberExcelData(excelData,countries,contacts);
      })
    )
  }


  readonly loadContactPhoneNumbersEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContactPhoneNumbers({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateContactPhoneNumberInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contactPhoneNumberService.importContactPhoneNumbers(data).pipe(
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

            this.addContactPhoneNumbers(created);
            this.updateContactPhoneNumbers(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

