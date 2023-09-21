
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateUserInput, WebCoreDataAccessService, User, Firm } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface UserUpdateState {
  errors ?: any
  loading?: boolean
  item?: User,
 firms?: Firm[]
  searchTerm?: string
}

@Injectable()
export class UserEditStore extends ComponentStore<UserUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadUserEffect(route.params.pipe(pluck('userId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly firms$ = this.select((s) => s.firms)
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.firms$,
    (errors, loading, item, firms ) => ({
    errors,
    loading,
    item,
firms
  }))



  readonly filterFirms = (term) => 
        this.data.userFirms({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let firms = res.data.items;
              return firms
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


    

readonly loadUserEffect = this.effect<string>((userId$) =>
    userId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((userId) =>
        this.data.userUser({ userId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly updateUserEffect = this.effect<UserUpdateUserInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateUser({ input, userId: item.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.updated, errors: res.errors, loading: false })
              return this.router.navigate(['/web/users', res.data?.updated?.id])
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


