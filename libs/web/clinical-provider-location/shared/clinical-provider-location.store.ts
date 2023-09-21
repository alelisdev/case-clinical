import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ClinicalProviderLocationService } from './clinical-provider-location.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateClinicalProviderLocationInput, UserUpdateClinicalProviderLocationInput, WebCoreDataAccessService, CorePaging, ClinicalProviderLocation, ClinicalProvider, Location } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { groupByList, groupBy } from '@case-clinical/shared/util/helpers'
import moment from 'moment'


export interface ClinicalProviderLocationFeatureState {
  errors?: any
  loading?: boolean
  item?: ClinicalProviderLocation
  done: boolean,
  formName?: string
  clinicalProviderId?: string | undefined, locationId?: string,
  clinicalProviderLocations: ClinicalProviderLocation[]
  clinicalProviders?: ClinicalProvider[],
  locations?: Location[]
  searchQuery?: string
  paging?: CorePaging,
  providerName?: string,
  distance?: number,
  centerLocation?: number[],
  specialties?: string[],
  favorite?: boolean,
  locationData?:any
}

@Injectable()
export class WebClinicalProviderLocationFeatureStore extends ComponentStore<ClinicalProviderLocationFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly clinicalProviderLocationService: ClinicalProviderLocationService
  ) {
    super({
      loading: false,
      clinicalProviderLocations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      clinicalProviderId: undefined,
      locationId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('clinicalProviderLocationId')) {
      this.setFormName('clinicalProviderLocation_edit')
    } else {
      this.setFormName('clinicalProviderLocation_create')
    }


    if (this.route.snapshot.paramMap.has("clinicalProviderId")) {
      var clinicalProviderId = this.route.snapshot.paramMap.get("clinicalProviderId")
      this.setClinicalProviderId(clinicalProviderId)
    }


    if (this.route.snapshot.paramMap.has("locationId")) {
      var locationId = this.route.snapshot.paramMap.get("locationId")
      this.setLocationId(locationId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly formattedItem$ = this.select(this.item$, (providerLocation) => {
    const totalBusinessHours = [];
    providerLocation?.clinicalProvider?.clinicalProviderLocations?.map(({ clinicalProviderLocationAvailabilities }) => {
      totalBusinessHours.push(...clinicalProviderLocationAvailabilities);
    });

    const businessHours = totalBusinessHours;
    const grouped: Record<string, any> = groupBy(businessHours, (availability: any) => availability.day);
    const result = []
    let sundayFlag = false
    const currentDate = moment().format('ll') + '';
    const currentDay = moment().format('dddd') + '';
    let currentHours: any;

    for (const key in grouped) {
      let tempHours = grouped[key]
      tempHours.sort((a: { startTime: string; }, b: { startTime: string; }) => Date.parse(a.startTime) - Date.parse(b.startTime))

      tempHours = tempHours.map((item: any) => {

        item.startTime = (moment(item.startTime, 'hh:mm A').isValid())?moment(item.startTime, 'hh:mm A').format('HH:mm'):item.startTime;
        item.endTime = (moment(item.endTime, 'hh:mm A').isValid())?moment(item.endTime, 'hh:mm A').format('HH:mm'):item.endTime;
        return item
      })

      if (key === currentDay) currentHours = tempHours

      result.push({
        day: key, hours: tempHours
      })
      if (key === 'Sunday') sundayFlag = true
    }

    const todayHours = {
      day: currentDate, hours: currentHours
    };
    const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    result.sort((a, b) => WeekDays.indexOf(a.day) - WeekDays.indexOf(b.day))

    const formattedBusinessHours = {
      todayHours,
      others: result,
      sundayFlag
    }

    const formattedData = {
      ...providerLocation,
      clinicalProvider: {
        ...providerLocation?.clinicalProvider,
        rating: 0,
        locations: providerLocation?.clinicalProvider?.clinicalProviderLocations?.map(({ location, clinicalProviderLocationAvailabilities }) => ({
          id: location?.id,
          name: location?.name,
          locationImages: location.locationImages,
          endLatitudeProp: location?.latitude,
          endLongitudeProp: location?.longitude,
          vendor: providerLocation?.clinicalProvider?.vendor?.name,
          rating: providerLocation?.clinicalProvider.rating ?? 0,
          businessHours: groupByList(clinicalProviderLocationAvailabilities ?? [], (availability: any) => availability.day)
        })),
        specialties: providerLocation?.clinicalProvider?.clinicalProviderSpecialties?.map(({ specialty }) => ({
          name: specialty?.name,
        })),
        businessHours: formattedBusinessHours,
      },
      detailView: true,
      formattedDistance: (providerLocation?.distance?? 0).toFixed(2),
      clinicalProviderLocations: [],
    };

    delete formattedData['clinicalProviderLocations'];
    delete formattedData['clinicalProviderSpecialties'];
    return formattedData;
  });
  readonly clinicalProviderLocations$ = this.select((s) => s.clinicalProviderLocations)
  readonly formattedClinicalProviderLocations$ = this.select(this.clinicalProviderLocations$, (providerLocations) => {
    return providerLocations.map((providerLocation) => {
      return {
        ...providerLocation,
        formattedDistance: (providerLocation?.distance?? 0).toFixed(2),
        clinicalProvider: {
          ...providerLocation.clinicalProvider,
          rating: 0,
          specialtiesCount: providerLocation.clinicalProvider.clinicalProviderSpecialties?.length - 3,
          clinicalProviderSpecialties: providerLocation?.clinicalProvider?.clinicalProviderSpecialties?.slice(0, 3),
        }
      }
    })
  })


  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])
  readonly locations$ = this.select((s) => s.locations || [])

  readonly clinicalProviderId$ = this.select((s) => s.clinicalProviderId)

  readonly locationId$ = this.select((s) => s.locationId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)
  readonly providerName$ = this.select((s) => s.providerName)
  readonly specialties$ = this.select((s) => s.specialties)
  readonly favorite$ = this.select((s) => s.favorite)
  readonly locationData$ = this.select((s) => s.locationData)

  readonly distance$ = this.select((s) => s.distance)
  readonly centerLocation$ = this.select((s) => s.centerLocation)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done) => ({
      item, done,
    }),
    { debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviderLocations$,
    this.clinicalProviders$, this.locations$,
    (errors, loading, item, formName, clinicalProviderLocations, clinicalProviders, locations) => ({
      errors,
      loading,
      item,
      formName,
      clinicalProviderLocations,

      clinicalProviders, locations
    }),
    { debounce: true })

  readonly input$ = this.select(this.paging$, this.clinicalProviderId$,
    this.locationId$, this.searchQuery$, this.providerName$, this.specialties$, this.favorite$, this.distance$, this.centerLocation$, this.locationData$, (paging, clinicalProviderId,
      locationId, searchQuery, providerName, specialties, favorite, distance, centerLocation, locationData) => ({
        limit: paging.limit,
        skip: paging.skip,
        name: searchQuery,
        clinicalProviderId: clinicalProviderId, locationId: locationId,
        total: paging.total,
        providerName,
        specialties,
        favorite,
        distance,
        centerLocation,
        locationData
      }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))

  readonly setClinicalProviderId = this.updater((state, clinicalProviderId: string | undefined) => ({
    ...state,
    clinicalProviderId,
  }))


  readonly setLocationId = this.updater((state, locationId: string) => ({
    ...state,
    locationId,
  }))

  readonly setProviderName = this.updater((state, providerName: string | undefined) => ({
    ...state,
    providerName,
  }))
  readonly setSpecialties = this.updater((state, specialties: string[] | undefined) => ({
    ...state,
    specialties,
  }))
  readonly setFavorite = this.updater((state, favorite: boolean | undefined) => ({
    ...state,
    favorite,
  }))

  readonly setLocationData = this.updater((state, locationData:any) => ({
    ...state,
    locationData,
  }))
  readonly setDistance = this.updater((state, distance: number | undefined) => ({
    ...state,
    distance,
  }))
  readonly setCenterLocation = this.updater((state, centerLocation: number[] | undefined) => ({
    ...state,
    centerLocation,
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

  readonly filterClinicalProviders = (term) =>
    this.data.userSelectClinicalProviders({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          let clinicalProviders = res.data.items;
          this.patchState({ clinicalProviders })
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


  readonly filterLocations = (term) =>
    this.data.userSelectLocations({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          let locations = res.data.items;
          this.patchState({ locations })
          return locations
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



  readonly addClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state, clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
  }))


  readonly addLocation = this.updater((state, location: Location) => ({
    ...state, locations: state.locations.concat(location)
  }))

  readonly updateClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => {
    return {
      ...state,
      clinicalProviderLocations: state.clinicalProviderLocations?.map((providerLocation) => {
        if (clinicalProvider.id === providerLocation.clinicalProviderId) {
          return {
            ...providerLocation,
            clinicalProvider,
          }
        } else {
          return providerLocation
        }
      })
    }
  });

  readonly setItem = this.updater((state, item: ClinicalProviderLocation) => ({ ...state, item }))

  addNewClinicalProviderLocation = this.updater((state, clinicalProviderLocation: ClinicalProviderLocation) => ({ ...state, clinicalProviderLocations: [...state.clinicalProviderLocations, clinicalProviderLocation] }))

  updateClinicalProviderLocation = this.updater((state, clinicalProviderLocation: ClinicalProviderLocation) => {
    return {
      ...state,
      clinicalProviderLocations: state.clinicalProviderLocations.map((el) => {
        if (el.id === clinicalProviderLocation.id) {
          return clinicalProviderLocation
        } else {
          return el
        }
      }),
    }
  })

  clear = this.updater((state) => ({
    ...state,
    clinicalProviderLocations: []
   }))

  addClinicalProviderLocations = this.updater((state, newClinicalProviderLocations: any[]) => ({ ...state, clinicalProviderLocations: state.clinicalProviderLocations.concat(newClinicalProviderLocations) }))
  updateClinicalProviderLocations = this.updater((state, updatedClinicalProviderLocations: any[]) => {
    return {
      ...state,
      clinicalProviderLocations: state.clinicalProviderLocations.map((clinicalProviderLocation) => {
        const updated = updatedClinicalProviderLocations.find((el) => el.id === clinicalProviderLocation.id);
        return updated ? updated : clinicalProviderLocation;
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
        return this.clinicalProviderLocationService.validateClinicalProviderLocationExcelData(excelData, vm.clinicalProviders, vm.locations);
      })
    )
  }


  readonly loadClinicalProviderLocationEffect = this.effect<string>((clinicalProviderLocationId$) =>
    clinicalProviderLocationId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((clinicalProviderLocationId) =>
        this.data.userClinicalProviderLocation({ clinicalProviderLocationId }).pipe(
          tapResponse(
            (res) => {
              console.log("res.data.item",res.data.item)
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

  readonly loadClinicalProviderLocationsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) => {
        return this.data.userClinicalProviderLocations({ input }).pipe(
          tapResponse(
            (res) => {
              return this.patchState({
                paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                clinicalProviderLocations: input.clinicalProviderId !== 'all'? res.data.items:[],
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
      },
      ),
    ),
  )

  readonly createClinicalProviderLocationEffect = this.effect<UserCreateClinicalProviderLocationInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.clinicalProviderLocationService.createClinicalProviderLocation({ ...input }).pipe(
          tapResponse(
            (clinicalProviderLocation: ClinicalProviderLocation) => {
              this.addNewClinicalProviderLocation(clinicalProviderLocation)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: clinicalProviderLocation, loading: false, done: true }), 300);
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

  readonly updateClinicalProviderLocationEffect = this.effect<UserUpdateClinicalProviderLocationInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.clinicalProviderLocationService.updateClinicalProviderLocation(input, input.id).pipe(
          tapResponse(
            (clinicalProviderLocation) => {
              this.updateClinicalProviderLocation(clinicalProviderLocation)
              this.toast.success('Updated Successfully!')
              setTimeout(() => this.patchState({ item: clinicalProviderLocation, loading: false, done: true }), 300);
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

  readonly deleteClinicalProviderLocationEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, clinicalProviderLocation]) => {
          return this.data.userDeleteClinicalProviderLocation({ clinicalProviderLocationId: clinicalProviderLocation.id })
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

  readonly importExcelEffect = this.effect<UserUpdateClinicalProviderLocationInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((data) => this.clinicalProviderLocationService.importClinicalProviderLocations(data).pipe(
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

            this.addClinicalProviderLocations(created);
            this.updateClinicalProviderLocations(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
