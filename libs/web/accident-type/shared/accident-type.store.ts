
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AccidentTypeService } from './accident-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAccidentTypeInput, UserUpdateAccidentTypeInput, WebCoreDataAccessService, CorePaging, AccidentType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AccidentTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: AccidentType
  done: boolean,
  formName?: string

  accidentTypes: AccidentType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAccidentTypeFeatureStore extends ComponentStore<AccidentTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly accidentTypeService: AccidentTypeService
) {
    super({ 
      loading: false,
      accidentTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('accidentTypeId')) {
      var accidentTypeId = this.route.snapshot.paramMap.get('accidentTypeId')
      this.setFormName('accidentType_edit')
    } else {
      this.setFormName('accidentType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly accidentTypes$ = this.select((s) => s.accidentTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.accidentTypes$,

    (errors, loading, item, formName, accidentTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    accidentTypes,

            
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







    

  readonly setItem = this.updater((state, item: AccidentType) => ({...state, item}))

  addNewAccidentType = this.updater((state, accidentType: AccidentType) => ({ ...state, accidentTypes: [...state.accidentTypes, accidentType] }))

  updateAccidentType = this.updater((state, accidentType: AccidentType) => {
    return {
      ...state,
      accidentTypes: state.accidentTypes.map((el) => {
        if (el.id === accidentType.id) {
          return accidentType
        } else {
          return el
        }
      }),
    }
  })

  addAccidentTypes = this.updater((state, newAccidentTypes: any[]) => ({...state, accidentTypes: state.accidentTypes.concat(newAccidentTypes) }))
  updateAccidentTypes = this.updater((state, updatedAccidentTypes: any[]) => {
    return {
      ...state,
      accidentTypes: state.accidentTypes.map((accidentType) => {
        const updated = updatedAccidentTypes.find((el) => el.id === accidentType.id);
        return updated ? updated : accidentType;
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
        return this.accidentTypeService.validateAccidentTypeExcelData(excelData);
      })
    )
  }


  readonly loadAccidentTypeEffect = this.effect<string>((accidentTypeId$) =>
    accidentTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((accidentTypeId) =>
        this.data.userAccidentType({ accidentTypeId }).pipe(
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



  readonly loadAccidentTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAccidentTypes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                accidentTypes: res.data.items,
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

  readonly createAccidentTypeEffect = this.effect<UserCreateAccidentTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.accidentTypeService.createAccidentType({...input }).pipe(
          tapResponse(
            (accidentType: AccidentType) => {
              this.addNewAccidentType(accidentType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: accidentType, loading: false, done: true }), 300);
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

    readonly updateAccidentTypeEffect = this.effect<UserUpdateAccidentTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.accidentTypeService.updateAccidentType(input, input.id).pipe(
              tapResponse(
                (accidentType) => {
                  this.updateAccidentType(accidentType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: accidentType, loading: false, done: true }), 300);
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
  
    readonly deleteAccidentTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, accidentType]) => {
          return this.data.userDeleteAccidentType({accidentTypeId: accidentType.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAccidentTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.accidentTypeService.importAccidentTypes(data).pipe(
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

            this.addAccidentTypes(created);
            this.updateAccidentTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
