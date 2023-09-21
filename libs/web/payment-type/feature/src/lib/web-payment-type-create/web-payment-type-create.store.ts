
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePaymentTypeInput, WebCoreDataAccessService, PaymentType,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PaymentTypeService } from '@case-clinical/web/payment-type/shared'

export interface PaymentTypeCreateState {
  errors?: any
  loading?: boolean
  item?: PaymentType,

  searchTerm?: string
}

@Injectable()
export class WebPaymentTypeCreateStore extends ComponentStore<PaymentTypeCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly paymentTypeService: PaymentTypeService
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





    

  readonly createPaymentTypeEffect = this.effect<UserCreatePaymentTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.paymentTypeService.createPaymentType({...input}).pipe(
          tapResponse(
            (paymentType: PaymentType) => {
              this.patchState({ item: paymentType, loading: false })
              return this.router.navigate(['..', paymentType?.id], {relativeTo: this.route})
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
