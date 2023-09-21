
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateProcedureStatusInput, WebCoreDataAccessService, ProcedureStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ProcedureStatusService } from '@case-clinical/web/procedure-status/shared'

export interface ProcedureStatusEditState {
  errors?: any
  loading?: boolean
  item?: ProcedureStatus,

  searchTerm?: string
}

@Injectable()
export class WebProcedureStatusEditStore extends ComponentStore<ProcedureStatusEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly procedureStatusService: ProcedureStatusService
) {
    super({ loading: false })

    this.loadProcedureStatusEffect(route.params.pipe(map((route) => route?.procedureStatusId)))
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






  readonly loadProcedureStatusEffect = this.effect<string>((procedureStatusId$) =>
     procedureStatusId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((procedureStatusId) =>
        this.data.userProcedureStatus({procedureStatusId}).pipe(
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

  readonly updateProcedureStatusEffect = this.effect<UserUpdateProcedureStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.procedureStatusService.updateProcedureStatus(input, item?.id).pipe(
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
