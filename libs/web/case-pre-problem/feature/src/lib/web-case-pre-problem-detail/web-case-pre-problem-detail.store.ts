
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,CasePreProblem } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface CasePreProblemDetailState {
  errors ?: any
  loading?: boolean
  item?: CasePreProblem
}

@Injectable()
export class WebCasePreProblemDetailStore extends ComponentStore<CasePreProblemDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadCasePreProblemEffect(route.params.pipe(pluck('casePreProblemId')))
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

{ label: 'Same Region', value: item?.sameRegion },
{ label: 'Problem Date', value: item?.problemDate },
{ label: 'Duration', value: item?.duration },
{ label: 'Symptoms', value: item?.symptoms },
{ label: 'Regions', value: item?.regions },
{ label: 'Removed', value: item?.removed },
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

  readonly loadCasePreProblemEffect = this.effect<string>((casePreProblemId$) =>
    casePreProblemId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((casePreProblemId) =>
        this.data.userCasePreProblem({ casePreProblemId }).pipe(
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

  readonly deleteCasePreProblemEffect = this.effect<CasePreProblem>(
    (casePreProblem$) =>
      casePreProblem$.pipe(
        switchMap((casePreProblem) =>
          this.data
            .userDeleteCasePreProblem({
              casePreProblemId: casePreProblem.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/case-pre-problems'])
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

