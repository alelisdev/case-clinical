
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,CaseProcedure } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface CaseProcedureDetailState {
  errors ?: any
  loading?: boolean
  item?: CaseProcedure
}

@Injectable()
export class WebCaseProcedureDetailStore extends ComponentStore<CaseProcedureDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadCaseProcedureEffect(route.params.pipe(pluck('caseProcedureId')))
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



{ label: 'Prior Authorization Requests', value: item?.priorAuthorizationRequests },
{ label: 'Procedure Date', value: item?.procedureDate },
{ label: 'Cost', value: item?.cost },
{ label: 'Notes', value: item?.notes },
{ label: 'Created by', value: item?.createdBy },
{ label: 'Date Created', value: item?.dateCreated },
{ label: 'Removed', value: item?.removed },
{ label: 'Approved Date', value: item?.approvedDate },
{ label: 'Procedure Reason Name', value: item?.procedureReasonName },
{ label: 'Decision Date', value: item?.decisionDate },
{ label: 'Next Action Date', value: item?.nextActionDate },
{ label: 'Procedure Vendors', value: item?.procedureVendors },
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

  readonly loadCaseProcedureEffect = this.effect<string>((caseProcedureId$) =>
    caseProcedureId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((caseProcedureId) =>
        this.data.userCaseProcedure({ caseProcedureId }).pipe(
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

  readonly deleteCaseProcedureEffect = this.effect<CaseProcedure>(
    (caseProcedure$) =>
      caseProcedure$.pipe(
        switchMap((caseProcedure) =>
          this.data
            .userDeleteCaseProcedure({
              caseProcedureId: caseProcedure.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/case-procedures'])
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

