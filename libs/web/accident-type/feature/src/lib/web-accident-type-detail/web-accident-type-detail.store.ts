
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,AccidentType } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { Ng7DynamicBreadcrumbService } from '@case-clinical/web/ui/breadcrumbs'

export interface AccidentTypeDetailState {
  errors ?: any
  loading?: boolean
  item?: AccidentType
}

@Injectable()
export class WebAccidentTypeDetailStore extends ComponentStore<AccidentTypeDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private breadcrumbService: Ng7DynamicBreadcrumbService,

    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadAccidentTypeEffect(route.params.pipe(pluck('accidentTypeId')))
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
{ label: 'Legal Cases', value: item?.legalCases },
{ label: 'Required Fields', value: item?.requiredFields },
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

  readonly loadAccidentTypeEffect = this.effect<string>((accidentTypeId$) =>
    accidentTypeId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((accidentTypeId) =>
        this.data.userAccidentType({ accidentTypeId }).pipe(
          tapResponse(
            (res) => {
              this.breadcrumbService.updateBreadcrumb([
                {
                  name: 'Accident Types',
                  path: '/queues/accident-types',
                },
                {
                  name: res.data.item.name,
                  path: `/queues/accident-types/${res.data?.item?.id}/details/overview`,
                },
              ])
              return this.patchState({ item: res.data.item, errors: res.errors, loading: false })
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

  readonly deleteAccidentTypeEffect = this.effect<AccidentType>(
    (accidentType$) =>
      accidentType$.pipe(
        switchMap((accidentType) =>
          this.data
            .userDeleteAccidentType({
              accidentTypeId: accidentType.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/accident-types'])
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

