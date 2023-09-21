
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, ContactTag, UserCreateContactTagInput, Contact } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContactTagFormState {
  errors?: any
  loading?: boolean
  item?: ContactTag,
 contacts?: Contact[]
  searchTerm?: string
}

@Injectable()
export class WebContactTagFormStore extends ComponentStore<ContactTagFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly contacts$ = this.select((s) => s.contacts || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.contacts$,
    (errors, loading, item, contacts ) => ({
    errors,
    loading,
    item,
contacts
  }),
{debounce: true})



  readonly filterContacts = (term) => 
        this.data.userSelectContacts({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contacts = res.data.items;
              this.patchState({contacts})
              return contacts
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



  readonly createContactTagEffect = this.effect<UserCreateContactTagInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateContactTag({ input }).pipe(
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


  readonly addContact = this.updater((state, contact: Contact) => ({
    ...state, contacts: state.contacts.concat(contact)
  }))

}
