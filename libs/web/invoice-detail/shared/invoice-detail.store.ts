
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { InvoiceDetailService } from './invoice-detail.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateInvoiceDetailInput, UserUpdateInvoiceDetailInput, WebCoreDataAccessService, CorePaging, InvoiceDetail, Invoice } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface InvoiceDetailFeatureState {
  errors?: any
  loading?: boolean
  item?: InvoiceDetail
  done: boolean,
  formName?: string
invoiceId?: string,
  invoiceDetails: InvoiceDetail[]
 invoices?: Invoice[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebInvoiceDetailFeatureStore extends ComponentStore<InvoiceDetailFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly invoiceDetailService: InvoiceDetailService
) {
    super({ 
      loading: false,
      invoiceDetails: [],
      done: false,
      searchQuery: '',
      formName: undefined,
invoiceId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('invoiceDetailId')) {
      var invoiceDetailId = this.route.snapshot.paramMap.get('invoiceDetailId')
      this.setFormName('invoiceDetail_edit')
    } else {
      this.setFormName('invoiceDetail_create')
    }


    if(this.route.snapshot.paramMap.has("invoiceId")) {
      var invoiceId = this.route.snapshot.paramMap.get("invoiceId")
      this.setInvoiceId(invoiceId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly invoiceDetails$ = this.select((s) => s.invoiceDetails)
  readonly invoices$ = this.select((s) => s.invoices || [])

readonly invoiceId$ = this.select((s) => s.invoiceId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.invoiceDetails$,
this.invoices$,
    (errors, loading, item, formName, invoiceDetails, invoices ) => ({
    errors,
    loading,
    item,
    formName,
    invoiceDetails,

            invoices
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.invoiceId$, this.searchQuery$, (paging, invoiceId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    invoiceId: invoiceId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setInvoiceId = this.updater((state, invoiceId: string) => ({
                ...state,
    invoiceId,
  }))



  readonly filterInvoices = (term) => 
        this.data.userSelectInvoices({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let invoices = res.data.items;
              this.patchState({invoices})
              return invoices
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addInvoice = this.updater((state, invoice: Invoice) => ({
    ...state, invoices: state.invoices.concat(invoice)
  }))

    

  readonly setItem = this.updater((state, item: InvoiceDetail) => ({...state, item}))

  addNewInvoiceDetail = this.updater((state, invoiceDetail: InvoiceDetail) => ({ ...state, invoiceDetails: [...state.invoiceDetails, invoiceDetail] }))

  updateInvoiceDetail = this.updater((state, invoiceDetail: InvoiceDetail) => {
    return {
      ...state,
      invoiceDetails: state.invoiceDetails.map((el) => {
        if (el.id === invoiceDetail.id) {
          return invoiceDetail
        } else {
          return el
        }
      }),
    }
  })

  addInvoiceDetails = this.updater((state, newInvoiceDetails: any[]) => ({...state, invoiceDetails: state.invoiceDetails.concat(newInvoiceDetails) }))
  updateInvoiceDetails = this.updater((state, updatedInvoiceDetails: any[]) => {
    return {
      ...state,
      invoiceDetails: state.invoiceDetails.map((invoiceDetail) => {
        const updated = updatedInvoiceDetails.find((el) => el.id === invoiceDetail.id);
        return updated ? updated : invoiceDetail;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.invoiceDetailService.validateInvoiceDetailExcelData(excelData, vm.invoices);
      })
    )
  }


  readonly loadInvoiceDetailEffect = this.effect<string>((invoiceDetailId$) =>
    invoiceDetailId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((invoiceDetailId) =>
        this.data.userInvoiceDetail({ invoiceDetailId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
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



  readonly loadInvoiceDetailsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userInvoiceDetails({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                invoiceDetails: res.data.items,
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

  readonly createInvoiceDetailEffect = this.effect<UserCreateInvoiceDetailInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.invoiceDetailService.createInvoiceDetail({...input }).pipe(
          tapResponse(
            (invoiceDetail: InvoiceDetail) => {
              this.addNewInvoiceDetail(invoiceDetail)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: invoiceDetail, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
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
            }
          ),
        ),
      ),
    ),
  )

    readonly updateInvoiceDetailEffect = this.effect<UserUpdateInvoiceDetailInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.invoiceDetailService.updateInvoiceDetail(input, input.id).pipe(
              tapResponse(
                (invoiceDetail) => {
                  this.updateInvoiceDetail(invoiceDetail)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: invoiceDetail, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
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
                }
              ),
            ),
          ),
        ),
      )
  
    readonly deleteInvoiceDetailEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, invoiceDetail]) => {
          return this.data.userDeleteInvoiceDetail({invoiceDetailId: invoiceDetail.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
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
                }),
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateInvoiceDetailInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.invoiceDetailService.importInvoiceDetails(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addInvoiceDetails(created);
            this.updateInvoiceDetails(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
