
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdatePriorAuthorizationRequestInput, WebCoreDataAccessService, PriorAuthorizationRequest, ProcedureSite,SurgicalPosition,User,Document,VisitKind,GuidelineUsed,AuthorizationKind,AuthorizationStatus,Patient,CaseProcedure } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorAuthorizationRequestService } from '@case-clinical/web/prior-authorization-request/shared'

export interface PriorAuthorizationRequestEditState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationRequest,
 procedureSites?: ProcedureSite[],
 surgicalPositions?: SurgicalPosition[],
 users?: User[],
 documents?: Document[],
 visitKinds?: VisitKind[],
 guidelineUseds?: GuidelineUsed[],
 authorizationKinds?: AuthorizationKind[],
 authorizationStatuses?: AuthorizationStatus[],
 patients?: Patient[],
 caseProcedures?: CaseProcedure[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationRequestEditStore extends ComponentStore<PriorAuthorizationRequestEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationRequestService: PriorAuthorizationRequestService
) {
    super({ loading: false })
    
    this.loadPriorAuthorizationRequestEffect(route.params.pipe(map((route) => route?.priorAuthorizationRequestId)))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly procedureSites$ = this.select((s) => s.procedureSites || [])
  readonly surgicalPositions$ = this.select((s) => s.surgicalPositions || [])
  readonly users$ = this.select((s) => s.users || [])
  readonly documents$ = this.select((s) => s.documents || [])
  readonly visitKinds$ = this.select((s) => s.visitKinds || [])
  readonly guidelineUseds$ = this.select((s) => s.guidelineUseds || [])
  readonly authorizationKinds$ = this.select((s) => s.authorizationKinds || [])
  readonly authorizationStatuses$ = this.select((s) => s.authorizationStatuses || [])
  readonly patients$ = this.select((s) => s.patients || [])
  readonly caseProcedures$ = this.select((s) => s.caseProcedures || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.procedureSites$,this.surgicalPositions$,this.users$,this.documents$,this.visitKinds$,this.guidelineUseds$,this.authorizationKinds$,this.authorizationStatuses$,this.patients$,this.caseProcedures$,
    (errors, loading, item, procedureSites,surgicalPositions,users,documents,visitKinds,guidelineUseds,authorizationKinds,authorizationStatuses,patients,caseProcedures ) => ({
    errors,
    loading,
    item,
procedureSites,surgicalPositions,users,documents,visitKinds,guidelineUseds,authorizationKinds,authorizationStatuses,patients,caseProcedures
  }),
{debounce: true})



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


  readonly filterUsers = (term) => 
        this.data.userSelectUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              this.patchState({users})
              return users
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


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
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

  
  readonly loadPriorAuthorizationRequestEffect = this.effect<string>((priorAuthorizationRequestId$) =>
     priorAuthorizationRequestId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((priorAuthorizationRequestId) =>
        this.data.userPriorAuthorizationRequest({priorAuthorizationRequestId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
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
         this.priorAuthorizationRequestService.updatePriorAuthorizationRequest(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
