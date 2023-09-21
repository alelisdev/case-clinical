import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { Injectable, Injector } from '@angular/core'
import { ModalController } from '@case-clinical/web/ui/form'
import { of, switchMap } from 'rxjs'
import { WebInvoiceFeatureStore } from '@case-clinical/web/invoice/shared'

export interface InvoicesState extends AttorneyBaseState {
  loading: boolean
  promiseAttorneyAmount: number
  query: string
  selectedInvoices: any[] | []
}

@Injectable()
export class InvoicesStore extends AttorneyBaseStore<InvoicesState> {

  /** Modal Controllers */
  addPromisePayModalController?: ModalController
  addPaymentPayModalController?: ModalController
  /** Modal Controllers */

  constructor(
    private invoiceStore: WebInvoiceFeatureStore,
    injector: Injector,
  ) {
    super(injector)
    this.invoiceStore.loadInvoicesEffect()
  }

  /** Selectors */
  loading$ = this.select((s) => s.loading)
  invoices$ = this.invoiceStore.invoices$
  selectedInvoices$ = this.select((s) => s.selectedInvoices)
  promiseAttorneyAmount$ = this.select((s) => s.promiseAttorneyAmount)
  invoiceAll$ = this.invoices$.pipe(
    switchMap((invoice) => {
      return of(
        invoice.map((item) => {
          return {
            id: item.id,
            name: item.name,
          }
        }),
      )
    }),
  )
  vm$ = this.select(
    this.loading$,
    this.user$,
    this.invoices$,
    this.invoiceAll$,
    this.selectedInvoices$,
    this.promiseAttorneyAmount$,
    (loading, user, invoices, invoiceAll, selectedInvoices, promiseAttorneyAmount) => {
      const count = selectedInvoices.length
      return {
        loading,
        user,
        invoices,
        invoiceAll,
        selectedInvoices,
        promiseToPayModel: {
          promiseToPays: selectedInvoices.map((item) => {
            return {
              ...item,
              pay: Math.ceil(promiseAttorneyAmount / count),
            }
          }),
          promisePay: promiseAttorneyAmount,
        },
      }
    },
  )
  /** Selectors */

  /** Updaters */
  setSelectedInvoices = this.updater((state, selectedInvoices: any[]) => ({ ...state, selectedInvoices }))
  setSettleAmount = this.updater((state, promiseAttorneyAmount: number) => ({ ...state, promiseAttorneyAmount }))
  /** Updaters */

  setAddPromisePayModalController(controller: ModalController) {
    this.addPromisePayModalController = controller
  }

  setAddPaymentPayModalController(controller: ModalController) {
    this.addPaymentPayModalController = controller
  }

  openAddPromisePayModalDialog() {
    this.addPromisePayModalController?.open()
  }

  openAddPaymentPayModalDialog() {
    this.addPaymentPayModalController?.open()
  }

  formatSettleAmount(value: string) {
    if (value === 'manual') {
      this.patchState({
        promiseAttorneyAmount: 0,
      })
    }
  }

  override attorneyIdDidChange(attorneyId: string): void {
    if(attorneyId !== 'all') {
      this.invoiceStore.setAttorneyId(attorneyId)
    } else {
      this.invoiceStore.setAttorneyId(undefined)
    }
    this.invoiceStore.loadInvoicesEffect();
  }

  override getInitialState(): InvoicesState {
    return {
      query: '',
      loading: false,
      selectedInvoices: [],
      promiseAttorneyAmount: 0,
    }
  }
}
