
import { Injectable, Injector } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store';

export interface EligibilityState extends ProviderBaseState {
  loading: boolean
  query: string
}

@Injectable()
export class EligibilityStore extends ProviderBaseStore<EligibilityState> {
  constructor(
    injector: Injector,
  ) {
    super(injector)
  }

  /******* Selectors  ********/
  loading$ = this.select(s => s.loading)
  vm$ = this.select(
    this.loading$,
    this.user$,
    this.vendor$,
    (
      loading,
      user,
      vendor
    ) => {
      return {
        loading,
        user,
        vendor
      }
    }
  )
  /******* Selectors  ********/

  /******* Updaters *******/
  setLoading = this.updater((state, loading: boolean) => ({ ...state, loading }))
  setQuery = this.updater((state, query: string) => ({ ...state, query }))
  /******* Updaters *******/

  /****** Effects ******/

  /****** Effects ******/

  /**********  Callback Functions Called By UI ************/

  /**********  Callback Functions Called By UI ************/

  override providerIdDidChange(providerId: string) {
  }

  override getInitialState(): EligibilityState {
    return {
      query: "",
      loading: false,
    }
  }
}

