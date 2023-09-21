
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, PriorAuthorizationRequest, UserCreatePriorAuthorizationRequestInput, ProcedureSite,SurgicalPosition,User,Document,VisitKind,GuidelineUsed,AuthorizationKind,AuthorizationStatus,Patient } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthorizationRequestFormState {
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
 patients?: Patient[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationRequestFormStore extends ComponentStore<PriorAuthorizationRequestFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
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
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.procedureSites$,this.surgicalPositions$,this.users$,this.documents$,this.visitKinds$,this.guidelineUseds$,this.authorizationKinds$,this.authorizationStatuses$,this.patients$,
    (errors, loading, item, procedureSites,surgicalPositions,users,documents,visitKinds,guidelineUseds,authorizationKinds,authorizationStatuses,patients ) => ({
    errors,
    loading,
    item,
procedureSites,surgicalPositions,users,documents,visitKinds,guidelineUseds,authorizationKinds,authorizationStatuses,patients
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
        this.data.userUsers({input: { name: term}}).pipe(
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
        this.data.userAuthorizationKinds({input: { name: term}}).pipe(
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
        this.data.userPatients({input: { name: term}}).pipe(
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



  readonly createPriorAuthorizationRequestEffect = this.effect<UserCreatePriorAuthorizationRequestInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreatePriorAuthorizationRequest({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
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

}
