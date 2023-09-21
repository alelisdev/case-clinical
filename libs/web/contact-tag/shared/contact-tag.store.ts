
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContactTagService } from './contact-tag.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContactTagInput, UserUpdateContactTagInput, WebCoreDataAccessService, CorePaging, ContactTag, Contact } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContactTagFeatureState {
  errors?: any
  loading?: boolean
  item?: ContactTag
  done: boolean,
  formName?: string
contactId?: string,
  contactTags: ContactTag[]
 contacts?: Contact[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContactTagFeatureStore extends ComponentStore<ContactTagFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactTagService: ContactTagService
) {
    super({ 
      loading: false,
      contactTags: [],
      done: false,
      searchQuery: '',
      formName: undefined,
contactId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contactTagId')) {
      var contactTagId = this.route.snapshot.paramMap.get('contactTagId')
      this.setFormName('contactTag_edit')
    } else {
      this.setFormName('contactTag_create')
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
  readonly contactTags$ = this.select((s) => s.contactTags)
  readonly contacts$ = this.select((s) => s.contacts || [])

readonly contactId$ = this.select((s) => s.contactId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contactTags$,
this.contacts$,
    (errors, loading, item, formName, contactTags, contacts ) => ({
    errors,
    loading,
    item,
    formName,
    contactTags,

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

    

  readonly setItem = this.updater((state, item: ContactTag) => ({...state, item}))

  addNewContactTag = this.updater((state, contactTag: ContactTag) => ({ ...state, contactTags: [...state.contactTags, contactTag] }))

  updateContactTag = this.updater((state, contactTag: ContactTag) => {
    return {
      ...state,
      contactTags: state.contactTags.map((el) => {
        if (el.id === contactTag.id) {
          return contactTag
        } else {
          return el
        }
      }),
    }
  })

  addContactTags = this.updater((state, newContactTags: any[]) => ({...state, contactTags: state.contactTags.concat(newContactTags) }))
  updateContactTags = this.updater((state, updatedContactTags: any[]) => {
    return {
      ...state,
      contactTags: state.contactTags.map((contactTag) => {
        const updated = updatedContactTags.find((el) => el.id === contactTag.id);
        return updated ? updated : contactTag;
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
        return this.contactTagService.validateContactTagExcelData(excelData, vm.contacts);
      })
    )
  }


  readonly loadContactTagEffect = this.effect<string>((contactTagId$) =>
    contactTagId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contactTagId) =>
        this.data.userContactTag({ contactTagId }).pipe(
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



  readonly loadContactTagsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContactTags({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                contactTags: res.data.items,
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

  readonly createContactTagEffect = this.effect<UserCreateContactTagInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.contactTagService.createContactTag({...input }).pipe(
          tapResponse(
            (contactTag: ContactTag) => {
              this.addNewContactTag(contactTag)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contactTag, loading: false, done: true }), 300);
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

    readonly updateContactTagEffect = this.effect<UserUpdateContactTagInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.contactTagService.updateContactTag(input, input.id).pipe(
              tapResponse(
                (contactTag) => {
                  this.updateContactTag(contactTag)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: contactTag, loading: false, done: true }), 300);
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
  
    readonly deleteContactTagEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contactTag]) => {
          return this.data.userDeleteContactTag({contactTagId: contactTag.id})
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

  readonly importExcelEffect = this.effect<UserUpdateContactTagInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contactTagService.importContactTags(data).pipe(
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

            this.addContactTags(created);
            this.updateContactTags(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
