
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateAppointmentStatusInput, WebCoreDataAccessService, AppointmentStatus,  } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { AppointmentStatusService } from '@case-clinical/web/appointment-status/shared'

export interface AppointmentStatusEditState {
  errors?: any
  loading?: boolean
  item?: AppointmentStatus,

  searchTerm?: string
}

@Injectable()
export class WebAppointmentStatusEditStore extends ComponentStore<AppointmentStatusEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly appointmentStatusService: AppointmentStatusService
) {
    super({ loading: false })
    
    this.loadAppointmentStatusEffect(route.params.pipe(map((route) => route?.appointmentStatusId)))
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





  
  readonly loadAppointmentStatusEffect = this.effect<string>((appointmentStatusId$) =>
     appointmentStatusId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((appointmentStatusId) =>
        this.data.userAppointmentStatus({appointmentStatusId}).pipe(
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

  readonly updateAppointmentStatusEffect = this.effect<UserUpdateAppointmentStatusInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.appointmentStatusService.updateAppointmentStatus(input, item?.id).pipe(
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
