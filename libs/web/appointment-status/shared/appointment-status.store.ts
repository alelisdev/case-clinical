
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AppointmentStatusService } from './appointment-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAppointmentStatusInput, UserUpdateAppointmentStatusInput, WebCoreDataAccessService, CorePaging, AppointmentStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AppointmentStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: AppointmentStatus
  done: boolean,
  formName?: string

  appointmentStatuses: AppointmentStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAppointmentStatusFeatureStore extends ComponentStore<AppointmentStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly appointmentStatusService: AppointmentStatusService
) {
    super({ 
      loading: false,
      appointmentStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('appointmentStatusId')) {
      var appointmentStatusId = this.route.snapshot.paramMap.get('appointmentStatusId')
      this.setFormName('appointmentStatus_edit')
    } else {
      this.setFormName('appointmentStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly appointmentStatuses$ = this.select((s) => s.appointmentStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.appointmentStatuses$,

    (errors, loading, item, formName, appointmentStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    appointmentStatuses,

            
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))







    

  readonly setItem = this.updater((state, item: AppointmentStatus) => ({...state, item}))

  addNewAppointmentStatus = this.updater((state, appointmentStatus: AppointmentStatus) => ({ ...state, appointmentStatuses: [...state.appointmentStatuses, appointmentStatus] }))

  updateAppointmentStatus = this.updater((state, appointmentStatus: AppointmentStatus) => {
    return {
      ...state,
      appointmentStatuses: state.appointmentStatuses.map((el) => {
        if (el.id === appointmentStatus.id) {
          return appointmentStatus
        } else {
          return el
        }
      }),
    }
  })

  addAppointmentStatuses = this.updater((state, newAppointmentStatuses: any[]) => ({...state, appointmentStatuses: state.appointmentStatuses.concat(newAppointmentStatuses) }))
  updateAppointmentStatuses = this.updater((state, updatedAppointmentStatuses: any[]) => {
    return {
      ...state,
      appointmentStatuses: state.appointmentStatuses.map((appointmentStatus) => {
        const updated = updatedAppointmentStatuses.find((el) => el.id === appointmentStatus.id);
        return updated ? updated : appointmentStatus;
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
        return this.appointmentStatusService.validateAppointmentStatusExcelData(excelData);
      })
    )
  }


  readonly loadAppointmentStatusEffect = this.effect<string>((appointmentStatusId$) =>
    appointmentStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((appointmentStatusId) =>
        this.data.userAppointmentStatus({ appointmentStatusId }).pipe(
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



  readonly loadAppointmentStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAppointmentStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                appointmentStatuses: res.data.items,
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

  readonly createAppointmentStatusEffect = this.effect<UserCreateAppointmentStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.appointmentStatusService.createAppointmentStatus({...input }).pipe(
          tapResponse(
            (appointmentStatus: AppointmentStatus) => {
              this.addNewAppointmentStatus(appointmentStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: appointmentStatus, loading: false, done: true }), 300);
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

    readonly updateAppointmentStatusEffect = this.effect<UserUpdateAppointmentStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.appointmentStatusService.updateAppointmentStatus(input, input.id).pipe(
              tapResponse(
                (appointmentStatus) => {
                  this.updateAppointmentStatus(appointmentStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: appointmentStatus, loading: false, done: true }), 300);
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
  
    readonly deleteAppointmentStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, appointmentStatus]) => {
          return this.data.userDeleteAppointmentStatus({appointmentStatusId: appointmentStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAppointmentStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.appointmentStatusService.importAppointmentStatuses(data).pipe(
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

            this.addAppointmentStatuses(created);
            this.updateAppointmentStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
