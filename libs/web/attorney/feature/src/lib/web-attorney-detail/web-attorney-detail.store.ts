
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Attorney } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface AttorneyDetailState {
  errors ?: any
  loading?: boolean
  item?: Attorney
}

@Injectable()
export class WebAttorneyDetailStore extends ComponentStore<AttorneyDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadAttorneyEffect(route.params.pipe(pluck('attorneyId')))
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



{ label: 'Title', value: item?.title },
{ label: 'First Name', value: item?.firstName },
{ label: 'Last Name', value: item?.lastName },
{ label: 'Address', value: item?.address },
{ label: 'City', value: item?.city },
{ label: 'State', value: item?.state },
{ label: 'Zip', value: item?.zip },
{ label: 'Email', value: item?.email },
{ label: 'Direct', value: item?.direct },
{ label: 'Fax', value: item?.fax },
{ label: 'Cell Phone', value: item?.cellPhone },
{ label: 'Bar Number', value: item?.barNumber },
{ label: 'Bar State', value: item?.barState },
{ label: 'Do Not Disturb', value: item?.doNotDisturb },
{ label: 'Temp', value: item?.temp },

{ label: 'Date Created', value: item?.dateCreated },
{ label: 'Removed', value: item?.removed },
{ label: 'Mig Source', value: item?.migSource },
{ label: 'Entity', value: item?.entity },
{ label: 'Firm Nolonger Needed', value: item?.firmNolongerNeeded },
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

  readonly loadAttorneyEffect = this.effect<string>((attorneyId$) =>
    attorneyId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((attorneyId) =>
        this.data.userAttorney({ attorneyId }).pipe(
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

  readonly deleteAttorneyEffect = this.effect<Attorney>(
    (attorney$) =>
      attorney$.pipe(
        switchMap((attorney) =>
          this.data
            .userDeleteAttorney({
              attorneyId: attorney.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/attorneys'])
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

