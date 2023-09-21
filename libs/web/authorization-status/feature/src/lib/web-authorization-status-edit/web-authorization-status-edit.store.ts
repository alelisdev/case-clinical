
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateAuthorizationStatusInput, WebCoreDataAccessService, AuthorizationStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AuthorizationStatusService } from '@case-clinical/web/authorization-status/shared'

export interface AuthorizationStatusEditState {
  errors?: any
  loading?: boolean
  item?: AuthorizationStatus,

  searchTerm?: string
}

@Injectable()
export class WebAuthorizationStatusEditStore extends ComponentStore<AuthorizationStatusEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly authorizationStatusService: AuthorizationStatusService
) {
    super({ loading: false })
    
    this.loadAuthorizationStatusEffect(route.params.pipe(map((route) => route?.authorizationStatusId)))
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





  
  readonly loadAuthorizationStatusEffect = this.effect<string>((authorizationStatusId$) =>
     authorizationStatusId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((authorizationStatusId) =>
        this.data.userAuthorizationStatus({authorizationStatusId}).pipe(
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

  readonly updateAuthorizationStatusEffect = this.effect<UserUpdateAuthorizationStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.authorizationStatusService.updateAuthorizationStatus(input, item?.id).pipe(
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
