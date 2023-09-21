
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateInsuranceTypeInput, WebCoreDataAccessService, InsuranceType,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { InsuranceTypeService } from '@case-clinical/web/insurance-type/shared'

export interface InsuranceTypeCreateState {
  errors?: any
  loading?: boolean
  item?: InsuranceType,

  searchTerm?: string
}

@Injectable()
export class WebInsuranceTypeCreateStore extends ComponentStore<InsuranceTypeCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly insuranceTypeService: InsuranceTypeService
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





    

  readonly createInsuranceTypeEffect = this.effect<UserCreateInsuranceTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.insuranceTypeService.createInsuranceType({...input}).pipe(
          tapResponse(
            (insuranceType: InsuranceType) => {
              this.patchState({ item: insuranceType, loading: false })
              return this.router.navigate(['..', insuranceType?.id], {relativeTo: this.route})
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
