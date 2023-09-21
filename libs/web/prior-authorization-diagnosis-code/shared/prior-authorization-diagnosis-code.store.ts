
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PriorAuthorizationDiagnosisCodeService } from './prior-authorization-diagnosis-code.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePriorAuthorizationDiagnosisCodeInput, UserUpdatePriorAuthorizationDiagnosisCodeInput, WebCoreDataAccessService, CorePaging, PriorAuthorizationDiagnosisCode, DiagnosisCode,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PriorAuthorizationDiagnosisCodeFeatureState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationDiagnosisCode
  done: boolean,
  formName?: string
diagnosisCodeId?: string,priorAuthorizationRequestId?: string,
  priorAuthorizationDiagnosisCodes: PriorAuthorizationDiagnosisCode[]
 diagnosisCodes?: DiagnosisCode[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPriorAuthorizationDiagnosisCodeFeatureStore extends ComponentStore<PriorAuthorizationDiagnosisCodeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationDiagnosisCodeService: PriorAuthorizationDiagnosisCodeService
) {
    super({ 
      loading: false,
      priorAuthorizationDiagnosisCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
diagnosisCodeId: undefined,
priorAuthorizationRequestId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('priorAuthorizationDiagnosisCodeId')) {
      var priorAuthorizationDiagnosisCodeId = this.route.snapshot.paramMap.get('priorAuthorizationDiagnosisCodeId')
      this.setFormName('priorAuthorizationDiagnosisCode_edit')
    } else {
      this.setFormName('priorAuthorizationDiagnosisCode_create')
    }


    if(this.route.snapshot.paramMap.has("diagnosisCodeId")) {
      var diagnosisCodeId = this.route.snapshot.paramMap.get("diagnosisCodeId")
      this.setDiagnosisCodeId(diagnosisCodeId)
    }


    if(this.route.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get("priorAuthorizationRequestId")
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly priorAuthorizationDiagnosisCodes$ = this.select((s) => s.priorAuthorizationDiagnosisCodes)
  readonly diagnosisCodes$ = this.select((s) => s.diagnosisCodes || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])

readonly diagnosisCodeId$ = this.select((s) => s.diagnosisCodeId)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthorizationDiagnosisCodes$,
this.diagnosisCodes$,this.priorAuthorizationRequests$,
    (errors, loading, item, formName, priorAuthorizationDiagnosisCodes, diagnosisCodes,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
    formName,
    priorAuthorizationDiagnosisCodes,

            diagnosisCodes,priorAuthorizationRequests
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.diagnosisCodeId$,
this.priorAuthorizationRequestId$, this.searchQuery$, (paging, diagnosisCodeId,
priorAuthorizationRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    diagnosisCodeId: diagnosisCodeId,priorAuthorizationRequestId: priorAuthorizationRequestId,
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


            readonly setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId: string) => ({
                ...state,
    priorAuthorizationRequestId,
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


  readonly filterPriorAuthorizationRequests = (term) => 
        this.data.userSelectPriorAuthorizationRequests({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let priorAuthorizationRequests = res.data.items;
              this.patchState({priorAuthorizationRequests})
              return priorAuthorizationRequests
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


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

    

  readonly setItem = this.updater((state, item: PriorAuthorizationDiagnosisCode) => ({...state, item}))

  addNewPriorAuthorizationDiagnosisCode = this.updater((state, priorAuthorizationDiagnosisCode: PriorAuthorizationDiagnosisCode) => ({ ...state, priorAuthorizationDiagnosisCodes: [...state.priorAuthorizationDiagnosisCodes, priorAuthorizationDiagnosisCode] }))

  updatePriorAuthorizationDiagnosisCode = this.updater((state, priorAuthorizationDiagnosisCode: PriorAuthorizationDiagnosisCode) => {
    return {
      ...state,
      priorAuthorizationDiagnosisCodes: state.priorAuthorizationDiagnosisCodes.map((el) => {
        if (el.id === priorAuthorizationDiagnosisCode.id) {
          return priorAuthorizationDiagnosisCode
        } else {
          return el
        }
      }),
    }
  })

  addPriorAuthorizationDiagnosisCodes = this.updater((state, newPriorAuthorizationDiagnosisCodes: any[]) => ({...state, priorAuthorizationDiagnosisCodes: state.priorAuthorizationDiagnosisCodes.concat(newPriorAuthorizationDiagnosisCodes) }))
  updatePriorAuthorizationDiagnosisCodes = this.updater((state, updatedPriorAuthorizationDiagnosisCodes: any[]) => {
    return {
      ...state,
      priorAuthorizationDiagnosisCodes: state.priorAuthorizationDiagnosisCodes.map((priorAuthorizationDiagnosisCode) => {
        const updated = updatedPriorAuthorizationDiagnosisCodes.find((el) => el.id === priorAuthorizationDiagnosisCode.id);
        return updated ? updated : priorAuthorizationDiagnosisCode;
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
        return this.priorAuthorizationDiagnosisCodeService.validatePriorAuthorizationDiagnosisCodeExcelData(excelData, vm.diagnosisCodes,vm.priorAuthorizationRequests);
      })
    )
  }


  readonly loadPriorAuthorizationDiagnosisCodeEffect = this.effect<string>((priorAuthorizationDiagnosisCodeId$) =>
    priorAuthorizationDiagnosisCodeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((priorAuthorizationDiagnosisCodeId) =>
        this.data.userPriorAuthorizationDiagnosisCode({ priorAuthorizationDiagnosisCodeId }).pipe(
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



  readonly loadPriorAuthorizationDiagnosisCodesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthorizationDiagnosisCodes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                priorAuthorizationDiagnosisCodes: res.data.items,
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

  readonly createPriorAuthorizationDiagnosisCodeEffect = this.effect<UserCreatePriorAuthorizationDiagnosisCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.priorAuthorizationDiagnosisCodeService.createPriorAuthorizationDiagnosisCode({...input }).pipe(
          tapResponse(
            (priorAuthorizationDiagnosisCode: PriorAuthorizationDiagnosisCode) => {
              this.addNewPriorAuthorizationDiagnosisCode(priorAuthorizationDiagnosisCode)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: priorAuthorizationDiagnosisCode, loading: false, done: true }), 300);
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

    readonly updatePriorAuthorizationDiagnosisCodeEffect = this.effect<UserUpdatePriorAuthorizationDiagnosisCodeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.priorAuthorizationDiagnosisCodeService.updatePriorAuthorizationDiagnosisCode(input, input.id).pipe(
              tapResponse(
                (priorAuthorizationDiagnosisCode) => {
                  this.updatePriorAuthorizationDiagnosisCode(priorAuthorizationDiagnosisCode)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: priorAuthorizationDiagnosisCode, loading: false, done: true }), 300);
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
  
    readonly deletePriorAuthorizationDiagnosisCodeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, priorAuthorizationDiagnosisCode]) => {
          return this.data.userDeletePriorAuthorizationDiagnosisCode({priorAuthorizationDiagnosisCodeId: priorAuthorizationDiagnosisCode.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePriorAuthorizationDiagnosisCodeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthorizationDiagnosisCodeService.importPriorAuthorizationDiagnosisCodes(data).pipe(
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

            this.addPriorAuthorizationDiagnosisCodes(created);
            this.updatePriorAuthorizationDiagnosisCodes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
