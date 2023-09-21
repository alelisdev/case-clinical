
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContactEmailService } from './contact-email.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContactEmailInput, UserUpdateContactEmailInput, WebCoreDataAccessService, CorePaging, ContactEmail, Contact } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContactEmailFeatureState {
  errors?: any
  loading?: boolean
  item?: ContactEmail
  done: boolean,
  formName?: string
contactId?: string,
  contactEmails: ContactEmail[]
 contacts?: Contact[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContactEmailFeatureStore extends ComponentStore<ContactEmailFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactEmailService: ContactEmailService
) {
    super({ 
      loading: false,
      contactEmails: [],
      done: false,
      searchQuery: '',
      formName: undefined,
contactId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contactEmailId')) {
      var contactEmailId = this.route.snapshot.paramMap.get('contactEmailId')
      this.setFormName('contactEmail_edit')
    } else {
      this.setFormName('contactEmail_create')
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
  readonly contactEmails$ = this.select((s) => s.contactEmails)
  readonly contacts$ = this.select((s) => s.contacts || [])

readonly contactId$ = this.select((s) => s.contactId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contactEmails$,
this.contacts$,
    (errors, loading, item, formName, contactEmails, contacts ) => ({
    errors,
    loading,
    item,
    formName,
    contactEmails,

            contacts
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.contactId$, this.searchQuery$, (paging, contactId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    contactId: contactId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setContactId = this.updater((state, contactId: string) => ({
                ...state,
    contactId,
  }))



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



  readonly addContact = this.updater((state, contact: Contact) => ({
    ...state, contacts: state.contacts.concat(contact)
  }))

    

  readonly setItem = this.updater((state, item: ContactEmail) => ({...state, item}))

  addNewContactEmail = this.updater((state, contactEmail: ContactEmail) => ({ ...state, contactEmails: [...state.contactEmails, contactEmail] }))

  updateContactEmail = this.updater((state, contactEmail: ContactEmail) => {
    return {
      ...state,
      contactEmails: state.contactEmails.map((el) => {
        if (el.id === contactEmail.id) {
          return contactEmail
        } else {
          return el
        }
      }),
    }
  })

  addContactEmails = this.updater((state, newContactEmails: any[]) => ({...state, contactEmails: state.contactEmails.concat(newContactEmails) }))
  updateContactEmails = this.updater((state, updatedContactEmails: any[]) => {
    return {
      ...state,
      contactEmails: state.contactEmails.map((contactEmail) => {
        const updated = updatedContactEmails.find((el) => el.id === contactEmail.id);
        return updated ? updated : contactEmail;
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
        return this.contactEmailService.validateContactEmailExcelData(excelData, vm.contacts);
      })
    )
  }


  readonly loadContactEmailEffect = this.effect<string>((contactEmailId$) =>
    contactEmailId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contactEmailId) =>
        this.data.userContactEmail({ contactEmailId }).pipe(
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



  readonly loadContactEmailsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContactEmails({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                contactEmails: res.data.items,
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

  readonly createContactEmailEffect = this.effect<UserCreateContactEmailInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.contactEmailService.createContactEmail({...input }).pipe(
          tapResponse(
            (contactEmail: ContactEmail) => {
              this.addNewContactEmail(contactEmail)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contactEmail, loading: false, done: true }), 300);
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

    readonly updateContactEmailEffect = this.effect<UserUpdateContactEmailInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.contactEmailService.updateContactEmail(input, input.id).pipe(
              tapResponse(
                (contactEmail) => {
                  this.updateContactEmail(contactEmail)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: contactEmail, loading: false, done: true }), 300);
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
  
    readonly deleteContactEmailEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contactEmail]) => {
          return this.data.userDeleteContactEmail({contactEmailId: contactEmail.id})
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

  readonly importExcelEffect = this.effect<UserUpdateContactEmailInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contactEmailService.importContactEmails(data).pipe(
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

            this.addContactEmails(created);
            this.updateContactEmails(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
