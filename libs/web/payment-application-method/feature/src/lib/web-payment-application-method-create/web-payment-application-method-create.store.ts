
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePaymentApplicationMethodInput, WebCoreDataAccessService, PaymentApplicationMethod,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PaymentApplicationMethodService } from '@case-clinical/web/payment-application-method/shared'

export interface PaymentApplicationMethodCreateState {
  errors?: any
  loading?: boolean
  item?: PaymentApplicationMethod,

  searchTerm?: string
}

@Injectable()
export class WebPaymentApplicationMethodCreateStore extends ComponentStore<PaymentApplicationMethodCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly paymentApplicationMethodService: PaymentApplicationMethodService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 

    (errors, loading, item,  ) => ({
    errors,
    loading,
    item,

  }),
{debounce: true})





    

  readonly createPaymentApplicationMethodEffect = this.effect<UserCreatePaymentApplicationMethodInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.paymentApplicationMethodService.createPaymentApplicationMethod({...input}).pipe(
          tapResponse(
            (paymentApplicationMethod: PaymentApplicationMethod) => {
              this.patchState({ item: paymentApplicationMethod, loading: false })
              return this.router.navigate(['..', paymentApplicationMethod?.id], {relativeTo: this.route})
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
