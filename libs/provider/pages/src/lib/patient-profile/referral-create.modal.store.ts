import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from "@angular/core";
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared';
import { WebReferralRequestFeatureStore } from '@case-clinical/web/referral-request/shared';
import { UserCreateReferralRequestInput } from '@case-clinical/web/core/data-access';
import { FormGroup } from '@angular/forms';
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer';

export interface ReferralCreateModalState {
  centerLatitude: string | undefined
  centerLongitude: string | undefined
  centerLocation: any
  loading: boolean,
  query: string,
  created?: boolean
}

@Injectable()
export class ReferralCreateModalStore extends ComponentStore<ReferralCreateModalState> {
  form?:FormGroup<any>;
  private referralModalCtrl?: FormlyModalController

  constructor(
    private specialtyStore: WebSpecialtyFeatureStore,
    private referralRequestStore: WebReferralRequestFeatureStore,
    private clinicalProviderLocationStore: WebClinicalProviderLocationFeatureStore,
  ) {
    super({
      query: "",
      loading: false,
      centerLocation: undefined,
      centerLatitude: undefined,
      centerLongitude: undefined,
    })

    this.specialtyStore.loadSpecialtiesEffect();
    this.clinicalProviderLocationStore.setDistance(15);
  }

  centerLongitude$ = this.select((s) => s.centerLongitude)
  centerLatitude$ = this.select((s) => s.centerLatitude)
  centerLocation$ = this.select((s)=>s.centerLocation)
  loading$ = this.select(s => s.loading)
  created$ = this.select(s => s.created)
  searchable$ = this.select(this.centerLongitude$, this.centerLatitude$, (longitude, latitude) => longitude && latitude);

  providerLocationsAll$ = this.select(this.clinicalProviderLocationStore.formattedClinicalProviderLocations$, (formattedClinicalProviderLocations)=>{
    return formattedClinicalProviderLocations.map((clinicalProviderLocation)=>{
      return {
        ...clinicalProviderLocation,
        viewSelectProvider:true,
      }
    })

  })
  providerLocations$ = this.providerLocationsAll$.pipe(tap(locations => this.referralModalCtrl?.update({
    doctorsCount:locations.length
  }, {})));;
  mapProviderLocations$ = this.select(this.providerLocations$, (providerLocations) => {
    return providerLocations.map((providerLocation) => ({
      ...providerLocation,
      latitude: providerLocation.location?.latitude,
      longitude: providerLocation.location?.longitude,
    }))
  })

  specialties$ = this.specialtyStore.specialties$;
  locationsCount$ = this.select(this.providerLocations$, (providerLocations) => providerLocations?.length);

  vm$ = this.select(
    this.loading$,
    this.locationsCount$,
    this.centerLatitude$,
    this.centerLongitude$,
    (
      loading,
      locationsCount,
      centerLatitude,
      centerLongitude,
    ) => ({
      loading,
      doctorsCount:locationsCount,
      centerLatitude,
      centerLongitude,
    })
  )

  readonly setCenterLatitude = this.updater((state, centerLatitude: any) => ({
    ...state,
    centerLatitude: centerLatitude?.toString(),
  }))

  readonly setCenterLongitude = this.updater((state, centerLongitude: any) => ({
    ...state,
    centerLongitude: centerLongitude?.toString(),
  }))

  readonly setCenterLocation = this.updater((state, centerLocation: any) => ({
    ...state,
    centerLocation: centerLocation,
  }))

  searchProviderLocationsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.searchable$),
    switchMap(([, searchable]) => {
      console.log({ searchable })
      if(searchable) {
        this.clinicalProviderLocationStore.loadClinicalProviderLocationsEffect()
      }
      return of(true);
    })
  ))

  setModalCtrl(formlyModaltrl?:FormlyModalController){
    this.referralModalCtrl = formlyModaltrl;
  }

  filterByLocation(location: any) {
    console.log("location", location)
    this.clinicalProviderLocationStore.setCenterLocation(location)
    this.referralModalCtrl?.update({
      centerlatitude:location[0],
      centerlongitude:location[1]
    }, {})
    this.searchProviderLocationsEffect();
  }

  filterByDistance(distance: number) {
    if (distance) {
      localStorage.setItem('distanceFilter', distance?.toString());
      this.clinicalProviderLocationStore.setDistance(Number(distance))
      this.searchProviderLocationsEffect();
    }
  }

  searchQueryDidChange(value: string) {
    localStorage.setItem('queryFilter', value);
    this.clinicalProviderLocationStore.setProviderName(value)
    this.searchProviderLocationsEffect();
  }

  filterBySpecialist(specialites: string[]) {
    localStorage.setItem('specialtyFilter', specialites.join(","));
    this.clinicalProviderLocationStore.setSpecialties(specialites)
    this.searchProviderLocationsEffect();
  }

  createReferralRequestEffect(model: UserCreateReferralRequestInput) {
    console.log(model);
    const referralCreateSubscriber = this.referralRequestStore.actionResult$.subscribe((result) => {
      const { done } = result;
      if(done) {
        this.patchState({ created: true });
        setTimeout(() => { this.patchState({ created: false }) }, 600);
        referralCreateSubscriber.unsubscribe();
      }
    })
    this.referralRequestStore.createReferralRequestEffect(model);
  }


}
