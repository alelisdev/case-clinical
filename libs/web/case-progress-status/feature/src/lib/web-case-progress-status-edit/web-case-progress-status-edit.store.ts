
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateCaseProgressStatusInput, WebCoreDataAccessService, CaseProgressStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { CaseProgressStatusService } from '@case-clinical/web/case-progress-status/shared'

export interface CaseProgressStatusEditState {
  errors?: any
  loading?: boolean
  item?: CaseProgressStatus,

  searchTerm?: string
}

@Injectable()
export class WebCaseProgressStatusEditStore extends ComponentStore<CaseProgressStatusEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly caseProgressStatusService: CaseProgressStatusService
) {
    super({ loading: false })
    
    this.loadCaseProgressStatusEffect(route.params.pipe(map((route) => route?.caseProgressStatusId)))
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





  
  readonly loadCaseProgressStatusEffect = this.effect<string>((caseProgressStatusId$) =>
     caseProgressStatusId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((caseProgressStatusId) =>
        this.data.userCaseProgressStatus({caseProgressStatusId}).pipe(
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

  readonly updateCaseProgressStatusEffect = this.effect<UserUpdateCaseProgressStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.caseProgressStatusService.updateCaseProgressStatus(input, item?.id).pipe(
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
