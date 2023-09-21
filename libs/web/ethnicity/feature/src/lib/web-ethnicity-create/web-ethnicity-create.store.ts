
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateEthnicityInput, WebCoreDataAccessService, Ethnicity,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { EthnicityService } from '@case-clinical/web/ethnicity/shared'

export interface EthnicityCreateState {
  errors?: any
  loading?: boolean
  item?: Ethnicity,

  searchTerm?: string
}

@Injectable()
export class WebEthnicityCreateStore extends ComponentStore<EthnicityCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly ethnicityService: EthnicityService
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





    

  readonly createEthnicityEffect = this.effect<UserCreateEthnicityInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.ethnicityService.createEthnicity({...input}).pipe(
          tapResponse(
            (ethnicity: Ethnicity) => {
              this.patchState({ item: ethnicity, loading: false })
              return this.router.navigate(['..', ethnicity?.id], {relativeTo: this.route})
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
