
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Lead } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface LeadDetailState {
  errors ?: any
  loading?: boolean
  item?: Lead
}

@Injectable()
export class WebLeadDetailStore extends ComponentStore<LeadDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadLeadEffect(route.params.pipe(pluck('leadId')))
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
{ label: 'First Name', value: item?.firstName },
{ label: 'Middle Name', value: item?.middleName },
{ label: 'Last Name', value: item?.lastName },
{ label: 'Address', value: item?.address },
{ label: 'City', value: item?.city },
{ label: 'State', value: item?.state },
{ label: 'Postal Code', value: item?.postalCode },
{ label: 'Date of Birth', value: item?.dateOfBirth },
{ label: 'Date of Loss', value: item?.dateOfLoss },
{ label: 'Date of Retention', value: item?.dateOfRetention },
{ label: 'Phone Number', value: item?.phoneNumber },
{ label: 'Email Address', value: item?.emailAddress },
{ label: 'Prior Representation', value: item?.priorRepresentation },


{ label: 'Drivers License Number', value: item?.driversLicenseNumber },
{ label: 'Drivers License State', value: item?.driversLicenseState },
{ label: 'Severe Injury', value: item?.severeInjury },
{ label: 'Body Parts Injured', value: item?.bodyPartsInjured },

{ label: 'Allowed to Contact Emergency Contact', value: item?.allowedToContactEmergencyContact },
{ label: 'Police Report', value: item?.policeReport },




{ label: 'Lead Actions', value: item?.leadActions },


{ label: 'Insurances', value: item?.insurances },
{ label: 'Injuries', value: item?.injuries },
{ label: 'Treatments', value: item?.treatments },

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

  readonly loadLeadEffect = this.effect<string>((leadId$) =>
    leadId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((leadId) =>
        this.data.userLead({ leadId }).pipe(
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

  readonly deleteLeadEffect = this.effect<Lead>(
    (lead$) =>
      lead$.pipe(
        switchMap((lead) =>
          this.data
            .userDeleteLead({
              leadId: lead.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/leads'])
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

