
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,User } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface UserDetailState {
  errors ?: any
  loading?: boolean
  item?: User
}

@Injectable()
export class UserDetailStore extends ComponentStore<UserDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadUserEffect(route.params.pipe(pluck('userId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Developer', value: item?.developer },
{ label: 'Username', value: item?.username },
{ label: 'Password', value: item?.password },
{ label: 'First Name', value: item?.firstName },
{ label: 'Last Name', value: item?.lastName },
{ label: 'Avatar Url', value: item?.avatarUrl },
{ label: 'Line 1', value: item?.line1 },
{ label: 'Line 2', value: item?.line2 },
{ label: 'City', value: item?.city },
{ label: 'State', value: item?.state },
{ label: 'Postal Code', value: item?.postalCode },
{ label: 'Phone', value: item?.phone },
{ label: 'Bio', value: item?.bio },
{ label: 'Slug', value: item?.slug },
{ label: 'Date Of Birth', value: item?.dateOfBirth },
{ label: 'Cell Phone', value: item?.cellPhone },
{ label: 'Education', value: item?.education },
{ label: 'Weather Zip', value: item?.weatherZip },
//{f.name}
{ label: 'Settings', value: item?.settings },
{ label: 'User Roles', value: item?.userRoles },
{ label: 'Case Notes', value: item?.caseNotes },
{ label: 'Intakes', value: item?.intakes },
{ label: 'Team Users', value: item?.teamUsers },
{ label: 'Emails', value: item?.emails },
{ label: 'User Calendars', value: item?.userCalendars },
{ label: 'Task Items', value: item?.taskItems },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      url: 'details',
      data: item,
    },
    
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }))
  readonly loadUserEffect = this.effect<string>((userId$) =>
    userId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((userId) =>
        this.data.userUser({ userId }).pipe(
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

  readonly deleteUserEffect = this.effect<User>(
    (user$) =>
      user$.pipe(
        switchMap((user) =>
          this.data
            .userDeleteUser({
              userId: user.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/users']),
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

