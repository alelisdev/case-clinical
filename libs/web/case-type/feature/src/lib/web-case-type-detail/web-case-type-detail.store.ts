
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,CaseType } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface CaseTypeDetailState {
  errors ?: any
  loading?: boolean
  item?: CaseType
}

@Injectable()
export class WebCaseTypeDetailStore extends ComponentStore<CaseTypeDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadCaseTypeEffect(route.params.pipe(pluck('caseTypeId')))
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
{ label: 'Order Index', value: item?.orderIndex },
{ label: 'Date Created', value: item?.dateCreated },
{ label: 'Removed', value: item?.removed },
{ label: 'Mig Source', value: item?.migSource },
{ label: 'Entity', value: item?.entity },
{ label: 'Temp', value: item?.temp },
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

  readonly loadCaseTypeEffect = this.effect<string>((caseTypeId$) =>
    caseTypeId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((caseTypeId) =>
        this.data.userCaseType({ caseTypeId }).pipe(
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

  readonly deleteCaseTypeEffect = this.effect<CaseType>(
    (caseType$) =>
      caseType$.pipe(
        switchMap((caseType) =>
          this.data
            .userDeleteCaseType({
              caseTypeId: caseType.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/case-types'])
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
