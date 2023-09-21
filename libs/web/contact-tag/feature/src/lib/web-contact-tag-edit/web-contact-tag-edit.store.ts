
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateContactTagInput, WebCoreDataAccessService, ContactTag, Contact } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContactTagService } from '@case-clinical/web/contact-tag/shared'

export interface ContactTagEditState {
  errors?: any
  loading?: boolean
  item?: ContactTag,
 contacts?: Contact[]
  searchTerm?: string
}

@Injectable()
export class WebContactTagEditStore extends ComponentStore<ContactTagEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactTagService: ContactTagService
) {
    super({ loading: false })
    
    this.loadContactTagEffect(route.params.pipe(map((route) => route?.contactTagId)))
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

  
  readonly loadContactTagEffect = this.effect<string>((contactTagId$) =>
     contactTagId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((contactTagId) =>
        this.data.userContactTag({contactTagId}).pipe(
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

  readonly updateContactTagEffect = this.effect<UserUpdateContactTagInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.contactTagService.updateContactTag(input, item?.id).pipe(
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
