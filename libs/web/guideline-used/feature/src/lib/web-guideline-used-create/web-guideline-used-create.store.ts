
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateGuidelineUsedInput, WebCoreDataAccessService, GuidelineUsed,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { GuidelineUsedService } from '@case-clinical/web/guideline-used/shared'

export interface GuidelineUsedCreateState {
  errors?: any
  loading?: boolean
  item?: GuidelineUsed,

  searchTerm?: string
}

@Injectable()
export class WebGuidelineUsedCreateStore extends ComponentStore<GuidelineUsedCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly guidelineUsedService: GuidelineUsedService
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





    

  readonly createGuidelineUsedEffect = this.effect<UserCreateGuidelineUsedInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.guidelineUsedService.createGuidelineUsed({...input}).pipe(
          tapResponse(
            (guidelineUsed: GuidelineUsed) => {
              this.patchState({ item: guidelineUsed, loading: false })
              return this.router.navigate(['..', guidelineUsed?.id], {relativeTo: this.route})
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
