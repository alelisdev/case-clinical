
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateReconciliationPeriodTypeInput, WebCoreDataAccessService, ReconciliationPeriodType,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ReconciliationPeriodTypeService } from '@case-clinical/web/reconciliation-period-type/shared'

export interface ReconciliationPeriodTypeEditState {
  errors?: any
  loading?: boolean
  item?: ReconciliationPeriodType,

  searchTerm?: string
}

@Injectable()
export class WebReconciliationPeriodTypeEditStore extends ComponentStore<ReconciliationPeriodTypeEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly reconciliationPeriodTypeService: ReconciliationPeriodTypeService
) {
    super({ loading: false })
    
    this.loadReconciliationPeriodTypeEffect(route.params.pipe(map((route) => route?.reconciliationPeriodTypeId)))
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





  
  readonly loadReconciliationPeriodTypeEffect = this.effect<string>((reconciliationPeriodTypeId$) =>
     reconciliationPeriodTypeId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((reconciliationPeriodTypeId) =>
        this.data.userReconciliationPeriodType({reconciliationPeriodTypeId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updateReconciliationPeriodTypeEffect = this.effect<UserUpdateReconciliationPeriodTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.reconciliationPeriodTypeService.updateReconciliationPeriodType(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
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
