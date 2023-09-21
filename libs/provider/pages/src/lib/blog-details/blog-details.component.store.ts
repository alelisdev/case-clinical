import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { Injectable, Injector } from "@angular/core";
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store';


export interface BlogDetailState extends ProviderBaseState {
  loading: boolean,
  query: string,
}

@Injectable()
export class BlogDetailStore extends ProviderBaseStore<BlogDetailState> {
  constructor(
    private data: WebCoreDataAccessService,
    injector: Injector,
  ) {
    super(injector)
  }

  loading$ = this.select(s => s.loading)

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
        vendor
    })
  )



  override getInitialState(): BlogDetailState {
    return {
      query: "",
      loading: false,
    }
  }

  override providerIdDidChange(providerId: string) {
    console.log(providerId);
  }

}
