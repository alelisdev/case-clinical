
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,BatchControl } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface BatchControlDetailState {
  errors ?: any
  loading?: boolean
  item?: BatchControl
}

@Injectable()
export class WebBatchControlDetailStore extends ComponentStore<BatchControlDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadBatchControlEffect(route.params.pipe(pluck('batchControlId')))
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
{ label: 'Tracking Number', value: item?.trackingNumber },
{ label: 'Batch Total', value: item?.batchTotal },
{ label: 'Default GL Code', value: item?.defaultGLCode },
{ label: 'Posted', value: item?.posted },
{ label: 'Payments', value: item?.payments },
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

  readonly loadBatchControlEffect = this.effect<string>((batchControlId$) =>
    batchControlId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((batchControlId) =>
        this.data.userBatchControl({ batchControlId }).pipe(
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

  readonly deleteBatchControlEffect = this.effect<BatchControl>(
    (batchControl$) =>
      batchControl$.pipe(
        switchMap((batchControl) =>
          this.data
            .userDeleteBatchControl({
              batchControlId: batchControl.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/batch-controls'])
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

