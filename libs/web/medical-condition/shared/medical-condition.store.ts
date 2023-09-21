
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { MedicalConditionService } from './medical-condition.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateMedicalConditionInput, UserUpdateMedicalConditionInput, WebCoreDataAccessService, CorePaging, MedicalCondition,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface MedicalConditionFeatureState {
  errors?: any
  loading?: boolean
  item?: MedicalCondition
  done: boolean,
  formName?: string

  medicalConditions: MedicalCondition[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebMedicalConditionFeatureStore extends ComponentStore<MedicalConditionFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly medicalConditionService: MedicalConditionService
) {
    super({ 
      loading: false,
      medicalConditions: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('medicalConditionId')) {
      var medicalConditionId = this.route.snapshot.paramMap.get('medicalConditionId')
      this.setFormName('medicalCondition_edit')
    } else {
      this.setFormName('medicalCondition_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly medicalConditions$ = this.select((s) => s.medicalConditions)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.medicalConditions$,

    (errors, loading, item, formName, medicalConditions,  ) => ({
    errors,
    loading,
    item,
    formName,
    medicalConditions,

            
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







    

  readonly setItem = this.updater((state, item: MedicalCondition) => ({...state, item}))

  addNewMedicalCondition = this.updater((state, medicalCondition: MedicalCondition) => ({ ...state, medicalConditions: [...state.medicalConditions, medicalCondition] }))

  updateMedicalCondition = this.updater((state, medicalCondition: MedicalCondition) => {
    return {
      ...state,
      medicalConditions: state.medicalConditions.map((el) => {
        if (el.id === medicalCondition.id) {
          return medicalCondition
        } else {
          return el
        }
      }),
    }
  })

  addMedicalConditions = this.updater((state, newMedicalConditions: any[]) => ({...state, medicalConditions: state.medicalConditions.concat(newMedicalConditions) }))
  updateMedicalConditions = this.updater((state, updatedMedicalConditions: any[]) => {
    return {
      ...state,
      medicalConditions: state.medicalConditions.map((medicalCondition) => {
        const updated = updatedMedicalConditions.find((el) => el.id === medicalCondition.id);
        return updated ? updated : medicalCondition;
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
        return this.medicalConditionService.validateMedicalConditionExcelData(excelData);
      })
    )
  }


  readonly loadMedicalConditionEffect = this.effect<string>((medicalConditionId$) =>
    medicalConditionId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((medicalConditionId) =>
        this.data.userMedicalCondition({ medicalConditionId }).pipe(
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



  readonly loadMedicalConditionsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userMedicalConditions({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                medicalConditions: res.data.items,
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

  readonly createMedicalConditionEffect = this.effect<UserCreateMedicalConditionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.medicalConditionService.createMedicalCondition({...input }).pipe(
          tapResponse(
            (medicalCondition: MedicalCondition) => {
              this.addNewMedicalCondition(medicalCondition)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: medicalCondition, loading: false, done: true }), 300);
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

    readonly updateMedicalConditionEffect = this.effect<UserUpdateMedicalConditionInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.medicalConditionService.updateMedicalCondition(input, input.id).pipe(
              tapResponse(
                (medicalCondition) => {
                  this.updateMedicalCondition(medicalCondition)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: medicalCondition, loading: false, done: true }), 300);
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
  
    readonly deleteMedicalConditionEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, medicalCondition]) => {
          return this.data.userDeleteMedicalCondition({medicalConditionId: medicalCondition.id})
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

  readonly importExcelEffect = this.effect<UserUpdateMedicalConditionInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.medicalConditionService.importMedicalConditions(data).pipe(
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

            this.addMedicalConditions(created);
            this.updateMedicalConditions(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
