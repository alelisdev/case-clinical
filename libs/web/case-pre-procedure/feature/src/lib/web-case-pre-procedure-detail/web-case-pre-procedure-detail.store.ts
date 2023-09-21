
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,CasePreProcedure } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface CasePreProcedureDetailState {
  errors ?: any
  loading?: boolean
  item?: CasePreProcedure
}

@Injectable()
export class WebCasePreProcedureDetailStore extends ComponentStore<CasePreProcedureDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadCasePreProcedureEffect(route.params.pipe(pluck('casePreProcedureId')))
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

{ label: 'Procedure Type', value: item?.procedureType },
{ label: 'Procedure Date', value: item?.procedureDate },
{ label: 'Date Created', value: item?.dateCreated },
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

  readonly loadCasePreProcedureEffect = this.effect<string>((casePreProcedureId$) =>
    casePreProcedureId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((casePreProcedureId) =>
        this.data.userCasePreProcedure({ casePreProcedureId }).pipe(
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

  readonly deleteCasePreProcedureEffect = this.effect<CasePreProcedure>(
    (casePreProcedure$) =>
      casePreProcedure$.pipe(
        switchMap((casePreProcedure) =>
          this.data
            .userDeleteCasePreProcedure({
              casePreProcedureId: casePreProcedure.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/case-pre-procedures'])
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

