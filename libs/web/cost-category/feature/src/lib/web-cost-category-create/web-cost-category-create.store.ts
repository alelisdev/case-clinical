
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateCostCategoryInput, WebCoreDataAccessService, CostCategory,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { CostCategoryService } from '@case-clinical/web/cost-category/shared'

export interface CostCategoryCreateState {
  errors?: any
  loading?: boolean
  item?: CostCategory,

  searchTerm?: string
}

@Injectable()
export class WebCostCategoryCreateStore extends ComponentStore<CostCategoryCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly costCategoryService: CostCategoryService
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





    

  readonly createCostCategoryEffect = this.effect<UserCreateCostCategoryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.costCategoryService.createCostCategory({...input}).pipe(
          tapResponse(
            (costCategory: CostCategory) => {
              this.patchState({ item: costCategory, loading: false })
              return this.router.navigate(['..', costCategory?.id], {relativeTo: this.route})
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
