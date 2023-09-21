
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateInsuranceSectorInput, WebCoreDataAccessService, InsuranceSector,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { InsuranceSectorService } from '@case-clinical/web/insurance-sector/shared'

export interface InsuranceSectorCreateState {
  errors?: any
  loading?: boolean
  item?: InsuranceSector,

  searchTerm?: string
}

@Injectable()
export class WebInsuranceSectorCreateStore extends ComponentStore<InsuranceSectorCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly insuranceSectorService: InsuranceSectorService
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





    

  readonly createInsuranceSectorEffect = this.effect<UserCreateInsuranceSectorInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.insuranceSectorService.createInsuranceSector({...input}).pipe(
          tapResponse(
            (insuranceSector: InsuranceSector) => {
              this.patchState({ item: insuranceSector, loading: false })
              return this.router.navigate(['..', insuranceSector?.id], {relativeTo: this.route})
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
