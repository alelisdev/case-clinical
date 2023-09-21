
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Email } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface EmailDetailState {
  errors ?: any
  loading?: boolean
  item?: Email
}

@Injectable()
export class WebEmailDetailStore extends ComponentStore<EmailDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadEmailEffect(route.params.pipe(pluck('emailId')))
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
{ label: 'Email', value: item?.email },
{ label: 'Is Public', value: item?.isPublic },
{ label: 'Primary', value: item?.primary },
{ label: 'Verified', value: item?.verified },
{ label: 'Verify Token', value: item?.verifyToken },
{ label: 'Verify Expires', value: item?.verifyExpires },
//{f.name}
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

  readonly loadEmailEffect = this.effect<string>((emailId$) =>
    emailId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((emailId) =>
        this.data.userEmail({ emailId }).pipe(
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

  readonly deleteEmailEffect = this.effect<Email>(
    (email$) =>
      email$.pipe(
        switchMap((email) =>
          this.data
            .userDeleteEmail({
              emailId: email.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/emails']),
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

