import { ActivatedRoute } from '@angular/router'
import { Injectable, Injector } from "@angular/core";
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store';
import { switchMap, tap } from 'rxjs/operators'
import { tapResponse } from '@ngrx/component-store';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { WebCoreDataAccessService, Appointment } from '@case-clinical/web/core/data-access';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface ConfirmAppointmentState extends PatientBaseState{
  loading: boolean,
  query: string,
}

@Injectable()
export class ConfirmAppointmentStore extends PatientBaseStore<ConfirmAppointmentState> {
  constructor(injector: Injector,
    private appointmentStore: WebAppointmentFeatureStore,
    private readonly route: ActivatedRoute,
    private data: WebCoreDataAccessService,
    private toast: WebUiToastService
    ) {
    super(injector)

    if (this.route.snapshot.paramMap.has('appointmentId')) {
      const appointmentId = this.route.snapshot.paramMap.get('appointmentId') ?? ''
      this.appointmentStore.loadAppointmentEffect(appointmentId);
    }
  }

  loading$ = this.select(s => s.loading)

  appointment$ = this.appointmentStore.item$;
  vm$ = this.select(
    this.loading$,
    this.user$,
    this.membership$,
    this.appointment$,
    (
      loading,
      user,
      membership,
      appointment
    ) => {
      appointment?.id
      return {
        loading,
        user,
        membership,
        appointment
      }
    }
  )

  readonly confirmAppointmentEffect = this.effect<string>((appointmentId$) =>
    appointmentId$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((appointmentId) =>
          this.data.userConfirmAppointment({ appointmentId }).pipe(
            tapResponse(
              (res) => {
                this.appointmentStore.setItem(res.data?.updated as Appointment);
                this.toast.success('Successfully confirmed Appointment', { duration: 3000 })
                this.patchState({
                  loading: false,
                })
              },
              (error) => {
                this.toast.error("Failed to confirm Appointment", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            ),
          ),
        ),
      ),
  )


  readonly cancelAppointmentEffect = this.effect<string>((appointmentId$) =>
    appointmentId$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((appointmentId) =>
          this.data.userCancelAppointment({ appointmentId }).pipe(
            tapResponse(
              (res) => {
                this.toast.success('Successfully cancelled Appointment', { duration: 3000 })
                this.appointmentStore.setItem(res.data?.updated as Appointment);
                this.patchState({
                  loading: false,
                })
              },
              (error) => {
                this.toast.error("Failed to cancel Appointment", { duration: 3000 })
                this.patchState({
                  loading: false
                })
              }
            ),
          ),
        ),
      ),
  )

  override getInitialState(): ConfirmAppointmentState {
    return {
      query:"",
      loading:false
    }
  }
}
