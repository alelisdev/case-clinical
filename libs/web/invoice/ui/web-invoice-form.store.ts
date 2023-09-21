
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Invoice, BatchControl,Organization,BillToPatient } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface InvoiceFormState {
  errors?: any
  loading?: boolean
  item?: Invoice,
 batchControls?: BatchControl[],
 organizations?: Organization[],
 billToPatients?: BillToPatient[]
  searchTerm?: string
}

@Injectable()
export class WebInvoiceFormStore extends ComponentStore<InvoiceFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
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


}
