
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { BodyPartLeadService } from './body-part-lead.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateBodyPartLeadInput, UserUpdateBodyPartLeadInput, WebCoreDataAccessService, CorePaging, BodyPartLead, Lead,BodyPart } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface BodyPartLeadFeatureState {
  errors?: any
  loading?: boolean
  item?: BodyPartLead
  done: boolean,
  formName?: string
leadId?: string,bodyPartId?: string,
  bodyPartLeads: BodyPartLead[]
 leads?: Lead[],
 bodyParts?: BodyPart[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebBodyPartLeadFeatureStore extends ComponentStore<BodyPartLeadFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly bodyPartLeadService: BodyPartLeadService
) {
    super({ 
      loading: false,
      bodyPartLeads: [],
      done: false,
      searchQuery: '',
      formName: undefined,
leadId: undefined,
bodyPartId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('bodyPartLeadId')) {
      var bodyPartLeadId = this.route.snapshot.paramMap.get('bodyPartLeadId')
      this.setFormName('bodyPartLead_edit')
    } else {
      this.setFormName('bodyPartLead_create')
    }


    if(this.route.snapshot.paramMap.has("leadId")) {
      var leadId = this.route.snapshot.paramMap.get("leadId")
      this.setLeadId(leadId)
    }


    if(this.route.snapshot.paramMap.has("bodyPartId")) {
      var bodyPartId = this.route.snapshot.paramMap.get("bodyPartId")
      this.setBodyPartId(bodyPartId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly bodyPartLeads$ = this.select((s) => s.bodyPartLeads)
  readonly leads$ = this.select((s) => s.leads || [])
  readonly bodyParts$ = this.select((s) => s.bodyParts || [])

readonly leadId$ = this.select((s) => s.leadId)

readonly bodyPartId$ = this.select((s) => s.bodyPartId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.bodyPartLeads$,
this.leads$,this.bodyParts$,
    (errors, loading, item, formName, bodyPartLeads, leads,bodyParts ) => ({
    errors,
    loading,
    item,
    formName,
    bodyPartLeads,

            leads,bodyParts
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.leadId$,
this.bodyPartId$, this.searchQuery$, (paging, leadId,
bodyPartId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    leadId: leadId,bodyPartId: bodyPartId,
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


            readonly setBodyPartId = this.updater((state, bodyPartId: string) => ({
                ...state,
    bodyPartId,
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


  readonly filterBodyParts = (term) => 
        this.data.userSelectBodyParts({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let bodyParts = res.data.items;
              this.patchState({bodyParts})
              return bodyParts
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


  readonly addBodyPart = this.updater((state, bodyPart: BodyPart) => ({
    ...state, bodyParts: state.bodyParts.concat(bodyPart)
  }))

    

  readonly setItem = this.updater((state, item: BodyPartLead) => ({...state, item}))

  addNewBodyPartLead = this.updater((state, bodyPartLead: BodyPartLead) => ({ ...state, bodyPartLeads: [...state.bodyPartLeads, bodyPartLead] }))

  updateBodyPartLead = this.updater((state, bodyPartLead: BodyPartLead) => {
    return {
      ...state,
      bodyPartLeads: state.bodyPartLeads.map((el) => {
        if (el.id === bodyPartLead.id) {
          return bodyPartLead
        } else {
          return el
        }
      }),
    }
  })

  addBodyPartLeads = this.updater((state, newBodyPartLeads: any[]) => ({...state, bodyPartLeads: state.bodyPartLeads.concat(newBodyPartLeads) }))
  updateBodyPartLeads = this.updater((state, updatedBodyPartLeads: any[]) => {
    return {
      ...state,
      bodyPartLeads: state.bodyPartLeads.map((bodyPartLead) => {
        const updated = updatedBodyPartLeads.find((el) => el.id === bodyPartLead.id);
        return updated ? updated : bodyPartLead;
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
        return this.bodyPartLeadService.validateBodyPartLeadExcelData(excelData, vm.leads,vm.bodyParts);
      })
    )
  }


  readonly loadBodyPartLeadEffect = this.effect<string>((bodyPartLeadId$) =>
    bodyPartLeadId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((bodyPartLeadId) =>
        this.data.userBodyPartLead({ bodyPartLeadId }).pipe(
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



  readonly loadBodyPartLeadsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userBodyPartLeads({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                bodyPartLeads: res.data.items,
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

  readonly createBodyPartLeadEffect = this.effect<UserCreateBodyPartLeadInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.bodyPartLeadService.createBodyPartLead({...input }).pipe(
          tapResponse(
            (bodyPartLead: BodyPartLead) => {
              this.addNewBodyPartLead(bodyPartLead)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: bodyPartLead, loading: false, done: true }), 300);
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

    readonly updateBodyPartLeadEffect = this.effect<UserUpdateBodyPartLeadInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.bodyPartLeadService.updateBodyPartLead(input, input.id).pipe(
              tapResponse(
                (bodyPartLead) => {
                  this.updateBodyPartLead(bodyPartLead)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: bodyPartLead, loading: false, done: true }), 300);
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
  
    readonly deleteBodyPartLeadEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, bodyPartLead]) => {
          return this.data.userDeleteBodyPartLead({bodyPartLeadId: bodyPartLead.id})
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

  readonly importExcelEffect = this.effect<UserUpdateBodyPartLeadInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.bodyPartLeadService.importBodyPartLeads(data).pipe(
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

            this.addBodyPartLeads(created);
            this.updateBodyPartLeads(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
