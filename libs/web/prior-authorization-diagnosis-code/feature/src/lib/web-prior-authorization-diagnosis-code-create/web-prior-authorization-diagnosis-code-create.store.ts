
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePriorAuthorizationDiagnosisCodeInput, WebCoreDataAccessService, PriorAuthorizationDiagnosisCode, DiagnosisCode,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorAuthorizationDiagnosisCodeService } from '@case-clinical/web/prior-authorization-diagnosis-code/shared'

export interface PriorAuthorizationDiagnosisCodeCreateState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationDiagnosisCode,
 diagnosisCodes?: DiagnosisCode[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationDiagnosisCodeCreateStore extends ComponentStore<PriorAuthorizationDiagnosisCodeCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationDiagnosisCodeService: PriorAuthorizationDiagnosisCodeService
) {
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



  readonly addDiagnosisCode = this.updater((state, diagnosisCode: DiagnosisCode) => ({
    ...state, diagnosisCodes: state.diagnosisCodes.concat(diagnosisCode)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

    

  readonly createPriorAuthorizationDiagnosisCodeEffect = this.effect<UserCreatePriorAuthorizationDiagnosisCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.priorAuthorizationDiagnosisCodeService.createPriorAuthorizationDiagnosisCode({...input}).pipe(
          tapResponse(
            (priorAuthorizationDiagnosisCode: PriorAuthorizationDiagnosisCode) => {
              this.patchState({ item: priorAuthorizationDiagnosisCode, loading: false })
              return this.router.navigate(['..', priorAuthorizationDiagnosisCode?.id], {relativeTo: this.route})
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
