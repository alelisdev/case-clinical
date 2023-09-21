import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { BalanceRequestService } from './balance-request.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import {
  UserCreateBalanceRequestInput,
  UserUpdateBalanceRequestInput,
  WebCoreDataAccessService,
  CorePaging,
  BalanceRequest,
  Document,
  LegalCase,
} from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface BalanceRequestFeatureState {
  errors?: any
  loading?: boolean
  item?: BalanceRequest
  done: boolean
  formName?: string
  statementId?: string
  legalCaseId?: string
  balanceRequests: BalanceRequest[]
  documents?: Document[]
  legalCases?: LegalCase[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebBalanceRequestFeatureStore extends ComponentStore<BalanceRequestFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly balanceRequestService: BalanceRequestService,
  ) {
    super({
      loading: false,
      balanceRequests: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      statementId: undefined,
      legalCaseId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('balanceRequestId')) {
      var balanceRequestId = this.route.snapshot.paramMap.get('balanceRequestId')
      this.setFormName('balanceRequest_edit')
    } else {
      this.setFormName('balanceRequest_create')
    }

    if (this.route.snapshot.paramMap.has('statementId')) {
      var statementId = this.route.snapshot.paramMap.get('statementId')
      this.setStatementId(statementId)
    }

    if (this.route.snapshot.paramMap.has('legalCaseId')) {
      var legalCaseId = this.route.snapshot.paramMap.get('legalCaseId')
      this.setLegalCaseId(legalCaseId)
    }

    if (this.route.snapshot.paramMap.has('attorneyId')) {
      var attorneyId = this.route.snapshot.paramMap.get('attorneyId')
      this.setAttorneyId(attorneyId)
    }
    
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly balanceRequests$ = this.select((s) => s.balanceRequests)
  readonly documents$ = this.select((s) => s.documents || [])
  readonly legalCases$ = this.select((s) => s.legalCases || [])

  readonly statementId$ = this.select((s) => s.statementId)

  readonly legalCaseId$ = this.select((s) => s.legalCaseId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$, (item, done) => ({ item, done }), { debounce: true })

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.item$,
    this.formName$,
    this.balanceRequests$,
    this.documents$,
    this.legalCases$,
    (errors, loading, item, formName, balanceRequests, documents, legalCases) => ({
      errors,
      loading,
      item,
      formName,
      balanceRequests,

      documents,
      legalCases,
    }),
    { debounce: true },
  )

  readonly input$ = this.select(
    this.paging$,
    this.statementId$,
    this.legalCaseId$,
    this.searchQuery$,
    (paging, statementId, legalCaseId, searchQuery) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      statementId: statementId,
      legalCaseId: legalCaseId,
      total: paging.total,
    }),
  )

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



  readonly setStatementId = this.updater((state, statementId: string) => ({
    ...state,
    statementId,
  }))

  readonly setAttorneyId = this.updater((state, attorneyId: string) => ({
    ...state,
    attorneyId,
  }))

  readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
    ...state,
    legalCaseId,
  }))

  readonly filterDocuments = (term) =>
    this.data.userSelectDocuments({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          let documents = res.data.items
          this.patchState({ documents })
          return documents
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterLegalCases = (term) =>
    this.data.userSelectLegalCases({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          let legalCases = res.data.items
          this.patchState({ legalCases })
          return legalCases
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly addDocument = this.updater((state, document: Document) => ({
    ...state,
    documents: state.documents.concat(document),
  }))

  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state,
    legalCases: state.legalCases.concat(legalCase),
  }))

  readonly setItem = this.updater((state, item: BalanceRequest) => ({ ...state, item }))

  addNewBalanceRequest = this.updater((state, balanceRequest: BalanceRequest) => ({
    ...state,
    balanceRequests: [...state.balanceRequests, balanceRequest],
  }))

  updateBalanceRequest = this.updater((state, balanceRequest: BalanceRequest) => {
    return {
      ...state,
      balanceRequests: state.balanceRequests.map((el) => {
        if (el.id === balanceRequest.id) {
          return balanceRequest
        } else {
          return el
        }
      }),
    }
  })

  addBalanceRequests = this.updater((state, newBalanceRequests: any[]) => ({
    ...state,
    balanceRequests: state.balanceRequests.concat(newBalanceRequests),
  }))
  updateBalanceRequests = this.updater((state, updatedBalanceRequests: any[]) => {
    return {
      ...state,
      balanceRequests: state.balanceRequests.map((balanceRequest) => {
        const updated = updatedBalanceRequests.find((el) => el.id === balanceRequest.id)
        return updated ? updated : balanceRequest
      }),
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery,
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.balanceRequestService.validateBalanceRequestExcelData(excelData, vm.documents, vm.legalCases)
      }),
    )
  }

  readonly loadBalanceRequestEffect = this.effect<string>((balanceRequestId$) =>
    balanceRequestId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((balanceRequestId) =>
        this.data.userBalanceRequest({ balanceRequestId }).pipe(
          tapResponse(
            (res) => {
              this.patchState({
                item: res.data.item,
                errors: res.errors,
                loading: false,
              })
            },
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

  readonly loadBalanceRequestsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userBalanceRequests({ input }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                balanceRequests: res.data.items,
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

  readonly createBalanceRequestEffect = this.effect<UserCreateBalanceRequestInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.balanceRequestService.createBalanceRequest({ ...input }).pipe(
          tapResponse(
            (balanceRequest: BalanceRequest) => {
              this.addNewBalanceRequest(balanceRequest)
              this.toast.success('Created Successfully!')
              setTimeout(() => this.patchState({ item: balanceRequest, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        ),
      ),
    ),
  )

  readonly updateBalanceRequestEffect = this.effect<UserUpdateBalanceRequestInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.balanceRequestService.updateBalanceRequest(input, input.id).pipe(
          tapResponse(
            (balanceRequest) => {
              this.updateBalanceRequest(balanceRequest)
              this.toast.success('Updated Successfully!')
              setTimeout(() => this.patchState({ item: balanceRequest, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        ),
      ),
    ),
  )

  readonly deleteBalanceRequestEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([_, balanceRequest]) => {
        return this.data.userDeleteBalanceRequest({ balanceRequestId: balanceRequest.id }).pipe(
          tapResponse(
            (res) => {
              this.toast.success('Deleted successfully!', { duration: 3000 })
              setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            },
          ),
        )
      }),
    ),
  )

  readonly importExcelEffect = this.effect<UserUpdateBalanceRequestInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((data) =>
        this.balanceRequestService.importBalanceRequests(data).pipe(
          catchError((error) => {
            this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
            return EMPTY
          }),
          tap((updateResult) => {
            const created = JSON.parse(updateResult.created)
            const updated = JSON.parse(updateResult.updated)
            const failed = JSON.parse(updateResult.failed)
            const total = created.length + updated.length + failed.length

            this.addBalanceRequests(created)
            this.updateBalanceRequests(updated)

            this.toast.success(
              `${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`,
              { duration: 3000 },
            )
          }),
        ),
      ),
    ),
  )
}
