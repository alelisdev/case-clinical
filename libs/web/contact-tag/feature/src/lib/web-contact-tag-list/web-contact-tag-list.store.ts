

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, ContactTag, CorePaging, UserUpdateContactTagInput ,Contact } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { ContactTagService } from '@case-clinical/web/contact-tag/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface ContactTagListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
contactId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: ContactTag[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebContactTagListStore extends ComponentStore<ContactTagListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly contactTagService: ContactTagService,
        private readonly toast: WebUiToastService,
         private readonly contactStore: WebContactFeatureStore
    ) {
    super({
      headerTitle: 'ContactTags',
      searchFocused: false,
      searchQuery: '',
contactId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("contactId")) {
      var contactId = this.router.snapshot.paramMap.get("contactId")
      this.setContactId(contactId)
    }

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

readonly contactId$ = this.select((s) => s.contactId)

contacts$ = this.contactStore.contacts$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.contactId$, this.searchQuery$, (paging, contactId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    contactId: contactId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.contactId$,
    this.data$,
    this.contacts$,
    (paging, errors, loading, searchFocused, searchQuery, contactId, data ,contacts) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      contactId,
      data,
      contacts
    }),
  )

    addContactTags = this.updater((state, contactTags: any[]) => ({...state, data: state.data.concat(contactTags) }))
    updateContactTags = this.updater((state, contactTags: any[]) => {
        return {
            ...state,
            data: state.data.map((contactTag) => {
            const updated = contactTags.find((el) => el.id === contactTag.id);
            return updated ? updated : contactTag;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const contacts = vm.contacts;
        return this.contactTagService.validateContactTagExcelData(excelData,contacts);
      })
    )
  }


  readonly loadContactTagsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContactTags({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateContactTagInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contactTagService.importContactTags(data).pipe(
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

            this.addContactTags(created);
            this.updateContactTags(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

