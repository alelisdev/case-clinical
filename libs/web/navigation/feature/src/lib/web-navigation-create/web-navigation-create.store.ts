
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateNavigationInput, WebCoreDataAccessService, Navigation, User } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface NavigationCreateState {
  errors?: any
  loading?: boolean
  item?: Navigation,
 users?: User[],
 navigations?: Navigation[]
  searchTerm?: string
}

@Injectable()
export class WebNavigationCreateStore extends ComponentStore<NavigationCreateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute ) {
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


    

  readonly createNavigationEffect = this.effect<UserCreateNavigationInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateNavigation({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
              return this.router.navigate(['..', res.data?.created?.id], {relativeTo: this.route})
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
}
