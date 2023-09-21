
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateContractedRateKindInput, WebCoreDataAccessService, ContractedRateKind,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContractedRateKindService } from '@case-clinical/web/contracted-rate-kind/shared'

export interface ContractedRateKindCreateState {
  errors?: any
  loading?: boolean
  item?: ContractedRateKind,

  searchTerm?: string
}

@Injectable()
export class WebContractedRateKindCreateStore extends ComponentStore<ContractedRateKindCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractedRateKindService: ContractedRateKindService
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





    

  readonly createContractedRateKindEffect = this.effect<UserCreateContractedRateKindInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.contractedRateKindService.createContractedRateKind({...input}).pipe(
          tapResponse(
            (contractedRateKind: ContractedRateKind) => {
              this.patchState({ item: contractedRateKind, loading: false })
              return this.router.navigate(['..', contractedRateKind?.id], {relativeTo: this.route})
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
