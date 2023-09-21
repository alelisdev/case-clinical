
import { Injectable } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserUpdateContactMethodInput, WebCoreDataAccessService, ContactMethod,  } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, withLatestFrom, pluck, map } from 'rxjs/operators'

export interface ContactMethodUpdateState {
  errors ?: any
  loading?: boolean
  item?: ContactMethod,

  searchTerm?: string
}

@Injectable()
export class WebContactMethodEditStore extends ComponentStore<ContactMethodUpdateState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: Router, private readonly route: ActivatedRoute) {
    super({ loading: false })

    this.loadContactMethodEffect(route.params.pipe(pluck('contactMethodId')))
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




    

readonly loadContactMethodEffect = this.effect<string>((contactMethodId$) =>
    contactMethodId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((contactMethodId) =>
        this.data.userContactMethod({ contactMethodId }).pipe(
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

  readonly updateContactMethodEffect = this.effect<UserUpdateContactMethodInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.data.userUpdateContactMethod({ input, contactMethodId: item.id }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.updated, errors: res.errors, loading: false })
              return this.router.navigate(['..'],{relativeTo: this.route})
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

