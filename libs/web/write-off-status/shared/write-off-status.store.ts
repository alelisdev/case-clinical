
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { WriteOffStatusService } from './write-off-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateWriteOffStatusInput, UserUpdateWriteOffStatusInput, WebCoreDataAccessService, CorePaging, WriteOffStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface WriteOffStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: WriteOffStatus
  done: boolean,
  formName?: string

  writeOffStatuses: WriteOffStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebWriteOffStatusFeatureStore extends ComponentStore<WriteOffStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly writeOffStatusService: WriteOffStatusService
) {
    super({ 
      loading: false,
      writeOffStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('writeOffStatusId')) {
      var writeOffStatusId = this.route.snapshot.paramMap.get('writeOffStatusId')
      this.setFormName('writeOffStatus_edit')
    } else {
      this.setFormName('writeOffStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly writeOffStatuses$ = this.select((s) => s.writeOffStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.writeOffStatuses$,

    (errors, loading, item, formName, writeOffStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    writeOffStatuses,

            
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







    

  readonly setItem = this.updater((state, item: WriteOffStatus) => ({...state, item}))

  addNewWriteOffStatus = this.updater((state, writeOffStatus: WriteOffStatus) => ({ ...state, writeOffStatuses: [...state.writeOffStatuses, writeOffStatus] }))

  updateWriteOffStatus = this.updater((state, writeOffStatus: WriteOffStatus) => {
    return {
      ...state,
      writeOffStatuses: state.writeOffStatuses.map((el) => {
        if (el.id === writeOffStatus.id) {
          return writeOffStatus
        } else {
          return el
        }
      }),
    }
  })

  addWriteOffStatuses = this.updater((state, newWriteOffStatuses: any[]) => ({...state, writeOffStatuses: state.writeOffStatuses.concat(newWriteOffStatuses) }))
  updateWriteOffStatuses = this.updater((state, updatedWriteOffStatuses: any[]) => {
    return {
      ...state,
      writeOffStatuses: state.writeOffStatuses.map((writeOffStatus) => {
        const updated = updatedWriteOffStatuses.find((el) => el.id === writeOffStatus.id);
        return updated ? updated : writeOffStatus;
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
        return this.writeOffStatusService.validateWriteOffStatusExcelData(excelData);
      })
    )
  }


  readonly loadWriteOffStatusEffect = this.effect<string>((writeOffStatusId$) =>
    writeOffStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((writeOffStatusId) =>
        this.data.userWriteOffStatus({ writeOffStatusId }).pipe(
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



  readonly loadWriteOffStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userWriteOffStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                writeOffStatuses: res.data.items,
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

  readonly createWriteOffStatusEffect = this.effect<UserCreateWriteOffStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.writeOffStatusService.createWriteOffStatus({...input }).pipe(
          tapResponse(
            (writeOffStatus: WriteOffStatus) => {
              this.addNewWriteOffStatus(writeOffStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: writeOffStatus, loading: false, done: true }), 300);
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

    readonly updateWriteOffStatusEffect = this.effect<UserUpdateWriteOffStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.writeOffStatusService.updateWriteOffStatus(input, input.id).pipe(
              tapResponse(
                (writeOffStatus) => {
                  this.updateWriteOffStatus(writeOffStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: writeOffStatus, loading: false, done: true }), 300);
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
  
    readonly deleteWriteOffStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, writeOffStatus]) => {
          return this.data.userDeleteWriteOffStatus({writeOffStatusId: writeOffStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateWriteOffStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.writeOffStatusService.importWriteOffStatuses(data).pipe(
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

            this.addWriteOffStatuses(created);
            this.updateWriteOffStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
