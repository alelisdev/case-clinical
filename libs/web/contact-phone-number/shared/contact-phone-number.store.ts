
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContactPhoneNumberService } from './contact-phone-number.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContactPhoneNumberInput, UserUpdateContactPhoneNumberInput, WebCoreDataAccessService, CorePaging, ContactPhoneNumber, Country,Contact } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContactPhoneNumberFeatureState {
  errors?: any
  loading?: boolean
  item?: ContactPhoneNumber
  done: boolean,
  formName?: string
countryId?: string,contactId?: string,
  contactPhoneNumbers: ContactPhoneNumber[]
 countries?: Country[],
 contacts?: Contact[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContactPhoneNumberFeatureStore extends ComponentStore<ContactPhoneNumberFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactPhoneNumberService: ContactPhoneNumberService
) {
    super({ 
      loading: false,
      contactPhoneNumbers: [],
      done: false,
      searchQuery: '',
      formName: undefined,
countryId: undefined,
contactId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contactPhoneNumberId')) {
      var contactPhoneNumberId = this.route.snapshot.paramMap.get('contactPhoneNumberId')
      this.setFormName('contactPhoneNumber_edit')
    } else {
      this.setFormName('contactPhoneNumber_create')
    }


    if(this.route.snapshot.paramMap.has("countryId")) {
      var countryId = this.route.snapshot.paramMap.get("countryId")
      this.setCountryId(countryId)
    }


    if(this.route.snapshot.paramMap.has("contactId")) {
      var contactId = this.route.snapshot.paramMap.get("contactId")
      this.setContactId(contactId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly contactPhoneNumbers$ = this.select((s) => s.contactPhoneNumbers)
  readonly countries$ = this.select((s) => s.countries || [])
  readonly contacts$ = this.select((s) => s.contacts || [])

readonly countryId$ = this.select((s) => s.countryId)

readonly contactId$ = this.select((s) => s.contactId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contactPhoneNumbers$,
this.countries$,this.contacts$,
    (errors, loading, item, formName, contactPhoneNumbers, countries,contacts ) => ({
    errors,
    loading,
    item,
    formName,
    contactPhoneNumbers,

            countries,contacts
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.countryId$,
this.contactId$, this.searchQuery$, (paging, countryId,
contactId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    countryId: countryId,contactId: contactId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setCountryId = this.updater((state, countryId: string) => ({
                ...state,
    countryId,
  }))


            readonly setContactId = this.updater((state, contactId: string) => ({
                ...state,
    contactId,
  }))



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

    

  readonly setItem = this.updater((state, item: ContactPhoneNumber) => ({...state, item}))

  addNewContactPhoneNumber = this.updater((state, contactPhoneNumber: ContactPhoneNumber) => ({ ...state, contactPhoneNumbers: [...state.contactPhoneNumbers, contactPhoneNumber] }))

  updateContactPhoneNumber = this.updater((state, contactPhoneNumber: ContactPhoneNumber) => {
    return {
      ...state,
      contactPhoneNumbers: state.contactPhoneNumbers.map((el) => {
        if (el.id === contactPhoneNumber.id) {
          return contactPhoneNumber
        } else {
          return el
        }
      }),
    }
  })

  addContactPhoneNumbers = this.updater((state, newContactPhoneNumbers: any[]) => ({...state, contactPhoneNumbers: state.contactPhoneNumbers.concat(newContactPhoneNumbers) }))
  updateContactPhoneNumbers = this.updater((state, updatedContactPhoneNumbers: any[]) => {
    return {
      ...state,
      contactPhoneNumbers: state.contactPhoneNumbers.map((contactPhoneNumber) => {
        const updated = updatedContactPhoneNumbers.find((el) => el.id === contactPhoneNumber.id);
        return updated ? updated : contactPhoneNumber;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.contactPhoneNumberService.validateContactPhoneNumberExcelData(excelData, vm.countries,vm.contacts);
      })
    )
  }


  readonly loadContactPhoneNumberEffect = this.effect<string>((contactPhoneNumberId$) =>
    contactPhoneNumberId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contactPhoneNumberId) =>
        this.data.userContactPhoneNumber({ contactPhoneNumberId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
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



  readonly loadContactPhoneNumbersEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContactPhoneNumbers({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                contactPhoneNumbers: res.data.items,
                errors: res.errors,
                loading: false,
              }),
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

  readonly createContactPhoneNumberEffect = this.effect<UserCreateContactPhoneNumberInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.contactPhoneNumberService.createContactPhoneNumber({...input }).pipe(
          tapResponse(
            (contactPhoneNumber: ContactPhoneNumber) => {
              this.addNewContactPhoneNumber(contactPhoneNumber)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contactPhoneNumber, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
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
            this.contactPhoneNumberService.updateContactPhoneNumber(input, input.id).pipe(
              tapResponse(
                (contactPhoneNumber) => {
                  this.updateContactPhoneNumber(contactPhoneNumber)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: contactPhoneNumber, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )
  
    readonly deleteContactPhoneNumberEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contactPhoneNumber]) => {
          return this.data.userDeleteContactPhoneNumber({contactPhoneNumberId: contactPhoneNumber.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateContactPhoneNumberInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contactPhoneNumberService.importContactPhoneNumbers(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addContactPhoneNumbers(created);
            this.updateContactPhoneNumbers(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
