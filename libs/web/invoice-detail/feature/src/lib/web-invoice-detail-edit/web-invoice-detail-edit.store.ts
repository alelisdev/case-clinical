
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateInvoiceDetailInput, WebCoreDataAccessService, InvoiceDetail, Invoice } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface InvoiceDetailUpdateState {
  errors ?: any
  loading?: boolean
  item?: InvoiceDetail,
 invoices?: Invoice[]
  searchTerm?: string
}

@Injectable()
export class WebInvoiceDetailEditStore extends ComponentStore<InvoiceDetailUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadInvoiceDetailEffect(route.params.pipe(pluck('invoiceDetailId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly invoices$ = this.select((s) => s.invoices)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.invoices$,
    (errors, loading, item, invoices ) => ({
    errors,
    loading,
    item,
invoices
  }),
{debounce: true})



  readonly filterInvoices = (term) => 
        this.data.userInvoices({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let invoices = res.data.items;
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


    

readonly loadInvoiceDetailEffect = this.effect<string>((invoiceDetailId$) =>
    invoiceDetailId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((invoiceDetailId) =>
        this.data.userInvoiceDetail({ invoiceDetailId }).pipe(
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

  readonly updateInvoiceDetailEffect = this.effect<UserUpdateInvoiceDetailInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateInvoiceDetail({ input, invoiceDetailId: item.id }).pipe(
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

