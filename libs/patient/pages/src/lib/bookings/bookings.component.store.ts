import { Injectable, Injector } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared';
import { ActivatedRoute } from '@angular/router';
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';
import { PatientBaseState, PatientBaseStore } from '../patient-pages.base.store';
import { Router } from '@angular/router';
import { getTodayDate } from '@case-clinical/shared/util/helpers';

export interface State extends PatientBaseState {
  loading: boolean,
  query: string,
  currentLocation: string | undefined,
  clinicalProviderId: string | undefined
}

@Injectable()
export class BookingsStore extends PatientBaseStore<State> {
  private currentLocationId: string | undefined = undefined
  constructor(
    private appointmentStore: WebAppointmentFeatureStore,
    private clinicalProviderStore: WebClinicalProviderFeatureStore,
    private clinicalProviderLocationStore: WebClinicalProviderLocationFeatureStore,
    private clinicalProviderLocationAvailabilityStore: WebClinicalProviderLocationAvailabilityFeatureStore,
    private readonly route: ActivatedRoute,
    private router: Router,
    injector: Injector
  ) {
    super(injector)
    if (this.route.snapshot.paramMap.has("doctorId")) {
      const doctorId = this.route.snapshot.paramMap.get("doctorId") ?? '';
      this.clinicalProviderLocationStore.setClinicalProviderId(doctorId);
      this.clinicalProviderStore.loadClinicalProviderEffect(doctorId);
      this.clinicalProviderLocationStore.setClinicalProviderId(doctorId);
      this.patchState({clinicalProviderId: doctorId});
    }else {
      this.patchState({clinicalProviderId: ""});
    }
    
    this.clinicalProviderLocationStore.loadClinicalProviderLocationsEffect();
    
    if (this.route.snapshot.paramMap.has('locationId')) {
      const locationId = this.route.snapshot.paramMap.get("locationId")

      if (locationId) {
        this.setCurrentLocation(locationId)
        this.locationChanged(locationId);
        this.currentLocationId = locationId;
      }
    }
    this.appointmentStore.loadAppointmentsEffect()
  }

  loading$ = this.select(s => s.loading)
  appointments$ = this.appointmentStore.appointments$;
  providerLocationAvailabilities$ = this.clinicalProviderLocationAvailabilityStore.clinicalProviderLocationAvailabilities$;
  doctor$ = this.clinicalProviderStore.item$;
  currentLocation$ = this.select(s => s.currentLocation)
  today$ = of(getTodayDate());

  clinicalProviderLocationAvailabilities$ = this.providerLocationAvailabilities$.pipe(
    switchMap(providerLocationAvailabilities => {
      const groupedData = providerLocationAvailabilities.map((locationAvailability, index) => {
        return {
          id: locationAvailability.id,
          day: locationAvailability.day,
          start: locationAvailability.startTime,
          end: locationAvailability.endTime,
          data: {
            id: locationAvailability.id,
            start: locationAvailability.startTime,
            end: locationAvailability.endTime,
            day: locationAvailability.day
          }
        }
      });
      return of(Object.values(groupedData))
    }));
  
  locations$ = this.clinicalProviderLocationStore.clinicalProviderLocations$.pipe(
    switchMap((locations) => {
      console.log('locations =', locations);
      return of(locations.map((location) => { return { 'id': location.id, 'title': location?.location?.name ?? '' } }));
    })
  );
  currentLocationName$ = this.locations$.pipe(switchMap((locations) => {
    let locationName = '';

    locations.forEach((location) => {
      if (location.id == this.currentLocationId) {
        locationName = location.title ?? '';
      }
    })
    return of(locationName);
  }));
 


  readonly setCurrentLocation = this.updater((state, currentLocation: string) => ({
    ...state,
    currentLocation
  }))

  vm$ = this.select(
    this.loading$,
    this.appointments$,
    this.doctor$,
    this.today$,
    this.clinicalProviderLocationAvailabilities$,
    this.user$,
    this.currentLocation$,
    this.currentLocationName$,
    (
      loading,
      appointments,
      doctor,
      today,
      clinicalProviderLocationAvailabilities,
      user,
      currentLocation,
      currentLocationName
    ) => {
      return {
        loading,
        appointments,
        doctor,
        today,
        clinicalProviderLocationAvailabilities,
        user,
        currentLocation,
        currentLocationName
      };
    }
  )
  locationChanged(locationId: string) {
    this.clinicalProviderLocationAvailabilityStore.setClinicalProviderLocationId(locationId);
    this.clinicalProviderLocationAvailabilityStore.loadClinicalProviderLocationAvailabilitiesEffect();

  }


  onClickBook(event: any) {
    console.log(event);
    this.patientPortalStore.setBookingItem(event);
    this.patientPortalStore.setClinicalProviderId(this.get().clinicalProviderId);
    this.router.navigate(['/checkout']);
  }


  override getInitialState(): State {
    return {
      query: "",
      loading: false,
      currentLocation: undefined,
      clinicalProviderId: undefined
    }
  }



}
