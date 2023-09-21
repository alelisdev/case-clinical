
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AttorneyTypeService } from './attorney-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAttorneyTypeInput, UserUpdateAttorneyTypeInput, WebCoreDataAccessService, CorePaging, AttorneyType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AttorneyTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: AttorneyType
  done: boolean,
  formName?: string

  attorneyTypes: AttorneyType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAttorneyTypeFeatureStore extends ComponentStore<AttorneyTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly attorneyTypeService: AttorneyTypeService
) {
    super({ 
      loading: false,
      attorneyTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('attorneyTypeId')) {
      var attorneyTypeId = this.route.snapshot.paramMap.get('attorneyTypeId')
      this.setFormName('attorneyType_edit')
    } else {
      this.setFormName('attorneyType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly attorneyTypes$ = this.select((s) => s.attorneyTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.attorneyTypes$,

    (errors, loading, item, formName, attorneyTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    attorneyTypes,

            
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







    

  readonly setItem = this.updater((state, item: AttorneyType) => ({...state, item}))

  addNewAttorneyType = this.updater((state, attorneyType: AttorneyType) => ({ ...state, attorneyTypes: [...state.attorneyTypes, attorneyType] }))

  updateAttorneyType = this.updater((state, attorneyType: AttorneyType) => {
    return {
      ...state,
      attorneyTypes: state.attorneyTypes.map((el) => {
        if (el.id === attorneyType.id) {
          return attorneyType
        } else {
          return el
        }
      }),
    }
  })

  addAttorneyTypes = this.updater((state, newAttorneyTypes: any[]) => ({...state, attorneyTypes: state.attorneyTypes.concat(newAttorneyTypes) }))
  updateAttorneyTypes = this.updater((state, updatedAttorneyTypes: any[]) => {
    return {
      ...state,
      attorneyTypes: state.attorneyTypes.map((attorneyType) => {
        const updated = updatedAttorneyTypes.find((el) => el.id === attorneyType.id);
        return updated ? updated : attorneyType;
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
        return this.attorneyTypeService.validateAttorneyTypeExcelData(excelData);
      })
    )
  }


  readonly loadAttorneyTypeEffect = this.effect<string>((attorneyTypeId$) =>
    attorneyTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((attorneyTypeId) =>
        this.data.userAttorneyType({ attorneyTypeId }).pipe(
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



  readonly loadAttorneyTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAttorneyTypes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                attorneyTypes: res.data.items,
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

  readonly createAttorneyTypeEffect = this.effect<UserCreateAttorneyTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.attorneyTypeService.createAttorneyType({...input }).pipe(
          tapResponse(
            (attorneyType: AttorneyType) => {
              this.addNewAttorneyType(attorneyType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: attorneyType, loading: false, done: true }), 300);
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

    readonly updateAttorneyTypeEffect = this.effect<UserUpdateAttorneyTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.attorneyTypeService.updateAttorneyType(input, input.id).pipe(
              tapResponse(
                (attorneyType) => {
                  this.updateAttorneyType(attorneyType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: attorneyType, loading: false, done: true }), 300);
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
  
    readonly deleteAttorneyTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, attorneyType]) => {
          return this.data.userDeleteAttorneyType({attorneyTypeId: attorneyType.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAttorneyTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.attorneyTypeService.importAttorneyTypes(data).pipe(
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

            this.addAttorneyTypes(created);
            this.updateAttorneyTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
