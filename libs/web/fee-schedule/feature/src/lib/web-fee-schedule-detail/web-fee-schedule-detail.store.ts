
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,FeeSchedule } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface FeeScheduleDetailState {
  errors ?: any
  loading?: boolean
  item?: FeeSchedule
}

@Injectable()
export class WebFeeScheduleDetailStore extends ComponentStore<FeeScheduleDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadFeeScheduleEffect(route.params.pipe(pluck('feeScheduleId')))
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


{ label: 'Code', value: item?.code },
{ label: 'Modifier', value: item?.modifier },
{ label: 'Description', value: item?.description },
{ label: 'Medicare Physician Non Facility Rate', value: item?.medicarePhysicianNonFacilityRate },
{ label: 'Physician Non Facility Fee', value: item?.physicianNonFacilityFee },
{ label: 'Medicare Physician Facility Rate', value: item?.medicarePhysicianFacilityRate },
{ label: 'Physician Facility Fee', value: item?.physicianFacilityFee },
{ label: 'Base Unit', value: item?.baseUnit },
{ label: 'Prof Cf', value: item?.profCf },
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

  readonly loadFeeScheduleEffect = this.effect<string>((feeScheduleId$) =>
    feeScheduleId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((feeScheduleId) =>
        this.data.userFeeSchedule({ feeScheduleId }).pipe(
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

  readonly deleteFeeScheduleEffect = this.effect<FeeSchedule>(
    (feeSchedule$) =>
      feeSchedule$.pipe(
        switchMap((feeSchedule) =>
          this.data
            .userDeleteFeeSchedule({
              feeScheduleId: feeSchedule.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/fee-schedules'])
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

