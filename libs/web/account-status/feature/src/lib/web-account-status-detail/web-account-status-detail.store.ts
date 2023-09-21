
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,AccountStatus } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { Ng7DynamicBreadcrumbService } from '@case-clinical/web/ui/breadcrumbs'

export interface AccountStatusDetailState {
  errors ?: any
  loading?: boolean
  item?: AccountStatus
}

@Injectable()
export class WebAccountStatusDetailStore extends ComponentStore<AccountStatusDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private breadcrumbService: Ng7DynamicBreadcrumbService,

    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadAccountStatusEffect(route.params.pipe(pluck('accountStatusId')))
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
{ label: 'Case Accounts', value: item?.caseAccounts },
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

  readonly loadAccountStatusEffect = this.effect<string>((accountStatusId$) =>
    accountStatusId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((accountStatusId) =>
        this.data.userAccountStatus({ accountStatusId }).pipe(
          tapResponse(
            (res) =>{
              this.breadcrumbService.updateBreadcrumb([
                {
                  name: 'Account Statuses',
                  path: '/queues/account-statuses',
                },
                {
                  name: res.data.item.name,
                  path: `/queues/account-statuses/${res.data?.item?.id}/details/overview`,
                },
              ])
              return this.patchState({ item: res.data.item, errors: res.errors, loading: false })},
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

  readonly deleteAccountStatusEffect = this.effect<AccountStatus>(
    (accountStatus$) =>
      accountStatus$.pipe(
        switchMap((accountStatus) =>
          this.data
            .userDeleteAccountStatus({
              accountStatusId: accountStatus.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/account-statuses'])
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

