
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateAppointmentStatusInput, WebCoreDataAccessService, AppointmentStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AppointmentStatusService } from '@case-clinical/web/appointment-status/shared'

export interface AppointmentStatusCreateState {
  errors?: any
  loading?: boolean
  item?: AppointmentStatus,

  searchTerm?: string
}

@Injectable()
export class WebAppointmentStatusCreateStore extends ComponentStore<AppointmentStatusCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly appointmentStatusService: AppointmentStatusService
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





    

  readonly createAppointmentStatusEffect = this.effect<UserCreateAppointmentStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.appointmentStatusService.createAppointmentStatus({...input}).pipe(
          tapResponse(
            (appointmentStatus: AppointmentStatus) => {
              this.patchState({ item: appointmentStatus, loading: false })
              return this.router.navigate(['..', appointmentStatus?.id], {relativeTo: this.route})
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