
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdatePriorAuthorizationDiagnosisCodeInput, WebCoreDataAccessService, PriorAuthorizationDiagnosisCode, DiagnosisCode,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorAuthorizationDiagnosisCodeService } from '@case-clinical/web/prior-authorization-diagnosis-code/shared'

export interface PriorAuthorizationDiagnosisCodeEditState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationDiagnosisCode,
 diagnosisCodes?: DiagnosisCode[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationDiagnosisCodeEditStore extends ComponentStore<PriorAuthorizationDiagnosisCodeEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationDiagnosisCodeService: PriorAuthorizationDiagnosisCodeService
) {
    super({ loading: false })
    
    this.loadPriorAuthorizationDiagnosisCodeEffect(route.params.pipe(map((route) => route?.priorAuthorizationDiagnosisCodeId)))
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

  
  readonly loadPriorAuthorizationDiagnosisCodeEffect = this.effect<string>((priorAuthorizationDiagnosisCodeId$) =>
     priorAuthorizationDiagnosisCodeId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((priorAuthorizationDiagnosisCodeId) =>
        this.data.userPriorAuthorizationDiagnosisCode({priorAuthorizationDiagnosisCodeId}).pipe(
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

  readonly updatePriorAuthorizationDiagnosisCodeEffect = this.effect<UserUpdatePriorAuthorizationDiagnosisCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.priorAuthorizationDiagnosisCodeService.updatePriorAuthorizationDiagnosisCode(input, item?.id).pipe(
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
