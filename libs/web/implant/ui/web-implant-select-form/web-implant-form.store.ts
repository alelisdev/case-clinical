
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Implant, UserCreateImplantInput, ImplantCategory,Contact,Manufacturer } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ImplantFormState {
  errors?: any
  loading?: boolean
  item?: Implant,
 implantCategories?: ImplantCategory[],
 contacts?: Contact[],
 manufacturers?: Manufacturer[]
  searchTerm?: string
}

@Injectable()
export class WebImplantFormStore extends ComponentStore<ImplantFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly implantCategories$ = this.select((s) => s.implantCategories || [])
  readonly contacts$ = this.select((s) => s.contacts || [])
  readonly manufacturers$ = this.select((s) => s.manufacturers || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.implantCategories$,this.contacts$,this.manufacturers$,
    (errors, loading, item, implantCategories,contacts,manufacturers ) => ({
    errors,
    loading,
    item,
implantCategories,contacts,manufacturers
  }),
{debounce: true})



  readonly filterImplantCategories = (term) => 
        this.data.userSelectImplantCategories({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let implantCategories = res.data.items;
              this.patchState({implantCategories})
              return implantCategories
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


  readonly filterManufacturers = (term) => 
        this.data.userSelectManufacturers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let manufacturers = res.data.items;
              this.patchState({manufacturers})
              return manufacturers
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



  readonly createImplantEffect = this.effect<UserCreateImplantInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateImplant({ input }).pipe(
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


  readonly addImplantCategory = this.updater((state, implantCategory: ImplantCategory) => ({
    ...state, implantCategories: state.implantCategories.concat(implantCategory)
  }))


  readonly addContact = this.updater((state, contact: Contact) => ({
    ...state, contacts: state.contacts.concat(contact)
  }))


  readonly addManufacturer = this.updater((state, manufacturer: Manufacturer) => ({
    ...state, manufacturers: state.manufacturers.concat(manufacturer)
  }))

}
