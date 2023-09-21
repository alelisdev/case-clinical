
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdatePriorMedsToDateStatusInput, WebCoreDataAccessService, PriorMedsToDateStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorMedsToDateStatusService } from '@case-clinical/web/prior-meds-to-date-status/shared'

export interface PriorMedsToDateStatusEditState {
  errors?: any
  loading?: boolean
  item?: PriorMedsToDateStatus,

  searchTerm?: string
}

@Injectable()
export class WebPriorMedsToDateStatusEditStore extends ComponentStore<PriorMedsToDateStatusEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorMedsToDateStatusService: PriorMedsToDateStatusService
) {
    super({ loading: false })
    
    this.loadPriorMedsToDateStatusEffect(route.params.pipe(map((route) => route?.priorMedsToDateStatusId)))
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





  
  readonly loadPriorMedsToDateStatusEffect = this.effect<string>((priorMedsToDateStatusId$) =>
     priorMedsToDateStatusId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((priorMedsToDateStatusId) =>
        this.data.userPriorMedsToDateStatus({priorMedsToDateStatusId}).pipe(
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

  readonly updatePriorMedsToDateStatusEffect = this.effect<UserUpdatePriorMedsToDateStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.priorMedsToDateStatusService.updatePriorMedsToDateStatus(input, item?.id).pipe(
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
