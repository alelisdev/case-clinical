
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateAuthorizationKindInput, WebCoreDataAccessService, AuthorizationKind, Category } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AuthorizationKindService } from '@case-clinical/web/authorization-kind/shared'

export interface AuthorizationKindCreateState {
  errors?: any
  loading?: boolean
  item?: AuthorizationKind,
 categories?: Category[]
  searchTerm?: string
}

@Injectable()
export class WebAuthorizationKindCreateStore extends ComponentStore<AuthorizationKindCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly authorizationKindService: AuthorizationKindService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly categories$ = this.select((s) => s.categories || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.categories$,
    (errors, loading, item, categories ) => ({
    errors,
    loading,
    item,
categories
  }),
{debounce: true})



  readonly filterCategories = (term) => 
        this.data.userSelectCategories({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let categories = res.data.items;
              this.patchState({categories})
              return categories
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addCategory = this.updater((state, category: Category) => ({
    ...state, categories: state.categories.concat(category)
  }))

    

  readonly createAuthorizationKindEffect = this.effect<UserCreateAuthorizationKindInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.authorizationKindService.createAuthorizationKind({...input}).pipe(
          tapResponse(
            (authorizationKind: AuthorizationKind) => {
              this.patchState({ item: authorizationKind, loading: false })
              return this.router.navigate(['..', authorizationKind?.id], {relativeTo: this.route})
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
