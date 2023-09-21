
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,PriorAuthorizationEquipment } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface PriorAuthorizationEquipmentDetailState {
  errors ?: any
  loading?: boolean
  item?: PriorAuthorizationEquipment
}

@Injectable()
export class WebPriorAuthorizationEquipmentDetailStore extends ComponentStore<PriorAuthorizationEquipmentDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadPriorAuthorizationEquipmentEffect(route.params.pipe(pluck('priorAuthorizationEquipmentId')))
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

  readonly loadPriorAuthorizationEquipmentEffect = this.effect<string>((priorAuthorizationEquipmentId$) =>
    priorAuthorizationEquipmentId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((priorAuthorizationEquipmentId) =>
        this.data.userPriorAuthorizationEquipment({ priorAuthorizationEquipmentId }).pipe(
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

  readonly deletePriorAuthorizationEquipmentEffect = this.effect<PriorAuthorizationEquipment>(
    (priorAuthorizationEquipment$) =>
      priorAuthorizationEquipment$.pipe(
        switchMap((priorAuthorizationEquipment) =>
          this.data
            .userDeletePriorAuthorizationEquipment({
              priorAuthorizationEquipmentId: priorAuthorizationEquipment.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/prior-authorization-equipments'])
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

