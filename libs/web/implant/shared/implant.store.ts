
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ImplantService } from './implant.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateImplantInput, UserUpdateImplantInput, WebCoreDataAccessService, CorePaging, Implant, ImplantCategory,Contact,Manufacturer } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ImplantFeatureState {
  errors?: any
  loading?: boolean
  item?: Implant
  done: boolean,
  formName?: string
implantCategoryId?: string,salesRepresentativeId?: string,manufacturerId?: string,
  implants: Implant[]
 implantCategories?: ImplantCategory[],
 contacts?: Contact[],
 manufacturers?: Manufacturer[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebImplantFeatureStore extends ComponentStore<ImplantFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly implantService: ImplantService
) {
    super({ 
      loading: false,
      implants: [],
      done: false,
      searchQuery: '',
      formName: undefined,
implantCategoryId: undefined,
salesRepresentativeId: undefined,
manufacturerId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('implantId')) {
      var implantId = this.route.snapshot.paramMap.get('implantId')
      this.setFormName('implant_edit')
    } else {
      this.setFormName('implant_create')
    }


    if(this.route.snapshot.paramMap.has("implantCategoryId")) {
      var implantCategoryId = this.route.snapshot.paramMap.get("implantCategoryId")
      this.setImplantCategoryId(implantCategoryId)
    }


    if(this.route.snapshot.paramMap.has("salesRepresentativeId")) {
      var salesRepresentativeId = this.route.snapshot.paramMap.get("salesRepresentativeId")
      this.setSalesRepresentativeId(salesRepresentativeId)
    }


    if(this.route.snapshot.paramMap.has("manufacturerId")) {
      var manufacturerId = this.route.snapshot.paramMap.get("manufacturerId")
      this.setManufacturerId(manufacturerId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly implants$ = this.select((s) => s.implants)
  readonly implantCategories$ = this.select((s) => s.implantCategories || [])
  readonly contacts$ = this.select((s) => s.contacts || [])
  readonly manufacturers$ = this.select((s) => s.manufacturers || [])

readonly implantCategoryId$ = this.select((s) => s.implantCategoryId)

readonly salesRepresentativeId$ = this.select((s) => s.salesRepresentativeId)

readonly manufacturerId$ = this.select((s) => s.manufacturerId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.implants$,
this.implantCategories$,this.contacts$,this.manufacturers$,
    (errors, loading, item, formName, implants, implantCategories,contacts,manufacturers ) => ({
    errors,
    loading,
    item,
    formName,
    implants,

            implantCategories,contacts,manufacturers
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.implantCategoryId$,
this.salesRepresentativeId$,
this.manufacturerId$, this.searchQuery$, (paging, implantCategoryId,
salesRepresentativeId,
manufacturerId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    implantCategoryId: implantCategoryId,salesRepresentativeId: salesRepresentativeId,manufacturerId: manufacturerId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setImplantCategoryId = this.updater((state, implantCategoryId: string) => ({
                ...state,
    implantCategoryId,
  }))


            readonly setSalesRepresentativeId = this.updater((state, salesRepresentativeId: string) => ({
                ...state,
    salesRepresentativeId,
  }))


            readonly setManufacturerId = this.updater((state, manufacturerId: string) => ({
                ...state,
    manufacturerId,
  }))



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

    

  readonly setItem = this.updater((state, item: Implant) => ({...state, item}))

  addNewImplant = this.updater((state, implant: Implant) => ({ ...state, implants: [...state.implants, implant] }))

  updateImplant = this.updater((state, implant: Implant) => {
    return {
      ...state,
      implants: state.implants.map((el) => {
        if (el.id === implant.id) {
          return implant
        } else {
          return el
        }
      }),
    }
  })

  addImplants = this.updater((state, newImplants: any[]) => ({...state, implants: state.implants.concat(newImplants) }))
  updateImplants = this.updater((state, updatedImplants: any[]) => {
    return {
      ...state,
      implants: state.implants.map((implant) => {
        const updated = updatedImplants.find((el) => el.id === implant.id);
        return updated ? updated : implant;
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
        return this.implantService.validateImplantExcelData(excelData, vm.implantCategories,vm.contacts,vm.manufacturers);
      })
    )
  }


  readonly loadImplantEffect = this.effect<string>((implantId$) =>
    implantId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((implantId) =>
        this.data.userImplant({ implantId }).pipe(
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



  readonly loadImplantsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userImplants({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                implants: res.data.items,
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

  readonly createImplantEffect = this.effect<UserCreateImplantInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.implantService.createImplant({...input }).pipe(
          tapResponse(
            (implant: Implant) => {
              this.addNewImplant(implant)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: implant, loading: false, done: true }), 300);
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

    readonly updateImplantEffect = this.effect<UserUpdateImplantInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.implantService.updateImplant(input, input.id).pipe(
              tapResponse(
                (implant) => {
                  this.updateImplant(implant)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: implant, loading: false, done: true }), 300);
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
  
    readonly deleteImplantEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, implant]) => {
          return this.data.userDeleteImplant({implantId: implant.id})
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

  readonly importExcelEffect = this.effect<UserUpdateImplantInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.implantService.importImplants(data).pipe(
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

            this.addImplants(created);
            this.updateImplants(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
