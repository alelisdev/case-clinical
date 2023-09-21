
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateClaimStatusInput, WebCoreDataAccessService, ClaimStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ClaimStatusService } from '@case-clinical/web/claim-status/shared'

export interface ClaimStatusCreateState {
  errors?: any
  loading?: boolean
  item?: ClaimStatus,

  searchTerm?: string
}

@Injectable()
export class WebClaimStatusCreateStore extends ComponentStore<ClaimStatusCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly claimStatusService: ClaimStatusService
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





    

  readonly createClaimStatusEffect = this.effect<UserCreateClaimStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.claimStatusService.createClaimStatus({...input}).pipe(
          tapResponse(
            (claimStatus: ClaimStatus) => {
              this.patchState({ item: claimStatus, loading: false })
              return this.router.navigate(['..', claimStatus?.id], {relativeTo: this.route})
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
