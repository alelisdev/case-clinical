
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { LeadTreatmentService } from './lead-treatment.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateLeadTreatmentInput, UserUpdateLeadTreatmentInput, WebCoreDataAccessService, CorePaging, LeadTreatment, Lead,Treatment } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface LeadTreatmentFeatureState {
  errors?: any
  loading?: boolean
  item?: LeadTreatment
  done: boolean,
  formName?: string
leadId?: string,treatmentId?: string,
  leadTreatments: LeadTreatment[]
 leads?: Lead[],
 treatments?: Treatment[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebLeadTreatmentFeatureStore extends ComponentStore<LeadTreatmentFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly leadTreatmentService: LeadTreatmentService
) {
    super({ 
      loading: false,
      leadTreatments: [],
      done: false,
      searchQuery: '',
      formName: undefined,
leadId: undefined,
treatmentId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('leadTreatmentId')) {
      var leadTreatmentId = this.route.snapshot.paramMap.get('leadTreatmentId')
      this.setFormName('leadTreatment_edit')
    } else {
      this.setFormName('leadTreatment_create')
    }


    if(this.route.snapshot.paramMap.has("leadId")) {
      var leadId = this.route.snapshot.paramMap.get("leadId")
      this.setLeadId(leadId)
    }


    if(this.route.snapshot.paramMap.has("treatmentId")) {
      var treatmentId = this.route.snapshot.paramMap.get("treatmentId")
      this.setTreatmentId(treatmentId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly leadTreatments$ = this.select((s) => s.leadTreatments)
  readonly leads$ = this.select((s) => s.leads || [])
  readonly treatments$ = this.select((s) => s.treatments || [])

readonly leadId$ = this.select((s) => s.leadId)

readonly treatmentId$ = this.select((s) => s.treatmentId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.leadTreatments$,
this.leads$,this.treatments$,
    (errors, loading, item, formName, leadTreatments, leads,treatments ) => ({
    errors,
    loading,
    item,
    formName,
    leadTreatments,

            leads,treatments
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.leadId$,
this.treatmentId$, this.searchQuery$, (paging, leadId,
treatmentId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    leadId: leadId,treatmentId: treatmentId,
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


            readonly setTreatmentId = this.updater((state, treatmentId: string) => ({
                ...state,
    treatmentId,
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


  readonly filterTreatments = (term) => 
        this.data.userSelectTreatments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let treatments = res.data.items;
              this.patchState({treatments})
              return treatments
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


  readonly addTreatment = this.updater((state, treatment: Treatment) => ({
    ...state, treatments: state.treatments.concat(treatment)
  }))

    

  readonly setItem = this.updater((state, item: LeadTreatment) => ({...state, item}))

  addNewLeadTreatment = this.updater((state, leadTreatment: LeadTreatment) => ({ ...state, leadTreatments: [...state.leadTreatments, leadTreatment] }))

  updateLeadTreatment = this.updater((state, leadTreatment: LeadTreatment) => {
    return {
      ...state,
      leadTreatments: state.leadTreatments.map((el) => {
        if (el.id === leadTreatment.id) {
          return leadTreatment
        } else {
          return el
        }
      }),
    }
  })

  addLeadTreatments = this.updater((state, newLeadTreatments: any[]) => ({...state, leadTreatments: state.leadTreatments.concat(newLeadTreatments) }))
  updateLeadTreatments = this.updater((state, updatedLeadTreatments: any[]) => {
    return {
      ...state,
      leadTreatments: state.leadTreatments.map((leadTreatment) => {
        const updated = updatedLeadTreatments.find((el) => el.id === leadTreatment.id);
        return updated ? updated : leadTreatment;
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
        return this.leadTreatmentService.validateLeadTreatmentExcelData(excelData, vm.leads,vm.treatments);
      })
    )
  }


  readonly loadLeadTreatmentEffect = this.effect<string>((leadTreatmentId$) =>
    leadTreatmentId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((leadTreatmentId) =>
        this.data.userLeadTreatment({ leadTreatmentId }).pipe(
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



  readonly loadLeadTreatmentsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userLeadTreatments({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                leadTreatments: res.data.items,
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

  readonly createLeadTreatmentEffect = this.effect<UserCreateLeadTreatmentInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.leadTreatmentService.createLeadTreatment({...input }).pipe(
          tapResponse(
            (leadTreatment: LeadTreatment) => {
              this.addNewLeadTreatment(leadTreatment)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: leadTreatment, loading: false, done: true }), 300);
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

    readonly updateLeadTreatmentEffect = this.effect<UserUpdateLeadTreatmentInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.leadTreatmentService.updateLeadTreatment(input, input.id).pipe(
              tapResponse(
                (leadTreatment) => {
                  this.updateLeadTreatment(leadTreatment)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: leadTreatment, loading: false, done: true }), 300);
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
  
    readonly deleteLeadTreatmentEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, leadTreatment]) => {
          return this.data.userDeleteLeadTreatment({leadTreatmentId: leadTreatment.id})
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

  readonly importExcelEffect = this.effect<UserUpdateLeadTreatmentInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.leadTreatmentService.importLeadTreatments(data).pipe(
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

            this.addLeadTreatments(created);
            this.updateLeadTreatments(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
