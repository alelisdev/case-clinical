
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Vendor } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface VendorDetailState {
  errors ?: any
  loading?: boolean
  item?: Vendor
}

@Injectable()
export class WebVendorDetailStore extends ComponentStore<VendorDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadVendorEffect(route.params.pipe(pluck('vendorId')))
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

{ label: 'Line 1', value: item?.line1 },
{ label: 'City', value: item?.city },
{ label: 'State', value: item?.state },
{ label: 'Postal Code', value: item?.postalCode },
{ label: 'Email Address', value: item?.emailAddress },
{ label: 'Phone Number', value: item?.phoneNumber },
{ label: 'Fax', value: item?.fax },
{ label: 'Mailing Address', value: item?.mailingAddress },

{ label: 'Contracts', value: item?.contracts },
{ label: 'Line 2', value: item?.line2 },
{ label: 'Country', value: item?.country },
{ label: 'Office', value: item?.office },
{ label: 'Email', value: item?.email },
{ label: 'Website', value: item?.website },
{ label: 'Contact Person', value: item?.contactPerson },
{ label: 'Owner', value: item?.owner },
{ label: 'Bank Routing Number', value: item?.bankRoutingNumber },
{ label: 'Bank Account Number', value: item?.bankAccountNumber },
{ label: 'Bank Name', value: item?.bankName },
{ label: 'Bank City', value: item?.bankCity },
{ label: 'Bank State', value: item?.bankState },
{ label: 'Bank Zip', value: item?.bankZip },
{ label: 'Notes', value: item?.notes },
{ label: 'Agreement Details', value: item?.agreementDetails },
{ label: 'Provider Search Name Display Type', value: item?.providerSearchNameDisplayType },

{ label: 'Assigned Documents', value: item?.assignedDocuments },

{ label: 'Cellphone', value: item?.cellphone },
{ label: 'Ach Check or Wire', value: item?.achCheckOrWire },
{ label: 'Reduction Notes', value: item?.reductionNotes },
{ label: 'Latitude', value: item?.latitude },
{ label: 'Longitude', value: item?.longitude },
{ label: 'Business Central Name', value: item?.businessCentralName },
{ label: 'Case Accounts', value: item?.caseAccounts },
{ label: 'Procedure Vendors', value: item?.procedureVendors },
{ label: 'Durable Medical Equipments', value: item?.durableMedicalEquipments },
{ label: 'Vendor Locations', value: item?.vendorLocations },
{ label: 'Clinical Providers', value: item?.clinicalProviders },
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

  readonly loadVendorEffect = this.effect<string>((vendorId$) =>
    vendorId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((vendorId) =>
        this.data.userVendor({ vendorId }).pipe(
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

  readonly deleteVendorEffect = this.effect<Vendor>(
    (vendor$) =>
      vendor$.pipe(
        switchMap((vendor) =>
          this.data
            .userDeleteVendor({
              vendorId: vendor.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/vendors'])
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

