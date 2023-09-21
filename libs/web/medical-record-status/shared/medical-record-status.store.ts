
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { MedicalRecordStatusService } from './medical-record-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateMedicalRecordStatusInput, UserUpdateMedicalRecordStatusInput, WebCoreDataAccessService, CorePaging, MedicalRecordStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface MedicalRecordStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: MedicalRecordStatus
  done: boolean,
  formName?: string

  medicalRecordStatuses: MedicalRecordStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebMedicalRecordStatusFeatureStore extends ComponentStore<MedicalRecordStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly medicalRecordStatusService: MedicalRecordStatusService
) {
    super({ 
      loading: false,
      medicalRecordStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('medicalRecordStatusId')) {
      var medicalRecordStatusId = this.route.snapshot.paramMap.get('medicalRecordStatusId')
      this.setFormName('medicalRecordStatus_edit')
    } else {
      this.setFormName('medicalRecordStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly medicalRecordStatuses$ = this.select((s) => s.medicalRecordStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.medicalRecordStatuses$,

    (errors, loading, item, formName, medicalRecordStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    medicalRecordStatuses,

            
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







    

  readonly setItem = this.updater((state, item: MedicalRecordStatus) => ({...state, item}))

  addNewMedicalRecordStatus = this.updater((state, medicalRecordStatus: MedicalRecordStatus) => ({ ...state, medicalRecordStatuses: [...state.medicalRecordStatuses, medicalRecordStatus] }))

  updateMedicalRecordStatus = this.updater((state, medicalRecordStatus: MedicalRecordStatus) => {
    return {
      ...state,
      medicalRecordStatuses: state.medicalRecordStatuses.map((el) => {
        if (el.id === medicalRecordStatus.id) {
          return medicalRecordStatus
        } else {
          return el
        }
      }),
    }
  })

  addMedicalRecordStatuses = this.updater((state, newMedicalRecordStatuses: any[]) => ({...state, medicalRecordStatuses: state.medicalRecordStatuses.concat(newMedicalRecordStatuses) }))
  updateMedicalRecordStatuses = this.updater((state, updatedMedicalRecordStatuses: any[]) => {
    return {
      ...state,
      medicalRecordStatuses: state.medicalRecordStatuses.map((medicalRecordStatus) => {
        const updated = updatedMedicalRecordStatuses.find((el) => el.id === medicalRecordStatus.id);
        return updated ? updated : medicalRecordStatus;
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
        return this.medicalRecordStatusService.validateMedicalRecordStatusExcelData(excelData);
      })
    )
  }


  readonly loadMedicalRecordStatusEffect = this.effect<string>((medicalRecordStatusId$) =>
    medicalRecordStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((medicalRecordStatusId) =>
        this.data.userMedicalRecordStatus({ medicalRecordStatusId }).pipe(
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



  readonly loadMedicalRecordStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userMedicalRecordStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                medicalRecordStatuses: res.data.items,
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

  readonly createMedicalRecordStatusEffect = this.effect<UserCreateMedicalRecordStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.medicalRecordStatusService.createMedicalRecordStatus({...input }).pipe(
          tapResponse(
            (medicalRecordStatus: MedicalRecordStatus) => {
              this.addNewMedicalRecordStatus(medicalRecordStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: medicalRecordStatus, loading: false, done: true }), 300);
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

    readonly updateMedicalRecordStatusEffect = this.effect<UserUpdateMedicalRecordStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.medicalRecordStatusService.updateMedicalRecordStatus(input, input.id).pipe(
              tapResponse(
                (medicalRecordStatus) => {
                  this.updateMedicalRecordStatus(medicalRecordStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: medicalRecordStatus, loading: false, done: true }), 300);
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
  
    readonly deleteMedicalRecordStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, medicalRecordStatus]) => {
          return this.data.userDeleteMedicalRecordStatus({medicalRecordStatusId: medicalRecordStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateMedicalRecordStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.medicalRecordStatusService.importMedicalRecordStatuses(data).pipe(
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

            this.addMedicalRecordStatuses(created);
            this.updateMedicalRecordStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
