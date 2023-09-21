
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CalculationBasisTypeService } from './calculation-basis-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCalculationBasisTypeInput, UserUpdateCalculationBasisTypeInput, WebCoreDataAccessService, CorePaging, CalculationBasisType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CalculationBasisTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: CalculationBasisType
  done: boolean,
  formName?: string

  calculationBasisTypes: CalculationBasisType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCalculationBasisTypeFeatureStore extends ComponentStore<CalculationBasisTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly calculationBasisTypeService: CalculationBasisTypeService
) {
    super({ 
      loading: false,
      calculationBasisTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('calculationBasisTypeId')) {
      var calculationBasisTypeId = this.route.snapshot.paramMap.get('calculationBasisTypeId')
      this.setFormName('calculationBasisType_edit')
    } else {
      this.setFormName('calculationBasisType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly calculationBasisTypes$ = this.select((s) => s.calculationBasisTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.calculationBasisTypes$,

    (errors, loading, item, formName, calculationBasisTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    calculationBasisTypes,

            
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







    

  readonly setItem = this.updater((state, item: CalculationBasisType) => ({...state, item}))

  addNewCalculationBasisType = this.updater((state, calculationBasisType: CalculationBasisType) => ({ ...state, calculationBasisTypes: [...state.calculationBasisTypes, calculationBasisType] }))

  updateCalculationBasisType = this.updater((state, calculationBasisType: CalculationBasisType) => {
    return {
      ...state,
      calculationBasisTypes: state.calculationBasisTypes.map((el) => {
        if (el.id === calculationBasisType.id) {
          return calculationBasisType
        } else {
          return el
        }
      }),
    }
  })

  addCalculationBasisTypes = this.updater((state, newCalculationBasisTypes: any[]) => ({...state, calculationBasisTypes: state.calculationBasisTypes.concat(newCalculationBasisTypes) }))
  updateCalculationBasisTypes = this.updater((state, updatedCalculationBasisTypes: any[]) => {
    return {
      ...state,
      calculationBasisTypes: state.calculationBasisTypes.map((calculationBasisType) => {
        const updated = updatedCalculationBasisTypes.find((el) => el.id === calculationBasisType.id);
        return updated ? updated : calculationBasisType;
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
        return this.calculationBasisTypeService.validateCalculationBasisTypeExcelData(excelData);
      })
    )
  }


  readonly loadCalculationBasisTypeEffect = this.effect<string>((calculationBasisTypeId$) =>
    calculationBasisTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((calculationBasisTypeId) =>
        this.data.userCalculationBasisType({ calculationBasisTypeId }).pipe(
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



  readonly loadCalculationBasisTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCalculationBasisTypes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                calculationBasisTypes: res.data.items,
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

  readonly createCalculationBasisTypeEffect = this.effect<UserCreateCalculationBasisTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.calculationBasisTypeService.createCalculationBasisType({...input }).pipe(
          tapResponse(
            (calculationBasisType: CalculationBasisType) => {
              this.addNewCalculationBasisType(calculationBasisType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: calculationBasisType, loading: false, done: true }), 300);
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

    readonly updateCalculationBasisTypeEffect = this.effect<UserUpdateCalculationBasisTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.calculationBasisTypeService.updateCalculationBasisType(input, input.id).pipe(
              tapResponse(
                (calculationBasisType) => {
                  this.updateCalculationBasisType(calculationBasisType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: calculationBasisType, loading: false, done: true }), 300);
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
  
    readonly deleteCalculationBasisTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, calculationBasisType]) => {
          return this.data.userDeleteCalculationBasisType({calculationBasisTypeId: calculationBasisType.id})
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

  readonly importExcelEffect = this.effect<UserUpdateCalculationBasisTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.calculationBasisTypeService.importCalculationBasisTypes(data).pipe(
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

            this.addCalculationBasisTypes(created);
            this.updateCalculationBasisTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
