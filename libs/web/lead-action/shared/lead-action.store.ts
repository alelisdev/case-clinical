
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { LeadActionService } from './lead-action.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateLeadActionInput, UserUpdateLeadActionInput, WebCoreDataAccessService, CorePaging, LeadAction, Lead } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface LeadActionFeatureState {
  errors?: any
  loading?: boolean
  item?: LeadAction
  done: boolean,
  formName?: string
leadId?: string,
  leadActions: LeadAction[]
 leads?: Lead[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebLeadActionFeatureStore extends ComponentStore<LeadActionFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly leadActionService: LeadActionService
) {
    super({ 
      loading: false,
      leadActions: [],
      done: false,
      searchQuery: '',
      formName: undefined,
leadId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('leadActionId')) {
      var leadActionId = this.route.snapshot.paramMap.get('leadActionId')
      this.setFormName('leadAction_edit')
    } else {
      this.setFormName('leadAction_create')
    }


    if(this.route.snapshot.paramMap.has("leadId")) {
      var leadId = this.route.snapshot.paramMap.get("leadId")
      this.setLeadId(leadId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly leadActions$ = this.select((s) => s.leadActions)
  readonly leads$ = this.select((s) => s.leads || [])

readonly leadId$ = this.select((s) => s.leadId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.leadActions$,
this.leads$,
    (errors, loading, item, formName, leadActions, leads ) => ({
    errors,
    loading,
    item,
    formName,
    leadActions,

            leads
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.leadId$, this.searchQuery$, (paging, leadId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    leadId: leadId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setLeadId = this.updater((state, leadId: string) => ({
                ...state,
    leadId,
  }))



  readonly filterLeads = (term) => 
        this.data.userSelectLeads({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let leads = res.data.items;
              this.patchState({leads})
              return leads
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



  readonly addLead = this.updater((state, lead: Lead) => ({
    ...state, leads: state.leads.concat(lead)
  }))

    

  readonly setItem = this.updater((state, item: LeadAction) => ({...state, item}))

  addNewLeadAction = this.updater((state, leadAction: LeadAction) => ({ ...state, leadActions: [...state.leadActions, leadAction] }))

  updateLeadAction = this.updater((state, leadAction: LeadAction) => {
    return {
      ...state,
      leadActions: state.leadActions.map((el) => {
        if (el.id === leadAction.id) {
          return leadAction
        } else {
          return el
        }
      }),
    }
  })

  addLeadActions = this.updater((state, newLeadActions: any[]) => ({...state, leadActions: state.leadActions.concat(newLeadActions) }))
  updateLeadActions = this.updater((state, updatedLeadActions: any[]) => {
    return {
      ...state,
      leadActions: state.leadActions.map((leadAction) => {
        const updated = updatedLeadActions.find((el) => el.id === leadAction.id);
        return updated ? updated : leadAction;
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
        return this.leadActionService.validateLeadActionExcelData(excelData, vm.leads);
      })
    )
  }


  readonly loadLeadActionEffect = this.effect<string>((leadActionId$) =>
    leadActionId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((leadActionId) =>
        this.data.userLeadAction({ leadActionId }).pipe(
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



  readonly loadLeadActionsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userLeadActions({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                leadActions: res.data.items,
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

  readonly createLeadActionEffect = this.effect<UserCreateLeadActionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.leadActionService.createLeadAction({...input }).pipe(
          tapResponse(
            (leadAction: LeadAction) => {
              this.addNewLeadAction(leadAction)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: leadAction, loading: false, done: true }), 300);
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

    readonly updateLeadActionEffect = this.effect<UserUpdateLeadActionInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.leadActionService.updateLeadAction(input, input.id).pipe(
              tapResponse(
                (leadAction) => {
                  this.updateLeadAction(leadAction)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: leadAction, loading: false, done: true }), 300);
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
  
    readonly deleteLeadActionEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, leadAction]) => {
          return this.data.userDeleteLeadAction({leadActionId: leadAction.id})
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

  readonly importExcelEffect = this.effect<UserUpdateLeadActionInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.leadActionService.importLeadActions(data).pipe(
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

            this.addLeadActions(created);
            this.updateLeadActions(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
