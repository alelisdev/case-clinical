
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,DiagnosisCode } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface DiagnosisCodeDetailState {
  errors ?: any
  loading?: boolean
  item?: DiagnosisCode
}

@Injectable()
export class WebDiagnosisCodeDetailStore extends ComponentStore<DiagnosisCodeDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadDiagnosisCodeEffect(route.params.pipe(pluck('diagnosisCodeId')))
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
{ label: 'Prior Authorization Diagnosis Codes', value: item?.priorAuthorizationDiagnosisCodes },
{ label: 'Authorization Diagnosis Codes', value: item?.authorizationDiagnosisCodes },
{ label: 'Procedure or Treatment Request Diagnosis Codes', value: item?.procedureOrTreatmentRequestDiagnosisCodes },
{ label: 'Recommended Order Diagnosis Codes', value: item?.recommendedOrderDiagnosisCodes },
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

  readonly loadDiagnosisCodeEffect = this.effect<string>((diagnosisCodeId$) =>
    diagnosisCodeId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((diagnosisCodeId) =>
        this.data.userDiagnosisCode({ diagnosisCodeId }).pipe(
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

  readonly deleteDiagnosisCodeEffect = this.effect<DiagnosisCode>(
    (diagnosisCode$) =>
      diagnosisCode$.pipe(
        switchMap((diagnosisCode) =>
          this.data
            .userDeleteDiagnosisCode({
              diagnosisCodeId: diagnosisCode.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/diagnosis-codes'])
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

