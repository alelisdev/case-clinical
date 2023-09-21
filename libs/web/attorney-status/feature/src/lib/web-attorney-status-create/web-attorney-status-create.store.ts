
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateAttorneyStatusInput, WebCoreDataAccessService, AttorneyStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AttorneyStatusService } from '@case-clinical/web/attorney-status/shared'

export interface AttorneyStatusCreateState {
  errors?: any
  loading?: boolean
  item?: AttorneyStatus,

  searchTerm?: string
}

@Injectable()
export class WebAttorneyStatusCreateStore extends ComponentStore<AttorneyStatusCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly attorneyStatusService: AttorneyStatusService
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





    

  readonly createAttorneyStatusEffect = this.effect<UserCreateAttorneyStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.attorneyStatusService.createAttorneyStatus({...input}).pipe(
          tapResponse(
            (attorneyStatus: AttorneyStatus) => {
              this.patchState({ item: attorneyStatus, loading: false })
              return this.router.navigate(['..', attorneyStatus?.id], {relativeTo: this.route})
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
