
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { FeeScheduleService } from './fee-schedule.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateFeeScheduleInput, UserUpdateFeeScheduleInput, WebCoreDataAccessService, CorePaging, FeeSchedule, Organization,Specialty } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface FeeScheduleFeatureState {
  errors?: any
  loading?: boolean
  item?: FeeSchedule
  done: boolean,
  formName?: string
organizationId?: string,specialtyId?: string,
  feeSchedules: FeeSchedule[]
 organizations?: Organization[],
 specialties?: Specialty[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebFeeScheduleFeatureStore extends ComponentStore<FeeScheduleFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly feeScheduleService: FeeScheduleService
) {
    super({ 
      loading: false,
      feeSchedules: [],
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

    if (this.route.snapshot.paramMap.has('feeScheduleId')) {
      var feeScheduleId = this.route.snapshot.paramMap.get('feeScheduleId')
      this.setFormName('feeSchedule_edit')
    } else {
      this.setFormName('feeSchedule_create')
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
  readonly feeSchedules$ = this.select((s) => s.feeSchedules)
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


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.feeSchedules$,
this.organizations$,this.specialties$,
    (errors, loading, item, formName, feeSchedules, organizations,specialties ) => ({
    errors,
    loading,
    item,
    formName,
    feeSchedules,

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

    

  readonly setItem = this.updater((state, item: FeeSchedule) => ({...state, item}))

  addNewFeeSchedule = this.updater((state, feeSchedule: FeeSchedule) => ({ ...state, feeSchedules: [...state.feeSchedules, feeSchedule] }))

  updateFeeSchedule = this.updater((state, feeSchedule: FeeSchedule) => {
    return {
      ...state,
      feeSchedules: state.feeSchedules.map((el) => {
        if (el.id === feeSchedule.id) {
          return feeSchedule
        } else {
          return el
        }
      }),
    }
  })

  addFeeSchedules = this.updater((state, newFeeSchedules: any[]) => ({...state, feeSchedules: state.feeSchedules.concat(newFeeSchedules) }))
  updateFeeSchedules = this.updater((state, updatedFeeSchedules: any[]) => {
    return {
      ...state,
      feeSchedules: state.feeSchedules.map((feeSchedule) => {
        const updated = updatedFeeSchedules.find((el) => el.id === feeSchedule.id);
        return updated ? updated : feeSchedule;
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
        return this.feeScheduleService.validateFeeScheduleExcelData(excelData, vm.organizations,vm.specialties);
      })
    )
  }


  readonly loadFeeScheduleEffect = this.effect<string>((feeScheduleId$) =>
    feeScheduleId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((feeScheduleId) =>
        this.data.userFeeSchedule({ feeScheduleId }).pipe(
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



  readonly loadFeeSchedulesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userFeeSchedules({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                feeSchedules: res.data.items,
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

  readonly createFeeScheduleEffect = this.effect<UserCreateFeeScheduleInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.feeScheduleService.createFeeSchedule({...input }).pipe(
          tapResponse(
            (feeSchedule: FeeSchedule) => {
              this.addNewFeeSchedule(feeSchedule)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: feeSchedule, loading: false, done: true }), 300);
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

    readonly updateFeeScheduleEffect = this.effect<UserUpdateFeeScheduleInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.feeScheduleService.updateFeeSchedule(input, input.id).pipe(
              tapResponse(
                (feeSchedule) => {
                  this.updateFeeSchedule(feeSchedule)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: feeSchedule, loading: false, done: true }), 300);
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
  
    readonly deleteFeeScheduleEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, feeSchedule]) => {
          return this.data.userDeleteFeeSchedule({feeScheduleId: feeSchedule.id})
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

  readonly importExcelEffect = this.effect<UserUpdateFeeScheduleInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.feeScheduleService.importFeeSchedules(data).pipe(
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

            this.addFeeSchedules(created);
            this.updateFeeSchedules(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
