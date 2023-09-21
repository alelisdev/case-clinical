
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { LeadStatusService } from './lead-status.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateLeadStatusInput, UserUpdateLeadStatusInput, WebCoreDataAccessService, CorePaging, LeadStatus,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface LeadStatusFeatureState {
  errors?: any
  loading?: boolean
  item?: LeadStatus
  done: boolean,
  formName?: string

  leadStatuses: LeadStatus[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebLeadStatusFeatureStore extends ComponentStore<LeadStatusFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly leadStatusService: LeadStatusService
) {
    super({ 
      loading: false,
      leadStatuses: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('leadStatusId')) {
      var leadStatusId = this.route.snapshot.paramMap.get('leadStatusId')
      this.setFormName('leadStatus_edit')
    } else {
      this.setFormName('leadStatus_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly leadStatuses$ = this.select((s) => s.leadStatuses)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.leadStatuses$,

    (errors, loading, item, formName, leadStatuses,  ) => ({
    errors,
    loading,
    item,
    formName,
    leadStatuses,

            
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







    

  readonly setItem = this.updater((state, item: LeadStatus) => ({...state, item}))

  addNewLeadStatus = this.updater((state, leadStatus: LeadStatus) => ({ ...state, leadStatuses: [...state.leadStatuses, leadStatus] }))

  updateLeadStatus = this.updater((state, leadStatus: LeadStatus) => {
    return {
      ...state,
      leadStatuses: state.leadStatuses.map((el) => {
        if (el.id === leadStatus.id) {
          return leadStatus
        } else {
          return el
        }
      }),
    }
  })

  addLeadStatuses = this.updater((state, newLeadStatuses: any[]) => ({...state, leadStatuses: state.leadStatuses.concat(newLeadStatuses) }))
  updateLeadStatuses = this.updater((state, updatedLeadStatuses: any[]) => {
    return {
      ...state,
      leadStatuses: state.leadStatuses.map((leadStatus) => {
        const updated = updatedLeadStatuses.find((el) => el.id === leadStatus.id);
        return updated ? updated : leadStatus;
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
        return this.leadStatusService.validateLeadStatusExcelData(excelData);
      })
    )
  }


  readonly loadLeadStatusEffect = this.effect<string>((leadStatusId$) =>
    leadStatusId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((leadStatusId) =>
        this.data.userLeadStatus({ leadStatusId }).pipe(
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



  readonly loadLeadStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userLeadStatuses({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                leadStatuses: res.data.items,
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

  readonly createLeadStatusEffect = this.effect<UserCreateLeadStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.leadStatusService.createLeadStatus({...input }).pipe(
          tapResponse(
            (leadStatus: LeadStatus) => {
              this.addNewLeadStatus(leadStatus)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: leadStatus, loading: false, done: true }), 300);
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

    readonly updateLeadStatusEffect = this.effect<UserUpdateLeadStatusInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.leadStatusService.updateLeadStatus(input, input.id).pipe(
              tapResponse(
                (leadStatus) => {
                  this.updateLeadStatus(leadStatus)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: leadStatus, loading: false, done: true }), 300);
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
  
    readonly deleteLeadStatusEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, leadStatus]) => {
          return this.data.userDeleteLeadStatus({leadStatusId: leadStatus.id})
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

  readonly importExcelEffect = this.effect<UserUpdateLeadStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.leadStatusService.importLeadStatuses(data).pipe(
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

            this.addLeadStatuses(created);
            this.updateLeadStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
