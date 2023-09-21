
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,PriorMedsToDateStatus } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface PriorMedsToDateStatusDetailState {
  errors ?: any
  loading?: boolean
  item?: PriorMedsToDateStatus
}

@Injectable()
export class WebPriorMedsToDateStatusDetailStore extends ComponentStore<PriorMedsToDateStatusDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadPriorMedsToDateStatusEffect(route.params.pipe(pluck('priorMedsToDateStatusId')))
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
{ label: 'Prior Meds to Dates', value: item?.priorMedsToDates },
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

  readonly loadPriorMedsToDateStatusEffect = this.effect<string>((priorMedsToDateStatusId$) =>
    priorMedsToDateStatusId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((priorMedsToDateStatusId) =>
        this.data.userPriorMedsToDateStatus({ priorMedsToDateStatusId }).pipe(
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

  readonly deletePriorMedsToDateStatusEffect = this.effect<PriorMedsToDateStatus>(
    (priorMedsToDateStatus$) =>
      priorMedsToDateStatus$.pipe(
        switchMap((priorMedsToDateStatus) =>
          this.data
            .userDeletePriorMedsToDateStatus({
              priorMedsToDateStatusId: priorMedsToDateStatus.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/prior-meds-to-date-statuses'])
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

