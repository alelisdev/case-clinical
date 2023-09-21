
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Manufacturer } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ManufacturerDetailState {
  errors ?: any
  loading?: boolean
  item?: Manufacturer
}

@Injectable()
export class WebManufacturerDetailStore extends ComponentStore<ManufacturerDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadManufacturerEffect(route.params.pipe(pluck('manufacturerId')))
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
{ label: 'Primary Phone Number', value: item?.primaryPhoneNumber },
{ label: 'Primary Email Address', value: item?.primaryEmailAddress },
{ label: 'Primary Address Line 1', value: item?.primaryAddressLine1 },
{ label: 'Primary Address Line 2', value: item?.primaryAddressLine2 },
{ label: 'Primary Address City', value: item?.primaryAddressCity },
{ label: 'Primary Address State or Province', value: item?.primaryAddressStateOrProvince },
{ label: 'Primary Address Postal Code', value: item?.primaryAddressPostalCode },
{ label: 'Notes', value: item?.notes },
{ label: 'Implants', value: item?.implants },
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

  readonly loadManufacturerEffect = this.effect<string>((manufacturerId$) =>
    manufacturerId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((manufacturerId) =>
        this.data.userManufacturer({ manufacturerId }).pipe(
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

  readonly deleteManufacturerEffect = this.effect<Manufacturer>(
    (manufacturer$) =>
      manufacturer$.pipe(
        switchMap((manufacturer) =>
          this.data
            .userDeleteManufacturer({
              manufacturerId: manufacturer.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/manufacturers'])
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

