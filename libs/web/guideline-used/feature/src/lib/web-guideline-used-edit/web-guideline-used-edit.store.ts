
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateGuidelineUsedInput, WebCoreDataAccessService, GuidelineUsed,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { GuidelineUsedService } from '@case-clinical/web/guideline-used/shared'

export interface GuidelineUsedEditState {
  errors?: any
  loading?: boolean
  item?: GuidelineUsed,

  searchTerm?: string
}

@Injectable()
export class WebGuidelineUsedEditStore extends ComponentStore<GuidelineUsedEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly guidelineUsedService: GuidelineUsedService
) {
    super({ loading: false })
    
    this.loadGuidelineUsedEffect(route.params.pipe(map((route) => route?.guidelineUsedId)))
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





  
  readonly loadGuidelineUsedEffect = this.effect<string>((guidelineUsedId$) =>
     guidelineUsedId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((guidelineUsedId) =>
        this.data.userGuidelineUsed({guidelineUsedId}).pipe(
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

  readonly updateGuidelineUsedEffect = this.effect<UserUpdateGuidelineUsedInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.guidelineUsedService.updateGuidelineUsed(input, item?.id).pipe(
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
