

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, WriteOff, CorePaging, UserUpdateWriteOffInput ,CaseAccount, WriteOffStatus } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { WriteOffService } from '@case-clinical/web/write-off/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'
import { WebWriteOffStatusFeatureStore } from '@case-clinical/web/write-off-status/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface WriteOffListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
accountId?: string,writeOffStatusId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: WriteOff[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebWriteOffListStore extends ComponentStore<WriteOffListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly writeOffService: WriteOffService,
        private readonly toast: WebUiToastService,
         private readonly caseAccountStore: WebCaseAccountFeatureStore,
 private readonly writeOffStatusStore: WebWriteOffStatusFeatureStore
    ) {
    super({
      headerTitle: 'WriteOffs',
      searchFocused: false,
      searchQuery: '',
accountId: undefined,
writeOffStatusId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("accountId")) {
      var accountId = this.router.snapshot.paramMap.get("accountId")
      this.setAccountId(accountId)
    }


    if(this.router.snapshot.paramMap.has("writeOffStatusId")) {
      var writeOffStatusId = this.router.snapshot.paramMap.get("writeOffStatusId")
      this.setWriteOffStatusId(writeOffStatusId)
    }

    this.caseAccountStore.loadCaseAccountsEffect()
this.writeOffStatusStore.loadWriteOffStatusesEffect()
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


            readonly setAccountId = this.updater((state, accountId: string) => ({
                ...state,
    accountId,
  }))


            readonly setWriteOffStatusId = this.updater((state, writeOffStatusId: string) => ({
                ...state,
    writeOffStatusId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly accountId$ = this.select((s) => s.accountId)

readonly writeOffStatusId$ = this.select((s) => s.writeOffStatusId)

caseAccounts$ = this.caseAccountStore.caseAccounts$
writeOffStatuses$ = this.writeOffStatusStore.writeOffStatuses$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.accountId$,
this.writeOffStatusId$, this.searchQuery$, (paging, accountId,
writeOffStatusId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    accountId: accountId,writeOffStatusId: writeOffStatusId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.accountId$,
this.writeOffStatusId$,
    this.data$,
    this.caseAccounts$,
this.writeOffStatuses$,
    (paging, errors, loading, searchFocused, searchQuery, accountId,
writeOffStatusId, data ,caseAccounts,writeOffStatuses) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      accountId,
writeOffStatusId,
      data,
      caseAccounts,writeOffStatuses
    }),
  )

    addWriteOffs = this.updater((state, writeOffs: any[]) => ({...state, data: state.data.concat(writeOffs) }))
    updateWriteOffs = this.updater((state, writeOffs: any[]) => {
        return {
            ...state,
            data: state.data.map((writeOff) => {
            const updated = writeOffs.find((el) => el.id === writeOff.id);
            return updated ? updated : writeOff;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const caseAccounts = vm.caseAccounts;
const writeOffStatuses = vm.writeOffStatuses;
        return this.writeOffService.validateWriteOffExcelData(excelData,caseAccounts,writeOffStatuses);
      })
    )
  }


  readonly loadWriteOffsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userWriteOffs({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateWriteOffInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.writeOffService.importWriteOffs(data).pipe(
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

            this.addWriteOffs(created);
            this.updateWriteOffs(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

