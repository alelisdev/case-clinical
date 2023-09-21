
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateSurgicalPositionInput, WebCoreDataAccessService, SurgicalPosition,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { SurgicalPositionService } from '@case-clinical/web/surgical-position/shared'

export interface SurgicalPositionCreateState {
  errors?: any
  loading?: boolean
  item?: SurgicalPosition,

  searchTerm?: string
}

@Injectable()
export class WebSurgicalPositionCreateStore extends ComponentStore<SurgicalPositionCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly surgicalPositionService: SurgicalPositionService
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





    

  readonly createSurgicalPositionEffect = this.effect<UserCreateSurgicalPositionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.surgicalPositionService.createSurgicalPosition({...input}).pipe(
          tapResponse(
            (surgicalPosition: SurgicalPosition) => {
              this.patchState({ item: surgicalPosition, loading: false })
              return this.router.navigate(['..', surgicalPosition?.id], {relativeTo: this.route})
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
