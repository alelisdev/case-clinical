
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,InvoiceDetail } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface InvoiceDetailDetailState {
  errors ?: any
  loading?: boolean
  item?: InvoiceDetail
}

@Injectable()
export class WebInvoiceDetailDetailStore extends ComponentStore<InvoiceDetailDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadInvoiceDetailEffect(route.params.pipe(pluck('invoiceDetailId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Name', value: item?.name },

{ label: 'Date of Service', value: item?.dateOfService },
{ label: 'Provider Name', value: item?.providerName },
{ label: 'Procedure Description', value: item?.procedureDescription },
{ label: 'Quantity', value: item?.quantity },
{ label: 'Charges', value: item?.charges },
{ label: 'Line Total', value: item?.lineTotal },
{ label: 'Case Accounts', value: item?.caseAccounts },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

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

  readonly deleteInvoiceDetailEffect = this.effect<InvoiceDetail>(
    (invoiceDetail$) =>
      invoiceDetail$.pipe(
        switchMap((invoiceDetail) =>
          this.data
            .userDeleteInvoiceDetail({
              invoiceDetailId: invoiceDetail.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/invoice-details'])
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

