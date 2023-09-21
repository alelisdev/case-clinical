
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ProcedureOrTreatmentRequestService } from './procedure-or-treatment-request.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateProcedureOrTreatmentRequestInput, UserUpdateProcedureOrTreatmentRequestInput, WebCoreDataAccessService, CorePaging, ProcedureOrTreatmentRequest,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ProcedureOrTreatmentRequestFeatureState {
  errors?: any
  loading?: boolean
  item?: ProcedureOrTreatmentRequest
  done: boolean,
  formName?: string

  procedureOrTreatmentRequests: ProcedureOrTreatmentRequest[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebProcedureOrTreatmentRequestFeatureStore extends ComponentStore<ProcedureOrTreatmentRequestFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureOrTreatmentRequestService: ProcedureOrTreatmentRequestService
) {
    super({ 
      loading: false,
      procedureOrTreatmentRequests: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('procedureOrTreatmentRequestId')) {
      var procedureOrTreatmentRequestId = this.route.snapshot.paramMap.get('procedureOrTreatmentRequestId')
      this.setFormName('procedureOrTreatmentRequest_edit')
    } else {
      this.setFormName('procedureOrTreatmentRequest_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly procedureOrTreatmentRequests$ = this.select((s) => s.procedureOrTreatmentRequests)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureOrTreatmentRequests$,

    (errors, loading, item, formName, procedureOrTreatmentRequests,  ) => ({
    errors,
    loading,
    item,
    formName,
    procedureOrTreatmentRequests,

            
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







    

  readonly setItem = this.updater((state, item: ProcedureOrTreatmentRequest) => ({...state, item}))

  addNewProcedureOrTreatmentRequest = this.updater((state, procedureOrTreatmentRequest: ProcedureOrTreatmentRequest) => ({ ...state, procedureOrTreatmentRequests: [...state.procedureOrTreatmentRequests, procedureOrTreatmentRequest] }))

  updateProcedureOrTreatmentRequest = this.updater((state, procedureOrTreatmentRequest: ProcedureOrTreatmentRequest) => {
    return {
      ...state,
      procedureOrTreatmentRequests: state.procedureOrTreatmentRequests.map((el) => {
        if (el.id === procedureOrTreatmentRequest.id) {
          return procedureOrTreatmentRequest
        } else {
          return el
        }
      }),
    }
  })

  addProcedureOrTreatmentRequests = this.updater((state, newProcedureOrTreatmentRequests: any[]) => ({...state, procedureOrTreatmentRequests: state.procedureOrTreatmentRequests.concat(newProcedureOrTreatmentRequests) }))
  updateProcedureOrTreatmentRequests = this.updater((state, updatedProcedureOrTreatmentRequests: any[]) => {
    return {
      ...state,
      procedureOrTreatmentRequests: state.procedureOrTreatmentRequests.map((procedureOrTreatmentRequest) => {
        const updated = updatedProcedureOrTreatmentRequests.find((el) => el.id === procedureOrTreatmentRequest.id);
        return updated ? updated : procedureOrTreatmentRequest;
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
        return this.procedureOrTreatmentRequestService.validateProcedureOrTreatmentRequestExcelData(excelData);
      })
    )
  }


  readonly loadProcedureOrTreatmentRequestEffect = this.effect<string>((procedureOrTreatmentRequestId$) =>
    procedureOrTreatmentRequestId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((procedureOrTreatmentRequestId) =>
        this.data.userProcedureOrTreatmentRequest({ procedureOrTreatmentRequestId }).pipe(
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



  readonly loadProcedureOrTreatmentRequestsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userProcedureOrTreatmentRequests({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                procedureOrTreatmentRequests: res.data.items,
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

  readonly createProcedureOrTreatmentRequestEffect = this.effect<UserCreateProcedureOrTreatmentRequestInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.procedureOrTreatmentRequestService.createProcedureOrTreatmentRequest({...input }).pipe(
          tapResponse(
            (procedureOrTreatmentRequest: ProcedureOrTreatmentRequest) => {
              this.addNewProcedureOrTreatmentRequest(procedureOrTreatmentRequest)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: procedureOrTreatmentRequest, loading: false, done: true }), 300);
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

    readonly updateProcedureOrTreatmentRequestEffect = this.effect<UserUpdateProcedureOrTreatmentRequestInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.procedureOrTreatmentRequestService.updateProcedureOrTreatmentRequest(input, input.id).pipe(
              tapResponse(
                (procedureOrTreatmentRequest) => {
                  this.updateProcedureOrTreatmentRequest(procedureOrTreatmentRequest)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: procedureOrTreatmentRequest, loading: false, done: true }), 300);
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
  
    readonly deleteProcedureOrTreatmentRequestEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, procedureOrTreatmentRequest]) => {
          return this.data.userDeleteProcedureOrTreatmentRequest({procedureOrTreatmentRequestId: procedureOrTreatmentRequest.id})
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

  readonly importExcelEffect = this.effect<UserUpdateProcedureOrTreatmentRequestInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.procedureOrTreatmentRequestService.importProcedureOrTreatmentRequests(data).pipe(
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

            this.addProcedureOrTreatmentRequests(created);
            this.updateProcedureOrTreatmentRequests(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
