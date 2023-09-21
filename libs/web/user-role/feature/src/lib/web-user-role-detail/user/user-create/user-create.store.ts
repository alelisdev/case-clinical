
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserCreateUserInput, WebCoreDataAccessService, User, Firm } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface UserCreateState {
  errors?: any
  loading?: boolean
  item?: User,
 firms?: Firm[]
  searchTerm?: string
}

@Injectable()
export class UserCreateStore extends ComponentStore<UserCreateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private route: ActivatedRoute) {
    super({ loading: false })
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


    

  readonly createUserEffect = this.effect<UserCreateUserInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateUser({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
              return this.router.navigate(['..'], {relativeTo: this.route})
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


