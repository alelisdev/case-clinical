
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, PriorAuthorizationDiagnosisCode, UserCreatePriorAuthorizationDiagnosisCodeInput, DiagnosisCode,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthorizationDiagnosisCodeFormState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationDiagnosisCode,
 diagnosisCodes?: DiagnosisCode[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationDiagnosisCodeFormStore extends ComponentStore<PriorAuthorizationDiagnosisCodeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly diagnosisCodes$ = this.select((s) => s.diagnosisCodes || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.diagnosisCodes$,this.priorAuthorizationRequests$,
    (errors, loading, item, diagnosisCodes,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
diagnosisCodes,priorAuthorizationRequests
  }),
{debounce: true})



  readonly filterDiagnosisCodes = (term) => 
        this.data.userSelectDiagnosisCodes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let diagnosisCodes = res.data.items;
              this.patchState({diagnosisCodes})
              return diagnosisCodes
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



  readonly createPriorAuthorizationDiagnosisCodeEffect = this.effect<UserCreatePriorAuthorizationDiagnosisCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreatePriorAuthorizationDiagnosisCode({ input }).pipe(
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


  readonly addDiagnosisCode = this.updater((state, diagnosisCode: DiagnosisCode) => ({
    ...state, diagnosisCodes: state.diagnosisCodes.concat(diagnosisCode)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

}
