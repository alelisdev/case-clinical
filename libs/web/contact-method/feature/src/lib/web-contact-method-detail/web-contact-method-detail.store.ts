
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,ContactMethod } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface ContactMethodDetailState {
  errors ?: any
  loading?: boolean
  item?: ContactMethod
}

@Injectable()
export class WebContactMethodDetailStore extends ComponentStore<ContactMethodDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadContactMethodEffect(route.params.pipe(pluck('contactMethodId')))
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
{ label: 'Firms', value: item?.firms },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
    { label: 'Firm', path: 'firm', data: item?.firms }
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadContactMethodEffect = this.effect<string>((contactMethodId$) =>
    contactMethodId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((contactMethodId) =>
        this.data.userContactMethod({ contactMethodId }).pipe(
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

  readonly deleteContactMethodEffect = this.effect<ContactMethod>(
    (contactMethod$) =>
      contactMethod$.pipe(
        switchMap((contactMethod) =>
          this.data
            .userDeleteContactMethod({
              contactMethodId: contactMethod.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/contact-methods']),
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

