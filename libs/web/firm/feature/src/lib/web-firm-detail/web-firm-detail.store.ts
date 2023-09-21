
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Firm } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface FirmDetailState {
  errors ?: any
  loading?: boolean
  item?: Firm
}

@Injectable()
export class WebFirmDetailStore extends ComponentStore<FirmDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadFirmEffect(route.params.pipe(pluck('firmId')))
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
{ label: 'Firm Status Note', value: item?.firmStatusNote },

{ label: 'Firm Name', value: item?.firmName },
{ label: 'Address', value: item?.address },
{ label: 'Address 2', value: item?.address2 },
{ label: 'City', value: item?.city },
{ label: 'State', value: item?.state },
{ label: 'Zip', value: item?.zip },
{ label: 'Country', value: item?.country },
{ label: 'Office', value: item?.office },
{ label: 'Fax', value: item?.fax },
{ label: 'Web Address', value: item?.webAddress },
{ label: 'Email', value: item?.email },
{ label: 'Rating', value: item?.rating },
{ label: 'Notes', value: item?.notes },
{ label: 'Do Not Disturb', value: item?.doNotDisturb },
{ label: 'Invoice Only', value: item?.invoiceOnly },
{ label: 'Reduction Notes', value: item?.reductionNotes },
{ label: 'Deceased', value: item?.deceased },
{ label: 'Created by', value: item?.createdBy },
{ label: 'Date Created', value: item?.dateCreated },
{ label: 'Attorneys', value: item?.attorneys },
{ label: 'Legal Cases', value: item?.legalCases },

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

  readonly loadFirmEffect = this.effect<string>((firmId$) =>
    firmId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((firmId) =>
        this.data.userFirm({ firmId }).pipe(
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

  readonly deleteFirmEffect = this.effect<Firm>(
    (firm$) =>
      firm$.pipe(
        switchMap((firm) =>
          this.data
            .userDeleteFirm({
              firmId: firm.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/firms'])
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

