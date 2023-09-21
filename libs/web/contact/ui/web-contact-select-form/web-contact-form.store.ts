
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Contact, UserCreateContactInput, ContactKind } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContactFormState {
  errors?: any
  loading?: boolean
  item?: Contact,
 contactKinds?: ContactKind[]
  searchTerm?: string
}

@Injectable()
export class WebContactFormStore extends ComponentStore<ContactFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly contactKinds$ = this.select((s) => s.contactKinds || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.contactKinds$,
    (errors, loading, item, contactKinds ) => ({
    errors,
    loading,
    item,
contactKinds
  }),
{debounce: true})



  readonly filterContactKinds = (term) => 
        this.data.userSelectContactKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contactKinds = res.data.items;
              this.patchState({contactKinds})
              return contactKinds
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



  readonly createContactEffect = this.effect<UserCreateContactInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateContact({ input }).pipe(
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


  readonly addContactKind = this.updater((state, contactKind: ContactKind) => ({
    ...state, contactKinds: state.contactKinds.concat(contactKind)
  }))

}
