
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateProcedureStatusInput, WebCoreDataAccessService, ProcedureStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ProcedureStatusService } from '@case-clinical/web/procedure-status/shared'

export interface ProcedureStatusCreateState {
  errors?: any
  loading?: boolean
  item?: ProcedureStatus,

  searchTerm?: string
}

@Injectable()
export class WebProcedureStatusCreateStore extends ComponentStore<ProcedureStatusCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureStatusService: ProcedureStatusService
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







  readonly createProcedureStatusEffect = this.effect<UserCreateProcedureStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.procedureStatusService.createProcedureStatus({...input}).pipe(
          tapResponse(
            (procedureStatus: ProcedureStatus) => {
              this.patchState({ item: procedureStatus, loading: false })
              return this.router.navigate(['..', procedureStatus?.id], {relativeTo: this.route})
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
