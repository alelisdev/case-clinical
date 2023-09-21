
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ClinicalProviderService } from './clinical-provider.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateClinicalProviderInput, UserUpdateClinicalProviderInput, WebCoreDataAccessService, CorePaging, ClinicalProvider, Vendor } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { ClinicalProviderLocation } from '@case-clinical/api/clinical-provider-location/data-access'


export interface ClinicalProviderFeatureState {
  errors?: any
  loading?: boolean
  item?: ClinicalProvider
  done: boolean,
  formName?: string
  vendorId?: string,
  clinicalProviders: ClinicalProvider[],
  clinicalProvidersSpecial: ClinicalProvider[],
  clinicalProviderLocations: ClinicalProviderLocation[],
  vendors?: Vendor[]
  specialtyFilterParam?: any[]
  serviceFilterParam?: any[]
  searchQuery?: string
  paging?: CorePaging,
  clinicalProviderId?: string,
  clinicalProviderLocationId?: string,
  locationId?: string,

  locationFilterParam?: number[],
  distance?: string | undefined,
  isDoctorsPage: boolean
  favorites?: boolean
}


@Injectable()
export class WebClinicalProviderFeatureStore extends ComponentStore<ClinicalProviderFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly clinicalProviderService: ClinicalProviderService
  ) {
    super({
      loading: false,
      clinicalProviders: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      vendorId: undefined,
      specialtyFilterParam: [],
      serviceFilterParam: [],
      clinicalProvidersSpecial: [],
      clinicalProviderLocations: [],
      clinicalProviderId: undefined,
      clinicalProviderLocationId: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
      locationFilterParam: [],
      distance: undefined,
      isDoctorsPage: false
    })

    if (this.route.snapshot.paramMap.has('clinicalProviderId')) {
      this.setFormName('clinicalProvider_edit')
    } else {
      this.setFormName('clinicalProvider_create')
    }


    if (this.route.snapshot.paramMap.has("vendorId")) {
      const vendorId = this.route.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly favorites$ = this.select((s) => s.favorites)

  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders)
  readonly specialtyFilterParam$ = this.select(s => s.specialtyFilterParam)
  readonly serviceFilterParam$ = this.select(s => s.serviceFilterParam)
  readonly vendors$ = this.select((s) => s.vendors || [])
  readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId);
  readonly clinicalProviderLocationId$ = this.select((s) => s.clinicalProviderLocationId);
  readonly locationId$ = this.select((s) => s.locationId);

  readonly clinicalProvidersSpecial$ = this.select((s) => s.clinicalProvidersSpecial);
  readonly clinicalProviderLocations$ = this.select((s) => s.clinicalProviderLocations);

  readonly vendorId$ = this.select((s) => s.vendorId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)
  readonly locationFilterParam$ = this.select((s) => s.locationFilterParam)
  readonly distance$ = this.select((s) => s.distance)
  readonly isDoctorsPage$ = this.select((s) => s.isDoctorsPage)
  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done) => ({
      item, done,
    }),
    { debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviders$,
    this.vendors$,
    (errors, loading, item, formName, clinicalProviders, vendors) => ({
      errors,
      loading,
      item,
      formName,
      clinicalProviders,

      vendors
    }),
    { debounce: true })

  readonly input$ = this.select(
    this.paging$,
    this.vendorId$,
    this.searchQuery$,
    this.specialtyFilterParam$,
    this.serviceFilterParam$,
    this.clinicalProviderId$,
    this.clinicalProviderLocationId$,

    this.locationFilterParam$,
    this.distance$,
    this.isDoctorsPage$,
    this.favorites$,
    (
      paging,
      vendorId,
      searchQuery,
      specialtyFilterParam,
      serviceFilterParam,
      clinicalProviderId,
      clinicalProviderLocationId,
      locationFilterParam,
      distance,
      isDoctorsPage,
      favorites,
    ) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    vendorId: vendorId,
    specialites: specialtyFilterParam,
    services: serviceFilterParam,
    total: paging.total,
    clinicalProviderId: clinicalProviderId,
    clinicalProviderLocationId:clinicalProviderLocationId,
    centerLocation: locationFilterParam,
    distance: distance,
    isDoctorsPage: isDoctorsPage,
    favorites,
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))

  readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string) => ({
    ...state,
    clinicalProviderId,
  }))

  readonly setClinicalProviderLocationId = this.updater((state, clinicalProviderLocationId: string) => ({
    ...state,
    clinicalProviderLocationId,
  }))

  readonly setLocationId = this.updater((state, locationId: string) => ({
    ...state,
    locationId,
  }))

  readonly setFavorites = this.updater((state, favorites: boolean) => ({
    ...state,
    favorites,
  }))

  readonly setSpecialtyFilterParam = this.updater((state, specialtyFilterParam: string[]) => ({
    ...state,
    specialtyFilterParam,
  }))

  readonly setServiceFilterParam = this.updater((state, serviceFilterParam: string[]) => ({
    ...state,
    serviceFilterParam,
  }))

  readonly setLocationFilterParam = this.updater((state, locationFilterParam: number[]) => ({
    ...state,
    locationFilterParam
  }))
  readonly setDistance = this.updater((state, distance: string) => ({
    ...state,
    distance,
  }))


  readonly setVendorId = this.updater((state, vendorId: string) => ({
    ...state,
    vendorId,
  }))

  readonly setIsDoctorsPage = this.updater((state, isDoctorsPage: boolean) => ({
    ...state,
    isDoctorsPage,
  }))
  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: {
      ...state.paging,
      skip: skip
    }
  }))

  readonly setLimit = this.updater((state, limit: number) => ({
    ...state,
    paging: {
      ...state.paging,
      limit: limit
    }
  }))


  readonly filterVendors = (term) =>
    this.data.userSelectVendors({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const vendors = res.data.items;
          this.patchState({ vendors })
          return vendors
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



  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))



  readonly setItem = this.updater((state, item: ClinicalProvider) => ({ ...state, item }))

  addNewClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({ ...state, clinicalProviders: [...state.clinicalProviders, clinicalProvider] }))

  removeClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state,
    clinicalProviders: state.clinicalProviders.filter((el) => el.id !== clinicalProvider.id)
  }))

  updateClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => {
    return {
      ...state,
      clinicalProviders: state.clinicalProviders.map((el) => {
        if (el.id === clinicalProvider.id) {
          return clinicalProvider
        } else {
          return el
        }
      }),
    }
  })

  addClinicalProviders = this.updater((state, newClinicalProviders: any[]) => ({ ...state, clinicalProviders: state.clinicalProviders.concat(newClinicalProviders) }))
  updateClinicalProviders = this.updater((state, updatedClinicalProviders: any[]) => {
    return {
      ...state,
      clinicalProviders: state.clinicalProviders.map((clinicalProvider) => {
        const updated = updatedClinicalProviders.find((el) => el.id === clinicalProvider.id);
        return updated ? updated : clinicalProvider;
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
        return this.clinicalProviderService.validateClinicalProviderExcelData(excelData, vm.vendors);
      })
    )
  }


  readonly loadClinicalProviderEffect = this.effect<string>((clinicalProviderId$) =>
    clinicalProviderId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((clinicalProviderId) =>
        this.data.userClinicalProvider({ clinicalProviderId }).pipe(
          tapResponse(
            (res) => {

              return this.patchState({
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



  readonly loadClinicalProvidersEffect = this.effect(($) =>
    $.pipe(
      tap(() => { this.patchState({ loading: true }) }),
      withLatestFrom(this.input$),
      switchMap(([_, input]) => {
        console.log("input", input)
        return this.data.userClinicalProviders({ input }).pipe(
          tapResponse(
            (res) => {
              const customclinicalProviderLocations: any[] = []
              res.data.items?.map(item => {
                item.clinicalProviderLocations?.forEach((row) => {
                  customclinicalProviderLocations.push({
                    latitude: row.location?.latitude,
                    longitude: row.location?.longitude,
                    id: row.id,
                    name: row.location?.name,
                    clinicalProvider: item,
                    location: row.location
                  });
                });
              });
              return this.patchState({
                paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                clinicalProviders: res.data.items,
                clinicalProviderLocations: customclinicalProviderLocations,
                errors: res.errors,
                loading: false,
              })
            },
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        )
      }
      ),
    ),
  )

  readonly loadClinicalProvidersSpecialEffect = this.effect(($) =>
    $.pipe(
      tap(() => { this.patchState({ loading: true }) }),
      withLatestFrom(this.input$),
      switchMap(([_, input]) => {
        return this.data.userClinicalProviders({ input }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                clinicalProvidersSpecial: res.data.items,
                errors: res.errors,
                loading: false,
              }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        )
      }
      ),
    ),
  )

  readonly createClinicalProviderEffect = this.effect<UserCreateClinicalProviderInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.clinicalProviderService.createClinicalProvider({ ...input }).pipe(
          tapResponse(
            (clinicalProvider: ClinicalProvider) => {
              this.addNewClinicalProvider(clinicalProvider)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: clinicalProvider, loading: false, done: true }), 300);
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

  readonly updateClinicalProviderEffect = this.effect<UserUpdateClinicalProviderInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.clinicalProviderService.updateClinicalProvider(input, input.id).pipe(
          tapResponse(
            (clinicalProvider) => {
              this.updateClinicalProvider(clinicalProvider)
              this.toast.success('Updated Successfully!')
              setTimeout(() => this.patchState({ item: clinicalProvider, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false }), 600);
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

  readonly deleteClinicalProviderEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, clinicalProvider]) => {
          return this.data.userDeleteClinicalProvider({ clinicalProviderId: clinicalProvider.id })
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
            )
        }
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateClinicalProviderInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((data) => this.clinicalProviderService.importClinicalProviders(data).pipe(
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

            this.addClinicalProviders(created);
            this.updateClinicalProviders(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
