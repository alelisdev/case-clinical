
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { RequiredFieldService } from './required-field.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateRequiredFieldInput, UserUpdateRequiredFieldInput, WebCoreDataAccessService, CorePaging, RequiredField, AccidentType,MedLevel } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface RequiredFieldFeatureState {
  errors?: any
  loading?: boolean
  item?: RequiredField
  done: boolean,
  formName?: string
accidentTypeId?: string,medLevelId?: string,
  requiredFields: RequiredField[]
 accidentTypes?: AccidentType[],
 medLevels?: MedLevel[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebRequiredFieldFeatureStore extends ComponentStore<RequiredFieldFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly requiredFieldService: RequiredFieldService
) {
    super({ 
      loading: false,
      requiredFields: [],
      done: false,
      searchQuery: '',
      formName: undefined,
accidentTypeId: undefined,
medLevelId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('requiredFieldId')) {
      var requiredFieldId = this.route.snapshot.paramMap.get('requiredFieldId')
      this.setFormName('requiredField_edit')
    } else {
      this.setFormName('requiredField_create')
    }


    if(this.route.snapshot.paramMap.has("accidentTypeId")) {
      var accidentTypeId = this.route.snapshot.paramMap.get("accidentTypeId")
      this.setAccidentTypeId(accidentTypeId)
    }


    if(this.route.snapshot.paramMap.has("medLevelId")) {
      var medLevelId = this.route.snapshot.paramMap.get("medLevelId")
      this.setMedLevelId(medLevelId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly requiredFields$ = this.select((s) => s.requiredFields)
  readonly accidentTypes$ = this.select((s) => s.accidentTypes || [])
  readonly medLevels$ = this.select((s) => s.medLevels || [])

readonly accidentTypeId$ = this.select((s) => s.accidentTypeId)

readonly medLevelId$ = this.select((s) => s.medLevelId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.requiredFields$,
this.accidentTypes$,this.medLevels$,
    (errors, loading, item, formName, requiredFields, accidentTypes,medLevels ) => ({
    errors,
    loading,
    item,
    formName,
    requiredFields,

            accidentTypes,medLevels
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.accidentTypeId$,
this.medLevelId$, this.searchQuery$, (paging, accidentTypeId,
medLevelId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    accidentTypeId: accidentTypeId,medLevelId: medLevelId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setAccidentTypeId = this.updater((state, accidentTypeId: string) => ({
                ...state,
    accidentTypeId,
  }))


            readonly setMedLevelId = this.updater((state, medLevelId: string) => ({
                ...state,
    medLevelId,
  }))



  readonly filterAccidentTypes = (term) => 
        this.data.userSelectAccidentTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let accidentTypes = res.data.items;
              this.patchState({accidentTypes})
              return accidentTypes
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )


  readonly filterMedLevels = (term) => 
        this.data.userSelectMedLevels({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let medLevels = res.data.items;
              this.patchState({medLevels})
              return medLevels
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addAccidentType = this.updater((state, accidentType: AccidentType) => ({
    ...state, accidentTypes: state.accidentTypes.concat(accidentType)
  }))


  readonly addMedLevel = this.updater((state, medLevel: MedLevel) => ({
    ...state, medLevels: state.medLevels.concat(medLevel)
  }))

    

  readonly setItem = this.updater((state, item: RequiredField) => ({...state, item}))

  addNewRequiredField = this.updater((state, requiredField: RequiredField) => ({ ...state, requiredFields: [...state.requiredFields, requiredField] }))

  updateRequiredField = this.updater((state, requiredField: RequiredField) => {
    return {
      ...state,
      requiredFields: state.requiredFields.map((el) => {
        if (el.id === requiredField.id) {
          return requiredField
        } else {
          return el
        }
      }),
    }
  })

  addRequiredFields = this.updater((state, newRequiredFields: any[]) => ({...state, requiredFields: state.requiredFields.concat(newRequiredFields) }))
  updateRequiredFields = this.updater((state, updatedRequiredFields: any[]) => {
    return {
      ...state,
      requiredFields: state.requiredFields.map((requiredField) => {
        const updated = updatedRequiredFields.find((el) => el.id === requiredField.id);
        return updated ? updated : requiredField;
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
        return this.requiredFieldService.validateRequiredFieldExcelData(excelData, vm.accidentTypes,vm.medLevels);
      })
    )
  }


  readonly loadRequiredFieldEffect = this.effect<string>((requiredFieldId$) =>
    requiredFieldId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((requiredFieldId) =>
        this.data.userRequiredField({ requiredFieldId }).pipe(
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



  readonly loadRequiredFieldsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userRequiredFields({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                requiredFields: res.data.items,
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

  readonly createRequiredFieldEffect = this.effect<UserCreateRequiredFieldInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.requiredFieldService.createRequiredField({...input }).pipe(
          tapResponse(
            (requiredField: RequiredField) => {
              this.addNewRequiredField(requiredField)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: requiredField, loading: false, done: true }), 300);
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

    readonly updateRequiredFieldEffect = this.effect<UserUpdateRequiredFieldInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.requiredFieldService.updateRequiredField(input, input.id).pipe(
              tapResponse(
                (requiredField) => {
                  this.updateRequiredField(requiredField)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: requiredField, loading: false, done: true }), 300);
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
  
    readonly deleteRequiredFieldEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, requiredField]) => {
          return this.data.userDeleteRequiredField({requiredFieldId: requiredField.id})
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

  readonly importExcelEffect = this.effect<UserUpdateRequiredFieldInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.requiredFieldService.importRequiredFields(data).pipe(
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

            this.addRequiredFields(created);
            this.updateRequiredFields(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
