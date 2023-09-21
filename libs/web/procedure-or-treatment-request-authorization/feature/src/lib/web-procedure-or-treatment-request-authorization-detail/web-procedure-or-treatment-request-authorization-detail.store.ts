
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,ProcedureOrTreatmentRequestAuthorization } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ProcedureOrTreatmentRequestAuthorizationDetailState {
  errors ?: any
  loading?: boolean
  item?: ProcedureOrTreatmentRequestAuthorization
}

@Injectable()
export class WebProcedureOrTreatmentRequestAuthorizationDetailStore extends ComponentStore<ProcedureOrTreatmentRequestAuthorizationDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadProcedureOrTreatmentRequestAuthorizationEffect(route.params.pipe(pluck('procedureOrTreatmentRequestAuthorizationId')))
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

  readonly loadProcedureOrTreatmentRequestAuthorizationEffect = this.effect<string>((procedureOrTreatmentRequestAuthorizationId$) =>
    procedureOrTreatmentRequestAuthorizationId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((procedureOrTreatmentRequestAuthorizationId) =>
        this.data.userProcedureOrTreatmentRequestAuthorization({ procedureOrTreatmentRequestAuthorizationId }).pipe(
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

  readonly deleteProcedureOrTreatmentRequestAuthorizationEffect = this.effect<ProcedureOrTreatmentRequestAuthorization>(
    (procedureOrTreatmentRequestAuthorization$) =>
      procedureOrTreatmentRequestAuthorization$.pipe(
        switchMap((procedureOrTreatmentRequestAuthorization) =>
          this.data
            .userDeleteProcedureOrTreatmentRequestAuthorization({
              procedureOrTreatmentRequestAuthorizationId: procedureOrTreatmentRequestAuthorization.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/procedure-or-treatment-request-authorizations'])
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

