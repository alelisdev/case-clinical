
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateHealthInsuranceInput, WebCoreDataAccessService, HealthInsurance,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { HealthInsuranceService } from '@case-clinical/web/health-insurance/shared'

export interface HealthInsuranceCreateState {
  errors?: any
  loading?: boolean
  item?: HealthInsurance,

  searchTerm?: string
}

@Injectable()
export class WebHealthInsuranceCreateStore extends ComponentStore<HealthInsuranceCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly healthInsuranceService: HealthInsuranceService
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





    

  readonly createHealthInsuranceEffect = this.effect<UserCreateHealthInsuranceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.healthInsuranceService.createHealthInsurance({...input}).pipe(
          tapResponse(
            (healthInsurance: HealthInsurance) => {
              this.patchState({ item: healthInsurance, loading: false })
              return this.router.navigate(['..', healthInsurance?.id], {relativeTo: this.route})
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
