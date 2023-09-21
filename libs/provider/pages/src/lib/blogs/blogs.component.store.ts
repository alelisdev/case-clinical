import { Appointment, WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { DateFilterInput } from '@case-clinical/api/core/data-access';
import { Injectable, Injector } from "@angular/core";
import { ProviderBaseState, ProviderBaseStore } from '../provider-page.base.store';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { tapResponse } from '@ngrx/component-store';


export interface BlogState extends ProviderBaseState {
  loading: boolean,
  query: string,
}

@Injectable()
export class BlogStore extends ProviderBaseStore<BlogState> {
  constructor(
    private data: WebCoreDataAccessService,
    injector: Injector,
  ) {
    super(injector);
  }

  loading$ = this.select(s => s.loading)



  vm$ = this.select(
    this.loading$,
    this.user$,
    this.vendor$,
    (
      loading,
      user,
      vendor
    ) => ({
        loading,
        user,
        vendor
    })
  )


  override getInitialState(): BlogState {
    return {
      query: "",
      loading: false,
    }
  }

  override providerIdDidChange(providerId: string) {
    console.log(providerId);
  }

}
