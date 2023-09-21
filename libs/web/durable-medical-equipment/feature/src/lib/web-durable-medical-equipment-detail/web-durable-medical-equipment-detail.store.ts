
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,DurableMedicalEquipment } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface DurableMedicalEquipmentDetailState {
  errors ?: any
  loading?: boolean
  item?: DurableMedicalEquipment
}

@Injectable()
export class WebDurableMedicalEquipmentDetailStore extends ComponentStore<DurableMedicalEquipmentDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadDurableMedicalEquipmentEffect(route.params.pipe(pluck('durableMedicalEquipmentId')))
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
{ label: 'Item Code', value: item?.itemCode },

{ label: 'Size', value: item?.size },
{ label: 'Brand', value: item?.brand },
{ label: 'Item URL', value: item?.itemURL },
{ label: 'Estimated Cost', value: item?.estimatedCost },
{ label: 'Prior Auth Dmes', value: item?.priorAuthDmes },
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

  readonly loadDurableMedicalEquipmentEffect = this.effect<string>((durableMedicalEquipmentId$) =>
    durableMedicalEquipmentId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((durableMedicalEquipmentId) =>
        this.data.userDurableMedicalEquipment({ durableMedicalEquipmentId }).pipe(
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

  readonly deleteDurableMedicalEquipmentEffect = this.effect<DurableMedicalEquipment>(
    (durableMedicalEquipment$) =>
      durableMedicalEquipment$.pipe(
        switchMap((durableMedicalEquipment) =>
          this.data
            .userDeleteDurableMedicalEquipment({
              durableMedicalEquipmentId: durableMedicalEquipment.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/durable-medical-equipments'])
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

