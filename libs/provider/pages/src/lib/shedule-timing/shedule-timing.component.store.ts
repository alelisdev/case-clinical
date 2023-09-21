import { ClinicalProviderLocationAvailability } from '@case-clinical/web/core/data-access';
import { Injectable, Injector } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store';
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared';
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { DatePipe } from '@angular/common';
import { delay } from 'rxjs/operators';
import * as moment from 'moment'
import { convertTime } from '@case-clinical/shared/util/helpers';

export interface sheduleTimingState extends ProviderBaseState {
  loading: boolean,
  query: string,
  locationId?: string,
  dayOfWeek?: string,
}

@Injectable()
export class sheduleTimingStore extends ProviderBaseStore<sheduleTimingState> {

  constructor(
    private toast: WebUiToastService,
    public clinicalProviderLocationAvailabilityFeatureStore: WebClinicalProviderLocationAvailabilityFeatureStore,
    private providerLocationStore: WebClinicalProviderLocationFeatureStore,
    private datePipe: DatePipe,
    injector: Injector
  ) {
    super(injector)
    this.setDayOfWeek('Sunday');
    this.clinicalProviderLocationAvailabilityFeatureStore.setDay('Sunday');
    this.loadSlots()
    this.loadProviderLocationsEffect();
  }

  loading$ = this.select(s => s.loading)
  locationId$ = this.select(s => s.locationId)
  dayOfWeek$ = this.select(s => s.dayOfWeek)
  clinicalProviderLocationAvailabilities$ = this.clinicalProviderLocationAvailabilityFeatureStore.clinicalProviderLocationAvailabilities$;
  locations$ = this.providerLocationStore.clinicalProviderLocations$.pipe(
    switchMap((locations) => {
      return of(locations.map((location) => { return { 'id': location.id, 'title': location?.location?.name } }))
    })
  )

  slotList$ = this.clinicalProviderLocationAvailabilities$.pipe(
    switchMap((clinicalProviderLocationAvailabilitie) => {
      return of(clinicalProviderLocationAvailabilitie.map((item) => { 
        return {
          ...item,
          startTime: moment(item.startTime,'HH:mm').format('hh:mm A'),
          endTime: moment(item.endTime,'HH:mm').format('hh:mm A')
        }
      }))
    })
  )
  setLocationId = this.updater((state, locationId: string) => ({ ...state, locationId }))
  setDayOfWeek = this.updater((state, dayOfWeek: string) => ({ ...state, dayOfWeek }))

  vm$ = this.select(
    this.loading$,
    this.slotList$,
    this.user$,
    this.vendor$,
    (
      loading,
      slotList,
      user,
      vendor,
    ) => {
      return ({
        loading,
        clinicalProviderLocationAvailabilities: slotList,
        user,
        vendor,
      });
    }
  )
  
  loadProviderLocationsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.selectedProviderId$),
    switchMap(([, selectedProviderId]) => {
      this.providerLocationStore.setClinicalProviderId(selectedProviderId as string);
      this.clinicalProviderLocationAvailabilityFeatureStore.setDay('Sunday');
      this.loadSlots();
      this.providerLocationStore.loadClinicalProviderLocationsEffect()
      return of(true);
    }
    )
  ))

  addLocationAvailabiltyEffect = this.effect<any>(model$ => model$.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.dayOfWeek$, this.locationId$),
    switchMap(([model, dayOfWeek, locationId]) => {
      if (!locationId) return of(false);
      const { start, end } = model;
      const startTime = convertTime(start);
      const endTime = convertTime(end);
      const name = locationId + new Date().toString();
      const day = dayOfWeek;
      this.clinicalProviderLocationAvailabilityFeatureStore
          .createClinicalProviderLocationAvailabilityEffect({ 
            name, 
            day,
            startTime: startTime, 
            endTime: endTime,  
            clinicalProviderLocationId: locationId, 
          });
      
      return of(true);
    }
    )
  ))

  override getInitialState(): sheduleTimingState {
    return {
      query: "",
      loading: false,
    }
  }

  override providerIdDidChange(_providerId: string) {
    this.loadProviderLocationsEffect();
  }

  loadSlots() {
    this.clinicalProviderLocationAvailabilityFeatureStore.loadClinicalProviderLocationAvailabilitiesEffect()
  }



  // Callback function that is called when selecting provider location
  locationDidChange(locationId: string) {
    this.setLocationId(locationId);
    this.clinicalProviderLocationAvailabilityFeatureStore.setClinicalProviderLocationId(locationId);
    this.loadSlots();
  }

  // Callback function that is called when selecting day of week
  dayOfWeekDidChange(dayOfWeek: string) {
    this.setDayOfWeek(dayOfWeek);
    this.clinicalProviderLocationAvailabilityFeatureStore.setDay(dayOfWeek);
    this.loadSlots();
  }

  deleteSlot(item: ClinicalProviderLocationAvailability) {
    this.clinicalProviderLocationAvailabilityFeatureStore.setItem(item)
    this.clinicalProviderLocationAvailabilityFeatureStore.deleteClinicalProviderLocationAvailabilityInScheduleTimeEffect();
  }

  
}
