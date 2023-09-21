
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Contact } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ContactDetailState {
  errors ?: any
  loading?: boolean
  item?: Contact
}

@Injectable()
export class WebContactDetailStore extends ComponentStore<ContactDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadContactEffect(route.params.pipe(pluck('contactId')))
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
{ label: 'Honorific', value: item?.honorific },
{ label: 'First Name', value: item?.firstName },
{ label: 'Last Name', value: item?.lastName },
{ label: 'Suffix', value: item?.suffix },
{ label: 'Primary Phone Number', value: item?.primaryPhoneNumber },
{ label: 'Primary Email Address', value: item?.primaryEmailAddress },
{ label: 'Primary Address Line 1', value: item?.primaryAddressLine1 },
{ label: 'Primary Address Line 2', value: item?.primaryAddressLine2 },
{ label: 'Primary Address City', value: item?.primaryAddressCity },
{ label: 'Primary Address State or Province', value: item?.primaryAddressStateOrProvince },
{ label: 'Primary Address Postal Code', value: item?.primaryAddressPostalCode },
{ label: 'Notes', value: item?.notes },
{ label: 'Discriminator', value: item?.discriminator },

{ label: 'Date of Birth', value: item?.dateOfBirth },
{ label: 'Latitude', value: item?.latitude },
{ label: 'Longitude', value: item?.longitude },
{ label: 'Implants', value: item?.implants },
{ label: 'Avatar', value: item?.avatar },
{ label: 'Background', value: item?.background },
{ label: 'Title', value: item?.title },
{ label: 'Company', value: item?.company },
{ label: 'Birthday', value: item?.birthday },
{ label: 'Address', value: item?.address },
{ label: 'Tags', value: item?.tags },
{ label: 'Emails', value: item?.emails },
{ label: 'Phone Numbers', value: item?.phoneNumbers },
{ label: 'Contact Settings', value: item?.contactSettings },
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

  readonly loadContactEffect = this.effect<string>((contactId$) =>
    contactId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((contactId) =>
        this.data.userContact({ contactId }).pipe(
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

  readonly deleteContactEffect = this.effect<Contact>(
    (contact$) =>
      contact$.pipe(
        switchMap((contact) =>
          this.data
            .userDeleteContact({
              contactId: contact.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/contacts'])
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

