
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { LocationService } from './location.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateLocationInput, UserUpdateLocationInput, WebCoreDataAccessService, CorePaging, Location, PlaceOfService } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface LocationFeatureState {
  errors?: any
  loading?: boolean
  item?: Location
  done: boolean,
  formName?: string
placeOfServiceId?: string,
vendorLocationId?: string,
vendorId?: string,
clinicalProviderId?: string,
  locations: Location[]
 placeOfServices?: PlaceOfService[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebLocationFeatureStore extends ComponentStore<LocationFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly locationService: LocationService
) {
    super({
      loading: false,
      locations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
placeOfServiceId: undefined,
vendorLocationId: undefined,
clinicalProviderId: undefined,
vendorId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('locationId')) {
      var locationId = this.route.snapshot.paramMap.get('locationId')
      this.setFormName('location_edit')
    } else {
      this.setFormName('location_create')
    }

    if(this.route.snapshot.paramMap.has("placeOfServiceId")) {
      var placeOfServiceId = this.route.snapshot.paramMap.get("placeOfServiceId")
      this.setPlaceOfServiceId(placeOfServiceId)
    }

    if(this.route.snapshot.paramMap.has("vendorLocationId")) {
      var vendorLocationId = this.route.snapshot.paramMap.get("vendorLocationId")
      this.setVendorLocationId(vendorLocationId)
    }

    if(this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
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
  readonly locations$ = this.select((s) => s.locations)
  readonly placeOfServices$ = this.select((s) => s.placeOfServices || [])
  readonly vendorLocationId$ = this.select((s) => s.vendorLocationId)
  readonly vendorId$ = this.select((s) => s.vendorId)
  readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

readonly placeOfServiceId$ = this.select((s) => s.placeOfServiceId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.locations$,
this.placeOfServices$,
    (errors, loading, item, formName, locations, placeOfServices ) => ({
    errors,
    loading,
    item,
    formName,
    locations,

            placeOfServices
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.placeOfServiceId$, this.searchQuery$, this.vendorLocationId$, this.vendorId$, this.clinicalProviderId$, (paging, placeOfServiceId,searchQuery, vendorLocationId,vendorId, clinicalProviderId) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    placeOfServiceId: placeOfServiceId,
    vendorLocationId,
    clinicalProviderId,
    vendorId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setPlaceOfServiceId = this.updater((state, placeOfServiceId: string) => ({
                ...state,
    placeOfServiceId,
  }))
            readonly setVendorLocationId = this.updater((state, vendorLocationId: string) => ({
                ...state,
                vendorLocationId,
  }))
            readonly setVendorId = this.updater((state, vendorId: string) => ({
                ...state,
                vendorId,
  }))
            readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string) => ({
                ...state,
                clinicalProviderId,
  }))



  readonly filterPlaceOfServices = (term) =>
        this.data.userSelectPlaceOfServices({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let placeOfServices = res.data.items;
              this.patchState({placeOfServices})
              return placeOfServices
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



  readonly addPlaceOfService = this.updater((state, placeOfService: PlaceOfService) => ({
    ...state, placeOfServices: state.placeOfServices.concat(placeOfService)
  }))



  readonly setItem = this.updater((state, item: Location) => ({...state, item}))

  addNewLocation = this.updater((state, location: Location) => ({ ...state, locations: [...state.locations, location] }))

  updateLocation = this.updater((state, location: Location) => {
    return {
      ...state,
      locations: state.locations.map((el) => {
        if (el.id === location.id) {
          return location
        } else {
          return el
        }
      }),
    }
  })

  addLocations = this.updater((state, newLocations: any[]) => ({...state, locations: state.locations.concat(newLocations) }))
  updateLocations = this.updater((state, updatedLocations: any[]) => {
    return {
      ...state,
      locations: state.locations.map((location) => {
        const updated = updatedLocations.find((el) => el.id === location.id);
        return updated ? updated : location;
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
        return this.locationService.validateLocationExcelData(excelData, vm.placeOfServices);
      })
    )
  }


  readonly loadLocationEffect = this.effect<string>((locationId$) =>
    locationId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((locationId) =>
        this.data.userLocation({ locationId }).pipe(
          tapResponse(
            (res) => {
              console.log("location", res.data.item)      
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



  readonly loadLocationsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userLocations({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                locations: res.data.items,
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

  readonly createLocationEffect = this.effect<UserCreateLocationInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.locationService.createLocation({...input }).pipe(
          tapResponse(
            (location: Location) => {
              this.addNewLocation(location)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: location, loading: false, done: true }), 300);
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

    readonly updateLocationEffect = this.effect<UserUpdateLocationInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.locationService.updateLocation(input, input.id).pipe(
              tapResponse(
                (location) => {
                  this.updateLocation(location)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: location, loading: false, done: true }), 300);
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

    readonly deleteLocationEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, location]) => {
          return this.data.userDeleteLocation({locationId: location.id})
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

  readonly importExcelEffect = this.effect<UserUpdateLocationInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.locationService.importLocations(data).pipe(
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

            this.addLocations(created);
            this.updateLocations(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
