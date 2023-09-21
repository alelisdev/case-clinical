
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Location } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface LocationDetailState {
  errors ?: any
  loading?: boolean
  item?: Location
}

@Injectable()
export class WebLocationDetailStore extends ComponentStore<LocationDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadLocationEffect(route.params.pipe(pluck('locationId')))
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
{ label: 'Location Name', value: item?.locationName },
{ label: 'Line 1', value: item?.line1 },
{ label: 'Line 2', value: item?.line2 },
{ label: 'City', value: item?.city },
{ label: 'State', value: item?.state },
{ label: 'Postal Code', value: item?.postalCode },
{ label: 'Latitude', value: item?.latitude },
{ label: 'Longitude', value: item?.longitude },
{ label: 'Abbrev', value: item?.abbrev },
{ label: 'Division', value: item?.division },
{ label: 'Country', value: item?.country },
{ label: 'Office Phone', value: item?.officePhone },
{ label: 'Fax', value: item?.fax },
{ label: 'Attention to', value: item?.attentionTo },

{ label: 'Provider Locations', value: item?.providerLocations },
{ label: 'Vendor Location', value: item?.vendorLocation },
{ label: 'Case Accounts', value: item?.caseAccounts },
{ label: 'Case Procedures', value: item?.caseProcedures },
{ label: 'Appointments', value: item?.appointments },
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

  readonly loadLocationEffect = this.effect<string>((locationId$) =>
    locationId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((locationId) =>
        this.data.userLocation({ locationId }).pipe(
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

  readonly deleteLocationEffect = this.effect<Location>(
    (location$) =>
      location$.pipe(
        switchMap((location) =>
          this.data
            .userDeleteLocation({
              locationId: location.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/locations'])
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

