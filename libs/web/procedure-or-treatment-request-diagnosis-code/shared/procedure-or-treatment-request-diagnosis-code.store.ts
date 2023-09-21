
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ProcedureOrTreatmentRequestDiagnosisCodeService } from './procedure-or-treatment-request-diagnosis-code.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput, UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput, WebCoreDataAccessService, CorePaging, ProcedureOrTreatmentRequestDiagnosisCode, DiagnosisCode,ProcedureOrTreatmentRequest } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ProcedureOrTreatmentRequestDiagnosisCodeFeatureState {
  errors?: any
  loading?: boolean
  item?: ProcedureOrTreatmentRequestDiagnosisCode
  done: boolean,
  formName?: string
diagnosisCodeId?: string,procedureOrTreatmentRequestId?: string,
  procedureOrTreatmentRequestDiagnosisCodes: ProcedureOrTreatmentRequestDiagnosisCode[]
 diagnosisCodes?: DiagnosisCode[],
 procedureOrTreatmentRequests?: ProcedureOrTreatmentRequest[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore extends ComponentStore<ProcedureOrTreatmentRequestDiagnosisCodeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureOrTreatmentRequestDiagnosisCodeService: ProcedureOrTreatmentRequestDiagnosisCodeService
) {
    super({ 
      loading: false,
      procedureOrTreatmentRequestDiagnosisCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
diagnosisCodeId: undefined,
procedureOrTreatmentRequestId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('procedureOrTreatmentRequestDiagnosisCodeId')) {
      var procedureOrTreatmentRequestDiagnosisCodeId = this.route.snapshot.paramMap.get('procedureOrTreatmentRequestDiagnosisCodeId')
      this.setFormName('procedureOrTreatmentRequestDiagnosisCode_edit')
    } else {
      this.setFormName('procedureOrTreatmentRequestDiagnosisCode_create')
    }


    if(this.route.snapshot.paramMap.has("diagnosisCodeId")) {
      var diagnosisCodeId = this.route.snapshot.paramMap.get("diagnosisCodeId")
      this.setDiagnosisCodeId(diagnosisCodeId)
    }


    if(this.route.snapshot.paramMap.has("procedureOrTreatmentRequestId")) {
      var procedureOrTreatmentRequestId = this.route.snapshot.paramMap.get("procedureOrTreatmentRequestId")
      this.setProcedureOrTreatmentRequestId(procedureOrTreatmentRequestId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly procedureOrTreatmentRequestDiagnosisCodes$ = this.select((s) => s.procedureOrTreatmentRequestDiagnosisCodes)
  readonly diagnosisCodes$ = this.select((s) => s.diagnosisCodes || [])
  readonly procedureOrTreatmentRequests$ = this.select((s) => s.procedureOrTreatmentRequests || [])

readonly diagnosisCodeId$ = this.select((s) => s.diagnosisCodeId)

readonly procedureOrTreatmentRequestId$ = this.select((s) => s.procedureOrTreatmentRequestId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureOrTreatmentRequestDiagnosisCodes$,
this.diagnosisCodes$,this.procedureOrTreatmentRequests$,
    (errors, loading, item, formName, procedureOrTreatmentRequestDiagnosisCodes, diagnosisCodes,procedureOrTreatmentRequests ) => ({
    errors,
    loading,
    item,
    formName,
    procedureOrTreatmentRequestDiagnosisCodes,

            diagnosisCodes,procedureOrTreatmentRequests
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.diagnosisCodeId$,
this.procedureOrTreatmentRequestId$, this.searchQuery$, (paging, diagnosisCodeId,
procedureOrTreatmentRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    diagnosisCodeId: diagnosisCodeId,procedureOrTreatmentRequestId: procedureOrTreatmentRequestId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setDiagnosisCodeId = this.updater((state, diagnosisCodeId: string) => ({
                ...state,
    diagnosisCodeId,
  }))


            readonly setProcedureOrTreatmentRequestId = this.updater((state, procedureOrTreatmentRequestId: string) => ({
                ...state,
    procedureOrTreatmentRequestId,
  }))



  readonly filterDiagnosisCodes = (term) => 
        this.data.userSelectDiagnosisCodes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let diagnosisCodes = res.data.items;
              this.patchState({diagnosisCodes})
              return diagnosisCodes
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


  readonly filterProcedureOrTreatmentRequests = (term) => 
        this.data.userSelectProcedureOrTreatmentRequests({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedureOrTreatmentRequests = res.data.items;
              this.patchState({procedureOrTreatmentRequests})
              return procedureOrTreatmentRequests
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



  readonly addDiagnosisCode = this.updater((state, diagnosisCode: DiagnosisCode) => ({
    ...state, diagnosisCodes: state.diagnosisCodes.concat(diagnosisCode)
  }))


  readonly addProcedureOrTreatmentRequest = this.updater((state, procedureOrTreatmentRequest: ProcedureOrTreatmentRequest) => ({
    ...state, procedureOrTreatmentRequests: state.procedureOrTreatmentRequests.concat(procedureOrTreatmentRequest)
  }))

    

  readonly setItem = this.updater((state, item: ProcedureOrTreatmentRequestDiagnosisCode) => ({...state, item}))

  addNewProcedureOrTreatmentRequestDiagnosisCode = this.updater((state, procedureOrTreatmentRequestDiagnosisCode: ProcedureOrTreatmentRequestDiagnosisCode) => ({ ...state, procedureOrTreatmentRequestDiagnosisCodes: [...state.procedureOrTreatmentRequestDiagnosisCodes, procedureOrTreatmentRequestDiagnosisCode] }))

  updateProcedureOrTreatmentRequestDiagnosisCode = this.updater((state, procedureOrTreatmentRequestDiagnosisCode: ProcedureOrTreatmentRequestDiagnosisCode) => {
    return {
      ...state,
      procedureOrTreatmentRequestDiagnosisCodes: state.procedureOrTreatmentRequestDiagnosisCodes.map((el) => {
        if (el.id === procedureOrTreatmentRequestDiagnosisCode.id) {
          return procedureOrTreatmentRequestDiagnosisCode
        } else {
          return el
        }
      }),
    }
  })

  addProcedureOrTreatmentRequestDiagnosisCodes = this.updater((state, newProcedureOrTreatmentRequestDiagnosisCodes: any[]) => ({...state, procedureOrTreatmentRequestDiagnosisCodes: state.procedureOrTreatmentRequestDiagnosisCodes.concat(newProcedureOrTreatmentRequestDiagnosisCodes) }))
  updateProcedureOrTreatmentRequestDiagnosisCodes = this.updater((state, updatedProcedureOrTreatmentRequestDiagnosisCodes: any[]) => {
    return {
      ...state,
      procedureOrTreatmentRequestDiagnosisCodes: state.procedureOrTreatmentRequestDiagnosisCodes.map((procedureOrTreatmentRequestDiagnosisCode) => {
        const updated = updatedProcedureOrTreatmentRequestDiagnosisCodes.find((el) => el.id === procedureOrTreatmentRequestDiagnosisCode.id);
        return updated ? updated : procedureOrTreatmentRequestDiagnosisCode;
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
        return this.procedureOrTreatmentRequestDiagnosisCodeService.validateProcedureOrTreatmentRequestDiagnosisCodeExcelData(excelData, vm.diagnosisCodes,vm.procedureOrTreatmentRequests);
      })
    )
  }


  readonly loadProcedureOrTreatmentRequestDiagnosisCodeEffect = this.effect<string>((procedureOrTreatmentRequestDiagnosisCodeId$) =>
    procedureOrTreatmentRequestDiagnosisCodeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((procedureOrTreatmentRequestDiagnosisCodeId) =>
        this.data.userProcedureOrTreatmentRequestDiagnosisCode({ procedureOrTreatmentRequestDiagnosisCodeId }).pipe(
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



  readonly loadProcedureOrTreatmentRequestDiagnosisCodesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userProcedureOrTreatmentRequestDiagnosisCodes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                procedureOrTreatmentRequestDiagnosisCodes: res.data.items,
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

  readonly createProcedureOrTreatmentRequestDiagnosisCodeEffect = this.effect<UserCreateProcedureOrTreatmentRequestDiagnosisCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.procedureOrTreatmentRequestDiagnosisCodeService.createProcedureOrTreatmentRequestDiagnosisCode({...input }).pipe(
          tapResponse(
            (procedureOrTreatmentRequestDiagnosisCode: ProcedureOrTreatmentRequestDiagnosisCode) => {
              this.addNewProcedureOrTreatmentRequestDiagnosisCode(procedureOrTreatmentRequestDiagnosisCode)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: procedureOrTreatmentRequestDiagnosisCode, loading: false, done: true }), 300);
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

    readonly updateProcedureOrTreatmentRequestDiagnosisCodeEffect = this.effect<UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.procedureOrTreatmentRequestDiagnosisCodeService.updateProcedureOrTreatmentRequestDiagnosisCode(input, input.id).pipe(
              tapResponse(
                (procedureOrTreatmentRequestDiagnosisCode) => {
                  this.updateProcedureOrTreatmentRequestDiagnosisCode(procedureOrTreatmentRequestDiagnosisCode)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: procedureOrTreatmentRequestDiagnosisCode, loading: false, done: true }), 300);
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
  
    readonly deleteProcedureOrTreatmentRequestDiagnosisCodeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, procedureOrTreatmentRequestDiagnosisCode]) => {
          return this.data.userDeleteProcedureOrTreatmentRequestDiagnosisCode({procedureOrTreatmentRequestDiagnosisCodeId: procedureOrTreatmentRequestDiagnosisCode.id})
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

  readonly importExcelEffect = this.effect<UserUpdateProcedureOrTreatmentRequestDiagnosisCodeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.procedureOrTreatmentRequestDiagnosisCodeService.importProcedureOrTreatmentRequestDiagnosisCodes(data).pipe(
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

            this.addProcedureOrTreatmentRequestDiagnosisCodes(created);
            this.updateProcedureOrTreatmentRequestDiagnosisCodes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
