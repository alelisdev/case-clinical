
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { EthnicityService } from './ethnicity.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateEthnicityInput, UserUpdateEthnicityInput, WebCoreDataAccessService, CorePaging, Ethnicity,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface EthnicityFeatureState {
  errors?: any
  loading?: boolean
  item?: Ethnicity
  done: boolean,
  formName?: string

  ethnicities: Ethnicity[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebEthnicityFeatureStore extends ComponentStore<EthnicityFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly ethnicityService: EthnicityService
) {
    super({ 
      loading: false,
      ethnicities: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('ethnicityId')) {
      var ethnicityId = this.route.snapshot.paramMap.get('ethnicityId')
      this.setFormName('ethnicity_edit')
    } else {
      this.setFormName('ethnicity_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly ethnicities$ = this.select((s) => s.ethnicities)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.ethnicities$,

    (errors, loading, item, formName, ethnicities,  ) => ({
    errors,
    loading,
    item,
    formName,
    ethnicities,

            
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







    

  readonly setItem = this.updater((state, item: Ethnicity) => ({...state, item}))

  addNewEthnicity = this.updater((state, ethnicity: Ethnicity) => ({ ...state, ethnicities: [...state.ethnicities, ethnicity] }))

  updateEthnicity = this.updater((state, ethnicity: Ethnicity) => {
    return {
      ...state,
      ethnicities: state.ethnicities.map((el) => {
        if (el.id === ethnicity.id) {
          return ethnicity
        } else {
          return el
        }
      }),
    }
  })

  addEthnicities = this.updater((state, newEthnicities: any[]) => ({...state, ethnicities: state.ethnicities.concat(newEthnicities) }))
  updateEthnicities = this.updater((state, updatedEthnicities: any[]) => {
    return {
      ...state,
      ethnicities: state.ethnicities.map((ethnicity) => {
        const updated = updatedEthnicities.find((el) => el.id === ethnicity.id);
        return updated ? updated : ethnicity;
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
        return this.ethnicityService.validateEthnicityExcelData(excelData);
      })
    )
  }


  readonly loadEthnicityEffect = this.effect<string>((ethnicityId$) =>
    ethnicityId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((ethnicityId) =>
        this.data.userEthnicity({ ethnicityId }).pipe(
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



  readonly loadEthnicitiesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userEthnicities({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                ethnicities: res.data.items,
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

  readonly createEthnicityEffect = this.effect<UserCreateEthnicityInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.ethnicityService.createEthnicity({...input }).pipe(
          tapResponse(
            (ethnicity: Ethnicity) => {
              this.addNewEthnicity(ethnicity)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: ethnicity, loading: false, done: true }), 300);
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

    readonly updateEthnicityEffect = this.effect<UserUpdateEthnicityInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.ethnicityService.updateEthnicity(input, input.id).pipe(
              tapResponse(
                (ethnicity) => {
                  this.updateEthnicity(ethnicity)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: ethnicity, loading: false, done: true }), 300);
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
  
    readonly deleteEthnicityEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, ethnicity]) => {
          return this.data.userDeleteEthnicity({ethnicityId: ethnicity.id})
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

  readonly importExcelEffect = this.effect<UserUpdateEthnicityInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.ethnicityService.importEthnicities(data).pipe(
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

            this.addEthnicities(created);
            this.updateEthnicities(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
