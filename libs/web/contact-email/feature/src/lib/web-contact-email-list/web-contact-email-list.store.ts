

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, ContactEmail, CorePaging, UserUpdateContactEmailInput ,Contact } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { ContactEmailService } from '@case-clinical/web/contact-email/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebContactFeatureStore } from '@case-clinical/web/contact/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface ContactEmailListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
contactId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: ContactEmail[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebContactEmailListStore extends ComponentStore<ContactEmailListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly contactEmailService: ContactEmailService,
        private readonly toast: WebUiToastService,
         private readonly contactStore: WebContactFeatureStore
    ) {
    super({
      headerTitle: 'ContactEmails',
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

    addContactEmails = this.updater((state, contactEmails: any[]) => ({...state, data: state.data.concat(contactEmails) }))
    updateContactEmails = this.updater((state, contactEmails: any[]) => {
        return {
            ...state,
            data: state.data.map((contactEmail) => {
            const updated = contactEmails.find((el) => el.id === contactEmail.id);
            return updated ? updated : contactEmail;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const contacts = vm.contacts;
        return this.contactEmailService.validateContactEmailExcelData(excelData,contacts);
      })
    )
  }


  readonly loadContactEmailsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContactEmails({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateContactEmailInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contactEmailService.importContactEmails(data).pipe(
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

            this.addContactEmails(created);
            this.updateContactEmails(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

