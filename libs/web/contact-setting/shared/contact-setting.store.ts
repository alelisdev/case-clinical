
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ContactSettingService } from './contact-setting.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateContactSettingInput, UserUpdateContactSettingInput, WebCoreDataAccessService, CorePaging, ContactSetting, Contact,Integration } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ContactSettingFeatureState {
  errors?: any
  loading?: boolean
  item?: ContactSetting
  done: boolean,
  formName?: string
contactId?: string,integrationId?: string,
  contactSettings: ContactSetting[]
 contacts?: Contact[],
 integrations?: Integration[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebContactSettingFeatureStore extends ComponentStore<ContactSettingFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactSettingService: ContactSettingService
) {
    super({ 
      loading: false,
      contactSettings: [],
      done: false,
      searchQuery: '',
      formName: undefined,
contactId: undefined,
integrationId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('contactSettingId')) {
      var contactSettingId = this.route.snapshot.paramMap.get('contactSettingId')
      this.setFormName('contactSetting_edit')
    } else {
      this.setFormName('contactSetting_create')
    }


    if(this.route.snapshot.paramMap.has("contactId")) {
      var contactId = this.route.snapshot.paramMap.get("contactId")
      this.setContactId(contactId)
    }


    if(this.route.snapshot.paramMap.has("integrationId")) {
      var integrationId = this.route.snapshot.paramMap.get("integrationId")
      this.setIntegrationId(integrationId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly contactSettings$ = this.select((s) => s.contactSettings)
  readonly contacts$ = this.select((s) => s.contacts || [])
  readonly integrations$ = this.select((s) => s.integrations || [])

readonly contactId$ = this.select((s) => s.contactId)

readonly integrationId$ = this.select((s) => s.integrationId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.contactSettings$,
this.contacts$,this.integrations$,
    (errors, loading, item, formName, contactSettings, contacts,integrations ) => ({
    errors,
    loading,
    item,
    formName,
    contactSettings,

            contacts,integrations
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.contactId$,
this.integrationId$, this.searchQuery$, (paging, contactId,
integrationId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    contactId: contactId,integrationId: integrationId,
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


            readonly setIntegrationId = this.updater((state, integrationId: string) => ({
                ...state,
    integrationId,
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


  readonly filterIntegrations = (term) => 
        this.data.userSelectIntegrations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let integrations = res.data.items;
              this.patchState({integrations})
              return integrations
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


  readonly addIntegration = this.updater((state, integration: Integration) => ({
    ...state, integrations: state.integrations.concat(integration)
  }))

    

  readonly setItem = this.updater((state, item: ContactSetting) => ({...state, item}))

  addNewContactSetting = this.updater((state, contactSetting: ContactSetting) => ({ ...state, contactSettings: [...state.contactSettings, contactSetting] }))

  updateContactSetting = this.updater((state, contactSetting: ContactSetting) => {
    return {
      ...state,
      contactSettings: state.contactSettings.map((el) => {
        if (el.id === contactSetting.id) {
          return contactSetting
        } else {
          return el
        }
      }),
    }
  })

  addContactSettings = this.updater((state, newContactSettings: any[]) => ({...state, contactSettings: state.contactSettings.concat(newContactSettings) }))
  updateContactSettings = this.updater((state, updatedContactSettings: any[]) => {
    return {
      ...state,
      contactSettings: state.contactSettings.map((contactSetting) => {
        const updated = updatedContactSettings.find((el) => el.id === contactSetting.id);
        return updated ? updated : contactSetting;
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
        return this.contactSettingService.validateContactSettingExcelData(excelData, vm.contacts,vm.integrations);
      })
    )
  }


  readonly loadContactSettingEffect = this.effect<string>((contactSettingId$) =>
    contactSettingId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((contactSettingId) =>
        this.data.userContactSetting({ contactSettingId }).pipe(
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



  readonly loadContactSettingsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userContactSettings({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                contactSettings: res.data.items,
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

  readonly createContactSettingEffect = this.effect<UserCreateContactSettingInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.contactSettingService.createContactSetting({...input }).pipe(
          tapResponse(
            (contactSetting: ContactSetting) => {
              this.addNewContactSetting(contactSetting)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: contactSetting, loading: false, done: true }), 300);
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

    readonly updateContactSettingEffect = this.effect<UserUpdateContactSettingInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.contactSettingService.updateContactSetting(input, input.id).pipe(
              tapResponse(
                (contactSetting) => {
                  this.updateContactSetting(contactSetting)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: contactSetting, loading: false, done: true }), 300);
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
  
    readonly deleteContactSettingEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, contactSetting]) => {
          return this.data.userDeleteContactSetting({contactSettingId: contactSetting.id})
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

  readonly importExcelEffect = this.effect<UserUpdateContactSettingInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.contactSettingService.importContactSettings(data).pipe(
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

            this.addContactSettings(created);
            this.updateContactSettings(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
