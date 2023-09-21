
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PriorAuthGuidelineService } from './prior-auth-guideline.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePriorAuthGuidelineInput, UserUpdatePriorAuthGuidelineInput, WebCoreDataAccessService, CorePaging, PriorAuthGuideline, Guideline,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PriorAuthGuidelineFeatureState {
  errors?: any
  loading?: boolean
  item?: PriorAuthGuideline
  done: boolean,
  formName?: string
guidelineId?: string,priorAuthorizationRequestId?: string,
  priorAuthGuidelines: PriorAuthGuideline[]
 guidelines?: Guideline[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPriorAuthGuidelineFeatureStore extends ComponentStore<PriorAuthGuidelineFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthGuidelineService: PriorAuthGuidelineService
) {
    super({ 
      loading: false,
      priorAuthGuidelines: [],
      done: false,
      searchQuery: '',
      formName: undefined,
guidelineId: undefined,
priorAuthorizationRequestId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('priorAuthGuidelineId')) {
      var priorAuthGuidelineId = this.route.snapshot.paramMap.get('priorAuthGuidelineId')
      this.setFormName('priorAuthGuideline_edit')
    } else {
      this.setFormName('priorAuthGuideline_create')
    }


    if(this.route.snapshot.paramMap.has("guidelineId")) {
      var guidelineId = this.route.snapshot.paramMap.get("guidelineId")
      this.setGuidelineId(guidelineId)
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
  readonly priorAuthGuidelines$ = this.select((s) => s.priorAuthGuidelines)
  readonly guidelines$ = this.select((s) => s.guidelines || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])

readonly guidelineId$ = this.select((s) => s.guidelineId)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthGuidelines$,
this.guidelines$,this.priorAuthorizationRequests$,
    (errors, loading, item, formName, priorAuthGuidelines, guidelines,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
    formName,
    priorAuthGuidelines,

            guidelines,priorAuthorizationRequests
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.guidelineId$,
this.priorAuthorizationRequestId$, this.searchQuery$, (paging, guidelineId,
priorAuthorizationRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    guidelineId: guidelineId,priorAuthorizationRequestId: priorAuthorizationRequestId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setGuidelineId = this.updater((state, guidelineId: string) => ({
                ...state,
    guidelineId,
  }))


            readonly setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId: string) => ({
                ...state,
    priorAuthorizationRequestId,
  }))



  readonly filterGuidelines = (term) => 
        this.data.userSelectGuidelines({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let guidelines = res.data.items;
              this.patchState({guidelines})
              return guidelines
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



  readonly addGuideline = this.updater((state, guideline: Guideline) => ({
    ...state, guidelines: state.guidelines.concat(guideline)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

    

  readonly setItem = this.updater((state, item: PriorAuthGuideline) => ({...state, item}))

  addNewPriorAuthGuideline = this.updater((state, priorAuthGuideline: PriorAuthGuideline) => ({ ...state, priorAuthGuidelines: [...state.priorAuthGuidelines, priorAuthGuideline] }))

  updatePriorAuthGuideline = this.updater((state, priorAuthGuideline: PriorAuthGuideline) => {
    return {
      ...state,
      priorAuthGuidelines: state.priorAuthGuidelines.map((el) => {
        if (el.id === priorAuthGuideline.id) {
          return priorAuthGuideline
        } else {
          return el
        }
      }),
    }
  })

  addPriorAuthGuidelines = this.updater((state, newPriorAuthGuidelines: any[]) => ({...state, priorAuthGuidelines: state.priorAuthGuidelines.concat(newPriorAuthGuidelines) }))
  updatePriorAuthGuidelines = this.updater((state, updatedPriorAuthGuidelines: any[]) => {
    return {
      ...state,
      priorAuthGuidelines: state.priorAuthGuidelines.map((priorAuthGuideline) => {
        const updated = updatedPriorAuthGuidelines.find((el) => el.id === priorAuthGuideline.id);
        return updated ? updated : priorAuthGuideline;
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
        return this.priorAuthGuidelineService.validatePriorAuthGuidelineExcelData(excelData, vm.guidelines,vm.priorAuthorizationRequests);
      })
    )
  }


  readonly loadPriorAuthGuidelineEffect = this.effect<string>((priorAuthGuidelineId$) =>
    priorAuthGuidelineId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((priorAuthGuidelineId) =>
        this.data.userPriorAuthGuideline({ priorAuthGuidelineId }).pipe(
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



  readonly loadPriorAuthGuidelinesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthGuidelines({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                priorAuthGuidelines: res.data.items,
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

  readonly createPriorAuthGuidelineEffect = this.effect<UserCreatePriorAuthGuidelineInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.priorAuthGuidelineService.createPriorAuthGuideline({...input }).pipe(
          tapResponse(
            (priorAuthGuideline: PriorAuthGuideline) => {
              this.addNewPriorAuthGuideline(priorAuthGuideline)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: priorAuthGuideline, loading: false, done: true }), 300);
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

    readonly updatePriorAuthGuidelineEffect = this.effect<UserUpdatePriorAuthGuidelineInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.priorAuthGuidelineService.updatePriorAuthGuideline(input, input.id).pipe(
              tapResponse(
                (priorAuthGuideline) => {
                  this.updatePriorAuthGuideline(priorAuthGuideline)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: priorAuthGuideline, loading: false, done: true }), 300);
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
  
    readonly deletePriorAuthGuidelineEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, priorAuthGuideline]) => {
          return this.data.userDeletePriorAuthGuideline({priorAuthGuidelineId: priorAuthGuideline.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePriorAuthGuidelineInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthGuidelineService.importPriorAuthGuidelines(data).pipe(
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

            this.addPriorAuthGuidelines(created);
            this.updatePriorAuthGuidelines(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
