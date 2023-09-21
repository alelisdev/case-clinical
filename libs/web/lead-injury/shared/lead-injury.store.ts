
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { LeadInjuryService } from './lead-injury.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateLeadInjuryInput, UserUpdateLeadInjuryInput, WebCoreDataAccessService, CorePaging, LeadInjury, Lead,Severity } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface LeadInjuryFeatureState {
  errors?: any
  loading?: boolean
  item?: LeadInjury
  done: boolean,
  formName?: string
leadId?: string,severityId?: string,
  leadInjuries: LeadInjury[]
 leads?: Lead[],
 severities?: Severity[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebLeadInjuryFeatureStore extends ComponentStore<LeadInjuryFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly leadInjuryService: LeadInjuryService
) {
    super({ 
      loading: false,
      leadInjuries: [],
      done: false,
      searchQuery: '',
      formName: undefined,
leadId: undefined,
severityId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('leadInjuryId')) {
      var leadInjuryId = this.route.snapshot.paramMap.get('leadInjuryId')
      this.setFormName('leadInjury_edit')
    } else {
      this.setFormName('leadInjury_create')
    }


    if(this.route.snapshot.paramMap.has("leadId")) {
      var leadId = this.route.snapshot.paramMap.get("leadId")
      this.setLeadId(leadId)
    }


    if(this.route.snapshot.paramMap.has("severityId")) {
      var severityId = this.route.snapshot.paramMap.get("severityId")
      this.setSeverityId(severityId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly leadInjuries$ = this.select((s) => s.leadInjuries)
  readonly leads$ = this.select((s) => s.leads || [])
  readonly severities$ = this.select((s) => s.severities || [])

readonly leadId$ = this.select((s) => s.leadId)

readonly severityId$ = this.select((s) => s.severityId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.leadInjuries$,
this.leads$,this.severities$,
    (errors, loading, item, formName, leadInjuries, leads,severities ) => ({
    errors,
    loading,
    item,
    formName,
    leadInjuries,

            leads,severities
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.leadId$,
this.severityId$, this.searchQuery$, (paging, leadId,
severityId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    leadId: leadId,severityId: severityId,
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


            readonly setSeverityId = this.updater((state, severityId: string) => ({
                ...state,
    severityId,
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


  readonly filterSeverities = (term) => 
        this.data.userSelectSeverities({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let severities = res.data.items;
              this.patchState({severities})
              return severities
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


  readonly addSeverity = this.updater((state, severity: Severity) => ({
    ...state, severities: state.severities.concat(severity)
  }))

    

  readonly setItem = this.updater((state, item: LeadInjury) => ({...state, item}))

  addNewLeadInjury = this.updater((state, leadInjury: LeadInjury) => ({ ...state, leadInjuries: [...state.leadInjuries, leadInjury] }))

  updateLeadInjury = this.updater((state, leadInjury: LeadInjury) => {
    return {
      ...state,
      leadInjuries: state.leadInjuries.map((el) => {
        if (el.id === leadInjury.id) {
          return leadInjury
        } else {
          return el
        }
      }),
    }
  })

  addLeadInjuries = this.updater((state, newLeadInjuries: any[]) => ({...state, leadInjuries: state.leadInjuries.concat(newLeadInjuries) }))
  updateLeadInjuries = this.updater((state, updatedLeadInjuries: any[]) => {
    return {
      ...state,
      leadInjuries: state.leadInjuries.map((leadInjury) => {
        const updated = updatedLeadInjuries.find((el) => el.id === leadInjury.id);
        return updated ? updated : leadInjury;
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
        return this.leadInjuryService.validateLeadInjuryExcelData(excelData, vm.leads,vm.severities);
      })
    )
  }


  readonly loadLeadInjuryEffect = this.effect<string>((leadInjuryId$) =>
    leadInjuryId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((leadInjuryId) =>
        this.data.userLeadInjury({ leadInjuryId }).pipe(
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



  readonly loadLeadInjuriesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userLeadInjuries({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                leadInjuries: res.data.items,
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

  readonly createLeadInjuryEffect = this.effect<UserCreateLeadInjuryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.leadInjuryService.createLeadInjury({...input }).pipe(
          tapResponse(
            (leadInjury: LeadInjury) => {
              this.addNewLeadInjury(leadInjury)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: leadInjury, loading: false, done: true }), 300);
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

    readonly updateLeadInjuryEffect = this.effect<UserUpdateLeadInjuryInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.leadInjuryService.updateLeadInjury(input, input.id).pipe(
              tapResponse(
                (leadInjury) => {
                  this.updateLeadInjury(leadInjury)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: leadInjury, loading: false, done: true }), 300);
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
  
    readonly deleteLeadInjuryEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, leadInjury]) => {
          return this.data.userDeleteLeadInjury({leadInjuryId: leadInjury.id})
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

  readonly importExcelEffect = this.effect<UserUpdateLeadInjuryInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.leadInjuryService.importLeadInjuries(data).pipe(
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

            this.addLeadInjuries(created);
            this.updateLeadInjuries(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
