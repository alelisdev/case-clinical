
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { VendorLocationService } from './vendor-location.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateVendorLocationInput, UserUpdateVendorLocationInput, WebCoreDataAccessService, CorePaging, VendorLocation, Location,Vendor } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface VendorLocationFeatureState {
  errors?: any
  loading?: boolean
  item?: VendorLocation
  done: boolean,
  formName?: string
locationId?: string,vendorId?: string,
  vendorLocations: VendorLocation[]
 locations?: Location[],
 vendors?: Vendor[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebVendorLocationFeatureStore extends ComponentStore<VendorLocationFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly vendorLocationService: VendorLocationService
) {
    super({ 
      loading: false,
      vendorLocations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
locationId: undefined,
vendorId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('vendorLocationId')) {
      var vendorLocationId = this.route.snapshot.paramMap.get('vendorLocationId')
      this.setFormName('vendorLocation_edit')
    } else {
      this.setFormName('vendorLocation_create')
    }


    if(this.route.snapshot.paramMap.has("locationId")) {
      var locationId = this.route.snapshot.paramMap.get("locationId")
      this.setLocationId(locationId)
    }


    if(this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly vendorLocations$ = this.select((s) => s.vendorLocations)
  readonly locations$ = this.select((s) => s.locations || [])
  readonly vendors$ = this.select((s) => s.vendors || [])

readonly locationId$ = this.select((s) => s.locationId)

readonly vendorId$ = this.select((s) => s.vendorId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.vendorLocations$,
this.locations$,this.vendors$,
    (errors, loading, item, formName, vendorLocations, locations,vendors ) => ({
    errors,
    loading,
    item,
    formName,
    vendorLocations,

            locations,vendors
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.locationId$,
this.vendorId$, this.searchQuery$, (paging, locationId,
vendorId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    locationId: locationId,vendorId: vendorId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setLocationId = this.updater((state, locationId: string) => ({
                ...state,
    locationId,
  }))


            readonly setVendorId = this.updater((state, vendorId: string) => ({
                ...state,
    vendorId,
  }))



  readonly filterLocations = (term) => 
        this.data.userSelectLocations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let locations = res.data.items;
              this.patchState({locations})
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


  readonly filterVendors = (term) => 
        this.data.userSelectVendors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let vendors = res.data.items;
              this.patchState({vendors})
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



  readonly addLocation = this.updater((state, location: Location) => ({
    ...state, locations: state.locations.concat(location)
  }))


  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))

    

  readonly setItem = this.updater((state, item: VendorLocation) => ({...state, item}))

  addNewVendorLocation = this.updater((state, vendorLocation: VendorLocation) => ({ ...state, vendorLocations: [...state.vendorLocations, vendorLocation] }))

  updateVendorLocation = this.updater((state, vendorLocation: VendorLocation) => {
    return {
      ...state,
      vendorLocations: state.vendorLocations.map((el) => {
        if (el.id === vendorLocation.id) {
          return vendorLocation
        } else {
          return el
        }
      }),
    }
  })

  addVendorLocations = this.updater((state, newVendorLocations: any[]) => ({...state, vendorLocations: state.vendorLocations.concat(newVendorLocations) }))
  updateVendorLocations = this.updater((state, updatedVendorLocations: any[]) => {
    return {
      ...state,
      vendorLocations: state.vendorLocations.map((vendorLocation) => {
        const updated = updatedVendorLocations.find((el) => el.id === vendorLocation.id);
        return updated ? updated : vendorLocation;
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
        return this.vendorLocationService.validateVendorLocationExcelData(excelData, vm.locations,vm.vendors);
      })
    )
  }


  readonly loadVendorLocationEffect = this.effect<string>((vendorLocationId$) =>
    vendorLocationId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((vendorLocationId) =>
        this.data.userVendorLocation({ vendorLocationId }).pipe(
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



  readonly loadVendorLocationsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userVendorLocations({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                vendorLocations: res.data.items,
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

  readonly createVendorLocationEffect = this.effect<UserCreateVendorLocationInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.vendorLocationService.createVendorLocation({...input }).pipe(
          tapResponse(
            (vendorLocation: VendorLocation) => {
              this.addNewVendorLocation(vendorLocation)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: vendorLocation, loading: false, done: true }), 300);
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

    readonly updateVendorLocationEffect = this.effect<UserUpdateVendorLocationInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.vendorLocationService.updateVendorLocation(input, input.id).pipe(
              tapResponse(
                (vendorLocation) => {
                  this.updateVendorLocation(vendorLocation)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: vendorLocation, loading: false, done: true }), 300);
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
  
    readonly deleteVendorLocationEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, vendorLocation]) => {
          return this.data.userDeleteVendorLocation({vendorLocationId: vendorLocation.id})
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

  readonly importExcelEffect = this.effect<UserUpdateVendorLocationInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.vendorLocationService.importVendorLocations(data).pipe(
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

            this.addVendorLocations(created);
            this.updateVendorLocations(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
