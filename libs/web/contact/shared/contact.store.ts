
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContactService } from './contact.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContactInput, UserUpdateContactInput, WebCoreDataAccessService, CorePaging, Contact, ContactKind } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContactFeatureState {
  errors?: any
  loading?: boolean
  item?: Contact
  done: boolean,
  formName?: string
contactKindId?: string,
  contacts: Contact[]
 contactKinds?: ContactKind[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContactFeatureStore extends ComponentStore<ContactFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactService: ContactService
) {
    super({ 
      loading: false,
      contacts: [],
      done: false,
      searchQuery: '',
      formName: undefined,
contactKindId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contactId')) {
      this.setFormName('contact_edit')
    } else {
      this.setFormName('contact_create')
    }


    if(this.route.snapshot.paramMap.has("contactKindId")) {
      const contactKindId = this.route.snapshot.paramMap.get("contactKindId")
      this.setContactKindId(contactKindId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly contacts$ = this.select((s) => s.contacts)
  readonly contactKinds$ = this.select((s) => s.contactKinds || [])

readonly contactKindId$ = this.select((s) => s.contactKindId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contacts$,
this.contactKinds$,
    (errors, loading, item, formName, contacts, contactKinds ) => ({
    errors,
    loading,
    item,
    formName,
    contacts,

            contactKinds
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.contactKindId$, this.searchQuery$, (paging, contactKindId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    contactKindId: contactKindId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setContactKindId = this.updater((state, contactKindId: string) => ({
                ...state,
    contactKindId,
  }))



  readonly filterContactKinds = (term) => 
        this.data.userSelectContactKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              const contactKinds = res.data.items;
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



  readonly addContactKind = this.updater((state, contactKind: ContactKind) => ({
    ...state, contactKinds: state.contactKinds.concat(contactKind)
  }))

    

  readonly setItem = this.updater((state, item: Contact) => ({...state, item}))

  addNewContact = this.updater((state, contact: Contact) => ({ ...state, contacts: [...state.contacts, contact] }))

  updateContact = this.updater((state, contact: Contact) => {
    return {
      ...state,
      contacts: state.contacts.map((el) => {
        if (el.id === contact.id) {
          return contact
        } else {
          return el
        }
      }),
    }
  })

  addContacts = this.updater((state, newContacts: any[]) => ({...state, contacts: state.contacts.concat(newContacts) }))
  updateContacts = this.updater((state, updatedContacts: any[]) => {
    return {
      ...state,
      contacts: state.contacts.map((contact) => {
        const updated = updatedContacts.find((el) => el.id === contact.id);
        return updated ? updated : contact;
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
        return this.contactService.validateContactExcelData(excelData, vm.contactKinds);
      })
    )
  }


  readonly loadContactEffect = this.effect<string>((contactId$) =>
    contactId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contactId) =>
        this.data.userContact({ contactId }).pipe(
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



  readonly loadContactsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContacts({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                contacts: res.data.items,
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

  readonly createContactEffect = this.effect<UserCreateContactInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.contactService.createContact({...input }).pipe(
          tapResponse(
            (contact: Contact) => {
              this.addNewContact(contact)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contact, loading: false, done: true }), 300);
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

    readonly updateContactEffect = this.effect<UserUpdateContactInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.contactService.updateContact(input, input.id).pipe(
              tapResponse(
                (contact) => {
                  this.updateContact(contact)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: contact, loading: false, done: true }), 300);
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
  
    readonly deleteContactEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contact]) => {
          return this.data.userDeleteContact({contactId: contact.id})
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

  readonly importExcelEffect = this.effect<UserUpdateContactInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contactService.importContacts(data).pipe(
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

            this.addContacts(created);
            this.updateContacts(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
