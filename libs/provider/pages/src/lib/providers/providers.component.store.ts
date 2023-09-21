/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable, Injector,OnDestroy } from '@angular/core'
import { ModalController } from '@case-clinical/web/ui/form'
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store'
import { switchMap, tap, of, withLatestFrom } from 'rxjs'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer'

export interface ProvidersState extends ProviderBaseState {
  loading: boolean
  query: string
  modalController: ModalController | undefined
}

@Injectable()
export class ProvidersStore extends ProviderBaseStore<ProvidersState> implements OnDestroy {
  providerUpdateFormlyModalController?: FormlyModalController;
  subscriber;
  constructor(
    private toast: WebUiToastService,
    private providerStore: WebClinicalProviderFeatureStore,
    private documentStore: WebDocumentFeatureStore,
    private providerLocationStore: WebClinicalProviderLocationFeatureStore,

    injector: Injector,
  ) {
    super(injector)
    this.providerStore.setIsDoctorsPage(true)
    this.subscriber = this.selectedProviderId$.subscribe((value) => {
      this.setSelectedProviderId(value)
      this.loadProviders()
    })
  }

  override ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }
  /******** Selectors **********/
  loading$ = this.select((s) => s.loading)

  providersAll$ = this.providerStore.clinicalProviders$
  override providers$ = this.providersAll$.pipe(
    switchMap((doctorsAll) => {
      return of(
        doctorsAll.map((item) => {
          const specialitesCount = item?.clinicalProviderSpecialties?.length??0;
          

          return {
            ...item,
            rating: Math.floor(Math.random() * 50) / 10,
            specialitesCount: specialitesCount - 3,
            clinicalProviderSpecialties: item.clinicalProviderSpecialties?.slice(0, 3),
            recommendPercent: Math.floor(100 * Math.random()),
            disableEditing: true,
            hideViewProfile:false,
          }
        }),
      )
    }),
  )

  providersCount$ = this.select(this.providers$, (providers) => providers.length ?? 0)




  providerLocationOptions$ = this.select(
    this.providerLocationStore.clinicalProviderLocations$,
    (providerLocations) => {
      const options = providerLocations?.map((providerLocation) => {
        const id = providerLocation?.id;
        const name = providerLocation.location?.name;

        return {
          id, name,
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

    

  vm$ = this.select(
    this.loading$,
    this.providers$,
    this.providersCount$,
    this.providers$,
    this.user$,
    this.vendor$,
    (loading, providers, providersCount, clincicalProviders, user, vendor) => {
      const clinicalProvidersWithLocations: any[] = []
      clincicalProviders.forEach((clinicalProvider) => {
        clinicalProvider.clinicalProviderLocations?.forEach((location) => {
          clinicalProvidersWithLocations.push({
            ...clinicalProvider,
            mainLocation: location.location,
            locations: location?.location?.locationImages?.map((image) => ({
              id: location?.location?.id,
              name: location?.location?.name,
              document: image,
            })),
          })
        })
      })
      return {
        loading,
        providers,
        providersCount,
        clincicalProviders: clinicalProvidersWithLocations,
        user,
        vendor,
      }
    },
  )
  attachment$ = this.documentStore.item$.pipe(
    tap((document) => {
      if (document && !document.attachment) {
        this.toast.error('Cannot find attachment file!', { duration: 2000 })
      }
    }),
  )
  /******** Selectors **********/
  /******** Updaters **********/
  readonly setModalController = this.updater((state, controller: ModalController) => ({
    ...state,
    modalController: controller,
  }))
  setProviderUpdateFormlyModalController(controller: FormlyModalController) {
    this.providerUpdateFormlyModalController = controller;
  }

  openProviderUpdateFormlyModalController() {
    this.providerUpdateFormlyModalController?.open({}, {}, this);
  }

  /******** Updaters **********/

  /**********  load locations for current provider ************/
  loadProviderLocationsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    withLatestFrom(this.selectedProviderId$),
    switchMap(([, selectedProviderId]) => {
      this.providerLocationStore.setClinicalProviderId(selectedProviderId as string);
      this.providerLocationStore.loadClinicalProviderLocationsEffect()
      return of(true);
    }
    )
  ))

  /**********  Callback Functions Called By UI ************/
  loadProviders() {
    this.providerStore.loadClinicalProvidersEffect()
  }

  loadProviderLocations() {
    this.providerLocationStore.loadClinicalProviderLocationsEffect()
  }

  loadImageDetail(documentId: string) {
    this.documentStore.loadDocumentEffect(documentId)
  }


  /**********  Callback Functions Called By UI ************/
  override getInitialState(): ProvidersState {
    return {
      query: '',
      loading: false,
      modalController: undefined,
    }
  }

  override providerIdDidChange(providerId: string) {
    this.providerStore.setClinicalProviderId(providerId !== '' && providerId !== 'all' ? providerId : '')
    this.providerLocationStore.setClinicalProviderId(providerId !== '' && providerId !== 'all' ? providerId : '')

    this.loadProviderLocationsEffect();
    this.loadProviders()
  }

  override providerLocationIdDidChange(providerLocationId: string) {
    this.providerStore.setClinicalProviderLocationId(providerLocationId !== '' && providerLocationId !== 'all' ? providerLocationId : '')

    this.loadProviders()

  }
}
