
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Insurance } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface InsuranceDetailState {
  errors ?: any
  loading?: boolean
  item?: Insurance
}

@Injectable()
export class WebInsuranceDetailStore extends ComponentStore<InsuranceDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadInsuranceEffect(route.params.pipe(pluck('insuranceId')))
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



{ label: 'Policy Number', value: item?.policyNumber },
{ label: 'Insurance Company', value: item?.insuranceCompany },
{ label: 'Minimum Coverage Amount', value: item?.minimumCoverageAmount },
{ label: 'Maximum Coverage Amount', value: item?.maximumCoverageAmount },
{ label: 'Is Stackable', value: item?.isStackable },
{ label: 'Adjuster', value: item?.adjuster },

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

  readonly loadInsuranceEffect = this.effect<string>((insuranceId$) =>
    insuranceId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((insuranceId) =>
        this.data.userInsurance({ insuranceId }).pipe(
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

  readonly deleteInsuranceEffect = this.effect<Insurance>(
    (insurance$) =>
      insurance$.pipe(
        switchMap((insurance) =>
          this.data
            .userDeleteInsurance({
              insuranceId: insurance.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/insurances'])
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

