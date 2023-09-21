
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateHealthInsuranceInput, WebCoreDataAccessService, HealthInsurance,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { HealthInsuranceService } from '@case-clinical/web/health-insurance/shared'

export interface HealthInsuranceEditState {
  errors?: any
  loading?: boolean
  item?: HealthInsurance,

  searchTerm?: string
}

@Injectable()
export class WebHealthInsuranceEditStore extends ComponentStore<HealthInsuranceEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly healthInsuranceService: HealthInsuranceService
) {
    super({ loading: false })
    
    this.loadHealthInsuranceEffect(route.params.pipe(map((route) => route?.healthInsuranceId)))
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





  
  readonly loadHealthInsuranceEffect = this.effect<string>((healthInsuranceId$) =>
     healthInsuranceId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((healthInsuranceId) =>
        this.data.userHealthInsurance({healthInsuranceId}).pipe(
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

  readonly updateHealthInsuranceEffect = this.effect<UserUpdateHealthInsuranceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.healthInsuranceService.updateHealthInsurance(input, item?.id).pipe(
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
