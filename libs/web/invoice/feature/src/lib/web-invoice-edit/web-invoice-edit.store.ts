
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateInvoiceInput, WebCoreDataAccessService, Invoice, BatchControl,Organization,BillToPatient } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface InvoiceUpdateState {
  errors ?: any
  loading?: boolean
  item?: Invoice,
 batchControls?: BatchControl[],
 organizations?: Organization[],
 billToPatients?: BillToPatient[]
  searchTerm?: string
}

@Injectable()
export class WebInvoiceEditStore extends ComponentStore<InvoiceUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadInvoiceEffect(route.params.pipe(pluck('invoiceId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly batchControls$ = this.select((s) => s.batchControls)
  readonly organizations$ = this.select((s) => s.organizations)
  readonly billToPatients$ = this.select((s) => s.billToPatients)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.batchControls$,this.organizations$,this.billToPatients$,
    (errors, loading, item, batchControls,organizations,billToPatients ) => ({
    errors,
    loading,
    item,
batchControls,organizations,billToPatients
  }),
{debounce: true})



  readonly filterBatchControls = (term) => 
        this.data.userBatchControls({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let batchControls = res.data.items;
              return batchControls
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


  readonly filterOrganizations = (term) => 
        this.data.userOrganizations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let organizations = res.data.items;
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


  readonly filterBillToPatients = (term) => 
        this.data.userBillToPatients({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let billToPatients = res.data.items;
              return billToPatients
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


    

readonly loadInvoiceEffect = this.effect<string>((invoiceId$) =>
    invoiceId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((invoiceId) =>
        this.data.userInvoice({ invoiceId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly updateInvoiceEffect = this.effect<UserUpdateInvoiceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateInvoice({ input, invoiceId: item.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.updated, errors: res.errors, loading: false })
              return this.router.navigate(['..'],{relativeTo: this.route})
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
}

