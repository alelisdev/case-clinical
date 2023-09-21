
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { InsuranceTypeService } from './insurance-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateInsuranceTypeInput, UserUpdateInsuranceTypeInput, WebCoreDataAccessService, CorePaging, InsuranceType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface InsuranceTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: InsuranceType
  done: boolean,
  formName?: string

  insuranceTypes: InsuranceType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebInsuranceTypeFeatureStore extends ComponentStore<InsuranceTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly insuranceTypeService: InsuranceTypeService
) {
    super({ 
      loading: false,
      insuranceTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('insuranceTypeId')) {
      var insuranceTypeId = this.route.snapshot.paramMap.get('insuranceTypeId')
      this.setFormName('insuranceType_edit')
    } else {
      this.setFormName('insuranceType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly insuranceTypes$ = this.select((s) => s.insuranceTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.insuranceTypes$,

    (errors, loading, item, formName, insuranceTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    insuranceTypes,

            
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







    

  readonly setItem = this.updater((state, item: InsuranceType) => ({...state, item}))

  addNewInsuranceType = this.updater((state, insuranceType: InsuranceType) => ({ ...state, insuranceTypes: [...state.insuranceTypes, insuranceType] }))

  updateInsuranceType = this.updater((state, insuranceType: InsuranceType) => {
    return {
      ...state,
      insuranceTypes: state.insuranceTypes.map((el) => {
        if (el.id === insuranceType.id) {
          return insuranceType
        } else {
          return el
        }
      }),
    }
  })

  addInsuranceTypes = this.updater((state, newInsuranceTypes: any[]) => ({...state, insuranceTypes: state.insuranceTypes.concat(newInsuranceTypes) }))
  updateInsuranceTypes = this.updater((state, updatedInsuranceTypes: any[]) => {
    return {
      ...state,
      insuranceTypes: state.insuranceTypes.map((insuranceType) => {
        const updated = updatedInsuranceTypes.find((el) => el.id === insuranceType.id);
        return updated ? updated : insuranceType;
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
        return this.insuranceTypeService.validateInsuranceTypeExcelData(excelData);
      })
    )
  }


  readonly loadInsuranceTypeEffect = this.effect<string>((insuranceTypeId$) =>
    insuranceTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((insuranceTypeId) =>
        this.data.userInsuranceType({ insuranceTypeId }).pipe(
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



  readonly loadInsuranceTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userInsuranceTypes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                insuranceTypes: res.data.items,
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

  readonly createInsuranceTypeEffect = this.effect<UserCreateInsuranceTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.insuranceTypeService.createInsuranceType({...input }).pipe(
          tapResponse(
            (insuranceType: InsuranceType) => {
              this.addNewInsuranceType(insuranceType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: insuranceType, loading: false, done: true }), 300);
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

    readonly updateInsuranceTypeEffect = this.effect<UserUpdateInsuranceTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.insuranceTypeService.updateInsuranceType(input, input.id).pipe(
              tapResponse(
                (insuranceType) => {
                  this.updateInsuranceType(insuranceType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: insuranceType, loading: false, done: true }), 300);
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
  
    readonly deleteInsuranceTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, insuranceType]) => {
          return this.data.userDeleteInsuranceType({insuranceTypeId: insuranceType.id})
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

  readonly importExcelEffect = this.effect<UserUpdateInsuranceTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.insuranceTypeService.importInsuranceTypes(data).pipe(
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

            this.addInsuranceTypes(created);
            this.updateInsuranceTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
