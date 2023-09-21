
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { HealthInsuranceService } from './health-insurance.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateHealthInsuranceInput, UserUpdateHealthInsuranceInput, WebCoreDataAccessService, CorePaging, HealthInsurance,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface HealthInsuranceFeatureState {
  errors?: any
  loading?: boolean
  item?: HealthInsurance
  done: boolean,
  formName?: string

  healthInsurances: HealthInsurance[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebHealthInsuranceFeatureStore extends ComponentStore<HealthInsuranceFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly healthInsuranceService: HealthInsuranceService
) {
    super({ 
      loading: false,
      healthInsurances: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('healthInsuranceId')) {
      var healthInsuranceId = this.route.snapshot.paramMap.get('healthInsuranceId')
      this.setFormName('healthInsurance_edit')
    } else {
      this.setFormName('healthInsurance_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly healthInsurances$ = this.select((s) => s.healthInsurances)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.healthInsurances$,

    (errors, loading, item, formName, healthInsurances,  ) => ({
    errors,
    loading,
    item,
    formName,
    healthInsurances,

            
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







    

  readonly setItem = this.updater((state, item: HealthInsurance) => ({...state, item}))

  addNewHealthInsurance = this.updater((state, healthInsurance: HealthInsurance) => ({ ...state, healthInsurances: [...state.healthInsurances, healthInsurance] }))

  updateHealthInsurance = this.updater((state, healthInsurance: HealthInsurance) => {
    return {
      ...state,
      healthInsurances: state.healthInsurances.map((el) => {
        if (el.id === healthInsurance.id) {
          return healthInsurance
        } else {
          return el
        }
      }),
    }
  })

  addHealthInsurances = this.updater((state, newHealthInsurances: any[]) => ({...state, healthInsurances: state.healthInsurances.concat(newHealthInsurances) }))
  updateHealthInsurances = this.updater((state, updatedHealthInsurances: any[]) => {
    return {
      ...state,
      healthInsurances: state.healthInsurances.map((healthInsurance) => {
        const updated = updatedHealthInsurances.find((el) => el.id === healthInsurance.id);
        return updated ? updated : healthInsurance;
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
        return this.healthInsuranceService.validateHealthInsuranceExcelData(excelData);
      })
    )
  }


  readonly loadHealthInsuranceEffect = this.effect<string>((healthInsuranceId$) =>
    healthInsuranceId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((healthInsuranceId) =>
        this.data.userHealthInsurance({ healthInsuranceId }).pipe(
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



  readonly loadHealthInsurancesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userHealthInsurances({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                healthInsurances: res.data.items,
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

  readonly createHealthInsuranceEffect = this.effect<UserCreateHealthInsuranceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.healthInsuranceService.createHealthInsurance({...input }).pipe(
          tapResponse(
            (healthInsurance: HealthInsurance) => {
              this.addNewHealthInsurance(healthInsurance)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: healthInsurance, loading: false, done: true }), 300);
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

    readonly updateHealthInsuranceEffect = this.effect<UserUpdateHealthInsuranceInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.healthInsuranceService.updateHealthInsurance(input, input.id).pipe(
              tapResponse(
                (healthInsurance) => {
                  this.updateHealthInsurance(healthInsurance)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: healthInsurance, loading: false, done: true }), 300);
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
  
    readonly deleteHealthInsuranceEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, healthInsurance]) => {
          return this.data.userDeleteHealthInsurance({healthInsuranceId: healthInsurance.id})
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

  readonly importExcelEffect = this.effect<UserUpdateHealthInsuranceInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.healthInsuranceService.importHealthInsurances(data).pipe(
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

            this.addHealthInsurances(created);
            this.updateHealthInsurances(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
