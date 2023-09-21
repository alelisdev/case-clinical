

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Payment, CorePaging, UserUpdatePaymentInput ,BatchControl, Bank, PayorType, PaymentType, PaymentApplicationMethod } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PaymentService } from '@case-clinical/web/payment/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebBatchControlFeatureStore } from '@case-clinical/web/batch-control/shared'
import { WebBankFeatureStore } from '@case-clinical/web/bank/shared'
import { WebPayorTypeFeatureStore } from '@case-clinical/web/payor-type/shared'
import { WebPaymentTypeFeatureStore } from '@case-clinical/web/payment-type/shared'
import { WebPaymentApplicationMethodFeatureStore } from '@case-clinical/web/payment-application-method/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface PaymentListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
batchControlId?: string,bankId?: string,payorTypeId?: string,paymentTypeId?: string,paymentApplicationMethodId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Payment[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPaymentListStore extends ComponentStore<PaymentListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly paymentService: PaymentService,
        private readonly toast: WebUiToastService,
         private readonly batchControlStore: WebBatchControlFeatureStore,
 private readonly bankStore: WebBankFeatureStore,
 private readonly payorTypeStore: WebPayorTypeFeatureStore,
 private readonly paymentTypeStore: WebPaymentTypeFeatureStore,
 private readonly paymentApplicationMethodStore: WebPaymentApplicationMethodFeatureStore
    ) {
    super({
      headerTitle: 'Payments',
      searchFocused: false,
      searchQuery: '',
batchControlId: undefined,
bankId: undefined,
payorTypeId: undefined,
paymentTypeId: undefined,
paymentApplicationMethodId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("batchControlId")) {
      var batchControlId = this.router.snapshot.paramMap.get("batchControlId")
      this.setBatchControlId(batchControlId)
    }


    if(this.router.snapshot.paramMap.has("bankId")) {
      var bankId = this.router.snapshot.paramMap.get("bankId")
      this.setBankId(bankId)
    }


    if(this.router.snapshot.paramMap.has("payorTypeId")) {
      var payorTypeId = this.router.snapshot.paramMap.get("payorTypeId")
      this.setPayorTypeId(payorTypeId)
    }


    if(this.router.snapshot.paramMap.has("paymentTypeId")) {
      var paymentTypeId = this.router.snapshot.paramMap.get("paymentTypeId")
      this.setPaymentTypeId(paymentTypeId)
    }


    if(this.router.snapshot.paramMap.has("paymentApplicationMethodId")) {
      var paymentApplicationMethodId = this.router.snapshot.paramMap.get("paymentApplicationMethodId")
      this.setPaymentApplicationMethodId(paymentApplicationMethodId)
    }

    this.batchControlStore.loadBatchControlsEffect()
this.bankStore.loadBanksEffect()
this.payorTypeStore.loadPayorTypesEffect()
this.paymentTypeStore.loadPaymentTypesEffect()
this.paymentApplicationMethodStore.loadPaymentApplicationMethodsEffect()
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


            readonly setBatchControlId = this.updater((state, batchControlId: string) => ({
                ...state,
    batchControlId,
  }))


            readonly setBankId = this.updater((state, bankId: string) => ({
                ...state,
    bankId,
  }))


            readonly setPayorTypeId = this.updater((state, payorTypeId: string) => ({
                ...state,
    payorTypeId,
  }))


            readonly setPaymentTypeId = this.updater((state, paymentTypeId: string) => ({
                ...state,
    paymentTypeId,
  }))


            readonly setPaymentApplicationMethodId = this.updater((state, paymentApplicationMethodId: string) => ({
                ...state,
    paymentApplicationMethodId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly batchControlId$ = this.select((s) => s.batchControlId)

readonly bankId$ = this.select((s) => s.bankId)

readonly payorTypeId$ = this.select((s) => s.payorTypeId)

readonly paymentTypeId$ = this.select((s) => s.paymentTypeId)

readonly paymentApplicationMethodId$ = this.select((s) => s.paymentApplicationMethodId)

batchControls$ = this.batchControlStore.batchControls$
banks$ = this.bankStore.banks$
payorTypes$ = this.payorTypeStore.payorTypes$
paymentTypes$ = this.paymentTypeStore.paymentTypes$
paymentApplicationMethods$ = this.paymentApplicationMethodStore.paymentApplicationMethods$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.batchControlId$,
this.bankId$,
this.payorTypeId$,
this.paymentTypeId$,
this.paymentApplicationMethodId$, this.searchQuery$, (paging, batchControlId,
bankId,
payorTypeId,
paymentTypeId,
paymentApplicationMethodId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    batchControlId: batchControlId,bankId: bankId,payorTypeId: payorTypeId,paymentTypeId: paymentTypeId,paymentApplicationMethodId: paymentApplicationMethodId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.batchControlId$,
this.bankId$,
this.payorTypeId$,
this.paymentTypeId$,
this.paymentApplicationMethodId$,
    this.data$,
    this.batchControls$,
this.banks$,
this.payorTypes$,
this.paymentTypes$,
this.paymentApplicationMethods$,
    (paging, errors, loading, searchFocused, searchQuery, batchControlId,
bankId,
payorTypeId,
paymentTypeId,
paymentApplicationMethodId, data ,batchControls,banks,payorTypes,paymentTypes,paymentApplicationMethods) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      batchControlId,
bankId,
payorTypeId,
paymentTypeId,
paymentApplicationMethodId,
      data,
      batchControls,banks,payorTypes,paymentTypes,paymentApplicationMethods
    }),
  )

    addPayments = this.updater((state, payments: any[]) => ({...state, data: state.data.concat(payments) }))
    updatePayments = this.updater((state, payments: any[]) => {
        return {
            ...state,
            data: state.data.map((payment) => {
            const updated = payments.find((el) => el.id === payment.id);
            return updated ? updated : payment;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const batchControls = vm.batchControls;
const banks = vm.banks;
const payorTypes = vm.payorTypes;
const paymentTypes = vm.paymentTypes;
const paymentApplicationMethods = vm.paymentApplicationMethods;
        return this.paymentService.validatePaymentExcelData(excelData,batchControls,banks,payorTypes,paymentTypes,paymentApplicationMethods);
      })
    )
  }


  readonly loadPaymentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPayments({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdatePaymentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.paymentService.importPayments(data).pipe(
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

            this.addPayments(created);
            this.updatePayments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

