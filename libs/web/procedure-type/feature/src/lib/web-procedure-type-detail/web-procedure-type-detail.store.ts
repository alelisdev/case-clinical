
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,ProcedureType } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ProcedureTypeDetailState {
  errors ?: any
  loading?: boolean
  item?: ProcedureType
}

@Injectable()
export class WebProcedureTypeDetailStore extends ComponentStore<ProcedureTypeDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadProcedureTypeEffect(route.params.pipe(pluck('procedureTypeId')))
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
{ label: 'Is System', value: item?.isSystem },
{ label: 'Removed', value: item?.removed },
{ label: 'Modality', value: item?.modality },
{ label: 'Case Accounts', value: item?.caseAccounts },
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

  readonly loadProcedureTypeEffect = this.effect<string>((procedureTypeId$) =>
    procedureTypeId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((procedureTypeId) =>
        this.data.userProcedureType({ procedureTypeId }).pipe(
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

  readonly deleteProcedureTypeEffect = this.effect<ProcedureType>(
    (procedureType$) =>
      procedureType$.pipe(
        switchMap((procedureType) =>
          this.data
            .userDeleteProcedureType({
              procedureTypeId: procedureType.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/procedure-types'])
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

