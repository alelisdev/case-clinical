
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { GuidelineService } from './guideline.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateGuidelineInput, UserUpdateGuidelineInput, WebCoreDataAccessService, CorePaging, Guideline,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface GuidelineFeatureState {
  errors?: any
  loading?: boolean
  item?: Guideline
  done: boolean,
  formName?: string

  guidelines: Guideline[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebGuidelineFeatureStore extends ComponentStore<GuidelineFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly guidelineService: GuidelineService
) {
    super({ 
      loading: false,
      guidelines: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('guidelineId')) {
      var guidelineId = this.route.snapshot.paramMap.get('guidelineId')
      this.setFormName('guideline_edit')
    } else {
      this.setFormName('guideline_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly guidelines$ = this.select((s) => s.guidelines)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.guidelines$,

    (errors, loading, item, formName, guidelines,  ) => ({
    errors,
    loading,
    item,
    formName,
    guidelines,

            
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







    

  readonly setItem = this.updater((state, item: Guideline) => ({...state, item}))

  addNewGuideline = this.updater((state, guideline: Guideline) => ({ ...state, guidelines: [...state.guidelines, guideline] }))

  updateGuideline = this.updater((state, guideline: Guideline) => {
    return {
      ...state,
      guidelines: state.guidelines.map((el) => {
        if (el.id === guideline.id) {
          return guideline
        } else {
          return el
        }
      }),
    }
  })

  addGuidelines = this.updater((state, newGuidelines: any[]) => ({...state, guidelines: state.guidelines.concat(newGuidelines) }))
  updateGuidelines = this.updater((state, updatedGuidelines: any[]) => {
    return {
      ...state,
      guidelines: state.guidelines.map((guideline) => {
        const updated = updatedGuidelines.find((el) => el.id === guideline.id);
        return updated ? updated : guideline;
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
        return this.guidelineService.validateGuidelineExcelData(excelData);
      })
    )
  }


  readonly loadGuidelineEffect = this.effect<string>((guidelineId$) =>
    guidelineId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((guidelineId) =>
        this.data.userGuideline({ guidelineId }).pipe(
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



  readonly loadGuidelinesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userGuidelines({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                guidelines: res.data.items,
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

  readonly createGuidelineEffect = this.effect<UserCreateGuidelineInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.guidelineService.createGuideline({...input }).pipe(
          tapResponse(
            (guideline: Guideline) => {
              this.addNewGuideline(guideline)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: guideline, loading: false, done: true }), 300);
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

    readonly updateGuidelineEffect = this.effect<UserUpdateGuidelineInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.guidelineService.updateGuideline(input, input.id).pipe(
              tapResponse(
                (guideline) => {
                  this.updateGuideline(guideline)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: guideline, loading: false, done: true }), 300);
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
  
    readonly deleteGuidelineEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, guideline]) => {
          return this.data.userDeleteGuideline({guidelineId: guideline.id})
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

  readonly importExcelEffect = this.effect<UserUpdateGuidelineInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.guidelineService.importGuidelines(data).pipe(
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

            this.addGuidelines(created);
            this.updateGuidelines(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
