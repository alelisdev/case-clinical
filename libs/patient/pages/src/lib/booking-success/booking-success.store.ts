import { Injectable, Injector } from "@angular/core";
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { ActivatedRoute } from '@angular/router';
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store';
export interface BookingSuccessState extends PatientBaseState{
  loading: boolean,
  query: string,
}

@Injectable()
export class BookingSuccessStore extends PatientBaseStore<BookingSuccessState> {
  constructor(private appointmentStore: WebAppointmentFeatureStore, public route: ActivatedRoute, injector: Injector) {
    super(injector)

    if(this.route.snapshot.paramMap.has('bookingId')){
      const bookingId = this.route.snapshot.paramMap.get('bookingId') ?? "";

      this.appointmentStore.loadAppointmentEffect(bookingId)
    }
      
  }

  loading$ = this.select(s => s.loading)
  readonly booking$ = this.appointmentStore.item$;

  vm$ = this.select(
    this.loading$,
    this.user$,
    this.membership$,
    this.booking$,
    (
      loading,
      user,
      membership,
      booking,
    ) => {
      return {
        loading,
        user,
        membership,
        booking,
      }
    }
  )

  override getInitialState(): BookingSuccessState {
    return {
      query:"",
      loading:false
    }
  }
}
