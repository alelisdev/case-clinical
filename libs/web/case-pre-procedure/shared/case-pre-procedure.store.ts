
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CasePreProcedureService } from './case-pre-procedure.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCasePreProcedureInput, UserUpdateCasePreProcedureInput, WebCoreDataAccessService, CorePaging, CasePreProcedure, LegalCase } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CasePreProcedureFeatureState {
  errors?: any
  loading?: boolean
  item?: CasePreProcedure
  done: boolean,
  formName?: string
legalCaseId?: string,
  casePreProcedures: CasePreProcedure[]
 legalCases?: LegalCase[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCasePreProcedureFeatureStore extends ComponentStore<CasePreProcedureFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly casePreProcedureService: CasePreProcedureService
) {
    super({ 
      loading: false,
      casePreProcedures: [],
      done: false,
      searchQuery: '',
      formName: undefined,
legalCaseId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('casePreProcedureId')) {
      var casePreProcedureId = this.route.snapshot.paramMap.get('casePreProcedureId')
      this.setFormName('casePreProcedure_edit')
    } else {
      this.setFormName('casePreProcedure_create')
    }


    if(this.route.snapshot.paramMap.has("legalCaseId")) {
      var legalCaseId = this.route.snapshot.paramMap.get("legalCaseId")
      this.setLegalCaseId(legalCaseId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly casePreProcedures$ = this.select((s) => s.casePreProcedures)
  readonly legalCases$ = this.select((s) => s.legalCases || [])

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.casePreProcedures$,
this.legalCases$,
    (errors, loading, item, formName, casePreProcedures, legalCases ) => ({
    errors,
    loading,
    item,
    formName,
    casePreProcedures,

            legalCases
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.legalCaseId$, this.searchQuery$, (paging, legalCaseId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    legalCaseId: legalCaseId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setLegalCaseId = this.updater((state, legalCaseId: string) => ({
                ...state,
    legalCaseId,
  }))



  readonly filterLegalCases = (term) => 
        this.data.userSelectLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
              return legalCases
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



  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))

    

  readonly setItem = this.updater((state, item: CasePreProcedure) => ({...state, item}))

  addNewCasePreProcedure = this.updater((state, casePreProcedure: CasePreProcedure) => ({ ...state, casePreProcedures: [...state.casePreProcedures, casePreProcedure] }))

  updateCasePreProcedure = this.updater((state, casePreProcedure: CasePreProcedure) => {
    return {
      ...state,
      casePreProcedures: state.casePreProcedures.map((el) => {
        if (el.id === casePreProcedure.id) {
          return casePreProcedure
        } else {
          return el
        }
      }),
    }
  })

  addCasePreProcedures = this.updater((state, newCasePreProcedures: any[]) => ({...state, casePreProcedures: state.casePreProcedures.concat(newCasePreProcedures) }))
  updateCasePreProcedures = this.updater((state, updatedCasePreProcedures: any[]) => {
    return {
      ...state,
      casePreProcedures: state.casePreProcedures.map((casePreProcedure) => {
        const updated = updatedCasePreProcedures.find((el) => el.id === casePreProcedure.id);
        return updated ? updated : casePreProcedure;
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
        return this.casePreProcedureService.validateCasePreProcedureExcelData(excelData, vm.legalCases);
      })
    )
  }


  readonly loadCasePreProcedureEffect = this.effect<string>((casePreProcedureId$) =>
    casePreProcedureId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((casePreProcedureId) =>
        this.data.userCasePreProcedure({ casePreProcedureId }).pipe(
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



  readonly loadCasePreProceduresEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCasePreProcedures({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                casePreProcedures: res.data.items,
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

  readonly createCasePreProcedureEffect = this.effect<UserCreateCasePreProcedureInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.casePreProcedureService.createCasePreProcedure({...input }).pipe(
          tapResponse(
            (casePreProcedure: CasePreProcedure) => {
              this.addNewCasePreProcedure(casePreProcedure)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: casePreProcedure, loading: false, done: true }), 300);
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

    readonly updateCasePreProcedureEffect = this.effect<UserUpdateCasePreProcedureInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.casePreProcedureService.updateCasePreProcedure(input, input.id).pipe(
              tapResponse(
                (casePreProcedure) => {
                  this.updateCasePreProcedure(casePreProcedure)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: casePreProcedure, loading: false, done: true }), 300);
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
  
    readonly deleteCasePreProcedureEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, casePreProcedure]) => {
          return this.data.userDeleteCasePreProcedure({casePreProcedureId: casePreProcedure.id})
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

  readonly importExcelEffect = this.effect<UserUpdateCasePreProcedureInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.casePreProcedureService.importCasePreProcedures(data).pipe(
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

            this.addCasePreProcedures(created);
            this.updateCasePreProcedures(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
