
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,PriorMedsToDate } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface PriorMedsToDateDetailState {
  errors ?: any
  loading?: boolean
  item?: PriorMedsToDate
}

@Injectable()
export class WebPriorMedsToDateDetailStore extends ComponentStore<PriorMedsToDateDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadPriorMedsToDateEffect(route.params.pipe(pluck('priorMedsToDateId')))
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


{ label: 'Quantity', value: item?.quantity },
{ label: 'Amount', value: item?.amount },
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

  readonly loadPriorMedsToDateEffect = this.effect<string>((priorMedsToDateId$) =>
    priorMedsToDateId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((priorMedsToDateId) =>
        this.data.userPriorMedsToDate({ priorMedsToDateId }).pipe(
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

  readonly deletePriorMedsToDateEffect = this.effect<PriorMedsToDate>(
    (priorMedsToDate$) =>
      priorMedsToDate$.pipe(
        switchMap((priorMedsToDate) =>
          this.data
            .userDeletePriorMedsToDate({
              priorMedsToDateId: priorMedsToDate.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/prior-meds-to-dates'])
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

