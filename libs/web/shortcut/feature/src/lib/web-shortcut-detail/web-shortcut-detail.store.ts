
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Shortcut } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'

export interface ShortcutDetailState {
  errors ?: any
  loading?: boolean
  item?: Shortcut
}

@Injectable()
export class WebShortcutDetailStore extends ComponentStore<ShortcutDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
) {
    super({ loading: false })
    this.loadShortcutEffect(route.params.pipe(pluck('shortcutId')))
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
{ label: 'Label', value: item?.label },
{ label: 'Description', value: item?.description },
{ label: 'Icon', value: item?.icon },
{ label: 'Link', value: item?.link },
{ label: 'Use Router', value: item?.useRouter },

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

  readonly loadShortcutEffect = this.effect<string>((shortcutId$) =>
    shortcutId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((shortcutId) =>
        this.data.userShortcut({ shortcutId }).pipe(
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

  readonly deleteShortcutEffect = this.effect<Shortcut>(
    (shortcut$) =>
      shortcut$.pipe(
        switchMap((shortcut) =>
          this.data
            .userDeleteShortcut({
              shortcutId: shortcut.id,
            })
            .pipe(
              tapResponse(
                (res) => this.router.navigate(['/queues/shortcuts']),
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

