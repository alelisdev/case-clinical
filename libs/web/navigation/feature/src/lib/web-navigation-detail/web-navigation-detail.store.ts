
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Navigation } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface NavigationDetailState {
  errors ?: any
  loading?: boolean
  item?: Navigation
}

@Injectable()
export class WebNavigationDetailStore extends ComponentStore<NavigationDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadNavigationEffect(route.params.pipe(pluck('navigationId')))
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
{ label: 'Subtitle', value: item?.subtitle },
{ label: 'Type', value: item?.type },
{ label: 'Icon', value: item?.icon },
{ label: 'Link', value: item?.link },


{ label: 'Children', value: item?.children },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
    { label: 'Navigation', path: 'navigation', data: item?.children }
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadNavigationEffect = this.effect<string>((navigationId$) =>
    navigationId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((navigationId) =>
        this.data.userNavigation({ navigationId }).pipe(
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

  readonly deleteNavigationEffect = this.effect<Navigation>(
    (navigation$) =>
      navigation$.pipe(
        switchMap((navigation) =>
          this.data
            .userDeleteNavigation({
              navigationId: navigation.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/navigations']),
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

