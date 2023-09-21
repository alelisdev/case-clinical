
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateWriteOffStatusInput, WebCoreDataAccessService, WriteOffStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { WriteOffStatusService } from '@case-clinical/web/write-off-status/shared'

export interface WriteOffStatusCreateState {
  errors?: any
  loading?: boolean
  item?: WriteOffStatus,

  searchTerm?: string
}

@Injectable()
export class WebWriteOffStatusCreateStore extends ComponentStore<WriteOffStatusCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly writeOffStatusService: WriteOffStatusService
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





    

  readonly createWriteOffStatusEffect = this.effect<UserCreateWriteOffStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.writeOffStatusService.createWriteOffStatus({...input}).pipe(
          tapResponse(
            (writeOffStatus: WriteOffStatus) => {
              this.patchState({ item: writeOffStatus, loading: false })
              return this.router.navigate(['..', writeOffStatus?.id], {relativeTo: this.route})
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
