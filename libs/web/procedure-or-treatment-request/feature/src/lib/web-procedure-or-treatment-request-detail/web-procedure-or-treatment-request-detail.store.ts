
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,ProcedureOrTreatmentRequest } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ProcedureOrTreatmentRequestDetailState {
  errors ?: any
  loading?: boolean
  item?: ProcedureOrTreatmentRequest
}

@Injectable()
export class WebProcedureOrTreatmentRequestDetailStore extends ComponentStore<ProcedureOrTreatmentRequestDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadProcedureOrTreatmentRequestEffect(route.params.pipe(pluck('procedureOrTreatmentRequestId')))
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








{ label: 'Diagnosis Codes', value: item?.diagnosisCodes },
{ label: 'Authorizations', value: item?.authorizations },
{ label: 'Status', value: item?.status },
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

  readonly loadProcedureOrTreatmentRequestEffect = this.effect<string>((procedureOrTreatmentRequestId$) =>
    procedureOrTreatmentRequestId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((procedureOrTreatmentRequestId) =>
        this.data.userProcedureOrTreatmentRequest({ procedureOrTreatmentRequestId }).pipe(
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

  readonly deleteProcedureOrTreatmentRequestEffect = this.effect<ProcedureOrTreatmentRequest>(
    (procedureOrTreatmentRequest$) =>
      procedureOrTreatmentRequest$.pipe(
        switchMap((procedureOrTreatmentRequest) =>
          this.data
            .userDeleteProcedureOrTreatmentRequest({
              procedureOrTreatmentRequestId: procedureOrTreatmentRequest.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/procedure-or-treatment-requests'])
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

