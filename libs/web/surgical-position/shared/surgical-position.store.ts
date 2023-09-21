
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { SurgicalPositionService } from './surgical-position.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateSurgicalPositionInput, UserUpdateSurgicalPositionInput, WebCoreDataAccessService, CorePaging, SurgicalPosition,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface SurgicalPositionFeatureState {
  errors?: any
  loading?: boolean
  item?: SurgicalPosition
  done: boolean,
  formName?: string

  surgicalPositions: SurgicalPosition[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebSurgicalPositionFeatureStore extends ComponentStore<SurgicalPositionFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly surgicalPositionService: SurgicalPositionService
) {
    super({ 
      loading: false,
      surgicalPositions: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('surgicalPositionId')) {
      var surgicalPositionId = this.route.snapshot.paramMap.get('surgicalPositionId')
      this.setFormName('surgicalPosition_edit')
    } else {
      this.setFormName('surgicalPosition_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly surgicalPositions$ = this.select((s) => s.surgicalPositions)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.surgicalPositions$,

    (errors, loading, item, formName, surgicalPositions,  ) => ({
    errors,
    loading,
    item,
    formName,
    surgicalPositions,

            
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







    

  readonly setItem = this.updater((state, item: SurgicalPosition) => ({...state, item}))

  addNewSurgicalPosition = this.updater((state, surgicalPosition: SurgicalPosition) => ({ ...state, surgicalPositions: [...state.surgicalPositions, surgicalPosition] }))

  updateSurgicalPosition = this.updater((state, surgicalPosition: SurgicalPosition) => {
    return {
      ...state,
      surgicalPositions: state.surgicalPositions.map((el) => {
        if (el.id === surgicalPosition.id) {
          return surgicalPosition
        } else {
          return el
        }
      }),
    }
  })

  addSurgicalPositions = this.updater((state, newSurgicalPositions: any[]) => ({...state, surgicalPositions: state.surgicalPositions.concat(newSurgicalPositions) }))
  updateSurgicalPositions = this.updater((state, updatedSurgicalPositions: any[]) => {
    return {
      ...state,
      surgicalPositions: state.surgicalPositions.map((surgicalPosition) => {
        const updated = updatedSurgicalPositions.find((el) => el.id === surgicalPosition.id);
        return updated ? updated : surgicalPosition;
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
        return this.surgicalPositionService.validateSurgicalPositionExcelData(excelData);
      })
    )
  }


  readonly loadSurgicalPositionEffect = this.effect<string>((surgicalPositionId$) =>
    surgicalPositionId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((surgicalPositionId) =>
        this.data.userSurgicalPosition({ surgicalPositionId }).pipe(
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



  readonly loadSurgicalPositionsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userSurgicalPositions({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                surgicalPositions: res.data.items,
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

  readonly createSurgicalPositionEffect = this.effect<UserCreateSurgicalPositionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.surgicalPositionService.createSurgicalPosition({...input }).pipe(
          tapResponse(
            (surgicalPosition: SurgicalPosition) => {
              this.addNewSurgicalPosition(surgicalPosition)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: surgicalPosition, loading: false, done: true }), 300);
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

    readonly updateSurgicalPositionEffect = this.effect<UserUpdateSurgicalPositionInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.surgicalPositionService.updateSurgicalPosition(input, input.id).pipe(
              tapResponse(
                (surgicalPosition) => {
                  this.updateSurgicalPosition(surgicalPosition)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: surgicalPosition, loading: false, done: true }), 300);
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
  
    readonly deleteSurgicalPositionEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, surgicalPosition]) => {
          return this.data.userDeleteSurgicalPosition({surgicalPositionId: surgicalPosition.id})
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

  readonly importExcelEffect = this.effect<UserUpdateSurgicalPositionInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.surgicalPositionService.importSurgicalPositions(data).pipe(
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

            this.addSurgicalPositions(created);
            this.updateSurgicalPositions(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
