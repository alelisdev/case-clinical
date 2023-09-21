
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateAuthorizationStatusInput, WebCoreDataAccessService, AuthorizationStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AuthorizationStatusService } from '@case-clinical/web/authorization-status/shared'

export interface AuthorizationStatusCreateState {
  errors?: any
  loading?: boolean
  item?: AuthorizationStatus,

  searchTerm?: string
}

@Injectable()
export class WebAuthorizationStatusCreateStore extends ComponentStore<AuthorizationStatusCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly authorizationStatusService: AuthorizationStatusService
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





    

  readonly createAuthorizationStatusEffect = this.effect<UserCreateAuthorizationStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.authorizationStatusService.createAuthorizationStatus({...input}).pipe(
          tapResponse(
            (authorizationStatus: AuthorizationStatus) => {
              this.patchState({ item: authorizationStatus, loading: false })
              return this.router.navigate(['..', authorizationStatus?.id], {relativeTo: this.route})
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
