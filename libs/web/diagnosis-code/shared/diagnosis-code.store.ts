
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { DiagnosisCodeService } from './diagnosis-code.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateDiagnosisCodeInput, UserUpdateDiagnosisCodeInput, WebCoreDataAccessService, CorePaging, DiagnosisCode,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface DiagnosisCodeFeatureState {
  errors?: any
  loading?: boolean
  item?: DiagnosisCode
  done: boolean,
  formName?: string

  diagnosisCodes: DiagnosisCode[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebDiagnosisCodeFeatureStore extends ComponentStore<DiagnosisCodeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly diagnosisCodeService: DiagnosisCodeService
) {
    super({ 
      loading: false,
      diagnosisCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('diagnosisCodeId')) {
      var diagnosisCodeId = this.route.snapshot.paramMap.get('diagnosisCodeId')
      this.setFormName('diagnosisCode_edit')
    } else {
      this.setFormName('diagnosisCode_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly diagnosisCodes$ = this.select((s) => s.diagnosisCodes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.diagnosisCodes$,

    (errors, loading, item, formName, diagnosisCodes,  ) => ({
    errors,
    loading,
    item,
    formName,
    diagnosisCodes,

            
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







    

  readonly setItem = this.updater((state, item: DiagnosisCode) => ({...state, item}))

  addNewDiagnosisCode = this.updater((state, diagnosisCode: DiagnosisCode) => ({ ...state, diagnosisCodes: [...state.diagnosisCodes, diagnosisCode] }))

  updateDiagnosisCode = this.updater((state, diagnosisCode: DiagnosisCode) => {
    return {
      ...state,
      diagnosisCodes: state.diagnosisCodes.map((el) => {
        if (el.id === diagnosisCode.id) {
          return diagnosisCode
        } else {
          return el
        }
      }),
    }
  })

  addDiagnosisCodes = this.updater((state, newDiagnosisCodes: any[]) => ({...state, diagnosisCodes: state.diagnosisCodes.concat(newDiagnosisCodes) }))
  updateDiagnosisCodes = this.updater((state, updatedDiagnosisCodes: any[]) => {
    return {
      ...state,
      diagnosisCodes: state.diagnosisCodes.map((diagnosisCode) => {
        const updated = updatedDiagnosisCodes.find((el) => el.id === diagnosisCode.id);
        return updated ? updated : diagnosisCode;
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
        return this.diagnosisCodeService.validateDiagnosisCodeExcelData(excelData);
      })
    )
  }


  readonly loadDiagnosisCodeEffect = this.effect<string>((diagnosisCodeId$) =>
    diagnosisCodeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((diagnosisCodeId) =>
        this.data.userDiagnosisCode({ diagnosisCodeId }).pipe(
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



  readonly loadDiagnosisCodesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userDiagnosisCodes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                diagnosisCodes: res.data.items,
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

  readonly createDiagnosisCodeEffect = this.effect<UserCreateDiagnosisCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.diagnosisCodeService.createDiagnosisCode({...input }).pipe(
          tapResponse(
            (diagnosisCode: DiagnosisCode) => {
              this.addNewDiagnosisCode(diagnosisCode)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: diagnosisCode, loading: false, done: true }), 300);
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

    readonly updateDiagnosisCodeEffect = this.effect<UserUpdateDiagnosisCodeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.diagnosisCodeService.updateDiagnosisCode(input, input.id).pipe(
              tapResponse(
                (diagnosisCode) => {
                  this.updateDiagnosisCode(diagnosisCode)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: diagnosisCode, loading: false, done: true }), 300);
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
  
    readonly deleteDiagnosisCodeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, diagnosisCode]) => {
          return this.data.userDeleteDiagnosisCode({diagnosisCodeId: diagnosisCode.id})
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

  readonly importExcelEffect = this.effect<UserUpdateDiagnosisCodeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.diagnosisCodeService.importDiagnosisCodes(data).pipe(
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

            this.addDiagnosisCodes(created);
            this.updateDiagnosisCodes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
