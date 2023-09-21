
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateImplantInput, WebCoreDataAccessService, Implant, ImplantCategory,Contact,Manufacturer } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ImplantService } from '@case-clinical/web/implant/shared'

export interface ImplantEditState {
  errors?: any
  loading?: boolean
  item?: Implant,
 implantCategories?: ImplantCategory[],
 contacts?: Contact[],
 manufacturers?: Manufacturer[]
  searchTerm?: string
}

@Injectable()
export class WebImplantEditStore extends ComponentStore<ImplantEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly implantService: ImplantService
) {
    super({ loading: false })
    
    this.loadImplantEffect(route.params.pipe(map((route) => route?.implantId)))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly implantCategories$ = this.select((s) => s.implantCategories || [])
  readonly contacts$ = this.select((s) => s.contacts || [])
  readonly manufacturers$ = this.select((s) => s.manufacturers || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.implantCategories$,this.contacts$,this.manufacturers$,
    (errors, loading, item, implantCategories,contacts,manufacturers ) => ({
    errors,
    loading,
    item,
implantCategories,contacts,manufacturers
  }),
{debounce: true})



  readonly filterImplantCategories = (term) => 
        this.data.userSelectImplantCategories({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let implantCategories = res.data.items;
              this.patchState({implantCategories})
              return implantCategories
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


  readonly filterManufacturers = (term) => 
        this.data.userSelectManufacturers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let manufacturers = res.data.items;
              this.patchState({manufacturers})
              return manufacturers
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



  readonly addImplantCategory = this.updater((state, implantCategory: ImplantCategory) => ({
    ...state, implantCategories: state.implantCategories.concat(implantCategory)
  }))


  readonly addContact = this.updater((state, contact: Contact) => ({
    ...state, contacts: state.contacts.concat(contact)
  }))


  readonly addManufacturer = this.updater((state, manufacturer: Manufacturer) => ({
    ...state, manufacturers: state.manufacturers.concat(manufacturer)
  }))

  
  readonly loadImplantEffect = this.effect<string>((implantId$) =>
     implantId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((implantId) =>
        this.data.userImplant({implantId}).pipe(
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

  readonly updateImplantEffect = this.effect<UserUpdateImplantInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.implantService.updateImplant(input, item?.id).pipe(
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
