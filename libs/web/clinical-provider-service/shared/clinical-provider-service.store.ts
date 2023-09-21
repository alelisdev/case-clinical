
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ClinicalProviderServiceService } from './clinical-provider-service.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateClinicalProviderServiceInput, UserUpdateClinicalProviderServiceInput, WebCoreDataAccessService, CorePaging, ClinicalProviderService, Service,ClinicalProvider } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ClinicalProviderServiceFeatureState {
  errors?: any
  loading?: boolean
  item?: ClinicalProviderService
  done: boolean,
  formName?: string
serviceId?: string,clinicalProviderId?: string,
  clinicalProviderServices: ClinicalProviderService[]
 services?: Service[],
 clinicalProviders?: ClinicalProvider[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebClinicalProviderServiceFeatureStore extends ComponentStore<ClinicalProviderServiceFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly clinicalProviderServiceService: ClinicalProviderServiceService
) {
    super({ 
      loading: false,
      clinicalProviderServices: [],
      done: false,
      searchQuery: '',
      formName: undefined,
serviceId: undefined,
clinicalProviderId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('clinicalProviderServiceId')) {
      var clinicalProviderServiceId = this.route.snapshot.paramMap.get('clinicalProviderServiceId')
      this.setFormName('clinicalProviderService_edit')
    } else {
      this.setFormName('clinicalProviderService_create')
    }


    if(this.route.snapshot.paramMap.has("serviceId")) {
      var serviceId = this.route.snapshot.paramMap.get("serviceId")
      this.setServiceId(serviceId)
    }


    if(this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId")
      this.setClinicalProviderId(clinicalProviderId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly clinicalProviderServices$ = this.select((s) => s.clinicalProviderServices)
  readonly services$ = this.select((s) => s.services || [])
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])

readonly serviceId$ = this.select((s) => s.serviceId)

readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviderServices$,
this.services$,this.clinicalProviders$,
    (errors, loading, item, formName, clinicalProviderServices, services,clinicalProviders ) => ({
    errors,
    loading,
    item,
    formName,
    clinicalProviderServices,

            services,clinicalProviders
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.serviceId$,
this.clinicalProviderId$, this.searchQuery$, (paging, serviceId,
clinicalProviderId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    serviceId: serviceId,clinicalProviderId: clinicalProviderId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setServiceId = this.updater((state, serviceId: string) => ({
                ...state,
    serviceId,
  }))


            readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string) => ({
                ...state,
    clinicalProviderId,
  }))



  readonly filterServices = (term) => 
        this.data.userSelectServices({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let services = res.data.items;
              this.patchState({services})
              return services
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


  readonly filterClinicalProviders = (term) => 
        this.data.userSelectClinicalProviders({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let clinicalProviders = res.data.items;
              this.patchState({clinicalProviders})
              return clinicalProviders
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



  readonly addService = this.updater((state, service: Service) => ({
    ...state, services: state.services.concat(service)
  }))


  readonly addClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state, clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
  }))

    

  readonly setItem = this.updater((state, item: ClinicalProviderService) => ({...state, item}))

  addNewClinicalProviderService = this.updater((state, clinicalProviderService: ClinicalProviderService) => ({ ...state, clinicalProviderServices: [...state.clinicalProviderServices, clinicalProviderService] }))

  updateClinicalProviderService = this.updater((state, clinicalProviderService: ClinicalProviderService) => {
    return {
      ...state,
      clinicalProviderServices: state.clinicalProviderServices.map((el) => {
        if (el.id === clinicalProviderService.id) {
          return clinicalProviderService
        } else {
          return el
        }
      }),
    }
  })

  addClinicalProviderServices = this.updater((state, newClinicalProviderServices: any[]) => ({...state, clinicalProviderServices: state.clinicalProviderServices.concat(newClinicalProviderServices) }))
  updateClinicalProviderServices = this.updater((state, updatedClinicalProviderServices: any[]) => {
    return {
      ...state,
      clinicalProviderServices: state.clinicalProviderServices.map((clinicalProviderService) => {
        const updated = updatedClinicalProviderServices.find((el) => el.id === clinicalProviderService.id);
        return updated ? updated : clinicalProviderService;
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
        return this.clinicalProviderServiceService.validateClinicalProviderServiceExcelData(excelData, vm.services,vm.clinicalProviders);
      })
    )
  }


  readonly loadClinicalProviderServiceEffect = this.effect<string>((clinicalProviderServiceId$) =>
    clinicalProviderServiceId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((clinicalProviderServiceId) =>
        this.data.userClinicalProviderService({ clinicalProviderServiceId }).pipe(
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



  readonly loadClinicalProviderServicesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userClinicalProviderServices({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                clinicalProviderServices: res.data.items,
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

  readonly createClinicalProviderServiceEffect = this.effect<UserCreateClinicalProviderServiceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.clinicalProviderServiceService.createClinicalProviderService({...input }).pipe(
          tapResponse(
            (clinicalProviderService: ClinicalProviderService) => {
              this.addNewClinicalProviderService(clinicalProviderService)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: clinicalProviderService, loading: false, done: true }), 300);
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

    readonly updateClinicalProviderServiceEffect = this.effect<UserUpdateClinicalProviderServiceInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.clinicalProviderServiceService.updateClinicalProviderService(input, input.id).pipe(
              tapResponse(
                (clinicalProviderService) => {
                  this.updateClinicalProviderService(clinicalProviderService)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: clinicalProviderService, loading: false, done: true }), 300);
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
  
    readonly deleteClinicalProviderServiceEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, clinicalProviderService]) => {
          return this.data.userDeleteClinicalProviderService({clinicalProviderServiceId: clinicalProviderService.id})
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

  readonly importExcelEffect = this.effect<UserUpdateClinicalProviderServiceInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.clinicalProviderServiceService.importClinicalProviderServices(data).pipe(
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

            this.addClinicalProviderServices(created);
            this.updateClinicalProviderServices(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
