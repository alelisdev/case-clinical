
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateContactEmailInput, WebCoreDataAccessService, ContactEmail, Contact } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContactEmailService } from '@case-clinical/web/contact-email/shared'

export interface ContactEmailCreateState {
  errors?: any
  loading?: boolean
  item?: ContactEmail,
 contacts?: Contact[]
  searchTerm?: string
}

@Injectable()
export class WebContactEmailCreateStore extends ComponentStore<ContactEmailCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactEmailService: ContactEmailService
) {
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



  readonly addContact = this.updater((state, contact: Contact) => ({
    ...state, contacts: state.contacts.concat(contact)
  }))

    

  readonly createContactEmailEffect = this.effect<UserCreateContactEmailInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.contactEmailService.createContactEmail({...input}).pipe(
          tapResponse(
            (contactEmail: ContactEmail) => {
              this.patchState({ item: contactEmail, loading: false })
              return this.router.navigate(['..', contactEmail?.id], {relativeTo: this.route})
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
