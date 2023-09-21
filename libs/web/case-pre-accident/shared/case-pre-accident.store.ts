
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CasePreAccidentService } from './case-pre-accident.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCasePreAccidentInput, UserUpdateCasePreAccidentInput, WebCoreDataAccessService, CorePaging, CasePreAccident, LegalCase } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CasePreAccidentFeatureState {
  errors?: any
  loading?: boolean
  item?: CasePreAccident
  done: boolean,
  formName?: string
legalCaseId?: string,
  casePreAccidents: CasePreAccident[]
 legalCases?: LegalCase[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCasePreAccidentFeatureStore extends ComponentStore<CasePreAccidentFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly casePreAccidentService: CasePreAccidentService
) {
    super({ 
      loading: false,
      casePreAccidents: [],
      done: false,
      searchQuery: '',
      formName: undefined,
legalCaseId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('casePreAccidentId')) {
      var casePreAccidentId = this.route.snapshot.paramMap.get('casePreAccidentId')
      this.setFormName('casePreAccident_edit')
    } else {
      this.setFormName('casePreAccident_create')
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
  readonly casePreAccidents$ = this.select((s) => s.casePreAccidents)
  readonly legalCases$ = this.select((s) => s.legalCases || [])

readonly legalCaseId$ = this.select((s) => s.legalCaseId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.casePreAccidents$,
this.legalCases$, this.legalCaseId$,
    (errors, loading, item, formName, casePreAccidents, legalCases,legalCaseId ) => ({
    errors,
    loading,
    item,
    formName,
    casePreAccidents,

            legalCases,
            legalCaseId
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

    

  readonly setItem = this.updater((state, item: CasePreAccident) => ({...state, item}))

  addNewCasePreAccident = this.updater((state, casePreAccident: CasePreAccident) => ({ ...state, casePreAccidents: [...state.casePreAccidents, casePreAccident] }))

  updateCasePreAccident = this.updater((state, casePreAccident: CasePreAccident) => {
    return {
      ...state,
      casePreAccidents: state.casePreAccidents.map((el) => {
        if (el.id === casePreAccident.id) {
          return casePreAccident
        } else {
          return el
        }
      }),
    }
  })

  addCasePreAccidents = this.updater((state, newCasePreAccidents: any[]) => ({...state, casePreAccidents: state.casePreAccidents.concat(newCasePreAccidents) }))
  updateCasePreAccidents = this.updater((state, updatedCasePreAccidents: any[]) => {
    return {
      ...state,
      casePreAccidents: state.casePreAccidents.map((casePreAccident) => {
        const updated = updatedCasePreAccidents.find((el) => el.id === casePreAccident.id);
        return updated ? updated : casePreAccident;
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
        const legalCaseId = vm.legalCaseId;
        console.log('legalCaseId', legalCaseId)
        return this.casePreAccidentService.validateCasePreAccidentExcelData(excelData, vm.legalCases, legalCaseId);
      })
    )
  }


  readonly loadCasePreAccidentEffect = this.effect<string>((casePreAccidentId$) =>
    casePreAccidentId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((casePreAccidentId) =>
        this.data.userCasePreAccident({ casePreAccidentId }).pipe(
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



  readonly loadCasePreAccidentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCasePreAccidents({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                casePreAccidents: res.data.items,
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

  readonly createCasePreAccidentEffect = this.effect<UserCreateCasePreAccidentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.casePreAccidentService.createCasePreAccident({...input }).pipe(
          tapResponse(
            (casePreAccident: CasePreAccident) => {
              this.addNewCasePreAccident(casePreAccident)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: casePreAccident, loading: false, done: true }), 300);
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

    readonly updateCasePreAccidentEffect = this.effect<UserUpdateCasePreAccidentInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.casePreAccidentService.updateCasePreAccident(input, input.id).pipe(
              tapResponse(
                (casePreAccident) => {
                  this.updateCasePreAccident(casePreAccident)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: casePreAccident, loading: false, done: true }), 300);
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
  
    readonly deleteCasePreAccidentEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, casePreAccident]) => {
          return this.data.userDeleteCasePreAccident({casePreAccidentId: casePreAccident.id})
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

  readonly importExcelEffect = this.effect<UserUpdateCasePreAccidentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.casePreAccidentService.importCasePreAccidents(data).pipe(
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

            this.addCasePreAccidents(created);
            this.updateCasePreAccidents(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
