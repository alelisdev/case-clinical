
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ProcedureTypeService } from './procedure-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateProcedureTypeInput, UserUpdateProcedureTypeInput, WebCoreDataAccessService, CorePaging, ProcedureType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ProcedureTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: ProcedureType
  done: boolean,
  formName?: string

  procedureTypes: ProcedureType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebProcedureTypeFeatureStore extends ComponentStore<ProcedureTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureTypeService: ProcedureTypeService
) {
    super({ 
      loading: false,
      procedureTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('procedureTypeId')) {
      var procedureTypeId = this.route.snapshot.paramMap.get('procedureTypeId')
      this.setFormName('procedureType_edit')
    } else {
      this.setFormName('procedureType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly procedureTypes$ = this.select((s) => s.procedureTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureTypes$,

    (errors, loading, item, formName, procedureTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    procedureTypes,

            
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







    

  readonly setItem = this.updater((state, item: ProcedureType) => ({...state, item}))

  addNewProcedureType = this.updater((state, procedureType: ProcedureType) => ({ ...state, procedureTypes: [...state.procedureTypes, procedureType] }))

  updateProcedureType = this.updater((state, procedureType: ProcedureType) => {
    return {
      ...state,
      procedureTypes: state.procedureTypes.map((el) => {
        if (el.id === procedureType.id) {
          return procedureType
        } else {
          return el
        }
      }),
    }
  })

  addProcedureTypes = this.updater((state, newProcedureTypes: any[]) => ({...state, procedureTypes: state.procedureTypes.concat(newProcedureTypes) }))
  updateProcedureTypes = this.updater((state, updatedProcedureTypes: any[]) => {
    return {
      ...state,
      procedureTypes: state.procedureTypes.map((procedureType) => {
        const updated = updatedProcedureTypes.find((el) => el.id === procedureType.id);
        return updated ? updated : procedureType;
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
        return this.procedureTypeService.validateProcedureTypeExcelData(excelData);
      })
    )
  }


  readonly loadProcedureTypeEffect = this.effect<string>((procedureTypeId$) =>
    procedureTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((procedureTypeId) =>
        this.data.userProcedureType({ procedureTypeId }).pipe(
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



  readonly loadProcedureTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userProcedureTypes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                procedureTypes: res.data.items,
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

  readonly createProcedureTypeEffect = this.effect<UserCreateProcedureTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.procedureTypeService.createProcedureType({...input }).pipe(
          tapResponse(
            (procedureType: ProcedureType) => {
              this.addNewProcedureType(procedureType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: procedureType, loading: false, done: true }), 300);
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

    readonly updateProcedureTypeEffect = this.effect<UserUpdateProcedureTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.procedureTypeService.updateProcedureType(input, input.id).pipe(
              tapResponse(
                (procedureType) => {
                  this.updateProcedureType(procedureType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: procedureType, loading: false, done: true }), 300);
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
  
    readonly deleteProcedureTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, procedureType]) => {
          return this.data.userDeleteProcedureType({procedureTypeId: procedureType.id})
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

  readonly importExcelEffect = this.effect<UserUpdateProcedureTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.procedureTypeService.importProcedureTypes(data).pipe(
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

            this.addProcedureTypes(created);
            this.updateProcedureTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
