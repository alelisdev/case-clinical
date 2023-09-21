
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PriorAuthorizationRequestService } from './prior-authorization-request.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePriorAuthorizationRequestInput, UserUpdatePriorAuthorizationRequestInput, WebCoreDataAccessService, CorePaging, PriorAuthorizationRequest, ProcedureSite,SurgicalPosition,ClinicalProvider,Document,VisitKind,GuidelineUsed,AuthorizationKind,AuthorizationStatus,Patient,CaseProcedure } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PriorAuthorizationRequestFeatureState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationRequest
  done: boolean,
  formName?: string
procedureSiteId?: string,surgicalPositionId?: string,treatingProviderId?: string,referredToId?: string,prescriptionId?: string,visitKindId?: string,guidelineUsedId?: string,authorizationKindId?: string,authorizationStatusId?: string,billId?: string,medicalReportId?: string,patientId?: string,caseProcedureId?: string,
  priorAuthorizationRequests: PriorAuthorizationRequest[]
 procedureSites?: ProcedureSite[],
 surgicalPositions?: SurgicalPosition[],
 clinicalProviders?: ClinicalProvider[],
 documents?: Document[],
 visitKinds?: VisitKind[],
 guidelineUseds?: GuidelineUsed[],
 authorizationKinds?: AuthorizationKind[],
 authorizationStatuses?: AuthorizationStatus[],
 patients?: Patient[],
 caseProcedures?: CaseProcedure[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPriorAuthorizationRequestFeatureStore extends ComponentStore<PriorAuthorizationRequestFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationRequestService: PriorAuthorizationRequestService
) {
    super({ 
      loading: false,
      priorAuthorizationRequests: [],
      done: false,
      searchQuery: '',
      formName: undefined,
procedureSiteId: undefined,
surgicalPositionId: undefined,
treatingProviderId: undefined,
referredToId: undefined,
prescriptionId: undefined,
visitKindId: undefined,
guidelineUsedId: undefined,
authorizationKindId: undefined,
authorizationStatusId: undefined,
billId: undefined,
medicalReportId: undefined,
patientId: undefined,
caseProcedureId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('priorAuthorizationRequestId')) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get('priorAuthorizationRequestId')
      this.setFormName('priorAuthorizationRequest_edit')
    } else {
      this.setFormName('priorAuthorizationRequest_create')
    }


    if(this.route.snapshot.paramMap.has("procedureSiteId")) {
      var procedureSiteId = this.route.snapshot.paramMap.get("procedureSiteId")
      this.setProcedureSiteId(procedureSiteId)
    }


    if(this.route.snapshot.paramMap.has("surgicalPositionId")) {
      var surgicalPositionId = this.route.snapshot.paramMap.get("surgicalPositionId")
      this.setSurgicalPositionId(surgicalPositionId)
    }


    if(this.route.snapshot.paramMap.has("treatingProviderId")) {
      var treatingProviderId = this.route.snapshot.paramMap.get("treatingProviderId")
      this.setTreatingProviderId(treatingProviderId)
    }


    if(this.route.snapshot.paramMap.has("referredToId")) {
      var referredToId = this.route.snapshot.paramMap.get("referredToId")
      this.setReferredToId(referredToId)
    }


    if(this.route.snapshot.paramMap.has("prescriptionId")) {
      var prescriptionId = this.route.snapshot.paramMap.get("prescriptionId")
      this.setPrescriptionId(prescriptionId)
    }


    if(this.route.snapshot.paramMap.has("visitKindId")) {
      var visitKindId = this.route.snapshot.paramMap.get("visitKindId")
      this.setVisitKindId(visitKindId)
    }


    if(this.route.snapshot.paramMap.has("guidelineUsedId")) {
      var guidelineUsedId = this.route.snapshot.paramMap.get("guidelineUsedId")
      this.setGuidelineUsedId(guidelineUsedId)
    }


    if(this.route.snapshot.paramMap.has("authorizationKindId")) {
      var authorizationKindId = this.route.snapshot.paramMap.get("authorizationKindId")
      this.setAuthorizationKindId(authorizationKindId)
    }


    if(this.route.snapshot.paramMap.has("authorizationStatusId")) {
      var authorizationStatusId = this.route.snapshot.paramMap.get("authorizationStatusId")
      this.setAuthorizationStatusId(authorizationStatusId)
    }


    if(this.route.snapshot.paramMap.has("billId")) {
      var billId = this.route.snapshot.paramMap.get("billId")
      this.setBillId(billId)
    }


    if(this.route.snapshot.paramMap.has("medicalReportId")) {
      var medicalReportId = this.route.snapshot.paramMap.get("medicalReportId")
      this.setMedicalReportId(medicalReportId)
    }


    if(this.route.snapshot.paramMap.has("patientId")) {
      var patientId = this.route.snapshot.paramMap.get("patientId")
      this.setPatientId(patientId)
    }


    if(this.route.snapshot.paramMap.has("caseProcedureId")) {
      var caseProcedureId = this.route.snapshot.paramMap.get("caseProcedureId")
      this.setCaseProcedureId(caseProcedureId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests)
  readonly procedureSites$ = this.select((s) => s.procedureSites || [])
  readonly surgicalPositions$ = this.select((s) => s.surgicalPositions || [])
  readonly clinicalProviders$ = this.select((s) => s.clinicalProviders || [])
  readonly documents$ = this.select((s) => s.documents || [])
  readonly visitKinds$ = this.select((s) => s.visitKinds || [])
  readonly guidelineUseds$ = this.select((s) => s.guidelineUseds || [])
  readonly authorizationKinds$ = this.select((s) => s.authorizationKinds || [])
  readonly authorizationStatuses$ = this.select((s) => s.authorizationStatuses || [])
  readonly patients$ = this.select((s) => s.patients || [])
  readonly caseProcedures$ = this.select((s) => s.caseProcedures || [])

readonly procedureSiteId$ = this.select((s) => s.procedureSiteId)

readonly surgicalPositionId$ = this.select((s) => s.surgicalPositionId)

readonly treatingProviderId$ = this.select((s) => s.treatingProviderId)

readonly referredToId$ = this.select((s) => s.referredToId)

readonly prescriptionId$ = this.select((s) => s.prescriptionId)

readonly visitKindId$ = this.select((s) => s.visitKindId)

readonly guidelineUsedId$ = this.select((s) => s.guidelineUsedId)

readonly authorizationKindId$ = this.select((s) => s.authorizationKindId)

readonly authorizationStatusId$ = this.select((s) => s.authorizationStatusId)

readonly billId$ = this.select((s) => s.billId)

readonly medicalReportId$ = this.select((s) => s.medicalReportId)

readonly patientId$ = this.select((s) => s.patientId)

readonly caseProcedureId$ = this.select((s) => s.caseProcedureId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthorizationRequests$,
this.procedureSites$,this.surgicalPositions$,this.clinicalProviders$,this.documents$,this.visitKinds$,this.guidelineUseds$,this.authorizationKinds$,this.authorizationStatuses$,this.patients$,this.caseProcedures$,
    (errors, loading, item, formName, priorAuthorizationRequests, procedureSites,surgicalPositions,clinicalProviders,documents,visitKinds,guidelineUseds,authorizationKinds,authorizationStatuses,patients,caseProcedures ) => ({
    errors,
    loading,
    item,
    formName,
    priorAuthorizationRequests,

            procedureSites,surgicalPositions,clinicalProviders,documents,visitKinds,guidelineUseds,authorizationKinds,authorizationStatuses,patients,caseProcedures
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.procedureSiteId$,
this.surgicalPositionId$,
this.treatingProviderId$,
this.referredToId$,
this.prescriptionId$,
this.visitKindId$,
this.guidelineUsedId$,
this.authorizationKindId$,
this.authorizationStatusId$,
this.billId$,
this.medicalReportId$,
this.patientId$,
this.caseProcedureId$, this.searchQuery$, (paging, procedureSiteId,
surgicalPositionId,
treatingProviderId,
referredToId,
prescriptionId,
visitKindId,
guidelineUsedId,
authorizationKindId,
authorizationStatusId,
billId,
medicalReportId,
patientId,
caseProcedureId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    procedureSiteId: procedureSiteId,surgicalPositionId: surgicalPositionId,treatingProviderId: treatingProviderId,referredToId: referredToId,prescriptionId: prescriptionId,visitKindId: visitKindId,guidelineUsedId: guidelineUsedId,authorizationKindId: authorizationKindId,authorizationStatusId: authorizationStatusId,billId: billId,medicalReportId: medicalReportId,patientId: patientId,caseProcedureId: caseProcedureId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setProcedureSiteId = this.updater((state, procedureSiteId: string) => ({
                ...state,
    procedureSiteId,
  }))


            readonly setSurgicalPositionId = this.updater((state, surgicalPositionId: string) => ({
                ...state,
    surgicalPositionId,
  }))


            readonly setTreatingProviderId = this.updater((state, treatingProviderId: string) => ({
                ...state,
    treatingProviderId,
  }))


            readonly setReferredToId = this.updater((state, referredToId: string) => ({
                ...state,
    referredToId,
  }))


            readonly setPrescriptionId = this.updater((state, prescriptionId: string) => ({
                ...state,
    prescriptionId,
  }))


            readonly setVisitKindId = this.updater((state, visitKindId: string) => ({
                ...state,
    visitKindId,
  }))


            readonly setGuidelineUsedId = this.updater((state, guidelineUsedId: string) => ({
                ...state,
    guidelineUsedId,
  }))


            readonly setAuthorizationKindId = this.updater((state, authorizationKindId: string) => ({
                ...state,
    authorizationKindId,
  }))


            readonly setAuthorizationStatusId = this.updater((state, authorizationStatusId: string) => ({
                ...state,
    authorizationStatusId,
  }))


            readonly setBillId = this.updater((state, billId: string) => ({
                ...state,
    billId,
  }))


            readonly setMedicalReportId = this.updater((state, medicalReportId: string) => ({
                ...state,
    medicalReportId,
  }))


            readonly setPatientId = this.updater((state, patientId: string) => ({
                ...state,
    patientId,
  }))


            readonly setCaseProcedureId = this.updater((state, caseProcedureId: string) => ({
                ...state,
    caseProcedureId,
  }))



  readonly filterProcedureSites = (term) => 
        this.data.userSelectProcedureSites({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedureSites = res.data.items;
              this.patchState({procedureSites})
              return procedureSites
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


  readonly filterSurgicalPositions = (term) => 
        this.data.userSelectSurgicalPositions({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let surgicalPositions = res.data.items;
              this.patchState({surgicalPositions})
              return surgicalPositions
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


  readonly filterClinicalProviders = (term) => 
        this.data.userSelectClinicalProviders({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let clinicalProviders = res.data.items;
              this.patchState({clinicalProviders})
              return clinicalProviders
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


  readonly filterDocuments = (term) => 
        this.data.userSelectDocuments({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let documents = res.data.items;
              this.patchState({documents})
              return documents
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


  readonly filterVisitKinds = (term) => 
        this.data.userSelectVisitKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let visitKinds = res.data.items;
              this.patchState({visitKinds})
              return visitKinds
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


  readonly filterGuidelineUseds = (term) => 
        this.data.userSelectGuidelineUseds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let guidelineUseds = res.data.items;
              this.patchState({guidelineUseds})
              return guidelineUseds
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


  readonly filterAuthorizationKinds = (term) => 
        this.data.userSelectAuthorizationKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let authorizationKinds = res.data.items;
              this.patchState({authorizationKinds})
              return authorizationKinds
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


  readonly filterAuthorizationStatuses = (term) => 
        this.data.userSelectAuthorizationStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let authorizationStatuses = res.data.items;
              this.patchState({authorizationStatuses})
              return authorizationStatuses
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


  readonly filterPatients = (term) => 
        this.data.userSelectPatients({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let patients = res.data.items;
              this.patchState({patients})
              return patients
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


  readonly filterCaseProcedures = (term) => 
        this.data.userSelectCaseProcedures({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseProcedures = res.data.items;
              this.patchState({caseProcedures})
              return caseProcedures
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



  readonly addProcedureSite = this.updater((state, procedureSite: ProcedureSite) => ({
    ...state, procedureSites: state.procedureSites.concat(procedureSite)
  }))


  readonly addSurgicalPosition = this.updater((state, surgicalPosition: SurgicalPosition) => ({
    ...state, surgicalPositions: state.surgicalPositions.concat(surgicalPosition)
  }))


  readonly addClinicalProvider = this.updater((state, clinicalProvider: ClinicalProvider) => ({
    ...state, clinicalProviders: state.clinicalProviders.concat(clinicalProvider)
  }))


  readonly addDocument = this.updater((state, document: Document) => ({
    ...state, documents: state.documents.concat(document)
  }))


  readonly addVisitKind = this.updater((state, visitKind: VisitKind) => ({
    ...state, visitKinds: state.visitKinds.concat(visitKind)
  }))


  readonly addGuidelineUsed = this.updater((state, guidelineUsed: GuidelineUsed) => ({
    ...state, guidelineUseds: state.guidelineUseds.concat(guidelineUsed)
  }))


  readonly addAuthorizationKind = this.updater((state, authorizationKind: AuthorizationKind) => ({
    ...state, authorizationKinds: state.authorizationKinds.concat(authorizationKind)
  }))


  readonly addAuthorizationStatus = this.updater((state, authorizationStatus: AuthorizationStatus) => ({
    ...state, authorizationStatuses: state.authorizationStatuses.concat(authorizationStatus)
  }))


  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state, patients: state.patients.concat(patient)
  }))


  readonly addCaseProcedure = this.updater((state, caseProcedure: CaseProcedure) => ({
    ...state, caseProcedures: state.caseProcedures.concat(caseProcedure)
  }))

    

  readonly setItem = this.updater((state, item: PriorAuthorizationRequest) => ({...state, item}))

  addNewPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({ ...state, priorAuthorizationRequests: [...state.priorAuthorizationRequests, priorAuthorizationRequest] }))

  updatePriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => {
    return {
      ...state,
      priorAuthorizationRequests: state.priorAuthorizationRequests.map((el) => {
        if (el.id === priorAuthorizationRequest.id) {
          return priorAuthorizationRequest
        } else {
          return el
        }
      }),
    }
  })

  addPriorAuthorizationRequests = this.updater((state, newPriorAuthorizationRequests: any[]) => ({...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(newPriorAuthorizationRequests) }))
  updatePriorAuthorizationRequests = this.updater((state, updatedPriorAuthorizationRequests: any[]) => {
    return {
      ...state,
      priorAuthorizationRequests: state.priorAuthorizationRequests.map((priorAuthorizationRequest) => {
        const updated = updatedPriorAuthorizationRequests.find((el) => el.id === priorAuthorizationRequest.id);
        return updated ? updated : priorAuthorizationRequest;
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
        return this.priorAuthorizationRequestService.validatePriorAuthorizationRequestExcelData(excelData, 
          vm.procedureSites,vm.surgicalPositions,vm.clinicalProviders,vm.clinicalProviders,vm.documents,vm.visitKinds,
          vm.guidelineUseds,vm.authorizationKinds,vm.authorizationStatuses,vm.patients,vm.caseProcedures);
      })
    )
  }


  readonly loadPriorAuthorizationRequestEffect = this.effect<string>((priorAuthorizationRequestId$) =>
    priorAuthorizationRequestId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((priorAuthorizationRequestId) =>
        this.data.userPriorAuthorizationRequest({ priorAuthorizationRequestId }).pipe(
          tapResponse(
            (res) => {
              console.log('-----------------------------------')
              console.log(res.data.item);
                return this.patchState({ 
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



  readonly loadPriorAuthorizationRequestsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthorizationRequests({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                priorAuthorizationRequests: res.data.items,
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

  readonly createPriorAuthorizationRequestEffect = this.effect<UserCreatePriorAuthorizationRequestInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.priorAuthorizationRequestService.createPriorAuthorizationRequest({...input }).pipe(
          tapResponse(
            (priorAuthorizationRequest: PriorAuthorizationRequest) => {
              this.addNewPriorAuthorizationRequest(priorAuthorizationRequest)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: priorAuthorizationRequest, loading: false, done: true }), 300);
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

    readonly updatePriorAuthorizationRequestEffect = this.effect<UserUpdatePriorAuthorizationRequestInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.priorAuthorizationRequestService.updatePriorAuthorizationRequest(input, input.id).pipe(
              tapResponse(
                (priorAuthorizationRequest) => {
                  this.updatePriorAuthorizationRequest(priorAuthorizationRequest)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: priorAuthorizationRequest, loading: false, done: true }), 300);
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
  
    readonly deletePriorAuthorizationRequestEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, priorAuthorizationRequest]) => {
          return this.data.userDeletePriorAuthorizationRequest({priorAuthorizationRequestId: priorAuthorizationRequest.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePriorAuthorizationRequestInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthorizationRequestService.importPriorAuthorizationRequests(data).pipe(
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

            this.addPriorAuthorizationRequests(created);
            this.updatePriorAuthorizationRequests(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
