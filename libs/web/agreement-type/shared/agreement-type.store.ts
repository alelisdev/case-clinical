
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AgreementTypeService } from './agreement-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAgreementTypeInput, UserUpdateAgreementTypeInput, WebCoreDataAccessService, CorePaging, AgreementType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AgreementTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: AgreementType
  done: boolean,
  formName?: string

  agreementTypes: AgreementType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAgreementTypeFeatureStore extends ComponentStore<AgreementTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly agreementTypeService: AgreementTypeService
) {
    super({ 
      loading: false,
      agreementTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('agreementTypeId')) {
      var agreementTypeId = this.route.snapshot.paramMap.get('agreementTypeId')
      this.setFormName('agreementType_edit')
    } else {
      this.setFormName('agreementType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly agreementTypes$ = this.select((s) => s.agreementTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.agreementTypes$,

    (errors, loading, item, formName, agreementTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    agreementTypes,

            
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







    

  readonly setItem = this.updater((state, item: AgreementType) => ({...state, item}))

  addNewAgreementType = this.updater((state, agreementType: AgreementType) => ({ ...state, agreementTypes: [...state.agreementTypes, agreementType] }))

  updateAgreementType = this.updater((state, agreementType: AgreementType) => {
    return {
      ...state,
      agreementTypes: state.agreementTypes.map((el) => {
        if (el.id === agreementType.id) {
          return agreementType
        } else {
          return el
        }
      }),
    }
  })

  addAgreementTypes = this.updater((state, newAgreementTypes: any[]) => ({...state, agreementTypes: state.agreementTypes.concat(newAgreementTypes) }))
  updateAgreementTypes = this.updater((state, updatedAgreementTypes: any[]) => {
    return {
      ...state,
      agreementTypes: state.agreementTypes.map((agreementType) => {
        const updated = updatedAgreementTypes.find((el) => el.id === agreementType.id);
        return updated ? updated : agreementType;
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
        return this.agreementTypeService.validateAgreementTypeExcelData(excelData);
      })
    )
  }


  readonly loadAgreementTypeEffect = this.effect<string>((agreementTypeId$) =>
    agreementTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((agreementTypeId) =>
        this.data.userAgreementType({ agreementTypeId }).pipe(
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



  readonly loadAgreementTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAgreementTypes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                agreementTypes: res.data.items,
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

  readonly createAgreementTypeEffect = this.effect<UserCreateAgreementTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.agreementTypeService.createAgreementType({...input }).pipe(
          tapResponse(
            (agreementType: AgreementType) => {
              this.addNewAgreementType(agreementType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: agreementType, loading: false, done: true }), 300);
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

    readonly updateAgreementTypeEffect = this.effect<UserUpdateAgreementTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.agreementTypeService.updateAgreementType(input, input.id).pipe(
              tapResponse(
                (agreementType) => {
                  this.updateAgreementType(agreementType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: agreementType, loading: false, done: true }), 300);
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
  
    readonly deleteAgreementTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, agreementType]) => {
          return this.data.userDeleteAgreementType({agreementTypeId: agreementType.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAgreementTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.agreementTypeService.importAgreementTypes(data).pipe(
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

            this.addAgreementTypes(created);
            this.updateAgreementTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
