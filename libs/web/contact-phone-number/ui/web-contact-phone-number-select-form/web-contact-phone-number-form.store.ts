
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, ContactPhoneNumber, UserCreateContactPhoneNumberInput, Country,Contact } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContactPhoneNumberFormState {
  errors?: any
  loading?: boolean
  item?: ContactPhoneNumber,
 countries?: Country[],
 contacts?: Contact[]
  searchTerm?: string
}

@Injectable()
export class WebContactPhoneNumberFormStore extends ComponentStore<ContactPhoneNumberFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly countries$ = this.select((s) => s.countries || [])
  readonly contacts$ = this.select((s) => s.contacts || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.countries$,this.contacts$,
    (errors, loading, item, countries,contacts ) => ({
    errors,
    loading,
    item,
countries,contacts
  }),
{debounce: true})



  readonly filterCountries = (term) => 
        this.data.userSelectCountries({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let countries = res.data.items;
              this.patchState({countries})
              return countries
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



  readonly createContactPhoneNumberEffect = this.effect<UserCreateContactPhoneNumberInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateContactPhoneNumber({ input }).pipe(
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


  readonly addCountry = this.updater((state, country: Country) => ({
    ...state, countries: state.countries.concat(country)
  }))


  readonly addContact = this.updater((state, contact: Contact) => ({
    ...state, contacts: state.contacts.concat(contact)
  }))

}
