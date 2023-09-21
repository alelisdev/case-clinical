
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { InsuranceSectorService } from './insurance-sector.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateInsuranceSectorInput, UserUpdateInsuranceSectorInput, WebCoreDataAccessService, CorePaging, InsuranceSector,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface InsuranceSectorFeatureState {
  errors?: any
  loading?: boolean
  item?: InsuranceSector
  done: boolean,
  formName?: string

  insuranceSectors: InsuranceSector[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebInsuranceSectorFeatureStore extends ComponentStore<InsuranceSectorFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly insuranceSectorService: InsuranceSectorService
) {
    super({ 
      loading: false,
      insuranceSectors: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('insuranceSectorId')) {
      var insuranceSectorId = this.route.snapshot.paramMap.get('insuranceSectorId')
      this.setFormName('insuranceSector_edit')
    } else {
      this.setFormName('insuranceSector_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly insuranceSectors$ = this.select((s) => s.insuranceSectors)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.insuranceSectors$,

    (errors, loading, item, formName, insuranceSectors,  ) => ({
    errors,
    loading,
    item,
    formName,
    insuranceSectors,

            
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







    

  readonly setItem = this.updater((state, item: InsuranceSector) => ({...state, item}))

  addNewInsuranceSector = this.updater((state, insuranceSector: InsuranceSector) => ({ ...state, insuranceSectors: [...state.insuranceSectors, insuranceSector] }))

  updateInsuranceSector = this.updater((state, insuranceSector: InsuranceSector) => {
    return {
      ...state,
      insuranceSectors: state.insuranceSectors.map((el) => {
        if (el.id === insuranceSector.id) {
          return insuranceSector
        } else {
          return el
        }
      }),
    }
  })

  addInsuranceSectors = this.updater((state, newInsuranceSectors: any[]) => ({...state, insuranceSectors: state.insuranceSectors.concat(newInsuranceSectors) }))
  updateInsuranceSectors = this.updater((state, updatedInsuranceSectors: any[]) => {
    return {
      ...state,
      insuranceSectors: state.insuranceSectors.map((insuranceSector) => {
        const updated = updatedInsuranceSectors.find((el) => el.id === insuranceSector.id);
        return updated ? updated : insuranceSector;
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
        return this.insuranceSectorService.validateInsuranceSectorExcelData(excelData);
      })
    )
  }


  readonly loadInsuranceSectorEffect = this.effect<string>((insuranceSectorId$) =>
    insuranceSectorId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((insuranceSectorId) =>
        this.data.userInsuranceSector({ insuranceSectorId }).pipe(
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



  readonly loadInsuranceSectorsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userInsuranceSectors({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                insuranceSectors: res.data.items,
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

  readonly createInsuranceSectorEffect = this.effect<UserCreateInsuranceSectorInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.insuranceSectorService.createInsuranceSector({...input }).pipe(
          tapResponse(
            (insuranceSector: InsuranceSector) => {
              this.addNewInsuranceSector(insuranceSector)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: insuranceSector, loading: false, done: true }), 300);
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

    readonly updateInsuranceSectorEffect = this.effect<UserUpdateInsuranceSectorInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.insuranceSectorService.updateInsuranceSector(input, input.id).pipe(
              tapResponse(
                (insuranceSector) => {
                  this.updateInsuranceSector(insuranceSector)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: insuranceSector, loading: false, done: true }), 300);
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
  
    readonly deleteInsuranceSectorEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, insuranceSector]) => {
          return this.data.userDeleteInsuranceSector({insuranceSectorId: insuranceSector.id})
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

  readonly importExcelEffect = this.effect<UserUpdateInsuranceSectorInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.insuranceSectorService.importInsuranceSectors(data).pipe(
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

            this.addInsuranceSectors(created);
            this.updateInsuranceSectors(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
