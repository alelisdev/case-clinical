
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateReconciliationPeriodTypeInput, WebCoreDataAccessService, ReconciliationPeriodType,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ReconciliationPeriodTypeService } from '@case-clinical/web/reconciliation-period-type/shared'

export interface ReconciliationPeriodTypeCreateState {
  errors?: any
  loading?: boolean
  item?: ReconciliationPeriodType,

  searchTerm?: string
}

@Injectable()
export class WebReconciliationPeriodTypeCreateStore extends ComponentStore<ReconciliationPeriodTypeCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly reconciliationPeriodTypeService: ReconciliationPeriodTypeService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 

    (errors, loading, item,  ) => ({
    errors,
    loading,
    item,

  }),
{debounce: true})





    

  readonly createReconciliationPeriodTypeEffect = this.effect<UserCreateReconciliationPeriodTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.reconciliationPeriodTypeService.createReconciliationPeriodType({...input}).pipe(
          tapResponse(
            (reconciliationPeriodType: ReconciliationPeriodType) => {
              this.patchState({ item: reconciliationPeriodType, loading: false })
              return this.router.navigate(['..', reconciliationPeriodType?.id], {relativeTo: this.route})
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
