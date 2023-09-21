
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,RecommendedOrderDiagnosisCode } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface RecommendedOrderDiagnosisCodeDetailState {
  errors ?: any
  loading?: boolean
  item?: RecommendedOrderDiagnosisCode
}

@Injectable()
export class WebRecommendedOrderDiagnosisCodeDetailStore extends ComponentStore<RecommendedOrderDiagnosisCodeDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadRecommendedOrderDiagnosisCodeEffect(route.params.pipe(pluck('recommendedOrderDiagnosisCodeId')))
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

  readonly loadRecommendedOrderDiagnosisCodeEffect = this.effect<string>((recommendedOrderDiagnosisCodeId$) =>
    recommendedOrderDiagnosisCodeId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((recommendedOrderDiagnosisCodeId) =>
        this.data.userRecommendedOrderDiagnosisCode({ recommendedOrderDiagnosisCodeId }).pipe(
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

  readonly deleteRecommendedOrderDiagnosisCodeEffect = this.effect<RecommendedOrderDiagnosisCode>(
    (recommendedOrderDiagnosisCode$) =>
      recommendedOrderDiagnosisCode$.pipe(
        switchMap((recommendedOrderDiagnosisCode) =>
          this.data
            .userDeleteRecommendedOrderDiagnosisCode({
              recommendedOrderDiagnosisCodeId: recommendedOrderDiagnosisCode.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/recommended-order-diagnosis-codes'])
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

