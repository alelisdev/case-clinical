
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateContactSettingInput, WebCoreDataAccessService, ContactSetting, Contact,Integration } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContactSettingService } from '@case-clinical/web/contact-setting/shared'

export interface ContactSettingCreateState {
  errors?: any
  loading?: boolean
  item?: ContactSetting,
 contacts?: Contact[],
 integrations?: Integration[]
  searchTerm?: string
}

@Injectable()
export class WebContactSettingCreateStore extends ComponentStore<ContactSettingCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactSettingService: ContactSettingService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly contacts$ = this.select((s) => s.contacts || [])
  readonly integrations$ = this.select((s) => s.integrations || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.contacts$,this.integrations$,
    (errors, loading, item, contacts,integrations ) => ({
    errors,
    loading,
    item,
contacts,integrations
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

    

  readonly createContactSettingEffect = this.effect<UserCreateContactSettingInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.contactSettingService.createContactSetting({...input}).pipe(
          tapResponse(
            (contactSetting: ContactSetting) => {
              this.patchState({ item: contactSetting, loading: false })
              return this.router.navigate(['..', contactSetting?.id], {relativeTo: this.route})
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
