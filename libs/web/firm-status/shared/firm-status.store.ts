
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { FirmStatusService } from './firm-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateFirmStatusInput, UserUpdateFirmStatusInput, WebCoreDataAccessService, CorePaging, FirmStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface FirmStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: FirmStatus
  done: boolean,
  formName?: string

  firmStatuses: FirmStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebFirmStatusFeatureStore extends ComponentStore<FirmStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly firmStatusService: FirmStatusService
) {
    super({ 
      loading: false,
      firmStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('firmStatusId')) {
      var firmStatusId = this.route.snapshot.paramMap.get('firmStatusId')
      this.setFormName('firmStatus_edit')
    } else {
      this.setFormName('firmStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly firmStatuses$ = this.select((s) => s.firmStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.firmStatuses$,

    (errors, loading, item, formName, firmStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    firmStatuses,

            
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







    

  readonly setItem = this.updater((state, item: FirmStatus) => ({...state, item}))

  addNewFirmStatus = this.updater((state, firmStatus: FirmStatus) => ({ ...state, firmStatuses: [...state.firmStatuses, firmStatus] }))

  updateFirmStatus = this.updater((state, firmStatus: FirmStatus) => {
    return {
      ...state,
      firmStatuses: state.firmStatuses.map((el) => {
        if (el.id === firmStatus.id) {
          return firmStatus
        } else {
          return el
        }
      }),
    }
  })

  addFirmStatuses = this.updater((state, newFirmStatuses: any[]) => ({...state, firmStatuses: state.firmStatuses.concat(newFirmStatuses) }))
  updateFirmStatuses = this.updater((state, updatedFirmStatuses: any[]) => {
    return {
      ...state,
      firmStatuses: state.firmStatuses.map((firmStatus) => {
        const updated = updatedFirmStatuses.find((el) => el.id === firmStatus.id);
        return updated ? updated : firmStatus;
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
        return this.firmStatusService.validateFirmStatusExcelData(excelData);
      })
    )
  }


  readonly loadFirmStatusEffect = this.effect<string>((firmStatusId$) =>
    firmStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((firmStatusId) =>
        this.data.userFirmStatus({ firmStatusId }).pipe(
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



  readonly loadFirmStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userFirmStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                firmStatuses: res.data.items,
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

  readonly createFirmStatusEffect = this.effect<UserCreateFirmStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.firmStatusService.createFirmStatus({...input }).pipe(
          tapResponse(
            (firmStatus: FirmStatus) => {
              this.addNewFirmStatus(firmStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: firmStatus, loading: false, done: true }), 300);
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

    readonly updateFirmStatusEffect = this.effect<UserUpdateFirmStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.firmStatusService.updateFirmStatus(input, input.id).pipe(
              tapResponse(
                (firmStatus) => {
                  this.updateFirmStatus(firmStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: firmStatus, loading: false, done: true }), 300);
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
  
    readonly deleteFirmStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, firmStatus]) => {
          return this.data.userDeleteFirmStatus({firmStatusId: firmStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateFirmStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.firmStatusService.importFirmStatuses(data).pipe(
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

            this.addFirmStatuses(created);
            this.updateFirmStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
