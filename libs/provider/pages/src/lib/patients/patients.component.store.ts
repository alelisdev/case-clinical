import { FormService } from '@case-clinical/web/ui/form';
import { Injectable, Injector, OnDestroy } from "@angular/core";
import { WebPatientFeatureStore} from '@case-clinical/web/patient/shared'
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store';
import { getAge } from '@case-clinical/shared/util/helpers'
import { switchMap, tap, of, withLatestFrom } from 'rxjs'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
import { WebVendorLocationFeatureStore } from '@case-clinical/web/vendor-location/shared';

export interface PatientState extends ProviderBaseState {
    loading: boolean,
    query: string,
}

@Injectable()
export class PatientStore extends ProviderBaseStore<PatientState> implements OnDestroy {

  subscriber;

    constructor(
        private patientDataStore : WebPatientFeatureStore,
        private providerLocationStore: WebClinicalProviderLocationFeatureStore,
        private vendorLocationStore: WebVendorLocationFeatureStore,
        injector: Injector,
        ) {
        super(injector)
        this.vendorLocationStore.loadVendorLocationsEffect()
        this.patientDataStore.setLimit(12);
        this.subscriber = this.selectedProviderId$.subscribe((value)=>{
            this.setSelectedProviderId(value);
            this.loadPatientList();
        });
    }

    loading$ = this.select(s => s.loading)

    patientList$ = this.select(
        this.patientDataStore.patients$,
        (patients)=>{
            return patients.map((patient)=>{
                let avatarUrl = undefined;
                if(patient?.users && patient?.users.length >0)
                    avatarUrl = patient?.users[0]?.avatarUrl;
                const age = getAge(patient?.dateOfBirth ?? new Date())
                const mrns = patient?.legalCases?.map((el) => ({ mrn: el.medicalRecordNumber}));

                return {
                     ...patient,
                    avatarUrl,
                    age,
                    mrns,
                    mobileNumber: patient?.mobileNumber ?? (  patient?.primaryPhoneNumber ?? ""),
                    gender: patient?.gender?.name ? patient?.gender?.name + " - ": "",
                }
            });
        }
        )

    vm$ = this.select(
        this.loading$,
        this.user$,
        this.vendor$,
        (
            loading,
            user,
            vendor,
        ) => ({
            loading,
            user,
            vendor,
        })
    )
    paging$ = this.patientDataStore.paging$;

    providerLocationOptions$ = this.select(
        this.providerLocationStore.clinicalProviderLocations$,
        (providerLocations) => {
          const options = providerLocations?.map((providerLocation) => {
            return {
              id:providerLocation.location?.id, 
              name:providerLocation.location?.name,
            }
          });
          return [
            {
              id: "all",
              name: 'All'
            },
            ...options
          ]
        })

        vendorLocationOptions$ = this.select(
          this.vendorLocationStore.vendorLocations$,
          (vendorLocations) => {
            const options = vendorLocations?.map((vendorLocation) => {
              return {
                id:vendorLocation.id, 
                name:vendorLocation.name,
              }
            });
            return [
              {
                id: "all",
                name: 'All'
              },
              ...options
            ]
          })

    loadProviderLocationsEffect = this.effect<void>($ => $.pipe(
      tap(() => { this.patchState({ loading: true }) }),
      withLatestFrom(this.selectedProviderId$),
      switchMap(([, selectedProviderId]) => {
        this.providerLocationStore.setClinicalProviderId(selectedProviderId as string);
        this.providerLocationStore.loadClinicalProviderLocationsEffect()
        return of(true);
      })))

    loadPatientList() {
      this.patientDataStore.loadPatientsEffect();
    }

    loadProviderLocations() {
      this.providerLocationStore.loadClinicalProviderLocationsEffect()
    }
    valueChangedByName(value: string) {
        this.patientDataStore.setSearchQuery(value)

        this.skipDidChange(0);
      }

    valueChangedByMRN(value: string) {
        this.patientDataStore.setmedicalRecordNumber(value)

        this.skipDidChange(0);
    }

    valueChangedByFromDate(value: Date) {
        this.patientDataStore.setFromDate(value)

        this.skipDidChange(0);
    }

    valueChangedByToDate(value: Date) {
        this.patientDataStore.setToDate(value)

        this.skipDidChange(0);
    }

    filterByVendorLocation(value:string){
      this.patientDataStore.setVendorLocationId(value !== '' && value !== 'all' ? value : undefined)

      this.skipDidChange(0)
    }


    skipDidChange(skip: number) {
        this.patientDataStore.setSkip(skip);
        this.patientDataStore.loadPatientsEffect()
    }

    override getInitialState(): PatientState {
        return {
          query: "",
          loading: false,
        }
      }

    override providerIdDidChange(providerId: string) {
        this.patientDataStore.setClinicalProviderId(providerId !== '' && providerId !== 'all' ? providerId : '')
        this.skipDidChange(0);
    }

    override providerLocationIdDidChange(providerLocationId: string) {
        this.patientDataStore.setLocationId(providerLocationId !== '' && providerLocationId !== 'all' ? providerLocationId : '')
        this.skipDidChange(0);

      }


      override ngOnDestroy(): void {
        this.subscriber?.unsubscribe();
      }
}
