
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { TreatmentService } from './treatment.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateTreatmentInput, UserUpdateTreatmentInput, WebCoreDataAccessService, CorePaging, Treatment,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface TreatmentFeatureState {
  errors?: any
  loading?: boolean
  item?: Treatment
  done: boolean,
  formName?: string

  treatments: Treatment[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebTreatmentFeatureStore extends ComponentStore<TreatmentFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly treatmentService: TreatmentService
) {
    super({ 
      loading: false,
      treatments: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('treatmentId')) {
      var treatmentId = this.route.snapshot.paramMap.get('treatmentId')
      this.setFormName('treatment_edit')
    } else {
      this.setFormName('treatment_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly treatments$ = this.select((s) => s.treatments)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.treatments$,

    (errors, loading, item, formName, treatments,  ) => ({
    errors,
    loading,
    item,
    formName,
    treatments,

            
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







    

  readonly setItem = this.updater((state, item: Treatment) => ({...state, item}))

  addNewTreatment = this.updater((state, treatment: Treatment) => ({ ...state, treatments: [...state.treatments, treatment] }))

  updateTreatment = this.updater((state, treatment: Treatment) => {
    return {
      ...state,
      treatments: state.treatments.map((el) => {
        if (el.id === treatment.id) {
          return treatment
        } else {
          return el
        }
      }),
    }
  })

  addTreatments = this.updater((state, newTreatments: any[]) => ({...state, treatments: state.treatments.concat(newTreatments) }))
  updateTreatments = this.updater((state, updatedTreatments: any[]) => {
    return {
      ...state,
      treatments: state.treatments.map((treatment) => {
        const updated = updatedTreatments.find((el) => el.id === treatment.id);
        return updated ? updated : treatment;
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
        return this.treatmentService.validateTreatmentExcelData(excelData);
      })
    )
  }


  readonly loadTreatmentEffect = this.effect<string>((treatmentId$) =>
    treatmentId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((treatmentId) =>
        this.data.userTreatment({ treatmentId }).pipe(
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



  readonly loadTreatmentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userTreatments({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                treatments: res.data.items,
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

  readonly createTreatmentEffect = this.effect<UserCreateTreatmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.treatmentService.createTreatment({...input }).pipe(
          tapResponse(
            (treatment: Treatment) => {
              this.addNewTreatment(treatment)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: treatment, loading: false, done: true }), 300);
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

    readonly updateTreatmentEffect = this.effect<UserUpdateTreatmentInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.treatmentService.updateTreatment(input, input.id).pipe(
              tapResponse(
                (treatment) => {
                  this.updateTreatment(treatment)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: treatment, loading: false, done: true }), 300);
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
  
    readonly deleteTreatmentEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, treatment]) => {
          return this.data.userDeleteTreatment({treatmentId: treatment.id})
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

  readonly importExcelEffect = this.effect<UserUpdateTreatmentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.treatmentService.importTreatments(data).pipe(
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

            this.addTreatments(created);
            this.updateTreatments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
