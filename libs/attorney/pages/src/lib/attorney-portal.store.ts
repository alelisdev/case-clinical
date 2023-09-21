import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared';
import { WebAuthStore } from '@case-clinical/web/auth/data-access';
import { getAge } from '@case-clinical/shared/util/helpers'
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';

export interface AttorneyPortalState {
  loading: boolean,
  query: string,
  selectedAttorneyId?: string,
}

@Injectable({ providedIn: 'root' })
export class AttorneyPortalStore extends ComponentStore<AttorneyPortalState> {
  constructor(
    private formService: FormService,
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
    private attorneyStore: WebAttorneyFeatureStore,
    private authStore: WebAuthStore,
    private data: WebCoreDataAccessService,
  ) {
    super({
      query: "",
      loading: false,
      selectedAttorneyId: 'all'
    });

    this.loadData();
  }

  private attorneys$ = this.attorneyStore.attorneys$;

  readonly user$ = this.select(this.authStore.user$, (user: any) => {
    let genderAndDob = ''
    if (user?.dateOfBirth) {
      const age = getAge(user.dateOfBirth)
      if (genderAndDob) genderAndDob += ` - ${age} Years`
      else genderAndDob = `${age} Years`
    }

    const userData: any = {
      ...user,
      genderAndDob,
    }
    return userData;
  })

  readonly attorneyId = this.select(this.authStore.user$, (user: any) => {
    return user?.attorneyId
  })

  readonly selectedAttorneyId$ = this.select(s => {
    return s.selectedAttorneyId ?? 'all';
  });

  readonly attorneyOptions$ = this.select(
    this.attorneys$,
    (attorneys) => {
      return [
        {
          id: "all",
          name: 'All'
        },
        ...attorneys,
      ]
    })

  readonly firmId$ = this.select(
    this.attorneys$,
    (attorneys) => {
      if (attorneys?.length > 0) return attorneys[0].firmId;
      else return undefined;
    }
  )

  readonly loading$ = this.select(s => s.loading)
  readonly vm$ = this.select(
    this.loading$,
    (
      loading,
    ) => {
      return ({
        loading
      })
    }
  )

  readonly setSelectedAttorneyId = this.updater((state, selectedAttorneyId: string) => {
    return ({ ...state, selectedAttorneyId })
  });

  loadData() {
    // Load attorneys that belong to the same firm of mine
    this.attorneyStore.loadAttorneysEffect();
    // Load and save into cache formLayout data that will be used in this attorney portal

  }
}
