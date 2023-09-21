
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { GuidelineUsedService } from './guideline-used.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateGuidelineUsedInput, UserUpdateGuidelineUsedInput, WebCoreDataAccessService, CorePaging, GuidelineUsed,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface GuidelineUsedFeatureState {
  errors?: any
  loading?: boolean
  item?: GuidelineUsed
  done: boolean,
  formName?: string

  guidelineUseds: GuidelineUsed[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebGuidelineUsedFeatureStore extends ComponentStore<GuidelineUsedFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly guidelineUsedService: GuidelineUsedService
) {
    super({ 
      loading: false,
      guidelineUseds: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('guidelineUsedId')) {
      var guidelineUsedId = this.route.snapshot.paramMap.get('guidelineUsedId')
      this.setFormName('guidelineUsed_edit')
    } else {
      this.setFormName('guidelineUsed_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly guidelineUseds$ = this.select((s) => s.guidelineUseds)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.guidelineUseds$,

    (errors, loading, item, formName, guidelineUseds,  ) => ({
    errors,
    loading,
    item,
    formName,
    guidelineUseds,

            
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







    

  readonly setItem = this.updater((state, item: GuidelineUsed) => ({...state, item}))

  addNewGuidelineUsed = this.updater((state, guidelineUsed: GuidelineUsed) => ({ ...state, guidelineUseds: [...state.guidelineUseds, guidelineUsed] }))

  updateGuidelineUsed = this.updater((state, guidelineUsed: GuidelineUsed) => {
    return {
      ...state,
      guidelineUseds: state.guidelineUseds.map((el) => {
        if (el.id === guidelineUsed.id) {
          return guidelineUsed
        } else {
          return el
        }
      }),
    }
  })

  addGuidelineUseds = this.updater((state, newGuidelineUseds: any[]) => ({...state, guidelineUseds: state.guidelineUseds.concat(newGuidelineUseds) }))
  updateGuidelineUseds = this.updater((state, updatedGuidelineUseds: any[]) => {
    return {
      ...state,
      guidelineUseds: state.guidelineUseds.map((guidelineUsed) => {
        const updated = updatedGuidelineUseds.find((el) => el.id === guidelineUsed.id);
        return updated ? updated : guidelineUsed;
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
        return this.guidelineUsedService.validateGuidelineUsedExcelData(excelData);
      })
    )
  }


  readonly loadGuidelineUsedEffect = this.effect<string>((guidelineUsedId$) =>
    guidelineUsedId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((guidelineUsedId) =>
        this.data.userGuidelineUsed({ guidelineUsedId }).pipe(
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



  readonly loadGuidelineUsedsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userGuidelineUseds({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                guidelineUseds: res.data.items,
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

  readonly createGuidelineUsedEffect = this.effect<UserCreateGuidelineUsedInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.guidelineUsedService.createGuidelineUsed({...input }).pipe(
          tapResponse(
            (guidelineUsed: GuidelineUsed) => {
              this.addNewGuidelineUsed(guidelineUsed)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: guidelineUsed, loading: false, done: true }), 300);
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

    readonly updateGuidelineUsedEffect = this.effect<UserUpdateGuidelineUsedInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.guidelineUsedService.updateGuidelineUsed(input, input.id).pipe(
              tapResponse(
                (guidelineUsed) => {
                  this.updateGuidelineUsed(guidelineUsed)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: guidelineUsed, loading: false, done: true }), 300);
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
  
    readonly deleteGuidelineUsedEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, guidelineUsed]) => {
          return this.data.userDeleteGuidelineUsed({guidelineUsedId: guidelineUsed.id})
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

  readonly importExcelEffect = this.effect<UserUpdateGuidelineUsedInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.guidelineUsedService.importGuidelineUseds(data).pipe(
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

            this.addGuidelineUseds(created);
            this.updateGuidelineUseds(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
