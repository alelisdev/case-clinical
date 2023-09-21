
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { FacilityFeeScheduleService } from './facility-fee-schedule.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateFacilityFeeScheduleInput, UserUpdateFacilityFeeScheduleInput, WebCoreDataAccessService, CorePaging, FacilityFeeSchedule, Organization,Specialty } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface FacilityFeeScheduleFeatureState {
  errors?: any
  loading?: boolean
  item?: FacilityFeeSchedule
  done: boolean,
  formName?: string
organizationId?: string,specialtyId?: string,
  facilityFeeSchedules: FacilityFeeSchedule[]
 organizations?: Organization[],
 specialties?: Specialty[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebFacilityFeeScheduleFeatureStore extends ComponentStore<FacilityFeeScheduleFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly facilityFeeScheduleService: FacilityFeeScheduleService
) {
    super({ 
      loading: false,
      facilityFeeSchedules: [],
      done: false,
      searchQuery: '',
      formName: undefined,
organizationId: undefined,
specialtyId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('facilityFeeScheduleId')) {
      var facilityFeeScheduleId = this.route.snapshot.paramMap.get('facilityFeeScheduleId')
      this.setFormName('facilityFeeSchedule_edit')
    } else {
      this.setFormName('facilityFeeSchedule_create')
    }


    if(this.route.snapshot.paramMap.has("organizationId")) {
      var organizationId = this.route.snapshot.paramMap.get("organizationId")
      this.setOrganizationId(organizationId)
    }


    if(this.route.snapshot.paramMap.has("specialtyId")) {
      var specialtyId = this.route.snapshot.paramMap.get("specialtyId")
      this.setSpecialtyId(specialtyId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly facilityFeeSchedules$ = this.select((s) => s.facilityFeeSchedules)
  readonly organizations$ = this.select((s) => s.organizations || [])
  readonly specialties$ = this.select((s) => s.specialties || [])

readonly organizationId$ = this.select((s) => s.organizationId)

readonly specialtyId$ = this.select((s) => s.specialtyId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.facilityFeeSchedules$,
this.organizations$,this.specialties$,
    (errors, loading, item, formName, facilityFeeSchedules, organizations,specialties ) => ({
    errors,
    loading,
    item,
    formName,
    facilityFeeSchedules,

            organizations,specialties
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.organizationId$,
this.specialtyId$, this.searchQuery$, (paging, organizationId,
specialtyId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    organizationId: organizationId,specialtyId: specialtyId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setOrganizationId = this.updater((state, organizationId: string) => ({
                ...state,
    organizationId,
  }))


            readonly setSpecialtyId = this.updater((state, specialtyId: string) => ({
                ...state,
    specialtyId,
  }))



  readonly filterOrganizations = (term) => 
        this.data.userSelectOrganizations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let organizations = res.data.items;
              this.patchState({organizations})
              return organizations
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


  readonly filterSpecialties = (term) => 
        this.data.userSelectSpecialties({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let specialties = res.data.items;
              this.patchState({specialties})
              return specialties
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



  readonly addOrganization = this.updater((state, organization: Organization) => ({
    ...state, organizations: state.organizations.concat(organization)
  }))


  readonly addSpecialty = this.updater((state, specialty: Specialty) => ({
    ...state, specialties: state.specialties.concat(specialty)
  }))

    

  readonly setItem = this.updater((state, item: FacilityFeeSchedule) => ({...state, item}))

  addNewFacilityFeeSchedule = this.updater((state, facilityFeeSchedule: FacilityFeeSchedule) => ({ ...state, facilityFeeSchedules: [...state.facilityFeeSchedules, facilityFeeSchedule] }))

  updateFacilityFeeSchedule = this.updater((state, facilityFeeSchedule: FacilityFeeSchedule) => {
    return {
      ...state,
      facilityFeeSchedules: state.facilityFeeSchedules.map((el) => {
        if (el.id === facilityFeeSchedule.id) {
          return facilityFeeSchedule
        } else {
          return el
        }
      }),
    }
  })

  addFacilityFeeSchedules = this.updater((state, newFacilityFeeSchedules: any[]) => ({...state, facilityFeeSchedules: state.facilityFeeSchedules.concat(newFacilityFeeSchedules) }))
  updateFacilityFeeSchedules = this.updater((state, updatedFacilityFeeSchedules: any[]) => {
    return {
      ...state,
      facilityFeeSchedules: state.facilityFeeSchedules.map((facilityFeeSchedule) => {
        const updated = updatedFacilityFeeSchedules.find((el) => el.id === facilityFeeSchedule.id);
        return updated ? updated : facilityFeeSchedule;
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
        return this.facilityFeeScheduleService.validateFacilityFeeScheduleExcelData(excelData, vm.organizations,vm.specialties);
      })
    )
  }


  readonly loadFacilityFeeScheduleEffect = this.effect<string>((facilityFeeScheduleId$) =>
    facilityFeeScheduleId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((facilityFeeScheduleId) =>
        this.data.userFacilityFeeSchedule({ facilityFeeScheduleId }).pipe(
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



  readonly loadFacilityFeeSchedulesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userFacilityFeeSchedules({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                facilityFeeSchedules: res.data.items,
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

  readonly createFacilityFeeScheduleEffect = this.effect<UserCreateFacilityFeeScheduleInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.facilityFeeScheduleService.createFacilityFeeSchedule({...input }).pipe(
          tapResponse(
            (facilityFeeSchedule: FacilityFeeSchedule) => {
              this.addNewFacilityFeeSchedule(facilityFeeSchedule)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: facilityFeeSchedule, loading: false, done: true }), 300);
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

    readonly updateFacilityFeeScheduleEffect = this.effect<UserUpdateFacilityFeeScheduleInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.facilityFeeScheduleService.updateFacilityFeeSchedule(input, input.id).pipe(
              tapResponse(
                (facilityFeeSchedule) => {
                  this.updateFacilityFeeSchedule(facilityFeeSchedule)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: facilityFeeSchedule, loading: false, done: true }), 300);
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
  
    readonly deleteFacilityFeeScheduleEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, facilityFeeSchedule]) => {
          return this.data.userDeleteFacilityFeeSchedule({facilityFeeScheduleId: facilityFeeSchedule.id})
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

  readonly importExcelEffect = this.effect<UserUpdateFacilityFeeScheduleInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.facilityFeeScheduleService.importFacilityFeeSchedules(data).pipe(
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

            this.addFacilityFeeSchedules(created);
            this.updateFacilityFeeSchedules(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
