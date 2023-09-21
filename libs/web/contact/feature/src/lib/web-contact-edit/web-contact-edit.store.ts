
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateContactInput, WebCoreDataAccessService, Contact, ContactKind } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContactService } from '@case-clinical/web/contact/shared'

export interface ContactEditState {
  errors?: any
  loading?: boolean
  item?: Contact,
 contactKinds?: ContactKind[]
  searchTerm?: string
}

@Injectable()
export class WebContactEditStore extends ComponentStore<ContactEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contactService: ContactService
) {
    super({ loading: false })
    
    this.loadContactEffect(route.params.pipe(map((route) => route?.contactId)))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly contactKinds$ = this.select((s) => s.contactKinds || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.contactKinds$,
    (errors, loading, item, contactKinds ) => ({
    errors,
    loading,
    item,
contactKinds
  }),
{debounce: true})



  readonly filterContactKinds = (term) => 
        this.data.userSelectContactKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contactKinds = res.data.items;
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

  
  readonly loadContactEffect = this.effect<string>((contactId$) =>
     contactId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((contactId) =>
        this.data.userContact({contactId}).pipe(
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

  readonly updateContactEffect = this.effect<UserUpdateContactInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.contactService.updateContact(input, item?.id).pipe(
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
