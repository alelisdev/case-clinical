
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateContactPhoneNumberInput, WebCoreDataAccessService, ContactPhoneNumber, Country,Contact } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContactPhoneNumberService } from '@case-clinical/web/contact-phone-number/shared'

export interface ContactPhoneNumberEditState {
  errors?: any
  loading?: boolean
  item?: ContactPhoneNumber,
 countries?: Country[],
 contacts?: Contact[]
  searchTerm?: string
}

@Injectable()
export class WebContactPhoneNumberEditStore extends ComponentStore<ContactPhoneNumberEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactPhoneNumberService: ContactPhoneNumberService
) {
    super({ loading: false })
    
    this.loadContactPhoneNumberEffect(route.params.pipe(map((route) => route?.contactPhoneNumberId)))
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



  readonly addCountry = this.updater((state, country: Country) => ({
    ...state, countries: state.countries.concat(country)
  }))


  readonly addContact = this.updater((state, contact: Contact) => ({
    ...state, contacts: state.contacts.concat(contact)
  }))

  
  readonly loadContactPhoneNumberEffect = this.effect<string>((contactPhoneNumberId$) =>
     contactPhoneNumberId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((contactPhoneNumberId) =>
        this.data.userContactPhoneNumber({contactPhoneNumberId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updateContactPhoneNumberEffect = this.effect<UserUpdateContactPhoneNumberInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.contactPhoneNumberService.updateContactPhoneNumber(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
