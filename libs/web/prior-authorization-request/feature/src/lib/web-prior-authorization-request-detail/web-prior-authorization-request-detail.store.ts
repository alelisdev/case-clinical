
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface PriorAuthorizationRequestDetailState {
  errors ?: any
  loading?: boolean
  item?: PriorAuthorizationRequest
}

@Injectable()
export class WebPriorAuthorizationRequestDetailStore extends ComponentStore<PriorAuthorizationRequestDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadPriorAuthorizationRequestEffect(route.params.pipe(pluck('priorAuthorizationRequestId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Name', value: item?.name },
{ label: 'Referred on', value: item?.referredOn },
{ label: 'Approved on', value: item?.approvedOn },
{ label: 'Effective as of', value: item?.effectiveAsOf },
{ label: 'Expires on', value: item?.expiresOn },
{ label: 'Duration', value: item?.duration },


{ label: 'Procedure Description', value: item?.procedureDescription },
{ label: 'Remarks', value: item?.remarks },
{ label: 'Underwriting Approved', value: item?.underwritingApproved },
{ label: 'Tpa Approved', value: item?.tpaApproved },
{ label: 'Requires Medical Director', value: item?.requiresMedicalDirector },
{ label: 'Reviewed on', value: item?.reviewedOn },


{ label: 'Prior Authorization Number', value: item?.priorAuthorizationNumber },
{ label: 'Case Manager', value: item?.caseManager },
{ label: 'Member Number', value: item?.memberNumber },
{ label: 'Medical Director', value: item?.medicalDirector },
{ label: 'Tpa Approver', value: item?.tpaApprover },
{ label: 'Underwriter', value: item?.underwriter },



{ label: 'Guideline Requires', value: item?.guidelineRequires },





{ label: 'Claims', value: item?.claims },
{ label: 'Guidelines', value: item?.guidelines },
{ label: 'Prior Auth Dmes', value: item?.priorAuthDmes },
{ label: 'Prior Authorization Diagnosis Codes', value: item?.priorAuthorizationDiagnosisCodes },
{ label: 'Prior Authorization Equipments', value: item?.priorAuthorizationEquipments },
{ label: 'Prior Authorization Implants', value: item?.priorAuthorizationImplants },
{ label: 'Prior Authorization Procedure Codes', value: item?.priorAuthorizationProcedureCodes },

      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadPriorAuthorizationRequestEffect = this.effect<string>((priorAuthorizationRequestId$) =>
    priorAuthorizationRequestId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((priorAuthorizationRequestId) =>
        this.data.userPriorAuthorizationRequest({ priorAuthorizationRequestId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly deletePriorAuthorizationRequestEffect = this.effect<PriorAuthorizationRequest>(
    (priorAuthorizationRequest$) =>
      priorAuthorizationRequest$.pipe(
        switchMap((priorAuthorizationRequest) =>
          this.data
            .userDeletePriorAuthorizationRequest({
              priorAuthorizationRequestId: priorAuthorizationRequest.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/prior-authorization-requests'])
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
}

