
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ProcedureSiteService } from './procedure-site.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateProcedureSiteInput, UserUpdateProcedureSiteInput, WebCoreDataAccessService, CorePaging, ProcedureSite,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ProcedureSiteFeatureState {
  errors?: any
  loading?: boolean
  item?: ProcedureSite
  done: boolean,
  formName?: string

  procedureSites: ProcedureSite[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebProcedureSiteFeatureStore extends ComponentStore<ProcedureSiteFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureSiteService: ProcedureSiteService
) {
    super({ 
      loading: false,
      procedureSites: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('procedureSiteId')) {
      var procedureSiteId = this.route.snapshot.paramMap.get('procedureSiteId')
      this.setFormName('procedureSite_edit')
    } else {
      this.setFormName('procedureSite_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly procedureSites$ = this.select((s) => s.procedureSites)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.procedureSites$,

    (errors, loading, item, formName, procedureSites,  ) => ({
    errors,
    loading,
    item,
    formName,
    procedureSites,

            
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







    

  readonly setItem = this.updater((state, item: ProcedureSite) => ({...state, item}))

  addNewProcedureSite = this.updater((state, procedureSite: ProcedureSite) => ({ ...state, procedureSites: [...state.procedureSites, procedureSite] }))

  updateProcedureSite = this.updater((state, procedureSite: ProcedureSite) => {
    return {
      ...state,
      procedureSites: state.procedureSites.map((el) => {
        if (el.id === procedureSite.id) {
          return procedureSite
        } else {
          return el
        }
      }),
    }
  })

  addProcedureSites = this.updater((state, newProcedureSites: any[]) => ({...state, procedureSites: state.procedureSites.concat(newProcedureSites) }))
  updateProcedureSites = this.updater((state, updatedProcedureSites: any[]) => {
    return {
      ...state,
      procedureSites: state.procedureSites.map((procedureSite) => {
        const updated = updatedProcedureSites.find((el) => el.id === procedureSite.id);
        return updated ? updated : procedureSite;
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
        return this.procedureSiteService.validateProcedureSiteExcelData(excelData);
      })
    )
  }


  readonly loadProcedureSiteEffect = this.effect<string>((procedureSiteId$) =>
    procedureSiteId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((procedureSiteId) =>
        this.data.userProcedureSite({ procedureSiteId }).pipe(
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



  readonly loadProcedureSitesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userProcedureSites({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                procedureSites: res.data.items,
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

  readonly createProcedureSiteEffect = this.effect<UserCreateProcedureSiteInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.procedureSiteService.createProcedureSite({...input }).pipe(
          tapResponse(
            (procedureSite: ProcedureSite) => {
              this.addNewProcedureSite(procedureSite)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: procedureSite, loading: false, done: true }), 300);
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

    readonly updateProcedureSiteEffect = this.effect<UserUpdateProcedureSiteInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.procedureSiteService.updateProcedureSite(input, input.id).pipe(
              tapResponse(
                (procedureSite) => {
                  this.updateProcedureSite(procedureSite)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: procedureSite, loading: false, done: true }), 300);
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
  
    readonly deleteProcedureSiteEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, procedureSite]) => {
          return this.data.userDeleteProcedureSite({procedureSiteId: procedureSite.id})
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

  readonly importExcelEffect = this.effect<UserUpdateProcedureSiteInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.procedureSiteService.importProcedureSites(data).pipe(
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

            this.addProcedureSites(created);
            this.updateProcedureSites(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
