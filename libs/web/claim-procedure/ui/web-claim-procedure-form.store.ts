
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, ClaimProcedure, UserCreateClaimProcedureInput, PlaceOfService,ClaimStatus,Claim } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ClaimProcedureFormState {
  errors?: any
  loading?: boolean
  item?: ClaimProcedure,
 placeOfServices?: PlaceOfService[],
 claimStatuses?: ClaimStatus[],
 claims?: Claim[]
  searchTerm?: string
}

@Injectable()
export class WebClaimProcedureFormStore extends ComponentStore<ClaimProcedureFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly placeOfServices$ = this.select((s) => s.placeOfServices || [])
  readonly claimStatuses$ = this.select((s) => s.claimStatuses || [])
  readonly claims$ = this.select((s) => s.claims || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.placeOfServices$,this.claimStatuses$,this.claims$,
    (errors, loading, item, placeOfServices,claimStatuses,claims ) => ({
    errors,
    loading,
    item,
placeOfServices,claimStatuses,claims
  }),
{debounce: true})



  readonly filterPlaceOfServices = (term) => 
        this.data.userPlaceOfServices({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let placeOfServices = res.data.items;
              this.patchState({placeOfServices})
              return placeOfServices
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


  readonly filterClaimStatuses = (term) => 
        this.data.userClaimStatuses({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let claimStatuses = res.data.items;
              this.patchState({claimStatuses})
              return claimStatuses
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


  readonly filterClaims = (term) => 
        this.data.userClaims({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let claims = res.data.items;
              this.patchState({claims})
              return claims
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



  readonly createClaimProcedureEffect = this.effect<UserCreateClaimProcedureInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateClaimProcedure({ input }).pipe(
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


  readonly addPlaceOfService = this.updater((state, placeOfService: PlaceOfService) => ({
    ...state, placeOfServices: state.placeOfServices.concat(placeOfService)
  }))


  readonly addClaimStatus = this.updater((state, claimStatus: ClaimStatus) => ({
    ...state, claimStatuses: state.claimStatuses.concat(claimStatus)
  }))


  readonly addClaim = this.updater((state, claim: Claim) => ({
    ...state, claims: state.claims.concat(claim)
  }))

}
