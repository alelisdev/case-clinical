
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateCaseStatusInput, WebCoreDataAccessService, CaseStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { CaseStatusService } from '@case-clinical/web/case-status/shared'

export interface CaseStatusCreateState {
  errors?: any
  loading?: boolean
  item?: CaseStatus,

  searchTerm?: string
}

@Injectable()
export class WebCaseStatusCreateStore extends ComponentStore<CaseStatusCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly caseStatusService: CaseStatusService
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





    

  readonly createCaseStatusEffect = this.effect<UserCreateCaseStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.caseStatusService.createCaseStatus({...input}).pipe(
          tapResponse(
            (caseStatus: CaseStatus) => {
              this.patchState({ item: caseStatus, loading: false })
              return this.router.navigate(['..', caseStatus?.id], {relativeTo: this.route})
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
