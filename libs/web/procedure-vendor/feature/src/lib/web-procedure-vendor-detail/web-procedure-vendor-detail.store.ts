
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,ProcedureVendor } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ProcedureVendorDetailState {
  errors ?: any
  loading?: boolean
  item?: ProcedureVendor
}

@Injectable()
export class WebProcedureVendorDetailStore extends ComponentStore<ProcedureVendorDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadProcedureVendorEffect(route.params.pipe(pluck('procedureVendorId')))
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




{ label: 'Estimate', value: item?.estimate },
{ label: 'Funding Approved', value: item?.fundingApproved },
{ label: 'Case Accounts', value: item?.caseAccounts },
{ label: 'Documents', value: item?.documents },
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

  readonly loadProcedureVendorEffect = this.effect<string>((procedureVendorId$) =>
    procedureVendorId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((procedureVendorId) =>
        this.data.userProcedureVendor({ procedureVendorId }).pipe(
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

  readonly deleteProcedureVendorEffect = this.effect<ProcedureVendor>(
    (procedureVendor$) =>
      procedureVendor$.pipe(
        switchMap((procedureVendor) =>
          this.data
            .userDeleteProcedureVendor({
              procedureVendorId: procedureVendor.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/procedure-vendors'])
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

