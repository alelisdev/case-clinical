
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { MedLevelService } from './med-level.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateMedLevelInput, UserUpdateMedLevelInput, WebCoreDataAccessService, CorePaging, MedLevel,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface MedLevelFeatureState {
  errors?: any
  loading?: boolean
  item?: MedLevel
  done: boolean,
  formName?: string

  medLevels: MedLevel[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebMedLevelFeatureStore extends ComponentStore<MedLevelFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly medLevelService: MedLevelService
) {
    super({ 
      loading: false,
      medLevels: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('medLevelId')) {
      var medLevelId = this.route.snapshot.paramMap.get('medLevelId')
      this.setFormName('medLevel_edit')
    } else {
      this.setFormName('medLevel_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly medLevels$ = this.select((s) => s.medLevels)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.medLevels$,

    (errors, loading, item, formName, medLevels,  ) => ({
    errors,
    loading,
    item,
    formName,
    medLevels,

            
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







    

  readonly setItem = this.updater((state, item: MedLevel) => ({...state, item}))

  addNewMedLevel = this.updater((state, medLevel: MedLevel) => ({ ...state, medLevels: [...state.medLevels, medLevel] }))

  updateMedLevel = this.updater((state, medLevel: MedLevel) => {
    return {
      ...state,
      medLevels: state.medLevels.map((el) => {
        if (el.id === medLevel.id) {
          return medLevel
        } else {
          return el
        }
      }),
    }
  })

  addMedLevels = this.updater((state, newMedLevels: any[]) => ({...state, medLevels: state.medLevels.concat(newMedLevels) }))
  updateMedLevels = this.updater((state, updatedMedLevels: any[]) => {
    return {
      ...state,
      medLevels: state.medLevels.map((medLevel) => {
        const updated = updatedMedLevels.find((el) => el.id === medLevel.id);
        return updated ? updated : medLevel;
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
        return this.medLevelService.validateMedLevelExcelData(excelData);
      })
    )
  }


  readonly loadMedLevelEffect = this.effect<string>((medLevelId$) =>
    medLevelId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((medLevelId) =>
        this.data.userMedLevel({ medLevelId }).pipe(
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



  readonly loadMedLevelsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userMedLevels({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                medLevels: res.data.items,
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

  readonly createMedLevelEffect = this.effect<UserCreateMedLevelInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.medLevelService.createMedLevel({...input }).pipe(
          tapResponse(
            (medLevel: MedLevel) => {
              this.addNewMedLevel(medLevel)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: medLevel, loading: false, done: true }), 300);
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

    readonly updateMedLevelEffect = this.effect<UserUpdateMedLevelInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.medLevelService.updateMedLevel(input, input.id).pipe(
              tapResponse(
                (medLevel) => {
                  this.updateMedLevel(medLevel)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: medLevel, loading: false, done: true }), 300);
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
  
    readonly deleteMedLevelEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, medLevel]) => {
          return this.data.userDeleteMedLevel({medLevelId: medLevel.id})
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

  readonly importExcelEffect = this.effect<UserUpdateMedLevelInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.medLevelService.importMedLevels(data).pipe(
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

            this.addMedLevels(created);
            this.updateMedLevels(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
