
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, AuthorizationKind, UserCreateAuthorizationKindInput, Category } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AuthorizationKindFormState {
  errors?: any
  loading?: boolean
  item?: AuthorizationKind,
 categories?: Category[]
  searchTerm?: string
}

@Injectable()
export class WebAuthorizationKindFormStore extends ComponentStore<AuthorizationKindFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
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



  readonly createAuthorizationKindEffect = this.effect<UserCreateAuthorizationKindInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateAuthorizationKind({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )


  readonly addCategory = this.updater((state, category: Category) => ({
    ...state, categories: state.categories.concat(category)
  }))

}
