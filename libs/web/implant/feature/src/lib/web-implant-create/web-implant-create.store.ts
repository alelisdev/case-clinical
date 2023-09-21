
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateImplantInput, WebCoreDataAccessService, Implant, ImplantCategory,Contact,Manufacturer } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ImplantService } from '@case-clinical/web/implant/shared'

export interface ImplantCreateState {
  errors?: any
  loading?: boolean
  item?: Implant,
 implantCategories?: ImplantCategory[],
 contacts?: Contact[],
 manufacturers?: Manufacturer[]
  searchTerm?: string
}

@Injectable()
export class WebImplantCreateStore extends ComponentStore<ImplantCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly implantService: ImplantService
) {
    super({ loading: false })
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

    

  readonly createImplantEffect = this.effect<UserCreateImplantInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.implantService.createImplant({...input}).pipe(
          tapResponse(
            (implant: Implant) => {
              this.patchState({ item: implant, loading: false })
              return this.router.navigate(['..', implant?.id], {relativeTo: this.route})
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
