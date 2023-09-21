

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, JournalEntry, CorePaging, UserUpdateJournalEntryInput ,CaseAccount } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { JournalEntryService } from '@case-clinical/web/journal-entry/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface JournalEntryListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
caseAccountId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: JournalEntry[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebJournalEntryListStore extends ComponentStore<JournalEntryListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly journalEntryService: JournalEntryService,
        private readonly toast: WebUiToastService,
         private readonly caseAccountStore: WebCaseAccountFeatureStore
    ) {
    super({
      headerTitle: 'JournalEntries',
      searchFocused: false,
      searchQuery: '',
caseAccountId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("caseAccountId")) {
      var caseAccountId = this.router.snapshot.paramMap.get("caseAccountId")
      this.setCaseAccountId(caseAccountId)
    }

    this.caseAccountStore.loadCaseAccountsEffect()
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


            readonly setCaseAccountId = this.updater((state, caseAccountId: string) => ({
                ...state,
    caseAccountId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly caseAccountId$ = this.select((s) => s.caseAccountId)

caseAccounts$ = this.caseAccountStore.caseAccounts$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.caseAccountId$, this.searchQuery$, (paging, caseAccountId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    caseAccountId: caseAccountId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.caseAccountId$,
    this.data$,
    this.caseAccounts$,
    (paging, errors, loading, searchFocused, searchQuery, caseAccountId, data ,caseAccounts) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      caseAccountId,
      data,
      caseAccounts
    }),
  )

    addJournalEntries = this.updater((state, journalEntries: any[]) => ({...state, data: state.data.concat(journalEntries) }))
    updateJournalEntries = this.updater((state, journalEntries: any[]) => {
        return {
            ...state,
            data: state.data.map((journalEntry) => {
            const updated = journalEntries.find((el) => el.id === journalEntry.id);
            return updated ? updated : journalEntry;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const caseAccounts = vm.caseAccounts;
        return this.journalEntryService.validateJournalEntryExcelData(excelData,caseAccounts);
      })
    )
  }


  readonly loadJournalEntriesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userJournalEntries({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateJournalEntryInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.journalEntryService.importJournalEntries(data).pipe(
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

            this.addJournalEntries(created);
            this.updateJournalEntries(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

