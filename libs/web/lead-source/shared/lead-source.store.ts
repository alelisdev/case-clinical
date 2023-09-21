
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { LeadSourceService } from './lead-source.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateLeadSourceInput, UserUpdateLeadSourceInput, WebCoreDataAccessService, CorePaging, LeadSource,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface LeadSourceFeatureState {
  errors?: any
  loading?: boolean
  item?: LeadSource
  done: boolean,
  formName?: string

  leadSources: LeadSource[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebLeadSourceFeatureStore extends ComponentStore<LeadSourceFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly leadSourceService: LeadSourceService
) {
    super({ 
      loading: false,
      leadSources: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('leadSourceId')) {
      var leadSourceId = this.route.snapshot.paramMap.get('leadSourceId')
      this.setFormName('leadSource_edit')
    } else {
      this.setFormName('leadSource_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly leadSources$ = this.select((s) => s.leadSources)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.leadSources$,

    (errors, loading, item, formName, leadSources,  ) => ({
    errors,
    loading,
    item,
    formName,
    leadSources,

            
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







    

  readonly setItem = this.updater((state, item: LeadSource) => ({...state, item}))

  addNewLeadSource = this.updater((state, leadSource: LeadSource) => ({ ...state, leadSources: [...state.leadSources, leadSource] }))

  updateLeadSource = this.updater((state, leadSource: LeadSource) => {
    return {
      ...state,
      leadSources: state.leadSources.map((el) => {
        if (el.id === leadSource.id) {
          return leadSource
        } else {
          return el
        }
      }),
    }
  })

  addLeadSources = this.updater((state, newLeadSources: any[]) => ({...state, leadSources: state.leadSources.concat(newLeadSources) }))
  updateLeadSources = this.updater((state, updatedLeadSources: any[]) => {
    return {
      ...state,
      leadSources: state.leadSources.map((leadSource) => {
        const updated = updatedLeadSources.find((el) => el.id === leadSource.id);
        return updated ? updated : leadSource;
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
        return this.leadSourceService.validateLeadSourceExcelData(excelData);
      })
    )
  }


  readonly loadLeadSourceEffect = this.effect<string>((leadSourceId$) =>
    leadSourceId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((leadSourceId) =>
        this.data.userLeadSource({ leadSourceId }).pipe(
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



  readonly loadLeadSourcesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userLeadSources({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                leadSources: res.data.items,
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

  readonly createLeadSourceEffect = this.effect<UserCreateLeadSourceInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.leadSourceService.createLeadSource({...input }).pipe(
          tapResponse(
            (leadSource: LeadSource) => {
              this.addNewLeadSource(leadSource)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: leadSource, loading: false, done: true }), 300);
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

    readonly updateLeadSourceEffect = this.effect<UserUpdateLeadSourceInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.leadSourceService.updateLeadSource(input, input.id).pipe(
              tapResponse(
                (leadSource) => {
                  this.updateLeadSource(leadSource)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: leadSource, loading: false, done: true }), 300);
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
  
    readonly deleteLeadSourceEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, leadSource]) => {
          return this.data.userDeleteLeadSource({leadSourceId: leadSource.id})
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

  readonly importExcelEffect = this.effect<UserUpdateLeadSourceInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.leadSourceService.importLeadSources(data).pipe(
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

            this.addLeadSources(created);
            this.updateLeadSources(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
