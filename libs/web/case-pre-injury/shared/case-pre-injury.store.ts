
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CasePreInjuryService } from './case-pre-injury.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCasePreInjuryInput, UserUpdateCasePreInjuryInput, WebCoreDataAccessService, CorePaging, CasePreInjury, LegalCase } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CasePreInjuryFeatureState {
  errors?: any
  loading?: boolean
  item?: CasePreInjury
  done: boolean,
  formName?: string
legalCaseId?: string,
  casePreInjuries: CasePreInjury[]
 legalCases?: LegalCase[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCasePreInjuryFeatureStore extends ComponentStore<CasePreInjuryFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly casePreInjuryService: CasePreInjuryService
) {
    super({ 
      loading: false,
      casePreInjuries: [],
      done: false,
      searchQuery: '',
      formName: undefined,
legalCaseId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('casePreInjuryId')) {
      var casePreInjuryId = this.route.snapshot.paramMap.get('casePreInjuryId')
      this.setFormName('casePreInjury_edit')
    } else {
      this.setFormName('casePreInjury_create')
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
  readonly casePreInjuries$ = this.select((s) => s.casePreInjuries)
  readonly legalCases$ = this.select((s) => s.legalCases || [])

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.casePreInjuries$,
this.legalCases$,
    (errors, loading, item, formName, casePreInjuries, legalCases ) => ({
    errors,
    loading,
    item,
    formName,
    casePreInjuries,

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

    

  readonly setItem = this.updater((state, item: CasePreInjury) => ({...state, item}))

  addNewCasePreInjury = this.updater((state, casePreInjury: CasePreInjury) => ({ ...state, casePreInjuries: [...state.casePreInjuries, casePreInjury] }))

  updateCasePreInjury = this.updater((state, casePreInjury: CasePreInjury) => {
    return {
      ...state,
      casePreInjuries: state.casePreInjuries.map((el) => {
        if (el.id === casePreInjury.id) {
          return casePreInjury
        } else {
          return el
        }
      }),
    }
  })

  addCasePreInjuries = this.updater((state, newCasePreInjuries: any[]) => ({...state, casePreInjuries: state.casePreInjuries.concat(newCasePreInjuries) }))
  updateCasePreInjuries = this.updater((state, updatedCasePreInjuries: any[]) => {
    return {
      ...state,
      casePreInjuries: state.casePreInjuries.map((casePreInjury) => {
        const updated = updatedCasePreInjuries.find((el) => el.id === casePreInjury.id);
        return updated ? updated : casePreInjury;
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
        return this.casePreInjuryService.validateCasePreInjuryExcelData(excelData, vm.legalCases);
      })
    )
  }


  readonly loadCasePreInjuryEffect = this.effect<string>((casePreInjuryId$) =>
    casePreInjuryId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((casePreInjuryId) =>
        this.data.userCasePreInjury({ casePreInjuryId }).pipe(
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



  readonly loadCasePreInjuriesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCasePreInjuries({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                casePreInjuries: res.data.items,
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

  readonly createCasePreInjuryEffect = this.effect<UserCreateCasePreInjuryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.casePreInjuryService.createCasePreInjury({...input }).pipe(
          tapResponse(
            (casePreInjury: CasePreInjury) => {
              this.addNewCasePreInjury(casePreInjury)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: casePreInjury, loading: false, done: true }), 300);
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

    readonly updateCasePreInjuryEffect = this.effect<UserUpdateCasePreInjuryInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.casePreInjuryService.updateCasePreInjury(input, input.id).pipe(
              tapResponse(
                (casePreInjury) => {
                  this.updateCasePreInjury(casePreInjury)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: casePreInjury, loading: false, done: true }), 300);
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
  
    readonly deleteCasePreInjuryEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, casePreInjury]) => {
          return this.data.userDeleteCasePreInjury({casePreInjuryId: casePreInjury.id})
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

  readonly importExcelEffect = this.effect<UserUpdateCasePreInjuryInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.casePreInjuryService.importCasePreInjuries(data).pipe(
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

            this.addCasePreInjuries(created);
            this.updateCasePreInjuries(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
