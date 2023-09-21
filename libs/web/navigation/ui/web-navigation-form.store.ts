
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Navigation, User } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface NavigationFormState {
  errors?: any
  loading?: boolean
  item?: Navigation,
 users?: User[],
 navigations?: Navigation[]
  searchTerm?: string
}

@Injectable()
export class WebNavigationFormStore extends ComponentStore<NavigationFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly users$ = this.select((s) => s.users)
  readonly navigations$ = this.select((s) => s.navigations)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.users$,this.navigations$,
    (errors, loading, item, users,navigations ) => ({
    errors,
    loading,
    item,
users,navigations
  }),
{debounce: true})



  readonly filterUsers = (term) => 
        this.data.userUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              return users
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


  readonly filterNavigations = (term) => 
        this.data.userNavigations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let navigations = res.data.items;
              return navigations
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


}
