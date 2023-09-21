import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { EMPTY, of } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { LeadService } from './lead.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import {
  UserCreateLeadInput,
  BodyPart,
  UserUpdateLeadInput,
  WebCoreDataAccessService,
  CorePaging,
  Lead,
  AccidentType,
  Document,
  LeadStatus,
  LeadSource,
  User,
  BodyPartLead,
} from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface LeadFeatureState {
  errors?: any
  loading?: boolean
  item?: Lead
  done: boolean
  formName?: string
  accidentTypeId?: string
  driversLicenseId?: string
  policeReportAttachmentId?: string
  phoneRecordingId?: string
  leadStatusId?: string
  leadSourceId?: string
  submittedById?: string
  mrn: string
  leads: Lead[]
  accidentTypes?: AccidentType[]
  documents?: Document[]
  leadStatuses?: LeadStatus[]
  leadSources?: LeadSource[]
  users?: User[]
  bodyParts?: BodyPart[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebLeadFeatureStore extends ComponentStore<LeadFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly leadService: LeadService,
  ) {
    super({
      loading: false,
      leads: [],
      done: false,
      searchQuery: '',
      mrn: '',
      formName: undefined,
      accidentTypeId: undefined,
      driversLicenseId: undefined,
      policeReportAttachmentId: undefined,
      phoneRecordingId: undefined,
      leadStatusId: undefined,
      leadSourceId: undefined,
      submittedById: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('leadId')) {
      const leadId = this.route.snapshot.paramMap.get('leadId')
      this.setFormName('lead_edit')
    } else {
      this.setFormName('lead_create')
    }

    if (this.route.snapshot.paramMap.has('accidentTypeId')) {
      const accidentTypeId = this.route.snapshot.paramMap.get('accidentTypeId')
      this.setAccidentTypeId(accidentTypeId)
    }

    if (this.route.snapshot.paramMap.has('driversLicenseId')) {
      const driversLicenseId = this.route.snapshot.paramMap.get('driversLicenseId')
      this.setDriversLicenseId(driversLicenseId)
    }

    if (this.route.snapshot.paramMap.has('policeReportAttachmentId')) {
      const policeReportAttachmentId = this.route.snapshot.paramMap.get('policeReportAttachmentId')
      this.setPoliceReportAttachmentId(policeReportAttachmentId)
    }

    if (this.route.snapshot.paramMap.has('phoneRecordingId')) {
      const phoneRecordingId = this.route.snapshot.paramMap.get('phoneRecordingId')
      this.setPhoneRecordingId(phoneRecordingId)
    }

    if (this.route.snapshot.paramMap.has('leadStatusId')) {
      const leadStatusId = this.route.snapshot.paramMap.get('leadStatusId')
      this.setLeadStatusId(leadStatusId)
    }

    if (this.route.snapshot.paramMap.has('leadSourceId')) {
      const leadSourceId = this.route.snapshot.paramMap.get('leadSourceId')
      this.setLeadSourceId(leadSourceId)
    }

    if (this.route.snapshot.paramMap.has('submittedById')) {
      const submittedById = this.route.snapshot.paramMap.get('submittedById')
      this.setSubmittedById(submittedById)
    }
  }

  public bodyPartInjured: any[] = []
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly leads$ = this.select((s) => s.leads)
  readonly accidentTypes$ = this.select((s) => s.accidentTypes || [])
  readonly documents$ = this.select((s) => s.documents || [])
  readonly leadStatuses$ = this.select((s) => s.leadStatuses || [])
  readonly leadSources$ = this.select((s) => s.leadSources || [])

  readonly users$ = this.select((s) => s.users || [])

  readonly accidentTypeId$ = this.select((s) => s.accidentTypeId)

  readonly driversLicenseId$ = this.select((s) => s.driversLicenseId)

  readonly policeReportAttachmentId$ = this.select((s) => s.policeReportAttachmentId)

  readonly phoneRecordingId$ = this.select((s) => s.phoneRecordingId)

  readonly leadStatusId$ = this.select((s) => s.leadStatusId)

  readonly leadSourceId$ = this.select((s) => s.leadSourceId)

  readonly submittedById$ = this.select((s) => s.submittedById)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$, (item, done) => ({ item, done }), { debounce: true })

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.item$,
    this.formName$,
    this.leads$,
    this.accidentTypes$,
    this.documents$,
    this.leadStatuses$,
    this.leadSources$,
    this.users$,
    (errors, loading, item, formName, leads, accidentTypes, documents, leadStatuses, leadSources, users) => ({
      errors,
      loading,
      item,
      formName,
      leads,

      accidentTypes,
      documents,
      leadStatuses,
      leadSources,
      users,
    }),
    { debounce: true },
  )

  readonly input$ = this.select(
    this.paging$,
    this.accidentTypeId$,
    this.driversLicenseId$,
    this.policeReportAttachmentId$,
    this.phoneRecordingId$,
    this.leadStatusId$,
    this.leadSourceId$,
    this.submittedById$,
    this.searchQuery$,
    (
      paging,
      accidentTypeId,
      driversLicenseId,
      policeReportAttachmentId,
      phoneRecordingId,
      leadStatusId,
      leadSourceId,
      submittedById,
      searchQuery,
    ) => ({
      limit: paging.limit,
      skip: paging.skip,
      name: searchQuery,
      accidentTypeId: accidentTypeId,
      driversLicenseId: driversLicenseId,
      policeReportAttachmentId: policeReportAttachmentId,
      phoneRecordingId: phoneRecordingId,
      leadStatusId: leadStatusId,
      leadSourceId: leadSourceId,
      submittedById: submittedById,
      total: paging.total,
    }),
  )

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))

  readonly setAccidentTypeId = this.updater((state, accidentTypeId: string) => ({
    ...state,
    accidentTypeId,
  }))

  readonly setDriversLicenseId = this.updater((state, driversLicenseId: string) => ({
    ...state,
    driversLicenseId,
  }))

  readonly setPoliceReportAttachmentId = this.updater((state, policeReportAttachmentId: string) => ({
    ...state,
    policeReportAttachmentId,
  }))

  readonly setPhoneRecordingId = this.updater((state, phoneRecordingId: string) => ({
    ...state,
    phoneRecordingId,
  }))

  readonly setLeadStatusId = this.updater((state, leadStatusId: string) => ({
    ...state,
    leadStatusId,
  }))

  readonly setLeadSourceId = this.updater((state, leadSourceId: string) => ({
    ...state,
    leadSourceId,
  }))

  readonly setSubmittedById = this.updater((state, submittedById: string | undefined) => ({
    ...state,
    submittedById,
  }))

  readonly filterAccidentTypes = (term) =>
    this.data.userSelectAccidentTypes({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const accidentTypes = res.data.items
          console.log('AccidentTypes', res.data.items)
          this.patchState({ accidentTypes })
          return accidentTypes
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        console.log('filterAccidentTypes', result.data.items)
        return result.data.items
      }),
    )

  readonly filterDocuments = (term) =>
    this.data.userSelectDocuments({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const documents = res.data.items
          this.patchState({ documents })
          return documents
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterLeadStatuses = (term) =>
    this.data.userSelectLeadStatuses({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const leadStatuses = res.data.items
          this.patchState({ leadStatuses })
          return leadStatuses
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterLeadSources = (term) =>
    this.data.userSelectLeadSources({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const leadSources = res.data.items
          this.patchState({ leadSources })
          return leadSources
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterUsers = (term) =>
    this.data.userSelectUsers({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const users = res.data.items
          this.patchState({ users })
          return users
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly filterBodyParts = (term) =>
    this.data.userSelectBodyParts({ input: { name: term } }).pipe(
      tapResponse(
        (res: any) => {
          const bodyParts = res.data.items
          this.patchState({ bodyParts })
          return bodyParts
        },
        (errors: any) =>
          this.patchState({
            errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
          }),
      ),
      map((result) => {
        return result.data.items
      }),
    )

  readonly addAccidentType = this.updater((state, accidentType: AccidentType) => ({
    ...state,
    accidentTypes: state.accidentTypes.concat(accidentType),
  }))

  readonly addDocument = this.updater((state, document: Document) => ({
    ...state,
    documents: state.documents.concat(document),
  }))

  readonly addLeadStatus = this.updater((state, leadStatus: LeadStatus) => ({
    ...state,
    leadStatuses: state.leadStatuses.concat(leadStatus),
  }))

  readonly addLeadSource = this.updater((state, leadSource: LeadSource) => ({
    ...state,
    leadSources: state.leadSources.concat(leadSource),
  }))

  readonly addUser = this.updater((state, user: User) => ({
    ...state,
    users: state.users.concat(user),
  }))

  readonly setItem = this.updater((state, item: Lead) => ({ ...state, item }))

  addNewLead = this.updater((state, lead: Lead) => ({ ...state, leads: [...state.leads, lead] }))

  updateLead = this.updater((state, lead: Lead) => {
    return {
      ...state,
      leads: state.leads.map((el) => {
        if (el.id === lead.id) {
          return lead
        } else {
          return el
        }
      }),
    }
  })

  addLeads = this.updater((state, newLeads: any[]) => ({ ...state, leads: state.leads.concat(newLeads) }))
  updateLeads = this.updater((state, updatedLeads: any[]) => {
    return {
      ...state,
      leads: state.leads.map((lead) => {
        const updated = updatedLeads.find((el) => el.id === lead.id)
        return updated ? updated : lead
      }),
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery,
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.leadService.validateLeadExcelData(
          excelData,
          vm.accidentTypes,
          vm.leadStatuses,
          vm.leadSources,
          vm.users,
        )
      }),
    )
  }

  syncMrnToPharmacy() {
    return this.vm$.pipe(
      switchMap((vm) => {
        const mrn = '123456'
        return of(this.data.userSyncMrnToPharmacy({input: vm.item, mrn})).pipe(
          catchError((error) => {
            this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
            return EMPTY
          }),
          tap((result) => {
            if (result) {
              this.toast.success(`Successfully synced to pharmacy, {result}`, { duration: 3000 })
            }
          }),
        )
      }),
    )
  }

  getMrn() {
    return this.vm$.pipe(
      switchMap((vm) => {
        return of(this.data.getPatientMrnNumber({dateOfBirth: vm.item.dateOfBirth, dateOfLoss: vm.item.dateOfLoss,
          accidentKind: vm.item.accidentTypeId, legalCaseId: vm.item.id})).pipe(
          catchError((error) => {
            this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
            return EMPTY
          }),
          tap((result) => {
            if (result) {
              console.log(result);
              //interpolate result into the toast message.
              this.toast.success(`Success, new MRN: ${result}`, { duration: 3000 })
            }
          }),
        )
      }),
    )
  }

  BodyPartsInjuredChanged(bodyParts: string[]) {
    console.log('bodyParts', bodyParts)
    this.bodyPartInjured = bodyParts.map((value) => {
      return {
        bodyPartId: value,
      }
    })
  }

  readonly loadLeadEffect = this.effect<string>((leadId$) =>
    leadId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((leadId) =>
        this.data.userLead({ leadId }).pipe(
          tapResponse(
            (res) => {
              this.patchState({
                item: res.data.item,
                errors: res.errors,
                loading: false,
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

  readonly loadLeadsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userLeads({ input }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                leads: res.data.items,
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

  readonly createLeadEffect = this.effect<UserCreateLeadInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) => {
        console.log('input', input)
        return this.leadService.createLead({ ...input }).pipe(
          tapResponse(
            (lead: Lead) => {
              this.addNewLead(lead)
              this.toast.success('Created Successfully!')
              setTimeout(() => this.patchState({ item: lead, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
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
            },
          ),
        )
      }),
    ),
  )

  readonly updateLeadEffect = this.effect<UserUpdateLeadInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
        this.leadService.updateLead(item, item.id).pipe(
          tapResponse(
            (lead) => {
              this.updateLead(lead)
              this.toast.success('Updated Successfully!')
              setTimeout(() => this.patchState({ item: lead, loading: false, done: true }), 300)
              setTimeout(() => this.patchState({ done: false, item: null }), 600)
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
            },
          ),
        ),
      )
    )
  )

  readonly userSyncMrnToPharmacyEffect = this.effect<UserUpdateLeadInput>(input$ => input$.pipe(
        tap(() => { this.patchState({ loading: true }) }),
        switchMap((input) => this.data.userSyncMrnToPharmacy({ input, mrn: input.legalCase.medicalRecordNumber }).pipe(
          tapResponse(
            (res) => {
              this.toast.success('Successfully synced mrn to pharmacy', { duration: 3000 })
                this.patchState({
                  loading: false,
                })
              },
              (error) => {
                this.toast.error("Failed to ", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            )
          )
        )
      ))

    readonly deleteLeadEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, lead]) => {
          return this.data.userDeleteLead({leadId: lead.id})
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

  readonly importExcelEffect = this.effect<UserUpdateLeadInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((data) =>
        this.leadService.importLeads(data).pipe(
          catchError((error) => {
            this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
            return EMPTY
          }),
          tap((updateResult) => {
            const created = JSON.parse(updateResult.created)
            const updated = JSON.parse(updateResult.updated)
            const failed = JSON.parse(updateResult.failed)
            const total = created.length + updated.length + failed.length

            this.addLeads(created)
            this.updateLeads(updated)

            this.toast.success(
              `${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`,
              { duration: 3000 },
            )
          }),
        ),
      ),
    ),
  )
}
