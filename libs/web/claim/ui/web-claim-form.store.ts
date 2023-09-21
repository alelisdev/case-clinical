
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Claim, UserCreateClaimInput, PriorAuthorizationRequest,Patient } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ClaimFormState {
  errors?: any
  loading?: boolean
  item?: Claim,
 priorAuthorizationRequests?: PriorAuthorizationRequest[],
 patients?: Patient[]
  searchTerm?: string
}

@Injectable()
export class WebClaimFormStore extends ComponentStore<ClaimFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly patients$ = this.select((s) => s.patients || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.priorAuthorizationRequests$,this.patients$,
    (errors, loading, item, priorAuthorizationRequests,patients ) => ({
    errors,
    loading,
    item,
priorAuthorizationRequests,patients
  }),
{debounce: true})



  readonly filterPriorAuthorizationRequests = (term) => 
        this.data.userSelectPriorAuthorizationRequests({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let priorAuthorizationRequests = res.data.items;
              this.patchState({priorAuthorizationRequests})
              return priorAuthorizationRequests
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



  readonly createClaimEffect = this.effect<UserCreateClaimInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateClaim({ input }).pipe(
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


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))


  readonly addPatient = this.updater((state, patient: Patient) => ({
    ...state, patients: state.patients.concat(patient)
  }))

}
