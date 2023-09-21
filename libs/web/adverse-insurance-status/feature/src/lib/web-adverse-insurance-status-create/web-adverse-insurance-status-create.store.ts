
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateAdverseInsuranceStatusInput, WebCoreDataAccessService, AdverseInsuranceStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AdverseInsuranceStatusService } from '@case-clinical/web/adverse-insurance-status/shared'

export interface AdverseInsuranceStatusCreateState {
  errors?: any
  loading?: boolean
  item?: AdverseInsuranceStatus,

  searchTerm?: string
}

@Injectable()
export class WebAdverseInsuranceStatusCreateStore extends ComponentStore<AdverseInsuranceStatusCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly adverseInsuranceStatusService: AdverseInsuranceStatusService
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





    

  readonly createAdverseInsuranceStatusEffect = this.effect<UserCreateAdverseInsuranceStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.adverseInsuranceStatusService.createAdverseInsuranceStatus({...input}).pipe(
          tapResponse(
            (adverseInsuranceStatus: AdverseInsuranceStatus) => {
              this.patchState({ item: adverseInsuranceStatus, loading: false })
              return this.router.navigate(['..', adverseInsuranceStatus?.id], {relativeTo: this.route})
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
