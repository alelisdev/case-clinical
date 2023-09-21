
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { InvoiceService } from './invoice.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateInvoiceInput, UserUpdateInvoiceInput, WebCoreDataAccessService, CorePaging, Invoice, Organization,LegalCase,Document } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface InvoiceFeatureState {
  errors?: any
  loading?: boolean
  item?: Invoice
  done: boolean,
  formName?: string
organizationId?: string,legalCaseId?: string,invoiceId?: string,
clinicalProviderId?: string,
  invoices: Invoice[]
 organizations?: Organization[],
 legalCases?: LegalCase[],
 attorneyId?: string,
 documents?: Document[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebInvoiceFeatureStore extends ComponentStore<InvoiceFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly invoiceService: InvoiceService
) {
    super({
      loading: false,
      invoices: [],
      done: false,
      searchQuery: '',
      formName: undefined,
organizationId: undefined,
legalCaseId: undefined,
invoiceId: undefined,
clinicalProviderId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('invoiceId')) {
      var invoiceId = this.route.snapshot.paramMap.get('invoiceId')
      this.setFormName('invoice_edit')
    } else {
      this.setFormName('invoice_create')
    }


    if(this.route.snapshot.paramMap.has("organizationId")) {
      var organizationId = this.route.snapshot.paramMap.get("organizationId")
      this.setOrganizationId(organizationId)
    }


    if(this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId")
      this.setLegalCaseId(legalCaseId)
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
  readonly invoices$ = this.select((s) => s.invoices)
  readonly organizations$ = this.select((s) => s.organizations || [])
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly attorneyId$ = this.select((s) => s.attorneyId)
  readonly documents$ = this.select((s) => s.documents || [])

readonly organizationId$ = this.select((s) => s.organizationId)

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

readonly invoiceId$ = this.select((s) => s.invoiceId)
readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.invoices$,
this.organizations$,this.legalCases$,this.documents$,
    (errors, loading, item, formName, invoices, organizations,legalCases,documents ) => ({
    errors,
    loading,
    item,
    formName,
    invoices,

            organizations,legalCases,documents
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.organizationId$,
this.legalCaseId$,
this.invoiceId$, this.searchQuery$, this.attorneyId$, this.clinicalProviderId$, (paging, organizationId,
legalCaseId,
invoiceId,searchQuery, attorneyId, clinicalProviderId) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    attorneyId,
    clinicalProviderId,
    organizationId: organizationId,legalCaseId: legalCaseId,invoiceId: invoiceId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setOrganizationId = this.updater((state, organizationId: string) => ({
                ...state,
    organizationId,
  }))


            readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
                ...state,
    legalCaseId,
  }))
            readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string|undefined) => ({
                ...state,
                clinicalProviderId,
  }))

            readonly setAttorneyId = this.updater((state, attorneyId: string|undefined) => ({
                ...state,
                attorneyId,
  }))


            readonly setInvoiceId = this.updater((state, invoiceId: string) => ({
                ...state,
    invoiceId,
  }))

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: {
      ...state.paging,
      skip: skip
    }
  }))

  readonly setLimit = this.updater((state, limit: number) => ({
    ...state,
    paging: {
      ...state.paging,
      limit: limit
    }
  }))


  readonly filterOrganizations = (term) =>
        this.data.userSelectOrganizations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let organizations = res.data.items;
              this.patchState({organizations})
              return organizations
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


  readonly filterLegalCases = (term) =>
        this.data.userSelectLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
              return legalCases
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


  readonly filterDocuments = (term) =>
        this.data.userSelectDocuments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let documents = res.data.items;
              this.patchState({documents})
              return documents
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



  readonly addOrganization = this.updater((state, organization: Organization) => ({
    ...state, organizations: state.organizations.concat(organization)
  }))


  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))


  readonly addDocument = this.updater((state, document: Document) => ({
    ...state, documents: state.documents.concat(document)
  }))



  readonly setItem = this.updater((state, item: Invoice) => ({...state, item}))

  addNewInvoice = this.updater((state, invoice: Invoice) => ({ ...state, invoices: [...state.invoices, invoice] }))

  updateInvoice = this.updater((state, invoice: Invoice) => {
    return {
      ...state,
      invoices: state.invoices.map((el) => {
        if (el.id === invoice.id) {
          return invoice
        } else {
          return el
        }
      }),
    }
  })

  addInvoices = this.updater((state, newInvoices: any[]) => ({...state, invoices: state.invoices.concat(newInvoices) }))
  updateInvoices = this.updater((state, updatedInvoices: any[]) => {
    return {
      ...state,
      invoices: state.invoices.map((invoice) => {
        const updated = updatedInvoices.find((el) => el.id === invoice.id);
        return updated ? updated : invoice;
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
        return this.invoiceService.validateInvoiceExcelData(excelData, vm.organizations,vm.legalCases,vm.documents);
      })
    )
  }


  readonly loadInvoiceEffect = this.effect<string>((invoiceId$) =>
    invoiceId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((invoiceId) =>
        this.data.userInvoice({ invoiceId }).pipe(
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



  readonly loadInvoicesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userInvoices({input}).pipe(
          tapResponse(
            (res) =>
              {
                console.log({ limit: input.limit, skip: input.skip, total: res.data.count.total })
                this.patchState({
                  paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                  invoices: res.data.items,
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

  readonly createInvoiceEffect = this.effect<UserCreateInvoiceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.invoiceService.createInvoice({...input }).pipe(
          tapResponse(
            (invoice: Invoice) => {
              this.addNewInvoice(invoice)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: invoice, loading: false, done: true }), 300);
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

    readonly updateInvoiceEffect = this.effect<UserUpdateInvoiceInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.invoiceService.updateInvoice(input, input.id).pipe(
              tapResponse(
                (invoice) => {
                  this.updateInvoice(invoice)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: invoice, loading: false, done: true }), 300);
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

    readonly deleteInvoiceEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, invoice]) => {
          return this.data.userDeleteInvoice({invoiceId: invoice.id})
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

  readonly importExcelEffect = this.effect<UserUpdateInvoiceInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.invoiceService.importInvoices(data).pipe(
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

            this.addInvoices(created);
            this.updateInvoices(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
