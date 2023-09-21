
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { VisitKindService } from './visit-kind.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateVisitKindInput, UserUpdateVisitKindInput, WebCoreDataAccessService, CorePaging, VisitKind,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface VisitKindFeatureState {
  errors?: any
  loading?: boolean
  item?: VisitKind
  done: boolean,
  formName?: string

  visitKinds: VisitKind[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebVisitKindFeatureStore extends ComponentStore<VisitKindFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly visitKindService: VisitKindService
) {
    super({ 
      loading: false,
      visitKinds: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('visitKindId')) {
      var visitKindId = this.route.snapshot.paramMap.get('visitKindId')
      this.setFormName('visitKind_edit')
    } else {
      this.setFormName('visitKind_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly visitKinds$ = this.select((s) => s.visitKinds)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.visitKinds$,

    (errors, loading, item, formName, visitKinds,  ) => ({
    errors,
    loading,
    item,
    formName,
    visitKinds,

            
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







    

  readonly setItem = this.updater((state, item: VisitKind) => ({...state, item}))

  addNewVisitKind = this.updater((state, visitKind: VisitKind) => ({ ...state, visitKinds: [...state.visitKinds, visitKind] }))

  updateVisitKind = this.updater((state, visitKind: VisitKind) => {
    return {
      ...state,
      visitKinds: state.visitKinds.map((el) => {
        if (el.id === visitKind.id) {
          return visitKind
        } else {
          return el
        }
      }),
    }
  })

  addVisitKinds = this.updater((state, newVisitKinds: any[]) => ({...state, visitKinds: state.visitKinds.concat(newVisitKinds) }))
  updateVisitKinds = this.updater((state, updatedVisitKinds: any[]) => {
    return {
      ...state,
      visitKinds: state.visitKinds.map((visitKind) => {
        const updated = updatedVisitKinds.find((el) => el.id === visitKind.id);
        return updated ? updated : visitKind;
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
        return this.visitKindService.validateVisitKindExcelData(excelData);
      })
    )
  }


  readonly loadVisitKindEffect = this.effect<string>((visitKindId$) =>
    visitKindId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((visitKindId) =>
        this.data.userVisitKind({ visitKindId }).pipe(
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



  readonly loadVisitKindsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userVisitKinds({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                visitKinds: res.data.items,
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

  readonly createVisitKindEffect = this.effect<UserCreateVisitKindInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.visitKindService.createVisitKind({...input }).pipe(
          tapResponse(
            (visitKind: VisitKind) => {
              this.addNewVisitKind(visitKind)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: visitKind, loading: false, done: true }), 300);
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

    readonly updateVisitKindEffect = this.effect<UserUpdateVisitKindInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.visitKindService.updateVisitKind(input, input.id).pipe(
              tapResponse(
                (visitKind) => {
                  this.updateVisitKind(visitKind)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: visitKind, loading: false, done: true }), 300);
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
  
    readonly deleteVisitKindEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, visitKind]) => {
          return this.data.userDeleteVisitKind({visitKindId: visitKind.id})
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

  readonly importExcelEffect = this.effect<UserUpdateVisitKindInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.visitKindService.importVisitKinds(data).pipe(
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

            this.addVisitKinds(created);
            this.updateVisitKinds(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
