
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,UserFeaturePermission } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface UserFeaturePermissionDetailState {
  errors ?: any
  loading?: boolean
  item?: UserFeaturePermission
}

@Injectable()
export class WebUserFeaturePermissionDetailStore extends ComponentStore<UserFeaturePermissionDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadUserFeaturePermissionEffect(route.params.pipe(pluck('userFeaturePermissionId')))
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

  readonly loadUserFeaturePermissionEffect = this.effect<string>((userFeaturePermissionId$) =>
    userFeaturePermissionId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((userFeaturePermissionId) =>
        this.data.userUserFeaturePermission({ userFeaturePermissionId }).pipe(
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

  readonly deleteUserFeaturePermissionEffect = this.effect<UserFeaturePermission>(
    (userFeaturePermission$) =>
      userFeaturePermission$.pipe(
        switchMap((userFeaturePermission) =>
          this.data
            .userDeleteUserFeaturePermission({
              userFeaturePermissionId: userFeaturePermission.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/user-feature-permissions']),
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

