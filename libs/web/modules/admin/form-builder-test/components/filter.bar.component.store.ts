import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';

export interface FilterBarComponentState {
  loading: boolean,
  query: string,
}

@Injectable()
export class FilterBarComponentStore extends ComponentStore<FilterBarComponentState> {
  constructor(private formService: FormService, private data: WebCoreDataAccessService, private loading: FuseLoadingService, private toast: WebUiToastService) {
    super({
      query: "",
      loading: false,
    })
  }

  loading$ = this.select(s => s.loading)
  vm$ = this.select(
    this.loading$,
    (
      loading
    ) => ({
      loading
    })
  )

}
