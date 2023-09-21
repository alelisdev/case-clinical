
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CasePreProblemService } from './case-pre-problem.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCasePreProblemInput, UserUpdateCasePreProblemInput, WebCoreDataAccessService, CorePaging, CasePreProblem, LegalCase } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CasePreProblemFeatureState {
  errors?: any
  loading?: boolean
  item?: CasePreProblem
  done: boolean,
  formName?: string
legalCaseId?: string,
  casePreProblems: CasePreProblem[]
 legalCases?: LegalCase[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCasePreProblemFeatureStore extends ComponentStore<CasePreProblemFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly casePreProblemService: CasePreProblemService
) {
    super({ 
      loading: false,
      casePreProblems: [],
      done: false,
      searchQuery: '',
      formName: undefined,
legalCaseId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('casePreProblemId')) {
      var casePreProblemId = this.route.snapshot.paramMap.get('casePreProblemId')
      this.setFormName('casePreProblem_edit')
    } else {
      this.setFormName('casePreProblem_create')
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
  readonly casePreProblems$ = this.select((s) => s.casePreProblems)
  readonly legalCases$ = this.select((s) => s.legalCases || [])

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.casePreProblems$,
this.legalCases$,
    (errors, loading, item, formName, casePreProblems, legalCases ) => ({
    errors,
    loading,
    item,
    formName,
    casePreProblems,

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

    

  readonly setItem = this.updater((state, item: CasePreProblem) => ({...state, item}))

  addNewCasePreProblem = this.updater((state, casePreProblem: CasePreProblem) => ({ ...state, casePreProblems: [...state.casePreProblems, casePreProblem] }))

  updateCasePreProblem = this.updater((state, casePreProblem: CasePreProblem) => {
    return {
      ...state,
      casePreProblems: state.casePreProblems.map((el) => {
        if (el.id === casePreProblem.id) {
          return casePreProblem
        } else {
          return el
        }
      }),
    }
  })

  addCasePreProblems = this.updater((state, newCasePreProblems: any[]) => ({...state, casePreProblems: state.casePreProblems.concat(newCasePreProblems) }))
  updateCasePreProblems = this.updater((state, updatedCasePreProblems: any[]) => {
    return {
      ...state,
      casePreProblems: state.casePreProblems.map((casePreProblem) => {
        const updated = updatedCasePreProblems.find((el) => el.id === casePreProblem.id);
        return updated ? updated : casePreProblem;
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
        return this.casePreProblemService.validateCasePreProblemExcelData(excelData, vm.legalCases);
      })
    )
  }


  readonly loadCasePreProblemEffect = this.effect<string>((casePreProblemId$) =>
    casePreProblemId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((casePreProblemId) =>
        this.data.userCasePreProblem({ casePreProblemId }).pipe(
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



  readonly loadCasePreProblemsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCasePreProblems({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                casePreProblems: res.data.items,
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

  readonly createCasePreProblemEffect = this.effect<UserCreateCasePreProblemInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.casePreProblemService.createCasePreProblem({...input }).pipe(
          tapResponse(
            (casePreProblem: CasePreProblem) => {
              this.addNewCasePreProblem(casePreProblem)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: casePreProblem, loading: false, done: true }), 300);
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

    readonly updateCasePreProblemEffect = this.effect<UserUpdateCasePreProblemInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.casePreProblemService.updateCasePreProblem(input, input.id).pipe(
              tapResponse(
                (casePreProblem) => {
                  this.updateCasePreProblem(casePreProblem)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: casePreProblem, loading: false, done: true }), 300);
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
  
    readonly deleteCasePreProblemEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, casePreProblem]) => {
          return this.data.userDeleteCasePreProblem({casePreProblemId: casePreProblem.id})
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

  readonly importExcelEffect = this.effect<UserUpdateCasePreProblemInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.casePreProblemService.importCasePreProblems(data).pipe(
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

            this.addCasePreProblems(created);
            this.updateCasePreProblems(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
