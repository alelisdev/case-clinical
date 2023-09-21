
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ClinicalProviderLocationAvailabilityService } from './clinical-provider-location-availability.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateClinicalProviderLocationAvailabilityInput, UserUpdateClinicalProviderLocationAvailabilityInput, WebCoreDataAccessService, CorePaging, ClinicalProviderLocationAvailability, ClinicalProviderLocation } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ClinicalProviderLocationAvailabilityFeatureState {
  errors?: any
  loading?: boolean
  item?: ClinicalProviderLocationAvailability
  done: boolean,
  formName?: string
clinicalProviderLocationId?: string,
  clinicalProviderLocationAvailabilities: ClinicalProviderLocationAvailability[]
 clinicalProviderLocations?: ClinicalProviderLocation[]
  searchQuery?: string
  paging?: CorePaging,
  startTime?: string,
  endTime?: string,
  day?: string
}

@Injectable()
export class WebClinicalProviderLocationAvailabilityFeatureStore extends ComponentStore<ClinicalProviderLocationAvailabilityFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly clinicalProviderLocationAvailabilityService: ClinicalProviderLocationAvailabilityService
) {
    super({
      loading: false,
      clinicalProviderLocationAvailabilities: [],
      done: false,
      searchQuery: '',
      formName: undefined,
      clinicalProviderLocationId: '-----',
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('clinicalProviderLocationAvailabilityId')) {
      this.setFormName('clinicalProviderLocationAvailability_edit')
    } else {
      this.setFormName('clinicalProviderLocationAvailability_create')
    }


    if(this.route.snapshot.paramMap.has("clinicalProviderLocationId")) {
      const clinicalProviderLocationId = this.route.snapshot.paramMap.get("clinicalProviderLocationId")
      this.setClinicalProviderLocationId(clinicalProviderLocationId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly clinicalProviderLocationAvailabilities$ = this.select((s) => s.clinicalProviderLocationAvailabilities)
  readonly clinicalProviderLocations$ = this.select((s) => s.clinicalProviderLocations || [])
  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)
  readonly startTime$ = this.select((s)=>s.startTime);
  readonly endTime$ = this.select((s)=>s.endTime);
  readonly day$ = this.select((s)=>s.day);
  readonly clinicalProviderLocationId$ = this.select((s)=>s.clinicalProviderLocationId);
  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.clinicalProviderLocationAvailabilities$,
this.clinicalProviderLocations$,
    (errors, loading, item, formName, clinicalProviderLocationAvailabilities, clinicalProviderLocations ) => ({
    errors,
    loading,
    item,
    formName,
    clinicalProviderLocationAvailabilities,
clinicalProviderLocations
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.searchQuery$, this.clinicalProviderLocationId$, this.startTime$, this.endTime$, this.day$, (paging, searchQuery, clinicalProviderLocationId, startTime, endTime, day) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    total: paging.total,
    clinicalProviderLocationId,
    startTime,
    endTime,
    day
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))

  readonly setStartTime = this.updater((state, startTime: string) => ({
    ...state,
    startTime,
  }))

  readonly setDay = this.updater((state, day: string) =>{ 
    console.log('day', day)
    return {
    ...state,
    day,
  }})

  readonly setEndTime = this.updater((state, endTime: string) => ({
    ...state,
    endTime,
  }))


            readonly setClinicalProviderLocationId = this.updater((state, clinicalProviderLocationId: string) => 
              {
                console.log("clinicalProviderLocationId", clinicalProviderLocationId);
                return {
                  ...state,
                  clinicalProviderLocationId,
              }
            }
  )



  readonly filterClinicalProviderLocations = (term) =>
        this.data.userSelectClinicalProviderLocations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              const clinicalProviderLocations = res.data.items;
              this.patchState({clinicalProviderLocations})
              return clinicalProviderLocations
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



  readonly addClinicalProviderLocation = this.updater((state, clinicalProviderLocation: ClinicalProviderLocation) => ({
    ...state, clinicalProviderLocations: state.clinicalProviderLocations.concat(clinicalProviderLocation)
  }))

  readonly setItem = this.updater((state, item: ClinicalProviderLocationAvailability) => ({...state, item}))

  addNewClinicalProviderLocationAvailability = this.updater((state, clinicalProviderLocationAvailability: ClinicalProviderLocationAvailability) => ({ ...state, clinicalProviderLocationAvailabilities: [...state.clinicalProviderLocationAvailabilities, clinicalProviderLocationAvailability] }))

  updateClinicalProviderLocationAvailability = this.updater((state, clinicalProviderLocationAvailability: ClinicalProviderLocationAvailability) => {
    return {
      ...state,
      clinicalProviderLocationAvailabilities: state.clinicalProviderLocationAvailabilities.map((el) => {
        if (el.id === clinicalProviderLocationAvailability.id) {
          return clinicalProviderLocationAvailability
        } else {
          return el
        }
      }),
    }
  })

  deleteClinicalProviderLocationAvailability = this.updater((state, clinicalProviderLocationAvailability: ClinicalProviderLocationAvailability) => {
    return {
      ...state,
      clinicalProviderLocationAvailabilities: state.clinicalProviderLocationAvailabilities.filter((i) => i.id !== clinicalProviderLocationAvailability.id),
    }
  })

  addClinicalProviderLocationAvailabilities = this.updater((state, newClinicalProviderLocationAvailabilities: any[]) => ({...state, clinicalProviderLocationAvailabilities: state.clinicalProviderLocationAvailabilities.concat(newClinicalProviderLocationAvailabilities) }))
  updateClinicalProviderLocationAvailabilities = this.updater((state, updatedClinicalProviderLocationAvailabilities: any[]) => {
    return {
      ...state,
      clinicalProviderLocationAvailabilities: state.clinicalProviderLocationAvailabilities.map((clinicalProviderLocationAvailability) => {
        const updated = updatedClinicalProviderLocationAvailabilities.find((el) => el.id === clinicalProviderLocationAvailability.id);
        return updated ? updated : clinicalProviderLocationAvailability;
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
        return this.clinicalProviderLocationAvailabilityService.validateClinicalProviderLocationAvailabilityExcelData(excelData, vm.clinicalProviderLocations);
      })
    )
  }

  readonly loadClinicalProviderLocationAvailabilityEffect = this.effect<string>((clinicalProviderLocationAvailabilityId$) =>
    clinicalProviderLocationAvailabilityId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((clinicalProviderLocationAvailabilityId) =>
        this.data.userClinicalProviderLocationAvailability({ clinicalProviderLocationAvailabilityId }).pipe(
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

  readonly loadClinicalProviderLocationAvailabilitiesEffect = this.effect(($) =>
        $.pipe(
          tap(() => { this.patchState({ loading: true }) }),
          withLatestFrom(this.input$),
          switchMap(([_, input]) =>{
            console.log("input",input);
            return this.data.userClinicalProviderLocationAvailabilities({ input }).pipe(
                tapResponse(
                  (res) => {
                    console.log("res",res.data.items);
                    this.patchState({
                      paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                      clinicalProviderLocationAvailabilities: res.data.items,
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
              );
            }
          ),
        ),
      )

  readonly createClinicalProviderLocationAvailabilityEffect = this.effect<UserCreateClinicalProviderLocationAvailabilityInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.clinicalProviderLocationAvailabilityService.createClinicalProviderLocationAvailability({...input }).pipe(
          tapResponse(
            (clinicalProviderLocationAvailability: ClinicalProviderLocationAvailability) => {
              this.addNewClinicalProviderLocationAvailability(clinicalProviderLocationAvailability)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: clinicalProviderLocationAvailability, loading: false, done: true }), 300);
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

    readonly updateClinicalProviderLocationAvailabilityEffect = this.effect<UserUpdateClinicalProviderLocationAvailabilityInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.clinicalProviderLocationAvailabilityService.updateClinicalProviderLocationAvailability(input, input.id).pipe(
              tapResponse(
                (clinicalProviderLocationAvailability) => {
                  this.updateClinicalProviderLocationAvailability(clinicalProviderLocationAvailability)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: clinicalProviderLocationAvailability, loading: false, done: true }), 300);
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

    readonly deleteClinicalProviderLocationAvailabilityEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, clinicalProviderLocationAvailability]) => {
          console.log(clinicalProviderLocationAvailability)
          return this.data.userDeleteClinicalProviderLocationAvailability({clinicalProviderLocationAvailabilityId: clinicalProviderLocationAvailability.id})
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

  readonly deleteClinicalProviderLocationAvailabilityInScheduleTimeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, clinicalProviderLocationAvailability]) => {
          console.log(clinicalProviderLocationAvailability)
          return this.data.userDeleteClinicalProviderLocationAvailability({clinicalProviderLocationAvailabilityId: clinicalProviderLocationAvailability.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.deleteClinicalProviderLocationAvailability(res.data.deleted)
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

  readonly importExcelEffect = this.effect<UserUpdateClinicalProviderLocationAvailabilityInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.clinicalProviderLocationAvailabilityService.importClinicalProviderLocationAvailabilities(data).pipe(
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

            this.addClinicalProviderLocationAvailabilities(created);
            this.updateClinicalProviderLocationAvailabilities(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
