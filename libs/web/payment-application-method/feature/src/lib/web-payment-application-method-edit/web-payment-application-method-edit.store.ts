
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdatePaymentApplicationMethodInput, WebCoreDataAccessService, PaymentApplicationMethod,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PaymentApplicationMethodService } from '@case-clinical/web/payment-application-method/shared'

export interface PaymentApplicationMethodEditState {
  errors?: any
  loading?: boolean
  item?: PaymentApplicationMethod,

  searchTerm?: string
}

@Injectable()
export class WebPaymentApplicationMethodEditStore extends ComponentStore<PaymentApplicationMethodEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly paymentApplicationMethodService: PaymentApplicationMethodService
) {
    super({ loading: false })
    
    this.loadPaymentApplicationMethodEffect(route.params.pipe(map((route) => route?.paymentApplicationMethodId)))
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





  
  readonly loadPaymentApplicationMethodEffect = this.effect<string>((paymentApplicationMethodId$) =>
     paymentApplicationMethodId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((paymentApplicationMethodId) =>
        this.data.userPaymentApplicationMethod({paymentApplicationMethodId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updatePaymentApplicationMethodEffect = this.effect<UserUpdatePaymentApplicationMethodInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.paymentApplicationMethodService.updatePaymentApplicationMethod(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
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
