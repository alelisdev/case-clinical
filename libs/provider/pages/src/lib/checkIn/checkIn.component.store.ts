import { ActivatedRoute } from '@angular/router'
import { Injectable, Injector } from '@angular/core'
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store'
import { switchMap, tap } from 'rxjs'
import { tapResponse } from '@ngrx/component-store';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { WebCoreDataAccessService, Appointment } from '@case-clinical/web/core/data-access';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface CheckInState extends ProviderBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class CheckInStore extends ProviderBaseStore<CheckInState> {

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private data: WebCoreDataAccessService,
    private appointmentStore: WebAppointmentFeatureStore,
    private toast: WebUiToastService
  ) {
    super(injector)

    if (this.route.snapshot.paramMap.has('appointmentId')) {
      const appointmentId = this.route.snapshot.paramMap.get('appointmentId') ?? ''
      this.appointmentStore.loadAppointmentEffect(appointmentId);
    }
  }

  loading$ = this.select((s) => s.loading)
  appointment$ = this.appointmentStore.item$;

  vm$ = this.select(this.loading$, this.appointment$, (loading, appointment) => {
    return {
      loading,
      appointment
    }
  })

  readonly checkInAppointmentEffect = this.effect<string>((appointmentId$) =>
    appointmentId$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((appointmentId) =>
          this.data.userCheckInAppointment({ appointmentId }).pipe(
            tapResponse(
              (res) => {
                this.appointmentStore.setItem(res.data?.updated as Appointment)
                this.toast.success('Successfully checked In Appointment', { duration: 3000 })
                this.patchState({
                  loading: false,
                })
              },
              () => {
                this.toast.error("Failed to checkIn Appointment", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            ),
          ),
        ),
      ),
  )

  override getInitialState(): CheckInState {
    return {
      query: '',
      loading: false,
    }
  }
}
