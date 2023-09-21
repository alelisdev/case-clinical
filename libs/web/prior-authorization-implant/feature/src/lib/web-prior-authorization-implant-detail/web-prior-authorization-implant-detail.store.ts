
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,PriorAuthorizationImplant } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface PriorAuthorizationImplantDetailState {
  errors ?: any
  loading?: boolean
  item?: PriorAuthorizationImplant
}

@Injectable()
export class WebPriorAuthorizationImplantDetailStore extends ComponentStore<PriorAuthorizationImplantDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadPriorAuthorizationImplantEffect(route.params.pipe(pluck('priorAuthorizationImplantId')))
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
{ label: 'Estimated Cost', value: item?.estimatedCost },


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

  readonly loadPriorAuthorizationImplantEffect = this.effect<string>((priorAuthorizationImplantId$) =>
    priorAuthorizationImplantId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((priorAuthorizationImplantId) =>
        this.data.userPriorAuthorizationImplant({ priorAuthorizationImplantId }).pipe(
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

  readonly deletePriorAuthorizationImplantEffect = this.effect<PriorAuthorizationImplant>(
    (priorAuthorizationImplant$) =>
      priorAuthorizationImplant$.pipe(
        switchMap((priorAuthorizationImplant) =>
          this.data
            .userDeletePriorAuthorizationImplant({
              priorAuthorizationImplantId: priorAuthorizationImplant.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/prior-authorization-implants'])
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

